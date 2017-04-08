class MessageBoxController{
    constructor($window,$mdSidenav){
        'ngInject';
        this.$window = $window;
        this.$mdSidenav = $mdSidenav;

    }

    $onInit(){
      this.messageWindowHeight = parseInt(this.$window.innerHeight - 155) + 'px';
    }

    cloud(id){
      return this.currentuser.id === id;
    }

    listDidRender(){
      this.$mdSidenav("contacts-sidenav")
       .close()
    }
}

export const MessageBoxComponent = {
    templateUrl: './views/app/components/message-box/message-box.component.html',
    controller: MessageBoxController,
    controllerAs: 'vm',
    bindings: {
      messages: '<',
      currentuser: '<'
    }
}
