# Chattie — цифровой помощник для адаптации студентов

Проект на хакатон Tele2.

## Структура репозитория

```
frontend/   — React 19 + Vite 8 + Tailwind v4 + shadcn/ui
backend/    — FastAPI + SQLAlchemy (async) + authx JWT
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

Все ответы — JSON. Бэкенд поднят на FastAPI. Фронт читает `VITE_API_BASE_URL`, все пути начинаются с `/api`.
Аутентификация — через куки (JWT), которые бэкенд ставит сам; фронт отправляет их с `credentials: 'include'`.

### Auth

#### `POST /api/users/login`
```json
// request
{ "email": "user@example.com", "password": "string" }
// response
{ "ok": true, "access_token": "...", "refresh_token": "..." }
// + устанавливает куки JWT
```

#### `GET /api/users/refresh`
```json
// response — обновляет оба токена через куки
{ "ok": true, "access_token": "...", "refresh_token": "..." }
```

#### `GET /api/users/me`
```json
{
  "id": 1, "name": "Артём", "faculty": "ИВИТШ", "group": "00-XXбо-0",
  "groupID": 1, "status": "student", "year": 1, "simestr": 1,
  "xp": 340, "level": 3, "levelProgress": 40, "adaptationProgress": 62
}
// levelProgress - прогресс уровня, status: "student" or "teacher"
```

### Расписание

#### `GET /api/lessons/today`
```json
[{ "id": 1, "lesson_number": 1, "name": "Мат. анализ", "room": "ауд. 214", "teacher": "Иванова Л.А." }]
```

#### `GET /api/lessons?date=YYYY-MM-DD`
Тот же формат.

### Квесты

#### `GET /api/quests/active`
```json
[{ "id": "q1", "label": "Найди 301 ауд.", "description": "...", "xp": 50, "done": false }]
```

### Чат

#### `GET /api/chat/history`
Возвращает массив объектов с обёрткой `message`:
```json
[
  { "message": { "id": 0, "role": "user", "text": "Вопрос", "timestamp": "2026-05-16 10:00:00" } },
  { "message": { "id": 1, "role": "bot",  "text": "Ответ",  "timestamp": "2026-05-16 10:00:01" } }
]
```
> Пустой массив `[]` если история ещё пуста.

#### `POST /api/chat/message`
```json
// request
{ "sessionId": "default", "text": "Где деканат?" }
// response — только ответ бота
{ "message": { "id": 1, "role": "bot", "text": "Каб. 112.", "timestamp": "2026-05-16 10:00:01" } }
```

### Тикеты

#### `GET /api/tickets` / `POST /api/tickets` — список тикетов и создание нового (см. backend/api/tickets.py)

## Что будет в будущих версиях

| Эндпоинт                        | Версия | Описание                            |
|---------------------------------|--------|-------------------------------------|
| `POST /api/quests/:id/complete` | v1     | Завершение квеста (выдача XP)       |
| `GET /api/tutors`               | v1     | Список тьюторов                     |
| `POST /api/feedback`            | v1     | 👍/👎 на ответ бота (петля фидбека) |
