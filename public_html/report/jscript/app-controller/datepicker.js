//noinspection ChainedFunctionCallJS,JSHint,JSLint,JSUnresolvedVariable
angular
    .module('RaseApp', ['ui.bootstrap.tpls'])
    .run(["$templateCache", function ($templateCache) {
        "use strict";
        $templateCache.put("template/datepicker/day.html",
            "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
            "<thead>\n" +
            "<tr>\n" +
            "<th><button type=\"button\" class=\"btn btn-default btn-{{size}} pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
            "<th colspan=\"{{rows[0].length + showWeeks - 2}}\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-{{size}}\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
            "<th><button type=\"button\" class=\"btn btn-default btn-{{size}} pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
            "</tr>\n" +
            "<tr>\n" +
            "<th ng-show=\"showWeeks\" class=\"text-center\"></th>\n" +
            "<th ng-repeat=\"label in labels track by $index\" class=\"text-center\"><small style=\"{{($index % 7 == 0 && $index !== 0) && 'margin-left:30px' || ''}}\" aria-label=\"{{label.full}};\">{{label.abbr}}</small></th>\n" +
            "</tr>\n" +
            "</thead>\n" +
            "<tbody>\n" +
            "<tr ng-repeat=\"row in rows\">\n" +
            "<td ng-show=\"showWeeks\" class=\"text-center h6\" ng-init=\"parentIndex = $index\">\n" +
            "<em>{{ weekNumbers[$index] }}</em>\n" +
            "</td>\n" +
            "<td ng-repeat=\"dt in row\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
            "<table>\n" +
            "<tr>\n" +
            "<td>\n" +
            "<div ng-if=\"$index == 7\" style=\"margin: 10px;\" class=\"text-center h6\"><em ng-if=\"showWeeks\">{{ weekNumbers[$index + parentIndex - 1] }}</em></div>" +
            "</td>\n" +
            "<td>\n" +
            "<button type=\"button\" class=\"btn btn-default btn-{{size}}\" style=\"{{($index % 7 == 0 && $index !== 0) && 'display: block;' || ''}}\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\">\n" +
            "<span ng-class=\"{'text-muted': dt.secondary, 'text-info': dt.current}\">{{dt.label}}</span>\n" +
            "</button>\n" +
            "</td>\n" +
            "</tr>\n" +
            "</table>\n" +
            "</td>\n" +
            "</tr>\n" +
            "</tbody>\n" +
            "</table>\n" +
            "");
    }])
    .constant('sizeConfig', {
        1: 'xs',
        2: 'sm',
        3: 'md',
        4: 'lg'
    })
    .constant('DAYS_IN_WEEK', 7)
    .value('daypickerConfig', {
        month: '2',
        size: '1'
    })
    .directive('datepickerInit', ['$parse', function ($parse) {
        "use strict";
        return {
            restrict: 'C',
            require: 'ngModel',
            link: function (scope, element, attrs) {
                scope.$watch(attrs.ngModel, function (newValue) {
                    if (!angular.isObject(newValue)) {
                        $parse(attrs.ngModel).assign(scope, (newValue !== null && newValue.length ? new Date(newValue) : new Date()).toUTCString());
                    }
                });
            }
        };
    }])
    .directive('datepickerFormat', ["$filter", function ($filter) {
        "use strict";
        return {
            restrict: 'C',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                ctrl.$formatters.push(function (modelValue) {
                    return $filter('date')(new Date(Date.parse(modelValue)), attrs.datepickerPopup);
                });
            }
        };
    }])
    .directive('daypicker', ['daypickerConfig', 'dateFilter', 'DAYS_IN_WEEK', 'sizeConfig', function (daypickerConfig, dateFilter, DAYS_IN_WEEK, sizeConfig) {
        "use strict";
        return {
            restrict: 'EA',
            priority: 10,
            require: '^datepicker',
            link: function (scope, element, attrs, ctrl) {
                scope.firstDate = function (activeDate, monthStep, yearStep) {
                    return new Date(
                        activeDate.getFullYear() + (yearStep || 0),
                        activeDate.getMonth() + (monthStep || 0),
                        1
                    );
                };
                scope.size = sizeConfig[daypickerConfig.size];
                scope.firstCalendarDate = function (firstDate) {
                    var difference = ctrl.startingDay - firstDate.getDay(),
                        numDisplayedFromPreviousMonth = (difference > 0) ? DAYS_IN_WEEK - difference : -difference,
                        firstCalendarDate = new Date(firstDate);
                    if (numDisplayedFromPreviousMonth > 0) {
                        firstCalendarDate.setDate(-numDisplayedFromPreviousMonth + 1);
                    }
                    return firstCalendarDate;
                };
                scope.getDates = function (startDate, n) {
                    var dates = new Array(n), current = new Date(startDate), i = 0;
                    current.setHours(12); // Prevent repeated dates because of timezone bug
                    while (i < n) {
                        dates[i++] = new Date(current);
                        current.setDate(current.getDate() + 1);
                    }
                    return dates;
                };
                scope.days = function (date, month) {
                    // 42 is the number of days on a six-month calendar
                    var days = scope.getDates(date, 42);
                    for (var i = 0; i < 42; i++) {
                        days[i] = angular.extend(ctrl.createDateObject(days[i], ctrl.formatDay), {
                            secondary: days[i].getMonth() !== month,
                            uid: scope.uniqueId + '-' + i
                        });
                    }
                    return days;
                };
                scope.getLabels = function (days) {
                    var _labels = new Array(days.length);
                    for (var j = 0; j < days.length; j++) {
                        _labels[j] = {
                            abbr: dateFilter(days[j].date, ctrl.formatDayHeader),
                            full: dateFilter(days[j].date, 'EEEE')
                        };
                    }
                    return _labels;
                };
                scope.getISO8601WeekNumber = function (date) {
                    var checkDate = new Date(date);
                    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || DAYS_IN_WEEK)); // Thursday
                    var time = checkDate.getTime();
                    checkDate.setMonth(0); // Compare with Jan 1
                    checkDate.setDate(1);
                    return Math.floor(Math.round((time - checkDate) / 86400000) / DAYS_IN_WEEK) + 1;
                };
                if (daypickerConfig.month > 1) {
                    ctrl._refreshView = function () {
                        scope.rows = ctrl.split(scope.days(scope.firstCalendarDate(scope.firstDate(ctrl.activeDate)), ctrl.activeDate.getMonth()), DAYS_IN_WEEK);
                        for (var i = 1; i <= daypickerConfig.month - 1; i++) {
                            if (scope.rows[0].length < DAYS_IN_WEEK * daypickerConfig.month) {
                                var firstDay = scope.firstDate(ctrl.activeDate, i);
                                var rowNext = ctrl.split(scope.days(scope.firstCalendarDate(firstDay), firstDay.getMonth()), DAYS_IN_WEEK);
                                angular.forEach(scope.rows, function (value, key) {
                                    scope.rows[key] = value.concat(rowNext[key]);
                                });
                            }
                        }
                        scope.labels = scope.getLabels(scope.rows[0]);
                        scope.title = dateFilter(ctrl.activeDate, ctrl.formatDayTitle)
                        + (angular.isDefined(firstDay) ? ' - ' + dateFilter(firstDay, ctrl.formatDayTitle) : '');
                    };
                    if (scope.showWeeks) {
                        scope.weekNumbers = [];
                        var weekNumber = scope.getISO8601WeekNumber(scope.rows[0][0].date),
                            numWeeks = scope.rows.length * daypickerConfig.month;
                        while (scope.weekNumbers.push(weekNumber++) < numWeeks) {
                        }
                    }
                    ctrl.refreshView();
                }
            }
        };
    }]);
