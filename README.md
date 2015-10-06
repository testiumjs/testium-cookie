# testium-cookie

WebDriver does not return status codes or response headers.
This module stores those in a special cookie that can be read
from normal WebDriver methods.

## modifyResponse(res)

Modifies an existing node http response to inject the `_testium_` cookie.

## getTestiumCookie(cookies)

Takes either a cookie dictionary or a list of cookie objects and extracts the `_testium_` meta data. It returns an object with a `headers` and a `statusCode` property.
