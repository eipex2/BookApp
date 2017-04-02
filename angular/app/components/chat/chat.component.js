class ChatController{
    constructor(API, ToastService, $mdSidenav){
        'ngInject';

        this.API = API;
        this.ToastService = ToastService;
        this.$mdSidenav = $mdSidenav

    }

    $onInit(){

    }

    closeContacts(){
      this.$mdSidenav("contacts-sidenav")
       .close()
    }

    toggleContacts(){
      this.$mdSidenav("contacts-sidenav")
       .toggle()
    }

    toggleExchange(){
      this.$mdSidenav("exchange-sidenav")
       .toggle()
    }

    nonSelected(){
      return this.currentRecipient?true:false;
    }

    getUserConversation(messenger){
      //console.log(messenger);
      var vm = this;
      vm.currentRecipient = messenger.sender
      var data = {
        recipient:messenger.sender.id
      }
      this.API.all('chat/getuserconversation').post(data).then((response) => {
          vm.currentConversation = response.data.conversation;
      });
    }


    sendMessage(){
      this.submitMessage();
    }

    //handles key pressed
    sendMessageKey($event){
      if($event.key === "Enter"){
        this.submitMessage();
      }
    }

    //TODO: implement callbacks for messages not sent
    submitMessage(){
      var data = {
        recipient: this.currentRecipient.id,
        message: this.message
      }

      this.API.all('chat/sendmessage').post(data).then((response) => {
          console.log(response);
          this.message = '';
          This.ToastService.show("Message sent")
      },(error)=>{

      })
    }
}

export const ChatComponent = {
    templateUrl: './views/app/components/chat/chat.component.html',
    controller: ChatController,
    controllerAs: 'vm',
    bindings: {
      messages:'<messages',
      currentUser:'<currentUser'
    }
}
