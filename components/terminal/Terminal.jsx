import React, { PureComponent } from "react";
import Moment from "moment-timezone";
import axios from "axios";
import Cmd from "terminal-in-react";
import { MacTerminal } from "react-window-ui";

import styles from "../../styles/terminal.module.css";

export default class Terminal extends PureComponent {
  constructor(props) {
    super(props);
    this.commands = this.commands.bind(this);
    this.renderHelp = this.renderHelp.bind(this);
  }

  commands(cmd, print) {
    const command = cmd.join(" ").toLowerCase();
    const { router } = this.props;

    switch (command) {
      case "email":
        print("hello@mohammedfarish.com");
        break;

      case "location":
        axios.get("/api/location")
          .then((response) => {
            print(JSON.stringify(response.data));
          })
          .catch(() => {
            print("Unknown");
          });
        break;

      case "help":
        print(this.renderHelp());
        break;

      case "reload":
        print("reloading...");
        setTimeout(() => {
          router.reload();
        }, 2000);
        break;

      case "login":
        print("redirecting...");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
        break;

      case "rockets":
        print("fetching upcoming mission ...");
        axios.get("/api/terminal", {
          params: {
            q: "rockets",
            tz: Moment.tz.guess(),
          },
        })
          .then((response) => {
            print(response.data.launchData);
          })
          .catch(() => print("Internal Server Error"));
        break;

      case "ls":
        print("Filesystem feature disabled. Type 'help' to find other commands.");
        break;

      case "cd":
        print("Filesystem feature disabled. Type 'help' to find other commands.");
        break;

      default:
        print(`bash: command not found: ${cmd[0]}`);
        break;
    }
  }

  renderHelp() {
    const commandsList = [
      {
        name: "clear",
        description: "Clears the terminal",
      },
      {
        name: "email",
        description: "Displays my email",
      },
      {
        name: "location",
        description: "Fetches the last known location",
      },
      {
        name: "rockets",
        description: "Shows the next rocket launch",
      },
    ];

    const parsedArray = [];
    commandsList.forEach((comm) => {
      const { name, description } = comm;
      parsedArray.push(`${name} - ${description}`);
    });

    return parsedArray.join("\n\n");
  }

  render() {
    const commandList = {
      help: () => this.renderHelp(),
      "-h": () => this.renderHelp(),
      "--h": () => this.renderHelp(),
    };
    return (
      <MacTerminal
        title="Type 'help' to see available commands"
        style={{
          overflowY: "hidden",
          width: "100%",
          height: "100%",
        }}
        className={styles.terminalWindow}
      >
        <Cmd
          className={styles.terminal}
          color="white"
          allowTabs={false}
          msg="Type 'help' to see available commands"
          promptSymbol="root@farish - $ "
          prompt="This is a prompt"
          hideTopBar
          commandPassThrough={(cmd, print) => this.commands(cmd, print)}
          showActions
          description="this is a description"
          outputColor="lightgreen"
          style={{
            overflowY: "hidden",
            width: "100%",
            height: "100%",
            fontSize: "12px",
          }}
          commands={commandList}
        />
      </MacTerminal>
    );
  }
}
