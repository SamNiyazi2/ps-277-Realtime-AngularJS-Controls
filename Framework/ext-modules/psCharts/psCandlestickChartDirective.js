
// 03/04/2021 09:32 pm - SSN - [20210304-2116] - [002] - M04-10 - Creating a stock price widget

// Copied from C:\Sams_P\PS\building-realtime-angular-controls\Homework\ps-realtimeangularjs\ps-realtimeangularjs\ext-modules\psCharts\psCandlestickChart.js


'use strict';



angular.module("psChartsModule").directive('psCandlestickChart', ['psWebMetricsService',


    function (psWebMetricsService) {
        

        return {


            link: function (scope, element, attrs) {


                scope.options = {
                    width: 600,
                    height: 200,
                    legend: {
                        position: 'none'
                    },
                    vAxis: {
                        maxValue: 100,
                        minValue: 0
                    },
                    hAxis: {
                        slantedText: false,
                        format: 'h:mm:ss',
                        maxTextLines: 1,
                        gridlines: {
                            count: 20
                        }
                    }
                };

                scope.startTime = null;
                scope.periodsOnChart = 5;
                scope.secondsPerPeriod = 5;


                scope.period = {
                    lowValue: 0,
                    firstValue: 0,
                    lastValue: 0,
                    highValue: 0,
                    startTime: null,
                    endTime: null
                };



                scope.initialized = false;

                scope.$on('psWebMetricsService-received-data-event', function (evt, data) {


                    scope.options.title = psWebMetricsService.getTitleForMetric(scope.metric);

                    let value = Math.round(data[scope.metric]);
                    let d = new Date(data.time);


                    if (!scope.initialized) {

                        scope.data = new google.visualization.DataTable();
                        scope.data.addColumn('timeofday', 'Time of Day');

                        for (let i = 0; i < 4; i++) {

                            scope.data.addColumn('number', 'Percent');
                        }

                        scope.startTime = new Date(d);

                        scope.period.startTime = new Date(d);
                        scope.period.endTime = new Date(d);
                        scope.period.endTime.setSeconds(scope.period.endTime.getSeconds() + scope.secondsPerPeriod);

                        scope.chart = new google.visualization.CandlestickChart(element[0]);

                        

                    }




                    if (!scope.initialized || d >= scope.period.endTime) {


                        scope.initialized = true;

                        // Set up new period
                        scope.period.lowValue =
                            scope.period.firstValue =
                            scope.period.lastValue =
                            scope.period.highValue = value;

                        if (d > scope.period.endTime) {

                            scope.period.startTime.setSeconds(scope.period.startTime.getSeconds() + scope.secondsPerPeriod);

                            scope.period.endTime.setSeconds(scope.period.endTime.getSeconds() + scope.secondsPerPeriod);
                        }
                    }
                    else {

                        // Update period values

                        if (value < scope.period.lowValue) {
                            scope.period.lowValue = value;
                        }

                        if (value > scope.period.highValue) {
                            scope.period.highValue = value;
                        }

                        scope.period.lastValue = value;


                    }



                    // Add the row for the current period

                    scope.data.addRow([[scope.period.startTime.getHours(), scope.period.startTime.getMinutes(), scope.period.startTime.getSeconds()],
                    scope.period.lowValue,
                    scope.period.firstValue,
                    scope.period.lastValue,
                    scope.period.highValue
                    ]);




                    if (scope.data.getNumberOfRows() >= scope.secondsPerPeriod * scope.periodsOnChart) {

                        for (let x = 0; x < scope.secondsPerPeriod; x++) { scope.data.removeRow(0); }

                        // Set the baseline property

                        scope.startTime.setSeconds(scope.startTime.getSeconds() + scope.secondsPerPeriod);

                        let newBaseline = new Date(scope.startTime);
                        
                        newBaseline.setSeconds(newBaseline.getSeconds() + (scope.periodsOnChart - 1) * scope.secondsPerPeriod);
                        
                        scope.options.hAxis.baseline = [newBaseline.getHours(), newBaseline.getMinutes(), newBaseline.getSeconds()];

                    }
                    
                    scope.chart.draw(scope.data, scope.options);
                    
                });




            }
        }
    }]);
