/**
 * @Author: eipex
 * @Date:   2017-05-19T14:29:55-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-06-29T13:13:57-05:00
 */

//TODO: need to add pagination for loading pages lol. Load last 10 pages

export class CourseService{
    constructor(API, $state){
        'ngInject';

        this.API = API;
        this.$state = $state;
    }

    loadCourse(course){
      this.$state.go('app.landing',{course_id:course.id})
    }

    /**
     * gets course with the specified course id
     * @param  {[type]} course_id [id of course]
     * @return {[type]}           [description]
     */
    getCourse(course_id){
      return this.API.one('course/'+course_id).get();
    }

    /**
     * get courses created by this instructor
     * @return {[type]} [description]
     */
    getCourses(){
      return this.API.one('courses').get();
    }

    /**
     * get courses offered in student school
     * @return {[type]} [description]
     */
    getOfferedCourses(){
      return this.API.one('offered_courses').get()
    }

    saveCourse(data){
      return this.API.all('course/store_course').post(data);
    }

    getPage(data){
      return this.API.all('page/get_page').post(data);
    }

    savePage(data){
      return this.API.all('page/store_page').post(data);
    }
}
