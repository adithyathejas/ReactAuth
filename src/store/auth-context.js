import React, { useState } from "react";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  timeoutCheck:()=>{}
});

export const AuthContextProvider = (props) => {
  const initialToken=localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);
  const userIsloggedIn = !!token;
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token',token)
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token')
  };
  const timeoutHandler=()=>{
    let min=5*60*1000;
    let now = new Date().getTime()
    let setupTime = localStorage.getItem('setupTime')
    if(setupTime==null){
      localStorage.setItem('setupTime',now)
    }else{
      if(now-setupTime>min){
        localStorage.clear()
        localStorage.setItem('setupTime',now)
      }
    }


  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsloggedIn,
    login: loginHandler,
    logout: logoutHandler,
    timeoutCheck:timeoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
