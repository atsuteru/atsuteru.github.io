$(window).on("orientationchange", function() {
    $('iframe.scratch').attr('src', function(i, val) { return val; });
});

$(function(){
    setupFullscreenCommand();
    setupShowSourceCommand();
});

function setupFullscreenCommand()
{
    $('button.requestFullscreen').hide();
    if (!$("iframe").get()[0].requestFullscreen)
    {
        return;
    }
    $("iframe").on("load", function() {
        var $button = $(this).parent().find('button.requestFullscreen');
        $button.show();
    });

    $('button.requestFullscreen').click(function() {
        var scratchFrame = $(this).parent().find('iframe').get()[0];
        scratchFrame.requestFullscreen();
    });
    $(window).on("fullscreenchange", function() {
        $('iframe.scratch').attr('src', function(i, val) { return val; });
    });
}

function setupShowSourceCommand()
{
    $('button.showSource').hide();
    $("iframe").on("load", function() {
        var $button = $(this).parent().find('button.showSource');
        $button.show();
    });
    
    $('button.showSource').click(function() {
        var $scratchFrame = $(this).parent().find('iframe');
        var sourceUrl = $scratchFrame.attr('src').replace('embed', 'editor');
        window.open(sourceUrl, '_blank');
    });
}