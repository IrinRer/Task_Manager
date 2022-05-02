# Проект "Трекер задач" в рамках весенней стажировки 2022 (группа 3)

## Установка проекта

```bash
git clone
npm ci
```

## Запуск проекта в режиме разработки

```bash
npm run start
```

## Общая информация

В файле `.env` хранятся переменные окружения, необходимые для разработки

| Переменная | Предназначение |
| ------ | ------ |
| REACT_APP_BACKEND_URL | URL бэкенда |
| HOST_URL | URL нашего контура |

## Gitflow & code-review

- От ветки `develop` создаем свою ветку с наименованием `feature/...` или `bugfix/...`, где ... - номер задачи
- Пишем в ней код, заливаем его в гит по мере необходимости
- По мере реализации задачи - мержим к себе в ветку актуальный `develop` (находясь в своей ветке с закоммиченными изменениями пишем `git merge origin/develop`)
- Создаем МР в `develop`
- Скидываем МР в группу `group-3_code-review`, с кратким описанием что было сделано в задаче
- Другие разработчики смотрят МР, при необходимости комментируют его предлагая альтернативные решения, если по их мнению код можно реализовать более оптимальным путем. Мнение со стороны - не последняя инстанция, его нужно обсуждать
- Если у вас нет вопросов по МРу - реакцией на сообщение ставьте :+1: . Если есть какие-то вопросы или предложения - временно можете поставить :question:, чтобы автор увидел вашу реакцию и посмотрел в гитлабе ваш комментарий
- После обсуждения необходимо убрать вопрос и поставить лайк
- МР принимает @vlad.polyukhov после того, как будет минимум 2 лайка от стажеров. Просьба быть максимально вовлеченными в кросс-ревью, это поможет вместе поддерживать порядок в коде и перенимать знания друг у друга.

## Необходимые расширения для разработки

- [ESLint]
- [Prettier]

[ESLint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[Prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
