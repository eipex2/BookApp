/**
 * @Author: eipex
 * @Date:   2017-04-26T09:25:11-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-12T17:52:14-05:00
 */



'use strict';

const elixir = require('laravel-elixir');

require('laravel-elixir-eslint');

require('./tasks/swPrecache.task.js');
require('./tasks/bower.task.js');

// setting assets paths
elixir.config.assetsPath = './';
elixir.config.css.folder = 'angular';
elixir.config.css.sass.folder = 'angular';
elixir.config.js.folder = 'angular';

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

 let assets = [
         'public/js/final.js',
         'public/css/final.css'
     ],
     scripts = [
         'public/js/vendor.js', 'public/js/app.js'
     ],
     styles = [
         // for some reason, ./ prefix here works fine!
         // it is needed to override elixir.config.css.folder for styles mixin
         './public/css/vendor.css', './public/css/app.css',
         './angular/material-design-iconic-font/css/material-design-iconic-font.css',
         './node_modules/quill/dist/quill.bubble.css',
         './node_modules/quill/dist/quill.core.css',
         './node_modules/quill/dist/quill.snow.css',

     ],
     karmaJsDir = [
         'public/js/vendor.js',
         'node_modules/angular-mocks/angular-mocks.js',
         'node_modules/ng-describe/dist/ng-describe.js',
         'node_modules/ng-quill/dist/quil.js',
         'node_modules/ng-quill/dist/ng-quil.js',
         'public/js/app.js',
         'tests/angular/**/*.spec.js'
     ];

elixir(mix => {
    mix.bower()
       .copy('angular/app/**/*.html', 'public/views/app/')
       .copy('angular/dialogs/**/*.html', 'public/views/dialogs/')

       .copy('angular/material-design-iconic-font/fonts/Material-Design-Iconic-Font.woff2',
        'public/build/fonts/Material-Design-Iconic-Font.woff2')

       .copy('angular/material-design-iconic-font/fonts/Material-Design-Iconic-Font.woff',
        'public/build/fonts/Material-Design-Iconic-Font.woff')

       .copy('angular/material-design-iconic-font/fonts/Material-Design-Iconic-Font.ttf',
        'public/build/fonts/Material-Design-Iconic-Font.ttf')

       .copy('angular/material-design-iconic-font/fonts/Material-Design-Iconic-Font.svg',
        'public/build/fonts/Material-Design-Iconic-Font.svg')

       .copy('angular/material-design-iconic-font/fonts/Material-Design-Iconic-Font.eot',
         'public/build/fonts/Material-Design-Iconic-Font.eot')

       .webpack('index.main.js', 'public/js/app.js')

       .sass(['**/*.scss', 'critical.scss'], 'public/css')
       .sass('critical.scss', 'public/css/critical.css')
       .styles(styles, 'public/css/final.css')
       .eslint('angular/**/*.js')
       .combine(scripts, 'public/js/final.js')
       .version(assets)
       .swPrecache();

       //enable front-end tests by adding the below task
       // .karma({jsDir: karmaJsDir});
});
