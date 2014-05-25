(function () {
    // Exports
    Utils.exportAttr('SoundBoard', {
        ImageFileModel: ImageFileModel
    });

    function ImageFileModel (data) {
        this.id = data.id;
        this.url = data.url;
        this.path = data.path;
        this.title = data.title;
    }
})();
