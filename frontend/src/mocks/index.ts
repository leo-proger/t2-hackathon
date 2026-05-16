import type {
  User,
  Quest,
  ChecklistItem,
  DailyTask,
  ChatMessage,
} from '@/types'

export const mockUser: User = {
  id: 1,
  name: 'Артём',
  initials: 'АИ',
  faculty: 'ИВИТШ',
  group: '22-ПИбо-1',
  year: 1,
  simestr: 1,
  xp: 340,
  level: 3,
  levelProgress: 40,
  adaptationProgress: 62,
  status: 'student',
}

export const mockQuests: Quest[] = [
  { id: 1, label: 'Первое знакомство',  description: 'Познакомься с тремя одногруппниками и запиши их имена.',                                               xp: 20,  done: false },
  { id: 2, label: 'Карта кампуса',      description: 'Найди и отметь на карте кампуса 5 ключевых локаций: главный корпус, столовая, библиотека, спортзал.',   xp: 25,  done: true  },
  { id: 3, label: 'Найдено-ненайдено',  description: 'Найди 404 аудиторию.',                                                                                  xp: 15,  done: false },
  { id: 4, label: 'Устав — наше всё',   description: 'Прочитай устав университета и отметь 3 самых важных правила.',                                          xp: 30,  done: false },
  { id: 5, label: 'Студенческий билет', description: 'Получи студенческий билет, сфотографируй и сохрани фото.',                                              xp: 10,  done: true  },
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
