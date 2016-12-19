/** Bengali - bn */
var formatMap_bn = { 
  '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫',
  '6': '৬', '7': '৭', '8': '৮', '9': '৯', '0': '০'
};
var parseMap_bn = {
    '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': 
    '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9', '০': '0'
};

jDx.addLang('bn', {
  masks:{
    'default':      "ddd, d mmm yyyy, TT H:MM:ss সময়",
    shortDate:      "dd/mm/yyyy",
    mediumDate:     "d mmm yyyy",
    longDate:       "d mmmm yyyy",
    fullDate:       "dddd, d mmmm yyyy",
    shortTime:      "TT H:MM সময়",
    mediumTime:     "TT H:MM:ss সময়",
    longTime:       "TT H:MM:ss সময় Z",
  },
  dayNames: [
    "রবি", "সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি", 
    "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", 
    "বৃহস্পতিবার", "শুক্রবার", "শনিবার", 
    "রবি", "সোম", "মঙ্গ", "বুধ", "বৃহঃ", "শুক্র", "শনি", 
  ],
  monthNames: [
    "জানু", "ফেব", "মার্চ", "এপ্র", "মে", "জুন", 
    "জুল", "আগ", "সেপ্ট", "অক্টো", "নভে", "ডিসে", 
    "জানুয়ারী", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", 
    "মে", "জুন", "জুলাই", "আগস্ট", 
    "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর", 
  ],
  relative: {
    future : '%s পরে',
    past : '%s আগে',
    seconds : 'কয়েক সেকেন্ড',
    minute : 'এক মিনিট',
    minutes : '%d মিনিট',
    hour : 'এক ঘন্টা',
    hours : '%d ঘন্টা',
    day : 'এক দিন',
    days : '%d দিন',
    month : 'এক মাস',
    months : '%d মাস',
    year : 'এক বছর',
    years : '%d বছর'
  },
  // meridiem: { }, <4 রাত ; <10 সকাল ; <17 দুপুর ; <20 বিকাল ; রাত
  dayOf: { week:0, year:6 },
  preparse: function (string) {
      return string.replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
          return parseMap_bn[match];
      });
  },
  postformat: function (string) {
      return string.replace(/\d/g, function (match) {
          return formatMap_bn[match];
      });
  },
});
