export const getLocalStorage = (key) => {
  if (window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
};

export const isAuth = () => {
  if (window !== "undefined") {
    if (getLocalStorage("AuralApp")) {
      return getLocalStorage("AuralApp");
    } else {
      return false;
    }
  }
};
