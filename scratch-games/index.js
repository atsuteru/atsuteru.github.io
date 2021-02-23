$(window).on("orientationchange", function() {
    $('iframe.scratch').attr('src', function(i, val) { return val; });
});

$(function(){
    setupFullscreenCommand();
    setupShowSourceCommand();
    setupEditGameCommand();
    setupLoadGameCommand();
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

function setupEditGameCommand()
{
    $('button.editGamefile').hide();
    $("iframe").on("load", function() {
        var $button = $(this).parent().find('button.editGamefile');
        $button.show();
    });
    
    $('button.editGamefile').click(function() {
        var $scratchFrame = $(this).parent().find('iframe');
        var sourceUrl = $scratchFrame.attr('src');
        window.open(sourceUrl, '_blank');
    });
}

function setupLoadGameCommand()
{
    $('button.loadGamefile').hide();
    $("iframe").on("load", function() {
        var $button = $(this).parent().find('button.loadGamefile');
        $button.show();
        $(this.contentWindow.document).find('span.button_outlined-button_2f510').click();
    });

    $('button.loadGamefile').click(function() {
        var scratchFrame = $(this).parent().find('iframe').get()[0];

        var fileMenu = $(scratchFrame.contentWindow.document).find('span:contains("ファイル")').parent().get()[0];
        var event = scratchFrame.contentWindow.document.createEvent("MouseEvents");
        event.initEvent("mouseover", true, true);
        fileMenu.dispatchEvent(event);
        event = scratchFrame.contentWindow.document.createEvent("MouseEvents");
        event.initEvent("mousedown", true, true);
        fileMenu.dispatchEvent(event);
        event = scratchFrame.contentWindow.document.createEvent("MouseEvents");
        event.initEvent("mouseup", true, true);
        fileMenu.dispatchEvent(event);
        $(scratchFrame.contentWindow.document).find('li.menu_menu-item_3ELPx:contains("コンピューターから読み込む")').click();
    });
}
