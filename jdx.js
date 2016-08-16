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

(function () {
  var root = this;
  
  var jDx = {};

  /** English - en */
  var dF = {
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
    model:{
      "default": {
        reg: /^[A-Za-z]+\s+([A-Za-z]+)\s+([0-9]{2})\s+([0-9]{4})\s+([0-9]{2}):([0-9]{2}):([0-9]{2})$/,
        day: 2, month: 1, year: 3, hours:4, mins:5, secs:6 },
      shortDate: {
        reg: /^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})$/,
        day: 2, month: 1, year: 3 },
      sortableDate: {
        reg: /^([0-9]{4})\/([0-9]{2})\/([0-9]{2})$/,
        day: 3, month: 2, year: 1 },
      mediumDate: {
        reg: /^([A-Za-z]+)\s+([0-9]{1,2}),?\s+([0-9]{4})$/,
        day: 2, month: 1, year: 3 },
      longDate: {
        reg: /^([A-Za-z]+)\s+([0-9]{1,2}),?\s+([0-9]{4})$/,
        day: 2, month: 1, year: 3 },
      fullDate: {
        reg: /^[A-Za-z]+,?\s+([A-Za-z]+)\s+([0-9]{1,2}),?\s+([0-9]{4})$/,
        day: 2, month: 1, year: 3 },
      shortTime: {
        reg: /^([0-9]{1,2}):([0-9]{2})\s+([aApP][mM])$/,
        hours: 1, mins: 2, TT:3 },
      mediumTime: {
        reg: /^([0-9]{1,2}):([0-9]{2}):([0-9]{2})\s+([aApP][mM])$/,
        hours: 1, mins: 2, secs:3, TT:4 },
      longTime: {
        reg: /^([0-9]{1,2}):([0-9]{2}):([0-9]{2})\s+([aApP][mM])\s+(GMT[+-][0-9]{4})$/,
        hours: 1, mins: 2, secs:3, TT:4, gmt:5 },
      isoDate: {
        reg: /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/,
        day: 3, month: 2, year: 1 },
      isoTime: {
        reg: /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/,
        hours: 1, mins: 2, secs:3 },
      isoDateTime:{
        reg: /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})$/,
        day: 3, month: 2, year: 1, hours:4, mins:5, secs:6 },
      isoUtcDateTime: {
        reg: /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})Z$/,
        day: 3, month: 2, year: 1, hours:4, mins:5, secs:6 , utc:true}
    },
    dayNames: [
      "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", 
      "Saturday"
    ],
    monthNames: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", 
      "Nov", "Dec",
      "January", "February", "March", "April", "May", "June", "July", "August", 
      "September", "October", "November", "December"
    ]
  };

  /** Format a date to string */ 
  jDx.formatDate = function (date, mask, utc) {

    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
      timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
      timezoneClip = /[^-+\dA-Z]/g;
    if (arguments.length == 1 && typeof(date) === 'string') {
      mask = date;
      date = undefined;
    }

    mask = dF.masks[mask] || mask || dF.masks["default"];
    date = date ? new Date(date) : new Date;
    if (isNaN(date)) {
      throw SyntaxError("invalid date");
    } else if (mask.slice(0, 4) == "UTC:") {
      mask = mask.slice(4);
      utc = true;
    }

    var padWithZero = function (val, len) {
      val = String(val);
      len = len || 2;
      while (val.length < len) val = "0" + val;
      return val;
    };

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

    var values = {
      d:    d,
      dd:   padWithZero(d),
      ddd:  dF.dayNames[D],
      dddd: dF.dayNames[D + 7],
      m:    m + 1,
      mm:   padWithZero(m + 1),
      mmm:  dF.monthNames[m],
      mmmm: dF.monthNames[m + 12],
      yy:   String(y).slice(2),
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
      Z:    utc ? "UTC" : (date.toString().match(timezone) || [""]).pop().replace(timezoneClip, ""),
      o:    (o > 0 ? "-" : "+") + padWithZero(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
      S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
    };

    return mask.replace(token, function ($0) {
      return $0 in values ? values[$0] : $0.slice(1, $0.length - 1);
    });
  };

  /** Parse a string and convert as a date */
  jDx.parseDate = function (date, model, utc) {

    var now = new Date(),
        res = new Date(),
        tzOff = -now.getTimezoneOffset(),

    model = dF.model[model] || model;
    if (typeof model === 'string') {
      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
          regexps = {
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
            S:    { r:'th|st|nd|rd'}
          };

      var keys = {}, idx = 0;
      model = model.replace(token, function ($0) {
        keys[regexps[$0].t] = (++idx);
        return $0 in regexps ? '('+regexps[$0].r+')' : $0.slice(1, $0.length - 1);
      });
      keys.reg = new RegExp(model);
      model = keys;
      // return NaN; // TODO -- Check validity!!
    }

    var m = date.match(model.reg);
    if (m.length <= 1)
      return NaN;

    var tzHour = tzOff / 60, tzMin = tzOff % 60;
    var gmHour = 0, gmMin = 0;
    if (model.gmt && m[model.gmt].substr(0,3) === 'GMT') {
      gmHour = parseInt(m[model.gmt].substr(3, 3))
      gmMin = parseInt(m[model.gmt].substr(6)) * (gmHour / Math.abs(gmHour));
    }

    if (model.hours) {
      var dc = 0;
      if (model.TT && m[model.TT].toUpperCase() === 'PM') dc = 12;
      if (utc || model.utc) dc += tzHour;
      else if (model.gmt) dc += gmHour - tzHour;
      res.setHours(parseInt(m[model.hours]) + dc);
    } else {
      res.setHours(0 - (utc || model.utc ? 0 : tzHour));
    }

    if (model.mins) {
      var dc = 0;
      if (utc || model.utc) dc += tzMin;
      else if (model.gmt) dc += gmMin - tzMin;
      res.setMinutes(parseInt(m[model.mins]) + dc);
    } else {
      res.setMinutes(0 - (utc || model.utc ? 0 : tzMin));
    }

    if (model.secs) {
      res.setSeconds(parseInt(m[model.secs]));
    } else {
      res.setSeconds(0);
    }


    if (model.year) {
      var since = 0;
      if (m[model.year].length == 2)
        since = parseInt((now.getFullYear()) / 100) * 100;
      res.setYear(parseInt(m[model.year]) + since);
    }

    if (model.month) {
      var mn = parseInt(m[model.month]);
      if (isNaN(mn)) {
        var arr = dF.monthNames;
        for (mn = 0; mn< arr.length; ++mn) {
          if (m[model.month] === arr[mn])
            break;
        }
        mn = (mn + 1) % 12;
      }
      res.setMonth(mn-1);
    }

    if (model.day) {
      var day = parseInt(m[model.day])
      res.setDate(day);
    }

    return res;
  };

  if (typeof module !== 'undefined' && module.exports)
    module.exports = jDx; // Nodejs
  else
    root.jDx = jDx; // Browser

}).call(this);

