
angular.module('ng-app', ['ng-barcoder'])
    .controller('bCtrl', function($scope, barClient) {
        console.log('ng-app start');

        /* web socket */
        $scope.connect=function(){
            barClient.connect('192.168.1.2',8081);
        };

        /* client endin */
        barClient.subscribe(function(msg){
            //var data = JSON.parse(msg);
            console.log('subscribe client fact:',msg);
            //$scope.$apply();
            //barClient.send(JSON.stringify({ id : 123 , name : data.name}));
        });


        /* barcoder */
        $scope.checkin = function(){
            console.log($scope.barcodeData);
            barClient.send(JSON.stringify({
                id : $scope.id,
                name : undefined,
                checkin : true
            }));
        };
    });
