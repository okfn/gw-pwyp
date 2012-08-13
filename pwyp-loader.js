

$(function() {
  var timeout = 5000;
  var elements = $('.scene');
  var waitForMe = elements.length;
  var spinnerOptions = {
    lines: 13, // The number of lines to draw
    length: 7, // The length of each line
    width: 4, // The line thickness
    radius: 10, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    color: '#fff', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
  };
  var target = document.getElementById('loading');
  var spinner = new Spinner(spinnerOptions).spin(target);

  function doneAll() {
    spinner.stop();
    $('#loading').remove();
    $('#main').show();
  }

  $.each(elements, function(i, div) {
    div = $(div);
    // Extract URL
    var bg = div.attr('data-background');
    // Load it asynchronously
    $('<img/>').attr('src', bg).load(function() {
      div.css({'background-image':'url("'+bg+'")'});
      var percent = Math.round((((elements.length - waitForMe) + 1) * 100) / elements.length);
      $('#loading-text').html('Loading... '+percent+'%');
      // When all are loaded...
      if ( --waitForMe==0 ) { 
        doneAll();
      }
    });
  });
  //window.setTimeout( doneAll, timeout );
});
