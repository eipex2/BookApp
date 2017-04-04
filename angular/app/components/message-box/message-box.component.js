class MessageBoxController{
    constructor($window){
        'ngInject';
        this.$window = $window;

    }

    $onInit(){
      this.messageWindowHeight = parseInt(this.$window.innerHeight - 155) + 'px';
    }

    listDidRender(){

    }
}

export const MessageBoxComponent = {
    templateUrl: './views/app/components/message-box/message-box.component.html',
    controller: MessageBoxController,
    controllerAs: 'vm',
    bindings: {
      messages: '<'
    }
}
