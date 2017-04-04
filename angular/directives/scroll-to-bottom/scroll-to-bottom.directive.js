class ScrollToBottomController{
    constructor($timeout, $element,$anchorScroll){
        'ngInject';

        this.$timeout = $timeout;
        this.$element = $element;
        this.$anchorScroll = $anchorScroll;
    }

    scroll(){
      console.log(element);
    }
}

export function ScrollToBottomDirective($interval){
    return {
        restrict: 'A',
        scope: {
                  scrollToBottom: "="
              },
        controller: ScrollToBottomController,
        link: function(scope, element, attrs, controllers, $interval){
          //controllers.scroll(element);
          // window.setTimeout(function() {
          //     console.log('km')
          //     element[0].scrollTop =  element[0].scrollHeight;
          // }, 0);
          // scope.$watchCollection('scrollToBottom', ['$interval',function(newVal) {
          //     if (newVal) {
          //
          //     }
          // }]);
        }
    }
}
