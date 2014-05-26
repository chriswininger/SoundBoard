(function () {
    // Exports
    Utils.exportAttr('SoundBoard', {
        ClipModel: Clip
    });

    function Clip (data) {
        var self = this;

        this.id = data.id;
        this.clipSources = ko.observableArray(data.sound_board_clip_sources);
        this.clipInfo = data.info;

        this.defaultImage = ko.observable(new SoundBoard.ImageFileModel(data.image_default));
        this.imagePlaying = ko.observable(new SoundBoard.ImageFileModel(data.image_playing));
        this.selectedSoundSource = null;
        this.selectedSoundSources = [];

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

            tryLoad(this.clipSources()[i++].url);
        }
    }

    _.extend(Clip.prototype, {
        toObjectModel: function () {
            return {
                id: this.id,
                info: this.clipInfo,
                image_default_id: this.defaultImage(),
                image_playing_id: this.imagePlaying(),
                clip_sources: this.clipSources()
            };
        },
        addSource: function (src) {
            this.clipSources.push(src);
        }
    });
})();
