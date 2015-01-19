// ==UserScript==
// @name DjangoDocBeautify
// @namespace http://tannenbau.me/
// @version 0.2
// @description Makes Django docs better 
// @match https://docs.djangoproject.com/en/*/*
// @copyright 2015+, tannenbau.me
// @require http://code.jquery.com/jquery-latest.js
// @require http://rawgit.com/leafo/sticky-kit/v1.1.1/jquery.sticky-kit.min.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js
// @require <LINK TO AUTOCOMPLETE FILE HERE>
// @grant   GM_addStyle
// ==/UserScript==

// -- SETTINGS --
DJANGO_VERSION        = '1.6';
RELEASE_NO            = '9';	// This relates to the version
DJANGODOC_SEARCH_URL  = "https://docs.djangoproject.com/search/?release="+RELEASE_NO+"&q=";
DJANGODOC_MODULES_URL = "https://docs.djangoproject.com/en/"+DJANGO_VERSION+"/_modules/";
PYTHON_SEARCH_URL     = "https://docs.python.org/2/search.html?q=";
CODE_TEXTAREA_ENABLED = true    // some folks might not like this feature

stickyrecalc = function(){$(document.body).trigger("sticky_kit:recalc");};

// Load external jQuery UI CSS
$("head").append('<link href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/smoothness/jquery-ui.min.css" rel="stylesheet" type="text/css">');

// -- MAIN --
$(document).ready(function() {  
    // -- More searchboxes --
    var sidebar_search_2 = $('#sidebar_search').clone();
    sidebar_search_2.find('*').each(function(i, e) {
        var $e = $(e);
       	if ($e.attr('id')) $e.attr('id', $e.attr('id')+'_2');
    });
    $('.list-links').prev().before(sidebar_search_2);
    
    // -- Search boxes autocomplete --
    $('#id_sidebar_search_q,#id_sidebar_search_q_2').autocomplete({
        source: autocomplete_data,
        select: function(e, ui) {
            e.preventDefault();
        	window.location = 'https://docs.djangoproject.com/en/'+DJANGO_VERSION+'/'+ui.item.value;
        }
    });
    $('.ui-autocomplete').attr('style','max-height:400px;overflow-y:auto;overflow-x:hidden;');
    
    // -- Code copying --
    if (CODE_TEXTBOX_ENABLED) {
        $('.highlight pre').on('click', function(e) {
            if (window.getSelection().toString()) return;
            var $this = $(this);
            var ttext = $this.text().replace(/>>> /g,'').replace(/\n\.\.\. /g,'\n').replace(/^\s+|\s+$/g, '');
            var tarea = $('<textarea style="line-height:1.5em;font-family:\'Fira Mono\',Consolas,Menlo,Monaco,\'Courier New\',Courier,monospace;background:#f8f8f8;border-radius:4px;padding:15px 20px;width:100%;height:'+($this.height()*1.14)+'px;">'+ttext+'</textarea>');
            $this.parent().attr('style', 'overflow:hidden;border:0');
            $this.after(tarea).hide();
            tarea.select();
            tarea.on('blur', function(){
                tarea.remove();
            	$this.show();
            });
        });
    }
    
    // -- Module lookups --
    $('.nn').wrap(function(){
        var thistext = $(this).text();
        if (thistext.indexOf('django.') == 0) {	// django module imports
            url = DJANGODOC_MODULES_URL + $(this).text().replace(/\./g, '/');
            return '<a style="text-decoration:none;color:inherit;" href="'+url+'">';
        } else
        	return '<a style="text-decoration:none;color:inherit;" href="'+PYTHON_SEARCH_URL+$(this).text()+'">';
    });
    
    // -- Make text next to headerlinks into links themselves --
    $('.headerlink').parent().each(function(i,e) {
        $(e).html($('<a href="'+$(e).find('a').attr('href')+'" style="color:inherit;">'+$(e).html()+'</a>'));
    });
    
    // -- Hide "Getting Help" and "Download"
    $('.list-links, .list-links ~ *').hide();
    $('.list-links').prev().append(' (click to toggle)').on('click',function() {$('.list-links, .list-links ~ *').toggle();stickyrecalc();});
    
    // -- Sticky sidebar
	$('div[role=complementary]').stick_in_parent();
});
