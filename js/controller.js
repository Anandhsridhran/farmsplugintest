angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $http, $ionicPopup) {
            $scope.logout = function(){
            window.localStorage.removeItem('login_token');
            window.localStorage.removeItem('id');
            window.localStorage.removeItem('email');
            window.localStorage.removeItem('farm');
            window.localStorage.removeItem('barn_id');
            window.localStorage.removeItem('location');
//            alert("sdd");
//            window.sqlitePlugin.deleteDatabase({name : "Assist"});
//            alert("sdd");
            }
            if(window.localStorage['role']=="BarnManager"){
            $scope.menudisplay={text:"none"};
//            $scope.backbutton={text:"none"};
            }

            else{
            $scope.menudisplay={text:"block"};
//            $scope.backbutton={text:"block"};
            }
            $scope.setti = function() {
            $ionicPopup.confirm({
                              title: 'Sync',
                              template: 'Are you sure you want to sync data from server?',
                                buttons: [
                                          {
                                          text: 'Yes',
                                          onTap: function(e) {
                                          location.href = '#/app/settings';
                                          }
                                          },
                                          { text: 'No' },
                                          ]
                                })
                                
//                                
//                              cancelText: 'No',
//                              okText: 'Yes'
                                
//            .then(function(res) {
//                                    if(res) {
//                                    location.href = '#/app/settings';
//                                    } else {
//                                    console.log('You are not sure to sync');
//                                        }
//                                        });
            }

            })

.controller('loginCtrl', function($scope, $http, $ionicPopup, $window) {
           $scope.sw = $window.innerWidth;
            $scope.sh = $window.innerHeight;
           if($scope.sh>$scope.sw){
              $scope.wi = "{'height':'50%','width':'40%','margin-top':'10%'}";
            }
            else{
              $scope.wi = "{'height':'30%','width':'40%','margin-top':'10%'}";
            }
           function tellAngular() {
            $scope.sw = $window.innerWidth;
            $scope.sh = $window.innerHeight;
            // alert($scope.sh);
              if($scope.sh>$scope.sw){
              $scope.wi = "{'height':'50%','width':'40%','margin-top':'10%'}";
            }
            else{
              $scope.wi = "{'height':'30%','width':'40%','margin-top':'10%'}";
            }
            }
            window.onresize = tellAngular;
            $scope.tes = "Log In";
            $scope.mid = window.localStorage['dev_id'];
           alert($scope.mid);
//            if(window.localStorage['login_token']==""|window.localStorage['login_token']==null|window.localStorage['login_token']==undefined){
            $scope.butcolor = "rgb(145,165,211)";
            var logdata=[];
            $scope.name = {text:''};
            $scope.password = {text:''};
            $scope.submitbutton = function($window){
            $scope.butcolor = "rgb(90,120,189)";
            $scope.tes = "Loading......";
            $scope.click = true;
            var postData =  {
            "username": $scope.name.text,
            "password": $scope.password.text
            };
            var config = {
            headers: {
            'Content-Type': 'application/json',
            }
            }
            var login = $http.post('http://nano.amfnano.com/user_sessions.json',JSON.stringify(postData),config)
            login.success(function (data, status, headers) {
//                          alert("2");
                          window.localStorage['login_token']= data.single_access_token;
                          window.localStorage['location']= data.location_id;
                          window.localStorage['id']= data.user_id;
                          window.localStorage['role']=data.role;
                          window.localStorage['first_name']=data.first_name;
                          window.localStorage['last_name']=data.last_name;
                          window.localStorage['email']=data.email;
                          window.localStorage['farm']=data.farm_id;
                          window.localStorage['username']=data.username;
                          window.localStorage['barn_id']=data.barn_id;
                          if(data.role=="BarnManager")
                          {
                          location.href = '#/app/settings';
                          // alert(JSON.stringify(data));
                          
//                          location.href = '#/app/barnHome/'+data.barn_id+'/'+data.barn_id+'/'+data.location_id+'/'+data.farm_id;
                          }
                          else
                          {
                          location.href = '#/app/settings';
//                          location.href = '#/app/list';
                          }
                          
                          });
            login.error(function (data, status, headers) {
                        $scope.butcolor = "rgb(145,165,211)";
                        $scope.tes = "Log In";
                        $scope.click = false;
                        $ionicPopup.alert({
                                          title: data,
                                          template: '',
                                          buttons:[{text:"OK",type:"button button-clear button-positive"}]
                                          
                                          });
//                        alert("Invalid username or password");
                        });
            }
//            }
//            else{
//            if(window.localStorage['role']=="BarnManager")
//            {
//                location.href = '#/app/barnHome/'+data.barn_id+'/'+data.barn_id+'/'+data.location_id+'/'+data.farm_id;
//            }
//            else
//            {
//            location.href = '#/app/settings';
//            }
//            }
            })
.controller('loadCtrl', function($scope, $stateParams, app) {
            
            })
.controller('setCtrl', function($scope, $stateParams, db, $window) {
            $scope.sw = $window.innerWidth;
            $scope.sh = $window.innerHeight;
           if($scope.sh>$scope.sw){
              $scope.img = "{'height':'50%','width':'40%','margin-top':'20%','margin-left':'20%','margin-right':'20%'}";
              $scope.lod = "{'height':'10%','width':'20%','margin-top':'40%','margin-left':'40%','margin-right':'40%'}";
            }
            else{
              $scope.img = "{'height':'10%','width':'10%','margin-top':'20%','margin-left':'20%','margin-right':'20%'}";
              $scope.lod = "{'height':'20%','width':'10%','margin-top':'40%','margin-left':'40%','margin-right':'40%'}";
            }
           function tellAngular() {
            $scope.sw = $window.innerWidth;
            $scope.sh = $window.innerHeight;
            // alert($scope.sh);
              if($scope.sh>$scope.sw){
              $scope.img = "{'height':'50%','width':'40%','margin-top':'20%','margin-left':'20%','margin-right':'20%'}";
              $scope.lod = "{'height':'10%','width':'20%','margin-top':'40%','margin-left':'40%','margin-right':'40%'}";
            }
            else{
              $scope.img = "{'height':'10%','width':'10%','margin-top':'20%','margin-left':'20%','margin-right':'20%'}";
              $scope.lod = "{'height':'20%','width':'10%','margin-top':'40%','margin-left':'40%','margin-right':'40%'}";
            }
            }
            window.onresize = tellAngular;           
            $scope.sync = db.sync();
            })
