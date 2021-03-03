
// 03/03/2021 03:37 am - SSN - [20210303-0336] - [001] - M03-04 - Dashboard creation

'use strict';

console.log('rtaDashboardDIrective - 20210303-0446 ');

angular.module('app').directive('rtaDashboard', ['$localStorage', function ($localStorage) {

    console.log('rtaDashboardDIrective - 20210303-0446 A ');

    return {
        scope: {

        },
        template: '<ps-dashboard></ps-dashboard>',
        link: function (scope) {


            console.log('rtaDashboardDIrective - 20210303-0446 - LINK');

            scope.gridsterOpts = {

                columns: 12,
                margins: [20, 20],
                outerMargin: false,
                pushing: true,
                floating: true,
                swapping: true
            };


            scope.widgetDefinitions = [

                {
                    title: 'Gauge',
                    settings: {
                        sizeX: 2,
                        sizeY: 2,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: '<rta-gauge-widget ></rta-gauge>',
                        widgetSettings: {
                            metric: 'cpuPct'
                        }
                    }
                }
            ];

            // 03/03/2021 09:11 am - SSN - [20210303-0846] - [002] - M03-10 - Resizing the gauge
            // Debugging local storage
            // scope.widgets = $localStorage.widgets || [];

            if ($localStorage.widgets) {

                console.log('rtaDashboardDirective - Restoring widgets from storage - 20210303-092-AAA');
                scope.widgets = $localStorage.widgets;
            } else {

                console.log('rtaDashboardDirective - Initializing widgets - No local storage widgets - 20210303-092-ZZZ');
                scope.widgets = [];
            }

            scope.$watch('widgets', function () {

                $localStorage.widgets = scope.widgets;

            }, true);

        }
    }

}]);
