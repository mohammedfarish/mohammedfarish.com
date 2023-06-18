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

    const postData = {
      prompt: options.prompt,
      // model: options.model || "text-davinci-003",
      model: options.model || "gpt-4",
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 256,
      frequency_penalty: options.frequencyPenalty || 0,
      presence_penalty: options.presencePenalty || 0,
    };

    const response = await axios.post("https://api.openai.com/v1/completions", postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    })
      .then((res) => res.data);

    return response.choices[0].text;
  } catch (error) {
    return null;
  }
};

module.exports = {
  openaiCompletions,
};
