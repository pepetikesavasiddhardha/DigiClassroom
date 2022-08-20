import React, { useEffect } from "react";
import "./Home.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {auth,SignInWithGoogle} from "../firebase";
function Home() {
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) history("/dashboard");
  },[loading, user]); 
  return ( 
<div className="home">
  <div className="home__container">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/5/59/Google_Classroom_Logo.png"
      alt="Google Classroom "
      className="home__image"
    />
    <button className="home__login" onClick={SignInWithGoogle}>
      Login with Google
    </button>
  </div>
</div>
  )
}

export default Home;