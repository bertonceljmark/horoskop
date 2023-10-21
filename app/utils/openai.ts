import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

export default openai;
