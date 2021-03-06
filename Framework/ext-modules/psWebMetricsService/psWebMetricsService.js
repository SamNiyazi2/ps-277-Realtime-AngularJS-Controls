'use strict';


angular.module('psWebMetricsService', []).factory('psWebMetricsService', [
    '$rootScope', '$location',
    function ($rootScope, $location) {




        // 03/04/2021 08:39 pm - SSN - [20210304-2003] - [003] - M04-09 - Creating a line chart widget
        // Copied from C:\Sams_P\PS\building-realtime-angular-controls\Homework\ps-realtimeangularjs\ps-realtimeangularjs\ext-modules\psWebMetricsService\psWebMetricsService.js

        var liveData = {
            time: null,
            bandwidthPct: 0,
            cpuPct: 0,
            salesAmt: 0,
            alphaSalesAmt: 0,
            betaSalesAmt: 0
        }






        // Declare a proxy to reference the hub.


        // 03/03/2021 05:58 am - SSN - [20210303-0437] - [002] - M03-08 - Showing the gauge
        if (true) {
             
            var hub = $.connection.metricHub;
            // Create a function that the hub can call to broadcast messages.
            hub.client.broadcastMessage = function (time, bandwidthPct, cpuPct,
                salesAmt, alphaSalesAmt, betaSalesAmt) {

                $rootScope.$broadcast('psWebMetricsService-received-data-event',
                    {
                        'time': time,
                        'bandwidthPct': bandwidthPct,
                        'cpuPct': cpuPct,
                        'salesAmt': salesAmt,
                        'alphaSalesAmt': alphaSalesAmt,
                        'betaSalesAmt': betaSalesAmt,
                    });




                // 03/04/2021 08:39 pm - SSN - [20210304-2003] - [003] - M04-09 - Creating a line chart widget
                // Copied from C:\Sams_P\PS\building-realtime-angular-controls\Homework\ps-realtimeangularjs\ps-realtimeangularjs\ext-modules\psWebMetricsService\psWebMetricsService.js

                // 03/03/2021 01:25 pm - SSN - [20210303-1325] - [001] - M04-06 - Using $scope.$watch
                // Use instead of $broadcast for LineChart (Usin $rootScope.$watch)

                liveData.time = time;
                liveData.bandwidthPct = bandwidthPct;
                liveData.cpuPct = cpuPct;
                liveData.salesAmt = salesAmt;
                liveData.alphaSalesAmt = alphaSalesAmt;
                liveData.betaSalesAmt = betaSalesAmt;

                $rootScope.$apply();



            };

            $.connection.hub.start()
                .done()
                .fail(function (data) {
                    alert(data);
                }
                );

            $.connection.hub.disconnected(function () {
                console.log('disconnected signalr');
                $rootScope.$broadcast('psWebMetricsService-disconnected-event',
                    {
                    });
            });







        }






        var getTitleForMetric = function (metric) {
            switch (metric) {
                case 'time':
                    return 'Time';
                case 'bandwidthPct':
                    return 'Band %';
                case 'cpuPct':
                    return 'CPU %';
                case 'salesAmt':
                    return 'Sales Amount';
                case 'alphaSalesAmt':
                    return 'Alpha Sales Amount';
                case 'betaSalesAmt':
                    return 'Beta Sales Amount';
            }
            return undefined;
        };



        // 03/03/2021 09:50 am - SSN - [20210303-0928] - [002] - M03-12 - Modifying gauge settings
        var getMetricsArray = function () {
            return ['time', 'bandwidthPct', 'cpuPct', 'salesAmt', 'alphaSalesAmt', 'betaSalesAmt'];
        }

        var getMetricsArray_v02 = function () {
            return [
                { id: 'time', descrip: 'Time' },
                { id: 'bandwidthPct', descrip: 'Bandwidth %' },
                { id: 'cpuPct', descrip: 'CPU %' },
                { id: 'salesAmt', descrip: 'Sales Amount' },
                { id: 'alphaSalesAmt', descrip: 'Alpha Sales Amount' },
                { id: 'betaSalesAmt', descrip: 'Beta Sales Amount' }];
        }

        // 03/04/2021 08:39 pm - SSN - [20210304-2003] - [003] - M04-09 - Creating a line chart widget
        // Copied from C:\Sams_P\PS\building-realtime-angular-controls\Homework\ps-realtimeangularjs\ps-realtimeangularjs\ext-modules\psWebMetricsService\psWebMetricsService.js

        var getLiveData = function () {

            return liveData;
        }



        return {
            getTitleForMetric: getTitleForMetric,
            getMetricsArray: getMetricsArray,
            getMetricsArray_v02: getMetricsArray_v02,
            getLiveData: getLiveData
        };

    }
]);

