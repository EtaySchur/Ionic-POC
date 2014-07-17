angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope , $timeout , $rootScope) {
    document.addEventListener("deviceready", function() {
        navigator.splashscreen.hide();
    }, false);


        $scope.data = { 'volume' : '100',
                        'position' : '0'};

        $scope.playAudioFile = function(){
               // $scope.media = new MediaManager();
               // $scope.media.getSongDuration();
               // $scope.media.setVolume($scope.data.volume);
                //console.log("DURATION ",$scope.media.getSongDuration());
                //console.log("MEDIA" ,$scope.media);
                //$scope.media.play();
                var path  = "audio/tearDrop.mp3";
                $rootScope.my_media = new Media("/android_asset/www/"+path);
                $rootScope.my_media.play();
                function getDorationTimer(){
                    $timeout(function() {
                        if($rootScope.my_media.getDuration() == -1){
                            getDorationTimer();
                            console.log("fire");
                        }else{
                           var time = ($rootScope.my_media.getDuration());
                            $rootScope.duration.minutes = Math.floor(time / 60);
                            $rootScope.duration.seconds = time - $rootScope.duration.minutes * 60;

                            function getCurrentTime(){
                                $rootScope.my_media.getCurrentPosition(
                                    // success callback
                                    function (position) {
                                        if (position > -1) {
                                            $rootScope.position = position;
                                            console.log((position) + " sec");
                                        }
                                    },
                                    // error callback
                                    function (e) {
                                        getCurrentTime();
                                        console.log("Error getting pos=" + e);
                                    }
                                );
                            };
                            getCurrentTime();
                            return
                        }
                    },1);
                }
                getDorationTimer();
            };

        $scope.getCurrentPosition = function () {
           if($rootScope.my_media){
               return $rootScope.my_media.getCurrentPosition();
           }
        };


        $scope.stopAudioFile = function () {
            alert("STOP");
            if($scope.media){
                $scope.media.stop();
                $scope.media.release();
            }
        };


        $scope.pauseAudioFile = function () {
            alert("PAUSE");
            console.log("THIS IS THE MEDIA ",$scope.media);
            if($scope.media){
                $scope.media.pause();
            }
        };

        $scope.setVolume = function (volume){
            console.log($scope.currentVolume);
            console.log(volume);
        };

        $scope.getCurrentAudioTime = function () {
          return $scope.media.getCurrentPosition;
        };

        $scope.seekForward = function (){
            if($scope.media){
                $scope.media.seekToPosition(30000);
            }
        };

        $scope.getAudioFilePosition = function (){
            if($scope.media){
                return $scope.media.getCurrentPosition();
            }

        }

        $scope.$watch("data.volume" , function (){
            if($scope.media){
                $scope.media.setVolume($scope.data.volume);
            }

        });

        $scope.$watch("data.position" , function (){
            console.log("POSITION ",$scope.data.position);
            if($scope.media){
                $scope.media.seekAudioFileTo($scope.data.position);
            }

        });





    })

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
