import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import './SignUp.css'
import { Link, useHistory, useLocation } from 'react-router-dom';






if (firebase.apps.length === 0) {

    firebase.initializeApp(firebaseConfig);
}

const SignUp = () => {
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
            console.log(result.user)
            const signedInUser = { name: displayName, email: email };
            setLoggedInUser(signedInUser);
            history.replace(from)
          })
    
          .catch((error) => {
    
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

    const handleSubmit = (e) => {
        // console.log(e)

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
        e.preventDefault();

    }
    const updateUser = name => {
        const user = firebase.auth().currentUser;
        
        user.updateProfile({
            displayName: name
            

        }).then(function () {

        })(error => {
            const newUserInfo = { ...user };
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
            
        });
    }
    return (

        <div>


            <div>
                <form onSubmit={handleSubmit} className="formStyle">

                    <input type="text" name="name" onBlur={handleBlur} placeholder="Name"></input>
                    <br />

                    <input type="text" name="email" onBlur={handleBlur} placeholder="Email"></input>
                    <br />

                    <input type="password" name="password" onBlur={handleBlur} placeholder="Password"></input>
                    <br />

                    <input type="password" name="password" onBlur={handleBlur} placeholder="Confirm Password"></input>

                    <br />
                    <input type="submit" value="Create an account" ></input>
                    <br />
                    <p>Already have an account?<Link to="/login">Sign In</Link></p>

                </form>
                <p style={{ color: 'red' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green' }}>User created Successfully</p>}
                
                
            </div>
            <br />
            <div className="logoStyle">
                <button onClick={handleGoogleSignIn}>Google Sign In</button>
                <br/>
                <button onClick={handleFbSignIn}>Facebook Sign In</button>
            </div>


        </div>



    );
};

export default SignUp;