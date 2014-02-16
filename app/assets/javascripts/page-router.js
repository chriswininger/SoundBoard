(function () {
	var pages = ['soundboard-main', 'clip-edit', 'upload-page'],
		imageUploadPage = new ImageUploadPage();
	
	// Initialze the soundboard and it's clips	
	var soundBoardPage = new SoundBoard.SoundBoardPage(function () {
		var appRouter = $.sammy('#route-container', function(){
		   // Setup routes within the soundboard page

			// home
			this.get('#/', function (context){
	            showPage('soundboard-main');
	       	});

			// edit
			this.get('#/clip/:id', function () {
				var clipID = this.params['id'];

				$(function () {
					if (clipID){
						soundBoardPage.viewModel.setCurrentClip(parseInt(clipID));
						var clip = new window.SoundBoard.Clip(soundBoardPage.viewModel.currentClip());
						showPage('clip-edit');
					}
				});
			});

			// upload image
			this.get('#/uploads', function () {
				imageUploadPage.loadPage();
				showPage('upload-page');
			});
	    });

	    appRouter.run('#/');	
	});

  	// show and hide pages
    function showPage(pageName) {
    	_.each(pages, function(p) {
    		if (pageName !== p) return $('#' + p).hide();
    		$('#' + p).show();
    	});
    }
})();
