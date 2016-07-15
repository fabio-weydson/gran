angular.module('mobionicApp.controllers', [])

// Home Controller
/*
.controller('HomeCtrl', function($scope, Data) {

 $scope.items = Data.items;
 });
 */
.controller('HomeCtrl',function($scope, $ionicLoading, PostsData, PostsStorage, ImgCache, $cordovaLocalNotification) {

    $scope.news = [];
    $scope.storage = '';

       $scope.scheduleDelayedNotification = function () {
      var now = new Date().getTime();
      var _10SecondsFromNow = new Date(now + 10 * 1000);
      
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here',
        at: _10SecondsFromNow
      }).then(function (result) {
        // ...
      });
    };

    $scope.scheduleDelayedNotification();

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });
    PostsData.async().then(
        // successCallback
        function() {
            $scope.news = PostsData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.news = PostsStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {
        }
    );



     $scope.sharePost = function() {
        
    $scope.subject = 'Sociedade Esportiva Gran São João';
    $scope.link = 'http://www.gran.com.br/';
    $scope.message = 'Visite o site do Clube Gran São João www.gran.com.br';
    $scope.image = 'http://www.dcoutto.com.br/servidor/psd/logo.png';
    console.log($scope.ativoimg);
            $ionicActionSheet.show({
                buttons: [
                    { text: 'Facebook' },
                    { text: 'Twitter' },
                    { text: 'Whatsapp' },
                    { text: 'Email' },
                    { text: 'Outros' }
                ],
                titleText: 'Compartilhar',
                cancelText: 'Cancelar',
                buttonClicked: function(index) {
                    switch(index) {
                        case 0:
                            $scope.shareToFacebook();
                            break;
                        case 1:
                            $scope.shareToTwitter();
                            break;
                        case 2:
                            $scope.shareToWhatsApp();
                            break;
                        case 3:
                            $scope.shareViaEmail();
                            break;
                        case 4:
                            $scope.shareNative();
                            break;
                    }
                    return true;
                }
            });
        }
     

        $scope.shareNative = function() {
            window.plugins.socialsharing.share($scope.message, $scope.subject, $scope.image, $scope.link);
        }
         $scope.shareToFacebook  = function() {
            window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint($scope.subject, null, $scope.link);
        }
        $scope.shareToTwitter  = function() {
            window.plugins.socialsharing.shareViaTwitter($scope.subject, null, $scope.link);
        }
        $scope.shareToWhatsApp  = function() {
            window.plugins.socialsharing.shareViaWhatsApp($scope.message, $scope.image, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }


})
.controller('BannerController',['$scope', '$sce',  function($scope, $sce) {
  
  
    $scope.SetImage = function() {
        var imgLinks = [
        //['img/banner_loja.jpg','#/app/loja'],
        ['img/banner_socio.jpg','#/app/socio']
        ];
        var R =  Math.floor(Math.random() * imgLinks.length);
        $scope.banner = $sce.trustAsHtml('<a href="'+imgLinks[R][1]+'" class="banner" nav-clear menu-close><img class="full-image" src="'+imgLinks[R][0]+'"></a>');
    }
     $scope.SetImage();
}])
// News Controller
.controller('NewsCtrl', function($scope, $ionicLoading, NewsData, NewsStorage) {

    $scope.news = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    NewsData.async().then(
        // successCallback
        function() {
            $scope.news = NewsData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.news = NewsStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );

})

// Gallery Controller
.controller('GaleriaCtrl', function($scope, $ionicLoading, $ionicActionSheet, GaleriaData, GaleriaStorage, $document) {

    $scope.galerias = [];

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',
      showBackdrop: false,
      showDelay: 10
    });

    GaleriaData.async().then(
        // successCallback
        function() {
            $scope.galerias = GaleriaData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.galerias = GaleriaStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {

        }
    )
    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 30;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.galerias.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    };
    $scope.ativoimg='0';
    $scope.ativolink='0';
    $scope.ativotexto ='0';

        $scope.loadURL = function (url) {
            window.open(url,'_system');
        }

})

