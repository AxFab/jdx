/* jDx.js | extension for JavaScript date.

  MIT License
  Copyright (C) 2016  Fabien Bavent

  Permission is hereby granted, free of charge, to any person obtaining a
  copy of this software and associated documentation files (the "Software"),
  to deal in the Software without restriction, including without limitation
  the rights to use, copy, modify, merge, publish, distribute, sublicense,
  and/or sell copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
  DEALINGS IN THE SOFTWARE.

  Fabien Bavent           fabien.bavent@gmail.com
*/
"use strict";

var jDx = (function () {

  var jDx = {};

  var i18n = {}, locale = {};

  /** English - en */
  i18n.en = {
    masks:{
      "default":      "ddd mmm dd yyyy HH:MM:ss",
      shortDate:      "m/d/yy",
      sortableDate:   "yyyy/mm/dd",
      mediumDate:     "mmm d, yyyy",
      longDate:       "mmmm d, yyyy",
      fullDate:       "dddd, mmmm d, yyyy",
      shortTime:      "h:MM TT",
      mediumTime:     "h:MM:ss TT",
      longTime:       "h:MM:ss TT Z",
      isoDate:        "yyyy-mm-dd",
      isoTime:        "HH:MM:ss",
      isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
      isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    },
    dayNames: [
      "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
  };

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  var datePartToken = 
    /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloOSZ]|"[^"]*"|'[^']*'/g;

  var datePartPatterns = {
    d:    { r:'[1-3]?[0-9]', t:'day'},
    dd:   { r:'[0-3][0-9]', t:'day'},
    ddd:  { r:'[A-Za-z]+'},
    dddd: { r:'[A-Za-z]+'},
    m:    { r:'1?[0-9]', t:'month'},
    mm:   { r:'[0-1][0-9]', t:'month'},
    mmm:  { r:'[A-Za-z]+', t:'month'},
    mmmm: { r:'[A-Za-z]+', t:'month'},
    yy:   { r:'[0-9]{2}', t:'year'},
    yyyy: { r:'[0-9]{4}', t:'year'},
    h:    { r:'1?[0-9]', t:'hours'},
    hh:   { r:'[0-1][0-9]', t:'hours'},
    H:    { r:'[1-2]?[0-9]', t:'hours'},
    HH:   { r:'[0-2][0-9]', t:'hours'},
    M:    { r:'[1-5]?[0-9]', t:'mins'},
    MM:   { r:'[0-5][0-9]', t:'mins'},
    s:    { r:'[1-5]?[0-9]', t:'secs'},
    ss:   { r:'[0-5][0-9]', t:'secs'},
    l:    { r:'[0-9]{3}', t:'ms'},
    L:    { r:'[0-9]{2}', t:'ms'},
    t:    { r:'[ap]', t:'TT'},
    tt:   { r:'[ap]m', t:'TT'},
    T:    { r:'[AP]', t:'TT'},
    TT:   { r:'[AP]M', t:'TT'},
    Z:    { r:'UTC|GMT[+-][0-9]{4}', t:'gmt'},
    o:    { r:'[+-][0-9]+', t:'gmt'},
    O:    { r:'[+-][0-9]{2}:[0-9]{2}', t:'gmt'},
    S:    { r:'th|st|nd|rd'}
  };

  /** Build all possible value for date format. */
  var buildDateValues = function (date, utc, gmt) {
    var _ = utc ? "getUTC" : "get",
      d = date[_ + "Date"](),
      D = date[_ + "Day"](),
      m = date[_ + "Month"](),
      y = date[_ + "FullYear"](),
      H = date[_ + "Hours"](),
      M = date[_ + "Minutes"](),
      s = date[_ + "Seconds"](),
      L = date[_ + "Milliseconds"](),
      o = utc ? 0 : date.getTimezoneOffset();

    return {
      d:    d,
      dd:   padWithZero(d),
      ddd:  locale.dayNames[D],
      dddd: locale.dayNames[D + 7],
      m:    m + 1,
      mm:   padWithZero(m + 1),
      mmm:  locale.monthNames[m],
      mmmm: locale.monthNames[m + 12],
      yy:   y.toString().slice(2),
      yyyy: y,
      h:    H % 12 || 12,
      hh:   padWithZero(H % 12 || 12),
      H:    H,
      HH:   padWithZero(H),
      M:    M,
      MM:   padWithZero(M),
      s:    s,
      ss:   padWithZero(s),
      l:    padWithZero(L, 3),
      L:    padWithZero(L > 99 ? Math.round(L / 10) : L),
      t:    H < 12 ? "a"  : "p",
      tt:   H < 12 ? "am" : "pm",
      T:    H < 12 ? "A"  : "P",
      TT:   H < 12 ? "AM" : "PM",
      Z:    utc ? "UTC" : gmt,
      o:    (o > 0 ? "-" : "+") + padWithZero(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
      O:    (o > 0 ? "-" : "+") + padWithZero(Math.floor(Math.abs(o) / 60)) + padWithZero(Math.floor(Math.abs(o) % 60)),
      S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 !== 10) * d % 10]
    };
  };

  /** Create the parsing model for this date mask. */
  var createDateParsingModel = function (mask) {   
    var model = {},
        idx = 0;

    if (mask.slice(0, 4) === "UTC:") {
      mask = mask.slice(4);
      model.utc = true;
    }
    mask = mask.replace(/\\/g, "\\\\");
    mask = mask.replace(/\//g, "\\/");
    mask = mask.replace(/,/g, ",?");
    mask = mask.replace(datePartToken, function ($0) {
      if (datePartPatterns[$0]) {
        model[datePartPatterns[$0].t] = (++idx);
        return '('+datePartPatterns[$0].r+')';
      }
      return $0.slice(1, $0.length - 1);
    });
    mask = mask.replace(/\s+/g, "\\s+");
    model.reg = new RegExp('^\\s*' + mask + '\\s*$');

    if (idx === 0) {
      throw new SyntaxError('This is not a format for a date.');
    } else if (typeof model.month !== typeof model.year) {
      throw new SyntaxError('A month need a year and vice-versa.');
    } else if (model.day && typeof model.day !== typeof model.month) {
      throw new SyntaxError("A day can't be set without month.");
    // } else if (model.mins && typeof model.mins !== typeof model.hours) {
    //   throw new SyntaxError("Minutes without hours doesn't make sense.");
    } else if (model.secs && typeof model.secs !== typeof model.mins) {
      throw new SyntaxError("Seconds without minutes doesn't make sense.");
    } else if (model.ms && typeof model.ms !== typeof model.secs) {
      throw new SyntaxError("Milliseconds without seconds doesn't make sense.");
    }

    return model;
  };

  /** Set date-time from text. */
  var dateParsingSetter = {
    setHours: function (date, model, matching, config) {
      if (model.hours) {
        var dc = 0;
        if (model.TT && matching[model.TT].toUpperCase() === 'PM') {
          dc = 12;
        }
        if (config.utc || model.utc) {
          dc += config.tzHour;
        } else if (model.gmt) {
          dc += config.gmHour - config.tzHour;
        }
        date.setHours(parseInt(matching[model.hours]) + dc);
      } else {
        date.setHours(0 - (config.utc || model.utc ? 0 : config.tzHour));
      }
    },
    setMinutes: function (date, model, matching, config) {
      if (model.mins) {
        var dc = 0;
        if (config.utc || model.utc) {
          dc += config.tzMin;
        } else if (model.gmt) {
          dc += config.gmMin - config.tzMin;
        }
        date.setMinutes(parseInt(matching[model.mins]) + dc);
      } else {
        date.setMinutes(0 - (config.utc || model.utc ? 0 : config.tzMin));
      }

      if (model.secs) {
        date.setSeconds(parseInt(matching[model.secs]));
      } else {
        date.setSeconds(0);
      }
    },
    setDate: function (date, model, matching, config) {
      if (model.month) {
        var mn = parseInt(matching[model.month]);
        if (isNaN(mn)) {
          var arr = locale.monthNames;
          for (mn = 0; mn< arr.length; ++mn) {
            if (matching[model.month] === arr[mn]) {
              break;
            }
          }
          mn = (mn + 1) % 12;
        }
        date.setMonth(mn-1);

        var since = 0;
        if (matching[model.year].length === 2) {
          since = parseInt(config.year / 100) * 100;
        }
        date.setYear(parseInt(matching[model.year]) + since);
      }

      if (model.day) {
        var day = parseInt(matching[model.day]);
        date.setDate(day);
      }
    },
  };

  /** Pad number with leading zero. */
  var padWithZero = function (val, len) {
    val = val.toString();
    len = len || 2;
    while (val.length < len) {
      val = "0" + val;
    }
    return val;
  };

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  /** Format a date to string */
  jDx.formatDate = function (pdate, mask, utc) {
    if (arguments.length === 1 && typeof(pdate) === 'string') {
      mask = date;
      pdate = undefined;
    }

    mask = locale.masks[mask] || mask || locale.masks["default"];
    var date = pdate ? new Date(pdate) : new Date();
    if (isNaN(date)) {
      throw SyntaxError("invalid date: '" + pdate + "'");
    } else if (mask.slice(0, 4) === "UTC:") {
      mask = mask.slice(4);
      utc = true;
    }

    var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        gmt = (date.toString().match(timezone) || [""]).pop().replace(timezoneClip, "");

    var values = buildDateValues(date, utc, gmt);
    return mask.replace(datePartToken, function ($0) {
      return values[$0] ? values[$0] : $0.slice(1, $0.length - 1);
    });
  };

  /** Parse a string and convert as a date */
  jDx.parseDate = function (date, mask, utc) {
    var now = new Date(),
        res = new Date(),
        tzOff = -now.getTimezoneOffset(),
        matching;

    var model = locale.models[mask] || mask;
    if (typeof model === 'string') {
      model = createDateParsingModel(mask);
      locale.models[mask] = model;
      matching = model.reg.exec(date);
    } else if (!model) {
      for (var k in locale.models) {
        model = locale.models[k];
        matching = model.reg.exec(date);
        if (matching) {
          break;
        }
      }
    } else {
      matching = model.reg.exec(date);
    }
    
    if (!matching) {
      return NaN;
    }

    var config = {
      tzHour: tzOff / 60,
      tzMin: tzOff % 60,
      gmHour: 0,
      gmMin: 0,
      utc: utc,
      year: now.getFullYear(),
    };
    if (model.gmt) {
      var gmtStr = matching[model.gmt];
      if (gmtStr == 'UTC') {
        config.gmHour = 0;
        config.gmMin = 0;
      } else if (gmtStr.indexOf(':') == 3) {
        config.gmHour = parseInt(gmtStr.substr(0, 3));
        config.gmMin = parseInt(gmtStr.substr(0, 1) + gmtStr.substr(4));
      } else {
        config.gmHour = parseInt(gmtStr.substr(3, 3));
        config.gmMin = parseInt(gmtStr.substr(3, 1) + gmtStr.substr(6));
      }
    }

    dateParsingSetter.setHours(res, model, matching, config);
    dateParsingSetter.setMinutes(res, model, matching, config);
    dateParsingSetter.setDate(res, model, matching, config);
    return res;
  };

  jDx.transform = function(date, input, output, utc) {
    return jDx.formatDate(jDx.parseDate(date, input, utc), output, utc);
  }

  jDx.relative = function (date, from) {
    var tbl = [
      { presicion:1000, max:60, word:'seconds' },
      { presicion:1000 * 60, max:2, word:'minute' },
      { presicion:1000 * 60, max:60, word:'minutes' },
      { presicion:1000 * 3600, max:2, word:'hour' },
      { presicion:1000 * 3600, max:24, word:'hours' },
      { presicion:1000 * 3600 * 24, max:2, word:'day' },
      { presicion:1000 * 3600 * 24, max:30, word:'days' },
      { presicion:1000 * 3600 * 24 * 30.4167, max:2, word:'month' },
      { presicion:1000 * 3600 * 24 * 30.4167, max:12, word:'months' },
      { presicion:1000 * 3600 * 365.4, max:2, word:'year' },
      { presicion:1000 * 3600 * 365.4, max:99999, word:'years' },
    ];
    if (!from) {
      from = new Date();
    } else if (typeof from === 'string') {
      from = jDx.parseDate(from);
    }
    var ms = from.getTime() - date.getTime(),
        str = ms < 0 ? locale.relative.future : locale.relative.past,
        rel = null,
        count = 1,
        i = 0;
    ms = Math.abs(ms);
    while (ms < tbl[i].presicion * tbl[i].max) {
      ++i;
    }

    rel = locale.relative[tbl[i].word];
    count = parseInt(ms / tbl[i].presicion);

    if (typeof rel === 'function')
      rel = rel(count);
    else 
      rel = rel.replace('%d', count);
    return str.replace('%s', rel);
  };

  /** Change of language and reset parsing model cache. */
  jDx.addLang = function (lang, opt) {
    i18n[lang] = opt;
    if (!opt.masks || 
        !opt.dayNames || opt.dayNames.length < 14 || 
        !opt.monthNames || opt.monthNames.length < 24) {
      throw new Error('Invalid locale data "'+lang+'".');
    }
    opt.masks.isoDate = "yyyy-mm-dd",
    opt.masks.isoTime = "HH:MM:ss",
    opt.masks.isoDateTime = "yyyy-mm-dd'T'HH:MM:ss",
    opt.masks.isoUtcDateTime = "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
  }

  /** Change of language and reset parsing model cache. */
  jDx.setLang = function (lang, opt) {
    if (opt) {
      jDx.addLang(lang, opt);
    }
    locale = i18n[lang] || i18n.en;
    locale.models = {};
    for (var k in locale.masks) {
      locale.models[k] = createDateParsingModel(locale.masks[k]);
    }
    return i18n[lang] ? jDx : null;
  };

  return jDx.setLang('en');
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = jDx; // Nodejs
}
