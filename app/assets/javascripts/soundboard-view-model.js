(function () {
    var SoundBoard = window.SoundBoard || {};
    SoundBoard = _.extend(SoundBoard, {
        SoundBoardViewModel: SoundBoardViewModel
    });
    window.SoundBoard = SoundBoard;

    /* --- Application View Model Class --- */
    function SoundBoardViewModel(dataFetcher, clipsLoaded) {
        var self = this;

        this.clips  = ko.observableArray();
        this.imageFiles = ko.observableArray();
        this.currentClip = ko.observable();
        this.selectedClipSource = ko.observable();

        // Init Model
        dataFetcher(function (data) {
            self.mapData(data);
            if (_.isFunction(clipsLoaded)) clipsLoaded();
        });
    }

    _.extend(SoundBoardViewModel.prototype, {
        mapData: function (data) {
            var self = this;
            $.map(data.clips, function(i, n){
                self.clips.push(new Clip(i));
            });

            $.map(data.images, function(img){
                self.imageFiles.push(img);
            });
        },
        // Play Clip Clicked
        playClip: _.bind(function (model, event) {
            if (jPhong.deviceInfo.supportsAudioContext()) {
                // Use WebAudio API for playback
                if (!model.isPlaying()) {
                    // play
                    this.playClipWithWebAudio(model);
                    model.isPlaying(true);
                } else {
                    // pause
                    if (model.clipNode !== null) {
                        model.clipNode.stop(0);
                        model.clipNode.disconnect();
                        model.clipNode = 0;
                        model.isPlaying(false);
                    }
                }
            }  else {
                // Fall back to using the audio tags (Works for Android)
                var clip = $('audio', $(event.target).parents('div').get(0)).get(0);

                if (clip.paused) {
                    clip.currentTime = 0;

                    model.isPlaying(true);
                    clip.play();
                } else {
                    model.isPlaying(false);
                    clip.pause();
                }
            }
        }, SoundBoardViewModel.prototype),
        playClipWithWebAudio: function (clipModel) {
            clipModel.clipNode = SoundBoard.play(clipModel.buffer);
            clipModel.clipNode.onended = function(e) {
              clipModel.isPlaying(false);
            };
            //var src = clipModel.clipSources[0].source;
            //loadFile(src);
        },
        // Clip Playback Ended
        clipEnded: function (model, event) {
            model.isPlaying(false);
        },
        loading: function(model, event) {
            //model.isLoading(true);
        },
        canPlay: function (model, event) {
            model.isLoading(false);
        },
        setCurrentClip: function (id, callback) {
            var clip = _.find(this.clips(), function (c) {
                return c.id === id;
            });

            if (clip) this.currentClip(clip);
        }
    });

    function Clip (data) {
        var self = this;

        this.id = data.id;
        this.clipSources = data.sound_board_clip_sources;
        this.clipInfo = data.info;
        this.playingImage = data.playing_image;

        this.defaultImage = new SoundBoard.ImageFileModel(data.image_default);
        this.imagePlaying = new SoundBoard.ImageFileModel(data.image_playing);

        this.buffer = null;
        this.clipNode = null;
        this.isPlaying = ko.observable(false);
        this.isLoading = ko.observable(true);

        if (jPhong.deviceInfo.supportsAudioContext()){
            var i = 0,
            tryLoad = function(url) {
                // Start loading clip
                SoundBoard.loadFile(url, function(buffer){
                    self.buffer = buffer;
                    self.isLoading(false);
                }, function(error){
                    // there was an error decoding the audio, try an alternate audio source
                    if (i < self.clipSources.length) {
                        tryLoad(self.clipSources[i++].url);
                    } else {
                        toastr.error(error.message); // no suitable audio source could be decoded
                    }
                });
            };

            tryLoad(this.clipSources[i++].url);
        }
    }

    _.extend(Clip.prototype, {
        toObjectModel: function () {
            return {
                id: this.id,
                info: this.clipInfo,
                image_default_id: this.defaultImage.id,
                image_playing_id: this.imagePlaying.id,
                // todo:: Remove below line
                playing_image: this.playingImage
            };
        }
    });
})();