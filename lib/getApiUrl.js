const config = require('../config');
const sha1 = require('./sha1');
const urlencode = require('./urlencode');

module.exports = function getApiUrl (endpoint, get_params) {
	get_params = get_params || '';
	if (typeof get_params === 'object') {
		var str = "";
		for (var key in get_params) {
			if (str != "") {
				str += "&";
			}
			str += key + "=" + urlencode(get_params[key]);
		}
		get_params = str;
	}
	var checksum = sha1(endpoint+get_params+config.token);
	return config.baseUrl + '/' + endpoint + '?' + get_params + (get_params.length?'&':'') + 'checksum=' + checksum;
}
