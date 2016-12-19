/** Spanish - es */
jDx.addLang('es', {
  masks:{
    'default':      "ddd d-mmm-yyyy H:MM:ss",
    shortDate:      "dd/mm/yyyy",
    mediumDate:     "d-mmm-yyyy",
    longDate:       "d 'de' mmmm 'de' yyyy",
    fullDate:       "dddd d 'de' mmmm 'de' yyyy",
    shortTime:      "H:MM",
    mediumTime:     "H:MM:ss",
    longTime:       "H:MM:ss Z",
  },
  dayNames: [
    "Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab",
    "Domingo", "Lunes", "Martes", "Miercoles",
    "Jueves", "Viernes", "Sabado",
    "do", "lu", "ma", "me", "ju", "vi", "sá"
  ],
  monthNames: [
    "I", "II", "III", "IV", "V", "VI",
    "VII", "VIII", "IX", "X", "XI", "XII",
    "enero", "febrero", "marzo", "abril",
    "mayo", "junio", "julio", "augusto",
    "septiembre", "octubre", "noviembre", "diciembre"
  ],
  relativeTime : {
      future : 'en %s',
      past : 'hace %s',
      seconds : 'unos segundos',
      minute : 'un minuto',
      minutes : '%d minutos',
      hour : 'una hora',
      hours : '%d horas',
      day : 'un día',
      days : '%d días',
      month : 'un mes',
      months : '%d meses',
      year : 'un año',
      years : '%d años'
  },
  ordinal: {
    parse: '°',
    format: '°',
  },
  dayOf: { week:1, year:4 },
});