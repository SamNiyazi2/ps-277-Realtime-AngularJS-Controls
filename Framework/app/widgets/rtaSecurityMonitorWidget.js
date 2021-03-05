
// 03/05/2021 01:09 pm - SSN - [20210305-1242] - [005] - M05-07 - Creating a dashboard widget (security monitor)

'use strict';

angular.module('app').directive('rtaSecurityMonitorWidget', ['psSecurityMonitorService',

    function (psSecurityMonitorService) {

        return {

            // Scope is inhertied from psWidgetBody

            templateUrl: '/app/widgets/rtaSecurityMonitorTemplate.html',
            link: function (scope, elem, attrs) {

                scope.error = false;

                scope.setTitle = function (title) {

                    scope.title = title;
                }
            }
        }
    }]);

