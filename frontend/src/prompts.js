// simulate a backend where prompts are stored based on id
export const prompts = {
  2: [
    {
      type: 'url',
      value: 'https://huggingface.co/docs',
    },
    {
      type: 'command',
      value: 'Start the quicktour of PEFT',
    },
    {
      type: 'command',
      value: 'Do another tour',
    },
  ],
  // order an uber
  1: [
    {
      type: 'url',
      value: 'https://uber.com',
    },
    {
      type: 'command',
      value: 'login to your account, if not already',
    },
    {
      type: 'command',
      value: 'order a ride to 415 Mission St, San Francisco',
    },
    {
      type: 'command',
      value: 'choose uberx and leave immediately',
    },
  ],
};
