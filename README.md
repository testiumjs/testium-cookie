[![nlm-chat](https://img.shields.io/badge/chat-http%3A%2F%2Fsignup.testiumjs.com%2F-F4D03F?logo=chat&logoColor=white)](http://signup.testiumjs.com/)
[![nlm-github](https://img.shields.io/badge/github-testiumjs%2Ftestium--cookie%2Fissues-F4D03F?logo=github&logoColor=white)](https://github.com/testiumjs/testium-cookie/issues)
![nlm-node](https://img.shields.io/badge/node-%3E%3D10.13-blue?logo=node.js&logoColor=white)
![nlm-version](https://img.shields.io/badge/version-2.0.3-blue?logo=version&logoColor=white)
# testium-cookie [![Build Status](https://travis-ci.org/testiumjs/testium-cookie.svg?branch=main)](https://travis-ci.org/testiumjs/testium-cookie)

WebDriver does not return status codes or response headers.
This module stores those in a special cookie that can be read
from normal WebDriver methods.

This project is a safe and inclusive place
for contributors of all kinds.
See the [Code of Conduct](CODE_OF_CONDUCT.md)
for details.

## modifyResponse(res)

Modifies an existing node http response to inject the `_testium_` cookie.

## getTestiumCookie(cookies)

Takes either a cookie dictionary or a list of cookie objects and extracts the `_testium_` meta data. It returns an object with a `headers` and a `statusCode` property.
