
// 03/03/2021 04:13 am - SSN - [20210303-0404] - [002] - M03-07 - Importing psGauge

'use strict';

console.log('psChartsModule loaded - 20240303-0423 (A-C)');


angular.module('psChartsModule').directive('psGauge', ['psWebMetricsService',


    function (psWebMetricsService) {

        console.log('psChartsModule loaded - 20240303-0423-B');

        return {

            // Scope is inherited from the widget using this directive.

            templateUrl: '/ext-modules/psCharts/psGaugeTemplate.html',

            link: function (scope, elem, attrs) {

                console.log('psChartsModule loaded - 20240303-0423-C');

                scope.options = {
                    width: scope.width || 200, height: scope.height || 200,
                    redFrom: 90,
                    redTo: 100,
                    yellowFrom: 75,
                    yellowTo: 90,
                    minorTicks: 5
                };

                scope.title = psWebMetricsService.getTitleForMetrics(scope.m)

                scope.initialized = false;

                scope.$on('psWebMetricsService-received-data-event', function (evt, data) {

                    if (!scope.initialized) {

                        scope.data = google.visualization.arrayToDataTable([

                            ['Label', 'Value'],
                            [scope.title, 0]
                        ]);

                        scope.chart = new google.visualization.Gauge(elem[0]);

                        scope.initialized = true;

                    }

                    scope.data.setValue(0, 0, scope.title);
                    scope.data.setValue(0, 1, Math.round(data[scope.metric]));
                    scope.chart.draw(scope.data, scope.options);


                });

            }

        };


    }


]);

