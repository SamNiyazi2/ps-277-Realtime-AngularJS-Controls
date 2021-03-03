﻿'use strict';
 

angular.module('psWebMetricsService', []).factory('psWebMetricsService', [
    '$rootScope',
    function ($rootScope) {

        
        // Declare a proxy to reference the hub.


        // 03/03/2021 05:58 am - SSN - [20210303-0437] - [002] - M03-08 - Showing the gauge
        if (true) {

            $.connection.hub.url = 'http://localhost:65470/signalr';



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


        return {
            getTitleForMetric: getTitleForMetric,
            getMetricsArray: getMetricsArray 
        };

    }
]);