// Gallery Controller
.controller('FotosCtrl', function($scope, $stateParams, $state, $ionicLoading, $ionicActionSheet, FotosData, FotosStorage, $document) {

    $scope.id = $stateParams.galeriaId.replace(':','');
    console.log($scope.id)
    $scope.fotos = [];

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',
      showBackdrop: false,
      showDelay: 10
    });

     $.ajax({
              type: "GET",
              dataType: 'json',
              url: "http://gran.com.br/site/services/feed.php?conteudo=fotos&id="+$scope.id,
              success: function( data ) {
                        
                        $scope.fotos = data.Model;
                        $ionicLoading.hide();
                
                }
    });
 $scope.goFotos = function(aid){
    console.log(aid);
            $state.go('fotos', {id: aid},{reload: true});
    }  
    $scope.abre_foto = function (passedEventObject, thumbid) {
     var window_height = window.innerHeight;
         $('#lightbox span').css('max-height', window_height-Math.round((window_height*25)/100));
        var imagem = $('#fotos div[data-thumbid="'+thumbid+'"] img').data('imgfull');
        var link = $('#fotos div[data-thumbid="'+thumbid+'"] img').data('link');
        $('#lightbox span').html('<img src="'+imagem+'"/>').promise().done(function(){
            $scope.ativoimg = imagem;
            $scope.ativolink = link;
            $('#lightbox').fadeIn(500);  
        });  
    };
    $scope.close_foto = function () {
        $('#lightbox span').html('').promise().done(function(){
            $('#lightbox').fadeOut(500);  
        });  
    };


    $scope.sharePost = function() {
        
    $scope.subject =  "Clube Gran São João";
    $scope.link = $scope.ativolink ;
    $scope.message =  "Clube Gran São João";
    $scope.image = $scope.ativoimg;

            $ionicActionSheet.show({
                buttons: [
                    { text: 'Facebook' },
                    { text: 'Twitter' },
                    { text: 'Whatsapp' },
                    { text: 'Email' },
                    { text: 'Outros' }
                ],
                titleText: 'Compartilhar',
                cancelText: 'Cancelar',
                buttonClicked: function(index) {
                    switch(index) {
                        case 0:
                            $scope.shareToFacebook();
                            break;
                        case 1:
                            $scope.shareToTwitter();
                            break;
                        case 2:
                            $scope.shareToWhatsApp();
                            break;
                        case 3:
                            $scope.shareViaEmail();
                            break;
                        case 4:
                            $scope.shareNative();
                            break;
                    }
                    return true;
                }
            });
        }
     

        $scope.shareNative = function() {
            window.plugins.socialsharing.share($scope.message, $scope.subject, null, $scope.link);
        }
         $scope.shareToFacebook  = function() {
            window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint($scope.subject, null, $scope.link);
        }
        $scope.shareToTwitter  = function() {
            window.plugins.socialsharing.shareViaTwitter($scope.subject, null, $scope.link);
        }
        $scope.shareToWhatsApp  = function() {
            window.plugins.socialsharing.shareViaWhatsApp($scope.post.Titulo, null, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }
    $scope.loadURL = function (url) {
        window.open(url,'_system');
    }

})

// Gallery Controller
.controller('VideosCtrl',   function($scope, $ionicLoading, VideosData, VideosStorage, $document) {
    $scope.videos = [];

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    VideosData.async().then(
        // successCallback
        function() {
            $scope.videos = VideosData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.videos = VideosStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    )

    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 7;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.videos.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    };
        
 
    $scope.loadURL = function (url) { 
        window.open(url,'_system');
    }



})

