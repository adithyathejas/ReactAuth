import { useContext,useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const authCtx=useContext(AuthContext)
  const token = authCtx.token
  const passwordRef=useRef()

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredPass = passwordRef.current.value;
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD43hx1Kysh-IuGSxl43hu86mmoxycYfT4',{
        method:'POST',
        body:JSON.stringify({
          idToken:token,
          password:enteredPass,
          returnSecureToken:true
        }),headers:{
          'content-Type':'application/json'
        }
      }).then(res=>{
        if(res.ok){
         
          res.json().then(data=>{console.log(data);authCtx.login(data.idToken)})
          alert('password changed')

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

  
  return (
    <form className={classes.form}onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
  }

export default ProfileForm;
