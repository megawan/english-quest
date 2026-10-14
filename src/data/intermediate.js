import { fill, ord, say } from './helpers.js';

const v = (en, id, emoji) => ({ en, id, emoji });

export const intermediateLessons = [
  {
    id: 'i-jobs', level: 'intermediate', icon: '👩‍⚕️', kind: 'vocab',
    title: { en: 'Jobs', id: 'Pekerjaan' },
    items: [v('doctor', 'dokter', '👨‍⚕️'), v('teacher', 'guru', '👩‍🏫'), v('farmer', 'petani', '🧑‍🌾'), v('chef', 'koki', '🧑‍🍳'), v('pilot', 'pilot', '🧑‍✈️'), v('police officer', 'polisi', '👮')],
  },
  {
    id: 'i-present', level: 'intermediate', icon: '⏱️', kind: 'custom',
    title: { en: 'Present Simple', id: 'Present Simple' },
    questions: [
      fill('My father ___ in a bank.', 'works', ['work', 'working'], { en: 'He/she/it + verb-s.', id: 'He/she/it + kata kerja-s.' }),
      fill('They ___ coffee in the morning.', 'drink', ['drinks', 'drinking'], { en: 'They + base verb.', id: 'They + kata kerja dasar.' }),
      fill('She ___ like spicy food.', "doesn't", ["don't", 'not'], { en: 'Negative, she.', id: 'Kalimat negatif, she.' }),
      fill('___ you speak English?', 'Do', ['Does', 'Are'], { en: 'Question with you.', id: 'Pertanyaan dengan you.' }),
      fill('___ he play the guitar?', 'Does', ['Do', 'Is'], { en: 'Question with he.', id: 'Pertanyaan dengan he.' }),
      fill('The sun ___ in the east.', 'rises', ['rise', 'rising'], { en: 'A fact about nature.', id: 'Fakta alam.' }),
      ord('She never eats meat', { en: 'Say what she never eats.', id: 'Katakan apa yang tidak pernah dia makan.' }),
      ord('Do you like pizza', { en: 'Ask about food.', id: 'Tanya soal makanan.' }),
      ord('He does not watch TV', { en: 'Negative sentence.', id: 'Kalimat negatif.' }),
    ],
  },
  {
    id: 'i-weather', level: 'intermediate', icon: '⛅', kind: 'vocab',
    title: { en: 'Weather', id: 'Cuaca' },
    items: [v('sunny', 'cerah', '☀️'), v('rainy', 'hujan', '🌧️'), v('cloudy', 'berawan', '☁️'), v('windy', 'berangin', '💨'), v('snowy', 'bersalju', '❄️'), v('stormy', 'badai', '⛈️')],
  },
  {
    id: 'i-past', level: 'intermediate', icon: '⏪', kind: 'custom',
    title: { en: 'Past Simple', id: 'Past Simple' },
    questions: [
      fill('Yesterday I ___ to the market.', 'went', ['go', 'goes'], { en: 'Past of go.', id: 'Bentuk lampau dari go.' }),
      fill('She ___ a cake last night.', 'baked', ['bake', 'bakes'], { en: 'Regular verb + -ed.', id: 'Kata kerja beraturan + -ed.' }),
      fill('We ___ a great movie last week.', 'saw', ['see', 'seen'], { en: 'Past of see.', id: 'Bentuk lampau dari see.' }),
      fill('He ___ his homework yesterday.', 'did not finish', ['not finished', 'does not finish'], { en: 'Negative past.', id: 'Negatif lampau.' }),
      fill('___ you call me last night?', 'Did', ['Do', 'Were'], { en: 'Past question.', id: 'Pertanyaan lampau.' }),
      fill('They ___ football on Sunday.', 'played', ['play', 'plays'], { en: 'Past of play.', id: 'Bentuk lampau dari play.' }),
      fill('I ___ a letter two days ago.', 'wrote', ['write', 'written'], { en: 'Past of write.', id: 'Bentuk lampau dari write.' }),
      ord('We visited our grandma yesterday', { en: 'Talk about yesterday.', id: 'Ceritakan kemarin.' }),
      ord('Did you eat breakfast', { en: 'Ask about breakfast.', id: 'Tanya soal sarapan.' }),
    ],
  },
  {
    id: 'i-compare', level: 'intermediate', icon: '⚖️', kind: 'custom',
    title: { en: 'Comparing Things', id: 'Membandingkan' },
    questions: [
      fill('An elephant is ___ than a dog.', 'bigger', ['big', 'biggest'], { en: 'Compare two things.', id: 'Bandingkan dua hal.' }),
      fill('This is the ___ cake in the shop.', 'best', ['better', 'good'], { en: 'Superlative of good.', id: 'Superlatif dari good.' }),
      fill('Math is ___ than English for me.', 'more difficult', ['difficulter', 'most difficult'], { en: 'Long adjective.', id: 'Kata sifat panjang.' }),
      fill('She is the ___ girl in our class.', 'tallest', ['taller', 'tall'], { en: 'The top of the group.', id: 'Paling di dalam kelompok.' }),
      fill('He runs as ___ as a cheetah.', 'fast', ['faster', 'fastest'], { en: 'as ... as', id: 'as ... as' }),
      fill('This bag is ___ than that one.', 'cheaper', ['cheapest', 'more cheap'], { en: 'Short adjective + -er.', id: 'Kata sifat pendek + -er.' }),
      ord('My house is bigger than yours', { en: 'Compare houses.', id: 'Bandingkan rumah.' }),
      ord('He is the funniest person I know', { en: 'Describe a funny friend.', id: 'Gambarkan teman yang lucu.' }),
    ],
  },
  {
    id: 'i-prepositions', level: 'intermediate', icon: '📍', kind: 'custom',
    title: { en: 'In, On, At, Under', id: 'In, On, At, Under' },
    questions: [
      fill('The cat is ___ the table.', 'under', ['at', 'of'], { en: 'Below the table.', id: 'Di bawah meja.' }),
      fill('The book is ___ the desk.', 'on', ['in', 'at'], { en: 'Touching the top.', id: 'Menempel di permukaan atas.' }),
      fill('I wake up ___ 6 o\'clock.', 'at', ['on', 'in'], { en: 'Exact time.', id: 'Waktu tepat.' }),
      fill('We have a test ___ Monday.', 'on', ['in', 'at'], { en: 'Day of the week.', id: 'Nama hari.' }),
      fill('She was born ___ July.', 'in', ['on', 'at'], { en: 'Month.', id: 'Bulan.' }),
      fill('He is waiting ___ the bus stop.', 'at', ['in', 'on'], { en: 'A specific point.', id: 'Titik tertentu.' }),
      ord('The keys are in my bag', { en: 'Where are the keys?', id: 'Di mana kuncinya?' }),
      ord('She sits between Tom and Ana', { en: 'Describe where she sits.', id: 'Gambarkan di mana dia duduk.' }),
    ],
  },
  {
    id: 'i-travel', level: 'intermediate', icon: '✈️', kind: 'vocab',
    title: { en: 'Travel', id: 'Bepergian' },
    items: [v('airport', 'bandara', '✈️'), v('ticket', 'tiket', '🎫'), v('passport', 'paspor', '🛂'), v('hotel', 'hotel', '🏨'), v('map', 'peta', '🗺️'), v('luggage', 'koper', '🧳')],
  },
  {
    id: 'i-future', level: 'intermediate', icon: '🔮', kind: 'custom',
    title: { en: 'Future Plans', id: 'Rencana Masa Depan' },
    questions: [
      fill('I ___ visit my aunt tomorrow.', 'will', ['did', 'am'], { en: 'A promise or decision.', id: 'Janji atau keputusan.' }),
      fill('Look at those clouds! It ___ rain.', 'is going to', ['will to', 'goes to'], { en: 'You can see it coming.', id: 'Kelihatan akan terjadi.' }),
      fill('We ___ going to travel next month.', 'are', ['is', 'will'], { en: 'be going to', id: 'be going to' }),
      fill('She ___ not come to the party.', 'will', ['does', 'did'], { en: 'will not', id: 'will not' }),
      say({ en: 'You are at a restaurant and want to order politely.', id: 'Kamu di restoran dan ingin memesan dengan sopan.' }, "I'd like a glass of water, please.", ['Give me water now.', 'Water is I want.', 'I am water.']),
      say({ en: 'You are lost and need directions.', id: 'Kamu tersesat dan butuh petunjuk arah.' }, 'Excuse me, how can I get to the station?', ['Where station you go?', 'The station is me.', 'I station go how?']),
      ord('I am going to study tonight', { en: 'Say your plan for tonight.', id: 'Katakan rencanamu malam ini.' }),
      ord('They will arrive at nine', { en: 'Talk about arrival time.', id: 'Bicara soal waktu kedatangan.' }),
    ],
  },
];
