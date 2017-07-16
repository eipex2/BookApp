/**
 * @Author: eipex
 * @Date:   2017-07-11T16:32:51-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-15T07:54:48-05:00
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
        // template:'<span style="font-size:24px">{{value}}</span>',
        template:'<div class="countdown"> \
                    <div class="countdown-number">{{value}}</div> \
                    <svg class="time_svg"> \
                      <circle r="18" cx="20" cy="20"></circle> \
                    </svg> \
                  </div>',
        scope:{
          'created':'<'
        },
        restrict:'E',
        link: function(scope, element){

            var current_time = new Date()

            if(scope.created){

              //split date string
              var a = scope.created.split(/[^0-9]/);

              //convert time from UTC to local
              var created_at = new Date (Date.UTC(a[0],a[1]-1,a[2],a[3],a[4],a[5]));

              //calc time difference
              var time_diff = Math.abs((current_time.getTime()-created_at.getTime())/1000)

              //calc remaining hours and minutes before page expires
              var time_left_hours = 24 - Math.ceil(time_diff/3600)
              var time_left_minutes = 60 -  Math.ceil(time_diff/60)


              //set value
              scope.value = time_left_hours > 1 ? time_left_hours : time_left_minutes  ;
              //set color
              scope.color = time_left_hours > 1 ? 'teal' : '#d9534f';
              //set offset for svg circle
              var offset = 113 - Math.abs((time_left_hours/24) * 113) + 'px'

              //apply styles
              element.css('stroke-dashoffset', offset);
              element.css('stroke', scope.color);
              element.css('color', scope.color);
            }

        }
    }
}
