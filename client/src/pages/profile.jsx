import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/User/userSlice";

import "./profile.css";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await fetch("/API/auth/signout");
      dispatch(signOut());
      navigate("/SignIn", { replace: true }); // Then navigate to SignIn page
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/API/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };
  return (
    <div className="profile-bg">
      <button onClick={handleSignOut} className="content-btn btn regen-btn">
        Signout
      </button>
      <button onClick={handleDeleteAccount} className="content-btn btn regen-btn">Delete account</button>
    </div>
  );
}
