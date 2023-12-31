import errorCodes from "@/assets/json/errorCodes.json";
import { app } from "~/plugins/appConfig";

// auth
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
const auth = getAuth(app);

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
} from "firebase/firestore";
const db = getFirestore(app);

// dto
import Editor from "~/dto/Editor";

class authAPI {
  currentUser = null;
  tester = auth.currentUser;

  // 회원가입
  signup = (form) => {
    const { email, pwd, pid, nickname } = form;
    return createUserWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        const user = userCredential.user;
        const data = {
          email: user.email,
          uid: user.uid,
          nickname,
          pid,
          emailVerified: false,
          isEditor: false,
          isSponsored: false,
        };
        const token = {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
        this.createUser(data);
        return { data, token };
      })
      .catch((error) => {
        const errorCode = error.code;
        throw new Error(
          errorCodes?.auth[errorCode] || "에러로 인해 로그인에 실패했습니다."
        );
      });
  };
  // 로그인
  login = (form) => {
    const { email, pwd } = form;
    return signInWithEmailAndPassword(auth, email, pwd)
      .then((response) => {
        const user = response.user;
        if (user) {
          const data = {
            email: user.email,
            uid: user.uid,
          };
          const token = {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          };
          // console.log("data, token:", data, token);
          return { data, token };
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        throw new Error(
          errorCodes?.auth[errorCode] || "에러로 인해 로그인에 실패했습니다."
        );
      });
  };

  // 로그아웃
  logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        return true;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  // 유저 정보 생성하기
  createUser = async (data) => {
    const docRef = await addDoc(collection(db, "users"), data);
    if (docRef?.id) {
      return docRef.id;
    }
  };

  // 유저 상태를 보존하고 불러오게하는 watcher
  authWatcher = async () => {
    const userPromise = new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user.email);
        } else {
          resolve(false);
        }
      });
    });
    return userPromise;
  };

  // 유저정보 불러오기
  getUserInfo = async (email) => {
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const snapshot = await getDocs(q);
      if (snapshot) {
        const docs = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        });
        return docs[0];
      }
    } catch (error) {
      console.error("error::", error);
    }
  };

  // 유저정보 저장하기
  setUserInfo = async (data) => {
    const [userId, userInfo] = await Promise.all([
      this.getUserId("users", ["email", data.email]),
      this.getUserInfo(data.email),
    ]);
    if (userId && userInfo) {
      const response = new Promise(async (resolve, reject) => {
        await setDoc(doc(db, "users", userId), {
          ...userInfo,
          ...data,
        });
        return resolve(true);
      });
      return response;
    }
  };

  // 계정 활성화 동의하기
  setUserVerify = async (id) => {};

  // 에디터 신청하기
  setUserEditor = async (email) => {
    const response = new Promise(async (resolve, reject) => {
      const userId = await this.getUserId("users", ["email", email]);
      if (userId) {
        const ref = doc(db, "users", userId);
        await updateDoc(ref, {
          isEditor: true,
        });
        return resolve(true);
      } else {
        return reject();
      }
    });
    return response;
  };

  // id 구하기
  getUserId = async (collectionName = "users", [key = "email", value]) => {
    try {
      const q = query(collection(db, collectionName), where(key, "==", value));
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

  // 중복유저인지 체크
  checkDuplicate = async (field, value) => {
    const response = new Promise(async (resolve, reject) => {
      try {
        const q = query(collection(db, "users"), where(field, "==", value));
        const snapshot = await getDocs(q);
        // 비어있어야 중복이 아님
        const isDuplicate = !snapshot?.empty;
        // console.log("data", { field, value, empty: snapshot?.empty });
        // 중복일 경우
        if (isDuplicate) {
          return resolve(true);
        } else {
          // 중복이 아닐 경우
          return resolve(false);
        }
        // 에러
      } catch (error) {
        return reject(errors);
      }
    });
    return response;
  };

  // 프로필 불러오기
  getProfile = async ([key = "pid", value]) => {
    try {
      const q = query(collection(db, "users"), where(key, "==", value));
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

  // 토큰 갱신 취소
  revokeRefreshTokens = (uid) => {
    // getAuth()
    //   .revokeRefreshTokens(uid)
    //   .then(() => {
    //     return getAuth().getUser(uid);
    //   })
    //   .then((userRecord) => {
    //     return new Date(userRecord.tokensValidAfterTime).getTime() / 1000;
    //   })
    //   .then((timestamp) => {
    //     console.log(`Tokens revoked at: ${timestamp}`);
    //   });
  };
}

export default new authAPI();
