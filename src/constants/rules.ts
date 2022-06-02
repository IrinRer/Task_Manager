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

export const MAX_TASKS_ON_PAGE = 100;

/* Проверка ввода числа задач на странице - от 0 до 100 */
export const isValidPageSize = (value: string): boolean => {
  return (
    (/^\d{1,3}$/.test(value) &&
      Number(value) > 0 &&
      Number(value) <= MAX_TASKS_ON_PAGE) ||
    value.length === 0
  );
};
