(function () {
	window.Utils = window.Utils || {};
	window.Utils.exportAttr = exportAttr;

	function exportAttr (namespace, obj) {
		if (!obj) {
			obj = namespace;
			_.extend(window, obj);
		} else {
			window[namespace] = window[namespace] || {};
			window[namespace] = _.extend(window[namespace], obj);
		}
	}
})();
