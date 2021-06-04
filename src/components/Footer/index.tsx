import React from "react";
import styles from "./styles.module.less";

const FooterComponent = () => {
  return (
    <footer className="slds-docked-form-footer relativePosition">
      <div className="slds-list_vertical">
        <h4 className="slds-p-around_xxx-small slds-text-align_center fontWeight500">
          Copyright @ 2021 <a href="https://sjshank.com">Saurabh Shankariya</a>
        </h4>
        <small>
          Crafted with React + Typescript + Salesforce Lightning Design System
          + ❤️
        </small>
      </div>
    </footer>
  );
};

export default FooterComponent;
