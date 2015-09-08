var angular = require('angular')
var ngResource = require('angular-resource')
var ngMaterial = require('angular-material')
var uiRouter = require('angular-ui-router')
var article = require('./article')
var category = require('./category')
var models = require('./models/models')


var app = angular.module('admin', [uiRouter, ngMaterial, ngResource, article.name, category.name, models.name])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      views: {}
    })

  .state('category', {
    url: '/category',
    views: {
      'main': {
        templateUrl: 'category/templates/category.html',
        controller: 'CategoryCtrl'
      }
    }
  })

  .state('category.articles', {
    url: '/:id',
    views: {
      'submain': {
        templateUrl: 'category/templates/category.articles.html',
        controller: 'CategoryArticlesCtrl'
      }
    }
  })

  .state('article', {
    url: '/article',
  })

  .state('article.create', {
    url: '/create',
    views: {
      'main@': {
        templateUrl: 'article/templates/article.edit.html',
        controller: 'ArticleCreateCtrl'
      }
    }
  })

  .state('article.edit', {
    url: '/:id',
    views: {
      'main': {
        templateUrl: 'article/templates/article.edit.html',
        controller: 'ArticleEditCtrl'
      }
    }
  })


  $urlRouterProvider.otherwise('/')
})

module.exports = app

// .config(function($mdIconProvider) {
//   $mdIconProvider
//     .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
//     .defaultIconSet('img/icons/sets/core-icons.svg', 24);
// })