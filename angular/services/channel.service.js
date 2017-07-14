/**
 * @Author: eipex
 * @Date:   2017-07-06T16:32:18-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-13T14:40:31-05:00
 */



export class ChannelService{
    constructor(API, $state){
        'ngInject';

        this.API = API;
        this.$state = $state;
    }

    // createOne(){
    //   this.$state.go('app.create')
    // }

    loadChannel(channel){
      this.$state.go('app.channel',{id:channel.id})
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

    getUserChannels(){
      return this.API.one('user_channels').get();
    }

    getPage(page_id){
      return this.API.one('page/'+page_id).get();
    }

    savePage(data){
      return this.API.all('page/store_page').post(data);
    }
}
