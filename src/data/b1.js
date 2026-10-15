import { fill, mean, choose, read, gap, ord } from './helpers.js';

const COMMUTE =
  'Mia lives in a small town and works in the city. Every morning she takes the 7.15 train. The journey takes forty minutes, so she usually reads a book or listens to music. Last week the train was cancelled because of a strike, and she had to drive. It took her two hours because of the traffic. She says she will never drive to work again.';

const CAFE =
  'The Green Bean is a small café near the university. It opens at 8 a.m. and closes at 6 p.m. from Monday to Saturday, but it is closed on Sundays. Students get a ten per cent discount if they show their student card. The café is famous for its homemade cakes, and the owner, Tom, bakes them every morning.';

const HOLIDAY_GAPS =
  'Last summer I (1)___ a holiday in Spain with my family. We stayed (2)___ a small village near the beach. The weather was hot, (3)___ we spent most of the time in the sea. I (4)___ never eaten paella before, so I tried it on the first night. (5)___ we got home, I tried to cook it myself!';

const HOLIDAY =
  'Last summer I had a holiday in Spain with my family. We stayed in a small village near the beach. The weather was hot, so we spent most of the time in the sea. I had never eaten paella before, so I tried it on the first night. When we got home, I tried to cook it myself!';

// Lower-intermediate (B1). Same structure as the B2 tracks in b2.js.
export const TRACKS = [
  {
    id: 'b1-pv',
    icon: 'link',
    title: 'Phrasal Verbs',
    desc: 'The most useful verb + small word combinations for daily life and travel.',
    lessons: [
      {
        id: 'b1-pv-1',
        title: 'Daily life',
        guide: {
          summary: 'Wake up, turn on, switch off, put on and look for.',
          intro:
            'A phrasal verb is a verb with a small word after it, such as up, on, off or for. The small word changes the meaning, so you should learn the whole phrase together. You will hear these verbs in every English conversation about home and daily routines.',
          points: [
            { term: 'wake up', text: 'Stop sleeping.', example: 'I wake up at seven every day.' },
            { term: 'turn on', text: 'Make a machine or a light start working. The opposite is turn off.', example: 'Please turn on the light.' },
            { term: 'switch off', text: 'Stop a machine or a light. It means the same as turn off.', example: 'Switch off your phone in the cinema.' },
            { term: 'put on', text: 'Wear clothes or glasses. The opposite is take off.', example: 'Put on your coat. It is cold.' },
            { term: 'look for', text: 'Try to find something.', example: "I'm looking for my keys." },
          ],
        },
        questions: [
          fill("It's dark in here. Can you ___ the light?", 'turn on', ['turn over', 'turn into', 'turn round'], 'Turn on means to make a light or a machine start. It is the opposite of turn off. Turn over means to move to the other side.'),
          fill('Please ___ your phone before the film starts.', 'switch off', ['switch on', 'switch up', 'switch with'], 'Switch off means to stop a machine. We switch off phones in the cinema so that they do not disturb other people.'),
          fill("It's cold outside. ___ your coat.", 'Put on', ['Put off', 'Put away', 'Put out'], 'Put on means to wear clothes. Put off means to delay something, and put away means to store something in its place.'),
          fill("I can't find my keys. I've been ___ them for ten minutes.", 'looking for', ['looking at', 'looking after', 'looking up'], 'Look for means to try to find something. Look at means to direct your eyes at something, and look after means to take care of someone.'),
          ord('I woke up late today', 'Say that you stopped sleeping later than usual.', 'The past form of wake up is woke up. The small word "up" stays after the verb.'),
          mean("I'm looking for my wallet.", 'I am trying to find it.', ['I am looking at it.', 'I am taking care of it.', 'I am buying it.'], 'When you look for something, you cannot see it yet and you are trying to find it.'),
          mean('What time do you usually wake up?', 'What time do you stop sleeping?', ['What time do you go to bed?', 'What time do you eat breakfast?', 'What time do you leave home?'], 'Wake up is the moment you stop sleeping. Do not confuse it with get up, which means to leave your bed.'),
          fill("It's very bright in the room. Please ___ the light.", 'switch off', ['switch on', 'switch up', 'switch with'], 'The room is already bright, so we want to stop the light. Switch off is the opposite of switch on.'),
        ],
      },
      {
        id: 'b1-pv-2',
        title: 'Travel and plans',
        guide: {
          summary: 'Check in, set off, take off, get back and look around.',
          intro:
            'Travel is full of phrasal verbs. You will hear them at airports, in hotels and when friends talk about their holidays. Learn them as short phrases and say the examples aloud.',
          points: [
            { term: 'check in', text: 'Register when you arrive at an airport or a hotel.', example: 'We check in at the hotel at three.' },
            { term: 'set off', text: 'Start a journey.', example: 'We set off at six to avoid the traffic.' },
            { term: 'take off', text: 'For a plane: leave the ground and start to fly.', example: 'The plane took off ten minutes late.' },
            { term: 'get back', text: 'Return to a place.', example: 'We get back on Sunday evening.' },
            { term: 'look around', text: 'Visit a place and look at different things in it.', example: "Let's look around the old town." },
          ],
        },
        questions: [
          fill('You must ___ at the airport two hours before your flight.', 'check in', ['check out', 'check up', 'check on'], 'Check in means to register at an airport or a hotel. Check out is the opposite at a hotel: you leave and pay.'),
          fill('We ___ early to avoid the traffic.', 'set off', ['set up', 'set in', 'set on'], 'Set off means to start a journey. Set up means to start or build something, such as a business.'),
          fill('The plane ___ at ten o\'clock and landed at noon.', 'took off', ['took out', 'took on', 'took over'], 'Take off is what a plane does when it leaves the ground. The past form is took off.'),
          fill('When do you ___ from your trip?', 'get back', ['get over', 'get on', 'get along'], 'Get back means to return. Get over means to recover from something, and get along means to have a good relationship.'),
          fill('We had two hours before the train, so we ___ the old town.', 'looked around', ['looked after', 'looked for', 'looked up'], 'Look around means to visit a place and see what is there. It is natural for tourists.'),
          mean('We set off at six.', 'We began our journey at six.', ['We got ready at six.', 'We arrived at six.', 'We cancelled the trip at six.'], 'Set off means to start a journey. It is about leaving, not arriving.'),
          mean("I'll check in online to save time.", 'I will register for my flight or hotel on the internet.', ['I will pay for the hotel later.', 'I will look at the hotel photos.', 'I will cancel my booking.'], 'Check in is the process of telling the airline or the hotel that you have arrived. Many people now do it online.'),
          ord('We got back late on Sunday', 'Say that you returned home late.', 'Get back means to return. The past form is got back (in British English) or gotten back (in American English).'),
        ],
      },
    ],
  },

  {
    id: 'b1-id',
    icon: 'quote',
    title: 'Idioms & Collocations',
    desc: 'Easy idioms and word pairs you will hear every day.',
    lessons: [
      {
        id: 'b1-id-1',
        title: 'Easy idioms',
        guide: {
          summary: 'Break a leg, a sweet tooth, out of the blue, no big deal and fed up.',
          intro:
            'An idiom is a group of words whose meaning is different from the separate words. "Break a leg" does not mean you should hurt yourself. You cannot translate idioms word for word, so learn each one as one piece of language. Idioms are friendly and informal. Use them when you speak to friends and colleagues.',
          points: [
            { term: 'break a leg', text: 'Good luck. People say it before a performance, an exam or an interview.', example: 'Break a leg in your exam tomorrow!' },
            { term: 'have a sweet tooth', text: 'To love sweet food, such as cake and chocolate.', example: 'My brother has a sweet tooth.' },
            { term: 'out of the blue', text: 'Suddenly and without warning.', example: 'She called me out of the blue.' },
            { term: 'no big deal', text: 'Not important. You can say it to make someone feel better.', example: "Don't worry about it. It's no big deal." },
            { term: 'fed up', text: 'Tired of something and annoyed. Often used with "with".', example: "I'm fed up with this rain." },
          ],
        },
        questions: [
          mean('Break a leg in your exam tomorrow!', 'Good luck!', ['Be careful!', 'Stay at home!', 'Hurry up!'], 'This idiom means good luck. People say it to wish someone success. It is not a warning to be careful.'),
          mean('My brother has a sweet tooth.', 'He loves eating sweet food.', ['He has toothache.', 'He never eats dessert.', 'He goes to the dentist often.'], 'Someone with a sweet tooth likes sweet things such as cakes and chocolate. It is about taste, not about teeth.'),
          mean('She called me out of the blue.', 'It was a surprise; I did not expect it.', ['She called me by mistake.', 'She called me every day.', 'She called me late at night.'], 'Out of the blue means something happens suddenly and unexpectedly, like a blue sky with no clouds.'),
          mean("Don't worry about the mistake. It's no big deal.", 'It is not important.', ['It is very serious.', 'It is a big problem.', 'It is expensive.'], 'No big deal means something is not important. We use it to make people feel less worried.'),
          mean("I'm fed up with this rain!", 'I am tired of it and annoyed.', ['I am happy about it.', 'I am afraid of it.', 'I am surprised by it.'], 'Fed up means tired of something that has lasted too long. It is common with the preposition "with".'),
          fill("I wasn't expecting him at all. He appeared ___.", 'out of the blue', ['out of the box', 'out of date', 'out of order'], 'Out of the blue means suddenly and unexpectedly. Out of date means old-fashioned, and out of order means not working.'),
          fill("'Sorry I'm late!' 'That's ___. We've only just started.'", 'no big deal', ['no big idea', 'no much deal', 'not big thing'], 'The fixed phrase is no big deal. Learn it as a block: the words cannot be changed.'),
          ord('I am fed up with this weather', 'Say that you are tired of and annoyed by the weather.', 'Fed up is followed by "with" and then the thing that annoys you: "fed up with this weather".'),
        ],
      },
      {
        id: 'b1-id-2',
        title: 'Everyday collocations',
        guide: {
          summary: 'Take a photo, take a break, make a mistake, do the shopping, go for a walk.',
          intro:
            'A collocation is a pair or group of words that often go together. In English we say "take a photo", not "make a photo". There is usually no rule, so the best way is to learn the whole group and say it aloud. Using the right collocation makes your English sound natural.',
          points: [
            { term: 'take a photo', text: 'Use take with photos, a break, a shower and a taxi.', example: 'Can I take a photo of you?' },
            { term: 'take a break', text: 'Stop for a short rest. In British English you can also say have a break.', example: "Let's take a break. I'm tired." },
            { term: 'make a mistake', text: 'Use make for mistakes, plans, a cake or a decision. Make is often about creating something.', example: 'Everybody makes mistakes.' },
            { term: 'do the shopping', text: 'Use do for jobs and tasks: do the shopping, do homework, do the dishes.', example: 'I do the shopping on Saturdays.' },
            { term: 'go for a walk', text: 'Go for + noun is common for short activities: go for a walk, a run or a swim.', example: "It's sunny. Shall we go for a walk?" },
          ],
        },
        questions: [
          fill('Can I ___ a photo of you?', 'take', ['make', 'do', 'put'], 'The collocation is take a photo. Do not say "make a photo" even if your language does.'),
          fill("We've been working for hours. Let's ___ a break.", 'take', ['make', 'do', 'keep'], 'We say take a break. In British English have a break is also fine, but make and do are not used with break.'),
          fill('Everyone ___ mistakes when they learn a language.', 'makes', ['does', 'takes', 'has'], 'The collocation is make a mistake. Mistakes are a normal part of learning.'),
          fill('I need to ___ the shopping this afternoon.', 'do', ['make', 'take', 'have'], 'Do is used with jobs and tasks around the house, such as the shopping, the dishes and the laundry.'),
          fill("It's sunny. Shall we ___ for a walk?", 'go', ['take', 'do', 'make'], 'We say go for a walk. The same pattern works with go for a run and go for a swim.'),
          mean('He made a mistake on the form.', 'He did something wrong by accident.', ['He filled it in correctly.', 'He lost the form.', 'He signed the form.'], 'Make a mistake means to do something wrong without wanting to. It is not on purpose.'),
          fill('She wants to ___ a cake for the party.', 'make', ['do', 'take', 'have'], 'Make is used when you create something new, such as a cake, a plan or a cup of tea.'),
          ord('Let us take a short break', 'Suggest a short rest.', 'The collocation is take a break. Short is an adjective between "a" and "break".'),
        ],
      },
    ],
  },

  {
    id: 'b1-gr',
    icon: 'pen',
    title: 'Grammar',
    desc: 'Present perfect, conditionals and talking about the future.',
    lessons: [
      {
        id: 'b1-gr-1',
        title: 'Present perfect',
        guide: {
          summary: 'For and since, just, already, yet, ever, never, been and gone.',
          intro:
            'We use the present perfect (have/has + past participle) to connect the past with now. We do not say exactly when the action happened. It is very common in everyday conversation. The small words below show how the past connects with the present.',
          points: [
            { term: 'for and since', text: 'Use for with a length of time and since with a starting point.', example: 'I have lived here for five years. I have lived here since 2019.' },
            { term: 'just, already, yet', text: 'Just means a moment ago. Already means earlier than expected. Yet is for questions and negatives at the end of a sentence.', example: "I've just finished. I've already eaten. Have you finished yet?" },
            { term: 'ever and never', text: 'Ever is used in questions about your whole life. Never means at no time.', example: 'Have you ever been to Japan? I have never seen snow.' },
            { term: 'been or gone', text: 'Been means someone went and came back. Gone means someone went and is still there.', example: 'She has been to Paris (she is back). She has gone to Paris (she is there now).' },
          ],
        },
        questions: [
          fill('I have lived here ___ 2019.', 'since', ['for', 'from', 'during'], 'Since is followed by a starting point in time, such as 2019 or Monday. For is followed by a length of time, such as five years.'),
          fill('She has worked at the bank ___ five years.', 'for', ['since', 'from', 'during'], 'For is followed by a length of time (five years). Since needs a point in time.'),
          fill('Have you finished your homework ___?', 'yet', ['already', 'just', 'ever'], 'Yet is used in questions and negative sentences, and it goes at the end: "Have you finished yet?"'),
          fill("'Do you want lunch?' 'No, thanks. I've ___ eaten.'", 'already', ['yet', 'ever', 'since'], 'Already shows that something happened before now, sometimes earlier than expected. It goes between have and the past participle.'),
          fill('Have you ___ been to Japan?', 'ever', ['yet', 'since', 'for'], 'Ever is used in questions about your whole life up to now: "Have you ever...?"'),
          fill("Tom isn't here. He has ___ to the shop; he'll be back soon.", 'gone', ['been', 'went', 'go'], 'Has gone means Tom went and is still there. If he had come back, we would say "he has been to the shop".'),
          fill('I have ___ seen such a beautiful sunset.', 'never', ['ever', 'yet', 'already'], 'Never means at no time in your life. Do not use a second negative: "I have never seen", not "I have not never seen".'),
          ord('She has just left the office', 'Say that she left a moment ago.', 'Just goes between has and the past participle. It means a very short time ago.'),
        ],
      },
      {
        id: 'b1-gr-2',
        title: 'Conditionals and the future',
        guide: {
          summary: 'Zero and first conditional, going to, will, may and might.',
          intro:
            'We use if-sentences to talk about facts and possible situations. For the future we choose between will and going to, and we use may or might when we are not sure. Learning the pattern of each sentence is the fastest way to use them correctly.',
          points: [
            { term: 'zero conditional', text: 'If + present, present. Use it for facts that are always true.', example: 'If you heat ice, it melts.' },
            { term: 'first conditional', text: 'If + present, will + base verb. Use it for a real possibility in the future.', example: 'If it rains tomorrow, we will stay at home.' },
            { term: 'will or going to', text: 'Use going to for plans and for predictions based on what you see. Use will for quick decisions.', example: "Look at those clouds. It's going to rain. / The phone is ringing. I'll answer it." },
            { term: 'may and might', text: 'Use may or might when something is possible but you are not sure.', example: 'It might rain later.' },
          ],
        },
        questions: [
          fill('If it rains tomorrow, we ___ at home.', 'will stay', ['would stay', 'stayed', 'had stayed'], 'This is the first conditional: if + present simple, will + base verb. It talks about a real possibility in the future.'),
          fill('If you ___ ice, it melts.', 'heat', ['will heat', 'would heat', 'heated'], 'This is the zero conditional: if + present, present. It describes a fact that is always true.'),
          fill('Look at those dark clouds! It ___ rain soon.', 'is going to', ['rains', 'rained', 'has rained'], 'We use going to for a prediction when we can see signs now, like dark clouds.'),
          fill('The phone is ringing. I ___ answer it.', 'will', ['would', 'did', 'have'], 'We use will for a quick decision made at the moment of speaking. The short form is "I\'ll answer it."'),
          fill("It ___ rain later, but I'm not sure.", 'might', ['will', 'must', 'should'], 'Might shows that something is possible but not certain. Will is for something you are sure about.'),
          fill('If you ___ hard, you will pass the exam.', 'study', ['will study', 'studied', 'would study'], 'After if we use the present simple, not will. The will goes in the result part of the sentence.'),
          fill("I'm not sure where Anna is. She ___ be at work.", 'may', ['does', 'is', 'did'], 'May + base verb shows that something is possible. We do not add "to" after may.'),
          ord('If I see him I will tell him', 'Say what you will do if you see him.', 'The pattern is if + present simple, will + base verb. A comma is common after the if-part when it comes first.'),
        ],
      },
    ],
  },

  {
    id: 'b1-rd',
    icon: 'book',
    title: 'Reading & Cloze',
    desc: 'Short everyday texts and gap-fills.',
    lessons: [
      {
        id: 'b1-rd-1',
        title: 'Short texts',
        guide: {
          summary: 'Skim for the idea, scan for details and guess new words.',
          intro:
            'You do not need to understand every word to answer a question. First read quickly to get the general idea. Then read the question and look for the exact detail in the text. If a word is new, use the words around it to guess the meaning.',
          points: [
            { term: 'skimming', text: 'Read quickly to find the general idea. Look at the title and the first sentence.', example: 'Skim the text: is it about travel, food or work?' },
            { term: 'scanning', text: 'Look for one detail, such as a number, a name or a time, without reading everything.', example: 'Scan the text for the opening time.' },
            { term: 'key words', text: 'Underline the important words in the question, then find the same words or similar words in the text.', example: 'Question: How long? Look for numbers and time words.' },
            { term: 'guessing new words', text: 'Use the sentence around a new word to understand it. You do not always need a dictionary.', example: 'A strike stopped the trains, so a strike is a problem at work.' },
          ],
        },
        questions: [
          read(COMMUTE, 'What is the text mainly about?', "Mia's journey to work and a problem last week.", ['The best way to learn English.', 'A holiday in the city.', 'How to buy a train ticket.'], 'The main idea covers the whole text: it describes Mia\'s usual journey and what went wrong last week.'),
          read(COMMUTE, "How long is Mia's usual journey?", 'Forty minutes.', ['Two hours.', 'Seven fifteen.', 'One week.'], 'Scan the text for a length of time. The journey takes forty minutes. Two hours was the time of the car journey last week.'),
          read(COMMUTE, 'Why did Mia drive to work last week?', 'The train was cancelled.', ['She likes driving.', 'She lost her ticket.', 'She wanted to listen to music.'], 'The text says the train was cancelled because of a strike, so she had to drive.'),
          read(COMMUTE, 'How does Mia feel about driving to work?', 'She does not want to do it again.', ['She wants to do it every day.', 'She thinks it is cheaper.', 'She finds it relaxing.'], '"She will never drive to work again" shows that she did not enjoy it because of the traffic.'),
          read(CAFE, 'What time does The Green Bean close from Monday to Saturday?', 'At 6 p.m.', ['At 8 a.m.', 'At 10 p.m.', 'At noon.'], 'Scan for the closing time. The café opens at 8 a.m. and closes at 6 p.m.'),
          read(CAFE, 'On which day is the café closed?', 'On Sunday.', ['On Monday.', 'On Saturday.', 'On Friday.'], 'The text says it is open from Monday to Saturday but closed on Sundays.'),
          read(CAFE, 'What must students show to get a discount?', 'Their student card.', ['A university letter.', 'A ten per cent coupon.', 'Their passport.'], 'The discount is ten per cent, and students must show their student card. Do not mix up the discount with what you have to show.'),
          read(CAFE, 'Why is the café famous?', 'For its homemade cakes.', ['For its low prices.', 'For being open on Sundays.', 'For its big tables.'], 'The text says the café is famous for its homemade cakes, which the owner bakes every morning.'),
        ],
      },
      {
        id: 'b1-rd-2',
        title: 'Fill the gaps',
        guide: {
          summary: 'Choose the right small word for a gap in a text.',
          intro:
            'In a gap-fill exercise, small words such as prepositions and linking words are missing. Read the whole sentence before you choose. Think about what type of word is needed and check if the word fits the meaning of the sentence.',
          points: [
            { term: 'prepositions in gaps', text: 'Words like in, at, on and to depend on the noun that comes after them. Use in with towns and villages.', example: 'We stayed in a small village.' },
            { term: 'linking words', text: 'So shows a result, but shows a contrast, and because shows a reason.', example: 'It was hot, so we went swimming.' },
            { term: 'tenses in gaps', text: 'Check the time of the text. A text about the past often needs past simple or past perfect.', example: 'I had never eaten paella before.' },
          ],
        },
        questions: [
          gap(HOLIDAY_GAPS, 1, 'had', ['made', 'did', 'went'], 'The collocation is have a holiday. Made, did and went do not combine with "a holiday" in this meaning.'),
          gap(HOLIDAY_GAPS, 2, 'in', ['at', 'on', 'to'], 'Use in with a village, town or city. At is for a specific point, such as a hotel or a station.'),
          gap(HOLIDAY_GAPS, 3, 'so', ['because', 'but', 'although'], 'The hot weather is the reason and spending time in the sea is the result, so we use so.'),
          gap(HOLIDAY_GAPS, 4, 'had', ['did', 'was', 'am'], 'Had never eaten is the past perfect. It shows that she had no experience of paella before that first night.'),
          gap(HOLIDAY_GAPS, 5, 'When', ['During', 'While', 'Until'], 'When + past simple tells us the time of the action: "When we got home". During needs a noun, not a full clause.'),
          read(HOLIDAY, 'Where did the writer stay on holiday?', 'In a small village near the beach.', ['In a big city.', 'In a hotel in the mountains.', 'In a tent near a lake.'], 'The text says they stayed in a small village near the beach.'),
          read(HOLIDAY, 'Why did they spend a lot of time in the sea?', 'The weather was hot.', ['They could not swim.', 'The village was cold.', 'They did not like the food.'], 'The text says "the weather was hot, so we spent most of the time in the sea". The hot weather is the reason.'),
          read(HOLIDAY, 'What did the writer try to do at home?', 'Cook paella.', ['Visit Spain again.', 'Buy a house.', 'Learn Spanish.'], 'The last sentence says that when they got home, the writer tried to cook paella.'),
        ],
      },
    ],
  },

  {
    id: 'b1-wc',
    icon: 'scale',
    title: 'Word Choice & Politeness',
    desc: 'Confusing word pairs and polite English.',
    lessons: [
      {
        id: 'b1-wc-1',
        title: 'Words that look alike',
        guide: {
          summary: 'Much and many, then and than, its and it is, quite and quiet.',
          intro:
            'Some English words look or sound similar but have different meanings. These pairs are among the most common mistakes, even for people who have studied English for years. Learn each pair with an example.',
          points: [
            { term: 'much and many', text: 'Use many with countable nouns (students) and much with uncountable nouns (money).', example: 'How many students? How much money?' },
            { term: 'then and than', text: 'Then is about time or order. Than is used to compare.', example: 'First we ate, then we walked. She is taller than me.' },
            { term: "its and it's", text: "It's means it is or it has. Its shows that something belongs to it.", example: "It's raining. The dog wagged its tail." },
            { term: 'quite and quiet', text: 'Quite means fairly. Quiet means without much noise.', example: 'The film was quite good. Please be quiet.' },
          ],
        },
        questions: [
          fill('How ___ money do you have?', 'much', ['many', 'few', 'lots'], 'Money is uncountable, so we use much. We use many with things we can count, such as coins.'),
          fill('How ___ students are in your class?', 'many', ['much', 'little', 'a lot'], 'Students are countable, so we use many in a question with "How".'),
          fill('My brother is taller ___ me.', 'than', ['then', 'that', 'as'], 'Use than to compare two things. Then is about time: "first this, then that".'),
          fill('First we ate, ___ we went for a walk.', 'then', ['than', 'that', 'when'], 'Then shows the order of events. Than is only for comparing.'),
          fill('The dog wagged ___ tail.', 'its', ["it's", 'it', 'their'], "Its (no apostrophe) shows that something belongs to it. It's always means it is or it has."),
          fill("___ raining again!", "It's", ['Its', 'Is', 'It'], "It's raining means it is raining. The apostrophe replaces the missing letter."),
          fill('Please be ___. The baby is sleeping.', 'quiet', ['quite', 'quick', 'quote'], 'Quiet means with little noise. Quite means fairly or very, and it has a different spelling.'),
          fill('The film was ___ good, but not great.', 'quite', ['quiet', 'quit', 'quote'], 'Quite means fairly, not very. "Quite good" means good but not excellent.'),
        ],
      },
      {
        id: 'b1-wc-2',
        title: 'Polite and casual',
        guide: {
          summary: 'Make requests politely and choose between formal and informal greetings.',
          intro:
            'In English, how you say something is as important as what you say. Commands like "Open the window" can sound rude. Add "could you" or "would you mind" and "please" to sound polite. For emails and letters, choose formal greetings with people you do not know and casual greetings with friends.',
          points: [
            { term: 'polite requests', text: 'Start with could you or would you mind. Add please. These are polite with strangers, in shops and at work.', example: 'Could you open the window, please?' },
            { term: 'greetings', text: 'Use Dear Mr/Ms + surname in formal emails, and Hi or Hey + first name with friends.', example: 'Dear Mr Brown, / Hi Sam,' },
            { term: 'saying thank you', text: 'Thanks and Thanks a lot are casual. Thank you very much and I appreciate it are more formal.', example: 'Thanks a lot! / I appreciate your help.' },
            { term: 'saying no politely', text: 'Say sorry and give a reason. Do not answer only with no.', example: 'I am sorry, but I cannot come.' },
          ],
        },
        questions: [
          choose('qPolite', 'Could you open the window, please?', ['Open the window.', 'Open the window now.', 'You must open the window.'], 'Could you ... please is a polite request. Commands without please can sound rude to strangers.'),
          choose('qPolite', 'Would you mind waiting a moment?', ['Wait here.', 'You wait.', 'Wait a moment.'], 'Would you mind + -ing is very polite. The other options are commands.'),
          choose('qFormal', 'Dear Mr Brown,', ['Hi Bob,', 'Hey,', 'Yo Bob,'], 'Use Dear + title + surname when you write a formal email to someone you do not know well.'),
          choose('qInformal', 'Thanks a lot!', ['I am most grateful.', 'Thank you very much indeed.', 'I appreciate your help.'], 'Thanks a lot is short and friendly. The other options are polite and more formal.'),
          choose('qPolite', 'I am sorry, but I cannot come.', ['No, I will not.', 'I am not coming.', 'Forget it.'], 'Starting with sorry and giving a reason sounds much more polite than a short refusal.'),
          choose('qInformal', 'See you later!', ['I look forward to seeing you.', 'Goodbye for now, sir.', 'Until we meet again.'], 'See you later is a casual way to say goodbye to friends. The others are formal or old-fashioned.'),
          choose('qPolite', 'Excuse me, could you tell me the time?', ['Tell me the time.', 'Time?', 'Say the time.'], 'Excuse me and could you make a request polite. The other options sound like orders.'),
          choose('qFormal', 'I would like to enquire about the price.', ['I wanna know the price.', 'Tell me the price.', 'How much is it, then?'], 'I would like to enquire about is a formal way to ask for information, for example in a letter or on the phone to a company.'),
        ],
      },
    ],
  },
];
