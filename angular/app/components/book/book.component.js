class BookController{
    constructor(){
        'ngInject';

        //
    }

    $onInit(){
    }
}

export const BookComponent = {
    templateUrl: './views/app/components/book/book.component.html',
    controller: BookController,
    controllerAs: 'vm',
    bindings: {
      listing:'<'
    }
}