.controller('dashCtrl', function($scope, $http,$timeout, $ionicLoading,$ionicPopup) {
            
            // Setup the loader
            $ionicLoading.show({
                               content: 'Loading',
                               animation: 'fade-in',
                               showBackdrop: true,
                               maxWidth: 200,
                               showDelay: 0
                               });
            $timeout(function () {
                     $ionicLoading.hide();
                     },3000);
            //Farm GET http request
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            
            window.localStorage["PigTreatsCount"]=null;
            window.localStorage["PigDeathsCount"]=null;
            $scope.title = name;
            var url = 'http://nano.amfnano.com/farms.json?user_credentials='+window.localStorage['login_token'];
            var config = {
            headers: {
            'Content-Type': 'application/json',
             'timeout':'1000',
          
            }
            }
         
            var farmjson = $http.get(url,config)
            farmjson.success(function (data, status, headers) {
                             $scope.farms = data;
//                             alert($scope.farms);
                             var i = 0;
                             angular.forEach(data, function (count) {
                                             
                                             $scope.getLoactions(data[i].farm_id,data[i].system_status,data[i].name);
                                             i++;
                                             });
                             });
            farmjson.error(function (data, status, headers) {
                           $ionicPopup.alert({
                                             title: 'Cannot Load the content Due to network Problem',
                                             template: '',
                                             buttons:[{text:"OK",type:"button button-clear button-positive"}]
                                             
                                             });
                           });
            //Sites GET http request
            $scope.getLoactions = function (id,st,name) {
            var fname = name;
            var url2 = ' http://nano.amfnano.com/farms/'+id+'/locations.json?user_credentials='+window.localStorage['login_token'];
            
            var sitejson = $http.get(url2,config)
            sitejson.success(function (data, status, headers) {
                             var ele=angular.element(document.getElementById("farmsli"+id));
                             var result;
                             if(st=="OK")
                             {
                             result = "<ul  id='locationsul"+id+"' style='display:none'>";
                             }
                             else
                             {
                             result = "<ul  id='locationsul"+id+"'>";
                             }
                             var j=0;
                             angular.forEach(data, function (count) {
                                             //alert(j+" "+data.length);
                                             if((j+1)==data.length)
                                             {
                                             result += "<li  id='locationsli" + data[j].location_id + "' style='width:100%;float:left;padding:5%;padding-left:25px'><a style='width:100%;float:left' id='" + data[j].location_id+ "' class='locationanch'><img src='img/"+data[j].system_status+"1.png' style='margin-right:8px;float:left;margin-top:3px;'/>" + data[j].name + "</a></li>";
                                             
                                             }
                                             else
                                             {
                                             result += "<li  id='locationsli" + data[j].location_id + "' style='width:100%;float:left;border-bottom:1px solid #c3c3c3;padding:5%;padding-left:25px'><a style='width:100%;float:left;' id='" + data[j].location_id+ "' class='locationanch'><img src='img/"+data[j].system_status+"1.png' style='margin-top:3px;margin-right:8px;float:left;'/>" + data[j].name + "</a></li>";
                                             }
                                             $scope.getBarrns(data[j].location_id,data[j].system_status,data[j].name,fname);
                                            // $scope.getValuesofBarns(data[j].location_id,data[j].system_status);
                                             j++;
                                             });
                             result += "</ul>";
                             
                             ele.append(result);
                             });
            sitejson.error(function (data, status, headers) {
                           $ionicPopup.alert({
                                             title: 'Cannot Load the content Due to network Problem',
                                             template: '',
                                             buttons:[{text:"OK",type:"button button-clear button-positive"}]
                                             
                                             });
                           });
            
            }
            
            $scope.temparatureValuesJson=[];
              var getJSONvaluesTemp=[];
            
            $scope.getValuesofBarns=function(id,st){
            var tempurl3 = 'http://nano.amfnano.com/locations/'+id+'/barns.json?user_credentials='+window.localStorage['login_token'];
            var tempbarnjson = $http.get(tempurl3,config);
            
            tempbarnjson.success(function (data, status, headers) {
            
                                 var j = 0;
                               
                             angular.forEach(data, function (count) {
                                             
                                             var tempurl4 = 'http://nano.amfnano.com/barns/'+data[j].barn_id+'/last_reading.json?user_credentials='+window.localStorage["login_token"];
                                             
                                             var temparatureValue,HumValue;
                                             // var temparatureJson= $http.get(url4,config);
                                             
                                             var testTemperarureValues= $http.get(tempurl4,config);
                                             testTemperarureValues.success(function (resp, status, headers) {
                                                                     var tempJson={};
                                                                         var Burndata=resp;
                                                                         if(Burndata.temperatures.length == 0 || Burndata.temperatures == undefined ){
                                                                         temparatureValue = "NA";
                                                                         }
                                                                         else{
                                                                         temparatureValue = Burndata.temperatures[0].value;
                                                                         }
                                                                         if(Burndata.humidity == null || Burndata.humidity == undefined){
                                                                         HumValue = "NA";
                                                                         }
                                                                         else{
                                                                         HumValue = Burndata.humidity;
                                                                         }
                                                                        tempJson={"temparature":temparatureValue,"humidity":HumValue};
                                                                             
                                                                    getJSONvaluesTemp.push(tempJson);
                                                                           
                                                                            j++;
                                                                             
                                                                         });
                                           
//                                             alert(JSON.stringify(getJSONvaluesTemp));


                                             });
                             });
            
            
           
            
                    $scope.getBarrns(id,st,lname,fname);
            
            }
            
            
            
            
            
            //Barns GET http request
            $scope.getBarrns = function (id,st,lname,fname) {
               // alert(JSON.stringify($scope.temparatureValuesJson));
            var url3 = 'http://nano.amfnano.com/locations/'+id+'/barns.json?user_credentials='+window.localStorage['login_token'];
            var lname = lname;
            var fname = fname;
            var barnjson = $http.get(url3,config);
            barnjson.success(function (data, status, headers) {
                             var tempDataObject=data;
                             //alert(tempDataObject.barn[0].name);
                             var ele = angular.element(document.getElementById("locationsli" + id));
                             var result;
                             if(st=="OK")
                             {
                             result = "<ul  id='barnsul" + id + "'  style='display:none;background-color:rgb(131,155,207);margin-top:5%;float:left;'>";
                             }
                             else
                             {
                             result = "<ul  id='barnsul" + id + "' style='background-color:rgb(131,155,207);margin-top:5%;float:left;'>";
                             }
                             
                             var j = 0;
                             var k=0;

                            for (var h=0; h<tempDataObject.barn.length; h++){
                             if(tempDataObject.read[j]!=null && tempDataObject.read[j]!=undefined)
                             {
                             
                             var humBarn='';
                             if(tempDataObject.read[j].humidity== null || tempDataObject.read[j].humidity == undefined){
                            humBarn = "NA";
                             }
                             else{
                             humBarn = tempDataObject.read[j].humidity;
                             }
                             
                                                                           if((j+1)==tempDataObject.barn.length)
                                                                           {
                                                                           result += "<li style='width:100%;float:left;padding-top:5%;background-color:rgb(131,155,207);padding-right:5%;padding-bottom:5%;margin-left:7%;'><a id='anch"+tempDataObject.barn[j].id+"' style='width:100%;float:left;text-decoration:none;color:white;padding-left:6px;' href='#/app/barnHome/"+tempDataObject.barn[j].id+"/"+tempDataObject.barn[j].name+"/"+lname+"/"+fname+"'><img src='img/"+tempDataObject.read[j].system_status+"1.png' style='margin-right:8px;float:left;margin-top:3px;'/><span style='float:left;'>" + tempDataObject.barn[j].name +" </span><span style='color:white;margin-left:10px;font-size:10px;float:left;'>"+humBarn+"%</span><span style='margin-left:10px;;color:white;font-size:10px;float:left;'>"+tempDataObject.barn[j].total_pigs+"</span></a></li>";
                                                                           }
                                                                           else{
                                                                           result += "<li style='border-bottom:1px solid #c3c3c3;width:100%;float:left;padding-top:5%;background-color:rgb(131,155,207);padding-right:5%;padding-bottom:5%;margin-left:7%;'><a id='anch"+tempDataObject.barn[j].id+"'  href='#/app/barnHome/"+tempDataObject.barn[j].id+"/"+tempDataObject.barn[j].name+"/"+lname+"/"+fname+"' style='width:100%;float:left;text-decoration:none;color:white;padding-left:6px;'><img src='img/"+tempDataObject.read[j].system_status+"1.png' style='margin-right:8px;float:left;margin-top:3px;' /><span style='float:left;'>" + tempDataObject.barn[j].name +"</span><span style='color:white;margin-left:10px;font-size:10px;float:left;'>"+humBarn+"%</span><span style='color:white;margin-left:10px;font-size:10px;float:left;'>"+tempDataObject.barn[j].total_pigs+"</span></a></li>";
                                                                           }
                             }
                             else
                             {
                             if((j+1)==tempDataObject.barn.length)
                             {
                             result += "<li style='width:100%;float:left;padding-top:5%;background-color:rgb(131,155,207);padding-right:5%;padding-bottom:5%;margin-left:7%;'><a id='anch"+tempDataObject.barn[j].id+"' style='width:100%;float:left;text-decoration:none;color:white;padding-left:6px;' href='#/app/barnHome/"+tempDataObject.barn[j].id+"/"+tempDataObject.barn[j].name+"/"+lname+"/"+fname+"'><img src='img/1.png' style='margin-right:8px;float:left;margin-top:3px;'/><span style='float:left;'>" + tempDataObject.barn[j].name +"</span><span style='margin-left:10px;;color:white;font-size:10px;float:left;'>"+tempDataObject.barn[j].total_pigs+"</span></a></li>";
                             }
                             else{
                             result += "<li style='border-bottom:1px solid #c3c3c3;width:100%;float:left;padding-top:5%;background-color:rgb(131,155,207);padding-right:5%;padding-bottom:5%;margin-left:7%;'><a id='anch"+tempDataObject.barn[j].id+"'  href='#/app/barnHome/"+tempDataObject.barn[j].id+"/"+tempDataObject.barn[j].name+"/"+lname+"/"+fname+"' style='width:100%;float:left;text-decoration:none;color:white;padding-left:6px;'><img src='img/1.png' style='margin-right:8px;float:left;margin-top:3px;' /><span style='float:left;'>" + tempDataObject.barn[j].name +"</span><span style='float:left;color:white;margin-left:10px;font-size:10px;'>"+tempDataObject.barn[j].total_pigs+"</span></a></li>";
                             }

                             }
                                                                      //  $scope.getlastReading(tempDataObject[j].barn_id);
                                                                           j++;

                             

                             }
                             result += "</ul>";
                             
                             ele.append(result);
                             });
            barnjson.error(function (data, status, headers) {
                           $ionicPopup.alert({
                                             title: 'Cannot Load the content Due to network Problem',
                                             template: '',
                                             buttons:[{text:"OK",type:"button button-clear button-positive"}]
                                             
                                             });
                           });
            }
            
                       })


