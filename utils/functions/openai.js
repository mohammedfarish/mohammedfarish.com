const { default: axios } = require("axios");

/**
 * Generate text completion based on given prompt using OpenAI's GPT-3 API.
 * @param {Object} options - Options for generating text completion.
 * @param {string} options.prompt - The text prompt to generate completion for.
 * @param {string} [options.model="text-davinci-003"] - The name of the GPT-3 model to use.
 * @param {number} [options.temperature=0.7] - Controls the "creativity" of generated text.
 * @param {number} [options.maxTokens=256] - The maximum number of tokens to generate.
 * @param {number} [options.frequencyPenalty=0] - Controls the degree to which model
 * should avoid repetition.
 * @param {number} [options.presencePenalty=0] - Controls the degree to which model should
 * avoid generating words not present in the prompt.
 * @returns {Promise<string|Error>} - A promise that resolves with the generated text
 * completion or rejects with an error.
 */
const openaiCompletions = async (options) => {
  try {
    if (!options.prompt) throw new Error("Prompt is required");

    // const postData = {
    //   prompt: options.prompt,
    //   model: options.model || "text-davinci-003",
    //   temperature: options.temperature || 0.7,
    //   // max_tokens: options.maxTokens || 256,
    //   // frequency_penalty: options.frequencyPenalty || 1.5,
    //   presence_penalty: options.presencePenalty || 1,
    // };

    const postData = {
      model: options.model || "gpt-3.5-turbo-16k",
      frequency_penalty: options.frequencyPenalty || 1,
      presence_penalty: options.presencePenalty || 0,
      messages: [
        {
          role: "system",
          content: options.prompt,
        },
      ],
    };

    let response = {
      id: "chatcmpl-8Udmxoer8MkEIT3CKdMnsUUy9cvYb",
      object: "chat.completion",
      created: 1702313479,
      model: "gpt-3.5-turbo-1106",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "# About Me\n\nI am an enthusiastic and dedicated individual with a passion for writing and creativity. With a background in marketing and a love for storytelling, I am always seeking new opportunities to share my unique perspective. Check out my [portfolio](link) to see my work!",
          },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 47,
        completion_tokens: 55,
        total_tokens: 102,
      },
      system_fingerprint: "fp_eeff13170a",
    };

    response = await axios.post("https://api.openai.com/v1/chat/completions", postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    })
      .then((res) => res.data)
      .catch((error) => { throw new Error(error.response.data.error.message); });

    return response.choices[0].message.content;
  } catch (error) {
    return null;
  }
};

module.exports = {
  openaiCompletions,
};
