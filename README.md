# Technokratos React Boilerplate

## Состав

- Сборщик Vite
- TypeScript
- SASS
- ESLint
- Stylelint
- Prettier

## Пакетный менеджер Yarn

## Vite – сборщик

Проверки ESLint, Stylelint и Prettier происходит перед коммитом через хук Husky. Чтобы вручную сделать проверку, отправьте команду: `yarn all-checks`. Такая же проверка происходит перед сборкой `yarn build`.

## TODO

- Сделать линтер для SASS.

## Тесты

Команда для локального запуска тестов: `yarn test`.

Команда для запуска тестов во время CI: `yarn test:ci`.
