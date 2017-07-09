/**
 * @Author: eipex
 * @Date:   2017-07-06T16:32:18-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-07T11:05:32-05:00
 */



export class ChannelService{
    constructor(API){
        'ngInject';

        this.API = API;
    }

    saveChannel(data){
      return this.API.all('channel/store').post(data);
    }

    getChannel(id){
      return this.API.one('channel/'+id).get();
    }

    getChannels(){
      return this.API.one('channels').get();
    }
}
