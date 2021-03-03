'use strict';


console.log('psWebMetricsService - 20210303-0545  (A)')

angular.module('psWebMetricsService', []).factory('psWebMetricsService', [
    '$rootScope',
    function ($rootScope) {

        console.log('psWebMetricsService - 20210303-0545 - A ')


        // Declare a proxy to reference the hub.


        // 03/03/2021 05:58 am - SSN - [20210303-0437] - [002] - M03-08 - Showing the gauge
        if (false) {

            //        $.connection.hub.url = 'http://localhost:50447/signalr';
            $.connection.hub.url = '/signalr';



            var hub = $.connection.myHub1;
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

        return {
            getTitleForMetric: getTitleForMetric 
        };

    }
]);

