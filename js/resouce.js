
angular.module('ng-app', ['ng-barcoder'])
    .controller('bCtrl', function($scope, barResouce, storage) {
        console.log('ng-app start');
        storage.bind($scope,'items', {defaultValue: new Array() ,storeName: 'barData'});
        //localStorage.clear();

        /* web socket */
        $scope.connect=function(){
            barResouce.connect('192.168.1.2',8080);
        };

        barResouce.subscribe(function(msg){
            var data = JSON.parse(msg);
            if (data.name){
                console.log('subscribe ctrl barResouce:',msg, data);
                $scope.items.some(function(v,i){
                    console.log('send datav:', v.name, data.name);
                    if (v.name === data.name){
                        barResouce.send(JSON.stringify({ id : v.id , name : data.name}));
                        console.log('send resouce', { id : v.id , name : data.name});
                    }
                });
            }
        });

        $scope.add = function(){
            $scope.items.push({id : $scope.id, name :$scope.name});
        }
    });
