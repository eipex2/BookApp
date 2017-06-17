/**
 * @Author: eipex
 * @Date:   2017-06-12T16:29:06-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-06-16T02:42:25-05:00
 */



export class ActivityService{
    constructor(API)
    {
        'ngInject';

        this.API = API;
    }

    /**
     * save an activity
     * data = {courese_id: $var, page_no:$var}
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    save(data)
    {
      return this.API.all('activity/store').post(data);
    }

    /**
     * get user's activities in relation to this course
     * @param  {[type]} course_id [description]
     * @return {[type]}           [description]
     */
    getActivities(course_id){
      return this.API.one('activities/'+course_id).get();
    }

    /**
     * get the page no to be displayed
     * @param  {[type]} activities [description]
     * @return {[type]}            [description]
     */
    getPageNo(course, activities){

      if(activities.length === 0){
        //create a new activity with the current page set to 1
        var data = {
          course_id:course.id,
          page_no: 1
        }

        //save activity
        this.save(data);

        //return index of first page
        return 0;
      }else{
        //get the last activity and return the page_no + 1 and create a new activity object
        var last_activity = activities[activities.length-1]

        //return the page_no of the last page viewed to be used as the index in the pages array
        return last_activity.page_no
      }
    }
}
