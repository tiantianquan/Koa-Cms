var angular = require('angular')
var style = require('./login.scss')

module.exports = angular.module('login.controllers', [])
  .controller('LoginCtrl', function ($scope) {

  })

  .controller('RegisterCtrl', function ($scope) {
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
