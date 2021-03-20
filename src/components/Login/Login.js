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

    const handleSubmit = (e) =>{


    if (!newUser && user.email && user.password) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {

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
    // const handleSubmit = (e) => {

    //     if (newUser && user.email && user.password) {
    //         firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    //             .then(res => {

    //                 const newUserInfo = { ...user };
    //                 newUserInfo.error = '';
    //                 newUserInfo.success = true;
    //                 setUser(newUserInfo);
    //                 updateUser(user.name);

    //             })
    //             .catch(error => {
    //                 const newUserInfo = { ...user };
    //                 newUserInfo.error = error.message;
    //                 newUserInfo.success = false;
    //                 setUser(newUserInfo);
    //             });
    //     }
    //     e.preventDefault();

    // }

    return (
        <div>
            <div className="formStyle">

                <form onSubmit={handleSubmit}>

                    <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email"></input>
                    <br />

                    <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password"></input>
                    <br />
                    <input type="submit" value="Log In" ></input>
                    <br/>
                    
                    <p>Don't have an account?<Link to="/signup">Create an account</Link></p>
                    
                </form>
                <p style={{ color: 'red' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green' }}>User logged In Successfully</p>}
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

export default Login;