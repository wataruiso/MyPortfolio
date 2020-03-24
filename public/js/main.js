'use strict';

const hamburger_bar = $('.hamburger span');
const hamburger = $('.hamburger');
const nav = $('nav');
const fadein = $('.fadein');
const title = $('.section_title');
const nav_li = $('nav li');
const contact_link = $('.contact_link');
const scroll = $('.scroll');
let work_per_page = 1;
let back = $('.back');
let next = $("#next");
let prev = $("#prev");
let carousel = $("#worklist");
let flag = true;
let works_length = $('#worklist li:last').index() + 1;
const intro_els = [
    $('#intro_wrapper_black'),
    $('.intro_wrapper'),
    $('.intro_wrapper'),
    hamburger_bar
];

let page = Math.ceil(works_length / work_per_page);
let surplus = works_length % work_per_page;

function getCurrent () {
    if(work_per_page === 1) $('#current').text($("#worklist li").eq(0).data('index'));
    else $('#current').text(Math.floor($("#worklist li").eq(0).data('index') / work_per_page) + 1);
}

$(window).on('load resize', function() {
    if($(window).width() >= 992) work_per_page = 3;
    else if($(window).width() >= 768) work_per_page = 2;
    let page = Math.ceil(works_length / work_per_page);
    let surplus = works_length % work_per_page;
    if(surplus !== 0) {
        for(let i = 0; i < (work_per_page - surplus); i++){
            carousel.append('<li></li>');
        }
    }
    $('#total').text(page);
    getCurrent();
})


$(document).ready(function() {
    $('#pagepiling').pagepiling({
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
        menu: '#myMenu',
        direction: 'horizontal',
        navigation: null,
        scrollingSpeed: 1100,
        easing: 'easeOutCubic',
        onLeave: function() {
            if(nav.hasClass('show')) back.click();
            fadein.css('opacity', '0');
            title.removeClass('titlein');
            hamburger_bar.removeClass(`intro_animation${intro_els.length}`);
            contact_link.removeClass('slidein');
            scroll.removeClass('flash');
            nav_li.removeClass('nav_li_in_pc');
        },
        afterLoad: function() {
            fadein.css('opacity', '1');
            title.addClass('titlein');
            hamburger_bar.addClass(`intro_animation${intro_els.length}`);
            contact_link.addClass('slidein');
            scroll.addClass('flash');
            nav_li.addClass('nav_li_in_pc');
        },
        afterRender: function() {
            setTimeout(() => {
                fadein.css('opacity', '1');
                nav_li.addClass('nav_li_in_pc');
                scroll.addClass('flash');
            }, 7000)
        }
    });

    for(let i = 1; i < intro_els.length + 1; i++) {
        setTimeout(() => {
            intro_els[i - 1].addClass(`intro_animation${i}`);
        }, 4000 + 1000 * i);
    }
});

hamburger.click(function() {
    hamburger_bar.removeClass(`intro_animation${intro_els.length}`);
    setTimeout(() => {
        nav.addClass('show');
        setTimeout(() => {
            nav_li.addClass('show'); 
        }, 500)
    }, 500);
})
back.click(function() {
    nav_li.removeClass('show');
    setTimeout(() => {
        nav.removeClass('show');
        setTimeout(() => {
            hamburger_bar.addClass(`intro_animation${intro_els.length}`);
        }, 500)
    }, 500);
})
next.click(function(){
    if(flag){
        flag = false;        
        carousel.animate({
        left: '-100%'
        }, 500, 'swing', function(){
        for(let i = 0; i < work_per_page; i++){
        carousel.append($("#worklist li").eq(0));
        }
        carousel.css({
            left: 0
        });
        flag = true;
        getCurrent();
        });
    }
});  
prev.click(function(){
if(flag){
    flag = false;        
    for(let i = 0; i < work_per_page; i++) {
    carousel.prepend($("#worklist li").eq(-1));
    }
    carousel.css({
    left: '-100%'
    }).animate({
    left: 0
    }, 500, 'swing', function(){    
    flag = true;
    getCurrent();
    });
    }
});