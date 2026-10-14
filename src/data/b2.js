import { fill, mean, choose, read, gap, ord } from './helpers.js';

const REMOTE =
  'Since the pandemic, remote work has moved from a perk for a few to a standard option for many. Supporters argue that it saves commuting time and gives employees more control over their day. Critics, however, point out that it can blur the boundary between work and home, leaving some people feeling permanently on call. Many companies are now experimenting with hybrid models in the hope of getting the best of both worlds.';

const SLEEP =
  'Scientists have long known that sleep is essential, but recent studies suggest that it does far more than simply rest the body. During deep sleep the brain appears to clear away waste products that build up during the day, and memories are sorted and stored. People who regularly sleep less than six hours are more likely to struggle with concentration and to catch infections. Even so, there is little evidence that sleeping more than nine hours brings extra benefits.';

const TOURISM =
  'Overtourism is becoming a serious problem in popular destinations. Residents complain about rising rents, crowded streets and noise, while local businesses often depend on visitors for their income. Some cities have responded by limiting the number of tourists or charging a daily fee, but critics say such measures only treat the symptoms.';

const COUNCIL =
  'The city council has (1)___ plans to ban cars from the centre. Although many residents (2)___ the idea, shop owners fear it will (3)___ their business. The council insists that cleaner air is worth the (4)___.';

