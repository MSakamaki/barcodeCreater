
angular.module('ng-app', ['ng-barcoder'])
    .controller('bCtrl', function($scope, barcoder,barClient, barMobile) {
        console.log('ng-app start');

        /* web socket */
        $scope.connect=function(){
            /*barResouce.connect('localhost',8080);*/
            barClient.connect('192.168.1.2',8081);
            barcoder.init("bdata","bcTarget","code39","192.168.1.2",8082);
            barMobile.connect('192.168.1.2',8083);
        };
/*
        barResouce.subscribe(function(msg){
            var data = JSON.parse(msg);
            if (data.name){
                console.log('subscribe ctrl barResouce:',msg, data);
                var _id = localStorage.getItem(data.name);
                //$scope.$apply();
                barResouce.send(JSON.stringify({ id : _id , name : data.name}));
                console.log('send resouce', { id : _id , name : data.name});
            }
        });*/

        /* client endin */
        barClient.subscribe(function(msg){
            var data = JSON.parse(msg);
            console.log('subscribe client fact:',msg, data);
            //$scope.$apply();
            //barClient.send(JSON.stringify({ id : 123 , name : data.name}));
        });

        barMobile.subscribe(function(msg){
            var data = JSON.parse(msg);
            console.log('subscribe mobile fact:',msg, data);
            //$scope.$apply();
            //barClient.send(JSON.stringify({ id : 123 , name : data.name}));
        });


        /* barcoder */
        $scope.input = function(){
            console.log($scope.barcodeData);
            //barMobile.send(JSON.stringify({id : $scope.barcodeData}));
            barcoder.input ($scope.barcodeData);
        };
    });
