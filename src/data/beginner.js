import { fill, ord, say } from './helpers.js';

const v = (en, id, emoji) => ({ en, id, emoji });

export const beginnerLessons = [
  {
    id: 'b-greetings', level: 'beginner', icon: '👋', kind: 'custom',
    title: { en: 'Greetings', id: 'Salam & Sapaan' },
    questions: [
      say({ en: 'It is 8 in the morning. You meet your teacher.', id: 'Pukul 8 pagi. Kamu bertemu gurumu.' }, 'Good morning!', ['Good night!', 'Goodbye!', 'Good evening!']),
      say({ en: 'Someone asks how you are.', id: 'Seseorang menanyakan kabarmu.' }, "I'm fine, thank you.", ['My name is Sam.', 'See you later.', 'You are welcome.']),
      say({ en: 'You want to say goodbye to a friend.', id: 'Kamu ingin berpamitan pada temanmu.' }, 'See you tomorrow!', ['Nice to meet you!', 'Good morning!', 'How are you?']),
      say({ en: 'Someone gives you a gift.', id: 'Seseorang memberimu hadiah.' }, 'Thank you!', ['Sorry!', 'Excuse me!', 'Hello!']),
      ord('My name is Budi', { en: 'Introduce yourself.', id: 'Perkenalkan dirimu.' }),
      ord('Nice to meet you', { en: 'Say it when you meet someone new.', id: 'Ucapkan saat bertemu orang baru.' }),
      ord('How are you today', { en: 'Ask about someone\'s day.', id: 'Tanyakan kabar seseorang hari ini.' }),
      fill('Good ___, Mom! Sleep well.', 'night', ['morning', 'afternoon', 'breakfast'], { en: 'Bedtime.', id: 'Waktunya tidur.' }),
    ],
  },
  {
    id: 'b-food', level: 'beginner', icon: '🍞', kind: 'vocab',
    title: { en: 'Food & Drink', id: 'Makanan & Minuman' },
    items: [v('bread', 'roti', '🍞'), v('milk', 'susu', '🥛'), v('egg', 'telur', '🥚'), v('rice', 'nasi', '🍚'), v('cheese', 'keju', '🧀'), v('coffee', 'kopi', '☕')],
  },
  {
    id: 'b-tobe', level: 'beginner', icon: '🧩', kind: 'custom',
    title: { en: 'I am, You are, He is', id: 'To Be: am, is, are' },
    questions: [
      fill('I ___ a student.', 'am', ['is', 'are'], { en: 'I', id: 'Saya' }),
      fill('She ___ my sister.', 'is', ['am', 'are'], { en: 'She', id: 'Dia (perempuan)' }),
      fill('They ___ at school.', 'are', ['is', 'am'], { en: 'They', id: 'Mereka' }),
      fill('He ___ happy.', 'is', ['are', 'am'], { en: 'He', id: 'Dia (laki-laki)' }),
      fill('We ___ friends.', 'are', ['am', 'is'], { en: 'We', id: 'Kami / Kita' }),
      ord('I am ten years old', { en: 'Tell your age.', id: 'Sebutkan umurmu.' }),
      ord('She is a teacher', { en: 'Talk about a woman\'s job.', id: 'Bicara tentang pekerjaan seorang wanita.' }),
      ord('They are not here', { en: 'Say that they are absent.', id: 'Katakan mereka tidak ada di sini.' }),
      fill('You ___ very kind.', 'are', ['is', 'am'], { en: 'You', id: 'Kamu' }),
    ],
  },
  {
    id: 'b-things', level: 'beginner', icon: '🎒', kind: 'vocab',
    title: { en: 'Things Around Me', id: 'Benda di Sekitarku' },
    items: [v('pen', 'pulpen', '🖊️'), v('bag', 'tas', '🎒'), v('phone', 'ponsel', '📱'), v('key', 'kunci', '🔑'), v('clock', 'jam', '⏰'), v('umbrella', 'payung', '☂️')],
  },
  {
    id: 'b-articles', level: 'beginner', icon: '🅰️', kind: 'custom',
    title: { en: 'A, An & Plurals', id: 'A, An & Jamak' },
    questions: [
      fill('I have ___ apple.', 'an', ['a', 'two'], { en: 'Apple starts with a vowel sound.', id: 'Apple diawali bunyi vokal.' }),
      fill('She has ___ dog.', 'a', ['an', 'the dogs'], { en: 'One dog.', id: 'Satu anjing.' }),
      fill('It is ___ umbrella.', 'an', ['a', 'many'], { en: 'One umbrella.', id: 'Satu payung.' }),
      fill('There are three ___.', 'cats', ['cat', 'a cat'], { en: 'More than one.', id: 'Lebih dari satu.' }),
      fill('I see two ___.', 'boxes', ['boxs', 'box'], { en: 'Add -es after x.', id: 'Tambah -es setelah x.' }),
      fill('He eats ___ egg every day.', 'an', ['a', 'two'], { en: 'One egg.', id: 'Satu telur.' }),
      ord('I have a red bag', { en: 'Describe your bag.', id: 'Gambarkan tasmu.' }),
      ord('There are two books', { en: 'Count the books.', id: 'Hitung bukunya.' }),
    ],
  },
  {
    id: 'b-verbs', level: 'beginner', icon: '🏃', kind: 'vocab',
    title: { en: 'Action Words', id: 'Kata Kerja' },
    items: [v('eat', 'makan', '🍽️'), v('drink', 'minum', '🥤'), v('sleep', 'tidur', '😴'), v('run', 'berlari', '🏃'), v('write', 'menulis', '✍️'), v('swim', 'berenang', '🏊')],
  },
  {
    id: 'b-places', level: 'beginner', icon: '🏫', kind: 'vocab',
    title: { en: 'Places', id: 'Tempat' },
    items: [v('school', 'sekolah', '🏫'), v('hospital', 'rumah sakit', '🏥'), v('market', 'pasar', '🛒'), v('park', 'taman', '🌳'), v('beach', 'pantai', '🏖️'), v('library', 'perpustakaan', '📚')],
  },
  {
    id: 'b-days', level: 'beginner', icon: '📅', kind: 'custom',
    title: { en: 'Days & Daily Life', id: 'Hari & Kegiatan' },
    questions: [
      fill('Monday, Tuesday, ___, Thursday.', 'Wednesday', ['Friday', 'Sunday', 'Saturday'], { en: 'Day after Tuesday.', id: 'Hari setelah Selasa.' }),
      fill('Saturday and ___ are the weekend.', 'Sunday', ['Monday', 'Friday', 'Tuesday'], { en: 'Weekend.', id: 'Akhir pekan.' }),
      fill('I ___ breakfast at seven.', 'eat', ['eats', 'eating'], { en: 'I + base verb.', id: 'I + kata kerja dasar.' }),
      fill('She ___ to school by bus.', 'goes', ['go', 'going'], { en: 'She + verb with -es.', id: 'She + kata kerja dengan -es.' }),
      fill('We ___ football on Sunday.', 'play', ['plays', 'playing'], { en: 'We + base verb.', id: 'We + kata kerja dasar.' }),
      ord('I wake up at six', { en: 'Say when you wake up.', id: 'Katakan jam berapa kamu bangun.' }),
      ord('He goes to school every day', { en: 'Talk about his routine.', id: 'Ceritakan rutinitasnya.' }),
      ord('We have lunch at noon', { en: 'Say when you eat lunch.', id: 'Katakan kapan kamu makan siang.' }),
    ],
  },
];
