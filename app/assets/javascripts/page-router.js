(function () {
	var pages = ['soundboard-main', 'clip-edit', 'upload-page'];

    var appRouter = $.sammy('#route-container', function(){

       this.get('#/', function (context){
            showPage('soundboard-main');
       });

		this.get('#/clip/:id', function () {
			var clipID = this.params['id'];

			$(function () {
				if (clipID){
					SoundBoard.viewModel.setCurrentClip(parseInt(clipID));
					var clip = new window.SoundBoard.Clip(SoundBoard.viewModel.currentClip());
					$('#soundboard-main').hide();
					showPage('clip-edit');
				}
			});
		});

		this.get('#/uploads', function () {
			showPage('upload-page');
		});
    });

    appRouter.run('#/');

    function showPage(pageName) {
    	_.each(pages, function(p) {
    		if (pageName !== p) return $('#' + p).hide();
    		$('#' + p).show();
    	});
    }
})();
