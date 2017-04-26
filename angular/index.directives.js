/**
 * @Author: eipex
 * @Date:   2016-12-01T13:46:23-06:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-04-25T22:43:54-05:00
 */



import {RepeatDoneDirective} from './directives/repeat-done/repeat-done.directive';


angular.module('app.directives')
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
