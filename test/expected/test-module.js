angular.module('test', []);

angular.module('test').controller('Main', function($scope) {
    $scope.foo = 'bar';
});

angular.module('test').directive('link', function() {
    return {
        templateUrl: '/html/ng-modules/test-module/directives/link/link.html'
    }
});

angular.module('test').directive('menu', function() {
    return {
        templateUrl: '/html/ng-modules/test-module/directives/menu/menu.html'
    }
});