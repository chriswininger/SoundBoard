(function () {
	window.ImageUploadPage = ImageUploadPage;

	function ImageUploadPage () {

	}

	_.extend(ImageUploadPage.prototype, {
		loadPage: function () {
			$(function() {
				$('#frmImageUpload').bind('ajax:complete', function(xhr, data, status) {
	  				if (data.statusText === 'Created') return toastr.info('File Saved');
	  				toastr.error(data.statusText);
				});
			});
		}
	});


})();