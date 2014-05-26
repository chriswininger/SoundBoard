(function () {
	var self;

	// Exports
    var SoundBoard = window.SoundBoard || {};
    SoundBoard = _.extend(SoundBoard, {
        ClipEditPage: ClipEditPage
    });
    window.SoundBoard = SoundBoard;

	// Takes the knockout clip model to which the page is bound
	function ClipEditPage (clip, soundBoardApp) {
		this.clip = clip;
		this.soundBoardApp = soundBoardApp;
		self = this;
		$(function () {
			self.pageLoad();
		});
	}

	_.extend(ClipEditPage.prototype, {
		pageLoad: function() {
			$(function() {
				$('#fileClipUpload').on('change', function (e){
					self.files = e.target.files;
				});

				$('#btnSaveClip').click(function () {
					self.saveClip();
					return false;
				});

				$('#frmClipSourceUpload').bind('ajax:complete', function(xhr, data, status) {
					if (data.statusText === 'Created') return self.soundSaved();
					toastr.error('error uploading sound file');
				});

			});
		},
		saveClip: function () {
			var data = new FormData();
			if (self.files && self.files.length > 0) {
				data.append('clipFileUpload', self.files[0]);
			}

			$.ajax({
				url: '/clips/' + self.clip.id,
				type: 'PUT',
				data: { clip: self.clip.toObjectModel() },
				cache: false,
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					toastr.info('Changes Saved');
				},
				error: function (jqXHR, textStatus, errorThrown)
				{
					toastr.error('Error saving changed ' + textStatus);
				}
			});

		},
		soundSaved: function () {
			toastr.info('File Saved');
			//self.soundBoardApp.viewModel.currentClip().id
			//TODO selectively reload just this clip
			self.soundBoardApp.viewModel.loadData();


			//TODO WE NO LONGER NEED A GLOBAL SOUNDFILE LIST
			this.soundBoardApp.viewModel.loadSoundFiles();
		}
	});

})();