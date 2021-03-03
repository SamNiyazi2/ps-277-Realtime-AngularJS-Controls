
// 03/03/2021 03:57 am - SSN - [20210303-0355] - [001] - M03-06 - Widget creation

'use strict';

angular.module('app').directive('rtaGaugeWidget', [

    function () {

        return {

            // Scope isherited from psWidgetBody

            templateUrl: '/app/widgets/rtaGauge/rtaGaugeWidgetTemplate.html',

            link: function (scope, element, attributes) {

                scope.metric = scope.item.widgetSettings.metric;

            }
        }
    }
]);