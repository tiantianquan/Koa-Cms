var angular = require('angular')

module.exports = angular.module('models', [])

  .factory('ModelUtil', function () {
    return {
      commonOpt: {
        param: {
          id: '@_id'
        },
        method: {
          update: {
            method: 'PUT'
          }
        }
      },
    }
  })

  .factory('Article', function ($resource, ModelUtil) {
    return $resource('/admin/article/:id', ModelUtil.commonOpt.param, ModelUtil.commonOpt.method)
  })

  .factory('Category', function ($resource, ModelUtil) {
    return $resource('/admin/category/:id', ModelUtil.commonOpt.param, ModelUtil.commonOpt.method)
  })

  .factory('CategoryAtrticles', function ($resource, ModelUtil) {
    return $resource('/admin/category-articles/:categoryId?keys=:keys&&pageAgr=:pageAgr', null, {
      get: {
        method: 'GET',
        isArray: true
      }
    })
  })

  .factory('Author', function ($resource, ModelUtil) {
    return $resource('/admin/author/:id', ModelUtil.commonOpt.param, ModelUtil.commonOpt.method)
  })

  .factory('Login', function ($http) {
    return {
      post: function (doc,cb) {
        $http.post('/admin/login',doc,cb)
      }
    }
  })

