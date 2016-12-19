/** Belarusian - be */
jDx.addLang('be', {
  masks:{
    'default':      "ddd, d mmm yyyy г., HH:MM:ss",
    shortDate:      "dd.mm.yyyy",
    mediumDate:     "d mmm yyyy г.",
    longDate:       "d mmmm yyyy г.",
    fullDate:       "dddd, d mmmm yyyy г.",
    shortTime:      "HH:MM",
    mediumTime:     "HH:MM:ss",
    longTime:       "HH:MM:ss Z",
  },
  dayNames: [
    "нд", "пн", "ат", "ср", "чц", "пт", "сб", 
    "нядзелю", "панядзелак", "аўторак", "сераду", 
    "чацвер", "пятніцу", "суботу", 
    "нд", "пн", "ат", "ср", "чц", "пт", "сб", 
  ],
  monthNames: [
  "студ", "лют", "сак", "крас", "трав", "чэрв", 
  "ліп", "жнів", "вер", "каст", "ліст", "снеж", 

  "студзеня", "лютага", "сакавіка", "красавіка", 
  "траўня", "чэрвеня", "ліпеня", "жніўня", 
  "верасня", "кастрычніка", "лістапада", "снежня",
  ],
  relative: {
    future : 'праз %s',
    past : '%s таму',
    seconds : "некалькі секунд",
    // minute : "",
    // minutes : "%d",
    // hour : "",
    // hours : "%d",
    day : "дзень",
    // days : "%d",
    month : "месяц",
    // months : "%d",
    year : "год",
    // years : "%d"
  },
  ordinal: {
    parse: '-га',
    format: function (n) { return '-га'; }
  },
  // meridiem: { am:'vm', pm:'nm' },   <4 ночы ; <12 раніцы ; <17 дня ; вечара
  dayOf: { week:1, year:7 },
});

