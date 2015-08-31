angular.module('admin.controllers', [])


  //类别
  .controller('CategoryCtrl', function ($scope,Category) {
    $scope.categorys = Category.query()
  })

  //类别文章
  .controller('CategoryArticlesCtrl', function ($scope, $stateParams,CategoryAtrticles,$mdDialog) {
    $scope.articles = CategoryAtrticles.get({
      categoryId:$stateParams.id
    })

    $scope.status = '  ';
    $scope.showAdvanced = function (ev,data) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'templates/article.preview.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        locals:{
          data:data
        }
      }).then(function (answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.status = 'You cancelled the dialog.';
      })
    }
  })
  function DialogController($scope, $mdDialog,data) {
    $scope.article = data
    $scope.hide = function () {
      $mdDialog.hide()
    }
    $scope.cancel = function () {
      $mdDialog.cancel()
    }
    $scope.answer = function (answer) {
      $mdDialog.hide(answer)
    }
  }

