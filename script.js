// Video Player
'use strict'

// select player area (div with class myplayer)
let playerArea = document.querySelector('.myplayer');

// select video (tag video and content its)
let media = playerArea.querySelector('video');

//select controls of player
let controls = playerArea.querySelector('.myplayer__controls');

// select button play 
let play = controls.querySelector('.play');

// select button rewind 
let rewind = controls.querySelector('.rewind');

// select button forward 
let forward  = controls.querySelector('.forward');

// select button fullscreen
let fullscreen = controls.querySelector('.fullscreen');

// select timer area 
let timerArea = controls.querySelector('.timer');

// select currenttime (element)
let currentTime = timerArea.querySelector('.currentTime');

// select volume icon
let volumeIcon = controls.querySelector('.volume .icon');

// select volume progress bar
let volumeProgressBar = controls.querySelector('.volume .volume__progress')

// select volume progress bar input
let volumeProgressBarInput = volumeProgressBar.querySelector('input');

// select videoTime(for show original time of video)
let videoTime = timerArea.querySelector('.videoTime')

// select progressbar of timerprogress
let timerBar = controls.querySelector('.controls__progressbar-current')

// set defaulte volume value (50%)
media.volume = .5;


//add event listener for update time event of video (for show time video in element current time)
media.addEventListener('timeupdate',()=>{
    // show minutes and seconds in element currentTime
    currentTime.textContent = getTime(media.currentTime);

    // calculate bar length of progress bar timer 
    let barLength = (media.currentTime / media.duration) * 100;

    // implement timer bar with linear gradient in background
    timerBar.style = `background : linear-gradient(90deg, rgb(26, 113, 243) ${barLength}%, #05d4db 0%)`;

    // get value of timerBar
    timerBar.value = barLength;
})

// add event listener for button play (for of play and pause video)
play.addEventListener('click',()=>{
    // show original video time
    videoTime.textContent = getTime(media.duration);

    // if video is paused 
    if(media.paused){
        // change play icon
        togglePlayIcon();
        // play video (with method play)
        media.play();

    // if video is played
    }else{
        // change pause icon
        togglePlayIcon();
        // pause video (with method pause)
        media.pause();
    }
})


// add event listener for button rewind 
rewind.addEventListener('click',()=>{
    media.currentTime = media.currentTime - 15;

})

// add event listener for button rewind 
forward.addEventListener('click',()=>{
    media.currentTime = media.currentTime + 15;
    
})

// add event listener for timebar because implement select 
timerBar.addEventListener('input', function(){
    media.currentTime = (this.value /100 ) * media.duration;
})

// add event listener click for show volume progress bar
volumeIcon.addEventListener('click',()=>{
    // show and hide volume progress bar with toggle class active
    volumeProgressBar.classList.toggle('active');
})

// add event listener for change volume of video with volume progress bar input(type range)
volumeProgressBarInput.addEventListener('input',function(){
    // calculate volume
    media.volume = this.value /100 ; 
     // implement volume bar with linear gradient in background
     this.style = `background : linear-gradient(90deg, rgba(2,0,36,1) ${this.value}%, rgba(0,212,255,1) 0%)`;
})

// add event listener for click on fullscreen(for fullscreen video element)
fullscreen.addEventListener('click', function(){
    // if not fullscreen element below code run
    if(!document.fullscreenElement){
        // request for fullscreen video element (if other elements are not fullscreen)
        if(playerArea.requestFullscreen){
            playerArea.requestFullscreen();
        // implement above code for browser mozila
        }else if(playerArea.mozFullscreenElement){
            playerArea.mozFullscreenElement();
        // implement above code for browser mozila
        }else if(playerArea.webkitFullscreenElement){
            playerArea.webkitFullscreenElement();
        // implement above code for browser mozila
        }else if(playerArea.msFullscreenElement){
            playerArea.msFullscreenElement();
        }
    }else{
        // exit video element from fullscreen
        if(document.exitFullscreen){
            document.exitFullscreen();
        // exit video element from fullscreen (for browser mozila)
        }else if(document.mozCancelFullscreen){
            document.mozCancelFullscreen();
        }
        // exit video element from fullscreen (for browser microsoft edge)
        else if(document.msCancelFullscreen){
            document.msCancelFullscreen();
        }
        // exit video element from fullscreen (for browser chrome)
        else if(document.webkitCancelFullscreen){
            document.webkitCancelFullscreen();
        }
    }
})


// this function is for toggle play icon(change icon once play or pause video)
function togglePlayIcon(){
    // select icon 
    let icon = play.querySelector('i');

    // change icon to pause icon
    icon.classList.toggle('ion-md-pause');

    // change icon to play icon
    icon.classList.toggle('ion-md-play');
}

// for getTime by minutes and seconds ( with format minutes:seconds)
function getTime(time){
    // calculate minutes time of video (for time spent of video)(and floor time)
    let minutes = Math.floor(time / 60); 
    // calculate seconds time of video and decrase minutes of this value (for time spent of video)(and floor time)
    let seconds = Math.floor(time - (minutes *60));
    // define minutesValue for show minutes with a zero before
    let minutesValue;
    // define secondsValue for show seconds with a zero before
    let secondsValue;
    // if minutes lesser than 10 add a zero to before its
    if(minutes<10){
        minutesValue = '0' + minutes;
    }else{
        minutesValue = minutes;
    }

    // if seconds lesser than 10 add a zero to before its
    if(seconds<10){
        secondsValue = '0' + seconds;
    }else{
        secondsValue = seconds;
    }
    


    // return minutes and seconds 
    return minutesValue + ':' + secondsValue;   
}