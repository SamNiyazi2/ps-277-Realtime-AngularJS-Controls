
// 03/05/2021 12:58 pm - SSN - [20210305-1242] - [003] - M05-07 - Creating a dashboard widget (security monitor)

'use strict';


angular.module('appSecurityMonitorModule', []).factory('psSecurityMonitorService', [

    '$rootScope', function ($rootScope) {

        const socket = io('http://p3182.nonbs.org:3182');

        socket.on('security event', function (msg) {

            $rootScope.$broadcast('psSecurityMonitorService-received-data-event', msg);

        });

        return {

        };


    }]);

