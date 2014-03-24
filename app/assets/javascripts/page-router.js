(function () {
	var pages = ['soundboard-main', 'clip-edit', 'upload-page'];

	// Initialze the soundboard and it's clips
	var soundBoardApp = new SoundBoard.SoundBoardApp();
	var imageUploadPage = new ImageUploadPage(soundBoardApp.viewModel);

	var appRouter = $.sammy('#route-container', function(){
		// Setup routes within the soundboard page

		var mainPage = function (context) {
			showPage('soundboard-main');
			soundBoardApp.loadPage();
		};

		// home
		this.get('#/', mainPage);
		this.get('#/home/', mainPage);

		// edit
		this.get('#/clip/:id', function () {
			var clipID = this.params['id'];

			if (clipID) {
				soundBoardApp.viewModel.setCurrentClip(parseInt(clipID, 10));
				var clip = new SoundBoard.ClipEditPage(soundBoardApp.viewModel.currentClip());
				showPage('clip-edit');
			}
		});

		// upload image
		this.get('#/uploads', function () {
			showPage('upload-page');
		});
	});

	appRouter.run('#/');
	
	// show and hide pages
    function showPage(pageName) {
		_.each(pages, function(p) {
		if (pageName !== p) return $('#' + p).hide();
			$('#' + p).show();
		});
    }
})();
