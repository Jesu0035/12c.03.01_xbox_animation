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
    rotation: -20
});

gsap.from("#second .watermark", {
    scrollTrigger: {
        trigger: "#second",
        start: "0% 100%",
        scrub: 3
    },
    duration: 2,
    x: '-200vw'
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

gsap.to("#phone", {
    scrollTrigger: {
        trigger: "#third",
        start: "30% 50%",
        scrub: 1
    },
    duration: 2,
    rotation: '60deg'
});
