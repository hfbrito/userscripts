// ==UserScript==
// @name         TFS - correcao de Imagens
// @namespace    http://tampermonkey.net/
// @version      1.01
// @description  Corrige URL de imagens no TFS
// @author       Hugo Fontoura - HFONTOUR
// @match        *://10.174.223.159:8080/*
// @match        *://tfs.internal.timbrasil.com.br:8080/*
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==
var $ = window.jQuery;

(function() {
    'use strict';
    function main(){
        //Selecionar imagens do iframe e da pagina
        var imgs_iframe = $("iframe").contents().find('img');
        var imgs_page = $('img');
        var imgs = imgs_page.add(imgs_iframe);

        imgs.map(function(){
            this.setAttribute("src", this.src.replace("http://tfs:8080/", "http://10.174.223.159:8080/"));
            this.setAttribute("src", this.src.replace("http://tfs.internal.timbrasil.com.br:8080/", "http://10.174.223.159:8080/"));
        });

        imgs.hover(function() {
            $(this).css('cursor','pointer');
        }, function() {
            $(this).css('cursor','auto');
        });

        imgs.click( function(){
            //alert($(this).attr("src"));

            var url = $(this).attr("src");
            if (url){
                var popupWidth = 1000;
                var	popupHeight = 400;
                var sLeft = (screen.width - popupWidth) / 2;
                var	sTop = (screen.height - popupHeight) / 4;
                window.open(url, '_blank','width=' + popupWidth + ', height=' + popupHeight + ', top=' + sTop + ', left=' + sLeft);
            }
        });

    }

    setTimeout(main, 3000);

})();
