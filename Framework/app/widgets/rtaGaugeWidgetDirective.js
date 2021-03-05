
// 03/03/2021 03:57 am - SSN - [20210303-0355] - [001] - M03-06 - Widget creation

'use strict';

angular.module('app').directive('rtaGaugeWidget', ['psWebMetricsService',

    function (psWebMetricsService) {

        return {

            // Scope isherited from psWidgetBody

            templateUrl: '/app/widgets/rtaGaugeWidgetTemplate.html',

            link: function (scope, element, attributes) {

                scope.metric = scope.item.widgetSettings.metric;

                // 03/03/2021 10:15 am - SSN - [20210303-1002] - [001] - M03-13 - SignalR Disconnections
                scope.error = false;

                scope.$on('psWebMetricsService-disconnected-event', function (evt, data) {

                    scope.$apply(function () {
                        scope.error = true;
                    });

                });


            }
        }
    }
]);