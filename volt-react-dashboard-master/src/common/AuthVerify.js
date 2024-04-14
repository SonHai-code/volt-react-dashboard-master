import React, { useEffect } from "react";

import { withRouter } from "./with-router";

// CHECK IF the token expiration is valid.

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  let history = props.router.history;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const decodedJwt = parseJwt(user.token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [history, props]);

  return <div></div>;
};

export default withRouter(AuthVerify);
