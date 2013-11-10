
angular.module('ng-app', ['ng-barcoder'])
    .controller('bCtrl', function($scope, barResouce, storage) {
        console.log('ng-app start');
        /* web socket */
        storage.bind($scope,'items', {defaultValue: new Array() ,storeName: 'barData'});
        //angular-storageにバインディングしたものをng-repeatすると落ちるので苦肉の策
        $scope.list=[];
        $scope.items.forEach(function(e){
            $scope.list.push({id : e.id, name : e.name});
        });

        $scope.connect=function(){
            barResouce.connect('192.168.1.2',8080);
        };

        barResouce.subscribe(function(msg){
            console.log(msg);
            var data = JSON.parse(msg);
            console.log('get discribe!');
            if (data.name){
                console.log('subscribe ctrl barResouce:',msg, data);
                $scope.items.some(function(v,i){
                    console.log('send datav:', v.name, data.name);
                    if (v.name === data.name){
                        barResouce.send(JSON.stringify({ id : v.id.toUpperCase() , name : data.name, checkin : data.checkin}));
                        console.log('send resouce', { id : v.id.toUpperCase() , name : data.name, checkin : data.checkin});
                    }
                });
            }else if (data.id){
                console.log('subscribe client -> res barResouce:');
                $scope.items.some(function(v,i){
                    console.log('send datav:', v.id, data.id);
                    if (v.id === data.id){
                        $scope.items[i] = { id : v.id.toUpperCase() , name : data.name, checkin : data.checkin};
                        console.log('send resouce', { id : v.id.toUpperCase() , name : data.name, checkin : data.checkin});
                    }
                });
            }

        });

        $scope.add = function(){
            $scope.items.push({id : $scope.id.toUpperCase(), name :$scope.name, checkin : false});
            $scope.list.push({id : $scope.id.toUpperCase(), name :$scope.name, checkin : false});
        }
    });
