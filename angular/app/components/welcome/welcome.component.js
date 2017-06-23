/**
 * @Author: eipex
 * @Date:   2017-06-05T09:54:07-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-06-20T16:53:39-05:00
 */



class WelcomeController{
    constructor($state){
        'ngInject';

        this.$state = $state;
    }

    $onInit(){

    }

    create_page(){
      this.$state.go('app.create_page');
    }

    loadCourse(course){
      this.$state.go('app.landing',{course_id:course.id})
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
