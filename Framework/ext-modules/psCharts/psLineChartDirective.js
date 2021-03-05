
// 03/04/2021 08:19 pm - SSN - [20210304-2003] - [002] - M04-09 - Creating a line chart widget

// Copied from C:\Sams_P\PS\building-realtime-angular-controls\Homework\ps-realtimeangularjs\ps-realtimeangularjs\ext-modules\psCharts\psLineChartDirective.js
// Added monitor for resizing widget


angular.module('psChartsModule').directive('psLineChart', ['psWebMetricsService', function (psWebMetricsService) {


    return {
        templateUrl: '',


        link: function (scope, element, attributes) {

            // 03/03/2021 12:26 pm - SSN - [20210303-1220] - [001] - M04-05 - Displaying a realtime line chart 


            scope.options = {

                width: 600,
                height: 300,
                legend: {
                    position: 'none'
                },
                vAxis: {
                    maxValue: 100,
                    minValue: 100
                },
                hAxis: {
                    slantedText: false,
                    format: 'h:mm:ss',
                    maxTextLines: 1,
                    gridLines: {
                        count: 100
                    }
                }
            };




            let widget = element.closest('.gridster-item');
            scope.options.width = widget.width();
            scope.options.height = widget.height();

            widget.resize(function () {

                scope.options.width = widget.width();
                scope.options.height = widget.height();

            });






            scope.options.title = psWebMetricsService.getTitleForMetric(scope.metric);
            scope.initialized = false;

            scope.MAX_RECORD_COUNT = 20;


            // 03/03/2021 01:31 pm - SSN - [20210303-1325] - [003] - M04-06 - Using $scope.$watch
            // Replace scope.$on with scope.$watch
            // scope.$on('psWebMetricsService-received-data-event', function (evt, data) {

            scope.$watch(function () {
                return psWebMetricsService.getLiveData();
            },
                function (newData) {

                    var data = newData;

                    if (!data.time) return;


                    if (!scope.initialized) {

                        scope.data = new google.visualization.DataTable();
                        scope.data.addColumn('timeofday', 'Time of Day');
                        scope.data.addColumn('number', 'Value');

                        scope.chart = new google.visualization.LineChart(element[0]);
                        scope.initialized = true;

                    }

                    var d = new Date();



                    let currentTimeOfDay = [d.getHours(), d.getMinutes(), d.getSeconds()];

                    scope.data.addRow([currentTimeOfDay, Math.round(data[scope.metric])]);




                    let rowCount = scope.data.getNumberOfRows();

                    if (rowCount < scope.MAX_RECORD_COUNT) {

                        scope.options.hAxis.baseline = [d.getHours(), d.getMinutes(), d.getSeconds() + scope.MAX_RECORD_COUNT - rowCount];

                    }
                    else {
                        scope.options.hAxis.baseline = currentTimeOfDay;
                    }


                    if (rowCount > scope.MAX_RECORD_COUNT) {
                        scope.data.removeRow(0);
                    }

                    scope.chart.draw(scope.data, scope.options);


                }, true);



        }



    };

}]);