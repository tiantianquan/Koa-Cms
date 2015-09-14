
require('bootstrap/dist/css/bootstrap.css')
var angular = require('angular')
var ngResource = require('angular-resource')
var ngMaterial = require('angular-material')
var ngMessages = require('angular-messages')
var uiRouter = require('angular-ui-router')
var article = require('./article')
var category = require('./category')
var login = require('./login')
var models = require('./models/models')

//markdown
//var ngSanitize = require('angular-sanitize')
//showdown = require('showdown')
//require('ng-showdown')

//富文本
window.rangy = require('rangy')
window.rangy.saveSelection = require('rangy/lib/rangy-selectionsaverestore')
require('textangular/dist/textAngular-sanitize.min')
require('textangular/dist/textAngular.css')
require('textangular')
require('font-awesome/css/font-awesome.css')


var app = angular.module('admin', ['ngSanitize','textAngular',uiRouter, ngMaterial,ngMessages, ngResource, article.name,login.name, category.name, models.name])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      views: {}
    })

    .state('login',{
      url:'/login',
      views:{
        'main':{
          templateUrl:'login/templates/login.html',
          controller:'LoginCtrl'
        }
      }
    })
    .state('register',{
      url:'/register',
      views:{
        'main':{
          templateUrl:'login/templates/register.html',
          controller:'RegisterCtrl'
        }
      }
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
      'main@': {
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