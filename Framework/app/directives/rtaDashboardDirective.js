
// 03/03/2021 03:37 am - SSN - [20210303-0336] - [001] - M03-04 - Dashboard creation

'use strict';

angular.module('app').directive('rtaDashboard', ['$localStorage', function ($localStorage) {

    return {
        scope: {

        },
        template: '<ps-dashboard></ps-dashboard>',
        link: function {

            scope.gridsterOptions = {

                columns: 12,
                margins: [20, 20],
                outerMargin: false,
                pushing: true,
                floating: true,
                swapping:true
            };


            scope.widgetDefinitions = [];

            scope.widgets = $localStorage.widgets || [];

            scope.$watch('widgets', function () {

                $localStorage.widgets = scope.widgets;

            }, true);

        }
    }

}]);
