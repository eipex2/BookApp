/**
 * @Author: eipex
 * @Date:   2017-06-20T20:45:30-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-06-20T20:56:44-05:00
 */



class SidenavController{
    constructor( $state){
        'ngInject';

        this.$state = $state;
    }

    $onInit(){
    }

    loadCourse(course){
      this.$state.go('app.landing',{course_id:course.id}, {reload:"app.landing"})
    }

    createPage(){
        this.$state.go('app.create_page', {});
    }
}

export const SidenavComponent = {
    templateUrl: './views/app/components/sidenav/sidenav.component.html',
    controller: SidenavController,
    controllerAs: 'vm',
    bindings: {
      'user':'<',
      'courses':'<'
    }
}
