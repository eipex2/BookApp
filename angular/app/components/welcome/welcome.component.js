/**
 * @Author: eipex
 * @Date:   2017-06-05T09:54:07-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-06-29T13:07:55-05:00
 */



class WelcomeController{
    constructor($state, CourseService){
        'ngInject';

        this.$state = $state;
        this.CourseService = CourseService;
    }

    $onInit(){

    }

    create_page(){
      this.$state.go('app.create_page');
    }

    loadCourse(course){
      this.CourseService.loadCourse(course);
    }

    empty(){
      return this.courses.length === 0;
    }
}

export const WelcomeComponent = {
    templateUrl: './views/app/components/welcome/welcome.component.html',
    controller: WelcomeController,
    controllerAs: 'vm',
    bindings: {
      'user':'<',
      'courses':'<'
    }
}
