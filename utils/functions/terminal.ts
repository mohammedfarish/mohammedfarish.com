import moment from "moment-timezone";

import { getNextRocketLaunch } from "./rockets";
// import { terminalChat } from "./ai";

export type CMDObject = {
  cmd: string;
  description: string;
  response: (...args: any) => void;
};

const commandsList = () => {
  const cmds: CMDObject[] = [
    // {
    //   cmd: "chat",
    //   description: "chat with the llm",
    //   response: terminalChat,
    // },
    // {
    //   cmd: "currency",
    //   description: "Convert currency from one to another. Usage: currency [from] [to] [amount]",
    //   response: getNextRocketLaunch,
    // },
    {
      cmd: "rockets",
      description: "upcoming rocket launches",
      response: getNextRocketLaunch,
    },
    {
      cmd: "email",
      description: "shows email",
      response: () => "me@fari.sh",
    },
    {
      cmd: "clear",
      description: "clears the terminal",
      response: () => undefined,
    },
  ];

  const help: CMDObject = {
    cmd: "help",
    description: "help command",
    response: () => {
      const now = moment().format("LLLL");
      const tz = moment.tz.guess();

      const header = `
┌─┐┌─┐┬─┐┬ ┌─┐┬ ┬
├┤ ├─┤├┬┘│ └─┐├─┤
└  ┴ ┴┴└─┴o└─┘┴ ┴

Welcome!

This is a web-based terminal emulator that allows you to run a limited set of commands and interact with my website. It is not a full-fledged terminal and does not support all commands. If you need to run more complex commands or require more advanced functionality, please open a terminal on your local machine.

Server Time: ${now} (${tz})

Supported Commands:`;

      const response = cmds.reverse().map((cmd) => `${cmd.cmd.padEnd(10, " ")} - ${cmd.description}`);

      const final = header + "\n" + response.join("\n");
      return final;
    },
  };

  cmds.push(help);

  return cmds;
};

export const executeCommand = async (cmd: string) => {
  const command = commandsList().find((c) => c.cmd === cmd.split(" ")[0]);

  const args = cmd.split(" ").slice(1).join(" ");

  if (!command) throw new Error("Command not found");

  const response = await command.response(args);

  //   @ts-ignore
  return response as string;
};
