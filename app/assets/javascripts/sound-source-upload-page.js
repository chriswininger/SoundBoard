(function () {
	window.SoundSourceUploadPage = SoundSourceUploadPage;

	function SoundSourceUploadPage (soundBoardViewModel) {
		this.soundBoardViewModel = soundBoardViewModel;
		var self = this;

		$(function() {
				$('#frmClipSourceUpload').bind('ajax:complete', function(xhr, data, status) {
					if (data.statusText === 'Created') return self.soundSaved();
					toastr.error('error uploading sound file');
				});
			});
	}

	_.extend(SoundSourceUploadPage.prototype, {
		loadPage: function () {},
		soundSaved: function () {
			toastr.info('File Saved');
			this.soundBoardViewModel.loadSoundFiles();
		}
	});


})();