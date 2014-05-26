(function () {
    var SoundBoard = window.SoundBoard || {};
    SoundBoard = _.extend(SoundBoard, {
        SoundBoardViewModel: SoundBoardViewModel
    });
    window.SoundBoard = SoundBoard;

    /* --- Application View Model Class --- */
    function SoundBoardViewModel(soundBoardApp, clipDataFetcher, clipImageFetcher, soundDataFetcher) {
        var self = this;

        this.clips  = ko.observableArray();
        this.imageFiles = ko.observableArray();
        this.soundFiles = ko.observableArray();

        this.currentClip = ko.observable();
        this.selectedClipSource = ko.observable();
        this.clipDataFetcher = _.bind(clipDataFetcher, soundBoardApp);
        this.soundDataFetcher = _.bind(soundDataFetcher, soundBoardApp);
        this.clipImageFetcher = _.bind(clipImageFetcher, soundBoardApp);
    }

    _.extend(SoundBoardViewModel.prototype, {
        loadData: function (complete) {
            var self = this;
            // clear data
            self.clips([]);
            self.imageFiles([]);
            self.soundFiles([]);

            this.clipDataFetcher(function (data) {
                self.mapData(data);
                if (_.isFunction(complete)) complete();
            });
        },
        loadImageFiles: function (complete) {
            var self = this;

            this.imageFiles([]); // clear
            // reload
            this.clipImageFetcher(function (images) {
                $.map(images, function(img) {
                    self.imageFiles.push(img);
                });

                if (_.isFunction(complete)) complete();
            });
        },
        loadSoundFiles: function (complete) {
            var self = this;

            this.soundFiles([]);
            this.soundDataFetcher(function (sounds) {
                $.map(sounds, function (snd) {
                    self.soundFiles.push(snd);
                });

                if (_.isFunction(complete)) complete();
            });
        },
        mapData: function (data) {
            var self = this;
            $.map(data.clips, function(i, n){
                self.clips.push(new SoundBoard.ClipModel(i));
            });

            $.map(data.images, function(img){
                self.imageFiles.push(img);
            });

            $.map(data.sounds, function (snd) {
                self.soundFiles.push(snd);
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
            var _clip = _.find(this.clips(), function (c) {
                return c.id === id;
            });
            if (_clip) {
                var _imgDef = _.clone(_clip.defaultImage());
                var _imgPlay = _.clone(_clip.imagePlaying());
                this.currentClip(_clip);
                this.currentClip().defaultImage(_imgDef.id);
                this.currentClip().imagePlaying(_imgPlay.id);
            }
        },
        getSoundFileFromID: function (id) {
            var _file = _.find(this.soundFiles(), function (f) {
                return f.id === id;
            });

            return _file;
        }
    });
})();