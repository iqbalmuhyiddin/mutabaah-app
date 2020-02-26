import React from "react";
import { AuthContext } from "context";
import { firebase } from "config";

import moment from "moment";
import View from "./login-view";

const Controller = () => {
  const db = firebase.firestore();
  const authCtx = React.useContext(AuthContext);

  const [isLoading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({ email: "" });
  const [token, setToken] = React.useState(null);

  const _checkUser = async profile => {
    setLoading(true);
    const user = await db
      .collection("users")
      .doc(profile.email)
      .get();
    setLoading(false);

    return user;
  };

  const _storeUser = async user => {
    setLoading(true);
    const newUser = await db
      .collection("users")
      .doc(user.email)
      .set({ ...user, groupId: null, groupName: null });
    setLoading(false);

    return newUser;
  };

  const _onSuccessOauth = async res => {
    setUser(res.profileObj);

    setToken(res.accessToken);
    const user = await _checkUser(res.profileObj);

    if (user.exists) return user;

    const newUser = await _storeUser(res.profileObj);
    return newUser;
  };

  const _login = () => {
    const userData = {
      token: token,
      profile: user
    };

    const expireDate = moment()
      .add(7, "days")
      .toDate();

    authCtx.setToken(userData, expireDate);
  };

  return (
    <View
      onOk={_onSuccessOauth}
      isLoading={isLoading}
      user={user}
      login={_login}
    />
  );
};

export default Controller;
