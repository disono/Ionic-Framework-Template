var WBConfig = (function() {
	return {
		dev: true,

		api_key_google: '',

		urlApp: function() {
			return (WBConfig.dev) ? '' : '';
		}
	};
}());