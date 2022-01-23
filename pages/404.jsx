import React, { useEffect } from "react";
import Link from "next/link";

import styles from "../styles/error404.module.css";

function Error404({ setSiteTitle }) {
  useEffect(() => {
    setSiteTitle("Page not Found");

    return () => {
      setSiteTitle(null);
    };
  }, []);

  return (
    <div className={styles.errorpage}>
      <div className={styles.errorbigmessage}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.142 2l5.858 5.858v8.284l-5.858 5.858h-8.284l-5.858-5.858v-8.284l5.858-5.858h8.284zm.829-2h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-5.971 6h2v8h-2v-8zm1 12.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" /></svg>
        <h1>404</h1>
        <span>Page not Found</span>
      </div>
      <div className={styles.errormessage}>
        <span>Are you sure that's the page you were looking for?</span>
      </div>
      <div className={styles.errorpagebutton}>
        <Link replace href="/">
          <button type="button">GO HOME</button>
        </Link>
      </div>
    </div>
  );
}

export default Error404;
