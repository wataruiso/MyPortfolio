'use strict';
{
    const openbtns = document.querySelectorAll('.openbtn');
    const boxes = document.querySelectorAll('.title > .box');
    openbtns.forEach((openbtn, index) => {
        openbtn.addEventListener('click', () => {
            boxes[index].classList.toggle('spin');
        });
    });
    
    
    const questionTitles = document.querySelectorAll('.question__title');
    const gboxes = document.querySelectorAll('.gbox');
    questionTitles.forEach((questionTitle, index) => {
        questionTitle.addEventListener('click', () => {
            gboxes[index].classList.toggle('spin');
        });
    });

    $(function() {
        $(document).ready(function() {
            var pagetop = $('#scrollTop');
            $(window).scroll(function() {
                if($(this).scrollTop() > 100) {
                    pagetop.fadeIn();
                }else {
                    pagetop.fadeOut();
                }
            });
            pagetop.click(function() {
                $('body, html').animate({scrollTop: 0}, 400);
                return false;
            });
            
    });

$(function() {

    $('a[href="#form"]').click(function() {
        var href = $(this).attr("href");
        var target = $(href == "#" || href=="" ? 'html' : href);
        var formtop = target.offset().top - 100;
        $('body, html').animate({scrollTop:formtop}, 400);
        return false;
    });
    
    
});
    



    })
    
    
    
    




}