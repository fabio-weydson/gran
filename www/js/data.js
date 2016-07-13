angular.module('mobionicApp.data', [])

// Home Data: Home page configuration
    .factory('Data', function($http, $q, NewsStorage) {

    var json = 'json/news.json';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.result;
        NewsStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = NewsStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(newId) { return data[newId]; };

    return service;
})

// Menu Data: Menu configuration
.factory('MenuData', function(){
    var data = {};


    data.items = [
        {
            title: 'Home',
            icon: 'ion-ios-home',
            url: '#/app'
        },
        {
            title: 'O Clube',
            icon: 'ion-trophy',
             url: '#/app/historia',
             icon:"ion-information-circled",
        },
        {
            title: 'Noticias',
            icon: 'ion-ios-paper-outline',
            url: '#/app/posts'
        },
         {
            title: 'Galeria',
            icon: 'ion-images',
           
             subMenu: [
                {
                    title: "Fotos",
                    url: '#/app/galeria',
                    icon:"ion-android-image",
                },
                {
                    title: "Videos",
                    url: '#/app/videos',
                    icon:"ion-social-youtube",
                }
                // {
                //     title: "Papeis de Parede",
                //     url: '#/app/papeis_de_parede',
                //     icon:"ion-wand",
                // }
                ] 
        },
         {
            title: 'Agenda',
            icon: 'ion-android-calendar',
            url: '#/app/agenda'
        },
         {
            title: 'Campeonatos',
            icon:"ion-ios-football",
            url: '#/app/jogos'
        },
                {
                    title: "Fale Conosco",
                    url: '#/app/contact',
                    icon:"ion-ios-email",
                },
                  {
                    title: "Como Chegar",
                    url: '#/app/map',
                    icon:"ion-ios-location",
                },
                {
                    title: "Notificações",
                    url: '#/app/notificacoes',
                    icon:"ion-android-notifications",
                }
        
    ];

    return data;
})

.factory('FotosData', function($http, $q, FotosStorage) {

    // var json = 'https://api.instagram.com/v1/users/2107328463/media/recent/?access_token=206080583.5b9e1e6.85d847631af641f1a32e0e0eb4524763&count=60';
    var json = 'http://gran.com.br/site/services/feed.php?conteudo=fotos&limit=100';
    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.Model;
        FotosStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = FotosStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(fotoId) { return data[fotoId]; };

    return service;
})
.factory('GaleriaData', function($http, $q, GaleriaStorage) {

    // var json = 'https://api.instagram.com/v1/users/2107328463/media/recent/?access_token=206080583.5b9e1e6.85d847631af641f1a32e0e0eb4524763&count=60';
    var json = 'http://gran.com.br/site/services/feed.php?conteudo=galerias&limit=100';
    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.Model;
        GaleriaStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = GaleriaStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(galeriaId) { return data[galeriaId]; };

    return service;
})
// Gallery Data: Gallery configuration
.factory('VideosData', function($http, $q, VideosStorage) {

    var json = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=UUnVIdaIQ39g35cWWoXnKORA&fields=items/id,items/snippet/publishedAt,items/snippet/title,items/snippet/description,items/snippet/resourceId/videoId,items/snippet/thumbnails/default,items/snippet/thumbnails/high&key=AIzaSyDAyzQoPMlHyqjx5MJ5NS9jv3cM8JihcOc';
    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.items;
        VideosStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = VideosStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(videoId) { return data[videoId]; };

    return service;
})

// About Data: JSON
.factory('AboutData', function($http, $q, AboutStorage) {

    var json = 'json/about.json';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};


    service.getAll = function() { return data; };

    service.get = function(memberId) { return data[memberId]; };

    return service;
})

// Posts Data: JSON Wordpress Posts configuration
.factory('PostsData', function($http, $q, PostsStorage) {

    
    var json = 'http://gran.com.br/site/services/feed.php?conteudo=noticias&limit=100';

    /* Set your URL as you can see in the following example */
    // var json = 'YourWordpressURL/?json=get_recent_posts';

    /* With user-friendly permalinks configured */
    // var json = 'YourWordpressURL/api/get_recent_posts';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.Model;
        PostsStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = PostsStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(postId) { 
	    return data[postId];
	};

    return service;
})

// Posts Data: JSON Wordpress Posts configuration
.factory('AgendaData', function($http, $q, AgendaStorage) {

    
    var json = 'http://gran.com.br/site/services/feed.php?conteudo=agenda&limit=100';

    /* Set your URL as you can see in the following example */
    // var json = 'YourWordpressURL/?json=get_recent_posts';

    /* With user-friendly permalinks configured */
    // var json = 'YourWordpressURL/api/get_recent_posts';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.Model;
        AgendaStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = AgendaStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(eventoId) { 
        return data[eventoId];
    };

    return service;
})

// Posts Data: JSON Wordpress Posts configuration
.factory('JogosData', function($http, $q, JogosStorage) {

    
    var json = 'http://gran.com.br/site/services/feed.php?conteudo=campeonatos';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.Model;
        JogosStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = JogosStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(postId) { 
        return data.Jogos[postId];
    };

    return service;
})
// Posts Data: JSON Wordpress Posts configuration
.factory('DestaquesData', function($http, $q, DestaquesStorage) {

    var json = 'http://gran.com.br/site/services/feed.php?conteudo=slides';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).


    success(function(d) {
         d = d.Model;
        $.each(d, function( index, value ) {
            if(value.img) {
                data.push(value);
            }
        });

        DestaquesStorage.save(data);
        deferred.resolve();
    }).

    error(function() {
        data = DestaquesStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(postId) { 
	    return data[postId];
	};

    return service;
})

// Posts Data: JSON Wordpress Posts configuration
.factory('PushData', function($http, $q, PushStorage) {

    
    var json = 'http://gran.com.br/site/services/feed.php?conteudo=notificacoes';

    var deferred = $q.defer();
    var promise = deferred.promise;
    var data = [];
    var service = {};

    service.async = function() {
    $http({method: 'GET', url: json, timeout: 5000}).
    // this callback will be called asynchronously
    // when the response is available.
    success(function(d) {
        data = d.Model;
        
        PushStorage.save(data);
        deferred.resolve();
    }).
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    error(function() {
        data = PushStorage.all();
        deferred.reject();
    });

    return promise;

    };

    service.getAll = function() { return data; };

    service.get = function(jogadorId) {
	    return data[notificacaoId];
	};

    return service;
})