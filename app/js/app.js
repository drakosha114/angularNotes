/**
 * Created by drakosha on 30.08.2016.
 */
var app = angular.module('NotesApplication', []);

app.controller('Hello', function($scope){
    $scope.greeting = '';
    $scope.update = function () {
        if ($scope.name) {
            $scope.greeting = 'Hello, ' + $scope.name + '!';
        }
    }

});