/** Breton - br */
jDx.addLang('br', {
  masks:{
    'default':      "ddd, d 'a viz' mmm yyyy, TT H:MM:ss",
    shortDate:      "dd/mm/yyyy",
    mediumDate:     "d 'a viz' mmm yyyy",
    longDate:       "d 'a viz' mmmm yyyy",
    fullDate:       "dddd, d 'a viz' mmmm yyyy",
    shortTime:      "H'e'MM TT",
    mediumTime:     "H'e'MM:ss TT",
    longTime:       "H'e'MM:ss TT Z",
  },
  dayNames: [
    "Sul", "Lun", "Meu", "Mer", "Yao", "Gwe", "Sad", 
    "Sul", "Lun", "Meurzh", "Merc'her", "Yaou", "Gwener", "Sadorn", 
    "Su", "Lu", "Me", "Mer", "Ya", "Gw", "Sa", 
  ],
  monthNames: [
    "Gen", "C'hwe", "Meu", "Ebr", "Mae", "Eve", 
    "Gou", "Eos", "Gwe", "Her", "Du", "Ker", 
    "Genver", "C'hwevrer", "Meurzh", "Ebrel", "Mae", "Mezheven", 
    "Gouere", "Eost", "Gwengolo", "Here", "Du", "Kerzu", 
  ],
  relative: {
    future : 'a-benn %s',
    past : '%s \'zo',
    seconds : 'un nebeud segondennoù',
    minute : 'ur vunutenn',
    minutes : function(n) { return n + (n === 2 ? ' vmunutenn' : ' munutenn'); },
    hour : 'un eur',
    hours : '%d eur',
    day : 'un devezh',
    days : function(n) { return n + (n === 2 ? ' zdevezh' : ' devezh'); },
    month : 'ur miz',
    months : function(n) { return n + (n === 2 ? ' vmiz' : ' miz'); },
    year : 'ur bloaz',
    years : function(n) {
      switch (n % 10) {
        case 1:
        case 3:
        case 4:
        case 5:
        case 9:
          return n + ' bloaz';
        default:
          return n + ' vmiz';
      };
    }, 
  },
  ordinal: {
    parse: 'añ|vet',
    format: function (n) { return n === 1 ? 'añ' : 'vet'; }
  },
  dayOf: { week:1, year:4 },
});


