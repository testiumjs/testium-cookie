'use strict';
var assert = require('assertive');

var TestiumCookie = require('../');

var HEADERS = {
  'content-type': 'text/html',
  'set-cookie': 'user=robin; path=/',
  'cache-control': 'public; max-age=3600',
};

describe('getTestiumCookie', function () {
  it('Can extract from a cookie dictionary', function () {
    var testiumCookie = TestiumCookie.getTestiumCookie({
      _testium_: TestiumCookie.encodeMetaData(HEADERS, 404),
    });
    assert.deepEqual({
      headers: HEADERS,
      statusCode: 404,
    }, testiumCookie);
  });

  it('can extract from a cookie list', function () {
    var testiumCookie = TestiumCookie.getTestiumCookie([{
      name: '_testium_',
      value: TestiumCookie.encodeMetaData(HEADERS, 404),
    }]);
    assert.deepEqual({
      headers: HEADERS,
      statusCode: 404,
    }, testiumCookie);
  });
});
