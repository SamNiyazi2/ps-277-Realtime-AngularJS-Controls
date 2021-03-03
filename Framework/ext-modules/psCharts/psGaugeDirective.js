
// 03/03/2021 04:13 am - SSN - [20210303-0404] - [002] - M03-07 - Importing psGauge

'use strict';

console.log('psGaugeDirective loaded - 20240303-0423 (A-E)');


angular.module('psChartsModule').directive('psGauge', ['psWebMetricsService',


    function (psWebMetricsService) {

        console.log('psGaugeDirective loaded - 20240303-0423-B');




        function setupWidget(scope, elem, data) {


            console.log('psGaugeDirective loaded - 20240303-0423-D'); 

            if (!scope.initialized) {

                console.log('psGaugeDirective loaded - 20240303-0423-E');

                scope.options = {
                    width: scope.width || 200,
                    height: scope.height || 200,
                    redFrom: 90,
                    redTo: 100,
                    yellowFrom: 75,
                    yellowTo: 90,
                    minorTicks: 5
                };

                // 03/03/2021 09:00 am - SSN - [20210303-0846] - [001] - M03-10 - Resizing the gauge
                let widget = elem.closest('.gridster-item');
                scope.options.width = widget.width();
                scope.options.height = widget.height();

                // Monitor the widget size 
                widget.resize(function () {
                    scope.options.width = widget.width();
                    scope.options.height = widget.height();
                });



                scope.title = psWebMetricsService.getTitleForMetric(scope.metric)

                scope.data = google.visualization.arrayToDataTable([

                    ['Label', 'Value'],
                    [scope.title, 0]
                ]);

                scope.chart = new google.visualization.Gauge(elem[0]);

                scope.initialized = true;
 

            }

         //   scope.data.setValue(0, 0, scope.title);

            if (data) {
                scope.data.setValue(0, 1, Math.round(data[scope.metric]));
            } else {
                scope.data.setValue(0, 1, 0);
            }

            scope.chart.draw(scope.data, scope.options);
        }


        return {

            // Scope is inherited from the widget using this directive.

            templateUrl: '/ext-modules/psCharts/psGaugeTemplate.html',

            link: function (scope, elem, attrs) {

                console.log('psGaugeDirective loaded - 20240303-0423-C');



                scope.initialized = false;

                setupWidget(scope, elem, null);

                scope.$on('psWebMetricsService-received-data-event', function (evt, data) {

                    setupWidget(scope, elem, data);


                });

            }




        };


    }


]);

