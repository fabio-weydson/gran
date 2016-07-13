angular.module('mobionicApp.storage', [])

.factory('NewsStorage', function() {
  return {
    all: function() {
      var news = window.localStorage['news'];
      if(news) {
        return angular.fromJson(news);
      }
      return {};
    },
    save: function(news) {
      window.localStorage['news'] = angular.toJson(news);
    },
    clear: function() {
      window.localStorage.removeItem('news');
    }
  }
})
.factory('JogosStorage', function() {
  return {
    all: function() {
      var jogos = window.localStorage['jogos'];
      if(jogos) {
        return angular.fromJson(jogos);
      }
      return {};
    },
    save: function(jogos) {
      window.localStorage['jogos'] = angular.toJson(jogos);
    },
    clear: function() {
      window.localStorage.removeItem('jogos');
    }
  }
})

.factory('PushStorage', function() {
  return {
    all: function() {
      var notificacoes = window.localStorage['notificacoes'];
      if(notificacoes) {
        return angular.fromJson(notificacoes);
      }
      return {};
    },
    save: function(notificacoes) {
      window.localStorage['notificacoes'] = angular.toJson(notificacoes);
    },
    clear: function() {
      window.localStorage.removeItem('notificacoes');
    }
  }
})

.factory('AboutStorage', function() {
  return {
    all: function() {
      var about = window.localStorage['about'];
      if(about) {
        return angular.fromJson(about);
      }
      return {};
    },
    save: function(about) {
      window.localStorage['about'] = angular.toJson(about);
    },
    clear: function() {
      window.localStorage.removeItem('about');
    }
  }
})
.factory('GaleriaStorage', function() {
  return {
    all: function() {
      var galerias = window.localStorage['galerias'];
      if(galerias) {
        return angular.fromJson(galerias);
      }
      return {};
    },
    save: function(galerias) {
      window.localStorage['galerias'] = angular.toJson(galerias);
    },
    clear: function() {
      window.localStorage.removeItem('galeria');
    }
  }
})
.factory('FotosStorage', function() {
  return {
    all: function() {
      var fotos = window.localStorage['fotos'];
      if(fotos) {
        return angular.fromJson(fotos);
      }
      return {};
    },
    save: function(fotos) {
      window.localStorage['fotos'] = angular.toJson(fotos);
    },
    clear: function() {
      window.localStorage.removeItem('fotos');
    }
  }
})
.factory('VideosStorage', function() {
  return {
    all: function() {
      var videos = window.localStorage['videos'];
      if(videos) {
        return angular.fromJson(videos);
      }
      return {};
    },
    save: function(videos) {
      window.localStorage['videos'] = angular.toJson(videos);
    },
    clear: function() {
      window.localStorage.removeItem('videos');
    }
  }
})
.factory('PostsStorage', function() {
  return {
    all: function() {
      var posts = window.localStorage['posts'];
      if(posts) {
        return angular.fromJson(posts);
      }
      return {};
    },
    save: function(posts) {
      window.localStorage['posts'] = angular.toJson(posts);
    },
    clear: function() {
      window.localStorage.removeItem('posts');
    }
  }
})
.factory('AgendaStorage', function() {
  return {
    all: function() {
      var eventos = window.localStorage['eventos'];
      if(eventos) {
        return angular.fromJson(eventos);
      }
      return {};
    },
    save: function(eventos) {
      window.localStorage['eventos'] = angular.toJson(eventos);
    },
    clear: function() {
      window.localStorage.removeItem('eventos');
    }
  }
})
.factory('DestaquesStorage', function() {
  return {
    all: function() {
      var destaques = window.localStorage['destaques'];
      if(destaques) {
        return angular.fromJson(destaques);
      }
      return {};
    },
    save: function(destaques) {
      window.localStorage['destaques'] = angular.toJson(destaques);
    },
    clear: function() {
      window.localStorage.removeItem('destaques');
    }
  }
})

.factory('SettingsStorage', function() {
  return {
    all: function() {
      var settings = window.localStorage['settings'];
      if(settings) {
        return angular.fromJson(settings);
      }
      return {
            // Initial App Setting Values
            options: [
            {
               name: 'First Option',
               checked: true
            },
            {
               name: 'Second Option',
               checked: false
            },
            {
               name: 'Third Option',
               checked: false
            },
            {
               name: 'Fourth Option',
               checked: false
            },
            {
               name: 'Fifth Option',
               checked: false
            }],
            sorting: 'A',
            range:30
        };
    },
    save: function(settings) {
      window.localStorage['settings'] = angular.toJson(settings);
    },
    clear: function() {
      window.localStorage.removeItem('settings');
    }
  }
})
