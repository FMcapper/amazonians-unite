
// Configure the settings for the player here:
var song = {
  "show": "KQED's California Report",
  "title": "Amazon’s Warehouse Workers Worry About Infection",
  "date": "Apr. 2, 2020",
  "url": "https://fmcapper.github.io/amazonians-unite/assets/warehouse_workers.mp3",
  "description": "Amazon warehouse employees who package everything from pasta to toilet paper say the e-commerce giant isn’t doing enough to protect them from COVID-19. Workers at a warehouse in Riverside County are staying home and have signed a petition demanding their health be taken seriously.",
  "duration": "3:14", 
  "cover_art_url": "assets/cal_report.png"
}

Amplitude.init(
{
  "bindings": {
    32: 'play_pause'
  },
  "songs": [song],
  "callbacks": {
    "before_play": function(){
      $(".amplitude-play-pause").removeClass("superready");
      // If the src has not been set, do so (prevents preloading)
      if (!$(Amplitude.audio()).attr("src")){
        // Swap in the URL
        $(Amplitude.audio()).attr("src", episodeURL); 
        // This insanity allows it to work just fine on weird devices
        if (iOS || safariCheck){
          setTimeout(function(){
            $(".amplitude-play-pause").addClass("loading");
            setTimeout(function(){
              $(".amplitude-play-pause").removeClass("loading");
              if (!$(Amplitude.audio()).attr("src")){
                $(".amplitude-play-pause").addClass("superready");
              } 
            }, 1000);
          }, 10);
          
        }
      }
    },
    "after_stop": function(){
      // Once the player is finished, simulate a click to next track
      // But only if the span has text (which means it's a valid link)
      // Fire GA event if possible
      if (typeof ens_specialEvent != "undefined"){
        ens_specialEvent("Podcasts", "Podcast Autoplay After Finish", showTitle+": "+episodeTitle);
      }

      if ($('#next-title').text()){
        $('#next-title').click();
      }
    }
  }
}
);

Amplitude.audio().id = "amp-element";
// Store the Amplitude object so it can be accessed
$('.amplitude-play-pause').data("amp-object", Amplitude.audio());

// Remove placehold classes 
$(".placehold-image").removeClass("placehold-image");
$(".placehold-line").removeClass("placehold-line");
      
// Handles a click on the song played progress bar.
document.getElementById('song-played-progress').addEventListener('click', function( e ){
  // Start play so that song loads
  Amplitude.play();
  var offset = this.getBoundingClientRect();
  var x = e.pageX - offset.left;
  var finalPercent = ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100;
  // Check if there's a number value for play percent
  if (isNaN(Amplitude.getSongPlayedPercentage())){
    // Keep looping until song is playing, then set position and clear
    var skipInterval = setInterval(function(){
      if (!isNaN(Amplitude.getSongPlayedPercentage())){
        // If the played status has a value, execute the skip
        Amplitude.setSongPlayedPercentage(finalPercent);
        // Clear the repeat
        clearInterval(skipInterval);
        // Make sure the play button changes to pause button
        $('.amplitude-play-pause').removeClass('amplitude-paused').addClass('amplitude-playing');
      }
    }, 200);
  } else {
    // Skip the delay and just set it
    Amplitude.setSongPlayedPercentage(finalPercent);
    // Make sure the play button changes to pause button
    $('.amplitude-play-pause').removeClass('amplitude-paused').addClass('amplitude-playing');
  }
});

// Prevent spacebar since it's being used as play/pause
window.onkeydown = function(e) {
  return !(e.keyCode == 32);
};
