ct = angular.module('DangerController', [
    'ui.router'
]);

ct.controller('DangerController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {
    let $constructor = () => {
        $http.get(server + '/Situations' + '/' + $stateParams.id + '/Skills')
            .then((response) => {
                $scope.situations = response.data;
                console.log($scope.situations);
            })
            .catch((error) => {
                console.warn(error);
                $scope.dangers = "There is an error at server";
            });

        $scope.getSkills();

        $http.get(server + '/dangers/' + $stateParams.id)
            .then((response) => {
                $scope.Danger = response.data;
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    $scope.getSkills = () => {
            $http.get(server + '/Skills').then((res) => {
                $scope.skills = res.data
            })
        }
        //add button
    $scope.addSkill = (skill) => {
        $http.post(server + '/Situations' + '/' + $stateParams.id + '/Skills', skill)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    //it helps to know witch template will be displayed
    $scope.selected = {};

    //templates: display and edit
    $scope.getTemplate = (situation) => {
        if (situation.id === $scope.selected.id) {
            return 'edit'
        }
        else {
            return 'display'
        }
    }

    //edit button => this function just copy the situation data, selected object will keep o copy of the current situation
    $scope.editSituation = (situation) => {
        $scope.selected = angular.copy(situation)
    }

    $scope.cancelEditing = () => {
        $scope.selected = {}
    }

    //salvare modificari facute pe situatia respectiva
    $scope.saveSituation = (situation) => {
        $http.put(server + '/Situations' + '/' + $stateParams.id + '/Skills', situation)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            }).catch((error) => console.log(error))
    }


    //efectuare buton de delete
    $scope.deleteSituation = (situation) => {
        $http.delete(server + '/situations/' + situation.id)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }

    $constructor();
}]);
