import { app } from "~/plugins/appConfig";

// firestore
import {
  getFirestore,
  doc,
  addDoc,
  getDoc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
  query,
  orderBy,
  updateDoc,
  increment,
  limit,
  where,
  getCountFromServer,
  startAt,
  startAfter,
} from "firebase/firestore";

const db = getFirestore(app);

// dto
import Editor from "~/dto/Editor";

class boardItemsAPI {
  // boardItem 전체 불러오기
  getAllBoardItems = async (
    collectionName = "board",
    queryData, // 쿼리
    size, // 갯수
    [orderType, orderValue]
  ) => {
    try {
      const queryConstraints = [];
      // 순서 색인
      if (orderType) {
        if (orderValue) {
          queryConstraints.push(orderBy(orderType, orderValue));
        } else {
          queryConstraints.push(orderBy(orderType));
        }
      }
      // 추가 쿼리
      if (queryData) {
        for (const [key, value] of Object.entries(queryData)) {
          if (typeof value === "object") {
            // 페이지네이션
            if (key === "startAfter" && value) {
              queryConstraints.push(startAfter(value));
            } else
              queryConstraints.push(where(key, value[0], value[1], value[2])); // 추가적으로 부호가 있을 경우
          } else queryConstraints.push(where(key, "==", value));
        }
      }
      // 갯수
      if (size) queryConstraints.push(limit(size));

      // 최종 쿼리
      const q = query(collection(db, collectionName), ...queryConstraints);
      const snapshot = await getDocs(q);
      if (snapshot) {
        const boardItems = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        });
        return boardItems;
      }
    } catch (error) {
      console.error("error::", error);
    }
  };

  // boardItem 디테일 불러오기
  getBoardItem = async (collectionName = "board", [key = "id", id]) => {
    try {
      const q = query(collection(db, collectionName), where(key, "==", id));
      const snapshot = await getDocs(q);
      if (snapshot) {
        const docs = snapshot.docs.map(async (doc) => {
          const author = await this.getAuthor("users", [
            "uid",
            doc?.data()?.author,
          ]);
          return {
            // id: doc.id,
            ...doc.data(),
            author,
          };
        });

        return docs[0];
      }
    } catch (error) {
      console.error("error::", error);
    }
  };

  // id 구하기
  getDocItem = async (collectionName = "board", [key = "docId", id]) => {
    try {
      const q = query(collection(db, collectionName), where(key, "==", id));
      const snapshot = await getDocs(q);
      if (snapshot) {
        const docs = snapshot?.docs.map((doc) => {
          return {
            id: doc.id,
          };
        });
        return docs[0].id;
      }
    } catch (error) {
      console.error("error::", error);
    }
  };

  // collection의 글 갯수 구하기
  // 글 갯수를 수정하면 no가 덮어져서 count가 아니라 변경됨
  // getBoardCount = async () => {
  //   const col = collection(db, collectionName);
  //   const snapshot = await getCountFromServer(col);
  //   const count = snapshot.data().count;
  //   return count;
  // };

  // boardItem 추가
  addBoardItem = async (collectionName = "board", data) => {
    const response = new Promise(async (resolve, reject) => {
      try {
        const docRef = await addDoc(collection(db, collectionName), data);
        if (docRef) {
          return resolve(true);
        }
      } catch (error) {
        return reject(false);
      }
    });
    return response;
  };

  // boardItem 삭제
  removeBoardItem = async (collectionName = "board", [key = "docId", id]) => {
    if (!id) throw new Error("id가 없습니다");
    const response = new Promise(async (resolve, reject) => {
      const docId = await this.getDocItem(collectionName, [key, id]);
      try {
        await deleteDoc(doc(db, collectionName, docId));
        return resolve(true);
      } catch (error) {
        return reject(false);
      }
    });
    return response;
  };

  // boardItem 수정
  updateBoardItem = async (
    collectionName = "board",
    [key = "docId", id],
    data
  ) => {
    if (!id) throw new Error("id가 없습니다");
    const response = new Promise(async (resolve, reject) => {
      const docId = await this.getDocItem(collectionName, [key, id]);
      try {
        await setDoc(doc(db, collectionName, docId), data);
        return resolve(true);
      } catch (error) {
        return reject(false);
      }
    });
    return response;
  };

  // 게시판의 카테고리 불러오기
  getCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "boardCategories"));
      if (snapshot) {
        const boardItems = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        });

        return boardItems;
      }
    } catch (error) {
      console.error("error::", error);
    }
  };

  // 한 값만 변형
  updateItemValue = async (
    collectionName = "board",
    [docKey = "docId", id],
    key,
    value
  ) => {
    const docId = await this.getDocItem(
      collectionName,
      [docKey, id],
      [key, value]
    );
    if (docId) {
      const ref = doc(db, collectionName, docId);
      const response = new Promise(async (resolve, reject) => {
        try {
          await updateDoc(ref, {
            [key]: value,
          });
          return resolve(true);
        } catch (error) {
          return reject(false);
        }
      });
      return response;
    }
  };

  // 조회수 추가
  incrementViewer = async (collectionName = "board", [key = "docId", id]) => {
    const docId = await this.getDocItem(collectionName, [key, id]);
    if (docId) {
      const ref = doc(db, collectionName, docId);
      updateDoc(ref, {
        viewer: increment(1),
      });
    }
  };

  // 좋아요 추가
  incrementLike = async (collectionName = "board", [key, id]) => {
    const docId = await this.getDocItem(collectionName, [key, id]);
    if (docId) {
      const ref = doc(db, collectionName, docId);
      updateDoc(ref, {
        like: increment(1),
      });
    }
  };

  // 글쓴이 불러오기
  getAuthor = async (collectionName = "users", [key = "uid", id]) => {
    try {
      const q = query(collection(db, collectionName), where(key, "==", id));
      const snapshot = await getDocs(q);
      if (snapshot) {
        const users = snapshot.docs.map((doc) => {
          return new Editor(doc.data());
        });
        return users[0];
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  // 글 신고하기
  //   reportBoardItem = async (data) => {
  //     const response = new Promise(async (resolve, reject) => {
  //       try {
  //         const docRef = await addDoc(collection(db, "boardReports"), data);
  //         if (docRef) {
  //           return resolve(true);
  //         }
  //       } catch (error) {
  //         return reject(false);
  //       }
  //     });
  //     return response;
  //   };
}

export default new boardItemsAPI();