// Video Controller
.controller('VideoCtrl', ['$scope', '$ionicLoading', '$ionicActionSheet' ,'$sce', '$stateParams', '$timeout', 'VideosData', function($scope, $ionicLoading, $ionicActionSheet, $sce, $stateParams, $timeout, VideosData){
    
    $scope.video = VideosData.get($stateParams.videoId);


    $scope.idVideo = $scope.video.snippet.resourceId.videoId;
    $scope.video_url = 'https://www.youtube.com/embed/'+$scope.idVideo+'?rel=0&showinfo=0&allownetworking=internal&fs=0&theme=light&controls=2&autohide=1';
    $scope.urlEmbed = $sce.trustAsHtml('<iframe id="frame_video" src="'+ $scope.video_url+'" frameborder="0" width="100%" height="100%"></iframe>');

    $scope.video.embed = $scope.urlEmbed;


     window.addEventListener("orientationchange", function() {
        $('.media-container').height('0');
            $scope.loading = $ionicLoading.show({
              template: '<i class="icon ion-loading-a"></i> Carregando',
              showBackdrop: true,
              showDelay: 3
    });
        $timeout(function() {
           var window_width = $('.media-container').width();
            var window_height = window.innerHeight;
            window_width *= 1;
            var valueHeight = Math.round((window_width/16)*9);
            //alert(window.orientation+"_"+window_width+"_"+valueHeight);
        if(window.orientation == 0) {
            $('.media-container').height(valueHeight);
            $('.media-container .ng-binding').width(window_width).height(valueHeight);
            $('#video .padding,.nav-bar-container').show();
            $('.has-header').animate({
                    top: "44px",
                    }, 500);
            //$scope.video.embed = $scope.urlEmbed;
            $scope.video.embed = $sce.trustAsHtml('<iframe id="frame_video" src="https://www.youtube.com/embed/'+$scope.idVideo+'?rel=0&showinfo=0&allownetworking=internal&fs=0&theme=light&controls=2&autohide=1?&feature=player_embedded" frameborder="0" width="'+window_width+'" height="'+valueHeight+'"></iframe>');
            //$('#frame_video').attr('src', $scope.video_url);
            $ionicLoading.hide();
        }else {
            $('.media-container').height(window_height);
            $('.media-container .ng-binding').width(window_width).height(valueHeight);
            $('.has-header').animate({
                    top: "0px",
                    }, 500).promise().done(function(){
                        $('#video .padding,.nav-bar-container').hide();
                    });
            //$('#frame_video').attr('src', $scope.video_url);
            //$scope.video.embed = $scope.urlEmbed;
            $scope.video.embed = $sce.trustAsHtml('<iframe id="frame_video" src="https://www.youtube.com/embed/'+$scope.idVideo+'?rel=0&showinfo=0&allownetworking=internal&fs=0&theme=light&controls=2&autohide=1&feature=player_embedded" frameborder="0" width="'+window_width+'" height="'+valueHeight+'"></iframe>');
            $ionicLoading.hide();
            }
        }, 500);
    })


   $scope.init = function () {
        //screen.unlockOrientation();
        var window_width = $('.media-container').width();
        window_width *= 1;
        var valueHeight = Math.round((window_width/16)*9);
       $('.media-container .ng-binding').width(window_width).height(valueHeight);
       
    };

    $scope.sharePost = function() {
        
    $scope.subject = $scope.video.snippet.title;
    $scope.link = 'https://youtu.be/'+$scope.idVideo ;
    $scope.message =  $scope.subject + ' ' + $scope.link;
    //$scope.image = $scope.video.snippet.thumbnails.default.url;

            $ionicActionSheet.show({
                buttons: [
                    { text: 'Facebook' },
                    { text: 'Twitter' },
                    { text: 'Whatsapp' },
                    { text: 'Email' },
                    { text: 'Outros' }
                ],
                titleText: 'Compartilhar',
                cancelText: 'Cancelar',
                buttonClicked: function(index) {
                    switch(index) {
                        case 0:
                            $scope.shareToFacebook();
                            break;
                        case 1:
                            $scope.shareToTwitter();
                            break;
                        case 2:
                            $scope.shareToWhatsApp();
                            break;
                        case 3:
                            $scope.shareViaEmail();
                            break;
                        case 4:
                            $scope.shareNative();
                            break;
                    }
                    return true;
                }
            });
        }
     

        $scope.shareNative = function() {
            window.plugins.socialsharing.share($scope.message, $scope.subject, null, $scope.link);
        }
         $scope.shareToFacebook  = function() {
            window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint($scope.subject, null, $scope.link);
        }
        $scope.shareToTwitter  = function() {
            window.plugins.socialsharing.shareViaTwitter($scope.subject, null, $scope.link);
        }
        $scope.shareToWhatsApp  = function() {
            window.plugins.socialsharing.shareViaWhatsApp($scope.post.Titulo, null, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }



    //   $scope.$on('$rootScope.orientation.change', function () {
    //   alert('orientacao alterada');
    // });
}])
  
// Contact Controller
.controller('ContactCtrl', function($scope, $ionicLoading) {
    $scope.contact = {
        nome:  '',
      assunto:  'Mensagem APP',
      email:  '',
      mensagem: ''
    }
    $scope.submitForm = function() {

        $.ajax({
          type: "POST",
          url: 'http://gran.com.br/site/envia_contato.php',
          data: $scope.contact,
          success: function(result){
              $scope.loading = $ionicLoading.show({
                      template: result,
                      showBackdrop: false,
                      showDelay: 10,
                      duration: 2000
                });
               $scope.contact = {
        nome:  '',
      assunto:  'Mensagem APP',
      email:  '',
      mensagem: ''
    }
          }
          });

    }
        $scope.loadURL = function (url, target) {
        window.open(url, target);
    }


})

// Contact Controller
.controller('MapCtrl', function($scope, $ionicLoading, $timeout,$interval) {

$scope.rota = false;
   $scope.finding = function(route) {
            for (i = 0; i < route.length; i++) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(route[i].latitude, route[i].longitude),
                    map: map
                });
            }
        }
