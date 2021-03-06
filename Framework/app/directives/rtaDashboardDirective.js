
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


            // Leaving widgetSettings.templateUrl empty, disables the settings menu option for the widget.
            // Leaving widgetSettings.templateUrl empty, disables the settings menu option for the widget.
            // Leaving widgetSettings.templateUrl empty, disables the settings menu option for the widget.
            // Leaving widgetSettings.templateUrl empty, disables the settings menu option for the widget.


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
                        sizeX: 6,
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
                },
                {
                    title: 'Candlestick Chart',
                    settings: {
                        sizeX: 6,
                        sizeY: 2,
                        minSizeX: 2,
                        minSizeY: 2,
                        template: '<rta-candlestick-chart-widget ></rta-candlestick-chart-widget>',
                        widgetSettings: {
                            metric: 'cpuPct',
                            templateUrl: 'app/dialogs/rtaSelectMetricTemplate.html',
                            controller: 'rtaSelectMetricController'
                        }
                    }
                }
                ,
                // 03/05/2021 12:56 pm - SSN - [20210305-1242] - [001] - M05-07 - Creating a dashboard widget (security monitor)

                {
                    title: 'Security Minitor',
                    settings: {
                        sizeX: 4,
                        sizeY: 5,
                        minSizeX: 4,
                        minSizeY: 5,
                        draggable: {
                            handle: '.ps-drag-handle'
                        },
                        template: '<rta-security-monitor-widget ></rta-security-monitor-widget>',
                        widgetSettings: {
                            metric: '',
                            templateUrl: '',
                            controller: ''
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
