/**
 * @Author: eipex
 * @Date:   2017-07-06T20:42:35-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-07T13:25:56-05:00
 */



class ChannelViewController{
    constructor(){
        'ngInject';

        //
    }

    $onInit(){
      console.log(this.channelRes)
      //this.channel = this.channelRes.data.channel
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
