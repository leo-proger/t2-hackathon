// Институты КГУ. Для ИВИТШ — реальные данные (см. backend/knowledge_base.md),
// для остальных — заглушки. Заменить TBD на актуальные данные.

export interface Institute {
  id: string                 // 'ivitsh'
  acronym: string            // 'ИВИТШ'
  fullName: string           // 'Высшая ИТ-Школа'
  isMine?: boolean           // подсветка «ты учишься здесь»
  address: string
  phone: string
  email: string
  schedule: string
  website?: string
}

export const INSTITUTES: Institute[] = [
  {
    id: 'ivitsh',
    acronym: 'ИВИТШ',
    fullName: 'Высшая ИТ-Школа',
    isMine: true,
    address: 'Кострома, ул. Ивановская, 24А (корпус Б)',
    phone: '+7 (4942) 63-49-00 (доб. 8900)',
    email: 'info.it@kosgos.ru',
    schedule: 'пн–пт: 09:00–17:00',
    website: 'https://itschool.kosgos.ru',
  },
  {
    id: 'ignist',
    acronym: 'ИГНИСТ',
    fullName: 'Институт гуманитарных наук и социальных технологий',
    address: 'TBD',
    phone: 'TBD',
    email: 'TBD',
    schedule: 'TBD',
  },
  {
    id: 'iptd',
    acronym: 'ИПТД',
    fullName: 'Институт промышленных технологий и дизайна',
    address: 'TBD',
    phone: 'TBD',
    email: 'TBD',
    schedule: 'TBD',
  },
  {
    id: 'iki',
    acronym: 'ИКИ',
    fullName: 'Институт культуры и искусств',
    address: 'TBD',
    phone: 'TBD',
    email: 'TBD',
    schedule: 'TBD',
  },
  {
    id: 'ipp',
    acronym: 'ИПП',
    fullName: 'Институт педагогики и психологии',
    address: 'TBD',
    phone: 'TBD',
    email: 'TBD',
    schedule: 'TBD',
  },
  {
    id: 'iuef',
    acronym: 'ИУЭФ',
    fullName: 'Институт управления, экономики и финансов',
    address: 'TBD',
    phone: 'TBD',
    email: 'TBD',
    schedule: 'TBD',
  },
  {
    id: 'ifmen',
    acronym: 'ИФМЕН',
    fullName: 'Институт физико-математических и естественных наук',
    address: 'TBD',
    phone: 'TBD',
    email: 'TBD',
    schedule: 'TBD',
  },
  {
    id: 'yuin',
    acronym: 'ЮИН',
    fullName: 'Юридический институт им. Ю. П. Новицкого',
    address: 'TBD',
    phone: 'TBD',
    email: 'TBD',
    schedule: 'TBD',
  },
]
