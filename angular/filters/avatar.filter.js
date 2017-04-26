/**
 * @Author: eipex
 * @Date:   2017-04-25T21:35:57-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-04-25T22:07:38-05:00
 */



export function AvatarFilter(UserService){
    'ngInject';

    return function( input ){

      if(input && UserService.user){
        //if sender is current user return recipient info else return sender info
        if(input.sender_id === UserService.user.id){
          return "/uploads/avatars/"+input.recipient.avatar;
        }else{
          return "/uploads/avatars/"+input.sender.avatar;
        }
      }else{
        return  "/uploads/avatars/avatar-5.png";
      }

    }
}
