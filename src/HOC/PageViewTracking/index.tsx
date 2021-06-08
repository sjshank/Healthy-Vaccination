import ReactGA from "react-ga";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

const WithPageViewTracking = (WrappedComponent: any) => {
  return (props: any) => {
    const history = useHistory();
    useEffect(() => {
      ReactGA.pageview(history.location.pathname + history.location.search);
    });
    return <WrappedComponent {...props} />;
  };
};

export default WithPageViewTracking;
