import React from "react";
import styles from "./Error.module.scss";

const Error = () => {
  return (
    <div className="dark:bg-[#151617] -mt-7">
      <div className={`${styles.container}`}>
        <div className={`${styles.errorContainer}`}>
          <div className={styles.errorTextBlock}>
            <p className={`${styles.errorNum} font-inter text-white`}>404</p>
            <p className={`${styles.errorMessage} font-inter text-white`}>
              Sorry, we couldn't find the page
            </p>
          </div>
          <div className={styles.imgContainer}></div>
        </div>
      </div>
    </div>
  );
};

export default Error;
