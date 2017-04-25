export function ConvoUsernameFilter(UserService){
    'ngInject';

    return function( input ){
      if(input && UserService.user){
        //if sender is current user return recipient info else return sender info
        if(input.sender_id === UserService.user.id){
          return input.recipient.firstname + ' ' + input.recipient.lastname;
        }else{
          return input.sender.firstname + ' ' + input.sender.lastname
        }
      }else{
        return
      }
    }
}
