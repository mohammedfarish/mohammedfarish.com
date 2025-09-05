import { executeCommand } from "./terminal";
import { chat } from "./chat";

const actions = [
  {
    name: "terminal-command",
    handler: executeCommand,
  },
  {
    name: "chat",
    handler: chat,
  },
] as const;

export type DirectoryTypes = (typeof actions)[number]["name"];

export type FunctionMap = {
  [F in DirectoryTypes]: {
    args: Parameters<Extract<(typeof actions)[number], { name: F }>["handler"]>;
    returnType: Awaited<ReturnType<Extract<(typeof actions)[number], { name: F }>["handler"]>>;
  };
};

export type ActionResponse<ReturnType> = { success: false; error: string } | { success: true; data: ReturnType };

const actionFunction = async <ActionName extends DirectoryTypes>(
  action: ActionName,
  ...args: FunctionMap[ActionName]["args"]
): Promise<ActionResponse<FunctionMap[ActionName]["returnType"]>> => {
  const handler = actions.find((f) => f.name === action);

  if (!handler) {
    throw new Error(`Function ${action} not found`);
  }

  try {
    // @ts-ignore
    const response = (await handler.handler(...args)) as FunctionMap[ActionName]["returnType"];

    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message as string,
    };
  }
};

export default actionFunction;
