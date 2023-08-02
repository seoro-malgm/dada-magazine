import authAPI from "~/apis/auth";
import boardItemsAPI from "~/apis/boardItems";
import storageAPI from "~/apis/storage";
import newsletterAPI from "~/apis/newsletter";

export default ({ app }, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject("firebase", () => {
    return {
      ...authAPI,
      ...boardItemsAPI,
      ...storageAPI,
      ...newsletterAPI,
    };
  });
};
