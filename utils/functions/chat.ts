import axios from "axios";
import moment from "moment-timezone";

import { newLLMWebhook, newLLMWebhookAPIKey } from "../data";

export const chat = async ({ message, session_id }: { message: string; session_id: string }) => {
  const expire = moment().add(3, "days").unix();

  if (!newLLMWebhook) throw new Error("New LLM Webhook is not set");

  const response = await axios
    .post(
      newLLMWebhook,
      {
        message,
        session_id,
        expire,
      },
      {
        headers: {
          api_token: newLLMWebhookAPIKey,
        },
      }
    )
    .then((res) => res.data as { response: string });

  console.log({
    req: message,
    res: response.response,
  });

  return {
    response: response.response,
    expire,
  };
};
