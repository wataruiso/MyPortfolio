'use strict';

const hamburger_bar = $('.hamburger span');
const hamburger = $('.hamburger');
const nav = $('nav');
const fadein = $('.fadein');
const nav_li = $('nav li');
const scroll_arrow = $('.scroll');
const link_to_service_site = $('.link_to_service_site');
const speed = 500;
let back = $('.back');
let next = $("#next");
let prev = $("#prev");
let carousel = $("#worklist");
let flag = true;

let work_per_page = 1;
let works_length = $('#worklist li:last').index() + 1;
let page = Math.ceil(works_length / work_per_page);
let surplus = works_length % work_per_page;

const intro_els = [
    $('#intro_wrapper_black'),
    $('.intro_wrapper'),
    $('.intro_wrapper'),
    hamburger_bar
];
const anime_els_via_page = [
    {
        el: hamburger_bar,
        class: `intro_animation${intro_els.length}`
    },
    {
        el: fadein,
        class: 'in'
    },
    {
        el: $('.section_title'),
        class: 'titlein'
    },
    {
        el: nav_li,
        class: 'nav_li_in_pc'
    },
    {
        el: scroll_arrow,
        class: 'flash'
    },
    {
        el: $('.contact_link'),
        class: 'slidein'
    },
];

function animationViaPage(isAdd) {
    if(isAdd) {
        anime_els_via_page.forEach(anime_el => {
            anime_el.el.addClass(anime_el.class);
        })
    }else {
        anime_els_via_page.forEach(anime_el => {
            anime_el.el.removeClass(anime_el.class);
        })
    }
}



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
            link_to_service_site.removeClass('show');
            animationViaPage(0);
        },
        afterLoad: function(anchorLink) {
            if(anchorLink !== 'firstPage') link_to_service_site.addClass('show');
            animationViaPage(1);
        },
        afterRender: function() {
            setTimeout(() => {
                fadein.addClass('in');
                nav_li.addClass('nav_li_in_pc');
                scroll_arrow.addClass('flash');
            }, 7000)
        }
    });

    intro_els.forEach((intro_el, index)=> {
        setTimeout(() => {
            intro_el.addClass(`intro_animation${index + 1}`);
        }, 4000 + 1000 * (index + 1));
    }) 
});

hamburger.click(function() {
    hamburger_bar.removeClass(`intro_animation${intro_els.length}`);
    setTimeout(() => {
        nav.addClass('show');
        setTimeout(() => {
            nav_li.addClass('show'); 
        }, speed)
    }, speed);
})
back.click(function() {
    nav_li.removeClass('show');
    setTimeout(() => {
        nav.removeClass('show');
        setTimeout(() => {
            hamburger_bar.addClass(`intro_animation${intro_els.length}`);
        }, speed)
    }, speed);
})
next.click(function(){
    if(flag){
        flag = false;        
        carousel.animate({
        left: '-100%'
        }, speed, 'swing', function(){
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
    }, speed, 'swing', function(){    
    flag = true;
    getCurrent();
    });
    }
});