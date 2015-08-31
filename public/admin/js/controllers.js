angular.module('admin.controllers', [])


//News
  .controller('NewsCtrl', function ($scope, News, $state) {
    $scope.newses = News.query()
  })

  .controller('NewsEditCtrl', function ($scope, $stateParams, News, Upload, $timeout) {
    //upload
    $scope.uploadFiles = function (file) {
      $scope.f = file;
      if (file && !file.$error) {
        file.upload = Upload.upload({
          url: '/admin/upload',
          file: file
        })

        file.upload.then(function (response) {
          $timeout(function () {
            file.result = response.data;
            $scope.path = '/images/' + file.result.filename
            $scope.news.content += '<img src="' + $scope.path + '">'
          })
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        })

        file.upload.progress(function (evt) {
          file.progress = Math.min(100, parseInt(100.0 *
            evt.loaded / evt.total));
        })
      }
    }

    //crud

    $scope.news = News.get({
        id: $stateParams.id
      }, function (value) {
      },
      function (httpResponse) {
      })

    $scope.submit = function () {
      News.update({
        id: $scope.news._id
      }, $scope.news, function (data) {
        // $scope.news = data
        $scope.alert = {
          msg: '保存成功',
          type: 'success',
          isShow: true
        }
      }, function (res) {
        $scope.alert = {
          msg: '保存失败',
          type: 'danger',
          isShow: true
        }
      });

    }
  })

  .controller('NewsCreateCtrl', function ($scope, $stateParams, $state, News) {
    $scope.news = new News()
    $scope.submit = function () {
      $scope.news.$save(function (data) {
        $state.go('news.edit', {id: data._id})
      })
    }
  })


//serve
  .controller('ServeCtrl', function ($scope, Serve, $state) {
    $scope.serves = Serve.query()
  })

  .controller('ServeEditCtrl', function ($scope, $q, $stateParams, Serve, Solution, Upload, $timeout) {
    $scope.serve = Serve.get({
      id: $stateParams.id
    },function(serve){
      $scope.solutionList = serve.connectArticle.map(function(ca){
        return Solution.get({id:ca})
      })
    })



    $scope.solutions = Solution.query(function (items) {
      $scope.serve.connectArticle.forEach(function (i) {
        items.forEach(function (j) {
          if (i === j._id) {
            j.isChecked = true
          } else {
            j.isChecked = false
          }
        })
      })
    })

    // $scope.checkChange = function(solution) {
    //   var ca = $scope.serve.connectArticle
    //   var filterList = ca.filter(function(_id) {
    //     return _id === solution._id
    //   })
    //   if (filterList.length === 0 && solution.isChecked) {
    //     ca.push(solution._id)
    //   }
    //   if (filterList.length !== 0 && !solution.isChecked) {
    //     _.remove(ca, function(_id) {
    //       return _id === solution._id
    //     })
    //   }
    // }

    $scope.submit = function () {
      $scope.serve.connectArticle = []
      $scope.solutions.forEach(function (item) {
        if (item.isChecked) {
          $scope.serve.connectArticle.push(item._id)
        }
      })
      $scope.serve.$update(function () {
        console.log('success')
      }, function () {
        console.log('fail')
      })
    }
  })

  .controller('ServeCreateCtrl', function ($scope, Solution, $stateParams, Serve) {
    $scope.serve = new Serve()
    $scope.solutions = Solution.query()
    $scope.submit = function () {
      $scope.serve.$save(function () {
      })
    }
  })


//solution
  .controller('SolutionCtrl', function ($scope, Serve, Solution, $state) {
    $scope.solutions = Solution.query()
  })

  .controller('SolutionEditCtrl', function ($scope, $stateParams, Solution, Serve, Upload, $timeout) {
    $scope.solution = Solution.get({
      id: $stateParams.id
    })

    $scope.serves = Serve.query(function (items) {
      $scope.solution.connectArticle.forEach(function (i) {
        items.forEach(function (j) {
          if (i === j._id) {
            j.isChecked = true
          } else {
            j.isChecked = false
          }
        })
      })
    })

    $scope.submit = function () {
      $scope.solution.connectArticle = []
      $scope.serves.forEach(function (item) {
        if (item.isChecked) {
          $scope.solution.connectArticle.push(item._id)
        }
      })
      $scope.solution.$update(function () {
        console.log('success')
      }, function () {
        console.log('fail')
      })
    }
  })

  .controller('SolutionCreateCtrl', function ($scope, Serve, $stateParams, Solution) {
    $scope.solution = new Solution()
    $scope.serves = Serve.query()
    $scope.submit = function () {
      $scope.solution.$save(function () {
      })
    }
  })