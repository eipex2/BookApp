/**
 * @Author: eipex
 * @Date:   2017-04-25T10:36:02-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-04-26T01:51:23-05:00
 */



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
      return this.API.one('chat/get_conversations').get()
    }

    /**
     * getConversation get conversation between this user and other user
     * @param  {object} data request data
     * @return {promise}     promise of data
     */
    getConversation(data){
      return this.API.all('chat/get_conversation').post(data)
    }


    /**
     * send message
     * @param  {object} data request data
     */
    sendMessage(data){
      return this.API.all('chat/sendmessage').post(data)
    }

    /**
     * getOtherUser get other user involved in conversation
     * @param  {object} convo conversation object
     * @return {object}       user info
     */
    getOtherUser(convo){
      if(convo.sender_id === this.UserService.user.id){
        return {
          id: convo.recipient_id,
          firstname: convo.recipient.firstname,
          lastname: convo.recipient.lastname,
          avatar: convo.recipient.avatar
        }
      }else{
        return {
          id: convo.sender_id,
          firstname: convo.sender.firstname,
          lastname: convo.sender.lastname,
          avatar: convo.sender.avatar
        }
      }
    }

    /**
     * getConvoAvatar get avatar of other user
     * @param  {object} convo conversation object
     * @return {string}       avatar url
     */
    getConvoAvatar(convo){
      if(convo && this.UserService.user){
        //if sender is current user return recipient info else return sender info
        if(convo.sender_id === this.UserService.user.id){
          return "/uploads/avatars/"+convo.recipient.avatar;
        }else{
          return "/uploads/avatars/"+convo.sender.avatar;
        }
      }else{
        return  "/uploads/avatars/avatar-5.png";
      }
    }
}
