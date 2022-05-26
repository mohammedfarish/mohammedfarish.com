import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import styles from "../../styles/messages.module.css";

import verifyUser from "../../utils/functions/verify";

import Loading from "../../components/loading/Loading";
import Error404 from "../404";
import CustomHead from "../../components/head/Head";

const messages = () => {
  const [msgs, setmsgs] = useState([]);
  const [disable, setDisable] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);

  const fetchMessages = () => {
    axios.get("/api/contact", {
      headers: {
        "x-auth-token": window.localStorage.getItem("user"),
      },
    })
      .then((response) => {
        if (response.data) {
          return setmsgs(response.data);
        }
        return setmsgs([]);
      });
  };

  const onClickMessageItem = (e) => {
    if (disable) return;
    setDisable(true);
    const { id, read } = e;
    if (read !== false) return;

    const data = {
      id,
      read,
    };

    axios.put("/api/contact", data, {
      headers: {
        "x-auth-token": window.localStorage.getItem("user"),
      },
    })
      .then((response) => {
        if (response.data) {
          const newMsgs = [];
          msgs.forEach((item) => {
            const {
              id: itemId,
              name,
              email,
              message,
              date,
              dateFormatted,
              deviceId,
              subject,
            } = item;
            let { read: readMsg } = item;
            if (itemId === id) {
              readMsg = true;
            }
            return newMsgs.push({
              id: itemId,
              name,
              email,
              message,
              date,
              dateFormatted,
              deviceId,
              subject,
              read: readMsg,
            });
          });

          setmsgs(newMsgs);
          return setDisable(false);
        }

        return setDisable(false);
      })
      .catch(() => setDisable(false));
  };

  const onPageLoad = async () => {
    const verify = await verifyUser();
    if (verify) {
      fetchMessages();
      return setLoggedIn(true);
    }
    return setLoggedIn(false);
  };

  useEffect(() => {
    onPageLoad();
  }, []);

  if (loggedIn === true) {
    return (
      <>
        <CustomHead title="Messages" />
        <div className={styles.messagesPage}>
          { msgs.map((item) => (
            <div
              onClick={(e) => onClickMessageItem({ ...e, id: item.id, read: item.read })}
              style={{ background: item.read ? "transparent" : "whitesmoke" }}
              className={styles.messageItem}
              key={item.id}
            >
              <div className={styles.messageItemName}>
                <span>{item.name}</span>
              </div>
              <div className={styles.messageItemEmail}>
                <Link href={`mailto:${item.email}`}>
                  <a href={`mailto:${item.email}`}>
                    <span>{item.email}</span>
                  </a>
                </Link>
              </div>
              <div className={styles.messageItemSubject}>
                <span>{item.subject}</span>
              </div>
              <textarea
                value={item.message}
                className={styles.messageItemMessage}
                readOnly
              />
              <div className={styles.messageItemTime}>
                <span>{`Sent ${item.dateFormatted}`}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (loggedIn === null) {
    return <Loading />;
  }

  return <Error404 />;
};

export default messages;
