const v = (en, id, emoji) => ({ en, id, emoji });

export const kidsLessons = [
  {
    id: 'k-animals-1', level: 'kids', icon: '🐶', kind: 'vocab',
    title: { en: 'Pets & Farm', id: 'Hewan Peliharaan' },
    items: [v('cat', 'kucing', '🐱'), v('dog', 'anjing', '🐶'), v('bird', 'burung', '🐦'), v('fish', 'ikan', '🐟'), v('cow', 'sapi', '🐮'), v('duck', 'bebek', '🦆')],
  },
  {
    id: 'k-colors', level: 'kids', icon: '🎨', kind: 'vocab',
    title: { en: 'Colors', id: 'Warna' },
    items: [v('red', 'merah', '🔴'), v('blue', 'biru', '🔵'), v('green', 'hijau', '🟢'), v('yellow', 'kuning', '🟡'), v('orange', 'oranye', '🟠'), v('purple', 'ungu', '🟣')],
  },
  {
    id: 'k-numbers', level: 'kids', icon: '🔢', kind: 'vocab',
    title: { en: 'Numbers', id: 'Angka' },
    items: [v('one', 'satu', '1️⃣'), v('two', 'dua', '2️⃣'), v('three', 'tiga', '3️⃣'), v('four', 'empat', '4️⃣'), v('five', 'lima', '5️⃣'), v('six', 'enam', '6️⃣')],
  },
  {
    id: 'k-fruits', level: 'kids', icon: '🍎', kind: 'vocab',
    title: { en: 'Yummy Fruits', id: 'Buah Lezat' },
    items: [v('apple', 'apel', '🍎'), v('banana', 'pisang', '🍌'), v('grapes', 'anggur', '🍇'), v('strawberry', 'stroberi', '🍓'), v('watermelon', 'semangka', '🍉'), v('pineapple', 'nanas', '🍍')],
  },
  {
    id: 'k-animals-2', level: 'kids', icon: '🦁', kind: 'vocab',
    title: { en: 'Wild Animals', id: 'Hewan Liar' },
    items: [v('lion', 'singa', '🦁'), v('elephant', 'gajah', '🐘'), v('monkey', 'monyet', '🐵'), v('rabbit', 'kelinci', '🐰'), v('tiger', 'harimau', '🐯'), v('frog', 'katak', '🐸')],
  },
  {
    id: 'k-body', level: 'kids', icon: '🖐️', kind: 'vocab',
    title: { en: 'My Body', id: 'Tubuhku' },
    items: [v('eye', 'mata', '👁️'), v('ear', 'telinga', '👂'), v('nose', 'hidung', '👃'), v('mouth', 'mulut', '👄'), v('hand', 'tangan', '✋'), v('foot', 'kaki', '🦶')],
  },
  {
    id: 'k-family', level: 'kids', icon: '👨‍👩‍👧', kind: 'vocab',
    title: { en: 'My Family', id: 'Keluargaku' },
    items: [v('baby', 'bayi', '👶'), v('girl', 'anak perempuan', '👧'), v('boy', 'anak laki-laki', '👦'), v('mom', 'ibu', '👩'), v('dad', 'ayah', '👨'), v('grandma', 'nenek', '👵')],
  },
  {
    id: 'k-things', level: 'kids', icon: '⚽', kind: 'vocab',
    title: { en: 'Fun Things', id: 'Benda Seru' },
    items: [v('ball', 'bola', '⚽'), v('car', 'mobil', '🚗'), v('book', 'buku', '📚'), v('house', 'rumah', '🏠'), v('sun', 'matahari', '☀️'), v('moon', 'bulan', '🌙')],
  },
];
