/**
 * Created by etayschur on 7/11/14.
 */

var MediaManager = function () {

    var path  = "/Users/etayschur/Sites/GIT_SPACE/myApp/www/audio/tearDrop.mp3";
    this._duration = 0;
    this._audioFile = new Media( path );



};



MediaManager.prototype.play = function (){
 this._audioFile.play();
};



MediaManager.prototype.stop = function () {
    this._audioFile.stop();
    this._audioFile.release();
}

MediaManager.prototype.pause = function () {
    this._audioFile.pause();
}

MediaManager.prototype.getSongDuration = function () {


    var counter = 0;
    var timerDur = setInterval(function() {

        counter = counter + 100;
        console.log(counter);
        if (counter > 2000) {
            clearInterval(timerDur);
        }
        var dur = this._audioFile.getDuration();
        if (dur > 0) {
            clearInterval(timerDur);
            return (dur) + " sec";
        }
    }, 100);


};

MediaManager.prototype.getCurrentPosition = function () {
    return this._audioFile.getCurrentPosition();
};

MediaManager.prototype.setVolume = function (volume) {
    this._audioFile.setVolume(volume * 0.01);
};

MediaManager.prototype.onSuccess = function (result){

    console.log("playAudio():Audio Success");

};

MediaManager.prototype.seekToPosition = function (position){
    this._audioFile.seekTo(position);
};


MediaManager.prototype.seekAudioFileTo = function  ( position) {
    console.log("MOVE TO ",Math.ceil(this._audioFile.getDuration * (100 / position+1)));
    this._audioFile.seekTo( Math.ceil(this._audioFile.getDuration * (100 / position+1) ));
};

MediaManager.prototype.onError = function (error){
    console.log("Error Open Media File ", error);

};


