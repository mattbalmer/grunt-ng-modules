angular.module('second', ['templates.second-module']);

angular.module('second').controller('Main', function($scope) {
    $scope.foo = 'bar';
    $scope.links= [{title:'foo'},{title:'bar'},{title:'derp'}]
});

angular.module('second').directive('link', function() {
    return {
        templateUrl: '/html/ng-modules/test-module/directives/link/link.html'
    }
});

angular.module('second').directive('menu', function() {
    return {
        templateUrl: '/html/ng-modules/test-module/directives/menu/menu.html'
    }
});