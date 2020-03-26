'use strict';

const assert = require('assert');

const TestiumCookie = require('../');

const HEADERS = {
  'content-type': 'text/html',
  'set-cookie': 'user=robin; path=/',
  'cache-control': 'public; max-age=3600',
};

describe('getTestiumCookie', () => {
  it('Can extract from a cookie dictionary', () => {
    const testiumCookie = TestiumCookie.getTestiumCookie({
      _testium_: TestiumCookie.encodeMetaData(HEADERS, 404),
    });
    assert.deepStrictEqual(testiumCookie, {
      headers: HEADERS,
      statusCode: 404,
    });
  });

  it('can extract from a cookie list', () => {
    const testiumCookie = TestiumCookie.getTestiumCookie([
      {
        name: '_testium_',
        value: TestiumCookie.encodeMetaData(HEADERS, 404),
      },
    ]);
    assert.deepStrictEqual(testiumCookie, {
      headers: HEADERS,
      statusCode: 404,
    });
  });
});
