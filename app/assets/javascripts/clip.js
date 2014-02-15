(function () {
	var self;

	// Takes the knockout clip model to which the page is bound
	var Clip = function (clip) {
		this.clip = clip;
		self = this;
		$(function () {
			self.pageLoad();
		});
	};

	_.extend(Clip.prototype, {
		pageLoad: function() {
			$(function() {
				$('#fileClipUpload').on('change', function(e){
					self.files = e.target.files;
				});

				$('#btnSaveClip').click(function() {
					self.saveClip();
					return true;
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
				data: { clip: self.clip },
				cache: false,
				dataType: 'json',
				contentType: false,
				processData: false,
				success: function(data, textStatus, jqXHR) {
					alert('we won!!!');
				},
				error: function (jqXHR, textStatus, errorThrown)
				{
					alert('boo: ' + textStatus);
				}
			});

		}
	});

	if (!window.SoundBoard) window.SoundBoard = {};
	window.SoundBoard.Clip = Clip;
})();