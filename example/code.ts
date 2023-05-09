/**
 * ToothSelection_controller
 * @namespace ToothSelection_controller
 * @example
 * 31111
 */
// @ts-ignore
a.controller('ToothSelection_controller', ['$scope', 'tool', '$window', function ($scope, tool, $window) {
    // controller init event
    this.$onInit = function () {
        console.log('onInit ToothSelection_controller 1')
        console.log($scope.toothData)
    }

    // code
    $scope.toothData = {
        left:{
            '2':[
                ['A','B','C','D','E','','','',],
                [1,2,3,4,5,6,7,8]
            ],
            '3':[
                [1,2,3,4,5,6,7,8],
                ['A','B','C','D','E','','','',]
            ]
        },
        right:{
            '1':[
                ['','','','E','D','C','B','A'],
                [8,7,6,5,4,3,2,1]
            ],
            '4':[
                [8,7,6,5,4,3,2,1],
                ['','','','E','D','C','B','A']
            ]
        }
    };

    $scope.chooseItem = function (type,index,item) {
        console.log(type,index,item)
    }
}]);
