import Link from "next/link";
import React, { PureComponent } from "react";

import styles from "../../styles/gdprbanner.module.css";

export default class GDPR extends PureComponent {
  constructor(props) {
    super(props);

    this.onClickAction = this.onClickAction.bind(this);
    this.state = {
      hideBanner: true,
    };
  }

  componentDidMount() {
    const gdprBannerShown = window.localStorage.getItem("gdpr-acknowledged");
    if (!gdprBannerShown) {
      this.setState({
        hideBanner: false,
      });
    }
  }

  onClickAction() {
    window.localStorage.setItem("gdpr-acknowledged", true);
    this.setState({
      hideBanner: true,
    });
  }

  render() {
    const { hideBanner } = this.state;
    return (
      <div hidden={hideBanner}>
        <div className={styles.banner}>
          <span>
            This website uses stuffs like cookies to get the site running properly.
            So by using this website, I'm going to assume that you're fine with it and if
            you want to know what happens on the backend, with these cookies, you can read the
            {" "}
            <Link href="/privacy-policy">
              <a href="/privacy-policy">
                <span
                  onClick={this.onClickAction}
                  className={styles.bannerNegativeAction}
                >
                  Privacy Statement
                </span>
              </a>
            </Link>
            {" "}
            and choose to opt-out, if you feel like you should.
            {" "}
            <span
              onClick={this.onClickAction}
              className={styles.bannerAction}
            >
              That's alright!
            </span>
          </span>
        </div>
      </div>
    );
  }
}
