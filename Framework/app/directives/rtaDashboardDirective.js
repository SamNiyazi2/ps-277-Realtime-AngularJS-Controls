
// 03/03/2021 03:37 am - SSN - [20210303-0336] - [001] - M03-04 - Dashboard creation

'use strict';


angular.module('app').directive('rtaDashboard', ['$localStorage', function ($localStorage) {


    return {
        scope: {

        },
        template: '<ps-dashboard></ps-dashboard>',
        link: function (scope) {


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
                        template: '<rta-gauge-widget ></rta-gauge-widget>',
                        widgetSettings: {
                            metric: 'cpuPct',
                            templateUrl: 'app/dialogs/rtaSelectMetricTemplate.html',
                            controller: 'rtaSelectMetricController'
                        }
                    }
                },
                {
                    title: 'Line Chart',
                    settings: {
                        sizeX: 2,
                        sizeY: 2,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: '<rta-line-chart-widget ></rta-line-chart-widget>',
                        widgetSettings: {
                            metric: 'cpuPct',
                            templateUrl: 'app/dialogs/rtaSelectMetricTemplate.html',
                            controller: 'rtaSelectMetricController'
                        }
                    }
                }
            ];

            // 03/03/2021 09:11 am - SSN - [20210303-0846] - [002] - M03-10 - Resizing the gauge
            // Debugging local storage
            // scope.widgets = $localStorage.widgets || [];

            if ($localStorage.widgets) {

                scope.widgets = $localStorage.widgets;
            } else {

                scope.widgets = [];
            }

            scope.$watch('widgets', function () {

                $localStorage.widgets = scope.widgets;

            }, true);

        }
    }

}]);
