
// 03/03/2021 09:31 am - SSN - [20210303-0928] - [001] - M03-12 - Modifying gauge settings

'use strict';

angular.module('app').controller('rtaSelectMetricController', ['$scope', 'psWebMetricsService',

    function ($scope, psWebMetricsService) {

        $scope.metrics_v02 = psWebMetricsService.getMetricsArray_v02();
         

        $scope.metric_TEMP = $scope.metrics_v02[0];

        for (let i = 0; i < $scope.metrics_v02.length; i++) {
            if ($scope.metrics_v02[i].id === $scope.item.widgetSettings.metric) {
                $scope.metric_TEMP= $scope.metrics_v02[i];
            }
        }

        $scope.saveSettings = function () {

            $scope.item.widgetSettings.metric = $scope.metric;
            $scope.$parent.metric = $scope.metric;

            const titleToSet = psWebMetricsService.getTitleForMetric($scope.metric);

            $scope.setTitle(titleToSet);
            $scope.$close();
        };

        $scope.selectMetric = function (value) {
            
            $scope.metric = $scope.metric_TEMP.id;
            
        }

    }]);