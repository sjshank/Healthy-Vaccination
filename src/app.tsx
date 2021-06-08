import "./app.css";
import FooterComponent from "./components/Footer";
import HeaderComponent from "./components/Header";
import React from "react";
import Routes from "./config/app.route";
import ScrollUpButton from "react-scroll-up-button";
import WithPageViewTracking from "./HOC/PageViewTracking";

const App = () => {
  return (
    <>
      <HeaderComponent />
      <div className="app">{Routes()}</div>
      <FooterComponent />
      <ScrollUpButton
        StopPosition={0}
        ShowAtPosition={180}
        EasingType="easeOutCubic"
        AnimationDuration={400}
        ContainerClassName="ScrollUpButton__Container"
        TransitionClassName="ScrollUpButton__Toggled"
        ToggledStyle={{ bottom: 60 }}
      />
    </>
  );
};

export default WithPageViewTracking(App);
