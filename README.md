# Mini Issue Tracker API

Учебный REST API для управления задачами. Данные хранятся в памяти приложения и сбрасываются при перезапуске сервера.

## Стек

- Node.js
- Express 5
- TypeScript
- Zod 4

## Запуск

```bash
npm install
npm run dev
```

По умолчанию сервер запускается на `http://localhost:3000`. Порт можно изменить с помощью переменной окружения `PORT`.

## API

| Метод | Endpoint | Описание |
|---|---|---|
| `GET` | `/api/health` | Проверка состояния API |
| `GET` | `/api/tasks` | Получение списка задач |
| `GET` | `/api/tasks/:id` | Получение задачи по ID |
| `POST` | `/api/tasks/create` | Создание задачи |
| `PATCH` | `/api/tasks/:id` | Изменение задачи |
| `DELETE` | `/api/tasks/:id` | Удаление задачи |

Список задач можно фильтровать по `status` и искать по `search` (по заголовку, без учёта регистра).

Допустимые статусы: `open`, `in_progress`, `done`.

### Создание задачи

`POST /api/tasks/create`

```json
{
  "title": "Prepare project documentation",
  "description": "Write a short README"
}
```

### Изменение задачи

`PATCH /api/tasks/:id`

Передаваемые поля необязательны: `title`, `description`, `status`.

## Скрипты

- `npm run dev` — запуск в режиме разработки с автоматическим перезапуском.
- `npm run build` — компиляция TypeScript в `dist/`.
- `npm start` — запуск собранного приложения.
