

// 03/04/2021 09:27 pm - SSN - [20210304-2116] - [001] - M04-10 - Creating a stock price widget


'use strict';

angular.module('app').directive('rtaCandlestickChartWidget', ['psWebMetricsService',

    function (psWebMetricsService) {

        return {

            // Scope is inherited 

            templateUrl: '/app/widgets/rtaCandlestickChartTemplate.html',

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
