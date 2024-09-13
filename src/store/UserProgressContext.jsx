import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showChecout: () => {},
  hideChickout: () => {},
});

export function UserPorgressProvider({ children }) {
  const [userProgress, setUserPorgress] = useState("");

  function showCart() {
    setUserPorgress("cart");
  }

  function hideCart() {
    setUserPorgress("");
  }

  function showChecout() {
    setUserPorgress("checkout");
  }

  function hideChickout() {
    setUserPorgress("");
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showChecout,
    hideChickout,
  };
  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}
export default UserProgressContext;
