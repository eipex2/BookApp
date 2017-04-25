/**
 * ChatService handles all chat info and functions
 * @type {service}
 */
export class ChatService{
    constructor(API, UserService){
        'ngInject';

        this.API = API;
        this.UserService = UserService;
    }

    /**
     * getConversations gets conversations involving this user and other users
     * @return {promise} promise of data
     */
    getConversations(){
      var promise = this.API.one('chat/get_conversations')
      return promise
    }

    /**
     * getConversation get conversation between this user and other user
     * @param  {object} data request data
     * @return {promise}     promise of data
     */
    getConversation(data){
      var promise = this.API.all('chat/getuserconversation').post(data)
      return promise
    }

    getOtherUser(convo){
      var otherUserId;

      if(convo.sender_id === this.UserService.user.id){
        return {
          id: convo.recipient_id,
          firstname: convo.recipient.firstname,
          lastname: convo.recipient.lastname
        }
      }else{
        return {
          id: convo.sender_id,
          firstname: convo.sender.firstname,
          lastname: convo.sender.lastname
        }
      }
    }
}
