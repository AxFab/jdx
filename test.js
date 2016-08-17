

(function () {
  var root = this;

  var jDx = require('./jdx.js'),
      now = new Date();

  var UT = {
    success: function (name, result, expected) {
      console.log (' - ' + name + ': ' + result + ' -> OK');
      return 'success';
    },
    failure: function (name, result, expected) {
      console.log (' - ' + name + ': ' + result + ' -> FAIL');
      return 'warning';
    },
    error: function (name, exception) {
      console.log (' - ' + name + ': ERR. - ' + exception.message);
      return 'danger';
    },
    toHtml: function (name, status, result, expected) {
      return '<div class="alert-' + status + '"><p><b>' + name + ':</b>' +
          result + '<em class="pull-right">' + expected + '</em></p></div>';
    }
  }

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

  for (var test in formatTests) {
    var info = formatTests[test], status;
    if (info === true)
      info = {
        prc:1000
      }
    var res, org, exd, a, 
        b = parseInt(now.getTime() / info.prc), e;
    if (info.mod)
      b = b % info.mod;
    try {
      res = jDx.formatDate(now, test);
      org = info.md ? jDx.parseDate(res, test) : jDx.parseDate(res);
      exd = jDx.formatDate(org, 'isoUtcDateTime');
      a = !isNaN(org) ? parseInt(org.getTime() / info.prc) : 0;
      if (info.mod)
        a = a % info.mod;
      if (a === b)
        status = UT.success(test, res, exd);
      else
        status = UT.failure(test, res, exd);
    } catch (e) {
      status = UT.error(test, e);
    }

    // $('#test_format').append(UT.toHtml(test, status, res, exd));
  };

}).call(this);