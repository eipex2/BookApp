/**
 * @Author: eipex
 * @Date:   2017-05-19T14:29:55-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-06-13T15:46:11-05:00
 */

//TODO: need to add pagination for loading pages lol. Load last 10 pages

export class CourseService{
    constructor(API){
        'ngInject';

        this.API = API;
    }

    getCourse(course_id){
      return this.API.one('course/'+course_id).get();
    }

    getCourses(){
      return this.API.one('courses').get();
    }

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
