/**
 * @Author: eipex
 * @Date:   2017-03-29T07:32:33-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-04-25T22:40:03-05:00
 */



//import * as moment from 'moment-timezone';

angular.module('app', [
    'app.run',
	'app.filters',
	'app.services',
	'app.components',
    'app.directives',
	'app.routes',
	'app.config',
])

angular.module('app.run', []);
angular.module('app.routes', []);
angular.module('app.filters', []);
angular.module('app.services', []);
angular.module('app.config', []);
angular.module('app.directives', []);
angular.module('app.components', [
	'ui.router', 'ngMaterial', 'ngAnimate','angular-loading-bar','pusher-angular',
	'restangular', 'ngStorage', 'satellizer','ngFileUpload','ngRateIt','angularMoment','wu.masonry','materialCalendar','luegg.directives'
])
//.constant('moment', moment);
