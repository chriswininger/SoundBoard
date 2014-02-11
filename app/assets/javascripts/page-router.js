(function () {

    var appRouter = $.sammy('#route-container', function(){

       this.get('#/', function(context){
            $('#soundboard-main').show();
            $('#clip-edit').hide();
       });

		this.get('#/clip/:id', function() {
			var clipID = this.params['id'];

			$(function () {
				if (clipID){
					SoundBoard.viewModel.setCurrentClip(parseInt(clipID));
					var clip = new window.SoundBoard.Clip(SoundBoard.viewModel.currentClip());
					$('#soundboard-main').hide();
					$('#clip-edit').show();
				}
			});


		});

    });

    appRouter.run('#/');

})();
