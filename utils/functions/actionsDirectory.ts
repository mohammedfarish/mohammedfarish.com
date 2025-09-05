import axios from "axios";

import type { ActionResponse, DirectoryTypes, FunctionMap } from "@/utils/functions/actions";

const actionsDirectory = async <ActionName extends DirectoryTypes>(
  action: ActionName,
  ...args: FunctionMap[ActionName]["args"]
): Promise<ActionResponse<FunctionMap[ActionName]["returnType"]>> => {
  const req = [...args];

  const path = action.split("-").join("/");

  const request = await axios
    .post("/api/" + path, req)
    .then((res) => res.data)
    .catch((err) => ({
      success: false,
      error: err.message,
    }));

  return request;
};

export default actionsDirectory;
