import type {
  User,
  Lesson,
  Quest,
  ChecklistItem,
  DailyTask,
  ChatMessage,
} from '@/types'

export const mockUser: User = {
  id: 'u1',
  name: 'Артём',
  initials: 'АИ',
  faculty: 'ИВИТШ',
  year: 1,
  week: 3,
  xp: 340,
  level: 3,
  adaptationProgress: 62,
  streakDays: 7,
  streakHistory: [true, true, true, true, true, true, true],
}

export const mockLessons: Lesson[] = [
  { id: 'l1', time: '8:30',  endTime: '10:00', name: 'Математический анализ', room: 'ауд. 214',  teacher: 'Иванова Л.А.' },
  { id: 'l2', time: '10:10', endTime: '11:40', name: 'Программирование',       room: 'ауд. 301',  teacher: 'Петров А.В.' },
  { id: 'l3', time: '11:50', endTime: '13:20', name: 'Английский язык',        room: 'ауд. 405',  teacher: 'Соколова М.Н.' },
  { id: 'l4', time: '14:00', endTime: '15:30', name: 'Физкультура',            room: 'спортзал',  teacher: 'Громов О.С.' },
  { id: 'l5', time: '15:40', endTime: '17:10', name: 'Дискретная математика',  room: 'ауд. 218',  teacher: 'Морозов К.Е.' },
]

export const mockQuests: Quest[] = [
  { id: 'q1', label: 'Найди 301 ауд.',      xp: 50,  progress: 60 },
  { id: 'q2', label: 'Задай вопрос преподу', xp: 30,  progress: 30 },
  { id: 'q3', label: '7-дневный стрик',      xp: 100, progress: 70 },
]

export const mockChecklist: ChecklistItem[] = [
  { id: 'c1', label: 'Зарегистрироваться',        done: true },
  { id: 'c2', label: 'Найти деканат',              done: true },
  { id: 'c3', label: 'Добавить расписание',        done: false },
  { id: 'c4', label: 'Познакомиться с куратором',  done: false },
]

export const mockDailyTask: DailyTask = {
  id: 'dt1',
  title: 'Найди 301 аудиторию',
  description: 'Сфотографируй табличку у входа и загрузи фото',
  xp: 50,
  deadline: '23:59',
  completed: false,
}

export const mockChatHistory: ChatMessage[] = [
  {
    id: 'm1',
    role: 'user',
    text: 'Как получить студенческий билет? Куда идти?',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'm2',
    role: 'bot',
    text: 'Студенческий выдаётся в деканате (каб. 112) в первые 2 недели. Возьми с собой паспорт и 2 фото 3×4.',
    timestamp: new Date().toISOString(),
  },
]

// Имитация задержки сети для моков
export const mockDelay = (ms = 300) =>
  new Promise<void>((r) => setTimeout(r, ms))
