# jDx

Extension for JavaScript date (format and parse)

[![Npm version](https://badge.fury.io/js/jdx.svg)](https://badge.fury.io/js/jdx)
&nbsp;
[![Npm download](https://img.shields.io/npm/dm/jdx.svg)](https://www.npmjs.com/package/jdx)
&nbsp;
[![Build Status](https://api.travis-ci.org/AxFab/jdx.svg?branch=master)](http://travis-ci.org/axfab/jdx)
&nbsp;
[![Coverage Status](https://img.shields.io/coveralls/AxFab/jdx.svg)](https://coveralls.io/r/AxFab/jdx?branch=master)
&nbsp;
[![Dependencies](https://david-dm.org/AxFab/jdx.svg)](https://david-dm.org/AxFab/jdx)

## Installation

__jDx__ library have been tested on NodeJS and on most browsers.

On node:

    npm install jdx

On browser:

    <script src="/dist/js/jdx.min.js" integrity="sha384-tj1IdTxBhXxBdA0/P1vSAM86XtU0Rtl2mDdEkYk9UTDLIDq+DiodnY/IdhP2Pt/n"></script>

## Usage

The library provide one item with one function to format dates and another 
to parse dates.

### Format dates:

  - `jDx.formatDate(mask);`
  - `jDx.formatDate(date[, mask [, utc]]);`

  - `date`: Provide a javascript `Date` object to format. Default to `new Date()`.
  - `mask`: The format requested can be either a name or an expression. See _Patterns_ and _Language_ to know more. Default is 'default'.
  - `utc`: Boolean value, if `true` will display UTC time, else local time. Default is `false`.

```js
var jDx = require('jdx');

jDx.formatDate(new Date()); // return 'Sun Sep 25 2016 13:06:24'
jDx.formatDate(new Date(), 'mmmm yyyy'); // return 'September 2016'
jDx.formatDate('isoUtcDateTime'); // return '2016-09-25T11:06:24Z'
```


### Parse dates:

  - `jDx.parseDate(date[, mask [, utc]]);`

  - `date`: A string representing a date.
  - `mask`: The format used by the string representation. Can be either a name or an expression. If none is provided the function will try with known pattern including previously used. See _Patterns_ and _Language_ to know more.
  - `utc`: Boolean value, if `true` will consider _date_ as in UTC time, else in local time. Default is `false`.

```js
var jDx = require('jdx');

jDx.formatDate('Sun Sep 25 2016 13:06:24'); // equals to `Sun Sep 25 2016 13:06:24 GMT+0200`
jDx.formatDate('September 2016', 'mmmm yyyy'); // equals to `Sun Sep 01 2016 00:00:00 GMT+0200`
jDx.formatDate('2016-09-25T11:06:24Z'); // equals to `Sun Sep 25 2016 13:06:24 GMT+0200`
```

## Patterns

The expression provide to those previous functions will recognize those patterns

  - `d`: The day of the month.
  - `dd`: The day of the month on two digits.
  - `ddd`: A short representation of the day of the week (3 characters).
  - `dddd`: The name of the day of the week.
  - `m`: The number of the month.
  - `mm`: The number of the month on two digits.
  - `mmm`: A short representation of the month.
  - `mmmm`: The name of the month.
  - `yy`: The last two digits of the current year.
  - `yyyy`: The year on four digits.
  - `h`: The hours on a 12 hours clock.
  - `hh`: The hours on a 12 hours clock on two digits.
  - `H`: The hours on a 24 hours clock.
  - `HH`: The hours on a 24 hours clock on two digits.
  - `M`: The minutes.
  - `MM`: The minutes on two digits.
  - `s`: The seconds.
  - `ss`: The seconds on two digits.
  - `l`: The milliseconds on three digits.
  - `L`: The hundreads of seconds on two digits.
  - `t`: The _meridiem_ (_a_ or _p_)
  - `tt`: The _meridiem_ (_am_ or _pm_)
  - `T`: The _meridiem_ (_A_ or _P_)
  - `TT`: The _meridiem_ (_AM_ or _PM_)
  - `Z`: The local time offset (_UTC_ or _GMT+0000_)
  - `o`: The local time offset in minutes
  - `O`: The local time offset in the form '+HHMM'
  - `S`: Day of the month suffix (_th_, _st_, _nd_ or _rd_).

To include extra characters, put them into quote __''__.

The library alreay know some default pattern. See _Languages_.

## Languages

The library support english as default language. However it's possible to
configure the library differently.

  - `jDx.setLang(lang)`: Change the days and month names used by the library. Some pattern might change too.

Note that pattern are more localization (l10n) than internationalization (i18n)
however the library is not mature enough to handle the difference perfectly but still provide 
way to change the formats availables.

The languages supported are: `en`, `fr` and `es`.

Format         | English                    | French                     | Spanish
---------------|----------------------------|----------------------------|---------
default        | Sun Sep 25 2016 13:48:02   | Dim 25 Sep 2016 13:50:52   | Dom 25-IX-2016 13:52:33
shortDate      | 9/25/16                    | 25/9/16                    | 25/9/16
mediumDate     | Sep 25, 2016               | 25 Sep 2016                | 25-IX-2016
longDate       | September 25, 2016         | 25 Septembre 2016          | 25 de septiembre de 2016
fullDate       | Sunday, September 25, 2016 | Dimanche 25 Septembre 2016 | Domingo 25 de septiembre de 2016
shortTime      | 1:48 PM                    | 13:50                      | 13:52
mediumTime     | 1:48:02 PM                 | 13:50:52                   | 13:52:33
longTime       | 1:48:02 PM GMT+0200        | 13:50:52 GMT+0200          | 13:52:33 GMT+0200

Format         | Values
---------------|-----------------------
sortableDate   | 2016/09/25
isoDate        | 2016-09-25
isoTime        | 13:48:02
isoDateTime    | 2016-09-25T13:48:02
isoUtcDateTime | 2016-09-25T11:48:02Z


## Contributing

Please report to me any bug you find. And any help is most welcome especialy for 
internationalization and localization.

