          import { Component} from '@angular/core';
          import { NavController,Events, MenuController } from 'ionic-angular';
          import {Http, Headers, RequestOptions} from '@angular/http';
          import { Appsetting } from '../../providers/appsetting';
          import {LoadingController} from 'ionic-angular';
          import { ToastController } from 'ionic-angular';
          import { AlertController } from 'ionic-angular';
          import { VariableProvider } from '../../providers/Variables';
          import { LocationPage } from '../location/location';
          import {ModalPage } from '../modal/modal';
          import {MapPage } from '../map/map';
          import { ModalController } from 'ionic-angular';
          import { LoginPage } from '../login/login';
          import { Geolocation } from '@ionic-native/geolocation';
          import { DetailPage } from '../detail/detail';
          import {SimpleTimer} from 'ng2-simple-timer';
          import * as $ from 'jquery';
          // import {Component, OnInit} from '@angular/core';
          @Component({
          selector: 'page-home',
          templateUrl: 'home.html'
          })
          export class HomePage {
            public z: any;
            locationAdd: any;
            location: any;

          public User_fbid: any = null;
          public User_twid: any = null;
          public google_id: any = null;
          public data='';
          public items = ''; 
          public name= ''; 
          public errorValue = '';
          public searchList = '';

          total_time: any;
          totaltym: string;
          currtym: string;
          tsec: number;
          tmins: number;
          thours: number;
          public endtime: any;
          deal_id: any;
          public checkpassword = 1;
          public listing: any;
          //////////////////************filter***********////////////
          autocompleteItems: any;
          autocomplete ={ query : '' };
          acService:any;
          placesService: any;
          //////////////////////////////////////////////////////////
          long: number;
          lat: number;
          User_id: string;
          uname: any;
          srcimage: any;
          public Loading=this.loadingCtrl.create({
          content: 'Please wait...'
          });

          // counter0 = 30;
          public counter0;
          timer0Id: string;
          timer0button = 'Subscribe';


// *********************************SERIALIZE DATA**********************************
          serializeObj(obj){
                        var result = [];
                    
                        for (var property in obj)
                        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                        return result.join("&");
                    }
// *********************************************************************************

      // ngOnInit(){
      //   this.geoloc();
      // }
  


          constructor(public navCtrl: NavController,public toastCtrl: ToastController,private menu: MenuController,public loadingCtrl:LoadingController,public modalCtrl: ModalController,private geolocation: Geolocation,public events: Events,public appsetting : Appsetting ,private st: SimpleTimer,public http: Http,public variable: VariableProvider) {
                  var currentDate = new Date();
                  console.log(currentDate);
                  this.menu.swipeEnable(false);
                   this.geoloc();
                  if(this.google_id != null){
                    this.checkpassword = 0;
                  }else if(this.User_twid != null){
                    this.checkpassword = 0;
                  }else if(this.User_fbid != null){
                    this.checkpassword = 0;
                  }else{
                    this.checkpassword = 1;
                  }
        this.events.subscribe('tab-t0-0', (data)=>{
        console.log(data);
      console.log(this.navCtrl.canGoBack());
      // if(this.navCtrl.canGoBack() == true){
      //   this.navCtrl.popToRoot()
      // } 
      this.geoloc();
      
       //alert('working')
     }) 
                  
          }




// **************************************************************************************************

            locat_nxt(){
                    this.navCtrl.push(LocationPage);
            }
            presentModal() {
                let modal = this.modalCtrl.create(ModalPage);
                modal.present();
            }


// *******************************LOCATION**********************************
          geoloc(){ 
                this.Loading.present();
                console.log("geo");
                this.User_id = localStorage.getItem("USERID");
                console.log(this.User_id);
                // if(this.User_id == null){
                this.geolocation.getCurrentPosition().then((resp) => {
                this.lat = resp.coords.latitude;
                this.long = resp.coords.longitude;
                let headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                let options= new RequestOptions({ headers: headers });
                var url  : string = this.variable.baseUrl + this.variable.DEALLIST_API;
                var land_page = {
                        lat  : this.lat,
                        long :  this.long,
                        uid : this.User_id

                }
              var serialized_obj = this.serializeObj(land_page); 
              console.log(serialized_obj);
              this.Loading.dismiss();
              this.http.post(url ,serialized_obj, options).map(res=>res.json()).subscribe(data=>{

           
           var link_map : string =  'http://maps.googleapis.com/maps/api/geocode/json?latlng='+this.lat+','+this.long+'&sensor=true';         
                    console.log(data);
                   this.http.get(link_map,options).map(res => res.json()).subscribe(dataloc => {
                      console.log(dataloc.results[3].formatted_address);
                      this.location = dataloc.results[3].formatted_address;
                      var res = this.location.substring(0, 30);
                      this.location = res;
                      console.log(localStorage.setItem('currentloc',this.location));
                      console.log(data);
                      if(data.isSuccess == true){
                          var arrcount = [];
                          this.errorValue = '2';
                          var listing = [];
                          console.log(data);
                          this.listing = data.data;
                           console.log($('.myhidden').val());
                         this.z = setInterval(function() {
                        
                          if($(".heading_timexx").length>0){
                            $( ".heading_timexx" ).each(function() {
                            var myval =$( this );
                            var countDownDate = new Date($( this ).attr('id')).getTime();
                            console.log("start",countDownDate);
                            //   alert($('input[type=hidden]').val());
                            // var end_datetime = new Date($('.myhidden').val()).getTime();
                            var end_datetime = new Date($(this).parents('li').find('input[type=hidden]').val()).getTime(); 
                            console.log("end",$(this).parents('li').find('input[type=hidden]').val());
                                
                                
                                var now = new Date().getTime();
                                console.log("now",now);
                                var distance = now - countDownDate;
                                var seddistance =  end_datetime -now;
                                console.log("startdiff",distance);
                                console.log("enddiff",seddistance);

                                if (distance >= 0 && seddistance >= 0) {
                                  var hours = Math.floor((seddistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                  var minutes = Math.floor((seddistance % (1000 * 60 * 60)) / (1000 * 60));
                                  var seconds = Math.floor((seddistance % (1000 * 60)) / 1000);
                                  $(this).text(hours + " " +"h" + " " + minutes +  " " + "m" + " " + seconds + " " +"s");
                                  //  clearInterval(z);
                    
                              }
                              else{
                                        $(this).parents('li').hide(); 
                              }
                               

                            });
                          }
                  
                          },1000);       
                    
                    }else{
                              this.Loading.dismiss();
                              let toast = this.toastCtrl.create({
                                      message: 'No Deals Found!',
                                      duration: 3000,
                                      position : 'middle'
                                  });
                                  toast.present();
                    }
                   })
              })
            }).catch((error) => {
              this.Loading.dismiss();
              alert('Error getting location->'+ error);
            });
                
          }



// ************************************************************************************



// ***************************************FAVORITE**************************************
          favorite(ids){
            this.Loading.present();
            this.User_id = localStorage.getItem("USERID");
            this.google_id = localStorage.getItem("GOOGLEUSERID");
            this.User_twid = localStorage.getItem("TWUSERID");
            this.User_fbid = localStorage.getItem("FBUSERID");
           if(this.User_id != null){                               
                this.Loading.present();
                let headers = new Headers();
                headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                let options= new RequestOptions({ headers: headers });
                var url  : string = this.variable.baseUrl + this.variable.DEAL_FAVORITES;
                var favodeal = {
                        
                        dealid : ids,
                        userid : this.User_id,
                        status : 1

                }
                  var serialized_favo = this.serializeObj(favodeal); 
                  console.log(serialized_favo);
                  this.http.post(url ,serialized_favo, options).map(res=>res.json()).subscribe(datafav=>{
                        this.Loading.dismiss();
                        console.log(datafav);
                        if(datafav.isSuccess == true){

                                console.log(datafav);
                                this.geoloc();
                      
                        }
              })
            }
            
            // else if(this.google_id != null){
            //     this.Loading.present();
            //     let headers = new Headers();
            //     headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            //     let options= new RequestOptions({ headers: headers });
            //     var url  : string = this.variable.baseUrl + this.variable.DEAL_FAVORITES;
            //     var favodealgoogle = {
                        
            //             dealid : ids,
            //             userid : this.google_id,
            //             status : 1

            //     }
            //       var serialized_favo = this.serializeObj(favodealgoogle); 
            //       console.log(serialized_favo);
            //       this.http.post(url ,serialized_favo, options).map(res=>res.json()).subscribe(datafav=>{
            //             this.Loading.dismiss();
            //             console.log(datafav);
            //             if(datafav.isSuccess == true){

            //                     console.log(datafav);
            //                     this.Loading.present();
            //                     console.log("geo");
            //                     this.User_id = localStorage.getItem("USERID");
            //                     console.log(this.User_id);
            //                     // if(this.User_id == null){
            //                     this.geolocation.getCurrentPosition().then((resp) => {
            //                     console.log("resp1" +resp.coords.latitude);
            //                     this.lat = resp.coords.latitude;
            //                     console.log("resp2" + resp.coords.longitude);
            //                     this.long = resp.coords.longitude;
            //                     let headers = new Headers();
            //                     headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            //                     let options= new RequestOptions({ headers: headers });
            //                     var url  : string = this.variable.baseUrl + this.variable.DEALLIST_API;
            //                     var land_page = {
            //                             lat  : this.lat,
            //                             long :  this.long,
            //                             uid : this.google_id

            //                     }
            //                   var serialized_obj = this.serializeObj(land_page); 
            //                   console.log(serialized_obj);
            //                   this.http.post(url ,serialized_obj, options).map(res=>res.json()).subscribe(data=>{
            //                   this.Loading.dismiss();
            //           var link_map : string =  'http://maps.googleapis.com/maps/api/geocode/json?latlng='+this.lat+','+this.long+'&sensor=true';         
            //         console.log(data);
            //        this.http.get(link_map,options).map(res => res.json()).subscribe(dataloc => {

            //           console.log(dataloc.results[3].formatted_address);
            //           this.location = dataloc.results[3].formatted_address;
            //           var res = this.location.substring(0, 30);
            //            this.location = res;
            //                   console.log(data);
            //         if(data.isSuccess == true){
            //               var arrcount = [];
            //               this.errorValue = '2';
            //               var listing = [];
            //               console.log(data);
            //               this.listing = data.data;
            //                 var z = setInterval(function() {
            //               //console.log('here');
            //               if($(".heading_timexx").length>0){
            //                 $( ".heading_timexx" ).each(function() {
            //                  var myval =$( this );
            //                    var countDownDate = new Date($( this ).attr('id')).getTime();
            //                     console.log("start",countDownDate);
            //                   //   alert($('input[type=hidden]').val());
            //                     // var end_datetime = new Date($('.myhidden').val()).getTime();
            //                    var end_datetime = new Date($(this).parents('li').find('input[type=hidden]').val()).getTime(); 
            //                     console.log("end",$(this).parents('li').find('input[type=hidden]').val());
                                
                                
            //                     var now = new Date().getTime();
            //                     console.log("now",now);
            //                     var distance = now - countDownDate;
            //                     var seddistance =  end_datetime -now;
            //                     console.log("startdiff",distance);
            //                     console.log("enddiff",seddistance);

            //                     if (distance >= 0 && seddistance >= 0) {
            //                       var hours = Math.floor((seddistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            //                       var minutes = Math.floor((seddistance % (1000 * 60 * 60)) / (1000 * 60));
            //                       var seconds = Math.floor((seddistance % (1000 * 60)) / 1000);
            //                       $(this).text(hours + " " +"h" + " " + minutes +  " " + "m" + " " + seconds + " " +"s");
            //                       //  clearInterval(z);
                    
            //                   }
            //                   else{
            //                             $(this).parents('li').hide(); 
            //                   }
            //                     console.log(countDownDate);

            //                 });
            //               }
                  
            //               },1000);   

                              
                    
            //         }
                    
            //         else{
            //                   this.Loading.dismiss();
            //                   let toast = this.toastCtrl.create({
            //                           message: 'No Deals Found!',
            //                           duration: 3000,
            //                           position : 'middle'
            //                       });
            //                       toast.present();
            //         }
            //        })
            //   })
            // }).catch((error) => {
            //   this.Loading.dismiss();
            //   alert('Error getting location->'+ error);
            // });
                      
            //             }
            //   })
            // }else if(this.User_twid != null){
            //     this.Loading.present();
            //     let headers = new Headers();
            //     headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            //     let options= new RequestOptions({ headers: headers });
            //     var url  : string = this.variable.baseUrl + this.variable.DEAL_FAVORITES;
            //     var favodealtw = {
                        
            //             dealid : ids,
            //             userid : this.User_twid,
            //             status : 1

            //     }
            //       var serialized_favo = this.serializeObj(favodealtw); 
            //       console.log(serialized_favo);
            //       this.http.post(url ,serialized_favo, options).map(res=>res.json()).subscribe(datafav=>{
            //             this.Loading.dismiss();
            //             console.log(datafav);
            //             if(datafav.isSuccess == true){

            //     console.log(datafav);
            //     this.Loading.present();
            //     console.log("geo");
            //     this.User_id = localStorage.getItem("USERID");
            //     console.log(this.User_id);
            //     // if(this.User_id == null){
            //     this.geolocation.getCurrentPosition().then((resp) => {
            //     console.log("resp1" +resp.coords.latitude);
            //     this.lat = resp.coords.latitude;
            //     console.log("resp2" + resp.coords.longitude);
            //     this.long = resp.coords.longitude;
            //     let headers = new Headers();
            //     headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            //     let options= new RequestOptions({ headers: headers });
            //     var url  : string = this.variable.baseUrl + this.variable.DEALLIST_API;
            //     var land_page = {
            //             lat  : this.lat,
            //             long :  this.long,
            //             uid : this.User_twid

            //     }
            //   var serialized_obj = this.serializeObj(land_page); 
            //   console.log(serialized_obj);
            //   this.http.post(url ,serialized_obj, options).map(res=>res.json()).subscribe(data=>{
            //         this.Loading.dismiss();
            //           var link_map : string =  'http://maps.googleapis.com/maps/api/geocode/json?latlng='+this.lat+','+this.long+'&sensor=true';         
            //         console.log(data);
            //        this.http.get(link_map,options).map(res => res.json()).subscribe(dataloc => {

            //           console.log(dataloc.results[3].formatted_address);
            //           this.location = dataloc.results[3].formatted_address;
            //           var res = this.location.substring(0, 30);
            //            this.location = res;
            //            console.log(localStorage.setItem('currentloc',this.location));
            //         console.log(data);

            //         if(data.isSuccess == true){
            //               var arrcount = [];
            //               this.errorValue = '2';
            //               var listing = [];
            //               console.log(data);
            //               this.listing = data.data;
            //                 var z = setInterval(function() {
            //               //console.log('here');
            //               if($(".heading_timexx").length>0){
            //                 $( ".heading_timexx" ).each(function() {
            //                  var myval =$( this );
            //                    var countDownDate = new Date($( this ).attr('id')).getTime();
            //                     console.log("start",countDownDate);
            //                   //   alert($('input[type=hidden]').val());
            //                     // var end_datetime = new Date($('.myhidden').val()).getTime();
            //                    var end_datetime = new Date($(this).parents('li').find('input[type=hidden]').val()).getTime(); 
            //                     console.log("end",$(this).parents('li').find('input[type=hidden]').val());
                                
                                
            //                     var now = new Date().getTime();
            //                     console.log("now",now);
            //                     var distance = now - countDownDate;
            //                     var seddistance =  end_datetime -now;
            //                     console.log("startdiff",distance);
            //                     console.log("enddiff",seddistance);

            //                     if (distance >= 0 && seddistance >= 0) {
            //                       var hours = Math.floor((seddistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            //                       var minutes = Math.floor((seddistance % (1000 * 60 * 60)) / (1000 * 60));
            //                       var seconds = Math.floor((seddistance % (1000 * 60)) / 1000);
            //                       $(this).text(hours + " " +"h" + " " + minutes +  " " + "m" + " " + seconds + " " +"s");
            //                       //  clearInterval(z);
                    
            //                   }
            //                   else{
            //                             $(this).parents('li').hide(); 
            //                   }
            //                     console.log(countDownDate);

            //                 });
            //               }
                  
            //               },1000);   

                              
                    
            //         }else{
            //                   this.Loading.dismiss();
            //                   let toast = this.toastCtrl.create({
            //                           message: 'No Deals Found!',
            //                           duration: 3000,
            //                           position : 'middle'
            //                       });
            //                       toast.present();
            //         }
            //        })
            //   })
            // }).catch((error) => {
            //   this.Loading.dismiss();
            //   alert('Error getting location->'+ error);
            // });
                      
            //             }
            //   })
            // }else if(this.User_fbid != null){
            //   // alert("fb");
            //   // alert(this.User_fbid);
            //     this.Loading.present();
            //     let headers = new Headers();
            //     headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            //     let options= new RequestOptions({ headers: headers });
            //     var url  : string = this.variable.baseUrl + this.variable.DEAL_FAVORITES;
            //     var favodealfb = {
                        
            //             dealid : ids,
            //             userid : this.User_fbid,
            //             status : 1

            //     }
            //       var serialized_favo = this.serializeObj(favodealfb); 
            //       console.log(serialized_favo);
            //       this.http.post(url ,serialized_favo, options).map(res=>res.json()).subscribe(datafav=>{
            //             this.Loading.dismiss();
            //             console.log(datafav);
                        
            //             if(datafav.isSuccess == true){

            //     console.log(datafav);
            //     this.Loading.present();
            //     console.log("geo");
            //     this.User_id = localStorage.getItem("USERID");
            //     console.log(this.User_id);
            //     // if(this.User_id == null){
            //     this.geolocation.getCurrentPosition().then((resp) => {
            //     console.log("resp1" +resp.coords.latitude);
            //     this.lat = resp.coords.latitude;
            //     console.log("resp2" + resp.coords.longitude);
            //     this.long = resp.coords.longitude;
            //     let headers = new Headers();
            //     headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            //     let options= new RequestOptions({ headers: headers });
            //     var url  : string = this.variable.baseUrl + this.variable.DEALLIST_API;
            //     var land_page = {
            //             lat  : this.lat,
            //             long :  this.long,
            //             uid : this.User_fbid

            //     }
            //   var serialized_obj = this.serializeObj(land_page); 
            //   console.log(serialized_obj);
            //   this.http.post(url ,serialized_obj, options).map(res=>res.json()).subscribe(data=>{
            //      var link_map : string =  'http://maps.googleapis.com/maps/api/geocode/json?latlng='+this.lat+','+this.long+'&sensor=true';         
            //         console.log(data);
            //        this.http.get(link_map,options).map(res => res.json()).subscribe(dataloc => {

            //           console.log(dataloc.results[3].formatted_address);
            //           this.location = dataloc.results[3].formatted_address;
            //           var res = this.location.substring(0, 30);
            //           this.location = res;
            //         this.Loading.dismiss();
            //         console.log(data);

            //         if(data.isSuccess == true){
            //               var arrcount = [];
            //               this.errorValue = '2';
            //               var listing = [];
            //               console.log(data);
            //               this.listing = data.data;
            //                var z = setInterval(function() {
            //               //console.log('here');
            //               if($(".heading_timexx").length>0){
            //                 $( ".heading_timexx" ).each(function() {
            //                  var myval =$( this );
            //                    var countDownDate = new Date($( this ).attr('id')).getTime();
            //                     console.log("start",countDownDate);
            //                   //   alert($('input[type=hidden]').val());
            //                     // var end_datetime = new Date($('.myhidden').val()).getTime();
            //                    var end_datetime = new Date($(this).parents('li').find('input[type=hidden]').val()).getTime(); 
            //                     console.log("end",$(this).parents('li').find('input[type=hidden]').val());
                                
                                
            //                     var now = new Date().getTime();
            //                     console.log("now",now);
            //                     var distance = now - countDownDate;
            //                     var seddistance =  end_datetime -now;
            //                     console.log("startdiff",distance);
            //                     console.log("enddiff",seddistance);

            //                     if (distance >= 0 && seddistance >= 0) {
            //                       var hours = Math.floor((seddistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            //                       var minutes = Math.floor((seddistance % (1000 * 60 * 60)) / (1000 * 60));
            //                       var seconds = Math.floor((seddistance % (1000 * 60)) / 1000);
            //                       $(this).text(hours + " " +"h" + " " + minutes +  " " + "m" + " " + seconds + " " +"s");
            //                       //  clearInterval(z);
                    
            //                   }
            //                   else{
            //                             $(this).parents('li').hide(); 
            //                   }
            //                     console.log(countDownDate);

            //                 });
            //               }
                  
            //               },1000);    
            //         }else{
            //                   this.Loading.dismiss();
            //                   let toast = this.toastCtrl.create({
            //                           message: 'No Deals Found!',
            //                           duration: 3000,
            //                           position : 'middle'
            //                       });
            //                       toast.present();
            //         }
            //        })
            //   })
            // }).catch((error) => {
            //   this.Loading.dismiss();
            //   alert('Error getting location->'+ error);
            // });
                      
            //             }
            //   })
              // }
              else{
                        this.Loading.dismiss();
                        this.navCtrl.push(LoginPage,{dealid:ids});

                        
            }

          }


// **********************************************************************************



          dealdetail(id,distance,time){
            console.log('time->',time);
            this.deal_id = id;
            this.navCtrl.push(DetailPage,{dealID : this.deal_id , Dealdistance : distance,Deal_time : time});
            // clearInterval(this.z);

          }


// *************************************SEARCH BY NAME**************************************
          setFilteredItems(){
          console.log('Working');
          if(this.name.length == 0) {
                console.log('plz write something');
                this.errorValue = '2'; 
                console.log(this.errorValue);
            } else {

                this.searchList = this.filterItems(this.name);
                console.log('Filtering');
                this.errorValue = '0';
                console.log(this.errorValue);
          }
          }


          public filterItems(searchTerm){
            console.log(searchTerm);
            return this.listing.filter((deallist) => {
              console.log("enter->",deallist);
                return deallist.Deal.deal_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            });     

          }



// **********************************************************************************************


      map(lat,long){
        localStorage.setItem('deallat',lat);
        localStorage.setItem('deallong',long);
        this.navCtrl.push(MapPage);
      }
      ionViewWillLeave() {
    clearInterval(this.z);
    console.log("Looks like I'm about to leave :(");
  }
  }
