/**
 * @Author: eipex
 * @Date:   2017-07-11T16:32:51-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-13T21:42:43-05:00
 */



class TimeLeftController{
    constructor(){
        'ngInject';

        //
    }
}

export function TimeLeftDirective(){
    return {
        controller: TimeLeftController,
        template:'<span style="font-size:24px">{{value}}</span>',
        scope:{
          'created':'<'
        },
        restrict:'E',
        link: function(scope, element){
            if(scope.created){
              var current_time = new Date()

              var dateParts = scope.created.split("-");
              var created_at2 = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
              console.log(scope.created)
              console.log(created_at2)
              var time_diff = Math.abs(created_at2 - current_time);

              var time_left = Math.ceil(86400 - time_diff) / 36e5;
              scope.value = time_left > 1 ? time_left : 1  ;
              scope.color = time_left > 3 ? 'teal' : 'red';
              element.css('color', scope.color);
            }
        }
    }
}