export const TRACKS = [
  {
    id: 'pv',
    icon: 'link',
    title: { en: 'Phrasal Verbs', id: 'Phrasal Verbs' },
    desc: { en: 'The verb + particle combinations natives use all day.', id: 'Kombinasi kata kerja + partikel yang dipakai penutur asli sehari-hari.' },
    lessons: [
      {
        id: 'pv-1',
        title: { en: 'Everyday phrasal verbs', id: 'Phrasal verb sehari-hari' },
        questions: [
          fill("I can't ___ the noise from the building site any longer.", 'put up with', ['put off', 'put away', 'put out'], 'put up with = tolerate.'),
          fill('We had to ___ the meeting because the manager was ill.', 'call off', ['call on', 'call up', 'call for'], 'call off = cancel.'),
          fill('She takes ___ her mother; they have exactly the same laugh.', 'after', ['on', 'up', 'over'], 'take after = resemble a family member.'),
          fill('The company plans to ___ a new smartphone next month.', 'bring out', ['bring up', 'bring down', 'bring about'], 'bring out = release a product. bring about = cause.'),
          fill('It took me weeks to ___ the shock of losing my job.', 'get over', ['get by', 'get away', 'get on'], 'get over = recover from.'),
          fill('Could you ___ the figures before the meeting? I want to be sure they are right.', 'go over', ['go off', 'go without', 'go along'], 'go over = check carefully.'),
          fill("He didn't ___ at the party, so we started without him.", 'turn up', ['turn down', 'turn off', 'turn over'], 'turn up = arrive, appear.'),
          ord('We ran out of time', 'Say that there was no time left.', 'run out of = use all of something.'),
        ],
      },
      {
        id: 'pv-2',
        title: { en: 'Work and study', id: 'Kerja dan belajar' },
        questions: [
          fill('We need to ___ a solution before Friday.', 'come up with', ['come out with', 'come across', 'come round'], 'come up with = think of an idea or plan.'),
          fill('Unfortunately, the bank ___ my loan application.', 'turned down', ['turned up', 'turned over', 'turned into'], 'turn down = reject.'),
          fill('The researchers will ___ a survey of 2,000 people.', 'carry out', ['carry on', 'carry over', 'carry off'], 'carry out = perform. carry on = continue.'),
          fill('Sales ___ after the advertising campaign.', 'picked up', ['picked on', 'picked out', 'picked at'], 'pick up = improve or increase.'),
          fill('The manager promised to ___ the complaint.', 'look into', ['look after', 'look up to', 'look out for'], 'look into = investigate.'),
          fill('She really ___ her father; she wants to be a doctor too.', 'looks up to', ['looks down on', 'looks out for', 'looks into'], 'look up to = admire. look down on = think you are better than.'),
          fill('I need to ___ my French before the trip to Paris.', 'brush up', ['brush off', 'brush aside', 'brush out'], 'brush up (on) = improve a skill you already have.'),
          ord("Let's sort out the problem", 'Suggest solving it together.', 'sort out = deal with successfully.'),
        ],
      },
      {
        id: 'pv-3',
        title: { en: 'People and feelings', id: 'Orang dan perasaan' },
        questions: [
          fill('They ___ after ten years of marriage.', 'split up', ['put up', 'set up', 'make up for'], 'split up = end a relationship.'),
          fill("I don't ___ well with my new boss.", 'get on', ['get over', 'get off', 'get through'], 'get on (well) with someone = have a good relationship.'),
          fill('She ___ when she heard the bad news.', 'broke down', ['broke off', 'broke in', 'broke out'], 'break down = lose control and cry.'),
          fill('I hate to ___ my team, so I always prepare carefully.', 'let down', ['let off', 'let out', 'let on'], 'let down = disappoint.'),
          fill('You need to ___ the fact that she is not coming back.', 'face up to', ['face out', 'face off', 'face down'], 'face up to = accept a difficult truth.'),
          fill('My sister and I always ___ about money.', 'fall out', ['fall for', 'fall through', 'fall behind'], 'fall out = quarrel.'),
          fill('The plan ___ because nobody could agree on the budget.', 'fell through', ['fell out', 'fell for', 'fell behind'], 'fall through = fail to happen.'),
          ord('I can always count on you', 'Tell a friend that you trust them.', 'count on = rely on.'),
        ],
      },
    ],
  },

  {
    id: 'id',
    icon: 'quote',
    title: { en: 'Idioms & Collocations', id: 'Idiom & Kolokasi' },
    desc: { en: 'Sound natural with fixed expressions and words that belong together.', id: 'Terdengar alami dengan ungkapan tetap dan pasangan kata yang lazim.' },
    lessons: [
      {
        id: 'id-1',
        title: { en: 'What does it mean?', id: 'Apa artinya?' },
        questions: [
          mean("It's raining cats and dogs.", 'It is raining very heavily.', ['It is raining lightly.', 'The weather is changing quickly.', 'It is about to stop raining.'], 'An idiom for very heavy rain.'),
          mean("Let's call it a day.", 'Let us stop working for now.', ['Let us phone someone tomorrow.', 'Let us choose a date to meet.', 'Let us work until the evening.'], 'Said when you decide to finish for the day.'),
          mean("I'm feeling a bit under the weather.", 'I feel slightly ill.', ['I am standing outside in the rain.', 'I am extremely angry.', 'I am very happy.'], 'under the weather = not feeling well.'),
          mean('That exam was a piece of cake.', 'It was very easy.', ['It was very sweet.', 'It was very stressful.', 'It was surprisingly long.'], 'a piece of cake = something very easy.'),
          mean('He spilled the beans about the surprise party.', 'He revealed a secret.', ['He cooked a meal.', 'He made a mess.', 'He organised the party.'], 'spill the beans = reveal secret information.'),
          mean("We'll just have to bite the bullet and tell him.", 'Do something unpleasant that cannot be avoided.', ['Avoid the topic completely.', 'Argue with him.', 'Wait for a better moment.'], 'bite the bullet = face a difficult situation bravely.'),
          mean("I'm snowed under with work this week.", 'I have far too much to do.', ['I am working in cold conditions.', 'I am on holiday.', 'I am bored.'], 'snowed under = overwhelmed with work.'),
          mean('"Break a leg!" said the director before the show.', 'Good luck.', ['Be careful.', 'Hurry up.', "Don't be late."], 'Said to performers to wish them luck.'),
        ],
      },
      {
        id: 'id-2',
        title: { en: 'Complete the idiom', id: 'Lengkapi idiomnya' },
        questions: [
          fill("Don't count your ___ before they hatch.", 'chickens', ['eggs', 'birds', 'hens'], "Don't count on a success that has not happened yet."),
          fill('He keeps ___ the bush instead of telling me what he wants.', 'beating around', ['hitting around', 'cutting down', 'digging around'], 'beat around the bush = avoid the main point.'),
          fill('Losing that job turned out to be a blessing in ___.', 'disguise', ['hiding', 'secret', 'shadow'], 'a blessing in disguise = a bad thing that turns out well.'),
          fill("We're all in the same ___, so let's help each other.", 'boat', ['ship', 'car', 'room'], 'in the same boat = in the same difficult situation.'),
          fill("I can't take on more tasks; I have a lot on my ___.", 'plate', ['shelf', 'bowl', 'tray'], 'have a lot on your plate = have a lot to deal with.'),
          fill('You hit the nail on the ___ when you said we lack communication.', 'head', ['hand', 'wall', 'board'], 'hit the nail on the head = be exactly right.'),
          fill('He was over the ___ when he won the lottery.', 'moon', ['sun', 'stars', 'clouds'], 'over the moon = extremely happy.'),
          ord("It's not rocket science", 'Say that something is easy to understand.', 'not rocket science = not difficult.'),
        ],
      },
      {
        id: 'id-3',
        title: { en: 'Collocations', id: 'Kolokasi' },
        questions: [
          fill('She ___ a great impression on the interviewers.', 'made', ['did', 'took', 'gave'], 'make an impression.'),
          fill('Could you ___ me a favour?', 'do', ['make', 'take', 'have'], 'do someone a favour.'),
          fill('We need to ___ a decision by Friday.', 'make', ['do', 'hold', 'play'], 'make a decision.'),
          fill('He ___ attention to every small detail.', 'pays', ['makes', 'does', 'takes'], 'pay attention.'),
          fill("I'd like to ___ a complaint about the service.", 'make', ['do', 'take', 'give'], 'make a complaint.'),
          fill('We had a ___ argument about money last night.', 'heated', ['hot', 'burning', 'warm'], 'heated argument = angry argument.'),
          fill("He's a ___ sleeper; nothing wakes him up.", 'heavy', ['strong', 'thick', 'big'], 'heavy sleeper.'),
          ord('She made a great impression on everyone', 'Say that people liked her very much.', 'make an impression on someone.'),
        ],
      },
    ],
  },

  {
    id: 'gr',
    icon: 'pen',
    title: { en: 'Advanced Grammar', id: 'Grammar Lanjutan' },
    desc: { en: 'Conditionals, passives, reported speech and emphatic structures.', id: 'Conditionals, pasif, reported speech, dan struktur penekanan.' },
    lessons: [
      {
        id: 'gr-1',
        title: { en: 'Conditionals', id: 'Conditionals' },
        questions: [
          fill('If I ___ harder at school, I would have a better job now.', 'had studied', ['studied', 'would study', 'have studied'], 'Mixed conditional: past condition (had + past participle), present result (would + verb).'),
          fill("If she hadn't missed the train, she ___ on time.", 'would have arrived', ['would arrive', 'will arrive', 'had arrived'], 'Third conditional: had + past participle, would have + past participle.'),
          fill('___ you need any help, please let me know.', 'Should', ['Would', 'Might', 'Did'], 'Formal inversion of "If you should need..."'),
          fill("Unless it ___ tomorrow, we'll go to the beach.", 'rains', ['will rain', 'rained', 'would rain'], 'After unless in a real future condition, use the present simple.'),
          fill('If it ___ for your help, I would never have finished.', "hadn't been", ["wasn't", "weren't", "hasn't been"], '"If it hadn\'t been for..." = without.'),
          fill('Supposing you ___ the chance, would you live abroad?', 'had', ['have', 'would have', 'having'], 'Supposing + past simple = imaginary situation.'),
          fill("I'd rather you ___ smoke in here.", "didn't", ["don't", "won't", "wouldn't"], "would rather + person + past simple = a preference about someone else's action."),
          ord('If I were you I would apologise', 'Give advice using the second conditional.', 'were is common for all persons in formal second conditionals.'),
        ],
      },
      {
        id: 'gr-2',
        title: { en: 'Passive and causative', id: 'Pasif dan kausatif' },
        questions: [
          fill('The bridge ___ by a storm last night.', 'was destroyed', ['destroyed', 'has destroyed', 'was destroying'], 'Past simple passive: was/were + past participle.'),
          fill('I had my car ___ yesterday.', 'repaired', ['repair', 'repairing', 'to repair'], 'have something done = arrange for someone else to do it.'),
          fill('She is said ___ the richest woman in the country.', 'to be', ['being', 'be', 'to being'], 'is said / thought / believed + to-infinitive.'),
          fill('The new law ___ next year.', 'will be introduced', ['will introduce', 'will be introducing', 'has introduced'], 'The law is the object of the action, so use the passive.'),
          fill('He got his hair ___ before the wedding.', 'cut', ['cutting', 'to cut', 'cuts'], 'get something done (informal causative).'),
          fill('The report ___ by the time we arrive.', 'will have been finished', ['will finish', 'will be finishing', 'has finished'], 'Future perfect passive: will have been + past participle.'),
          fill('Nobody likes ___ to wait.', 'being made', ['making', 'to be made', 'made'], 'like + being + past participle.'),
          ord('The documents had to be signed', 'Say that people were required to sign the documents.', 'modal passive: had to be + past participle.'),
        ],
      },
      {
        id: 'gr-3',
        title: { en: 'Reported speech', id: 'Reported speech' },
        questions: [
          fill('"I will call you tomorrow," she said. She said she ___ me the next day.', 'would call', ['will call', 'calls', 'calling'], 'will shifts back to would in reported speech.'),
          fill('"Where do you live?" he asked me. He asked me where I ___.', 'lived', ['did live', 'do live', 'am living'], 'Reported questions use statement word order and shift the tense back.'),
          fill('"Don\'t touch that!" she told the boy. She told the boy ___ that.', 'not to touch', ['not touching', "to don't touch", 'no touch'], 'tell + object + (not) to-infinitive.'),
          fill('He admitted ___ the window.', 'breaking', ['to break', 'break', 'to breaking'], 'admit + -ing form.'),
          fill('She suggested ___ to the cinema.', 'going', ['to go', 'go', 'we to go'], 'suggest + -ing form.'),
          fill('They promised ___ us as soon as they arrived.', 'to call', ['calling', 'call', 'that call'], 'promise + to-infinitive.'),
          fill('He denied ___ the money.', 'stealing', ['to steal', 'steal', 'stole'], 'deny + -ing form.'),
          ord('She asked me whether I had finished', 'Report a yes/no question.', 'Use if or whether, then statement word order.'),
        ],
      },
      {
        id: 'gr-4',
        title: { en: 'Wishes and emphasis', id: 'Harapan dan penekanan' },
        questions: [
          fill('I wish I ___ more time last year.', 'had had', ['have', 'had', 'would have'], 'wish + past perfect = regret about the past.'),
          fill('If only he ___ listen to me!', 'would', ['will', 'had', 'can'], 'wish / if only + would = annoyance about someone\'s behaviour.'),
          fill('Never ___ such a beautiful sunset.', 'have I seen', ['I have seen', 'I saw', 'seen I'], 'Negative adverb at the start causes inversion.'),
          fill('Not only ___ late, but he also forgot the documents.', 'did he arrive', ['he arrived', 'arrived he', 'he did arrive'], 'Not only + auxiliary + subject.'),
          fill('Hardly ___ the door when the phone rang.', 'had she opened', ['she had opened', 'did she open', 'she opened'], 'Hardly + had + subject + past participle ... when.'),
          fill('What I need ___ a long holiday.', 'is', ['are', 'be', 'being'], 'Cleft sentence: What I need is + noun.'),
          fill('It was in Paris ___ they first met.', 'that', ['what', 'which', 'when'], 'Cleft sentence: It was ... that ...'),
          ord('Rarely do we see such talent', 'Use negative inversion for emphasis.', 'Rarely + auxiliary + subject.'),
        ],
      },
    ],
  },

  {
    id: 'rd',
    icon: 'book',
    title: { en: 'Reading & Cloze', id: 'Membaca & Cloze' },
    desc: { en: 'Short texts, inference questions and gap-fills.', id: 'Teks pendek, soal inferensi, dan mengisi rumpang.' },
    lessons: [
      {
        id: 'rd-1',
        title: { en: 'Reading for meaning', id: 'Membaca untuk makna' },
        questions: [
          read(REMOTE, "What is the writer's main point?", 'Remote work has benefits and drawbacks, and hybrid models are being tried.', ['Remote work has been abandoned by most companies.', 'Commuting is the biggest problem in modern work.', 'Critics have proved that remote work does not work.'], 'The text balances supporters and critics, then mentions hybrid models.'),
          read(REMOTE, 'The phrase "permanently on call" suggests that some people ___.', 'feel they can never fully switch off from work', ['are paid extra for emergencies', 'receive too many calls from family', 'work only at night'], 'on call = available to work at any time.'),
          read(REMOTE, 'What do many companies hope hybrid models will achieve?', 'Combine the advantages of the office and of home', ['Reduce salaries', 'End remote work completely', 'Increase commuting'], '"the best of both worlds".'),
          read(SLEEP, 'According to the text, what happens during deep sleep?', 'The brain removes waste and organises memories.', ['The body stops producing waste.', 'The immune system is switched off.', 'The brain stops all activity.'], 'Look for "clear away waste" and "memories are sorted and stored".'),
          read(SLEEP, 'What can be inferred about people who regularly sleep under six hours?', 'They face higher risks to concentration and health.', ['They have better memories.', 'They always catch up on sleep at weekends.', 'They are never ill.'], 'The text links short sleep to poor concentration and infections.'),
          read(SLEEP, 'What does the writer say about sleeping more than nine hours?', 'There is no clear evidence of extra benefits.', ['It is dangerous.', 'It improves memory.', 'It is recommended for everybody.'], '"little evidence ... brings extra benefits".'),
        ],
      },
      {
        id: 'rd-2',
        title: { en: 'Cloze and inference', id: 'Cloze dan inferensi' },
        questions: [
          gap(COUNCIL, 1, 'announced', ['advertised', 'informed', 'persuaded'], 'announce plans = make them publicly known.'),
          gap(COUNCIL, 2, 'welcome', ['enjoy', 'admit', 'suit'], 'welcome an idea = be pleased about it.'),
          gap(COUNCIL, 3, 'affect', ['effect', 'infect', 'reflect'], 'affect (verb) = influence. effect is usually a noun.'),
          gap(COUNCIL, 4, 'inconvenience', ['inconvenient', 'inconveniently', 'convenience'], 'After "the" we need a noun.'),
          read(TOURISM, 'What is the main idea of the text?', "Popular destinations struggle to balance tourism's benefits and costs.", ['Tourists are unwelcome everywhere.', 'Cities have solved the problem.', 'Rents are falling in tourist areas.'], 'Residents suffer costs, businesses gain income.'),
          read(TOURISM, 'Critics believe that limits and daily fees ___.', 'do not address the underlying causes', ['are too expensive for cities', 'work perfectly', 'upset businesses more than tourists'], '"only treat the symptoms" = do not fix the root problem.'),
        ],
      },
    ],
  },

  {
    id: 'wc',
    icon: 'scale',
    title: { en: 'Word Choice & Register', id: 'Pilihan Kata & Register' },
    desc: { en: 'Confusing word pairs, formal and informal English, word formation.', id: 'Pasangan kata yang membingungkan, bahasa formal/informal, pembentukan kata.' },
    lessons: [
      {
        id: 'wc-1',
        title: { en: 'Easily confused words', id: 'Kata yang mudah tertukar' },
        questions: [
          fill('Stress can have a harmful ___ on your health.', 'effect', ['affect', 'infect', 'defect'], 'effect = noun (result). affect = verb (influence).'),
          fill('I need some ___ about courses abroad.', 'advice', ['advise', 'advices', 'advises'], 'advice = noun (uncountable). advise = verb.'),
          fill('Buying in bulk is more ___ than buying single items.', 'economical', ['economic', 'economy', 'economics'], 'economical = saving money. economic = relating to the economy.'),
          fill('She ___ the book on the table and left.', 'laid', ['lay', 'lain', 'lied'], 'lay (laid, laid) needs an object. lie (lay, lain) does not.'),
          fill("He's very ___ about his weight, so don't mention it.", 'sensitive', ['sensible', 'sensual', 'sensory'], 'sensitive = easily upset. sensible = practical.'),
          fill('Honesty is a basic ___ of our company.', 'principle', ['principal', 'principals', 'principally'], 'principle = rule or belief. principal = main / head of a school.'),
          fill("Don't ___ your passport at the airport!", 'lose', ['loose', 'loss', 'lost'], 'lose = verb (not keep). loose = not tight.'),
          ord('Stress can affect your health', 'Say that stress influences your health.', 'affect (verb) + object.'),
        ],
      },
      {
        id: 'wc-2',
        title: { en: 'Formal and informal', id: 'Formal dan informal' },
        questions: [
          choose('qFormal', 'Dear Sir or Madam,', ['Hey there,', 'Hi mate,', 'Yo,'], 'Use Dear Sir or Madam when you do not know the name.'),
          choose('qFormal', 'ascertain', ['dig up', 'check out', 'figure out'], 'ascertain = find out (formal).'),
          choose('qFormal', 'obtain', ['grab', 'nab', 'pick up'], 'obtain = get (formal).'),
          choose('qFormal', 'I would be grateful if you could confirm receipt.', ['Send me a quick reply, will you?', 'Just let me know ASAP.', 'Drop me a line when you get it.'], 'Conditional + polite request = formal.'),
          choose('qFormal', 'We regret to inform you that your application was unsuccessful.', ["Sorry, but you didn't get the job.", 'Bad news, your application is a no-go.', 'Tough luck on the application.'], 'regret to inform = formal bad news.'),
          choose('qInformal', "I'm absolutely knackered.", ['I am exceedingly fatigued.', 'I feel rather tired.', 'I am somewhat exhausted.'], 'knackered = very tired (informal, British).'),
          choose('qInformal', "Can you give me a hand with this?", ['Would you be able to assist me with this matter?', 'I would appreciate your assistance.', 'Could you kindly help me with this?'], 'give someone a hand = help (informal).'),
          ord('I would be grateful for your advice', 'Write a polite, formal request.', 'would be grateful = polite formal phrase.'),
        ],
      },
      {
        id: 'wc-3',
        title: { en: 'Word formation', id: 'Pembentukan kata' },
        questions: [
          fill('The company showed great ___ (innovate) in developing the product.', 'innovation', ['innovative', 'innovatively', 'innovator'], 'After great we need a noun.'),
          fill('Her ___ (reliable) is the reason she was promoted.', 'reliability', ['reliable', 'reliably', 'reliance'], 'Possessive her + noun.'),
          fill('The results were ___ (disappoint), so we repeated the test.', 'disappointing', ['disappointed', 'disappointment', 'disappointingly'], '-ing describes the cause; -ed describes the feeling.'),
          fill('He spoke ___ (confident) in front of the audience.', 'confidently', ['confident', 'confidence', 'confide'], 'An adverb modifies the verb spoke.'),
          fill('The ___ (significant) of this discovery is huge.', 'significance', ['significant', 'significantly', 'signify'], 'After "the" we need a noun.'),
          fill('It is ___ (possible) to finish by tomorrow.', 'impossible', ['unpossible', 'inpossible', 'dispossible'], 'The negative prefix for possible is im-.'),
          fill('The new law is ___ (benefit) to small businesses.', 'beneficial', ['benefit', 'benefiting', 'beneficiary'], 'After is we need an adjective.'),
          fill('She is a very ___ (create) person.', 'creative', ['creation', 'creatively', 'creator'], 'Adjective before the noun person.'),
        ],
      },
    ],
  },
];

export const ALL_LESSONS = TRACKS.flatMap((t) => t.lessons.map((l) => ({ ...l, track: t.id })));

export function getLesson(id) {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getTrack(id) {
  return TRACKS.find((t) => t.id === id);
}
