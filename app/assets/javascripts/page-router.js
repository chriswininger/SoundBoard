(function () {
	var pages = [
		'soundboard-main',
		'clip-edit',
		'upload-page',
		'upload-clip-page'
	];

	// Initialze the soundboard and it's clips
	var soundBoardApp = new SoundBoard.SoundBoardApp();
	var imageUploadPage = new ImageUploadPage(soundBoardApp.viewModel);
	var soundSourceUploadPage = new SoundSourceUploadPage(soundBoardApp.viewModel);

	var appRouter = $.sammy('#route-container', function(){
		// Setup routes within the soundboard page

		var mainPage = function (context) {
			showPage('soundboard-main');
		};

		// home
		this.get('#/', mainPage);
		this.get('#/home/', mainPage);

		// edit
		this.get('#/clip/:id', function () {
			var self = this;
			if (!soundBoardApp.isLoaded) soundBoardApp.loadPage(function () {
				_.bind(loadEditClip, self)(self.params['id']);
			});
		});

		// upload image
		this.get('#/uploads', function () {
			showPage('upload-page');
		});

		this.get('#/uploadClips', function (){
			showPage('upload-clip-page');
		});
	});

	appRouter.run('#/');

	function loadEditClip (id) {
		var clipID = this.params['id'];

		if (clipID) {
			soundBoardApp.viewModel.setCurrentClip(parseInt(clipID, 10));
			var clip = new SoundBoard.ClipEditPage(soundBoardApp.viewModel.currentClip());
			showPage('clip-edit');
		}
	}

	// show and hide pages
    function showPage(pageName) {
		// Make sure pre-req for all pages (app has been loaded)
		if (!soundBoardApp.isLoaded) soundBoardApp.loadPage();

		_.each(pages, function(p) {
		if (pageName !== p) return $('#' + p).hide();
			$('#' + p).show();
		});
    }
})();
