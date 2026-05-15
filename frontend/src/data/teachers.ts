import teachersJson from './teachers.json'

export interface Teacher {
  id: string
  name: string         // короткое "Иванова Л.А."
  fullName: string     // "Иванова Лариса Александровна"
  position: string
  credentials: string
  photoUrl: string     // URL фотки (заполнить вручную)
}

const TEACHERS = teachersJson as Record<string, Teacher>

export function getTeacher(id: string): Teacher | undefined {
  return TEACHERS[id]
}
