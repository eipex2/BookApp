/**
 * @Author: eipex
 * @Date:   2017-06-09T11:42:32-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-06-20T11:20:06-05:00
 */



class FilterController{
    constructor(CourseService,$state){
        'ngInject';

        this.$state = $state;
        this.CourseService = CourseService;
        // CourseService.getOfferedCourses().then((response)=>{
        //   this.courses = response.data.courses;
        // })
    }

    $onInit(){

    }

    loadCourse(course){
      this.$state.go('app.landing',{course_id:course.id})
    }
}

export const FilterComponent = {
    templateUrl: './views/app/components/filter/filter.component.html',
    controller: FilterController,
    controllerAs: 'vm',
    bindings: {
      'user':'<',
      'courses':'<'
    }
}
