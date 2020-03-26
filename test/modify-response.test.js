'use strict';

const assert = require('assert');

const TestiumCookie = require('../');

function createHeaders() {
  return {
    'content-type': 'text/html',
    'set-cookie': 'user=robin; path=/',
    'cache-control': 'public; max-age=3600',
  };
}

describe('modifyResponse', () => {
  it('modify complete response', () => {
    const res = {
      headers: createHeaders(),
      statusCode: 420,
    };
    assert.strictEqual(
      TestiumCookie.modifyResponse(res),
      res,
      'returns the response object'
    );

    assert.strictEqual(
      res.headers['cache-control'],
      'no-store',
      'it overrides the cache-control header'
    );

    assert.strictEqual(
      res.headers['content-type'],
      'text/html',
      'it keeps other headers around'
    );

    assert.strictEqual(
      res.headers['set-cookie'],
      'user=robin; path=/',
      'it preserves the original set-cookie header'
    );

    assert.strictEqual(res.statusCode, 200, 'forces a 200 status code');

    const encodedData = TestiumCookie.encodeMetaData(createHeaders(), 420);
    assert.strictEqual(
      res.headers['Set-Cookie'],
      `_testium_=${encodedData}; path=/`,
      'it generates its own cookie header for meta data'
    );
  });

  it('preserves non-200 success codes', () => {
    const res = {
      headers: createHeaders(),
      statusCode: 201,
    };
    assert.strictEqual(
      TestiumCookie.modifyResponse(res),
      res,
      'returns the response object'
    );

    assert.strictEqual(res.statusCode, 201, 'allows the 201 to pass through');
  });
});
