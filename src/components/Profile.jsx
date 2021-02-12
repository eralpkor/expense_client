import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  console.log(currentUser)

  if (!currentUser) {
    return <Redirect to='login' />
  }

  return (
    <h3>{currentUser.username} Profile</h3>
  )
}

export default Profile;