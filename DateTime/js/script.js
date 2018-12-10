var app = angular.module('app', ['ui.bootstrap', 'ui.bootstrap.datetimepicker']);

app.controller('MyController', ['$scope', function($scope) {

    var that = this;

    
    // date and time picker
    this.picker3 = {
      date: new Date()
    };

    this.openCalendar = function(e, picker) {
        that[picker].open = true;
    };

    // watch min and max dates to calculate difference
    var unwatchMinMaxValues = $scope.$watch(function() {
        return [that.picker4, that.picker5, that.picker10, that.picker11];
    }, function() {
      // min max dates
      that.picker4.datepickerOptions.maxDate = that.picker5.date;
      that.picker5.datepickerOptions.minDate = that.picker4.date;
      
      if (that.picker4.date && that.picker5.date) {
        var diff = that.picker4.date.getTime() - that.picker5.date.getTime();
        that.dayRange = Math.round(Math.abs(diff/(1000*60*60*24)))
      } else {
        that.dayRange = 'n/a';
      }
      
      // min max times
      that.picker10.timepickerOptions.max = that.picker11.date;
      that.picker11.timepickerOptions.min = that.picker10.date;
    }, true);


    // destroy watcher
    $scope.$on('$destroy', function() {
        unwatchMinMaxValues();
    });

}]);