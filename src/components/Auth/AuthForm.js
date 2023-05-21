import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading]=useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPass = passwordRef.current.value;
    setIsLoading(true)

    if(isLogin){

    }else{
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD43hx1Kysh-IuGSxl43hu86mmoxycYfT4',{
        method:'POST',
        body:JSON.stringify({
          email:enteredEmail,
          password:enteredPass,
          returnSecureToken:true
        }),headers:{
          'content-Type':'application/json'
        }
      }).then(res=>{
        if(res.ok){
          setIsLoading(false)
        }else{
          res.json().then(data=>{
            let errorMessage = 'Authentication failed!';
            if(data &&data.error&&data.error.message){
            errorMessage = data.error.message; 
            alert(errorMessage) 
            }
          });
        }

      })

      
    }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
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
          {!isLoading&&<button type='submit'>{isLogin?'Login':'Create Account'}</button>}
          {isLoading&&<p>sending request...</p>}
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
