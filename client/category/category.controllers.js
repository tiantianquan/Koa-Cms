var angular = require('angular')

module.exports = angular.module('category.controllers', [])
  .controller('CategoryCtrl', function ($scope, Category) {
    $scope.categorys = Category.query()
  })

  .controller('CategoryArticlesCtrl', function ($scope, $mdUtil, $timeout, $mdSidenav, $log, $stateParams, CategoryAtrticles, $mdDialog) {
    $scope.getData = function (pageNum) {
      var defaultListNum = 2
      CategoryAtrticles.get({
        categoryId: $stateParams.id,
        keys: ['titles.default', 'createDate'],
        pageAgr: [pageNum, defaultListNum],
      }, function (data) {
        $scope.articles = data[0]
        $scope.articleCount = data[1]
        $scope.pageNum = Math.floor($scope.articleCount / defaultListNum)+1
        $scope.range = function(num){
          return new Array(num)
        }
      })
    }

    $scope.getData(1)


    $scope.preview = buildToggler('right');
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