export const RULES = {
  input: [
    {
      required: true,
      message: 'Неверный формат данных',
      pattern: /^[1-6]$/gm,
    },
  ],
  password: [
    {
      required: true,
      message: 'Неверный пароль',
      pattern: /^.*(?=.{8,})(?=.*[0-9]+)(?=.*[A-Z]+)(?=.*[a-z]+).*$/gm,
    },
  ],
};
