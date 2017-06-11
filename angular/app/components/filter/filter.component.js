/**
 * @Author: eipex
 * @Date:   2017-06-09T11:42:32-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-06-11T09:33:53-05:00
 */



class FilterController{
    constructor(CourseService){
        'ngInject';

        this.CourseService = CourseService;
        CourseService.getOfferedCourses().then((response)=>{
          console.log(response);
        })
    }

    $onInit(){
      this.courses = [
        'Calculus',
        'English'
      ]


    }
}

export const FilterComponent = {
    templateUrl: './views/app/components/filter/filter.component.html',
    controller: FilterController,
    controllerAs: 'vm',
    bindings: {
      'user':'<'
    }
}
