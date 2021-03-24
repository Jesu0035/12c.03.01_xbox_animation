"use strict"





const card = document.querySelector('.active')

document.querySelector('.display').addEventListener("mousemove", (e) => {
    let xAxis = (window.innerWidth / 1.4 - e.pageX) / 25
    let yAxis = (window.innerHeight / 2 - e.pageY) / 18
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`
    card.style.transition = "none"
})

card.addEventListener("mouseenter", (e) => {
    document.querySelector('.hero-img').style.transform = "translateZ(80px)"
    document.querySelector('.display h3').style.transform = "translateZ(40px)"
    document.querySelector('.display p').style.transform = "translateZ(30px)"
    document.querySelector('.display a').style.transform = "translateZ(20px)"
    document.querySelector('.display a').style.background = '#29abe2'
    document.querySelector('.display a').style.borderRadius = '20px'
    document.querySelector('.display a').style.color = 'white'
    card.style.transition = "none";
})

document.querySelector('.display').addEventListener("mouseleave", (e) => {

    card.style.transform = `rotateY(0deg) rotateX(0deg)`
    document.querySelector('.hero-img').style.transform = "translateZ(0px)"
    document.querySelector('.display h3').style.transform = "translateZ(0px)"

    document.querySelector('.display p').style.transform = "translateZ(0px)"
    document.querySelector('.display a').style.transform = "translateZ(0px)"
    document.querySelector('.display a').style.background = 'white'
    document.querySelector('.display a').style.borderRadius = '0px'
    document.querySelector('.display a').style.color = 'initial'


    card.style.transition = "all 0.5s ease"





})

const overlay = document.querySelector('.overlay')

/* flip the card */

document.querySelectorAll('.wrapper .card').forEach(item => {

    item.addEventListener('click', (e) => {
        console.log(item)
        document.querySelector('.hero-img').src = item.firstElementChild.src
        card.classList.add('rotate-x')
        overlay.style.display = 'inherit'

        setTimeout(() => {
            overlay.style.display = 'none'
        }, 700);

        setTimeout(() => {
            card.classList.remove('rotate-x')
        }, 1000);
    })


})

/* slider */
let index = 0;
let sum = 0
let n = 1
const slider = document.querySelector('.slider')
const template = document.querySelector('template').content.cloneNode(true)
slider.appendChild(template)

slider.querySelectorAll('.item').forEach(card => {
    card.addEventListener('click', () => {
        flip(card)
    })
})


document.querySelectorAll('.click').forEach(item => {

    item.addEventListener('click', (e) => {


        const copy = document.querySelector('template').content.cloneNode(true)

        const gap = parseInt(getComputedStyle(document.querySelector('.slider')).gap)

        const clickedCard = copy.querySelector('.item')
        console.log(clickedCard)

        const value = e.target.parentElement.dataset.value
        const width = document.querySelector('.item').offsetWidth

        const sliderCard = document.querySelectorAll('.item')
        document.querySelector('[data-value="previous"]').style.opacity = 1

        const amount = sliderCard.length - 1
        if (value == 'next') {
            n++
            console.log(n, 'n')
            index++
            sliderCard.forEach(element => {
                moveSlider(element)
            })

            if (n == 2) {
                console.log('222')
                n = 0
                slider.appendChild(copy)
            }




        } else {

            if (index > 0) {
                n--
                index--
                sliderCard.forEach(element => {

                    moveSlider(element)
                })

            }

            if (index == 0) {
                document.querySelector('[data-value="previous"]').style.opacity = .25
            }
        }


        function moveSlider(element) {
            element.style.transform = 'translateX(' + ((-width - gap) * index) + 'px)'
            console.log(index)
        }


        slider.querySelectorAll('.item').forEach(card => {
            card.addEventListener('click', () => {
                flip(card)
            })
        })

    })


})

let direction = true

function flip(item) {
    direction = !direction
    console.log(direction)

    document.querySelector('.hero-img').style.transform = "translateZ(0px)"

    setTimeout(() => {
        document.querySelector('.card button').style.display = 'none'
        console.log(item)

        document.querySelector('.hero-img').src = item.firstElementChild.src
        if(direction) {
            card.classList.add('rotate-y')
        } else {
            card.classList.add('rotate-x')
        }

        overlay.style.display = 'inherit'

        setTimeout(() => {
            overlay.style.display = 'none'
            document.querySelector('.card button').style.display = 'inherit'
        }, 700);

        setTimeout(() => {
            if(direction) {
                card.classList.remove('rotate-y')
            } else {
                card.classList.remove('rotate-x')
            }
            document.querySelector('.hero-img').style.transform = "translate(-20%, -20%) scale(1.2) rotate(20deg)"

        }, 1000);
    }, 1000);


}

const x = window.innerHeight;

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > x)
    document.querySelector('#svg-logo').classList.toggle("color", window.scrollY > x)
})
