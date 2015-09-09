var angular = require('angular')
var scss = require('./category.scss')

module.exports = angular.module('category.controllers', [])
  .controller('CategoryCtrl', function ($scope, Category) {
    $scope.categorys = Category.query()
  })

  .controller('CategoryArticlesCtrl', function ($scope, $mdUtil, $timeout, $mdSidenav, $log, $stateParams, CategoryAtrticles, Article,$mdDialog) {
    $scope.getData = function (pageNum) {
      var defaultListNum = 10
      CategoryAtrticles.get({
        categoryId: $stateParams.id,
        keys: ['titles.default', 'createDate'],
        pageAgr: [pageNum, defaultListNum],
      }, function (data) {
        $scope.articles = data[0]
        $scope.articleCount = data[1]
        $scope.pageNum = Math.floor($scope.articleCount / defaultListNum)+1
        if($scope.articleCount % defaultListNum==0 && $scope.pageNum !=1){
          $scope.pageNum--
        }
        $scope.range = function(num){
          return new Array(num)
        }
      })
    }

    $scope.getData(1)


    $scope.preview = function(article){
      $scope.previewArticle = Article.get({id:article._id})
      buildToggler('right')()
    }
    $scope.close = function () {
      $mdSidenav('right').close()
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      var debounceFn = $mdUtil.debounce(function () {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
      return debounceFn;
    }
  })