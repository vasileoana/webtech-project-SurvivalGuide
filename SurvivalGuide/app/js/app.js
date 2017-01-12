let app = angular.module("SurvivalGuide", ['ui.router', 'DangersController', 'DangerController', 'ngMessages']);

app.config(["$stateProvider", '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

    $urlRouterProvider.otherwise('/About');

    $stateProvider.state('About', {
        url: '/About',
        template: '<div class="container"><h1>My app is about survival!</h1><h3>Read carefully and you will survive to most dangererous situations.</h3><img src="http://www.mwa.uk.net/wp-content/uploads/2015/05/e3nbspk79w.jpg"></img></div>'

    });

    $stateProvider.state('Dangers', {
        url: '/Dangers',
        templateUrl: 'views/Dangers.html',
        controller: 'DangersController'

    });

    $stateProvider.state('Danger', {
        url: '/Danger/:id',
        templateUrl: 'views/Danger.html',
        controller: 'DangerController'

    });

}]);

app.directive('validSkill', function() {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(s, e, a, c) {
            e.on('keypress', () => {
                s.$apply(() => {
                    let v = e.val()
                    c.$setValidity('validSkill', v[0] == v[0].toUpperCase());
                })
            })
        }
    }
})
