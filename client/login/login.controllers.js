var angular = require('angular')
var style = require('./login.scss')

module.exports = angular.module('login.controllers', [])
  .controller('LoginCtrl', function ($scope,$cookies, Login) {
    $scope.login = function () {
      //写cookie
      $cookies.put('loginPage',true)
      Login.post($scope.author, function (state) {
        console.log(state)
      })
    }
  })

  .controller('RegisterCtrl', function ($scope, Author, $state) {
    $scope.author = new Author()
    $scope.submit = function () {
      $scope.author.$save(function (data) {
        $state.go('login', {})
      }, function (err) {
        console.log(err)
      })
    }
  })
  .directive('passwordSame', function () {
    return {
      restrict: 'A',
      //scope: ture,
      require: 'ngModel',
      link: function (scope, element, attributes, ngModel) {
        ngModel.$validators.passwordSame = function (modelValue) {
          if (scope.author != undefined)
            return modelValue == scope.author.password
        }
      }
    }
  })
