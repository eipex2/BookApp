class RepeatDoneController{
    constructor($scope,$element, $attrs){
        'ngInject';

    }
}

export function RepeatDoneDirective(){
    return {
        controller: RepeatDoneController,
        restrict: 'A',
        link: function(scope, element, attrs, controllers){
          if (scope.$last) {
            scope.$eval(attrs.repeatDone);
          }
        }
    }
}
