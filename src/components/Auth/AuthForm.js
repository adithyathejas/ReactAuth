import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDeffault();
    const enteredEmail = emailRef.current.value;
    const enteredPass = passwordRef.curremt.value;

    if(isLogin){

    }else{
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD43hx1Kysh-IuGSxl43hu86mmoxycYfT4')
    }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required ref={passwordRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin?'Login':'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
