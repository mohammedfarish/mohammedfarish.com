import axios from "axios";

import type { ActionResponse, DirectoryTypes, FunctionMap } from "@/utils/functions/actions";

const actionsDirectory = async <ActionName extends DirectoryTypes>(
  action: ActionName,
  ...args: FunctionMap[ActionName]["args"]
): Promise<ActionResponse<FunctionMap[ActionName]["returnType"]> & { timeTaken: string }> => {
  const req = [...args];

  const path = action.split("-").join("/");

  const startTime = Date.now();

  const request = await axios
    .post("/api/" + path, req)
    .then((res) => res.data)
    .catch((err) => ({
      success: false,
      error: err.message,
    }));

  const timeTaken = Date.now() - startTime;

  const timeTakenString = timeTaken > 1000 ? `${(timeTaken / 1000).toFixed(2)}s` : `${timeTaken}ms`;

  console.log({
    action,
    timeTaken,
    timeTakenString,
  });

  return {
    ...request,
    timeTaken: timeTakenString,
  };
};

export default actionsDirectory;
