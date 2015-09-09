var angular = require('angular')
var _ = require('lodash')

module.exports = angular.module('article.controllers', [])
  .controller('ArticleCreateCtrl', function ($scope, $state, Article, Category, $window) {
    $scope.article = new Article()
    $scope.article.content = ''
    $scope.article.tags = []
    $scope.categorys = Category.query()
    $scope.querySearch = function (searchText) {
      var result = searchText !== '' ? $scope.categorys.filter(function (category) {
        return category.name.indexOf(searchText) === 0
      }) : $scope.categorys
      return result
    }

    $scope.create = function () {
      $scope.article.category = $scope.selectedItem._id
      $scope.article.$save(function (data) {
        $state.go('category.articles', {
          id: $scope.article.category
        })
      }, function (err) {
        console.log(err)
      })
    }

    $scope.cancel = function () {
      $window.history.back()
    }
  })

  .controller('ArticleEditCtrl', function ($scope, $stateParams, Article, Category,$state,$window) {
    $scope.categorys = Category.query()
    $scope.article = Article.get({id: $stateParams.id}, function () {
      $scope.selectedItem = _.find($scope.categorys, function (category) {
        return category._id == $scope.article.category
      })
    })


    $scope.create = function () {
      $scope.article.category = $scope.selectedItem._id
      Article.update({id:$scope.article._id},$scope.article,function (data) {
        $state.go('category.articles', {
          id: $scope.article.category
        })
      }, function (err) {
        console.log(err)
      })
    }

    $scope.cancel = function () {
      $window.history.back()
    }
  })