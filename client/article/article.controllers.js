var angular = require('angular')
module.exports = angular.module('article.controllers', [])
  .controller('ArticleCreateCtrl', function($scope, $state, Article, Category, $window) {
    $scope.article = new Article()
    $scope.article.content = ''
    $scope.article.tags = []
    $scope.categorys = Category.query()
    $scope.querySearch = function(searchText) {
      var result = searchText !== '' ? $scope.categorys.filter(function(category) {
        return category.name.indexOf(searchText) === 0
      }) : $scope.categorys
      return result
    }

    $scope.$watch
    $scope.create = function() {
      $scope.article.category = $scope.selectedItem._id
      $scope.article.$save(function(data) {
        //$state.go('news.edit', {id: data._id})
        $state.go('category.articles', {
          id: $scope.article.category
        })
      }, function(err) {
        console.log(err)
      })
    }

    $scope.cancel = function() {
      $window.history.back()
    }
  })