/**
 * @Author: eipex
 * @Date:   2017-07-14T22:56:46-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-15T01:44:14-05:00
 */



export class SubscriptionService{
    constructor(API){
        'ngInject';

        this.API = API
    }

    saveSubscription(data){
      return this.API.all('subscription/store').post(data);
    }

    getUserSubscriptions(){
      return this.API.one('user_subcriptions').get();
    }
}
