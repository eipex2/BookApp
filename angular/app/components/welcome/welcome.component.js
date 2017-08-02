/**
 * @Author: eipex
 * @Date:   2017-06-05T09:54:07-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-08-02T14:08:14-05:00
 */



class WelcomeController{
    constructor($state, ChannelService, $timeout, $q){
        'ngInject';

        this.$state = $state;
        this.create = true;
        this.ChannelService = ChannelService;
        //this.channels = this.loadAll();
        this.tags = [];

        this.$timeout = $timeout;
        this.$q = $q;
    }

    $onInit(){
      //console.log(this.channels);
    }

    /**
     * Search for channels... use $timeout to simulate
     * remote dataservice call.
     */
    querySearch (query) {
      var results = query ? this.channels.filter( this.createFilterFor(query) ) : this.channels,
          deferred;
      if (this.simulateQuery) {
        deferred = this.$q.defer();
        this.$timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    searchTextChange() {
      //console.log('Text changed to ' + text);
    }

    selectedItemChange(item) {
      this.$state.go('app.channel', {id:item.id})
    }

    /**
     * Create filter function for a query string
     */
    createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(channel) {
        return (channel.name.indexOf(lowercaseQuery) === 0);
      };

    }

    newState(searchText){
      this.create = true
      this.channel_name = searchText
    }
    
    create_channel(){
      var data = {
        name: this.channel_name,
        tags: this.tags
      }

      this.ChannelService.saveChannel(data).then((response)=>{
        this.$state.go('app.channel', {id:response.data.channel.id})
      })
    }

    // create_page(){
    //   this.$state.go('app.create_page');
    // }

    loadCourse(course){
      this.CourseService.loadCourse(course);
    }

    empty(){
      return //this.courses.length === 0;
    }
}

export const WelcomeComponent = {
    templateUrl: './views/app/components/welcome/welcome.component.html',
    controller: WelcomeController,
    controllerAs: 'vm',
    bindings: {
      'user':'<',
      'channels':'<'
    }
}
