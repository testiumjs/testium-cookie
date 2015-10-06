'use strict';

var test = require('tap').test;

var TestiumCookie = require('../');

function createHeaders() {
  return {
    'content-type': 'text/html',
    'set-cookie': 'user=robin; path=/',
    'cache-control': 'public; max-age=3600'
  };
}

test('modify complete response', function(t) {
  var res = {
    headers: createHeaders(),
    statusCode: 420
  };
  t.equal(TestiumCookie.modifyResponse(res), res,
    'returns the response object');

  t.equal(res.headers['cache-control'], 'no-store',
    'it overrides the cache-control header');

  t.equal(res.headers['content-type'], 'text/html',
    'it keeps other headers around');

  t.equal(res.headers['set-cookie'], 'user=robin; path=/',
    'it preserves the original set-cookie header');

  var encodedData = TestiumCookie.encodeMetaData(createHeaders(), 420);
  t.equal(res.headers['Set-Cookie'], '_testium_=' + encodedData + '; path=/',
    'it generates its own cookie header for meta data');

  t.end();
});
