/**
 * @Author: eipex
 * @Date:   2017-07-06T20:42:35-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-08-02T13:34:30-05:00
 */



class ChannelViewController{
    constructor($state, SubscriptionService, ToastService, ChannelService, $stateParams){
        'ngInject';

        this.$state = $state
        this.SubscriptionService = SubscriptionService
        this.ToastService = ToastService;
        this.ChannelService = ChannelService;
        this.$stateParams = $stateParams;

    }

    $onInit(){
      this.edit = false;

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
          this.isSubscribed = this.channelRes.data.isSubscribed
          if(this.page === null){
            this.channel_name = this.channelRes.data.channel_name
            this.no_page = true
          }
          break;
        default:
          break;
      }

      //
      // if(this.channel){
      //
      // }
    }

    subcribe(){
      var data = {
        channel_id: this.$stateParams.id
      }

      this.SubscriptionService.saveSubscription(data).then(()=>{
        this.ToastService.show("You Subcribed");
        this.isSubscribed = true;
      })
    }

    toPage(page){
      this.$state.go('app.landing',{page_id:page.id})
    }

    createPage(){
      this.$state.go('app.create_page', {id:this.channel.id});
    }

    done(){
      this.edit = false;
      var data = {
        channel_id:this.channel.id,
        about: this.channel.about
      }
      this.ChannelService.updateAbout(data).then(()=>{
        this.ToastService.show("Channel updated")
      });
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
