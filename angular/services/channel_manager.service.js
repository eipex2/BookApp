/**
 * @Author: eipex
 * @Date:   2017-04-26T09:25:11-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-05-06T10:53:31-05:00
 */



export class ChannelManagerService{
    constructor($window, $pusher,UserService){
        'ngInject';

        this.$pusher = $pusher;
        this.UserService = UserService;
        this.token = $window.localStorage.satellizer_token;
        this.subscribe();
    }

    getChannel(){
      return this.channel
    }

    subscribe(){
        var channel = 'private-App.User.'+   this.UserService.user.id;
        var client = new Pusher("ce3fa38e9d0d49f542ba",{
          encrypted: true,
          authEndpoint: "/broadcasting/auth",
          auth: {
            headers: {
              'Authorization': 'Bearer ' + this.token
            }
          }
        })

        var pusher = this.$pusher(client);

        this.channel = pusher.subscribe(channel);
    }
}
