
var jDx = jDx || require('../jdx.js'),
    niut = niut || require ('niut'),
    suite = niut.newSuite('Validator');

var timezones = [ 'locale' ];
if (process.env.TZ) {
  timezones = [
    process.env.TZ,
    'Africa/Abidjan',
    'Europe/Amsterdam',
    'Europe/Paris',
    'Asia/Bangkok',
    'Australia/Sydney',
    'Europe/London',
  ];
}

var langs = ['en', 'fr', 'es'];

var DateWithTime = function (time) {
  var dt = new Date();
  dt.setTime(time);
  return dt;
}

var dates = [
  new Date(),
  // DateWithTime(1),
  // new Date(2012, 09, 12, 12, 12, 12), // Some error linked to summer/winter time.
  // new Date(1815, 06, 18, 12, 30, 02),
];


/* List basic tests */
var formatTests = {
  'default':true,
  'shortDate':{prc:1000*3600*24},
  'sortableDate':{prc:1000*3600*24},
  'mediumDate':{prc:1000*3600*24},
  'longDate':{prc:1000*3600*24},
  'fullDate':{prc:1000*3600*24},
  'shortTime':{prc:1000*60,mod:60*24},
  'mediumTime':{prc:1000,mod:3600*24},
  'longTime':{prc:1000,mod:3600*24},
  'isoDate':{prc:1000*3600*24},
  'isoTime':true,
  'isoDateTime':true,
  'isoUtcDateTime':true,
  'HH:MM Z':{prc:1000*60,mod:60*24,md:true},
};

var verbose = process.env.JDX_VERBOSE;

var doTest = function (date, test, assert) {
  var info = formatTests[test], status;
  if (info === true) {
    info = {
      prc:1000
    };
  }
  var res, org, exd, a, 
      b = parseInt(date.getTime() / info.prc);
  if (info.mod) {
    b = b % info.mod;
  }

  res = jDx.formatDate(date, test);
  org = info.md ? jDx.parseDate(res, test) : jDx.parseDate(res);
  if (isNaN(org)) {
    console.warn("Can't parse :'" + res + "', retry...");
    org = jDx.parseDate(res, test);
  }
  exd = jDx.formatDate(org, 'isoUtcDateTime');
  a = !isNaN(org) ? parseInt(org.getTime() / info.prc) : 0;
  if (info.mod) {
    a = a % info.mod;
  }
  if (a === b) {
    if (verbose) console.log (' - ' + test + ': ' + res + ' -> OK');
  } else {
    if (verbose) console.log (' - ' + test + ': ' + res + ' -> FAIL ('+ exd+')');
    assert.fails('Expected "' + res + '", got: "' + exd + '".');
  }
  // $('#test_format').append(UT.toHtml(test, status, res, exd));
};

var testSuite = function (date, tz, lang) {
  return function (assert, done) {
    process.env.TZ = tz;
    if (verbose) console.log (tz, new Date().getTimezoneOffset());
    jDx.setLang(lang);
    for (var test in formatTests) {
      doTest(date, test, assert);
    }
    done();
  };
}


suite.test('# UTC / GMT+0 issue', function (assert, done) {

  var date = jDx.parseDate('3:41:06 PM GMT+0000');
  assert.isFalse(isNaN(date));

  done();
});

for (var t in timezones) {
  for (var d in dates) {
    for (var l in langs) {
      var lang = langs[l];
      var tz = timezones[t];
      var dt = dates[d]
      suite.test('#'+jDx.formatDate(dt) + ', lg='+lang+', tz='+tz, testSuite(dt, tz, lang));
    }
  }
}


niut.runner([suite], function(echec) {
  if (echec) throw new Error('CheckMate...');
});
