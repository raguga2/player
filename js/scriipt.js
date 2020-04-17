(function () {
  'use strict';

  var supportsVideo = !!document.createElement('video').canPlayType;

  if (supportsVideo) {
  	var videoContainer = document.getElementById('videoContainer');
   	var video = document.getElementById('video');
   	var videoControls = document.getElementById('video-controls');

   	video.controls = false;

   	videoControls.style.display = 'block';

   	var playpause = document.getElementById('playpause');
   	var stop = document.getElementById('stop');
   	var mute = document.getElementById('mute');
   	var volinc = document.getElementById('volinc');
   	var voldec = document.getElementById('voldec');
   	var progress = document.getElementById('progress');
    var progressBar = document.getElementById('progress-bar');
   	var fullscreen = document.getElementById('fs');

    var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
   
    if (!fullScreenEnabled) {
      fullscreen.style.display = 'none';
    }

   
   	var alterVolume = function(dir) {
   		var currentVolume = Math.floor(video.volume * 10) / 10;
   		if (dir === '+') {
   			if (currentVolume < 1) video.volume += 0.1;
   		}
   		else if (dir === '-') {
  			if (currentVolume > 0) video.volume -= 0.1;
   		}
   	}


  	var setFullscreenData = function(state) {
  		videoContainer.setAttribute('data-fullscreen', !!state);
  	}


   	var isFullScreen = function() {
   		return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
   	}


   	var handleFullscreen = function() {
   			
    		if (isFullScreen()) {
    			if (document.exitFullscreen) document.exitFullscreen();
    			else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
    			else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
    			else if (document.msExitFullscreen) document.msExitFullscreen();
    			setFullscreenData(false);
    		}
    		else {
          if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
    		  else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
    		  else if (videoContainer.webkitRequestFullScreen) {
    				video.webkitRequestFullScreen();
    			}
    			else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
    			setFullscreenData(true);
    		}
    }
   	if (document.addEventListener) {
   	
   		video.addEventListener('loadedmetadata', function() {
   			progress.setAttribute('max', video.duration);
   		});

   	
   		playpause.addEventListener('click', function(e) {
   			if (video.paused || video.ended) video.play();
   			else video.pause();
   		});

   		
   		stop.addEventListener('click', function(e) {
   			video.pause();
   			video.currentTime = 0;
   			progress.value = 0;
   		});
   		mute.addEventListener('click', function(e) {
   			video.muted = !video.muted;
   		});
   		volinc.addEventListener('click', function(e) {
   			alterVolume('+');
   		});
   		voldec.addEventListener('click', function(e) {
   			alterVolume('-');
   		});
   		fs.addEventListener('click', function(e) {
   			handleFullscreen();
   		});

   	
   		video.addEventListener('timeupdate', function() {
        
        if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
        progress.value = video.currentTime;
        progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
   		});

        
      progress.addEventListener('click', function(e) {
        var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth;
        video.currentTime = pos * video.duration;
      });

   
        
   		document.addEventListener('fullscreenchange', function(e) {
   			setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
   		});
   		document.addEventListener('webkitfullscreenchange', function() {
   			setFullscreenData(!!document.webkitIsFullScreen);
   		});
   		document.addEventListener('mozfullscreenchange', function() {
   			setFullscreenData(!!document.mozFullScreen);
   		});
   		document.addEventListener('msfullscreenchange', function() {
   			setFullscreenData(!!document.msFullscreenElement);
   		});
   	}
  }

})();