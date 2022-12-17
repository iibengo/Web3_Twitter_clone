import { Input, Upload } from "@web3uikit/core";
import React, { useState } from "react";
import { MenuContainer } from "../../components/";
import "./Settings.css";

export const Settings = () => {
  const [profileFile, setProfileFile] = useState({});
  const [bannerFile, setBannerFile] = useState({});
  const [name, setName] = useState("");
  const [bio, setBio] = useState();
  const bannerHanfler = (event: Blob | null | undefined) => {
    if (event != null) {
      setBannerFile(event);
    }
  };
  const profileHandler = (event: Blob | null | undefined) => {
    if (event != null) {
      setProfileFile(event);
    }
  };
  return (
    <>
      <div className="settingsPage">
        <Input
          label="Name"
          name="NameChange"
          width="100%"
          labelBgColor="#141d26"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Bio"
          name="BioChange"
          width="100%"
          labelBgColor="#141d26"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="pfp">Change profile Image</div>
        <Upload onChange={profileHandler} />
        <div className="pfp">Change banner Image</div>
        <Upload onChange={bannerHanfler} />
        <div className="save">Save</div>
      </div>
    </>
  );
};
