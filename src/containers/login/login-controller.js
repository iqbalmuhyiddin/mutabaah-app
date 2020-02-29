import React from "react";
import { AuthContext } from "context";
import { firebase } from "config";

import moment from "moment";
import View from "./login-view";
import { useHistory } from "react-router-dom";

const Controller = () => {
  const db = firebase.firestore();
  const authCtx = React.useContext(AuthContext);

  const history = useHistory();
  const [isLoading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({ email: "" });

  const _getUser = async email => {
    setLoading(true);
    const user = await db
      .collection("users")
      .doc(email)
      .get();
    setLoading(false);

    return user;
  };

  const _storeUser = async user => {
    setLoading(true);
    db.collection("users")
      .doc(user.email)
      .set({ ...user, groupId: null, groupName: null });
    setLoading(false);

    return _getUser(user.email);
  };

  const _onSuccessOauth = async res => {
    setUser(res.profileObj);

    const user = await _getUser(res.profileObj.email);

    if (user.exists) return user;

    const newUser = await _storeUser(res.profileObj);
    return newUser;
  };

  const _login = res => {
    const userData = {
      token: res.accessToken,
      profile: res.profileObj
    };

    const expireDate = moment()
      .add(7, "days")
      .toDate();

    return authCtx.setToken(userData, expireDate);
  };

  React.useEffect(() => {
    if (authCtx.isLogin()) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
