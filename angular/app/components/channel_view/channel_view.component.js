/**
 * @Author: eipex
 * @Date:   2017-07-06T20:42:35-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-13T21:01:30-05:00
 */



class ChannelViewController{
    constructor($state){
        'ngInject';

        this.$state = $state

    }

    $onInit(){

      //handle channel response data
      this.type = this.channelRes.data.type
      switch(  this.type){
        //show channel dashboard if user owns channel
        case 'channel':
          this.channel = this.channelRes.data.channel
          break;
        //show page if other user
        case 'page':
          this.page = this.channelRes.data.page
          break;
        //handle expired
        default:
          break;
      }

      //
      // if(this.channel){
      //
      // }
    }

    toPage(page){
      this.$state.go('app.landing',{page_id:page.id})
    }

    createPage(){
      this.$state.go('app.create_page', {id:this.channel.id});
    }

    empty(){
      if(this.channel){
        return this.channel.pages.length === 0;
      }

      return
    }
}

export const ChannelViewComponent = {
    templateUrl: './views/app/components/channel_view/channel_view.component.html',
    controller: ChannelViewController,
    controllerAs: 'vm',
    bindings: {
      'user':'<',
      'channelRes': '<'
    }
}
