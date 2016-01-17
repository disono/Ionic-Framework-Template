angular.module('starter.services', [])

	.factory('Srv', function ($http, $ionicLoading) {
		return {
			all: function (params) {
				return $http.get(WBConfig.urlApp(), {
					params: params.parameters
				}).then(function (response) {
					response = response.data;

					if (response.valid) {
						return response.data;
					} else {
						return [];
					}
				}, function (e) {
					WBHelper.showToast('Unknown error occurred, ' + e.status + ' ' + e.statusText);

					return [];
				}).finally(function () {
					$ionicLoading.hide();
				});
			},
			get: function (id) {

			}
		};
	});
