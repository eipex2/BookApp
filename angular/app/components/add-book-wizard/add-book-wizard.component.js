export class AddBookWizardController{
    constructor($timeout,API, ToastService, $state){
        'ngInject';

        this.forms = [];
        this.totalRequiredFields = 0;
        this.currentStep = 0;
        this.progress = 0;
        this.$timeout = $timeout;
        this.API = API;
        this.ToastService = ToastService;
        this.$state = $state;
    }

    $onInit(){
      this.isbn = "";
      this.rentPrice = 0;
      this.buyPrice = 0;
      this.book = {};

    }

    nextStep() {
        //get book info after first step
        if(this.currentStep === 0){
          var vm = this;
          this.API.one('googlebooks/' + this.isbn).get().then(function(response){
             vm.book = response;
             console.log(response);
             vm.googleDone = true;
          });
        }
        this.currentStep = this.currentStep + 1;
    }

    nextStepDisabled() {
        if(this.currentStep === 0){
          return this.isbn? false : true;
        }else if(this.currentStep === 1){
          return this.rentPrice && this.buyPrice? false : true;
        }
    }

    tabDisabled(tab){
      if(tab === 1){
        return this.isbn? false : true;
      }else if(tab === 2){
        return this.rentPrice || this.buyPrice? false :true;
      }
      // if(this.currentStep === 2){
      //   return true;
      // }
    }

    prevStep() {
        this.currentStep = this.currentStep - 1;
    }

    submit(){
      var data = {
          isbn: this.isbn,
          title: this.book.title,
          category: this.book.categories,
          thumbnail: this.book.thumbnail,
          rentPrice: this.rentPrice,
          buyPrice: this.buyPrice
      };

      this.API.all('listings').post(data).then(() => {
          this.$state.go('app.landing', {}, {reload:true, inherit:false, notify:true});
          this.ToastService.show('Book added successfully');
      });
    }

}

export const AddBookWizardComponent = {
    templateUrl: './views/app/components/add-book-wizard/add-book-wizard.component.html',
    controller: AddBookWizardController,
    controllerAs: 'vm',
    bindings: {}
}
