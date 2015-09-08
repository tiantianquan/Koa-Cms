var angular = require('angular')

module.exports = angular.module('category.controllers', [])
  .controller('CategoryCtrl', function($scope, Category) {
    $scope.categorys = Category.query()
  })

  .controller('CategoryArticlesCtrl', function($scope, $mdUtil, $timeout, $mdSidenav, $log, $stateParams, CategoryAtrticles, $mdDialog) {
    $scope.articles = CategoryAtrticles.get({
      categoryId: $stateParams.id,
      keys: ['title', 'createDate']
    })

    $scope.preview = buildToggler('right');
    $scope.close = function() {
        $mdSidenav('right').close()
      }
      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
    function buildToggler(navID) {
      var debounceFn = $mdUtil.debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function() {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
      return debounceFn;
    }
  })