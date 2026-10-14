import { fill, mean, choose, read, gap, ord } from './helpers.js';

const REMOTE =
  'Since the pandemic, remote work has moved from a perk for a few to a standard option for many. Supporters argue that it saves commuting time and gives employees more control over their day. Critics, however, point out that it can blur the boundary between work and home, leaving some people feeling permanently on call. Many companies are now experimenting with hybrid models in the hope of getting the best of both worlds.';

const SLEEP =
  'Scientists have long known that sleep is essential, but recent studies suggest that it does far more than simply rest the body. During deep sleep the brain appears to clear away waste products that build up during the day, and memories are sorted and stored. People who regularly sleep less than six hours are more likely to struggle with concentration and to catch infections. Even so, there is little evidence that sleeping more than nine hours brings extra benefits.';

const TOURISM =
  'Overtourism is becoming a serious problem in popular destinations. Residents complain about rising rents, crowded streets and noise, while local businesses often depend on visitors for their income. Some cities have responded by limiting the number of tourists or charging a daily fee, but critics say such measures only treat the symptoms.';

const COUNCIL =
  'The city council has (1)___ plans to ban cars from the centre. Although many residents (2)___ the idea, shop owners fear it will (3)___ their business. The council insists that cleaner air is worth the (4)___.';

// Each lesson has a `guide` (read before the lesson) and questions with a plain-English `note`.
export const TRACKS = [
  {
    id: 'pv',
    icon: 'link',
    title: 'Phrasal Verbs',
    desc: 'Verb + small word combinations that native speakers use all day.',
    lessons: [
      {
        id: 'pv-1',
        title: 'Everyday phrasal verbs',
        guide: {
          summary: 'Common verbs like put up with, call off and get over.',
          intro:
            'A phrasal verb is a verb plus a small word such as up, off, out or over. The meaning is often different from the verb on its own: "give up" has nothing to do with giving. Native speakers use them constantly in conversation, emails and meetings. They sound relaxed and natural, and they are usually less formal than one-word verbs such as "tolerate" or "cancel".',
          points: [
            { term: 'put up with', text: 'Accept something annoying without complaining. Use it when something bothers you but you cannot change it.', example: "I can't put up with the noise any longer." },
            { term: 'call off', text: 'Cancel an event or plan. Common with meetings, matches, trips and weddings.', example: 'They called off the match because of the rain.' },
            { term: 'get over', text: 'Recover from an illness, a shock or a sad event.', example: 'It took her months to get over the break-up.' },
            { term: 'run out of', text: 'Use all of something so that none is left.', example: 'We have run out of milk.' },
          ],
        },
        questions: [
          fill("I can't ___ the noise from the building site any longer.", 'put up with', ['put off', 'put away', 'put out'], 'Put up with means to accept something annoying without complaining. Use it for noise, rude people or long delays that you cannot avoid. Put off means to delay, and put out means to extinguish.'),
          fill('We had to ___ the meeting because the manager was ill.', 'call off', ['call on', 'call up', 'call for'], 'Call off means to cancel something that was planned, such as a meeting, a trip or a match. Call on means to visit someone, and call for means to demand or need something.'),
          fill('She takes ___ her mother; they have exactly the same laugh.', 'after', ['on', 'up', 'over'], 'Take after means to look or behave like an older family member. You can only use it for relatives: "He takes after his father."'),
          fill('The company plans to ___ a new smartphone next month.', 'bring out', ['bring up', 'bring down', 'bring about'], 'Bring out means to release a new product, book or film. Do not confuse it with bring about, which means to cause something to happen, and bring up, which means to raise a topic or raise a child.'),
          fill('It took me weeks to ___ the shock of losing my job.', 'get over', ['get by', 'get away', 'get on'], 'Get over means to recover from something bad, like an illness or a shock. Get by means to manage with very little money.'),
          fill('Could you ___ the figures before the meeting? I want to be sure they are right.', 'go over', ['go off', 'go without', 'go along'], 'Go over means to check or review something carefully. It is common at work: "Let\'s go over the plan again."'),
          fill("He didn't ___ at the party, so we started without him.", 'turn up', ['turn down', 'turn off', 'turn over'], 'Turn up means to arrive or appear, often unexpectedly. Turn down means to refuse something, so it does not fit here.'),
          ord('We ran out of time', 'Say that there was no time left.', 'Run out of means to use all of something until none is left. You can use it with time, money, energy or supplies.'),
        ],
      },
      {
        id: 'pv-2',
        title: 'Work and study',
        guide: {
          summary: 'Phrasal verbs for meetings, projects and applications.',
          intro:
            'Work and study are full of phrasal verbs. You will hear them in meetings, read them in emails and use them when you talk about projects, applications and results. In very formal writing you can swap many of them for a single formal verb (for example, "carry out" becomes "conduct"), but in normal workplace English the phrasal verb is the natural choice.',
          points: [
            { term: 'come up with', text: 'Think of an idea, plan or solution.', example: 'We need to come up with a new marketing idea.' },
            { term: 'carry out', text: 'Do or complete a planned task such as research, a survey or an order.', example: 'The team carried out a survey of 2,000 customers.' },
            { term: 'look into', text: 'Investigate a problem or a complaint.', example: 'I will look into the problem and call you back.' },
            { term: 'turn down', text: 'Refuse an offer, request or application.', example: 'The bank turned down his loan application.' },
            { term: 'brush up on', text: 'Improve a skill you already have but have not used for a while.', example: 'I need to brush up on my French before the trip.' },
          ],
        },
        questions: [
          fill('We need to ___ a solution before Friday.', 'come up with', ['come out with', 'come across', 'come round'], 'Come up with means to think of an idea, plan or answer. Use it in brainstorming: "Can anyone come up with a better idea?" Come across means to find something by chance.'),
          fill('Unfortunately, the bank ___ my loan application.', 'turned down', ['turned up', 'turned over', 'turned into'], 'Turn down means to refuse an offer, request or application. It is polite and common when you talk about job offers, loans and invitations.'),
          fill('The researchers will ___ a survey of 2,000 people.', 'carry out', ['carry on', 'carry over', 'carry off'], 'Carry out means to do a planned piece of work such as a survey, experiment or order. Carry on means to continue.'),
          fill('Sales ___ after the advertising campaign.', 'picked up', ['picked on', 'picked out', 'picked at'], 'Pick up means to improve or increase when you talk about business, trade or the economy. Pick on means to treat someone unfairly.'),
          fill('The manager promised to ___ the complaint.', 'look into', ['look after', 'look up to', 'look out for'], 'Look into means to investigate. Managers use it to promise action: "We will look into it." Look after means to take care of someone.'),
          fill('She really ___ her father; she wants to be a doctor too.', 'looks up to', ['looks down on', 'looks out for', 'looks into'], 'Look up to means to admire and respect someone. Look down on is the opposite: to feel that you are better than someone.'),
          fill('I need to ___ my French before the trip to Paris.', 'brush up', ['brush off', 'brush aside', 'brush out'], 'Brush up (on) means to refresh a skill you already have. Use it for languages, maths or software that you have not used for a while.'),
          ord("Let's sort out the problem", 'Suggest solving it together.', 'Sort out means to deal with a problem or a task successfully. It is friendly and practical: "Let\'s sort it out."'),
        ],
      },
      {
        id: 'pv-3',
        title: 'People and feelings',
        guide: {
          summary: 'Phrasal verbs for relationships, emotions and disappointments.',
          intro:
            'When we talk about friends, family and feelings, we almost always use phrasal verbs. They describe how relationships start, change and end. Learning them helps you tell personal stories and understand everyday conversation, TV shows and films.',
          points: [
            { term: 'get on with', text: 'Have a friendly relationship with someone.', example: 'I get on really well with my new boss.' },
            { term: 'fall out', text: 'Have an argument and stop being friendly.', example: 'They fell out over money.' },
            { term: 'let down', text: 'Disappoint someone by not doing what you promised.', example: "I'm sorry I let you down." },
            { term: 'break down', text: 'Lose control of your emotions and cry.', example: 'She broke down when she heard the news.' },
            { term: 'face up to', text: 'Accept a difficult truth instead of avoiding it.', example: 'You need to face up to the facts.' },
          ],
        },
        questions: [
          fill('They ___ after ten years of marriage.', 'split up', ['put up', 'set up', 'make up for'], 'Split up means to end a romantic relationship or a marriage. It is the normal, everyday way to say it. Set up means to start something, like a company.'),
          fill("I don't ___ well with my new boss.", 'get on', ['get over', 'get off', 'get through'], 'Get on (well) with someone means to have a good relationship with them. Use it to describe colleagues, neighbours and classmates.'),
          fill('She ___ when she heard the bad news.', 'broke down', ['broke off', 'broke in', 'broke out'], 'Break down means to lose control of your emotions and cry. The same phrasal verb is used for cars that stop working: "The car broke down."'),
          fill('I hate to ___ my team, so I always prepare carefully.', 'let down', ['let off', 'let out', 'let on'], 'Let down means to disappoint someone who trusted you. It is often used with promises: "He never lets me down."'),
          fill('You need to ___ the fact that she is not coming back.', 'face up to', ['face out', 'face off', 'face down'], 'Face up to means to accept a difficult truth instead of ignoring it. It suggests courage and is common in advice.'),
          fill('My sister and I always ___ about money.', 'fall out', ['fall for', 'fall through', 'fall behind'], 'Fall out means to have an argument and stop being friendly. Fall for means to fall in love with someone or to believe a trick.'),
          fill('The plan ___ because nobody could agree on the budget.', 'fell through', ['fell out', 'fell for', 'fell behind'], 'Fall through means that a plan or deal fails to happen. Use it when something you arranged does not work out.'),
          ord('I can always count on you', 'Tell a friend that you trust them.', 'Count on means to rely on someone. It is a warm way to say that you trust a person to help you.'),
        ],
      },
    ],
  },

  {
    id: 'id',
    icon: 'quote',
    title: 'Idioms & Collocations',
    desc: 'Sound natural with fixed expressions and words that belong together.',
    lessons: [
      {
        id: 'id-1',
        title: 'What does it mean?',
        guide: {
          summary: 'Understand idioms whose meaning is not literal.',
          intro:
            'An idiom is a fixed expression whose meaning is different from the meaning of its separate words. "It\'s raining cats and dogs" has nothing to do with animals; it just means it is raining very hard. You cannot translate idioms word for word, so you must learn each one as a whole phrase. Idioms are mostly informal. Use them when you speak to friends and colleagues, and use them sparingly in formal writing.',
          points: [
            { term: 'under the weather', text: 'Slightly ill. Use it when you do not want to say exactly what is wrong.', example: "I'm feeling a bit under the weather today." },
            { term: 'a piece of cake', text: 'Something very easy.', example: 'The test was a piece of cake.' },
            { term: 'spill the beans', text: 'Reveal a secret by accident or on purpose.', example: 'Who spilled the beans about the party?' },
            { term: 'bite the bullet', text: 'Do something unpleasant that you cannot avoid, and do it bravely.', example: "I'll just have to bite the bullet and apologise." },
          ],
        },
        questions: [
          mean("It's raining cats and dogs.", 'It is raining very heavily.', ['It is raining lightly.', 'The weather is changing quickly.', 'It is about to stop raining.'], 'This idiom describes very heavy rain. Use it in small talk about the weather. Remember that the words "cats and dogs" are not literal.'),
          mean("Let's call it a day.", 'Let us stop working for now.', ['Let us phone someone tomorrow.', 'Let us choose a date to meet.', 'Let us work until the evening.'], 'People say this when they decide to stop work, usually because they are tired or the job is nearly done. It is friendly and common in the workplace.'),
          mean("I'm feeling a bit under the weather.", 'I feel slightly ill.', ['I am standing outside in the rain.', 'I am extremely angry.', 'I am very happy.'], 'Under the weather means slightly ill. It is a polite, light way to explain why you feel unwell or cannot come to work.'),
          mean('That exam was a piece of cake.', 'It was very easy.', ['It was very sweet.', 'It was very stressful.', 'It was surprisingly long.'], 'A piece of cake describes something that is very easy to do. Use it after you finish a task and want to say it was no problem.'),
          mean('He spilled the beans about the surprise party.', 'He revealed a secret.', ['He cooked a meal.', 'He made a mess.', 'He organised the party.'], 'Spill the beans means to reveal secret information. It is often used about surprises, gossip and plans that were meant to stay private.'),
          mean("We'll just have to bite the bullet and tell him.", 'Do something unpleasant that cannot be avoided.', ['Avoid the topic completely.', 'Argue with him.', 'Wait for a better moment.'], 'Bite the bullet means to face an unpleasant thing bravely because you have no choice, for example giving bad news or paying a large bill.'),
          mean("I'm snowed under with work this week.", 'I have far too much to do.', ['I am working in cold conditions.', 'I am on holiday.', 'I am bored.'], 'Snowed under means to be overwhelmed with work, like being buried in snow. People use it to explain why they are busy or cannot help.'),
          mean('"Break a leg!" said the director before the show.', 'Good luck.', ['Be careful.', 'Hurry up.', "Don't be late."], 'Break a leg is what people say to wish a performer good luck. It is a joke: saying "good luck" directly is thought to bring bad luck in the theatre.'),
        ],
      },
      {
        id: 'id-2',
        title: 'Complete the idiom',
        guide: {
          summary: 'Learn idioms as complete chunks, word for word.',
          intro:
            'Idioms are fixed. If you change one word, the expression sounds wrong or funny, so you cannot say "a blessing in secret". Learn each idiom as a complete chunk and practise it in a sentence. A good tip is to attach each idiom to a situation from your own life so that it is easy to remember.',
          points: [
            { term: 'a blessing in disguise', text: 'Something that seems bad at first but turns out to be good.', example: 'Missing the flight was a blessing in disguise; it crashed later.' },
            { term: 'in the same boat', text: 'In the same difficult situation as other people.', example: "We're all in the same boat, so let's help each other." },
            { term: 'hit the nail on the head', text: 'Say something that is exactly right.', example: 'You hit the nail on the head with that comment.' },
            { term: 'over the moon', text: 'Extremely happy.', example: 'She was over the moon when she passed.' },
          ],
        },
        questions: [
          fill("Don't count your ___ before they hatch.", 'chickens', ['eggs', 'birds', 'hens'], 'This proverb means: do not be sure about a success that has not happened yet. Use it when someone makes plans that depend on something uncertain.'),
          fill('He keeps ___ the bush instead of telling me what he wants.', 'beating around', ['hitting around', 'cutting down', 'digging around'], 'Beat around the bush means to avoid the main point. Use it when someone does not speak directly. The opposite advice is "Get to the point."'),
          fill('Losing that job turned out to be a blessing in ___.', 'disguise', ['hiding', 'secret', 'shadow'], 'A blessing in disguise is something that looks bad at first but later brings a good result. Use it when you look back on a setback.'),
          fill("We're all in the same ___, so let's help each other.", 'boat', ['ship', 'car', 'room'], 'In the same boat means to share the same difficult situation. It is used to build teamwork and sympathy.'),
          fill("I can't take on more tasks; I have a lot on my ___.", 'plate', ['shelf', 'bowl', 'tray'], 'Have a lot on your plate means to have many things to deal with. It is a polite way to say no to extra work.'),
          fill('You hit the nail on the ___ when you said we lack communication.', 'head', ['hand', 'wall', 'board'], 'Hit the nail on the head means to describe a problem exactly right. Use it to praise someone\'s accurate comment in a discussion.'),
          fill('He was over the ___ when he won the lottery.', 'moon', ['sun', 'stars', 'clouds'], 'Over the moon means extremely happy, usually because of good news. It is an informal, cheerful idiom.'),
          ord("It's not rocket science", 'Say that something is easy to understand.', 'Not rocket science means something is not difficult. Use it to encourage someone or to say that a task is simple.'),
        ],
      },
      {
        id: 'id-3',
        title: 'Collocations',
        guide: {
          summary: 'Know which words naturally go together, like make a decision.',
          intro:
            'Collocations are words that native speakers naturally put together. We say "make a decision", but never "do a decision". There is usually no grammar rule behind it: it is simply habit. If you choose the wrong partner word, people will still understand you, but you will sound less natural. The best method is to learn collocations as whole chunks and to notice them when you read.',
          points: [
            { term: 'make vs do', text: 'Use make for creating or producing something (a decision, a mistake, an effort, an impression). Use do for tasks and activities (homework, a favour, business, the washing-up).', example: 'make a decision, do me a favour' },
            { term: 'pay attention', text: 'We pay attention. We do not give or make attention.', example: 'Please pay attention to the instructions.' },
            { term: 'adjective + noun', text: 'Some adjectives only work with certain nouns: a heated argument, a heavy sleeper, a firm believer.', example: 'We had a heated argument.' },
          ],
        },
        questions: [
          fill('She ___ a great impression on the interviewers.', 'made', ['did', 'took', 'gave'], 'The collocation is make an impression. Use it to say how someone seems to other people, especially in interviews and first meetings.'),
          fill('Could you ___ me a favour?', 'do', ['make', 'take', 'have'], 'We do a favour for someone. Use "Could you do me a favour?" to ask politely for help.'),
          fill('We need to ___ a decision by Friday.', 'make', ['do', 'hold', 'play'], 'Make a decision is the standard collocation. Use make for choices, plans, mistakes and efforts.'),
          fill('He ___ attention to every small detail.', 'pays', ['makes', 'does', 'takes'], 'We pay attention, as if attention were money that we spend. Use it for focus, in school and at work.'),
          fill("I'd like to ___ a complaint about the service.", 'make', ['do', 'take', 'give'], 'Make a complaint is the usual collocation. Use it in formal situations such as hotels, shops and customer service.'),
          fill('We had a ___ argument about money last night.', 'heated', ['hot', 'burning', 'warm'], 'A heated argument is a very angry argument. The adjective "heated" almost always goes with argument, debate or discussion.'),
          fill("He's a ___ sleeper; nothing wakes him up.", 'heavy', ['strong', 'thick', 'big'], 'Heavy sleeper is a fixed collocation for someone who is difficult to wake up. The opposite is a light sleeper.'),
          ord('She made a great impression on everyone', 'Say that people liked her very much.', 'Make an impression on someone means to have a strong effect on how they see you. Add an adjective such as great, good or lasting.'),
        ],
      },
    ],
  },

  {
    id: 'gr',
    icon: 'pen',
    title: 'Advanced Grammar',
    desc: 'Conditionals, passives, reported speech and emphatic structures.',
    lessons: [
      {
        id: 'gr-1',
        title: 'Conditionals',
        guide: {
          summary: 'Real, unreal and mixed "if" sentences, plus inversion.',
          intro:
            'Conditionals describe a situation and its result. Choose the type by asking: is it real or imaginary, and is it about the present, the future or the past? At B2 level you should also use mixed conditionals and a few formal alternatives to "if".',
          points: [
            { term: 'Second conditional', text: 'An imaginary or unlikely situation in the present or future. Use if + past simple, would + verb.', example: 'If I won the lottery, I would travel the world.' },
            { term: 'Third conditional', text: 'An imaginary situation in the past, usually a regret. Use if + past perfect, would have + past participle.', example: 'If she had left earlier, she would have caught the train.' },
            { term: 'Mixed conditional', text: 'A past action with a present result. Use if + past perfect, would + verb.', example: 'If I had studied harder, I would have a better job now.' },
            { term: 'Unless and inversion', text: 'Unless means "if not". For a formal style, invert the verb: Should you need help... / Had I known...', example: 'Should you need any help, please call me.' },
          ],
        },
        questions: [
          fill('If I ___ harder at school, I would have a better job now.', 'had studied', ['studied', 'would study', 'have studied'], 'This is a mixed conditional: the cause is in the past (had studied) and the result is in the present (would have). Use it when a past choice affects your life today.'),
          fill("If she hadn't missed the train, she ___ on time.", 'would have arrived', ['would arrive', 'will arrive', 'had arrived'], 'This is the third conditional. Use if + past perfect and would have + past participle to talk about a past situation that cannot change.'),
          fill('___ you need any help, please let me know.', 'Should', ['Would', 'Might', 'Did'], '"Should you need" means "If you need". Inverting the verb is a polite, formal way to start a conditional, common in emails and business letters.'),
          fill("Unless it ___ tomorrow, we'll go to the beach.", 'rains', ['will rain', 'rained', 'would rain'], 'Unless means "if not". After unless, use the present simple, even when you talk about the future, just as you do after if.'),
          fill('If it ___ for your help, I would never have finished.', "hadn't been", ["wasn't", "weren't", "hasn't been"], '"If it hadn\'t been for..." means "without". Use it to thank someone: "If it hadn\'t been for you, I would have failed."'),
          fill('Supposing you ___ the chance, would you live abroad?', 'had', ['have', 'would have', 'having'], 'Supposing works like if. For an imaginary question about the present, use the past simple after it.'),
          fill("I'd rather you ___ smoke in here.", "didn't", ["don't", "won't", "wouldn't"], 'After "would rather" + another person, use the past simple even though you mean now. Use it to say what you prefer someone to do.'),
          ord('If I were you I would apologise', 'Give advice using the second conditional.', '"If I were you, I would..." is the standard way to give advice. Many speakers use "were" for every person in this pattern.'),
        ],
      },
      {
        id: 'gr-2',
        title: 'Passive and causative',
        guide: {
          summary: 'When the action matters more than who did it.',
          intro:
            'Use the passive when the action or the result is more important than the person who did it, or when you do not know who did it. It is very common in news, reports and formal writing. The causative (have/get something done) is used when you arrange for someone else to do a service for you.',
          points: [
            { term: 'Passive', text: 'be + past participle. The object of the action becomes the subject.', example: 'The bridge was destroyed by a storm.' },
            { term: 'Modal and future passive', text: 'Add the modal or will before be + past participle.', example: 'The law will be introduced next year.' },
            { term: 'Causative', text: 'have / get + object + past participle. The subject does not do the job; someone else does.', example: 'I had my car repaired.' },
            { term: 'It is said that...', text: 'is said / thought / believed + to-infinitive is a neutral way to report general opinion.', example: 'She is said to be the richest woman in the country.' },
          ],
        },
        questions: [
          fill('The bridge ___ by a storm last night.', 'was destroyed', ['destroyed', 'has destroyed', 'was destroying'], 'The bridge receives the action, so use the passive: was/were + past participle. We use the passive when the result matters more than the cause.'),
          fill('I had my car ___ yesterday.', 'repaired', ['repair', 'repairing', 'to repair'], 'Have + object + past participle means someone else did the work for you. Use it for services such as haircuts, repairs and deliveries.'),
          fill('She is said ___ the richest woman in the country.', 'to be', ['being', 'be', 'to being'], 'Is said / thought / believed + to-infinitive reports what people in general think. It is common in news and formal writing.'),
          fill('The new law ___ next year.', 'will be introduced', ['will introduce', 'will be introducing', 'has introduced'], 'A law cannot introduce itself, so we need the future passive: will be + past participle. News and official texts use it a lot.'),
          fill('He got his hair ___ before the wedding.', 'cut', ['cutting', 'to cut', 'cuts'], 'Get + object + past participle is the informal version of have something done. Use it in everyday speech.'),
          fill('The report ___ by the time we arrive.', 'will have been finished', ['will finish', 'will be finishing', 'has finished'], 'The future perfect passive (will have been + past participle) says that something will be completed before a future moment.'),
          fill('Nobody likes ___ to wait.', 'being made', ['making', 'to be made', 'made'], 'After like, use -ing. The passive -ing form is being + past participle. "Being made to wait" means that someone forces you to wait.'),
          ord('The documents had to be signed', 'Say that people were required to sign the documents.', 'The modal passive is modal + be + past participle. Use it for rules and obligations when who does it is not important.'),
        ],
      },
      {
        id: 'gr-3',
        title: 'Reported speech',
        guide: {
          summary: 'Report what someone said, asked or promised.',
          intro:
            'Reported speech tells another person what someone said. Usually the tense moves one step back (backshift): will becomes would, present becomes past. Questions lose their question word order. Many reporting verbs, such as admit, deny, suggest and promise, are followed by a special pattern.',
          points: [
            { term: 'Backshift', text: 'Move the tense one step back and change time words (tomorrow becomes the next day).', example: '"I will call you tomorrow." -> She said she would call me the next day.' },
            { term: 'Reported questions', text: 'Use normal statement word order, without do/does/did.', example: 'He asked me where I lived.' },
            { term: '-ing patterns', text: 'admit, deny and suggest are followed by -ing.', example: 'He denied stealing the money.' },
            { term: 'to-infinitive patterns', text: 'promise, agree, refuse and tell someone + (not) to are followed by to + verb.', example: 'They promised to call us.' },
          ],
        },
        questions: [
          fill('"I will call you tomorrow," she said. She said she ___ me the next day.', 'would call', ['will call', 'calls', 'calling'], 'In reported speech, will usually changes to would. Use this when you tell someone about a promise or plan from the past.'),
          fill('"Where do you live?" he asked me. He asked me where I ___.', 'lived', ['did live', 'do live', 'am living'], 'A reported question uses statement word order and the tense goes back one step. There is no "do/did" in the report.'),
          fill('"Don\'t touch that!" she told the boy. She told the boy ___ that.', 'not to touch', ['not touching', "to don't touch", 'no touch'], 'To report an order, use tell + person + (not) to-infinitive. It is common for instructions and warnings.'),
          fill('He admitted ___ the window.', 'breaking', ['to break', 'break', 'to breaking'], 'Admit is followed by the -ing form. Use admit + -ing when someone confesses to an action.'),
          fill('She suggested ___ to the cinema.', 'going', ['to go', 'go', 'we to go'], 'Suggest is followed by -ing (or by "that + subject + should"). We do not say "suggest to go".'),
          fill('They promised ___ us as soon as they arrived.', 'to call', ['calling', 'call', 'that call'], 'Promise is followed by a to-infinitive. Verbs of plan and intention (promise, agree, refuse, offer) use to + verb.'),
          fill('He denied ___ the money.', 'stealing', ['to steal', 'steal', 'stole'], 'Deny is followed by -ing. Use it when someone says "I did not do it": "She denied lying."'),
          ord('She asked me whether I had finished', 'Report a yes/no question.', 'Use if or whether to report a yes/no question, then use normal statement order. Here "had finished" is the backshift of "have finished".'),
        ],
      },
      {
        id: 'gr-4',
        title: 'Wishes and emphasis',
        guide: {
          summary: 'Express regret, annoyance and strong emphasis.',
          intro:
            'Advanced speakers use special structures to show feeling. We use wish and if only to talk about regrets and annoying habits. Negative adverbs at the start of a sentence (Never, Rarely, Not only, Hardly) cause inversion and give a formal, emphatic style. Cleft sentences (What I need is... / It was... that...) put focus on the most important part.',
          points: [
            { term: 'wish + past perfect', text: 'A regret about the past.', example: 'I wish I had studied more.' },
            { term: 'if only + would', text: 'Annoyance about someone\'s behaviour, or a wish for change.', example: 'If only he would listen to me!' },
            { term: 'Negative inversion', text: 'Negative adverb + auxiliary + subject. Common in formal writing and speeches.', example: 'Never have I seen such a beautiful sunset.' },
            { term: 'Cleft sentences', text: 'What I need is... and It was X that... highlight the key information.', example: 'What I need is a long holiday.' },
          ],
        },
        questions: [
          fill('I wish I ___ more time last year.', 'had had', ['have', 'had', 'would have'], 'Wish + past perfect expresses a regret about the past. Use it when you wish a past situation had been different.'),
          fill('If only he ___ listen to me!', 'would', ['will', 'had', 'can'], 'If only + would shows annoyance about someone\'s behaviour or a wish for it to change. It is stronger than "wish".'),
          fill('Never ___ such a beautiful sunset.', 'have I seen', ['I have seen', 'I saw', 'seen I'], 'When a negative adverb like never starts the sentence, the auxiliary comes before the subject. It sounds formal and dramatic.'),
          fill('Not only ___ late, but he also forgot the documents.', 'did he arrive', ['he arrived', 'arrived he', 'he did arrive'], 'Not only at the beginning needs inversion: Not only + auxiliary + subject. Use it to add a second, surprising fact.'),
          fill('Hardly ___ the door when the phone rang.', 'had she opened', ['she had opened', 'did she open', 'she opened'], 'Hardly + had + subject + past participle ... when describes one event that happened immediately after another.'),
          fill('What I need ___ a long holiday.', 'is', ['are', 'be', 'being'], 'A cleft sentence with "What I need is..." focuses attention on the key thing. The verb "is" matches the singular "what" clause.'),
          fill('It was in Paris ___ they first met.', 'that', ['what', 'which', 'when'], '"It was ... that ..." emphasises one part of the sentence, here the place. Use it when you want to correct or highlight information.'),
          ord('Rarely do we see such talent', 'Use negative inversion for emphasis.', 'Rarely + auxiliary + subject is a formal pattern. It makes the statement stronger and more impressive.'),
        ],
      },
    ],
  },

  {
    id: 'rd',
    icon: 'book',
    title: 'Reading & Cloze',
    desc: 'Short texts, inference questions and gap-fills.',
    lessons: [
      {
        id: 'rd-1',
        title: 'Reading for meaning',
        guide: {
          summary: 'Find the main idea, infer meaning and avoid distractors.',
          intro:
            'Good readers do more than understand words. They find the main idea, notice what the writer suggests but does not say directly (inference), and avoid answers that sound right but are not in the text. Read the text once for the general idea, then read the question carefully and look for the exact sentence that answers it.',
          points: [
            { term: 'Main idea', text: 'The point that the whole text supports. It is bigger than any single detail.', example: 'Ask: what is the writer trying to tell me?' },
            { term: 'Inference', text: 'Words such as "suggests" or "can be inferred" mean you must read between the lines.', example: '"permanently on call" suggests people cannot relax.' },
            { term: 'Distractors', text: 'Wrong answers often use words from the text, but change the meaning or add information that is not there.', example: 'Check every key word against the text.' },
          ],
        },
        questions: [
          read(REMOTE, "What is the writer's main point?", 'Remote work has benefits and drawbacks, and hybrid models are being tried.', ['Remote work has been abandoned by most companies.', 'Commuting is the biggest problem in modern work.', 'Critics have proved that remote work does not work.'], 'The text gives both sides (supporters and critics) and ends with hybrid models. A good main-idea answer covers the whole text, not just one detail.'),
          read(REMOTE, 'The phrase "permanently on call" suggests that some people ___.', 'feel they can never fully switch off from work', ['are paid extra for emergencies', 'receive too many calls from family', 'work only at night'], '"On call" means always ready to work, like a doctor on duty. "Permanently" shows there is no real break. This is an inference question: the writer implies it without saying it directly.'),
          read(REMOTE, 'What do many companies hope hybrid models will achieve?', 'Combine the advantages of the office and of home', ['Reduce salaries', 'End remote work completely', 'Increase commuting'], '"The best of both worlds" is the clue: it means getting the advantages of two different options together.'),
          read(SLEEP, 'According to the text, what happens during deep sleep?', 'The brain removes waste and organises memories.', ['The body stops producing waste.', 'The immune system is switched off.', 'The brain stops all activity.'], 'Find the sentence about deep sleep: the brain clears away waste products and memories are sorted and stored. The other options are not mentioned.'),
          read(SLEEP, 'What can be inferred about people who regularly sleep under six hours?', 'They face higher risks to concentration and health.', ['They have better memories.', 'They always catch up on sleep at weekends.', 'They are never ill.'], 'The text says they are more likely to struggle with concentration and catch infections. You can infer that short sleep is risky for health.'),
          read(SLEEP, 'What does the writer say about sleeping more than nine hours?', 'There is no clear evidence of extra benefits.', ['It is dangerous.', 'It improves memory.', 'It is recommended for everybody.'], '"Little evidence ... brings extra benefits" means that studies have not shown additional advantages. The text does not say it is harmful.'),
        ],
      },
      {
        id: 'rd-2',
        title: 'Cloze and inference',
        guide: {
          summary: 'Choose the best word for a gap using grammar and meaning.',
          intro:
            'In a cloze test, words are missing from a text and you choose the best one. Do not look at the options first. Read the whole sentence, decide what kind of word is needed (noun, verb, adjective, adverb), and check the words around the gap for a fixed collocation. Then test each option.',
          points: [
            { term: 'Part of speech', text: 'After "the" or "a" you usually need a noun. Before a noun you need an adjective.', example: 'worth the (inconvenience)' },
            { term: 'Collocation', text: 'Some words only work with certain partners, such as announce + plans.', example: 'The council announced plans.' },
            { term: 'Similar words', text: 'Watch for confusing pairs such as affect (verb) and effect (noun).', example: 'It will affect their business.' },
          ],
        },
        questions: [
          gap(COUNCIL, 1, 'announced', ['advertised', 'informed', 'persuaded'], 'Announce plans means to make them public officially. Advertise is for products, inform needs a person ("informed us"), and persuade needs a person and a reason.'),
          gap(COUNCIL, 2, 'welcome', ['enjoy', 'admit', 'suit'], 'Welcome an idea means to be pleased about it. "Although many residents welcome the idea" contrasts with the shop owners\' fears in the next clause.'),
          gap(COUNCIL, 3, 'affect', ['effect', 'infect', 'reflect'], 'After "will" we need a verb. Affect is the verb (to influence). Effect is usually a noun: "an effect on business".'),
          gap(COUNCIL, 4, 'inconvenience', ['inconvenient', 'inconveniently', 'convenience'], 'After "the" we need a noun. Inconvenience is the noun and also fits the meaning: cleaner air is worth some trouble.'),
          read(TOURISM, 'What is the main idea of the text?', "Popular destinations struggle to balance tourism's benefits and costs.", ['Tourists are unwelcome everywhere.', 'Cities have solved the problem.', 'Rents are falling in tourist areas.'], 'The text lists costs for residents (rents, crowds, noise) and benefits for businesses (income). The main idea covers both sides.'),
          read(TOURISM, 'Critics believe that limits and daily fees ___.', 'do not address the underlying causes', ['are too expensive for cities', 'work perfectly', 'upset businesses more than tourists'], '"Only treat the symptoms" is a metaphor from medicine: the measures reduce the visible problem but do not fix the real cause.'),
        ],
      },
    ],
  },

  {
    id: 'wc',
    icon: 'scale',
    title: 'Word Choice & Register',
    desc: 'Confusing word pairs, formal and informal English, word formation.',
    lessons: [
      {
        id: 'wc-1',
        title: 'Easily confused words',
        guide: {
          summary: 'Pairs like affect/effect and advice/advise.',
          intro:
            'Some English words look or sound alike but have different meanings or different parts of speech. Many B2 mistakes come from these pairs. A useful habit is to ask: do I need a noun or a verb? Then check the meaning.',
          points: [
            { term: 'affect / effect', text: 'Affect is a verb (to influence). Effect is usually a noun (a result).', example: 'Stress affects health. Stress has an effect on health.' },
            { term: 'advice / advise', text: 'Advice is an uncountable noun. Advise is a verb.', example: 'She gave me good advice. She advised me to wait.' },
            { term: 'economic / economical', text: 'Economic relates to the economy. Economical means cheap to use.', example: 'an economic crisis; an economical car' },
            { term: 'lose / loose', text: 'Lose is a verb (not keep). Loose is an adjective (not tight).', example: "Don't lose your keys. These trousers are loose." },
          ],
        },
        questions: [
          fill('Stress can have a harmful ___ on your health.', 'effect', ['affect', 'infect', 'defect'], 'After "a harmful" we need a noun, so use effect. Affect is a verb: "Stress can affect your health."'),
          fill('I need some ___ about courses abroad.', 'advice', ['advise', 'advices', 'advises'], 'Advice is a noun and it is uncountable, so it has no plural and no "a". The verb is advise, pronounced with a "z" sound.'),
          fill('Buying in bulk is more ___ than buying single items.', 'economical', ['economic', 'economy', 'economics'], 'Economical means saving money. Economic describes the economy of a country, as in "economic growth".'),
          fill('She ___ the book on the table and left.', 'laid', ['lay', 'lain', 'lied'], 'Lay means to put something down and needs an object (the book). Its past form is laid. Lie, lay, lain means to be in a flat position, and it has no object.'),
          fill("He's very ___ about his weight, so don't mention it.", 'sensitive', ['sensible', 'sensual', 'sensory'], 'Sensitive means easily upset or offended. Sensible means practical and reasonable. These are false friends for many learners.'),
          fill('Honesty is a basic ___ of our company.', 'principle', ['principal', 'principals', 'principally'], 'A principle is a rule or belief that guides behaviour. Principal means main (the principal reason) or the head of a school.'),
          fill("Don't ___ your passport at the airport!", 'lose', ['loose', 'loss', 'lost'], 'After "don\'t" we need a base verb, so use lose. Loose has a different meaning: not tight.'),
          ord('Stress can affect your health', 'Say that stress influences your health.', 'Affect is a verb and is followed directly by an object: "affect your health", not "affect on your health".'),
        ],
      },
      {
        id: 'wc-2',
        title: 'Formal and informal',
        guide: {
          summary: 'Match your language to the situation and reader.',
          intro:
            'Register means the level of formality. Use formal English for official emails, job applications and people you do not know. Use informal English for friends, family and quick messages. Choosing the right register shows respect and makes you sound natural. Formal language uses longer, more precise words and polite structures. Informal language uses contractions, phrasal verbs and slang.',
          points: [
            { term: 'Formal clues', text: 'Dear Sir or Madam, would be grateful, regret to inform, obtain, ascertain.', example: 'I would be grateful if you could confirm receipt.' },
            { term: 'Informal clues', text: 'Contractions, phrasal verbs, slang and short sentences.', example: "I'm absolutely knackered." },
            { term: 'Neutral', text: 'Most everyday English is neutral and safe in almost every situation.', example: 'I am very tired.' },
          ],
        },
        questions: [
          choose('qFormal', 'Dear Sir or Madam,', ['Hey there,', 'Hi mate,', 'Yo,'], 'Use "Dear Sir or Madam," when you write a formal email or letter to someone whose name you do not know. The other options are too casual.'),
          choose('qFormal', 'ascertain', ['dig up', 'check out', 'figure out'], 'Ascertain means to find out or make sure. It is a formal verb from Latin. The other choices are informal phrasal verbs.'),
          choose('qFormal', 'obtain', ['grab', 'nab', 'pick up'], 'Obtain is the formal word for get. Use it in reports, applications and official emails.'),
          choose('qFormal', 'I would be grateful if you could confirm receipt.', ['Send me a quick reply, will you?', 'Just let me know ASAP.', 'Drop me a line when you get it.'], '"I would be grateful if you could..." is a very polite, formal request. The other sentences are casual or sound like orders.'),
          choose('qFormal', 'We regret to inform you that your application was unsuccessful.', ["Sorry, but you didn't get the job.", 'Bad news, your application is a no-go.', 'Tough luck on the application.'], '"We regret to inform you" is the standard formal way to give bad news. It sounds respectful and impersonal.'),
          choose('qInformal', "I'm absolutely knackered.", ['I am exceedingly fatigued.', 'I feel rather tired.', 'I am somewhat exhausted.'], 'Knackered is informal British slang for very tired. You can use it with friends but not in a formal email.'),
          choose('qInformal', 'Can you give me a hand with this?', ['Would you be able to assist me with this matter?', 'I would appreciate your assistance.', 'Could you kindly help me with this?'], '"Give me a hand" means "help me" and is an informal, friendly request. The other options are formal.'),
          ord('I would be grateful for your advice', 'Write a polite, formal request.', '"I would be grateful for..." is a polite phrase for formal emails. It sounds more respectful than "I want your advice".'),
        ],
      },
      {
        id: 'wc-3',
        title: 'Word formation',
        guide: {
          summary: 'Turn one base word into the noun, adjective or adverb you need.',
          intro:
            'One base word can form many related words with suffixes and prefixes. To choose the right form, first decide the part of speech the gap needs, then add the correct ending. This is a very common exam task and a great way to build vocabulary quickly.',
          points: [
            { term: 'Noun endings', text: '-tion, -ment, -ness, -ity, -ance/-ence.', example: 'innovate -> innovation, reliable -> reliability' },
            { term: 'Adjective endings', text: '-ful, -ive, -ous, -able, -ing/-ed.', example: 'create -> creative, benefit -> beneficial' },
            { term: 'Adverbs and prefixes', text: 'Add -ly to make an adverb. The prefix im-/in-/un-/dis- makes a negative.', example: 'confident -> confidently, possible -> impossible' },
            { term: 'Clues in the sentence', text: 'After the/a/great -> noun. Before a noun -> adjective. Describing a verb -> adverb.', example: 'great innovation (noun)' },
          ],
        },
        questions: [
          fill('The company showed great ___ (innovate) in developing the product.', 'innovation', ['innovative', 'innovatively', 'innovator'], 'After "great" we need a noun, so add -tion to innovate: innovation. Innovative is an adjective and innovator is a person.'),
          fill('Her ___ (reliable) is the reason she was promoted.', 'reliability', ['reliable', 'reliably', 'reliance'], 'After "her" we need a noun. The noun form of reliable ends in -ity: reliability means being someone you can depend on.'),
          fill('The results were ___ (disappoint), so we repeated the test.', 'disappointing', ['disappointed', 'disappointment', 'disappointingly'], 'Use -ing to describe the thing that causes the feeling (the results). Use -ed to describe the person who feels it: "I was disappointed."'),
          fill('He spoke ___ (confident) in front of the audience.', 'confidently', ['confident', 'confidence', 'confide'], 'The word describes how he spoke, so we need an adverb: confidently. Adverbs of manner usually end in -ly.'),
          fill('The ___ (significant) of this discovery is huge.', 'significance', ['significant', 'significantly', 'signify'], 'After "the" we need a noun. The noun of significant is significance. Do not confuse it with the verb signify.'),
          fill('It is ___ (possible) to finish by tomorrow.', 'impossible', ['unpossible', 'inpossible', 'dispossible'], 'To make a negative, possible takes the prefix im- (impossible). Words that start with p, b or m usually take im-.'),
          fill('The new law is ___ (benefit) to small businesses.', 'beneficial', ['benefit', 'benefiting', 'beneficiary'], 'After "is" we need an adjective, so use beneficial. A beneficiary is a person who receives a benefit.'),
          fill('She is a very ___ (create) person.', 'creative', ['creation', 'creatively', 'creator'], 'Before the noun "person" we need an adjective: creative. Creator is a noun and creation is the thing you make.'),
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
