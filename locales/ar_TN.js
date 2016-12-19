/** Arabic (Tunisia) - ar_TN */
jDx.addLang('ar_TN', {
  dir: 'rtl',
  masks:{
    'default':      "ddd d mmm yyyy HH:MM:ss",
    shortDate:      "dd/mm/yy",
    mediumDate:     "d mmm yyyy",
    longDate:       "d mmmm yyyy",
    fullDate:       "dddd d mmmm yyyy",
    shortTime:      "HH:MM",
    mediumTime:     "HH:MM:ss",
    longTime:       "HH:MM:ss Z",
  },
  dayNames: [
    "أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت", 
    "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", 
    "ح", "ن", "ث", "ر", "خ", "ج", "س", 
  ],
  monthNames: [
    "جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", 
    "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر", 
    "جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", 
    "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
  ],
  relative: {
    future: 'في %s',
    past: 'منذ %s',
    seconds: 'ثوان',
    minute: 'دقيقة',
    minutes: '%d دقائق',
    hour: 'ساعة',
    hours: '%d ساعات',
    day: 'يوم',
    days: '%d أيام',
    month: 'شهر',
    months: '%d أشهر',
    year: 'سنة',
    years: '%d سنوات'
  },
  dayOf: { week:1, year:4 },
});

