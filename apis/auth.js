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
import { generateNickname } from "@/plugins/commons.js";

class authAPI {
  currentUser = null;
  tester = auth.currentUser;

  // 회원가입
  signup = (form) => {
    const { email, pwd } = form;
    return createUserWithEmailAndPassword(auth, email, pwd)
      .then((userCredential) => {
        const user = userCredential.user;
        const data = {
          email: user.email,
          uid: user.uid,
          nickname: generateNickname(),
          emailVerified: false,
          isEditor: false,
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
        window.toast(
          errorCodes?.auth[errorCode] || "에러로 인해 로그인에 실패했습니다."
        );
        throw error;
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
          return { data, token };
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        window.toast(
          errorCodes?.auth[errorCode] || "에러로 인해 로그인에 실패했습니다."
        );
        throw error;
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
            id: doc.id,
            ...doc.data(),
          };
        });
        // console.log("obj:", obj);
        return docs[0];
      }
    } catch (error) {
      console.error("error::", error);
    }
  };

  // 유저정보 저장하기
  setUserInfo = async (data) => {
    const response = new Promise(async (resolve, reject) => {
      if (!data?.id) {
        window.toast("오류가 발생했습니다.");
        return reject(false);
      }
      try {
        await setDoc(doc(db, "users", data.id), data);
        return resolve(true);
      } catch (error) {
        return reject(false);
      }
    });
    return response;
  };

  // 계정 활성화 동의하기
  setUserVerify = async (id) => {
    const response = new Promise(async (resolve, reject) => {
      if (!id) {
        window.toast("오류가 발생했습니다.");
        return reject(false);
      }
      try {
        const ref = doc(db, "users", id);
        await updateDoc(ref, {
          emailVerified: true,
        });
        return resolve(true);
      } catch (error) {
        return reject(false);
      }
    });
    return response;
  };

  // 에디터 신청하기
  setUserEditor = async (id) => {
    const response = new Promise(async (resolve, reject) => {
      if (!id) {
        return reject(false);
      }
      try {
        const ref = doc(db, "users", id);
        await updateDoc(ref, {
          isEditor: true,
        });
        return resolve(true);
      } catch (error) {
        return reject(false);
      }
    });
    return response;
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
