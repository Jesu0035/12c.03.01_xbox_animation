"use strict"
gsap.registerPlugin(ScrollTrigger);



gsap.from(".hero-text", {
    x: 100,
    opacity: 0,
    duration: 1,
    delay: 1
});
gsap.from(".display", {
    opacity: 0,
    duration: 1,
    delay: 1
});
gsap.from(".wrapper", {
    x: -2000,
    duration: 1,
    delay: 1
});

gsap.from(".header", {
    display: 'none',
    opacity: 0,
    height: 0,
    padding: 0,
    duration: 1,
    delay: 1
});


let t1 = gsap.timeline({
    scrollTrigger: {
        trigger: '#first'
    }
})

t1.from('.sub-img', {
        x: '-100%',
        opacity: 0,
        duration: 2
    })
    .from('.text', {
        x: '100%',
        opacity: 0,
        duration: 1
    }, "-=1.5")
    .from('.watermark', {
        opacity: 0,
        duration: 1
    }, "-=0.5")



gsap.from("#first .watermark", {
    scrollTrigger: {
        trigger: "#first",
        start: "20% 200%",
        scrub: 3
    },
    duration: 2,
    x: '100vw'
});

gsap.from("#first img", {
    scrollTrigger: {
        trigger: "#first",
        start: "30% 40%",
        end: "20%",
        scrub: 3
    },
    rotation: 60
});

gsap.to("#second .watermark", {
    scrollTrigger: {
        trigger: "#second",
        start: "0% 200%",
        scrub: 3
    },
    duration: 2,
    x: '20vw'
});

gsap.from("#third .watermark", {
    scrollTrigger: {
        trigger: "#third",
        start: "0% 300%",
        scrub: 3
    },
    duration: 2,
    x: '100vw'
});
