import React from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import {toast} from "react-toastify"
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase.config';
import { updateDoc,doc } from 'firebase/firestore';
export default function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  console.log(auth);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };
  const onSubmit =async () => {
    try {
      if (auth.currentUser.displayName !== name) {
      // updatae profile
        await updateProfile(auth.currentUser,{
          displayName: name
        })
// update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
          email
        })

    }
    } catch (e) {
      toast.error("could not update profile Details")
  }
}
  const onChange = (e) => {
    console.log(e.target.value)
    setFormData((prev) => 
      ({
        ...prev,
        [e.target.id]:e.target.value,
      
    })
    )
  }
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
               changeDetails && onSubmit();
              setChangeDetails((prev) => !prev);
            }}
          >
            {changeDetails ? 'Done' : 'Change'}
          </p>
        </div>
        <div className="profileCard">
          {changeDetails? <h4>Change only Name</h4>:"" }
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type="text"
              id="email"
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
}
