export const RULES = {
  password: [
    {
      required: true,
      message: 'Неверный пароль',
      pattern: /^.*(?=.{8,})(?=.*[0-9]+)(?=.*[A-Z]+)(?=.*[a-z]+).*$/gm,
    },
  ],
};

export const VALIDATEMESSAGE = {
  pattern: {
    mismatch: undefined,
  },
  required: undefined,
};
