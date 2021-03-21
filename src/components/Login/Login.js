import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import './Login.css'
import { Link, useHistory, useLocation } from 'react-router-dom';



if (firebase.apps.length === 0) {

    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({

        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false

    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser.name)
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {

        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var credential = result.credential;
                const { displayName, email } = result.user;
                // console.log(result.user)
                const signedInUser = { name: displayName, email: email };
                // console.log(signedInUser)
                setLoggedInUser(signedInUser);
                history.replace(from)
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

    }
    
  const handleFbSignIn = () => {
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        const { displayName, email } = result.user;
       //console.log(result.user)
        const signedInUser = { name: displayName, email: email };
        setLoggedInUser(signedInUser);
        history.push('/confirmation')
      })

      .catch((error) => {

        // console.log(error,'ERROR')

        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email)
      });


  }

    
    const handleBlur = (e) => {
        // console.log(e.target.name,e.target.value)
        let isFieldValid = true;
        if (e.target.name === 'email') {
            const isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if (e.target.name === 'password') {

            const isValidPass = e.target.value.length > 6;
            const hasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = (isValidPass && hasNumber);
        }
        if (isFieldValid) {

            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);

        }
    }
    const updateUser = name => {
        const user = firebase.auth().currentUser;
        
        user.updateProfile({
            displayName: name
            

        }).then(function () {

        }).catch(function (error) {
            
        });
    }
     const handleSubmit = (e) => {

         if (newUser && user.email && user.password) {
             firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                 .then(res => {

                     const newUserInfo = { ...user };
                    newUserInfo.error = '';
                     newUserInfo.success = true;
                     setUser(newUserInfo);
                    updateUser(user.name);

                 })
                 .catch(error => {
                     const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                     newUserInfo.success = false;
                     setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    console.log(res)
    
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
    
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
    
                });
            }

         e.preventDefault();
     }

    return (
        <div>
            <div className="formStyle">
                
                <form onSubmit={handleSubmit}>

                {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Name"></input>}
                <br/>
                    <input type="text" name="email" onBlur={handleBlur} placeholder="Email"></input>
                    <br/>
                    <input type="password" name="password" onBlur={handleBlur} placeholder="Password"></input>
                    <br />
                    {newUser && <input type="password" name="password" onBlur={handleBlur} placeholder="Confirm Password"></input>}
                    <br/>
                    <input type="submit" value={newUser?'Sign Up':'Sign In'} ></input>
                    <br/>

                    
                    {newUser && <label style={{fontSize:'20px'}}  htmlFor='!newUser'>Already Have an account?</label>}
                    {!newUser && <label style={{fontSize:'20px'}} htmlFor='newUser'>Don't have any account?</label>}
                    
                    
                   {!newUser && <input type="checkbox" onChange={()=>setNewUser(!newUser)}>
                       </input>}
                       {newUser && <input type="checkbox" onChange={()=>setNewUser(!newUser)}>
                       </input>}
                
                    
                </form>
                <p style={{ color: 'red' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green' }}>User {newUser?'Signed Up':'Sign In'} Successfully</p>}
                <br/>
                <button onClick={handleGoogleSignIn}>Google Sign In</button>
                <br/>
                <button onClick={handleFbSignIn}>Facebook Sign In</button>
            </div>
            <br />

        </div>
    );
};

export default Login;