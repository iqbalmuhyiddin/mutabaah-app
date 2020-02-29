import React from "react";
import { Label } from "components";
import { Button } from "antd";

const Profile = ({ name, email, avatar, onLogout }) => (
  <div className="p-3 text-center">
    <img src={avatar} className="rounded-circle mb-2" alt="" />
    <Label>{name}</Label>
    <Label>{email}</Label>
    <Button onClick={onLogout}>Keluar</Button>
  </div>
);

export default Profile;
