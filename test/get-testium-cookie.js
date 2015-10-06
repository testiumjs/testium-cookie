'use strict';

var test = require('tap').test;

var TestiumCookie = require('../');

var HEADERS = {
  'content-type': 'text/html',
  'set-cookie': 'user=robin; path=/',
  'cache-control': 'public; max-age=3600'
};

test('From cookie dictionary', function(t) {
  var testiumCookie = TestiumCookie.getTestiumCookie({
    _testium_: TestiumCookie.encodeMetaData(HEADERS, 404)
  });
  t.deepEqual(testiumCookie, {
    headers: HEADERS,
    statusCode: 404
  });
  t.end();
});

test('From cookie list', function(t) {
  var testiumCookie = TestiumCookie.getTestiumCookie([{
    name: '_testium_',
    value: TestiumCookie.encodeMetaData(HEADERS, 404)
  }]);
  t.deepEqual(testiumCookie, {
    headers: HEADERS,
    statusCode: 404
  });
  t.end();
});
