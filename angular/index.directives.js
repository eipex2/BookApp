
/**
 * @Author: eipex
 * @Date:   2016-12-01T13:46:23-06:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-06-25T15:01:30-05:00
 */



import {RepeatDoneDirective} from './directives/repeat-done/repeat-done.directive';


angular.module('app.directives')
	.directive('setheight', ['$window', '$interval',function($window,$interval){
		return {
        link: function(scope, element, attrs, controllers){
						//perform height calculation at a 1s interval once lol :D
						$interval(function () {
							element.css('height', element.parent().innerHeight()-attrs.setheight);
						}, 1,[1]);

						//perform height calculation when screen changes size :)
						angular.element($window).bind('resize', function(){
							$interval(function () {
						 	element.css('height', element.parent().innerHeight()-attrs.setheight);
						 }, 1,[1]);

			         scope.$digest();
			       });
        }
    }
	}])
	// .directive('scrollToBottom', ['$timeout',function($timeout){
	// 	return {
  //       restrict: 'A',
  //       scope: {
  //                 scrollToBottom: "="
  //             },
  //       link: function(scope, element){
  //         scope.$watchCollection('scrollToBottom', function(newVal) {
  //             if (newVal) {
	// 							$timeout(function() {
	// 									element[0].scrollTop =  element[0].scrollHeight;
	// 							}, 0);
  //             }
  //         });
  //       }
  //   }
	// }])
	.directive('repeatDone', RepeatDoneDirective)
