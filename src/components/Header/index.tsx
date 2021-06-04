import React from "react";
import { withRouter } from "react-router-dom";
import styles from "./styles.module.less";

const HeaderComponent = (props: any) => {
  const clickHandler = () => {
    props.history.push("/");
  };

  return (
    <header className={`slds-page-header ${styles.appHeader}`}>
      <div className="slds-page-header__row">
        <div className="slds-page-header__col-title">
          <div className="slds-media">
            <div className="slds-media__figure">
              <img
                className={styles.statelogo}
                src="https://ndhm.gov.in/assets/images/healthministry.svg"
                onClick={clickHandler}
              ></img>
            </div>
            <div className="slds-media__body">
              <div
                className="slds-page-header__name"
                onClick={clickHandler}
                style={{ cursor: "pointer" }}
              >
                <div className="slds-page-header__name-title">
                  <h1>
                    <span
                      className="slds-page-header__title slds-truncate"
                      title="Tika Portal"
                    >
                      IN-Vaccination
                    </span>
                  </h1>
                </div>
              </div>
              <p
                className="slds-page-header__name-meta"
                onClick={clickHandler}
                style={{ cursor: "pointer" }}
              >
                India Vaccination Statistics
              </p>
            </div>
          </div>
        </div>
        {/* <div className="slds-text-align_right">
          <img src={GithubLogo} alt="logo" />
        </div> */}
      </div>
    </header>
  );
};

export default withRouter(HeaderComponent);
