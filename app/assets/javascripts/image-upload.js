(function () {
	window.ImageUploadPage = ImageUploadPage;

	function ImageUploadPage (soundBoardViewModel) {
		this.soundBoardViewModel = soundBoardViewModel;
		var self = this;

		$(function() {
				$('#frmImageUpload').bind('ajax:complete', function(xhr, data, status) {
					if (data.statusText === 'Created') return self.imageSaved();
					toastr.error(data.statusText);
				});
			});
	}

	_.extend(ImageUploadPage.prototype, {
		loadPage: function () {},
		imageSaved: function () {
			toastr.info('File Saved');
			this.soundBoardViewModel.loadImageFiles();
		}
	});


})();