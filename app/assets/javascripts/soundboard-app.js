(function(){
    var ctx,
        buf,
        mainVol;

    // Exports
    var SoundBoard = window.SoundBoard || {};
    SoundBoard = _.extend(SoundBoard, {
        activateAudioForIOS: activateAudioForIOS,
        loadFile: loadFile,
        play: play,
        SoundBoardApp: SoundBoardApp
    });
    window.SoundBoard = SoundBoard;

    //TODO::Rename SoundBoardPage to SoundBoardApp
    function SoundBoardApp (loaded) {
        var self = this;


        $(function(){
            ko.applyBindings(self.viewModel);

            if (jPhong.deviceInfo.isIOS()) {
                $('#iphoneKludge').show();
            }

            if (jPhong.deviceInfo.supportsAudioContext()){
                initAudio();
            } else {
                toastr.info('WebAudio API Is Not Available -- Using Fallback');
            }
        });

        /* --- Custom binding handlers --- */
        ko.bindingHandlers.playbackImage = {
            update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                //console.log('updated');
                var valueUnwrapped = ko.utils.unwrapObservable(valueAccessor());

                if (valueUnwrapped) {
                    $(element).attr('src', viewModel.imagePlaying.url);
                } else {
                    $(element).attr('src', viewModel.defaultImage.url);
                }
            }
        };

        ko.bindingHandlers.loadingSpinner = {
            update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                console.log('updated');
                var valueUnwrapped = ko.utils.unwrapObservable(valueAccessor());

                if (valueUnwrapped) {
                    $(element).show();
                } else {
                    $(element).hide();
                }
            }
        };

        this.viewModel = new SoundBoard.SoundBoardViewModel(this.getAssets, function () {
            if (_.isFunction(loaded)) loaded();
        });
    }

    _.extend(SoundBoardApp.prototype, {
        loadPage: function () {},
        getAssets: _.bind(function (complete) {
            var data = {}, self = this;
            self.getClips(function (clips) {
                data.clips = clips;
                self.getImageFiles(function (images){
                    data.images = images;
                    complete(data);
                });
            });
        }, SoundBoardApp.prototype),
        getClips: function (complete){
             $.getJSON('/clips', function(clips) {
                complete(clips);
             });
        },
        getImageFiles: function (complete) {
            $.getJSON('/images', function (images) {
                complete(images);
            });
        }
    });

    /* --- Web Audio API Methods --- */
    function createAudioContext(){
        if (typeof window.AudioContext !== 'undefined'){
            return new AudioContext();
        }

        if (typeof  window.webkitAudioContext !== 'undefined'){
            return new webkitAudioContext();
        }
    }

    function initAudio() {
        try {
            normailizeWebAPI();
            ctx = createAudioContext();
            mainVol = ctx.createGain();
            mainVol.gain.value = 0.95;
            mainVol.connect(ctx.destination);
        } catch (e) {
            console.log('you need webAudio support');
            toastr.error('You need WebAudio support');
        }
    }

    function normailizeWebAPI() {
        this.AudioContext = this.AudioContext || this.webkitAudioContext;
        this.AudioContext.createGain = this.AudioContext.createGain || this.AudioContext.createGainNode;

        if (typeof this.AudioBufferSourceNode !== 'undefined') {
            this.AudioBufferSourceNode.prototype.start = this.AudioBufferSourceNode.prototype.start || this.AudioBufferSourceNode.prototype.noteOn;
        }
    }

    // !!! Note: change this to accept a callback, run this when the model is binding and in the callback assign the buffer to a member of the model
    function loadFile(url, callback, errorCallBack) {

        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.responseType = 'arraybuffer';
        req.onload = function() {

                ctx.decodeAudioData(req.response, function(buffer){
                    callback(buffer);
                }, function(e){
                    if (typeof errorCallBack !== 'undefined'){
                        if (typeof e === 'undefined'){
                          e = {'message': 'Error decoding the data.'};
                        }

                        errorCallBack(e);
                    }
                });
        };


        req.send();
    }

    function play(buffer){
        var src = ctx.createBufferSource();
        src.buffer = buffer;
        src.playbackRate = 1.0;
        src.connect(mainVol);
        src.start(0);

        return src;
    }

    /* IPhone Sound Activate -- Must be publicly exposed so the UI can call this directly or IO won't allow it */
    function activateAudioForIOS () {
        // create empty buffer
        var buffer = ctx.createBuffer(1, 1, 22050);
        var source = ctx.createBufferSource();
        source.buffer = buffer;

        // connect to output (your speakers)
        source.connect(ctx.destination);

        // play the file
        source.start(0);

        $('#iphoneKludge').hide();
        toastr.info('Sound Activated');
    }
})();