.controller('barnHomeCtrl', function($scope, $stateParams, $http,$timeout,$filter, $ionicLoading,$ionicPopup) {
            
            // Setup the loader
            $ionicLoading.show({
                               content: 'Loading',
                               animation: 'fade-in',
                               showBackdrop: true,
                               maxWidth: 200,
                               showDelay: 0
                               });
            $timeout(function () {
                     $ionicLoading.hide();
                     },2000);
            //$scope.barn = Farms.get($stateParams.farmId);
            var config = {
            headers: {
            'Content-Type': 'application/json',
            }
            }
            var bid= $stateParams.barn_id;
            $scope.inventoryBtnStatus={text:"block"};
            $scope.barnid=bid;
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            if(window.localStorage["role"]=="BarnManager")
            {
            
                $scope.inventoryBtnStatus={text:"block"};
                var urlbm1 = 'http://nano.amfnano.com/farms.json?user_credentials='+window.localStorage['login_token'];
                var urlbm2 = ' http://nano.amfnano.com/farms/'+window.localStorage['farm']+'/locations.json?user_credentials='+window.localStorage['login_token'];
                var urlbm3 = 'http://nano.amfnano.com/locations/'+window.localStorage['location']+'/barns.json?user_credentials='+window.localStorage['login_token'];
                var farmnam = $http.get(urlbm1,config)
                farmnam.success(function (data, status, headers) {
                                $scope.fname = data[0].name;
                            });
                var locnam = $http.get(urlbm2,config)
                locnam.success(function (data, status, headers) {
                            $scope.lname = data[0].name;
                            });
                var banam = $http.get(urlbm3,config)
                banam.success(function (data, status, headers) {
                           $scope.bname = data.barn[0].name;
//                              alert(JSON.stringify(data));
                           });
            }
            else
            {
                $scope.inventoryBtnStatus={text:"none"};
            $scope.bname = $stateParams.barn_name;
            $scope.lname = $stateParams.loc_name;
            $scope.fname = $stateParams.farm_name;

            }
            $scope.title = name;
            var urla='http://nano.amfnano.com/barns/'+$stateParams.barn_id+'/last_reading.json?user_credentials='+window.localStorage["login_token"];
            var urlb='http://nano.amfnano.com/barns/'+$stateParams.barn_id+'/last_inventory_report.json?user_credentials='+window.localStorage["login_token"];
            var urlc='http://nano.amfnano.com/barns/'+$stateParams.barn_id+'/last_event_report.json?user_credentials='+window.localStorage["login_token"];
            var barnbody = "";
            var temp = "";
            var hum = "";
            var feed = "";
            var ac = "";
            var barname = "";
            var reported_at = "";
            var systemstatus = "";
            var databarn={};
            var invdata={};
            var eventsdata={};
            //alert(url);
            var barninfo1 = $http.get(urla,config);
            
            barninfo1.success(function (data, status, headers) {
                              databarn=data;
                              $scope.barname = databarn.barn_name;
                              if(databarn.temperatures.length == 0 || databarn.temperatures == undefined ){
                              $scope.temp = "NA";
                              }
                              else{
                              $scope.temp = databarn.temperatures[0].value;
                              }
                              //alert("1");
                              if(databarn.ir_feeds.length == 0 || databarn.ir_feeds == undefined ){
                              $scope.feed = "";
                              }
                              else{
                              $scope.feed = databarn.ir_feeds[0].status;
                              }
                              //alert("2");
                              if(databarn.humidity == null || databarn.humidity == undefined){
                              $scope.hum = "NA";
                              }
                              else{
                              $scope.hum = databarn.humidity;
                              }
                              // alert("3");
                              if(databarn.AC_power == null || databarn.AC_power == undefined){
                              $scope.ac = "";
                              }
                              else{
                              $scope.ac = databarn.AC_power;
                              }
                              //alert("4");
                              if(databarn.reported_at == null || databarn.reported_at == undefined){
                              $scope.reported_at = "";
                              }
                              else{
                              $scope.reported_at = databarn.reported_at;
//                              var reported_at = new Date(databarn.reported_at);
//                              $scope.reported_at= $filter("date")(new Date(databarn.reported_at), 'dd/MM/yyyy, HH:mm ');
//                              alert($scope.reported_at);
                              }
                              // alert("5");
                              if(databarn.system_status == null || databarn.system_status == undefined){
                              $scope.systemstatus = "";
                              }
                              else{
                              $scope.systemstatus = databarn.system_status;
                              }
                              
                              });
            var barninfo2 = $http.get(urlb,config);
            
            barninfo2.success(function (data, status, headers) {
                              $scope.total_inventory=data.total_inventory;
                              $scope.report_date=data.report_date;
                              var dayname=new Date(data.report_date);
                              $scope.dayname=$filter('date')(new Date(dayname), 'EEEE');
                              //$scope.convertDateStringsToDates(data.report_date);
                             
                              if(data.pig_deaths.length==0){
                              $scope.pig_death=0;
                              }
                              else
                              {
                              $scope.pig_death=data.pig_deaths.length;
                              }
                              if(data.pig_treatments.length==0){
                              $scope.pig_sick=0;
                              }
                              else
                              {
                              $scope.pig_sick=data.pig_treatments.length;
                              }
                              // $scope.datetemp=data.report_date;
                              // alert($scope.datetemp);
                              
                              // $scope.dt=Date.parse($scope.date);
                              });
            var barninfo3 = $http.get(urlc,config);
            barninfo3.success(function (data, status, headers) {
                              $scope.eventshistory = data;
                              // alert(JSON.stringify(data));
                              $scope.eventdescription=data.description;
                              $scope.eventreported_at=data.reported_at;
                              //alert($scope.barn_events);
                              });
            
            
            })

