class RentComponentController{
    constructor($mdDialog,$scope){
        'ngInject';

        //
        this.$mdDialog = $mdDialog;
        this.$scope = $scope;
    }

    $onInit(){

    }

    hide() {
      this.$mdDialog.hide();
    }

    cancel() {
      this.$mdDialog.cancel();
    }

    rent(){
      var dates = {
        start_date:this.start_date,
        end_date: this.end_date
      }
      this.$mdDialog.hide(dates);
    }
}

export const RentComponentComponent = {
    templateUrl: './views/app/components/rent_component/rent_component.component.html',
    controller: RentComponentController,
    controllerAs: 'vm',
    bindings: {
      listing: '<'
    }
}
