

// 03/05/2021 12:58 pm - SSN - [20210305-1242] - [002] - M05-07 - Creating a dashboard widget (security monitor)

// Copied from C:\Sams_P\PS\building-realtime-angular-controls\Homework\ps-realtimeangularjs\ps-realtimeangularjs\app\appSecurityMonitorDirective.js

'use strict';

angular.module('appSecurityMonitorModule').directive('psSecurityMonitor', [


    function ( ) {


        return {

            // 03/05/2021 01:06 pm - SSN - [20210305-1242] - [004] - M05-07 - Creating a dashboard widget (security monitor)
            // Scope is inherited from the widget



            templateUrl: '/ext-modules/psSecurityMonitor/psSecurityMonitorTemplate.html'
            ,
            link: function (scope, elem, attrs) {


                // 03/05/2021 01:06 pm - SSN - [20210305-1242] - [004] - M05-07 - Creating a dashboard widget (security monitor)

                scope.setTitle = function (title) {
                    scope.title = title;
                }


                scope.filter = 'all';
                scope.messages = [];

                scope.autoScroll = true;

                scope.$on('psSecurityMonitorService-received-data-event', function (evt, data) {


                    if (scope.filter === 'all' || scope.filter === data.event) {

                        scope.$apply(function () {

                            if (data.event == 'Sign On') { data.colorClass = 'non-error'; }

                            scope.messages.push(data);

                        });
                    }


                    if (scope.autoScroll) {
                        let divs = elem.find('div.app-security-list');

                        divs[0].scrollTop = divs[0].scrollHeight;
                    }
                });


                let divs = elem.find('div.app-security-list');
                divs[0].scroll(function (event, data) {

                    scope.autoScroll = !(this.scrollTop < (this.scrollHeight - $(this).height()));

                });
            }
        };


    }]);