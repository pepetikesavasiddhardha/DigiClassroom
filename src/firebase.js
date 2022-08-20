import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA3G59u1m4sh3BQjyVAJgiQ-X4E8b9PNEE",
    authDomain: "digi-classroom-eb490.firebaseapp.com",
    projectId: "digi-classroom-eb490",
    storageBucket: "digi-classroom-eb490.appspot.com",
    messagingSenderId: "617634361021",
    appId: "1:617634361021:web:4d6d61ce372bbac6f851d4",
    measurementId: "G-3R2Q8BR561"
  };
  const app=firebase.initializeApp(firebaseConfig);
  const auth=app.auth();
  const db=app.firestore();
  const storage=getStorage(app)
  const googleProvider=new firebase.auth.GoogleAuthProvider();
  // Sign in and check or create account in firestore
  const SignInWithGoogle = async () =>{
    try{
        const response =await auth.signInWithPopup(googleProvider);
        console.log(response.user);
        const user=response.user;
        console.log(`User ID -${user.uid}`);
        const querySnapShot= await db.collection("users").where("uid","==",user.uid).get();
        if(querySnapShot.docs.length===0){
            await db.collection("users").add({
                uid:user.uid,
                enrolledClassrooms : [],
            });
        } 
    }catch (err){
        alert(err.message);
    }
  };

  const logout = () => {
    auth.signOut();
  };
  export { app,auth,db,SignInWithGoogle,logout,storage};