/**
 * @Author: eipex
 * @Date:   2017-04-25T12:31:27-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-04-25T12:32:34-05:00
 */



export function UsernameFilter(){
    'ngInject';

    return function(input){
      //if input is defined return firstname and lastname else return an empty string
      return input? input.firstname + ' ' +input.lastname : ''
    }
}