$scope.start = 'Aguardando local de partida';
$scope.end = 'Rua Dr. Antonio Frederico Ozanan, 111, Parque Real, Limeira-SP';

  $scope.getDir = function(){

                $scope.start =  $('#partida').val();
                var waypts = [];
                var request = {
                    origin: $scope.start,
                    destination: $scope.end,
                    waypoints: waypts,
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.METRIC

                };
                //Showing Loader so while the map is locating the A and B Points
                $scope.loading = $ionicLoading.show({
                  template: '<i class="icon ion-loading-a"></i> Traçando rota. Aguarde...',
                  showBackdrop: true,
                  showDelay: 10,
                  duration: 7000
                });
                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        $ionicLoading.hide();
                        $scope.rota = true;
                    }
                });
                $scope.finding(route)
            }
        var directionPoints = '[]';
        var route = JSON.parse(directionPoints);
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map, response, marker;
        //To show the initial map at some location
        $scope.getAddress =function(lat,lon){
                $.get('http://maps.google.com/maps/api/geocode/json?latlng='+lat+','+lon+'&sensor=false').success(function(mapData) {
                $timeout(function() {
              $scope.$apply(function () {
            $scope.start = mapData.results[0].formatted_address;
            $('#partida').val($scope.start)
            });
        }, 1000);
            });

        }
   
        $scope.initialize = function() {
            
            
            $scope.rota = false;
            $scope.loading = $ionicLoading.show({
                  template: '<i class="icon ion-loading-a"></i> Obtendo localização',
                  showBackdrop: true,
                  showDelay: 10,
                  duration: 7000
                });

          if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, 
                    function(){
                        $scope.desabilita_tracar = false;
                         $scope.loading = $ionicLoading.show({
                      template: 'Seu GPS está desativado. Ative-o para se localizar.',
                      showBackdrop: false,
                      showDelay: 10,
                 
                });
                           var testador = $interval(function(){
                            console.log('testando')
                               navigator.geolocation.getCurrentPosition(function(){
                                $interval.cancel(testador);
                                $ionicLoading.hide();
                                $hide.go('map',{reload: true});
                               });
                          },2000)  
                    }
                );
           
          } else {
            $scope.desabilita_tracar = false;
                $scope.loading = $ionicLoading.show({
                      template: 'Seu GPS está desativado. Ative-o para localizar.',
                      showBackdrop: false,
                      showDelay: 10,
                      duration: 2000
                });
          }

        function showPosition(position) {
            $scope.desabilita_tracar = true;
          $scope.lat = position.coords.latitude;
          $scope.lng = position.coords.longitude;

            $scope.getAddress($scope.lat,$scope.lng);

            var myLatlng = new google.maps.LatLng(-22.5667127, -47.4117628);
            var mapOptions = {
                center: myLatlng,
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: true,
                streetViewControl:true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.TOP_CENTER
                },
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_CENTER,
                    style:google.maps.ZoomControlStyle.LARGE
                },
            };

            directionsDisplay = new google.maps.DirectionsRenderer();
            map = new google.maps.Map(document.getElementById("map"),
               mapOptions);
            // Create infoWindow
            var infoWindow = new google.maps.InfoWindow({
                content: 'Clube Gran São João'
            });
                               var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Clube Gran São João'
              });
             infoWindow.open(map, marker);
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById("directions")); 
            $scope.map = map;
        }
        }

            $scope.$on('$ionicView.enter', function(){
    $scope.initialize(); 
    });
       


})
// Posts Controller
.controller('DestaquesCtrl', function($scope, $ionicLoading, $interval, $location, $ionicSlideBoxDelegate, DestaquesData, DestaquesStorage, ImgCache) {
  $scope.intervalo = 4000;
    $scope.destaques = [];
    $scope.storage = '';

    DestaquesData.async().then(
        // successCallback
        function() {
            $scope.destaques = DestaquesData.getAll();
            $ionicSlideBoxDelegate.$getByHandle('slidehome').update();
            $scope.animaBarra($scope.intervalo-1000);
        },
        // errorCallback
        function() {
            $scope.destaques = DestaquesStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $scope.animaBarra();
        },
        // notifyCallback
        function() {

        }
    );
       
    $scope.animaBarra = function(tempo){

           $(".meter > span").stop().width(0);
           $(".meter > span").animate({
                        width: '100%'
                    }, tempo);
    }
    $scope.slideChanged = function(index) {
        $scope.animaBarra($scope.intervalo);

        if(index==3) {
            $interval(function(){
                if($location.path()=='/app/home') {
                $ionicSlideBoxDelegate.$getByHandle('slidehome').slide(0,0);
                            $ionicSlideBoxDelegate.$getByHandle('slidehome').start();
                        }

            },$scope.intervalo)
        }
    }


           
})

