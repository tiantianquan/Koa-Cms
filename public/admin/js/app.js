angular.module('admin', ['ui.router', 'ngMaterial', 'ngResource', 'ngFileUpload', 'textAngular', 'admin.controllers', 'admin.models'])

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        views: {}
      })

      .state('category', {
        url: '/category',
        views: {
          'main': {
            templateUrl: 'templates/category.html',
            controller: 'CategoryCtrl'
          }
        }
      })

      .state('category.articles', {
        url: '/category/:id',
        views: {
          'submain': {
            templateUrl: 'templates/category.articles.html',
            controller: 'CategoryArticlesCtrl'
          }
        }
      })

      .state('article', {
        url: '/article/:id',
        views: {
          'submain': {
            templateUrl: 'templates/article.html',
            controller: 'ArticleCtrl'
          }
        }
      })


    $urlRouterProvider.otherwise('/')
  })

  .config(function ($mdIconProvider) {
    $mdIconProvider
      .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);
  })

  .directive('alertmsg', function () {
    return {
      restrict: 'E',
      // transclude: true,
      template: '<alert type="{{type}}" dismiss-on-timeout="1" close="closeAlert()" ng-show="isShow">{{msg}}</alert>',
      scope: {
        msg: '=',
        type: '=',
        isShow: '='
      },
      link: function (scope, element, attrs) {
        element.css({
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100%',
          'text-align': 'center',
          opacity: '.7',
          'z-index': 100
        })
        scope.type = 'success'
        scope.msg = 'success'
        scope.isShow = false
        scope.closeAlert = function () {
          scope.isShow = false
        }
      },
    }
  })

