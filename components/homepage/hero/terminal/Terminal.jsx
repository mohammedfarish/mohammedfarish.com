import React from "react";
import Moment from "moment-timezone";
import axios from "axios";
import Cmd from "terminal-in-react";
import { MacTerminal } from "react-window-ui";

import styles from "./terminal.module.css";

function Terminal({ router }) {
  const renderHelp = () => {
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
  };

  const commands = (cmd, print) => {
    const command = cmd.join(" ").toLowerCase();
    const commandSplit = command.split(" ");

    let cmdResponse = null;

    try {
      switch (commandSplit[0]) {
        case "email":
          cmdResponse = "hello@mohammedfarish.com";
          break;

        case "location":
          cmdResponse = "fetching location ...";
          axios.get("/api/location")
            .then((response) => print(JSON.stringify(response.data, null, 4)))
            .catch(() => print("Internal Server Error"));
          break;

        case "help":
          cmdResponse = renderHelp();
          break;

        case "reload":
          cmdResponse = "reloading...";
          setTimeout(() => {
            router.reload();
          }, 2000);
          break;

        case "login":
          cmdResponse = "redirecting...";
          setTimeout(() => {
            router.push("/login");
          }, 1000);
          break;

        case "rockets":
          if (commandSplit[1]) {
            cmdResponse = null;
          } else {
            cmdResponse = "fetching upcoming mission ...";
            axios.get("/api/terminal", {
              params: {
                q: "rockets",
                tz: Moment.tz.guess(),
              },
            })
              .then((response) => { print(response.data.launchData); })
              .catch(() => print("Internal Server Error"));
          }

          break;

        case "ls":
          cmdResponse = "Filesystem feature disabled. Type 'help' to find other commands.";
          break;

        case "cd":
          cmdResponse = "Filesystem feature disabled. Type 'help' to find other commands.";
          break;

        default:
          cmdResponse = null;
          break;
      }
    } catch (error) {
      cmdResponse = null;
    }

    if (!cmdResponse) cmdResponse = `bash: command not found: ${command}`;

    print(cmdResponse);
  };

  const commandList = {
    help: () => renderHelp(),
    "-h": () => renderHelp(),
    "--h": () => renderHelp(),
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
        // commandPassThrough={(cmd) => `-PassedThrough:${cmd}: command not found`}
        commandPassThrough={(cmd, print) => commands(cmd, print)}
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

export default Terminal;
