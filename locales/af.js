/** Afrikaans - af */
jDx.addLang('af', {
  masks:{
    'default':      "ddd, d mmm yyyy HH:MM:ss",
    shortDate:      "dd/mm/yy",
    mediumDate:     "d mmm yyyy",
    longDate:       "d mmmm yyyy",
    fullDate:       "dddd, d mmmm yyyy",
    shortTime:      "HH:MM",
    mediumTime:     "HH:MM:ss",
    longTime:       "HH:MM:ss Z",
  },
  dayNames: [
    "Son", "Maa", "Din", "Woe", "Don", "Vry", "Sat",
    "Sondag", "Maandag", "Dinsdag", "Woensdag", 
    "Donderdag", "Vrydag", "Saterdag",
    "So", "Ma", "Di", "Wo", "Do", "Vr", "Sa",
  ],
  monthNames: [
    "Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", 
    "Jul", "Aug", "Sep", "Okt", "Nov", "Des",
    "Januarie", "Februarie", "Maart", "April", "Mei", "Junie", 
    "Julie", "Augustus", "September", "Oktober", "November", "Desember",
  ],
  relative: {
    future : "oor %s",
    past : "%s gelede",
    seconds : "'n paar sekondes",
    minute : "'n minuut",
    minutes : "%d minute",
    hour : "'n uur",
    hours : "%d ure",
    day : "'n dag",
    days : "%d dae",
    month : "'n maand",
    months : "%d maande",
    year : "'n jaar",
    years : "%d jaar"
  },
  ordinal: {
    parse: 'ste|de',
    format: function (n) { return n === 1 || n === 8 || n >= 20 ? 'ste' : 'de'; }
  },
  meridiem: { am:'vm', pm:'nm' },
  dayOf: { week:1, year:4 },
});