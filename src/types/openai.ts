export type OpenAIPayload = {
  model: string;
  max_tokens: number;
  messages: {
    role: string;
    content: string;
  }[];
};
export type OpenAIResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: [
    {
      message: {
        role: string;
        content: string;
      };
      index: number;
      finish_reason: string;
    }
  ];
};
