/** French - fr */
jDx.addLang('fr', {
  masks:{
    'default':      "ddd d mmm yyyy HH:MM:ss",
    shortDate:      "d/m/yy",
    mediumDate:     "d mmm yyyy",
    longDate:       "d mmmm yyyy",
    fullDate:       "dddd d mmmm yyyy",
    shortTime:      "HH:MM",
    mediumTime:     "HH:MM:ss",
    longTime:       "HH:MM:ss Z",
  },
  dayNames: [
    "Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam",
    "Dimanche", "Lundi", "Mardi", "Mercredi",
    "Jeudi", "Vendredi", "Samedi",
    "Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"
  ],
  monthNames: [
    "Janv", "Févr", "Mars", "Avr", "Mai", "Juin",
    "Juil", "Août", "Sept", "Oct", "Nov", "Déc",
    "Janvier", "Février", "Mars", "Avril",
    "Mai", "Juin", "Juillet", "Août",
    "Septembre", "Octobre", "Novembre", "Décembre"
  ],
  relative: {
    future : "dans %s",
    past : "il y a %s",
    seconds : "quelques secondes",
    minute : "une minute",
    minutes : "%d minutes",
    hour : "une heure",
    hours : "%d heures",
    day : "un jour",
    days : "%d jours",
    month : "un mois",
    months : "%d mois",
    year : "une année",
    years : "%d années"
  },
  ordinal: {
    parse: 'er|ème',
    format: function (n) { return n === 1 ? 'er' : 'ème'; }
  },
  meridiem: { am:'PD', pm:'MD' },
  dayOf: { week:1, year:4 },
});