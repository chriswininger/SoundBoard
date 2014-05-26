(function () {
	var self;

	// Exports
    var SoundBoard = window.SoundBoard || {};
    SoundBoard = _.extend(SoundBoard, {
        ClipEditPage: ClipEditPage
    });
    window.SoundBoard = SoundBoard;

	// Takes the knockout clip model to which the page is bound
	function ClipEditPage (clip) {
		this.clip = clip;
		self = this;
		$(function () {
			self.pageLoad();
		});
	}

	_.extend(ClipEditPage.prototype, {
		pageLoad: function() {
			$(function() {
				$('#fileClipUpload').on('change', function(e){
					self.files = e.target.files;
				});

				$('#btnSaveClip').click(function() {
					self.saveClip();
					return false;
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

		}
	});

})();