import Link from "next/link";
import React, { PureComponent } from "react";

import styles from "../../styles/footer.module.css";

export default class Footer extends PureComponent {
  render() {
    return (
      <div className={styles.footer}>
        <Link href="/">
          <a href="/" className={styles.footertext}>
            ©
            {" "}
            {new Date().getFullYear()}
            {" "}
            Mohammed Farish. All rights reserved.
          </a>
        </Link>
      </div>
    );
  }
}
