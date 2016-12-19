
var jDx = jDx || require('../jdx.js'),
    niut = niut || require ('niut');

if (!jDx.setLang('fr'))
  require('../jdx-locales.min.js');

var langs = ['en', 'fr', 'es'];

var timezones = [ 'locale' ];
if (false && typeof process !== 'undefined') {
  timezones = [
    'Africa/Abidjan',
    'Europe/Amsterdam',
    'Europe/Paris',
    'Asia/Bangkok',
    'Australia/Sydney',
    'Europe/London',
  ];
}


var DateWithTime = function (time) {
  var dt = new Date();
  dt.setTime(time);
  return dt;
};

var dates = [
  new Date(),
  // new Date(1815, 06, 18, 12, 30, 02)
  // DateWithTime(1000 * 3600 * 24 * 365 * 24 + 1000 * 3600 * 24 * 366 * 6 + 1000 * 3600 * 24 * 1),
  // new Date(2012, 09, 12, 12, 12, 12), // Some error linked to summer/winter time.
  // new Date(1815, 06, 18, 12, 30, 02),
];


/* List basic tests */
var formatTests = {
  'default':{ div:'S' },
  'shortDate':{ div:'d'},
  'sortableDate':{ div:'d'},
  'mediumDate':{ div:'d'},
  'longDate':{ div:'d'},
  'fullDate':{ div:'d'},
  'shortTime':{ div:'M', max:'d'},
  'mediumTime':{ div:'S', max:'d'},
  'longTime':{ div:'S', max:'d'},
  'isoDate':{ div:'d'},
  'isoTime':{ div:'S', max:'d'},
  'isoDateTime':{ div:'S'},
  'isoUtcDateTime':{ div:'S'},
  'HH:MM Z':{ md:true, div:'M', max:'d'},
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

var verbose = typeof process !== 'undefined' && process.env.JDX_VERBOSE;

// Return number of ticks
var __ticks = function (dt, info) {
  if (isNaN(dt))
    return -1;
  var divisions = { S:1000, M:1000*60, H:1000*3600, d:1000*3600*24 };
  var tk = dt.getTime();
  tk = parseInt(tk / divisions[info.div]) 
  if (info.max)
    tk = parseInt((tk % divisions[info.max]) / divisions[info.div]);
  return tk;
};


var doTest = function (name, date, test, assert) {
  try {
    var info = formatTests[test], status;

    var expectedTicks = __ticks(date, info),
        formatedDate = jDx.formatDate(date, test),
        parsedDate = info.md ? jDx.parseDate(formatedDate, test) : jDx.parseDate(formatedDate);
    if (isNaN(parsedDate)) {
      console.warn("Can't parse :'" + formatedDate + "', retry...");
      parsedDate = jDx.parseDate(formatedDate, test);
    }
    var parsedTicks = __ticks(parsedDate, info);
    var parsedIso = jDx.formatDate(parsedDate, 'isoUtcDateTime');

    if (parsedTicks === expectedTicks) {
      if (verbose) console.log (' - ' + test + ': ' + formatedDate + ' -> OK');
      status = 'success';
    } else {
      if (verbose) console.log (' - ' + test + ': ' + formatedDate + ' -> FAIL ('+ parsedIso+')');
      assert.fails('Expected "' + formatedDate + '", got: "' + parsedIso + '".');
      status = 'warning';
    }

    var s = {parsed:parsedTicks, expected:expectedTicks };
    if (typeof $ !== 'undefined')
      $('#test_format').append(UT.toHtml(name, status, formatedDate, parsedIso, JSON.stringify(s)));
  } catch (ex) {
    status = 'danger';
    if (typeof $ !== 'undefined')
      $('#test_format').append(UT.toHtml(name, status, formatedDate, parsedIso, JSON.stringify(ex)));
    throw ex
  }
};

// Create a new test case
var addTestCase = function (name, date, test, tz, lang) {
  return function (assert, done) {
    if (typeof process !== 'undefined')
      process.env.TZ = tz;
    jDx.setLang(lang);
    if (verbose)
      console.log (tz, new Date().getTimezoneOffset());
    doTest(name, date, test, assert);
    done();
  }
};

// Create a new test suites
var addTestSuites = function (lg, tz) {
  var name = 'lg='+lg+', tz='+tz;
  var suite = niut.newSuite(name);

  for (var format in formatTests) {
    for (var d in dates) {
      var test = addTestCase(format + ', ' + name, dates[d], format, tz, lg);
      suite.test(format + ', ' + name, test);
    }
  }
  return suite;
};


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

var suites = [];

var suitePastIssue = niut.newSuite('Past issues');
suites.push(suitePastIssue);
suitePastIssue.test('# UTC / GMT+0', function (assert, done) {
  var date = jDx.parseDate('3:41:06 PM GMT+0000');
  assert.isFalse(isNaN(date));
  done();
});


for (var l in langs) {
  for (var t in timezones) {
    suites.push(addTestSuites(langs[l], timezones[t]));
  }
}

niut.runner(suites, function(echec) {
  if (echec && typeof process !== 'undefined') process.exitCode = -1;
});
