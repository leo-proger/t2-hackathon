# Chattie — цифровой помощник для адаптации студентов

Проект на хакатон Tele2.

## Структура репозитория

```
frontend/   — React 19 + Vite 8 + Tailwind v4 + shadcn/ui
backend/    — TBD
```

## Запуск frontend

```bash
cd frontend
npm install
npm run dev
```

Открой http://localhost:5173.

### Переменные окружения (`frontend/.env`)

| Переменная           | Описание                                                                |
|----------------------|-------------------------------------------------------------------------|
| `VITE_API_BASE_URL`  | Базовый URL бэкенда (например, `http://localhost:8000`)                 |
| `VITE_USE_MOCK`      | `true` — использовать заглушки вместо реального API. Дефолт: `true`     |

## Контракт API (что должен реализовать бэкенд)

Все ответы — JSON. Все эндпоинты под префиксом, который задаётся `VITE_API_BASE_URL`.

### `GET /api/users/me`

Профиль текущего пользователя.

```json
{
  "id": "u1",
  "name": "Артём",
  "faculty": "ИВИТШ",
  "group": "00-XXбо-0",
  "year": 1,
  "simestr": 1,
  "xp": 340,
  "level": 3,
  "adaptationProgress": 62
}
```

### `GET /api/schedule/today`

Расписание занятий на сегодня. Массив объектов `Lesson`:

```json
[
  {
    "id": "l1",
    "lesson_number": 1,
    "name": "Математический анализ",
    "room": "ауд. 214",
    "teacher": "Иванова Л.А."
  }
]
```

### `GET /api/schedule?date=YYYY-MM-DD`

Расписание на произвольную дату. Тот же формат, что и `/today`.

### `GET /api/quests/active`

Активные квесты пользователя.

```json
[
  { "id": "q1", "label": "Найди 301 ауд.", "xp": 50, "progress": 60 }
]
```

`progress` — число от 0 до 100.

### `GET /api/checklist`

Чек-лист онбординга.

```json
[
  { "id": "c1", "label": "Зарегистрироваться", "done": true }
]
```

### `POST /api/checklist/:id/complete`

Отметить пункт чек-листа выполненным. Возвращает обновлённый item.

### `GET /api/daily-task`

Задание дня.

```json
{
  "id": "dt1",
  "title": "Найди 301 аудиторию",
  "description": "Сфотографируй табличку у входа и загрузи фото",
  "xp": 50,
  "deadline": "23:59",
  "completed": false
}
```

### `POST /api/daily-task/:id/complete`

Выполнить задание дня. Возвращает обновлённый task.

### `GET /api/chat/history`

История сообщений с ботом Chattie.

```json
[
  {
    "id": "m1",
    "role": "user",
    "text": "Как получить студенческий билет?",
    "timestamp": "2026-05-15T08:30:00Z"
  }
]
```

`role` — `"user"` или `"bot"`.

### `POST /api/chat/message`

Отправить сообщение боту.

**Request:**
```json
{ "sessionId": "default", "text": "Где находится деканат?" }
```

**Response:**
```json
{
  "message": {
    "id": "m42",
    "role": "bot",
    "text": "Деканат на 1 этаже, каб. 112.",
    "timestamp": "2026-05-15T08:31:00Z"
  }
}
```

## Что будет в будущих версиях

| Эндпоинт                         | Версия | Описание                                      |
|----------------------------------|--------|-----------------------------------------------|
| `GET /api/teachers/:id`          | v1     | Карточка преподавателя                        |
| `GET /api/buildings`             | v1     | Корпуса университета (страница «Корпус»)      |
| `POST /api/quests/:id/complete`  | v1     | Завершение квеста (выдача XP)                 |
| `GET /api/tutors`                | v1     | Список тьюторов для связи                     |
| `POST /api/feedback`             | v1     | 👍/👎 на ответ бота                           |
