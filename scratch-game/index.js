$(window).on("orientationchange", function() {
    $('iframe.scratch').attr('src', function(i, val) { return val; });
});

$(function(){
    setupFullscreenCommand();
    setupLoadGameCommand();
});

const EDITOR_PLAYER_SWITCH_SELECTOR = 'span.button_outlined-button_2f510';

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
        $('iframe.scratch.embed').attr('src', function(i, val) { return val; });
    });
}

function setupLoadGameCommand()
{
    $('button.loadGamefile').hide();
    $("iframe.scratch.extend").on("load", function() {
        var $button = $(this).parent().find('button.loadGamefile');
        $button.show();
        // switch to player
        $(this.contentWindow.document).find(EDITOR_PLAYER_SWITCH_SELECTOR).click();
        $(this.contentWindow.document).find(EDITOR_PLAYER_SWITCH_SELECTOR).hide();
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
