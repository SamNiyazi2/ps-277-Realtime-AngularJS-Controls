
// 03/04/2021 08:10 pm - SSN - [20210304-2003] - [001] - M04-09 - Creating a line chart widget

'use strict';

angular.module('app').directive('rtaLineChartWidget', ['psWebMetricsService',
    function (psWebMetricsService) {

        return {

            // Scope is inherited 

            templateUrl: '/app/widgets/rtaLineChartTemplate.html',

            link: function (scope, elem, attr) {

                scope.metric = scope.item.widgetSettings.metric;
                scope.title = psWebMetricsService.getTitleForMetric(scope.metric);
                scope.error = false;

                scope.setTitle = function (title) {

                    scope.title = title;
                }

                scope.$on('psWebMetricsService-disconnected-event', function (evt, data) {
                    scope.$apply(function () {
                        scope.error = true;
                    });

                });

            }
        }

    }]);
