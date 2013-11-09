
angular.module('ng-barcoder', ['ngResource','ngCookies','angularLocalStorage'])
    .config(function($httpProvider){
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }).factory('barResouce', function(){
        var service = {};
        console.log('angular ws ');
        service.connect = function(server, port){
            console.log('barResouce.connect');
            if (service.ws){return;}
            var ws = new WebSocket('ws://'+server+':'+port+'/');
            ws.onopen=function(){
                service.callback(JSON.stringify({ msg : 'open connection'}));
            }
            ws.onerror=function(){
                service.callback(JSON.stringify({ msg : 'ws error'}));
            }
            ws.onmessage=function(msg){
                service.callback(msg.data);
            }
            service.ws=ws;
        };
        service.send = function(msg){
            service.ws.send(msg);
        };
        service.subscribe = function(callback){
            service.callback=callback;
        };
        return service;
    })
    .factory('barcoder', function($http,  $resource){
        var bcd = {
            bText : undefined,
            bView : undefined,
            bType : undefined,
            server : undefined,
            port : undefined
        };
        bcd.init = function(textId, barId, barType, server, port){
            bcd.bText = $("#" + textId);
            bcd.bView = $("#" + barId);
            bcd.bType = barType;
            bcd.server = server;
            bcd.port = port;
            console.log('barcoder init');
        };
        bcd.input = function(data){
            console.log('input()');
            $http({method: 'GET', url: 'http://' + bcd.server + ':' + bcd.port + '/get/' + data}).
                success(function(data, status, headers, config) {
                    console.log('ok');
                    bcd.bView.barcode(data.id, bcd.bType, {
                        barWidth :2
                        ,barHeight : 60
                        ,fontSize:30
                    });
                }).
                error(function(data, status, headers, config) {
                    console.log('error',data, status, headers, config);
                });
            };
        return bcd;
    })
    .factory('barClient', function(){
        var service = {};
        console.log('angular ws ');
        service.connect = function(server, port){
            console.log('barClient.connect');
            if (service.ws){return;}
            var ws = new WebSocket('ws://'+server+':'+port+'/');
            ws.onopen=function(){
                service.callback(JSON.stringify({ msg : 'open connection'}));
            }
            ws.onerror=function(){
                service.callback(JSON.stringify({ msg : 'ws error'}));
            }
            ws.onmessage=function(msg){
                service.callback(msg.data);
            }
            service.ws=ws;
        };
        service.send = function(msg){
            service.ws.send(msg);
        };
        service.subscribe = function(callback){
            service.callback=callback;
        };
        return service;
    })
    .factory('barMobile', function(){
        var service = {};
        var bcd = {
            bText : undefined,
            bView : undefined,
            bType : undefined
        };
        bcd.init = function(textId, barId, barType, server, port){
            bcd.bText = $("#" + textId);
            bcd.bView = $("#" + barId);
            bcd.bType = barType;
        };

        console.log('angular ws ');
        service.connect = function(server, port){
            console.log('barMobile.connect');
            if (service.ws){return;}
            var ws = new WebSocket('ws://'+server+':'+port+'/');
            ws.onopen=function(){
                service.callback(JSON.stringify({ msg : 'open connection'}));
            }
            ws.onerror=function(){
                service.callback(JSON.stringify({ msg : 'ws error'}));
            }
            ws.onmessage=function(msg){
                service.callback(msg.data);
                console.log('ok',data, status, headers, config);
                bcd.bView.barcode(data.id, bcd.bType, {
                    barWidth :2
                    ,barHeight : 60
                    ,fontSize:30
                });
            }
            service.ws=ws;
        };
        service.send = function(msg){
            service.ws.send(msg);
        };
        service.subscribe = function(callback){
            service.callback=callback;
        };
        return service;
    });