.controller('inventoryCtrl', function($scope, $stateParams, $http,$filter,$rootScope,$timeout,$ionicPopup) { //, $ionicLoading
            //focus('focusMe');
            // Setup the loader
//            $ionicLoading.show({
//                               content: 'Loading',
//                               animation: 'fade-in',
//                               showBackdrop: true,
//                               maxWidth: 200,
//                               showDelay: 0
//                               });
//            $timeout(function () {
//                     $ionicLoading.hide();
//                     },1000);
            var PigdetailsObject=[];
            $scope.bname = $stateParams.barn_name;
            $scope.lname = $stateParams.loc_name;
            $scope.fname = $stateParams.farm_name;
            $scope.barn_id=$stateParams.barn_id;
            
            $scope.pignoshipment = {text:''};
            $scope.supplier = {text:''};
            $scope.pignodeath = {text:''};
            $scope.pigntreated = {text:''};
//            $scope.bmpage() = function(){
//            location.href="#/app/barnmanager/"+$scope.barn_id+"/"+$scope.bname+"/"+{{lname}}/{{fname}}"
//            };
            
            if($rootScope.pigarrayDeaths!=undefined)
            {
            
            if(window.localStorage["PigDeathsCount"]>0)
            {
//            alert(JSON.stringify($rootScope.pigarrayDeaths));
            $scope.pignodeath ={text: window.localStorage["PigDeathsCount"]};
            var Divele = angular.element(document.getElementById("deathPigDiv"));
            var result='';
            $scope.LoadPoints =  [{ Id: '1', Text:'Scrotal Rupture' },
                                  
                                  { Id: '2', Text: 'Lame/BadLeg' },
                                  
                                  { Id: '3', Text: 'Humpback' },
                                  
                                  { Id: '4', Text: 'Strep' },
                                  
                                  { Id: '5', Text: 'Greasy pig' },
                                  
                                  { Id: '6', Text: 'Tail Bite' },
                                  
                                  { Id: '7', Text: 'Prolapse' },
                                  
                                  { Id: '8', Text: 'Abcess' },
                                  
                                  { Id: '9', Text: 'Hematoma Ear' },
                                  
                                  { Id: '10', Text: 'Euthanized' },
                                  
                                  { Id: '11', Text: 'Dead On Arrival' },
                                  
                                  { Id: '12', Text: 'Dead within 24 hrs' }
                                  
                                  
                                  
                                  ];
            var cargo={CargoItems:[]};
            
            
            for (var m=0; m<window.localStorage["PigDeathsCount"]; m++)
            {
            var tempIpigDetails={};
            var tempReason;
            if($rootScope.pigarrayDeaths[m].cause=="Scrotal Rupture")
            {
            tempReason=0;
            }
            if($rootScope.pigarrayDeaths[m].cause=="Lame/BadLeg")
            {
            tempReason=1;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Humpback")
            {
            tempReason=2;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Strep")
            {
            tempReason=3;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Greasy pig")
            {
            tempReason=4;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Tail Bite")
            {
            tempReason=5;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Prolapse")
            {
            tempReason=6;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Abcess")
            {
            tempReason=7;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Hematoma Ear")
            {
            tempReason=8;
            }
            
            if($rootScope.pigarrayDeaths[m].cause==">Euthanized")
            {
            tempReason=9;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Dead On Arrival")
            {
            tempReason=10;
            }
            
            if($rootScope.pigarrayDeaths[m].cause=="Dead within 24 hrs")
            {
            tempReason=11;
            }
            tempIpigDetails={count:(m+1),LoadPoint: $scope.LoadPoints[tempReason]};
            cargo.CargoItems.push(tempIpigDetails);
            //tempIpigDetails={"count":(m+1),"myReason":tempReason};
            // PigdetailsObject.push(tempIpigDetails);
            }
           // alert(JSON.stringify(cargo));
            $scope.PigDetails=PigdetailsObject;
            $scope.cargo =cargo;
            
            
            }
            }
            if($rootScope.pigarrayTreatments!=undefined)
            {
            
            if(window.localStorage["PigTreatsCount"]>0)
            {
            var pigtreatementsTempObect=[];
            for (var m=0; m<window.localStorage["PigTreatsCount"]; m++)
            {
            var subtempTreatObject={};
            subtempTreatObject={"medicine_given": $rootScope.pigarrayTreatments[m].medicine_given,"count":(m+1), "dosage": $rootScope.pigarrayTreatments[m].dosage.split("mg")[0], "how_administered": $rootScope.pigarrayTreatments[m].how_administered};
            pigtreatementsTempObect.push(subtempTreatObject);
            }
            $scope.pigntreated={text:window.localStorage["PigTreatsCount"]};
            $scope.pigtreatDetails=pigtreatementsTempObect;
            
            }
            }
            $scope.date ={text: $filter("date")(Date.now(), 'yyyy-MM-dd')};
            $scope.curdate={text: $filter("date")(Date.now(), 'yyyy-MM-dd')}
             $scope.shipmentdate ={text: $filter("date")(Date.now(), 'yyyy-MM-dd')};
//            alert($scope.date.text);
            var bid= $stateParams.barn_id;
            
            
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            $scope.title = name;
            
            var urlb='http://nano.amfnano.com/barns/'+bid+'/last_inventory_report.json?user_credentials='+window.localStorage["login_token"];
            
            var config = {
            headers: {
            'Content-Type': 'application/json',
            }
            }
            var barninfo2 = $http.get(urlb,config);
            
            barninfo2.success(function (data, status, headers) {
                             
                              $scope.reported_at=data.report_date;
                              $scope.Intials=data.user_initials;
                              $scope.total_inventory=data.total_inventory;
                              if(data.pig_deaths.length==0){
                              $scope.pig_death=0;
                              }
                              else
                              {
                              $scope.pig_death=data.pig_deaths.length;
                              }
                              if(data.pig_treatments.length==0){
                              $scope.pig_sick=0;
                              }
                              else
                              {
                              $scope.pig_sick=data.pig_treatments.length;
                              }
                              
                              });
            
            $scope.submitShipment=function(){
            var ele = angular.element(document.getElementById("shipmentDate"));
            if($scope.supplier.text!=""&&ele.val()!=""&&ele.val()<=$scope.curdate.text){
            var bookData = {
            "barn_id": bid,
            "shipment_date": ele.val(),
            "total_pigs": $scope.pignoshipment.text,
            "total_doa":"",
            "pig_supplier":$scope.supplier.text
            
            };
            var shipmenturl= 'http://nano.amfnano.com/shipments.json?user_credentials='+window.localStorage["login_token"];
            var shipment= $http.post(shipmenturl,JSON.stringify(bookData),config);
            shipment.success(function (data, status, headers) {
                             $ionicPopup.alert({
                                               title: 'Shipment Succesfully inserted',
                                               template: '',
                                               buttons:[{text:"OK",type:"button button-clear button-positive"}]
                                               
                                               });
                             location.href="#/app/barnmanager/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
                             });
            }
            else if(ele.val()>$scope.curdate.text)
            {
            $ionicPopup.alert({
                              title: 'Please enter valid shipment date',
                              template: '',
                              buttons:[{text:"OK",type:"button button-clear button-positive"}]
                              
                              });
            }
            else
            {
            $ionicPopup.alert({
                              title: 'Please enter the shipment details',
                              template: '',
                              buttons:[{text:"OK",type:"button button-clear button-positive"}]
                              
                              });
            }
            
            
            }
            $scope.saveDate=function(){
            var ele = angular.element(document.getElementById("inventoryDate"));
            if(ele.val()!=""&&ele.val()<=$scope.curdate.text)
            {
            $rootScope.inventorydate={text:ele.val()};
            location.href="#/app/inventory3/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
            }
            else
            {
            $ionicPopup.alert({
                              title: 'Please enter valid date',
                              template: '',
                              buttons:[{text:"OK",type:"button button-clear button-positive"}]
                              
                              });
            
          
            }
            }
            $scope.pigdeathsonchange=function()
            {
            
            var ele = angular.element(document.getElementById("deathPigDiv"));
            var result='';
            for (var i=0; i<$scope.pignodeath.text; i++)
            {
            result+='<label class="item item-input item-select">';
            result+='<div class="input-label">Pig '+(i+1)+'</div><select id="reason'+(i+1)+'">';
            
            result+='<options selected>Belly Rupture</option>';
            result+='<option >Scrotal Rupture</option>';
            result+='<option>Lame/BadLeg</option>';
            result+='<option>Humpback</option>';
            result+='<option>Strep</option>';
            result+='<option>Greasy pig</option>';
            result+='<option>Tail Bite</option>';
            result+='<option>Prolapse</option>';
            result+='<option>Abcess</option>';
            result+='<option>Hematoma Ear</option>';
            result+='<option>Euthanized</option>';
            result+='<option>Dead On Arrival</option>';
            result+='<option>Dead within 24 hrs.</option>';
            result+='</select>';
            result+='</label>';
            }
            window.localStorage["PigDeathsCount"]=$scope.pignodeath.text;
            
            ele.html(result);
            
            }
            
            
            $scope.pigtreatedonchange=function()
            {
            
            var ele = angular.element(document.getElementById("treatPigDiv"));
            var result='';
            for (var i=0; i<$scope.pigntreated.text; i++)
            {
            result+='<div class="item">';
            result+='<div class="input-label">Pig '+(i+1)+'</div>';
            result+='<input type="text" placeholder="Name of Medicine" id="medicine'+(i+1)+'" style="border:1px solid #c3c3c3;margin-top:2%;" required />';
            result+='<input type="text" placeholder="Dosage" id="dosage'+(i+1)+'" style="border:1px solid #c3c3c3;margin-top:2%;" required />';
            result+='<input type="text" placeholder="Route of Adminstration" id="route'+(i+1)+'" style="border:1px solid #c3c3c3;margin-top:2%;" required />';
            result+='</div>';
            }
            
            window.localStorage["PigTreatsCount"]=$scope.pigntreated.text;
            ele.html(result);
            }
            
            $scope.savepigdeath=function()
            {
            var pig_array = [];
            if($scope.pignodeath.text!="")
            {
            
            for (var i=0; i<$scope.pignodeath.text; i++)
            {
            var tempPigarray={};
            var rea = angular.element(document.getElementById("reason"+(i+1)));
            var causeofdeath=rea.val();
            if(causeofdeath=="0")
            {
               causeofdeath="Scrotal Rupture";
            }
            if(causeofdeath=="1")
            {
                causeofdeath="Lame/BadLeg";
            }

            if(causeofdeath=="2")
            {
                causeofdeath="Humpback";
            }

            if(causeofdeath=="3")
            {
                causeofdeath="Strep";
            }
            if(causeofdeath=="4")
            {
               causeofdeath="Greasy pig";
            }
            if(causeofdeath=="5")
            {
               causeofdeath="Tail Bite";
            }
            if(causeofdeath=="6")
            {
               causeofdeath="Prolapse";
            }
            if(causeofdeath=="7")
            {
               causeofdeath="Abcess";
            }
            if(causeofdeath=="8")
            {
               causeofdeath="Hematoma Ear";
            }
            if(causeofdeath=="9")
            {
               causeofdeath="Euthanized";
            }
            if(causeofdeath=="10")
            {
               causeofdeath="Dead On Arrival";
            }
            if(causeofdeath=="11")
            {
               causeofdeath="Dead within 24 hrs";
            }

            tempPigarray={"count":(i+1),"cause":causeofdeath};
            //alert(JSON.stringify(tempPigarray));
            pig_array.push(tempPigarray);
            }
            //  alert(pig_array);
            $rootScope.pigarrayDeaths=pig_array;
            window.localStorage["pigarrayDeaths"]=pig_array;
            location.href="#/app/inventory5/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
            // alert(pig_array);
            }
            else{
            $ionicPopup.alert({
                              title: 'Please Enter number',
                              template: '',
                              buttons:[{text:"OK",type:"button button-clear button-positive"}]
                              
                              });
            
            }
            }
            
            $scope.savePigtreatments=function()
            {
            var pig_treatmentarray = [];
           var ChkValidation="No";

           //  alert($scope.pigntreated.text);
            if($scope.pigntreated.text!="")
            {
            // alert(ChkValidation);
            for (var i=0; i<$scope.pigntreated.text; i++)
            {
            var tempPigtreatarray={};
            var medText = angular.element(document.getElementById("medicine"+(i+1)));
            var dosText = angular.element(document.getElementById("dosage"+(i+1)));
            var routeText = angular.element(document.getElementById("route"+(i+1)));
            var medval=medText.val();
            var dosval=dosText.val();
            var routeval=routeText.val();
            //alert(medval+"-"+dosval+"-"+routeval);
            tempPigtreatarray={"medicine_given":medval,"count":(i+1), "dosage":dosval+" mg", "how_administered":routeval};
            //  alert(JSON.stringify(tempPigtreatarray));
            pig_treatmentarray.push(tempPigtreatarray);
            //if(medText.val()!="" && dosval.val()!="" && routeval.val()!="")
            //{
            //ChkValidation="True";
            //}
            }
            //alert(pig_treatmentarray);
           
            //if(ChkValidation=="True")
            //{
            $rootScope.pigarrayTreatments=pig_treatmentarray;
            window.localStorage["pigarrayTreatments"]=pig_treatmentarray;
            location.href="#/app/review/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
            //}
            //else
            //{
            //alert("Please fill all values");
            //}
            // alert(pig_array);
            }
            else{
            $ionicPopup.alert({
                              title: 'Please Enter number',
                              template: '',
                              buttons:[{text:"OK",type:"button button-clear button-positive"}]
                              
                              });
            

            }
            }
           // $rootScope.inventorydate=$scope.date;
            $scope.no_death = function(){
            $rootScope.pigarrayDeaths=[];
            window.localStorage["PigDeathsCount"]=null;
            location.href="#/app/inventory5/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
            
            }
            $scope.no_treats=function(){
            $rootScope.pigarrayTreatments=[];
            window.localStorage["PigTreatsCount"]=null;
            location.href="#/app/review/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
            }
            if(window.localStorage["PigDeathsCount"]>0)
            {
            $scope.pignodeath ={text: window.localStorage["PigDeathsCount"]};
            }
            $scope.goBack = function() {
           // alert('mm');
            history.back();
            scope.$apply();
            }
            //alert($scope.pignodeath.text);
            $scope.cancelinc = function(){
//            alert($scope.pignodeath.text);
//            $scope.pignodeath.text == 0;
            window.localStorage.removeItem('PigDeathsCount');
            window.localStorage.removeItem('PigTreatsCount');
            };
            
            
            })
.controller('reviewCtrl', function($scope, $stateParams, $http,$filter,$rootScope,$timeout, $ionicLoading,$ionicNavBarDelegate,$ionicPopup) {
            
            if(window.localStorage["PigTreatsCount"]>0)
            {
            
            }
            
            // Setup the loader
            $ionicLoading.show({
                               content: 'Loading',
                               animation: 'fade-in',
                               showBackdrop: true,
                               maxWidth: 200,
                               showDelay: 0
                               });
            $timeout(function () {
                     $ionicLoading.hide();
                     },3000);
            $scope.bname = $stateParams.barn_name;
            $scope.lname = $stateParams.loc_name;
            $scope.fname = $stateParams.farm_name;

            $scope.pignodeath={text:""};
            $scope.pignotreat={text:""};
            $scope.pigDeathObject=[];
            $scope.PigTreatObject=[];
            var bid= $stateParams.barn_id;
            $scope.barn_id=bid;
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            $scope.title = name;
            // alert($rootScope.inventorydate);
            $scope.inventorydate=$rootScope.inventorydate.text;
            //alert($scope.inventorydate);
            var urlb='http://nano.amfnano.com/barns/'+bid+'/last_inventory_report.json?user_credentials='+window.localStorage["login_token"];
            
            var config = {
            headers: {
            'Content-Type': 'application/json',
            }
            }
            var barninfo2 = $http.get(urlb,config);
            
            barninfo2.success(function (data, status, headers) {
                              //alert(data.reported_date);
                              //alert(JSON.stringify(data));
                              $scope.reported_at=data.report_date;
//                              $scope.reported_at={text: $filter("date")(data.report_date, 'yyyy-MM-dd')};
                              $scope.Intials=data.user_initials;
                              $scope.total_inventory=data.total_inventory;
                              if(data.pig_deaths.length==0){
                              $scope.pig_death=0;
                              }
                              else
                              {
                              $scope.pig_death=data.pig_deaths.length;
                              }
                              if(data.pig_treatments.length==0){
                              $scope.pig_sick=0;
                              }
                              else
                              {
                              $scope.pig_sick=data.pig_treatments.length;
                              }
                              
                              });
            
            $scope.inventorydate={text:$rootScope.inventorydate.text};
            $scope.pigdeathStatus="none";
            $scope.pigtreatStatus="none";
 
            if(window.localStorage["PigDeathsCount"]>0)
            {
            //alert("true");
            $scope.pignodeath={text:window.localStorage["PigDeathsCount"]};
            var tempJSON=[];
            var ele = angular.element(document.getElementById("pigdeathsDiv"));
            var Deathresult='';
            //alert(JSON.stringify($rootScope.pigarrayDeaths));
            for (var i=0; i<$scope.pignodeath.text; i++)
            {
            var tempObject={};
            
            tempObject={"pigname":"Pig"+(i+1),"reason":$rootScope.pigarrayDeaths[i].cause};
            tempJSON.push(tempObject);
            //              alert($rootScope.pigarrayDeaths[i].cause);
            }
            //            alert($rootScope.testValue);
            $scope.pigDeathObject=tempJSON;
            $scope.pigdeathStatus="block";
            }
            else
            {
            //   alert("flase");
            $scope.pignodeath={text:"No"};
            $scope.pigDeathObject=[];
            $scope.pigdeathStatus="none";
            
            }
            
            
            
            // alert(JSON.stringify(tempJSON));
            //  alert("alert treat");
            
            if(window.localStorage["PigTreatsCount"]>0)
            {
            $scope.pignotreat={text:window.localStorage["PigTreatsCount"]};
            $scope.pigtreatStatus="block";
            }
            else
            {
            $scope.pignotreat={text:"No"};
            $scope.pigtreatStatus="none";
            }
            //alert($scope.pignotreat.text);
            
            
            var tempTreatJSON=[];
            for (var k=0; k<$scope.pignotreat.text; k++)
            {
            var tempObject={};
            
            tempObject={"pigname":"Pig"+(k+1),"Treat":"Treated"};
            tempTreatJSON.push(tempObject);
            }
            $scope.PigTreatObject=tempTreatJSON;
            $scope.submitInventory=function(){
            var ini = angular.element(document.getElementById("review_init"));
            var invurl='http://nano.amfnano.com/inventory_reports.json?user_credentials='+window.localStorage["login_token"];
            var bookData;
//            alert($rootScope.pigarrayDeaths.length + "---"+$rootScope.pigarrayTreatments.length);
            if(ini.val()!="")
            {
            if($rootScope.pigarrayDeaths.length==0 && $rootScope.pigarrayTreatments.length==0)
            {
            bookData = {
            "barn_id": bid,
            "report_date": $scope.inventorydate.text,
            "user_initials":ini.val()
            };
            }
            else if($rootScope.pigarrayDeaths.length==0 && $rootScope.pigarrayTreatments.length!=0)
            {
            bookData = {
            "barn_id": bid,
            "report_date": $scope.inventorydate.text,
            "user_initials":ini.val(),
            "pig_treatments_attributes":$rootScope.pigarrayTreatments
            };
            
            }
            else if($rootScope.pigarrayTreatments.length==0 && $rootScope.pigarrayDeaths.length!=0)
            {
            bookData = {
            "barn_id": bid,
            "report_date": $scope.inventorydate.text,
            "user_initials":ini.val(),
            "pig_deaths_attributes":$rootScope.pigarrayDeaths
            
            };
            
            }
            else if($rootScope.pigarrayTreatments.length!=0 && $rootScope.pigarrayDeaths.length!=0)
            {
            bookData = {
            "barn_id": bid,
            "report_date": $scope.inventorydate.text,
            "user_initials":ini.val(),
            "pig_deaths_attributes":$rootScope.pigarrayDeaths,
            "pig_treatments_attributes":$rootScope.pigarrayTreatments
            
            };
            
            }
            //alert(JSON.stringify(bookData));
            var barninfo = $http.post(invurl,JSON.stringify(bookData),config);
            
            barninfo.success(function (data, status, headers) {
                             window.localStorage["PigTreatsCount"]=null;
                             window.localStorage["PigDeathsCount"]=null;
                             $ionicPopup.alert({
                                               title: 'Inventory Succesfully created',
                                               template: '',
                                               buttons:[{text:"OK",type:"button button-clear button-positive"}]
                                               
                                               });
                             

                            
                             location.href = "#/app/barnmanager/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
                             });
            barninfo.error(function (data, status, headers) {
                           $ionicPopup.alert({
                                             title: 'Please Enter all Pig Treatment Details',
                                             template: '',
                                             buttons:[{text:"OK",type:"button button-clear button-positive"}]
                                             
                                             });
                           });
            }
            else
            {
            $ionicPopup.alert({
                              title: 'Please Enter Initials',
                              template: '',
                              buttons:[{text:"OK",type:"button button-clear button-positive"}]
                              
                              });
            
            }
            
            }
            $scope.goBack = function() {
            
            history.back();
            scope.$apply();
            }
            $scope.cancelinc = function(){
            //            alert($scope.pignodeath.text);
            //            $scope.pignodeath.text == 0;
            window.localStorage.removeItem('PigDeathsCount');
            window.localStorage.removeItem('PigTreatsCount');
            };
            
            })

.controller('listCtrl', function($scope, $stateParams, app, frms, $http, $interval) {

            var frmsli = frms.allf();
            var siteli = frms.alls();
            var barnli = frms.allb();
            var readli = frms.allr();
            $scope.farmlists = frmsli;
            $scope.sitelists = siteli;
            $scope.barnlists = barnli;
            $scope.readlists = readli;
            var reading = [];
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            $scope.titled = name;
            
     
            
            })

.controller('barnCtrl', function($scope, $stateParams,$http, barn) {
            $scope.backlist = function(){
            location.href = '#/app/list';
            }
            var config = {
            headers: {
            'Content-Type': 'application/json',
            }
            }
//            alert($stateParams.barn_id);
            var bid= $stateParams.barn_id;
            var nameb= $stateParams.barn_name;
            var namel= $stateParams.loc_name;
            var namef= $stateParams.farm_name;

            $scope.id = bid;
            $scope.bname = nameb;
            $scope.lname = namel;
            $scope.fname = namef;
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            $scope.title = name;
            var barid = [];
            var frmsli = barn.allf();
            var siteli = barn.alls();
            var barnli = barn.allb();
            var readli = barn.allr();
            var curbarid = "";
            var curlocid = "";
            var curfarid = "";
            var curid = '';
            var j = 0;
            angular.forEach(barnli, function (count) {
                            barid.push(barnli[j].barn_id);
                            if(barnli[j].barn_id == bid){
                            $scope.barname = barnli[j].bname;
                            curlocid = barnli[j].blocation_id;
                            }
                            j++;
                            });
            var k =0;
            angular.forEach(siteli, function (count) {
                            if(siteli[k].location_id == curlocid){
                            $scope.locname = siteli[k].lname;
                            curfarid = siteli[k].lfarm_id;
                            }
                            else{
                            k++;
                            }
                            });
            
            var l =0;
            angular.forEach(frmsli, function (count) {
                            if(frmsli[l].farm_id == curfarid){
                            $scope.farname = frmsli[l].fname;
                            }
                            l++;
                            });
            
            
//            alert(barid);
            var i = 0;
            angular.forEach(readli, function (count) {
                            if(readli[i].barn_id == bid){
                            $scope.read = readli[i];
                            curid = i;
                            }
                            else{
                            i++;
                            }
                            });
            $scope.farmlists = frmsli;
            $scope.sitelists = siteli;
            $scope.barnlists = barnli;
            $scope.readlists = readli;
            var urla='http://nano.amfnano.com/barns/'+$stateParams.barn_id+'/inventory_report.json?user_credentials='+window.localStorage["login_token"];
            var urlb='http://nano.amfnano.com/barns/'+$stateParams.barn_id+'/last_inventory_report.json?user_credentials='+window.localStorage["login_token"];
            var urlc='http://nano.amfnano.com/barns/'+$stateParams.barn_id+'/last_event_report.json?user_credentials='+window.localStorage["login_token"];
            var barninfo1 = $http.get(urla,config);
            var pig_death = 0;
            barninfo1.success(function (data, status, headers) {
                              var cum = data;
                              var d = 0;
                              angular.forEach(cum, function (count) {
                                              if(cum[d].pig_deaths.length==0){
                                              var coun = 0;
                                              pig_death = pig_death + 0;
                                              }
                                              else{
                                              var le = cum[d].pig_deaths.length;
                                              le = le-1;
                                              var co = cum[d].pig_deaths[le].count;
                                              pig_death = pig_death + co;
                                              }
                                              d++;
                                            });
                              $scope.pig = pig_death;
                              });
            
            var barninfo2 = $http.get(urlb,config);
            barninfo2.success(function (data, status, headers) {
                              $scope.total_inventory=data.total_inventory;
                              if(data.pig_deaths.length==0){
                              $scope.pig_death=0;
                              }
                              else
                              {
                              $scope.pig_death=data.pig_deaths.length;
                              }
                              if(data.pig_treatments.length==0){
                              $scope.pig_sick=0;
                              }
                              else
                              {
                              $scope.pig_sick=data.pig_treatments.length;
                              }
                              $scope.report_date=data.report_date;
                              });
            var barninfo3 = $http.get(urlc,config);
            barninfo3.success(function (data, status, headers) {
                              $scope.eventshistory = data;
                              $scope.eventdescription=data.description;
                              $scope.eventreported_at=data.reported_at;
                              });
            
            if(curid == 0){
            $scope.baclas = true;
            }
            else{
            $scope.baclas = false;
            }
            if(curid == barid.length-1){
            $scope.nexlas = true;
            }
            else{
            $scope.nexlas = false;
            }
            
            $scope.bac_barn = function(){
            if(curid == 0){
//            $scope.baclas = true;
            }
            else{
            
            var bacid = curid - 1;
            var curbarid = barid[bacid];
            location.href = "#/app/barn/"+curbarid+"/"+curbarid+"/"+curbarid+"/"+curbarid;
            }
            };
            $scope.nex_barn = function(){
            if(curid == barid.length-1){
//            $scope.nexlas = true;
            }
            else{
            var nexid = curid + 1;
            var curbarid = barid[nexid];
            location.href = "#/app/barn/"+curbarid+"/"+curbarid+"/"+curbarid+"/"+curbarid;
            }
            };
            })





.controller('bmCtrl', function($scope, $stateParams,$http, barn) {
//            alert("1");
            var config = {
            headers: {
            'Content-Type': 'application/json',
            }
            }
            var frmsli = barn.allf();
            var siteli = barn.alls();
            var barnli = barn.allb();
            var readli = barn.allr();
            var bid= $stateParams.barn_id
            $scope.id = bid;
            var name = window.localStorage["first_name"]+" "+window.localStorage["last_name"];
            $scope.title = name;
//            $scope.fname = frmsli;
//            $scope.lname = siteli;
//            $scope.bname = barnli;
//            var l = 0;
//            angular.forEach(frmsli, function (count) {
//                            if(frmsli[l].farm_id == $stateParams.farm_name){
//                            $scope.fname = frmsli[l].fname;
//                            }
//                            else{
//                            l++;
//                            }
//                            });
//            var j = 0;
//            angular.forEach(siteli, function (count) {
//                            if(siteli[j].location_id == $stateParams.loc_name){
//                            $scope.lname = siteli[j].lname;
//                            }
//                            else{
//                            j++;
//                            }
//                            });
            $scope.fname = frmsli[0].fname;
            $scope.lname = siteli[0].lname;
            var k = 0;
            angular.forEach(barnli, function (count) {
                            if(barnli[k].barn_id == bid){
                            $scope.bname = barnli[k].bname;
                            }
                            else{
                            k++;
                            }
                            });
            var i = 0;
            angular.forEach(readli, function (count) {
                            if(readli[i].barn_id == bid){
                            $scope.read = readli[i];
                            }
                            else{
                            i++;
                            }
                            });

            var urla='http://nano.amfnano.com/barns/'+$stateParams.barn_id+'/inventory_report.json?user_credentials='+window.localStorage["login_token"];
            var urlb='http://nano.amfnano.com/barns/'+$stateParams.barn_id+'/last_inventory_report.json?user_credentials='+window.localStorage["login_token"];
            var urlc='http://nano.amfnano.com/barns/'+$stateParams.barn_id+'/last_event_report.json?user_credentials='+window.localStorage["login_token"];
            
            var barninfo1 = $http.get(urla,config);
            var pig_death = 0;
            barninfo1.success(function (data, status, headers) {
                              var cum = data;
                              var d = 0;
                              angular.forEach(cum, function (count) {
                                              if(cum[d].pig_deaths.length==0){
                                              var coun = 0;
                                              pig_death = pig_death + 0;
                                              }
                                              else{
                                              var le = cum[d].pig_deaths.length;
                                              le = le-1;
                                              var co = cum[d].pig_deaths[le].count;
                                              pig_death = pig_death + co;
                                              }
                                              d++;
                                              });
                              $scope.pig = pig_death;
                              
                              });

            
            
            
            var barninfo2 = $http.get(urlb,config);
            barninfo2.success(function (data, status, headers) {
                              $scope.total_inventory=data.total_inventory;
                              if(data.pig_deaths.length==0){
                              $scope.pig_death=0;
                              }
                              else
                              {
                              $scope.pig_death=data.pig_deaths.length;
                              }
                              if(data.pig_treatments.length==0){
                              $scope.pig_sick=0;
                              }
                              else
                              {
                              $scope.pig_sick=data.pig_treatments.length;
                              }
                              $scope.report_date=data.report_date;
                            });
            var barninfo3 = $http.get(urlc,config);
            barninfo3.success(function (data, status, headers) {
                              $scope.eventshistory = data;
                              $scope.eventdescription=data.description;
                              $scope.eventreported_at=data.reported_at;
                              });
            
            $scope.dailyinventory = function(){
//            alert("2");
            location.href = "#/app/inventory/"+bid+"/"+$scope.bname+"/"+$scope.lname+"/"+$scope.fname;
            }
            })






//Controller code ends

.directive('validNumber', function() {
          
          return {
          require: '?ngModel',
          link: function(scope, element, attrs, ngModelCtrl) {
          if(!ngModelCtrl) {
          return;
          }
          
          ngModelCtrl.$parsers.push(function(val) {
                                    var clean = val.replace( /[^0-9]+/g, '');
                                    if (val !== clean) {
                                    ngModelCtrl.$setViewValue(clean);
                                    ngModelCtrl.$render();
                                    }
                                    return clean;
                                    });
          
          element.bind('keypress', function(event) {
                       if(event.keyCode === 32) {
                       event.preventDefault();
                       }
                       });
          }
          };
          })

// .directive('resize', function ($window) {
//     return function (scope, element) {
//         var w = angular.element($window);
//         alert("1");
//         scope.getWindowDimensions = function () {
//             return { 'h': w.height(), 'w': w.width() };
//         };
//         scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
//             scope.windowHeight = newValue.h;
//             scope.windowWidth = newValue.w;
//             alert("23123");
//             scope.style = function () {
//                 return { 
//                     'height': (newValue.h - 100) + 'px',
//                     'width': (newValue.w - 100) + 'px' 
//                 };
//             };

//         }, true);

//         w.bind('resize', function () {
//             scope.$apply();
//         });
//     }
// })


// .directive('resize', function(){
//   return{
//     function ale(){
//       $scope.$watch(function(){
//          return window.innerWidth;
//       }, function(value) {
//               alert(value);
//         });
//     }
//   };
// })
.filter('reverse', function() {
       return function(items) {
       return items.slice().reverse();
       };
       });
