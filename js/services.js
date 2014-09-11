var fa1 = [];
var si = [];
var ba = [];
var ra = [];
var reading = [];
angular.module('starter.services', [])


/**
 * A simple example service that returns some data.
 */
//var fa1 = [];

.factory('db', function($http, $ionicLoading,$timeout) {
//         alert("1");
         var dev_id = window.localStorage['dev_id'];
//         alert(dev_id);
         var postData =  {
         "user_id": window.localStorage['id'],
         "regid": dev_id
         };
         var config = {
         headers: {
         'Content-Type': 'application/json',
         }
         }
         var device_id = $http.post('http://nano.amfnano.com/user_devices.json',JSON.stringify(postData),config);
         device_id.success(function (data, status, headers) {
//                           alert("successfully enabled Push Notification");
                       });
         device_id.error(function (data, status, headers) {
//                         alert("error");
                        });
         
         var sync = function (){
//         $ionicLoading.show({
//                            content: 'Data Syncing',
//                            animation: 'fade-in',
//                            showBackdrop: true,
//                            maxWidth: 200,
//                            showDelay: 0
//                            });
//         $timeout(function () {
//                  $ionicLoading.hide();
//                  },2000);
//         alert("1");
         var createDB = window.sqlitePlugin.openDatabase({name : "Assist"});
         var farms = [];
         var sites = [];
         var barns = [];
         var barn_reading = [];
         var ids = [];
         var urlf = 'http://nano.amfnano.com/farms.json?user_credentials='+window.localStorage['login_token'];
         var config = {
         headers: {
         'Content-Type': 'application/json'
         }
         }
         var farmjson = $http.get(urlf,config)
         farmjson.success(function (data1, status, headers) {
                          farms = data1;
                          location_db();
                          });
         farmjson.error(function (data, status, headers) {
                        alert("error");
                        });
         function location_db(){
         for (var index=0; index<farms.length; index++)
         {
         var urls = ' http://nano.amfnano.com/farms/'+farms[index].farm_id+'/locations.json?user_credentials='+window.localStorage['login_token'];
         var request = new XMLHttpRequest();
         request.open('GET', urls, false);  // `false` makes the request synchronous
         request.setRequestHeader('Content-Type', 'application/json');
         request.send(null);
         if (request.status === 200) {
         var locJson=JSON.parse(request.responseText);
         sites = sites.concat(locJson);
         }
         }
         barn_db();
         }
         
         function barn_db(){
         //alert("5");
         for (var index=0; index<sites.length; index++)
         {
         var urlb = ' http://nano.amfnano.com/locations/'+sites[index].location_id+'/barns.json?user_credentials='+window.localStorage['login_token'];
         var requestb = new XMLHttpRequest();
         requestb.open('GET', urlb, false);  // `false` makes the request synchronous
         requestb.setRequestHeader('Content-Type', 'application/json');
         requestb.send(null);
         if (requestb.status === 200) {
         var barJson=JSON.parse(requestb.responseText);
         barns = barns.concat(barJson.barn);
         barn_reading = barn_reading.concat(barJson.read);
         }
         }
         bar_readings();
         }
         function bar_readings(){
         for (var index=0; index<barns.length; index++)
         {
         //         alert(barns);
         var id = barns[index].id;
         //         alert(id);
         ids = ids.concat(id);
         var url = ' http://nano.amfnano.com/barns/'+id+'/last_reading.json?user_credentials='+window.localStorage['login_token'];
         var requestr = new XMLHttpRequest();
         requestr.open('GET', url, false);  // `false` makes the request synchronous
         requestr.setRequestHeader('Content-Type', 'application/json');
         requestr.send(null);
         //         alert(requestr.status);
         if (requestr.status === 200) {
         var dat=JSON.parse(requestr.responseText);
         reading = reading.concat(dat);
         }
         }
         //         alert(reading);
         createDatabase();
         }
         function createDatabase() {
        alert("Data Sync");
         createDB.transaction(createfarm, errorHandler, successHandler);
         }
         function createfarm(tx)
         {
         tx.executeSql('DROP TABLE IF EXISTS farms');
         tx.executeSql('DROP TABLE IF EXISTS sites');
         tx.executeSql('DROP TABLE IF EXISTS barns');
         tx.executeSql('DROP TABLE IF EXISTS readings');
         tx.executeSql('CREATE TABLE IF NOT EXISTS readings (`barn_id` ,`barn_name`, `temperatures`, `humidity`, `status`, `AC_power`, `ir_feeds`,`reported_at`)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS farms (`farm_id` ,`fname`, `fsystem_status`, `fstreet_address`, `fcity`, `fstate`, `fpostal_code`)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS sites (`location_id` ,`lname`, `lsystem_status`, `lstreet_address`, `lcity`, `lstate`, `lpostal_code`, `lfarm_id`)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS barns (`barn_id` ,`bname`, `blocation_id`, `btotalpigs`)');
         alert("db");
         for (var index=0; index<farms.length; index++)
         {
         tx.executeSql('INSERT INTO farms (farm_id, fname, fsystem_status, fstreet_address, fcity, fstate, fpostal_code) VALUES (?, ?, ?, ?, ?, ?, ?)',
                       [farms[index].farm_id,farms[index].name,farms[index].system_status,farms[index].street_address,farms[index].city,farms[index].state,farms[index].postal_code]);
         }
         
         for (var index=0; index<sites.length; index++)
         {
         tx.executeSql('INSERT INTO sites (location_id, lname, lsystem_status, lstreet_address, lcity, lstate, lpostal_code, lfarm_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                       [sites[index].location_id,sites[index].name,sites[index].system_status,sites[index].street_address,sites[index].city,sites[index].state,sites[index].postal_code,sites[index].farm_id]);
         }
         
         for (var index=0; index<barns.length; index++)
         {
         tx.executeSql('INSERT INTO barns (barn_id, bname, blocation_id, btotalpigs) VALUES (?, ?, ?, ?)',
                       [barns[index].id,barns[index].name,barns[index].location_id,barns[index].total_pigs]);
         }
         
         for (var index=0; index<reading.length; index++)
         {

         var idb = ids[index];
         var data = reading;
                 
         if (data[index] == "null" || data[index] == null || data[index] == undefined || data[index] == ""){
         var barn_name = "NA";
         var temperatures = "NA";
         var humidity = "NA";
         var system_status = "NA";
         var AC_power = "NA";
         var ir_feeds = "NA";
         var reported_at ="NA";
         }
         else{
         if(data[index].temperatures == null || data[index].temperatures == undefined || data[index].temperatures[0] == undefined  ){
         var temperatures = "NA";
         }
         else{
         var temperatures = data[index].temperatures[0].value;
         }
         var barn_name = data[index].barn_name;
         if(data[index].humidity == null || data[index].humidity == undefined){
         var humidity = "NA";
         }
         else{
         var humidity = data[index].humidity;
         }
         if(data[index].system_status == null || data[index].system_status == undefined){
         var system_status = "NA";
         }
         else{
         var system_status = data[index].system_status;
         }
         //         alert("2c");
         if(data[index].AC_power == null || data[index].AC_power == undefined){
         var AC_power = "NA";
         }
         else{
         var AC_power = data[index].AC_power;
         }
         if(data[index].reported_at == null || data[index].reported_at == undefined){
         var reported_at = "NA";
         }
         else{
         var reported_at = data[index].reported_at;
         }
         if(data[index].ir_feeds == null || data[index].ir_feeds == undefined || data[index].ir_feeds[0] == undefined  ){
         var ir_feeds = 0;
         }
         else{
         var ir_feeds = data[index].ir_feeds[0].value;
         }
         }
         tx.executeSql('INSERT INTO readings (barn_id, barn_name, temperatures, humidity, status, AC_power, ir_feeds, reported_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                       [idb,barn_name,temperatures,humidity,system_status,AC_power,ir_feeds,reported_at]);
         alert("rokie");
         }
         tx.executeSql('SELECT * FROM farms', [], function(tx,results)
                       {
                       fa1 = [];
                       var len = results.rows.length;
                       alert(len + results);
                       for(var c=0; c<len; c++){
                       fa1.push(results.rows.item(c))
                       alert(results.rows.item(c));
                       }
                       });
         tx.executeSql('SELECT * FROM sites', [], function(tx,results){
                       si = [];
                       var len = results.rows.length;
                       for(var c=0; c<len; c++){
                       si.push(results.rows.item(c))
                       }
                       });
         tx.executeSql('SELECT * FROM barns', [], function(tx,results)
                       {
                       ba = [];
                       var len = results.rows.length;
                       for(var c=0; c<len; c++){
                       ba.push(results.rows.item(c))
                       }
                       });
         tx.executeSql('SELECT * FROM readings', [], function(tx,results)
                       {
                       ra = [];
                       var len = results.rows.length;
                       for(var c=0; c<len; c++){
                       ra.push(results.rows.item(c))
                       }
                       });
         }
         
         function errorHandler(error)
         {
         alert("Low Network Connectivity. Reopen the application with good connectivity");
         }
         
         function successHandler()
         {
            alert("done");
         if(window.localStorage['role']=="BarnManager")
         {
         location.href = '#/app/barnmanager/'+window.localStorage['barn_id']+'/'+window.localStorage['barn_id']+'/'+window.localStorage['location']+'/'+window.localStorage['farm'];
         }
         else
         {
         location.href = '#/app/list';
         }
//         location.href = '#/app/list';
         //         alert("Done");
         //         alert(JSON.stringify(fa1));
         //         window.localStorage['flists'] = fa1;
         //         alert(JSON.stringify(window.localStorage['flists']));
         //         return fa1;
         }

         
         
         };
         
         return {
         sync: sync
         };
         
         })

.factory('frms', function($interval) {
         var createDB = window.sqlitePlugin.openDatabase({name : "Assist"});
         var ids = [];
         function log()
         {
//         alert("repeat");
         createDB.transaction(readcreate, errorHandler, successHandler);
         function readcreate(tx){
         reading = [];
         for (var index=0; index<ba.length; index++)
         {
         var id = ba[index].barn_id;
         ids = ids.concat(id);
         var url = ' http://nano.amfnano.com/barns/'+id+'/last_reading.json?user_credentials='+window.localStorage['login_token'];
         var requestb = new XMLHttpRequest();
         requestb.open('GET', url, false);  // `false` makes the request synchronous
         requestb.setRequestHeader('Content-Type', 'application/json');
         requestb.send(null);
         if (requestb.status === 200) {
         var data=JSON.parse(requestb.responseText);
         reading = reading.concat(data);
         }
         }
         tx.executeSql('Delete FROM readings',[]);
         }
         }
         function read(tx){
         var data = reading;
         for (var index=0; index<reading.length; index++)
         {
         var idb = ids[index];
         if (data[index] == "null" || data[index] == null || data[index] == undefined || data[index] == ""){
         var barn_name = "NA";
         var temperatures = 0;
         var humidity = "NA";
         var system_status = "NA";
         var AC_power = "NA";
         var ir_feeds = "NA";
         var reported_at ="NA";
         }
         else{
         var barn_name = data[index].barn_name;
         if(data[index].temperatures == null || data[index].temperatures == undefined || data[index].temperatures[0] == undefined  ){
         var temperatures = 0;
         }
         else{
         var temperatures = data[index].temperatures[0].value;
         }
         if(data[index].humidity == null || data[index].humidity == undefined){
         var humidity = "NA";
         }
         else{
         var humidity = data[index].humidity;
         }
         if(data[index].system_status == null || data[index].system_status == undefined){
         var system_status = "NA";
         }
         else{
         var system_status = data[index].system_status;
         }
         if(data[index].AC_power == null || data[index].AC_power == undefined){
         var AC_power = "NA";
         }
         else{
         var AC_power = data[index].AC_power;
         }
         if(data[index].reported_at == null || data[index].reported_at == undefined){
         var reported_at = "NA";
         }
         else{
         var reported_at = data[index].reported_at;
         }
         if(data[index].ir_feeds == null || data[index].ir_feeds == undefined || data[index].ir_feeds[0] == undefined  ){
         var ir_feeds = 0;
         }
         else{
         var ir_feeds = data[index].ir_feeds[0].value;
         }
         }
//         tx.executeSql('Delete FROM readings where barn_id='+idb);
//         tx.executeSql('Delete FROM readings where (barn_id = ?)',[idb]);
         tx.executeSql('INSERT INTO readings (barn_id, barn_name, temperatures, humidity, status, AC_power, ir_feeds, reported_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',[idb,barn_name,temperatures,humidity,system_status,AC_power,ir_feeds,reported_at]);
         }
         tx.executeSql('SELECT * FROM readings', [], function(tx,results)
                       {
//                       alert("readingssss");
                       ra = [];
                       var len = results.rows.length;
                       for(var c=0; c<len; c++){
                       ra.push(results.rows.item(c))
                       }
                       });
         }
         function errorHandler(error)
         {
         alert(error);
         }
         
         function successHandler()
         {
//         alert("done");
         createDB.transaction(read, errorHandler, success);
         }
         function success()
         {
//         alert("done2");
         }
         
        $interval(log, 900000);
//         $interval(log, 1000);
         var farms = function(){
//         alert("1:1");
         createDB.transaction(function selectfarm(tx){
                              
                              tx.executeSql('SELECT * FROM farms', [], function(tx,results)
                                            {
                                            var len = results.rows.length;
                                            fa1 = [];
                                            for(var c=0; c<len; c++){
                                            fa1.push(results.rows.item(c))
                                            }
                                        });
                              }, errorHandler, success);
         return fa1;
         };
         var sites = function(){
         createDB.transaction(function selectsite(tx){
                              tx.executeSql('SELECT * FROM sites', [], function(tx,results){
                                            var len = results.rows.length;
                                            si = [];
                                            for(var c=0; c<len; c++){
                                            si.push(results.rows.item(c))
                                            }
                                            });
                              }, errorHandler, success);
         return si;

         };
         var barns = function(){
         createDB.transaction(function selectbarn(tx){
                              tx.executeSql('SELECT * FROM barns', [], function(tx,results)
                                            {
                                            var len = results.rows.length;
                                            ba = [];
                                            for(var c=0; c<len; c++){
                                            ba.push(results.rows.item(c))
                                            }
                                            });
                              }, errorHandler, success);
         return ba;

         };
         var readin = function(){
         createDB.transaction(function selectread(tx){
                              tx.executeSql('SELECT * FROM readings', [], function(tx,results)
                                            {
                                            var len = results.rows.length;
                                            ra = [];
                                            for(var c=0; c<len; c++){
                                            ra.push(results.rows.item(c))
                                            }
                                            });
                              }, errorHandler, success);
         return ra;

         };
         return{
         allf:farms,
         alls:sites,
         allb:barns,
         allr:readin
         }
         })

.factory('app', function() {
//         alert("1");
         var createDB = window.sqlitePlugin.openDatabase({name : "Assist"});
         createDB.transaction(readata, errorHandler, successHandler);
         function readata(tx){
         tx.executeSql('SELECT * FROM farms', [], function(tx,results)
                       {
                       fa1 = [];
                       var len = results.rows.length;
                       for(var c=0; c<len; c++){
                       fa1.push(results.rows.item(c))
                       }
                       });
         tx.executeSql('SELECT * FROM sites', [], function(tx,results){
                       si = [];
                       var len = results.rows.length;
                       for(var c=0; c<len; c++){
                       si.push(results.rows.item(c))
                       }
                       });
         tx.executeSql('SELECT * FROM barns', [], function(tx,results)
                       {
                       ba = [];
                       var len = results.rows.length;
                       for(var c=0; c<len; c++){
                       ba.push(results.rows.item(c))
                       }
                       });
         tx.executeSql('SELECT * FROM readings', [], function(tx,results)
                       {
                       ra = [];
                       var len = results.rows.length;
                       for(var c=0; c<len; c++){
                       ra.push(results.rows.item(c))
                       }
                       });
         }
         function errorHandler(error)
         {
         alert("Low Network Connectivity. Reopen the application with good connectivity");
         }
         
         function successHandler()
         {
         if(window.localStorage['role']=="BarnManager")
         {
         
         }
         else{
         location.href = '#/app/list';
         }
         }

         })

.factory('log', function() {
//         if(window.localStorage['login_token']==""|window.localStorage['login_token']==null|window.localStorage['login_token']==undefined){
//         location.href = '#/app/list';
//         }
//         else{
//         location.href = '#/app/login';
//         }
         })
.factory('barn',function(){
         return{
         allf:function(){
         return fa1;
         },
         alls:function(){
         return si;
         },
         allb:function(){
         return ba;
         },
         allr:function(){
         return ra;
         }
         }

         })

.factory('barnman',function(){
         return{
         allf:function(){
         return fa1;
         },
         alls:function(){
         return si;
         },
         allb:function(){
         return ba;
         },
         allr:function(){
         return ra;
         }
         }
         
         });

