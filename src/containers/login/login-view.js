import React from "react";
import { GoogleLogin } from "react-google-login";
import { Spin } from "antd";
import { useHistory } from "react-router-dom";

import FormSelectGroup from "./selectGroup";

const View = ({ isLoading, onOk, user, login }) => {
  const [isSelectGroup, setSelectGroup] = React.useState(false);
  const history = useHistory();

  const _onSuccess = {
    google: async res => {
      login(res);
      const userData = await onOk(res);
      if (!userData.data().groupId) {
        return setSelectGroup(true);
      }
      return history.push("/");
    },
    group: () => {
      setSelectGroup(false);
      return history.push("/");
    }
  };

  const _onFailure = response => {
    console.log(response);
  };
  return (
    <>
      <FormSelectGroup
        onSuccess={_onSuccess.group}
        email={user.email}
        isOpen={isSelectGroup}
      />

      <div className="h-100 d-flex justify-content-center align-items-center ">
        {isLoading && <Spin />}
        {!isLoading && (
          <GoogleLogin
            clientId="641594170437-hh4kl28suuo71f5ojbg6drihupeko16g.apps.googleusercontent.com"
            buttonText="Masuk dengan akun google"
            onSuccess={_onSuccess.google}
            onFailure={_onFailure}
            cookiePolicy={"single_host_origin"}
          />
        )}
      </div>
    </>
  );
};

export default View;
