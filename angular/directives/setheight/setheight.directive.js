/**
 * @Author: eipex
 * @Date:   2017-06-24T17:53:00-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-06-24T18:24:37-05:00
 */



class SetheightController{
    constructor($window){
        'ngInject';

        this.$window = $window
    }
}

export function SetheightDirective(){
    return {
        controller: SetheightController,
        link: function(scope, element, attrs, controllers){
            console.log($window.innerHeight)
            element.css('height', 500);
        }
    }
}