// Post Controller
.controller('DestaqueCtrl', function($scope,  $ionicLoading, $ionicActionSheet, $stateParams, DestaquesData) {

    $scope.destaque = DestaquesData.get($stateParams.postId);
    $scope.destaque.postId = $stateParams.postId;

    
    $scope.sharePost = function() {
        
    $scope.subject = $scope.post.Titulo;
    $scope.link = 'http://www.gran.com.br/site/'+$scope.post.URL;
    $scope.message = $scope.post.Titulo + ' ' + $scope.link;
    $scope.image = 'http://www.gran.com.br/site/'+$scope.post.FotoNoticia;

            $ionicActionSheet.show({
                buttons: [
                    { text: 'Facebook' },
                    { text: 'Twitter' },
                    { text: 'Whatsapp' },
                    { text: 'Email' },
                    { text: 'Outros' }
                ],
                titleText: 'Compartilhar',
                cancelText: 'Cancelar',
                buttonClicked: function(index) {
                    switch(index) {
                        case 0:
                            $scope.shareToFacebook();
                            break;
                        case 1:
                            $scope.shareToTwitter();
                            break;
                        case 2:
                            $scope.shareToWhatsApp();
                            break;
                        case 3:
                            $scope.shareViaEmail();
                            break;
                        case 4:
                            $scope.shareNative();
                            break;
                    }
                    return true;
                }
            });
        }
     

        $scope.shareNative = function() {
            window.plugins.socialsharing.share($scope.message, $scope.subject, $scope.image, $scope.link);
        }
         $scope.shareToFacebook  = function() {
            window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint($scope.subject, $scope.image, $scope.link);
        }
        $scope.shareToTwitter  = function() {
            window.plugins.socialsharing.shareViaTwitter($scope.subject, null, $scope.link);
        }
        $scope.shareToWhatsApp  = function() {
            window.plugins.socialsharing.shareViaWhatsApp($scope.post.Titulo, $scope.image, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }

})

// Posts Controller
.controller('PostsCtrl', function($scope, $ionicLoading, PostsData, PostsStorage) {

    $scope.posts = [];
    $scope.storage = '';
     $scope.loadData = function () {
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    PostsData.async().then(
        // successCallback
        function() {

            $scope.posts = PostsData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.posts = PostsStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );
    }
    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 50;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.posts.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    };
     $scope.loadData();
})

// Post Controller
.controller('PostCtrl', function($scope,  $ionicLoading,$ionicActionSheet, $stateParams, PostsData) {

    $scope.post = PostsData.get($stateParams.postId);
    $scope.post.postId = $stateParams.postId;

    $scope.sharePost = function() {
        
    $scope.subject = $scope.post.titulo;
    $scope.message = $scope.post.titulo;
    $scope.link = 'http://www.gran.com.br/site/?pg=noticia&id=61'+$scope.post.id;
    $scope.post.img = encodeURI($scope.post.img);
  


            $ionicActionSheet.show({
                buttons: [
                    { text: 'Facebook' },
                    { text: 'Twitter' },
                    { text: 'Whatsapp' },
                    { text: 'Email' },
                    { text: 'Outros' }
                ],
                titleText: 'Compartilhar',
                cancelText: 'Cancelar',
                buttonClicked: function(index) {
                    switch(index) {
                        case 0:
                            $scope.shareToFacebook();
                            break;
                        case 1:
                            $scope.shareToTwitter();
                            break;
                        case 2:
                            $scope.shareToWhatsApp();
                            break;
                        case 3:
                            $scope.shareViaEmail();
                            break;
                        case 4:
                            $scope.shareNative();
                            break;
                    }
                    return true;
                }
            });
        }
     

        $scope.shareNative = function() {
            window.plugins.socialsharing.share($scope.message, $scope.subject,$scope.post.img, $scope.link);
        }
         $scope.shareToFacebook  = function() {
            window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint($scope.subject,$scope.post.img, $scope.link);
        }
        $scope.shareToTwitter  = function() {
            window.plugins.socialsharing.shareViaTwitter($scope.subject, null, $scope.link);
        }
        $scope.shareToWhatsApp  = function() {
            window.plugins.socialsharing.shareViaWhatsApp($scope.post.message,$scope.post.img, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }


})

// Posts Controller
.controller('AgendaCtrl', function($scope, $ionicLoading, AgendaData, AgendaStorage) {

    $scope.eventos = [];
    $scope.storage = '';
     $scope.loadData = function () {
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    AgendaData.async().then(
        // successCallback
        function() {

            $scope.eventos = AgendaData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.eventos = AgendaStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );
    }
    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 7;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.eventos.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    };
     $scope.loadData();
})

// Post Controller
.controller('EventoCtrl', function($scope,  $ionicLoading,$ionicActionSheet, $stateParams, AgendaData) {

    $scope.evento = AgendaData.get($stateParams.eventoId);
    $scope.evento.eventoId = $stateParams.eventoId;

    $scope.sharePost = function() {
        
    $scope.subject = $scope.evento.titulo;
    $scope.message = $scope.evento.titulo;
    $scope.link = 'http://www.gran.com.br/site/?pg=eventos';
    $scope.evento.img = encodeURI($scope.evento.img);
  


            $ionicActionSheet.show({
                buttons: [
                    { text: 'Facebook' },
                    { text: 'Twitter' },
                    { text: 'Whatsapp' },
                    { text: 'Email' },
                    { text: 'Outros' }
                ],
                titleText: 'Compartilhar',
                cancelText: 'Cancelar',
                buttonClicked: function(index) {
                    switch(index) {
                        case 0:
                            $scope.shareToFacebook();
                            break;
                        case 1:
                            $scope.shareToTwitter();
                            break;
                        case 2:
                            $scope.shareToWhatsApp();
                            break;
                        case 3:
                            $scope.shareViaEmail();
                            break;
                        case 4:
                            $scope.shareNative();
                            break;
                    }
                    return true;
                }
            });
        }
     

        $scope.shareNative = function() {
            window.plugins.socialsharing.share($scope.message, $scope.subject,  $scope.evento.img, $scope.link);
        }
         $scope.shareToFacebook  = function() {
            window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint($scope.subject,  $scope.evento.img, $scope.link);
        }
        $scope.shareToTwitter  = function() {
            window.plugins.socialsharing.shareViaTwitter($scope.subject, null, $scope.link);
        }
        $scope.shareToWhatsApp  = function() {
            window.plugins.socialsharing.shareViaWhatsApp($scope.evento.situlo,  $scope.evento.img, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }


})

// Post Controller
.controller('NoticiaCtrl', ['$scope', '$sce', '$ionicLoading', '$ionicActionSheet', '$stateParams', 'PostsData', function($scope, $sce,$ionicLoading, $ionicActionSheet, $stateParams, PostsData, $cordovaSocialSharing) {
    $scope.post = PostsData.get($stateParams.postId);
    $scope.post.postId = $stateParams.postId;
    $scope.post.iframe = 'http://www.gran.com.br/site/?pg=noticia&id='+ $scope.post.id;
    var urlEmbed = $sce.trustAsHtml('<iframe src="'+$scope.post.iframe+'" frameborder="0" width="100%" height="100%" data-tap-disabled="true"></iframe>');

    $scope.post.embed = urlEmbed;

    
        if (/iPhone|iPod|iPad/.test(navigator.userAgent))
            $('iframe').wrap(function(){
                var $this = $(this);
                return $('<div />').css({
                    width: $this.attr('width'),
                    height: $this.attr('height'),
                    overflow: 'scroll',
                    '-webkit-overflow-scrolling': 'touch'
                });
            });
   

    $scope.sharePost = function() {

    $scope.subject = $scope.post.titulo;
    $scope.link = 'http://www.gran.com.br/site/?pg=noticia&id='+$scope.post.id;
    $scope.message = $scope.post.titulo + ' ' + $scope.link;
    if($scope.post.img) {
        $scope.image = 'http://www.gran.com.br/site/images/noticias/'+$scope.post.img;
    } else {
        $scope.image = null;
    }

            $ionicActionSheet.show({
                buttons: [
                    { text: 'Facebook' },
                    { text: 'Twitter' },
                    { text: 'Whatsapp' },
                    { text: 'Email' },
                    { text: 'Outros' }
                ],
                titleText: 'Compartilhar',
                cancelText: 'Cancelar',
                buttonClicked: function(index) {
                    switch(index) {
                        case 0:
                            $scope.shareToFacebook();
                            break;
                        case 1:
                            $scope.shareToTwitter();
                            break;
                        case 2:
                            $scope.shareToWhatsApp();
                            break;
                        case 3:
                            $scope.shareViaEmail();
                            break;
                        case 4:
                            $scope.shareNative();
                            break;
                    }
                    return true;
                }
            });
        }
     

        $scope.shareNative = function() {
            window.plugins.socialsharing.share($scope.message, $scope.subject, $scope.image, $scope.link);
        }
         $scope.shareToFacebook  = function() {
            window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint($scope.subject, $scope.image, $scope.link);
        }
        $scope.shareToTwitter  = function() {
            window.plugins.socialsharing.shareViaTwitter($scope.subject, null, $scope.link);
        }
        $scope.shareToWhatsApp  = function() {
            window.plugins.socialsharing.shareViaWhatsApp($scope.post.titulo, $scope.image, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }

}])

// Posts Controller
.controller('TempoRealCtrl', function($scope, $ionicLoading, TempoRealData, $ionicActionSheet, TempoRealStorage) {

    $scope.temporeal = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
      showBackdrop: false,
      showDelay: 10
    });

    TempoRealData.async().then(
        // successCallback
        function() {
            $scope.temporeal = TempoRealData.getAll();
            $ionicLoading.hide();

        },
        // errorCallback
        function() {
            $scope.temporeal = TempoRealStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );
     $scope.close_foto = function () {
        $('#lightbox2 span').html('').promise().done(function(){
            $('#lightbox2').fadeOut(500);  
             $('a[data-active="true"]').attr('data-active', false);
        });  
    };


    $scope.sharePost = function() {

    $scope.subject =  "Tempo Real: "+$scope.temporeal.Mandante.Nome+" X "+$scope.temporeal.Visitante.Nome;
    $scope.link = 'http://bit.ly/1j0YCLy';
    $scope.message = $scope.subject+" "+$('#lances a[data-active="true"] img').data('texto');
    $scope.message = $scope.message.replace(/(<([^>]+)>)/ig,"")
    if($scope.image) {
        $scope.image = $('#lances a[data-active="true"] img').data('imgfull');
    } else {
        $scope.image = null;
    }

    $ionicActionSheet.show({
                buttons: [
                    { text: 'Facebook' },
                    { text: 'Twitter' },
                    { text: 'Whatsapp' },
                    { text: 'Email' },
                    { text: 'Outros' }
                ],
                titleText: 'Compartilhar',
                cancelText: 'Cancelar',
                buttonClicked: function(index) {
                    switch(index) {
                        case 0:
                            $scope.shareToFacebook();
                            break;
                        case 1:
                            $scope.shareToTwitter();
                            break;
                        case 2:
                            $scope.shareToWhatsApp();
                            break;
                        case 3:
                            $scope.shareViaEmail();
                            break;
                        case 4:
                            $scope.shareNative();
                            break;
                    }
                    return true;
                }
            });
    }
     

        $scope.shareNative = function() {
            window.plugins.socialsharing.share($scope.message, $scope.subject, $scope.image, $scope.link);
        }
         $scope.shareToFacebook  = function() {
            window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint($scope.subject, $scope.image, $scope.link);
        }
        $scope.shareToTwitter  = function() {
            window.plugins.socialsharing.shareViaTwitter($scope.subject, null, $scope.link);
        }
        $scope.shareToWhatsApp  = function() {
            window.plugins.socialsharing.shareViaWhatsApp($scope.subject, $scope.image, $scope.link);
        }
        $scope.shareViaEmail  = function() {
            window.plugins.socialsharing.shareViaEmail($scope.message, $scope.subject, [], [], [], null);
        }

})
// Lances Controller
.controller('LancesCtrl', function($scope, $ionicLoading, LancesData, LancesStorage, $sce) {

    $scope.lances = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    LancesData.async().then(
        // successCallback
        function() {
            $scope.lances = LancesData.getAll();
            $ionicLoading.hide();
            $scope.lances2 = [];

         
            },
        // errorCallback
        function() {
            $scope.lances = LancesStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {


        }
    );

    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 5;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.lances.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    };

    $scope.toTrustedHTML = function( html ){
        html += " ";
        var newvar = html.replace(/(<([^>]+)>)/ig,"");
        newvar = newvar.replace(/(\r\n|\n|\r)/gm,"");
        return newvar;
    }

    $scope.abre_foto = function (passedEventObject, thumbid) {
    $('a[data-active="true"]').attr('data-active', false);
     $('a[data-thumbid="'+thumbid+'"]').attr('data-active', true);
     var window_height = window.innerHeight;
         $('#lightbox2 span').css('max-height', window_height-Math.round((window_height*25)/100));
        var imagem = $('a[data-thumbid="'+thumbid+'"] img').data('imgfull');
        var texto = $('a[data-thumbid="'+thumbid+'"] img').data('texto');
        var link = $('a[data-thumbid="'+thumbid+'"] img').data('link');
        $('#lightbox2 span').html('<img src="'+imagem+'"/><b>'+texto+'</b>').promise().done(function(){
            $scope.ativoimg = imagem;
            $scope.ativolink = link;
            $('#lightbox2').fadeIn(500);  
        });  
    };


})
// Posts Controller post
.controller('JogosCtrl', function($scope, $ionicLoading, JogosData, JogosStorage) {

    if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
    }

    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    currentDate.getTime();
    currentDate = Math.floor(currentDate / 1000);

    $scope.jogos = [];
    $scope.storage = '';
    $scope.datahoje = currentDate;
    console.log($scope.datahoje);


    $scope.campeonatos = [
          { id:'1', name:'Futsal' },
          { id:'2', name:'Sintético Misto' },
          { id:'3', name:'Sintético Veteranos' },
          { id:'4', name:'Misto Grama' },
          { id:'5', name:'Veteranos Grama' },
        { id:'6', name:'Society' }
    ];
    
$scope.campeonatoSelect = false;
$scope.changedValue=function(item){

    if(item.id>0) {
        $scope.campeonatoSelect = item.id
    }  else {
        $scope.campeonatoSelect = 100
        $scope.getFilter()
    }  
     console.log($scope.campeonatoSelect)
    }  

     $scope.getFilter = function() {
        return {campeonato: $scope.campeonatoSelect};
    }

     $scope.loadData = function () {
    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    JogosData.async().then(
        // successCallback
        function() {
            $scope.jogos = JogosData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.jogos = JogosStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );
    }
    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 10;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.jogos.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    };
     $scope.loadData();
})
// Jogadores Controller
.controller('JogadoresCtrl', function($scope, $ionicLoading, JogadoresData, JogadoresStorage) {

    $scope.jogadores = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    JogadoresData.async().then(
        // successCallback
        function() {
            $scope.jogadores = JogadoresData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.jogadores = JogadoresStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );

    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 5;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.jogadores.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    };

})
// Jogador Controller
.controller('NotificacoesCtrl', function($scope, $stateParams, $ionicLoading, PushData, PushStorage) {

$scope.ativado = true;
$scope.ativaPush=function(val){
    $scope.ativado = !$scope.ativado;
    if($scope.ativado) {
  $scope.loading = $ionicLoading.show({
      template: 'As notificações foram ativadas!',
      showBackdrop: false,
      showDelay: 10,
      duration: 2000
    });
    } else {
      $scope.loading = $ionicLoading.show({
      template: 'As notificações foram desativadas!',
      showBackdrop: false,
      showDelay: 10,
      duration: 2000
    });
  }

    }

    $scope.notificacoes = [];
    $scope.storage = '';

    $scope.loading = $ionicLoading.show({
      template: '<i class="icon ion-loading-a"></i> Carregando',

      
      showBackdrop: false,

      
      showDelay: 10
    });

    PushData.async().then(
        // successCallback
        function() {
            $scope.notificacoes = PushData.getAll();
            $ionicLoading.hide();
        },
        // errorCallback
        function() {
            $scope.notificacoes = PushStorage.all();
            $scope.storage = 'Dados locais. Você está offline.';
            $ionicLoading.hide();
        },
        // notifyCallback
        function() {}
    );

    var page = 1;
    // Define the number of the posts in the page
    var pageSize = 5;

    $scope.paginationLimit = function(data) {
    return pageSize * page;
    };

    $scope.hasMoreItems = function() {
    return page < ($scope.notificacoes.length / pageSize);
    };

    $scope.showMoreItems = function() {
    page = page + 1;
    };

})
.controller('TextosCtrl', function($scope, $ionicLoading, $stateParams, $state) {

//    $scope.loading = $ionicLoading.show({
//       template: '<i class="icon ion-loading-a"></i> Carregando',

      
//       showBackdrop: false,

      
//       showDelay: 10
//     });
//     if($state.current.name=='app.historia') {
//         $scope.colors = [
//           {id:'1', name:'Clube Gran São João'}
//         ];
//     }  


// $scope.colorsSelected = $scope.colors[0];

// $scope.changedValue=function(item){
//         // $ionicLoading.show();
//      $.getJSON("http://gran.com.br/site/services/feed.php?conteudo=noticias&id="+item.id, function(result){
//          $scope.texto = '<h1 class="title">'+item.name+'</h1>'+result.Model.Textos;
//           $ionicLoading.hide();
//     });

//     }  


//     $scope.changedValue($scope.colors[0]);


})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MenuData, $ionicActionSheet) {

  $scope.items = MenuData.items;
  $scope.subMenus = MenuData.items.subMenus;

   $scope.toggleGroup = function(item) {
   
    if ($scope.isGroupShown(item)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = item;
    }
  };
  $scope.isGroupShown = function(item) {
    return $scope.shownGroup === item;
  };

})

        //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
//target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
        //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
        //_blank: Opens in the InAppBrowser.
        //_system: Opens in the system's web browser.
