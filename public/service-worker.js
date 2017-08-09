/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/build/css/final-39a33fefef.css","39a33fefef0b83f0477f397e08b664cd"],["/build/css/final-6768ede57d.css","6768ede57ddb9b94fa4571467ea4181d"],["/build/css/final-b19224b40e.css","b19224b40ebbf5fb4762e6747e6a2c8d"],["/fonts/lato-light-webfont.woff","e5e4b3f473d181b71511eb75f07a3ecd"],["/fonts/lato-light-webfont.woff2","eeb3756bfdce23dc6f56f66c0ff95527"],["/fonts/lato-regular-webfont.woff","846ec700685b22ae84c645991990793e"],["/fonts/lato-regular-webfont.woff2","73436c973bb773094a508fdd4bb78af9"],["/img/assets/images/avatars/avatar-1.png","b40e2b856ae534f8c8ec66a23c7d3e0f"],["/img/assets/images/avatars/avatar-2.png","12cbcc540abe6af041f09269d052aff2"],["/img/assets/images/avatars/avatar-3.png","65727e170489408a818245f95904bf39"],["/img/assets/images/avatars/avatar-4.png","0182d2fb093b4b37f11489db2d646a0f"],["/img/assets/images/avatars/avatar-6.png","67daaeda2f47336fad53def215f463cc"],["/img/assets/images/avatars/avatar-big.png","fa1dc64b795db6a1cb7fa3eaebda1beb"],["/img/assets/images/avatars/hair-black-eyes-blue-green-skin-tanned.png","46cc95d4af72db200367edee2fcdaff7"],["/img/assets/images/avatars/hair-black-eyes-brown-skin-dark.png","59ebc1f29cc5a6e5708e441bd0beaf37"],["/img/assets/images/avatars/hair-black-eyes-brown-skin-tanned-2.png","2996a9f7e9c88fa15668cc83c0f4dc14"],["/img/assets/images/avatars/hair-black-eyes-brown-skin-tanned.png","9ca290a4ddc89837fa3a51a35f61e756"],["/img/assets/images/avatars/hair-black-eyes-dark-skin-dark.png","0a2f6c538b1c267fa178ddb3ef4d327f"],["/img/assets/images/avatars/hair-blonde-eyes-blue-green-skin-light.png","5dab6fdd2deb55a30935c49dc59866fd"],["/img/assets/images/avatars/hair-blonde-eyes-brown-skin-light.png","1d7919a9be4f7b20d77060637e7187fb"],["/img/assets/images/avatars/hair-blonde-eyes-brown-skin-tanned.png","31e134538da36863b5839b06602e5f80"],["/img/assets/images/avatars/hair-grey-eyes-dark-skin-tanned.png","e33313b11c584dc070e8cb073389a5fa"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-01.jpg","71441ccb0489cad68541924354204a51"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-02.jpg","a875ce768c018e22ab3be77fa28302f4"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-03.jpg","eac5fd973260b6057215d5b777bba8d4"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-04.jpg","091f8e2ae3246879101bf5a40b53eb84"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-05.jpg","450fba429a25d4c9ffb6da8e59ffbee5"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-06.jpg","9ad5b57f91226180c940183ec275aad1"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-07.jpg","f5b1df3401fa6dc4b56f441d823dd2af"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-08.jpg","a3699f9df08ff47fb520b45fd5dec564"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-09.jpg","060537961bd0b579e4f32ba687d4293a"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-10.jpg","cdb85f5c8c560cb566853f85d085045b"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-11.jpg","9a2c7e9955ef117b878941cdeb9f690e"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-12.jpg","dfeabc9cdcab4ed570f02ad4e2205e51"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-13.jpg","a87d2ee72541c189172483201c6379b4"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-14.jpg","48b2a80bb1e0bb612ba92f2794fc394e"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-15.jpg","7e55e6dc7d7af55d438815ad9d2f6d59"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-16.jpg","10f54544a182569d936e6f4d236f3a58"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-17.jpg","f0bd15ee66f772aa7bde7f2584a9a7f7"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-18.jpg","63acc3b5cc93f409658b9f3c351c0328"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-19.jpg","bf0f83bb0505daecbfb072a5d3c66c05"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-20.jpg","b8fc6da8702cb1fa662821cd95a258b0"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-21.jpg","7d9ee7275543f6b97409c6d28e5d55d3"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-22.jpg","cfb155a7b165e744e435fecb45a12bed"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-23.jpg","a42e63fd641616caf8e753d983db55ed"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-24.jpg","5cb09b2c4d6e7d4fddf70998ebf48afd"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-25.jpg","90ea9ee444ee6625c9b10532d1d68cee"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-26.jpg","d4ac6bca79c7e9fcea7cfc27271ce7ed"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-27.jpg","4c131452808317e6bb55a82f350d16a4"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-28.jpg","32a50f5f03305891d3fda307eacd4a02"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-29.jpg","eb82bc27fce77583441e7e7eeaa95fa4"],["/img/assets/images/backgrounds/material-backgrounds-2/mb-bg-fb-30.jpg","67f6e7d21013def32b9365cd1d0eeb5b"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-01.jpg","fc40d1d8add84d1df1a4271b5bc949dd"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-02.jpg","5254e9eaf4cb216dface765452630e9c"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-03.jpg","43c985e84ea8bd001a9164d2cdf3d161"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-04.jpg","cc69c29a0380d35053015d984468b6d8"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-05.jpg","9c12447fa322501fd6753155428c4037"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-06.jpg","d9d94e34799f41ca8ac81b912a098b3b"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-07.jpg","edd93103c71cc58ba746d538de2209de"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-08.jpg","6df274d2cca72be7f72ade98b5d7ae9a"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-09.jpg","71252709e0391606b944334162cd34f4"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-10.jpg","972a08f29adc0467f7d817962ee6b4b4"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-11.jpg","22a60025664d40d7dac34f9ddf0ca960"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-12.jpg","10fd952fe4c1657e1c73010543394e77"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-13.jpg","0979a1adf4447c634050ef69a4e3c2d4"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-14.jpg","bfb0cad7005be9e0800f6ff8eb256f23"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-15.jpg","6b9d60c6d6743bae57d39cfb226d6650"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-16.jpg","3098891a36bd205d8c219fd58937e0b8"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-17.jpg","223ba54ae8cb797a35608f6582591aac"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-18.jpg","7277fb1a1352e70f10b0197189056fa8"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-19.jpg","0cca358ee2dfa3ed3ccca56ed929a44e"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-20.jpg","71c579cb998e62ba489ff0a235d3c0b8"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-21.jpg","cfda14cf36610d6e62bb1dead5b2160a"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-22.jpg","cff714d45d6d5e88aab3bce66fa23046"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-23.jpg","120d84eb90d0c1109a6ebf03df4eec4f"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-24.jpg","50f05c3b28ea55b90d1a2752bbc8a2da"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-25.jpg","6f2426cb2162cc1743143b0833b27e68"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-26.jpg","8fdfef51588fba1b5416e8b11fd3b2f8"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-27.jpg","e0960f0773161c77c2ad2f2d71be05bd"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-28.jpg","1720abf9a1a92eb9b274d6d36c21826b"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-29.jpg","af5f8afcf6bd535271868e2213c3bcc1"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-30.jpg","582f8d9fd3de665e62ba9abc44d7736f"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-31.jpg","93e5abaa0e80d8aa259a81d9e04eb2cd"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-32.jpg","30c16182b6383fbd204f399025de2a07"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-33.jpg","a687b751e471408e96643b778650127f"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-34.jpg","6df48c47fc9fa1d334afcabdcf045d6c"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-35.jpg","9cfe386524637ad4fa2ab0abdcda1c17"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-36.jpg","371d7938be9c3d842fafd5ada3f89ab9"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-37.jpg","78acbabfacc56bab40ed6ec79beaf40c"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-38.jpg","6b87d1b092a2160c0e95a7b72018771f"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-39.jpg","e6392edc14749631ea5610fd145d1f3d"],["/img/assets/images/backgrounds/material-backgrounds/mb-bg-40.jpg","a1292b732a5b7835de450327c9bc9025"],["/img/assets/images/backgrounds/photos/logotypes.jpg","63f514e8afb140337f273b4b72061642"],["/img/assets/images/calendar/1.jpg","89b4d9a9daf9bae1df975351f2b986c8"],["/img/assets/images/calendar/10.jpg","0fefeb24d89ebf07f7fbc670282b86bc"],["/img/assets/images/calendar/11.jpg","ca1650319eea2432c5509a86c7670cfb"],["/img/assets/images/calendar/12.jpg","a74bb6477f3ebc8cc22efb7f74572b72"],["/img/assets/images/calendar/2.jpg","c38aded093afa3a9dd46a22a9c0b2e3f"],["/img/assets/images/calendar/3.jpg","4ac4c510eeb3442f7eb40c8f64280e51"],["/img/assets/images/calendar/4.jpg","d3cc042a3cfe24bf4c02d3a271fe3476"],["/img/assets/images/calendar/5.jpg","d13e009476a72c30acf8dc83d14eef29"],["/img/assets/images/calendar/6.jpg","51f7849c6777eec769a6e39b25d98e69"],["/img/assets/images/calendar/7.jpg","ccc831f74022fa0794608929f4360168"],["/img/assets/images/calendar/8.jpg","70a07b2806e2d7026ee872e37c1e3148"],["/img/assets/images/calendar/9.jpg","2833d6b61bd467011a7c0d6e11462dd7"],["/img/assets/images/dashboards/tweet.jpg","52e7028bbead70d8286e65459c26d45d"],["/img/assets/images/dashboards/weather.jpg","1821b88081808896d6d963503bf02646"],["/img/assets/images/elements/fab.png","87e65300466e71c64ce76bf862178c6d"],["/img/assets/images/font/material-font-0.png","80f368532605fe4ffcb5fa23a26a34e3"],["/img/assets/images/font/material-font-1.png","44301b471b4318af192cf9ad4b804df6"],["/img/assets/images/font/material-font-4.png","820f916b3d9f3b07216b08c90dcea46a"],["/img/assets/images/font/material-font-5.png","b7f43f567abefbf3d6fd2cb4f208b615"],["/img/assets/images/logo.png","5520a7cf784c7a9beac3028115b35f4a"],["/img/assets/images/maps/blue_marker.png","b0d11173a23556b4da3db3d5ab59f251"],["/img/cover.jpg","663c637c9a53da423260d738aae89fd0"],["/img/icon.png","7803e776ea4a6133c2cc17479b904447"],["/img/icons/angular-generators.svg","8332f6acb165cbd6946eaa986af903bc"],["/img/icons/elixir.svg","cbee7e251a32f42752f376e641e6920d"],["/img/icons/folder-byfeature.svg","9c3875c4465ac6fd4618e6a03ddecd1d"],["/img/icons/json-webtoken.svg","cd52d5a3fd4a668a7e24ba3f549d1260"],["/img/icons/logo-grey.svg","1134d1377b245a40089571f94cca67c4"],["/img/icons/logo.svg","4417721be495be1a65ad7cd622ea958c"],["/img/icons/restful-api.svg","c49ec241782187c2f27e6469913901e2"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get("'/'", toolbox.cacheFirst, {});
toolbox.router.get("'https://fonts.googleapis.com/'", toolbox.cacheFirst, {});
toolbox.router.get("'https://fonts.gstatic.com/'", toolbox.cacheFirst, {});
toolbox.router.get("'https://ghbtns.com/'", toolbox.cacheFirst, {});




