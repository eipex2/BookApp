import {ScrollToBottomDirective} from './directives/scroll-to-bottom/scroll-to-bottom.directive';
import {RepeatDoneDirective} from './directives/repeat-done/repeat-done.directive';


angular.module('app.directives')
	.directive('scrollToBottom', ['$timeout',function($timeout){
		return {
        restrict: 'A',
        scope: {
                  scrollToBottom: "="
              },
        link: function(scope, element, attrs, controllers){
          scope.$watchCollection('scrollToBottom', function(newVal) {
              if (newVal) {
								$timeout(function() {
										element[0].scrollTop =  element[0].scrollHeight;
								}, 0);
              }
          });
        }
    }
	}])
	.directive('repeatDone', RepeatDoneDirective)
