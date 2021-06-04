import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { IconContext } from "react-icons";
import * as AppConstant from "./constants/appConstant";
import App from "./app";
import actionSprite from "@salesforce-ux/design-system/assets/icons/action-sprite/svg/symbols.svg";
import customSprite from "@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg";
import utilitySprite from "@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg";
import standardSprite from "@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg";
import doctypeSprite from "@salesforce-ux/design-system/assets/icons/doctype-sprite/svg/symbols.svg";
import IconSettings from "@salesforce/design-system-react/components/icon-settings";
import Settings from "@salesforce/design-system-react/components/settings";
import { ToastProvider } from "react-toast-notifications";
Settings.setAppElement("#app");

ReactDOM.render(
  <IconSettings
    standardSprite={standardSprite}
    utilitySprite={utilitySprite}
    actionSprite={actionSprite}
    doctypeSprite={doctypeSprite}
    customSprite={customSprite}
  >
    <IconContext.Provider value={{ color: "#0176d3" }}>
      <BrowserRouter>
        <ToastProvider {...AppConstant.TOAST_OPTIONS}>
          <App />
        </ToastProvider>
      </BrowserRouter>
    </IconContext.Provider>
  </IconSettings>,
  document.getElementById("app")
);
