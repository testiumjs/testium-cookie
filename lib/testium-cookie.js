/*
 * Copyright (c) 2015, Groupon, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * Neither the name of GROUPON nor the names of its contributors may be
 * used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';

var _ = require('lodash');
var debug = require('debug')('testium-cookie');

function encode(string) {
  return new Buffer(string).toString('base64');
}

function decode(value) {
  return new Buffer(value, 'base64').toString('utf8');
}

function encodeMetaData(headers, statusCode) {
  var jsonData = JSON.stringify({
    headers: headers,
    statusCode: statusCode,
  });
  var encodedData = encode(jsonData);
  return encodedData;
}
exports.encodeMetaData = encodeMetaData;

function buildCookie(headers, statusCode) {
  return '_testium_=' + encodeMetaData(headers, statusCode) + '; path=/';
}

function modifyResponse(response) {
  var headers = response.headers = response.headers || {};

  // This relies on the fact that the existing headers are all lower-cased
  headers['Set-Cookie'] = buildCookie(headers, response.statusCode);
  debug('Set-Cookie: %s', headers['Set-Cookie']);

  if (headers['cache-control']) {
    debug('dropping original cache-control', headers['cache-control']);
  }
  headers['cache-control'] = 'no-store';

  if (response.statusCode >= 400) {
    // force to 200 because phantomjs doesn't like
    // 400 and 500 status codes when taking screenshots
    debug('forcing status code from %s to 200', response.statusCode);
    response.statusCode = 200;
  }

  return response;
}
exports.modifyResponse = modifyResponse;

function tryParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    error.message = [
      'Unable to parse JSON: ' + error.message,
      'Attempted to parse: ' + jsonString,
    ].join('\n');
    throw error;
  }
}

function parseTestiumCookie(cookie) {
  var json = decode(typeof cookie === 'string' ? cookie : cookie.value);
  return tryParse(json);
}

function getTestiumCookie(cookies) {
  // Gracefully handles the result of cookie.parse and an array of cookie objects
  var testiumCookie = cookies._testium_ || _.find(cookies, { name: '_testium_' });

  if (!testiumCookie) {
    throw new Error('Unable to communicate with internal proxy. Make sure you are using relative paths.');
  }

  return parseTestiumCookie(testiumCookie);
}
exports.getTestiumCookie = getTestiumCookie;
