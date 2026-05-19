# Test Automation JS - Setup Guide

## Environment Variables

Цей проект використовує змінні оточення для конфіденційних даних. 

### Локальне налаштування

1. Скопіюйте або переійменуйте `.env.example` на `.env` (якщо файл існує):
```bash
cp .env.example .env
```

2. Заповніть значення в `.env` файлі:
```
BASE_URL=https://practicesoftwaretesting.com
USER_NAME=customer@practicesoftwaretesting.com
USER_EMAIL=customer@practicesoftwaretesting.com
USER_PASSWORD=welcome01
```

3. Встановіть залежності:
```bash
npm ci
```

4. Встановіть Playwright браузери:
```bash
npx playwright install --with-deps
```

### GitHub Secrets

Для запуску тестів в GitHub Actions потрібно додати наступні секрети в налаштування проекту:

1. Перейдіть на `Settings` → `Secrets and variables` → `Actions`
2. Додайте наступні секрети:
   - `BASE_URL` - базова URL вашого додатку
   - `USER_EMAIL` - email для тестування
   - `USER_NAME` - ім'я користувача
   - `USER_PASSWORD` - пароль для тестування

## Запуск тестів

### Всі тести
```bash
npx playwright test
```

### Smoke тести (з тегом @smoke)
```bash
npx playwright test --project=smoke
```

### Regression тести (з тегом @regression)
```bash
npx playwright test --project=regression
```

### Запуск конкретного тесту
```bash
npx playwright test checkout.spec.ts
```

### Запуск в debug режимі
```bash
npx playwright test --debug
```

## Workflow файли

- `playwright.yml` - запускає всі тести на push та pull request
- `smoke.yml` - запускає smoke тести за розписанням та на push до main
- `regression.yml` - запускає regression тести за розписанням та на push до main/develop

## Теги тестів

Тести позначені тегами для легкої категоризації:
- `@smoke` - критичні тести для швидкої перевірки
- `@regression` - повний набір регресійних тестів
