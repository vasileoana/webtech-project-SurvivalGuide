let ct = angular.module("DangersController", ['ui.router']);

const server = "https://webtech-project-vasileoana22.c9users.io"

ct.controller('DangersController', ['$scope', '$http', function($scope, $http) {

    $http.get(server + '/dangers')
        .then((response) => {
            $scope.Dangers = response.data;
            console.log($scope.Dangers);
        })
        .catch((error) => {
            console.warn(error);
            $scope.Dangers = 'Server Error';
        });
}]);
