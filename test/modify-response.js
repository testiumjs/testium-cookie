'use strict';
var assert = require('assertive');

var TestiumCookie = require('../');

function createHeaders() {
  return {
    'content-type': 'text/html',
    'set-cookie': 'user=robin; path=/',
    'cache-control': 'public; max-age=3600',
  };
}

describe('modifyResponse', function () {
  it('modify complete response', function () {
    var res = {
      headers: createHeaders(),
      statusCode: 420,
    };
    assert.equal('returns the response object',
      res, TestiumCookie.modifyResponse(res));

    assert.equal('it overrides the cache-control header',
      'no-store', res.headers['cache-control']);

    assert.equal('it keeps other headers around',
      'text/html', res.headers['content-type']);

    assert.equal('it preserves the original set-cookie header',
      'user=robin; path=/', res.headers['set-cookie']);

    assert.equal('forces a 200 status code',
      200, res.statusCode);

    var encodedData = TestiumCookie.encodeMetaData(createHeaders(), 420);
    assert.equal('it generates its own cookie header for meta data',
      '_testium_=' + encodedData + '; path=/', res.headers['Set-Cookie']);
  });

  it('preserves non-200 success codes', function () {
    var res = {
      headers: createHeaders(),
      statusCode: 201,
    };
    assert.equal('returns the response object',
      res, TestiumCookie.modifyResponse(res));

    assert.equal('allows the 201 to pass through',
      201, res.statusCode);
  });
});
