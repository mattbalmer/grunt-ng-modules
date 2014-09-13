angular.module('second').controller('Main', function($scope) {
    $scope.foo = 'bar';
    $scope.links = [
        { title: 'foo' },
        { title: 'bar' },
        { title: 'derp' }
    ];
});