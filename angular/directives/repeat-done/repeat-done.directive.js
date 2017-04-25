class RepeatDoneController{
    constructor(){
        'ngInject';

    }
}

export function RepeatDoneDirective(){
    return {
        controller: RepeatDoneController,
        restrict: 'A',
        link: function(scope, element, attrs){
          if (scope.$last) {
            scope.$eval(attrs.repeatDone);
          }
        }
    }
}
