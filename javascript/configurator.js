"use strict";

const features = {
  Holder_phone: false,
  black_botton: false,
  red_botton: false,
  gold: false,
  solarfan: false
};

window.addEventListener("DOMContentLoaded", start);

let elementToPaint = ''

async function start() {

    let response = await fetch('../svg/MasterNoelB-01.svg')
    let mySvgData = await response.text();
    document.querySelector('.main-product').innerHTML = mySvgData;

    document.querySelectorAll(".option").forEach(option => option.addEventListener("click", toggleOption));

    startManiputaltionSvg();
}

function startManiputaltionSvg() {
    document.querySelectorAll(".g_to_interact_with").forEach(eachG => {

        const initialColor = 'purple'

        document.querySelector('.selected-color').style.background = initialColor
        eachG.style.fill = initialColor

        eachG.addEventListener("click", theClick);
        eachG.addEventListener("mouseover", () => {
            console.log(2)
        });
        eachG.addEventListener("mouseout", theMouseout);

        document.querySelectorAll(".option-color").forEach(each_btn => {
            each_btn.addEventListener("click", colorClick);





        })

        document.querySelector('input[type=color] ').addEventListener('input', (e) => {
            eachG.style.fill = e.target.value
            document.querySelector('.selected-color').style.background = e.target.value
            console.log(e.target.value)
        })

        function colorClick() {
            elementToPaint = this.lastElementChild.style.backgroundColor
            if (elementToPaint != undefined) {
                eachG.style.fill = this.lastElementChild.style.backgroundColor;
                elementToPaint = this.lastElementChild.style.backgroundColor;
                console.log(eachG)
            }

        }



    })

}
//this function make first click grey
function theClick(e) {
    console.log('click')
    console.log(e.target)
    console.log(this)
    console.log(elementToPaint)
    this.style.fill = elementToPaint
}

function theMouseover() {
    console.log(this)
    this.style.stroke = "blue"
}

function theMouseout() {
    console.log(this)
    this.style.stroke = "none"
}



function toggleOption(event) {
    const target = event.currentTarget;
    const feature = target.dataset.feature;

    features[feature] = !features[feature];

    if (features[feature] === true) {

        const category = target.parentElement.dataset.category
        const childrenElements = document.querySelector(`ul [data-feature="${target.dataset.feature}"`)
        const chosen = target.parentElement.querySelector('.chosen')


        if (target.parentElement.dataset.category == 'arrowkeys') {

            if (chosen) {
                alert('You can only pick one ' + target.parentElement.dataset.category + '. Deselect current element.')
            } else {
                addFeature(target)
            }

        } else if (target.parentElement.dataset.category == 'thumbsticks') {

            if (chosen) {
                alert('You can only pick one ' + target.parentElement.dataset.category + '. Deselect current element.')
            } else {
                addFeature(target)
                copyImage(target)
            }

        } else {
            addFeature(target)
        }



    } else {
        removeFeature(target)
        if (document.querySelector('#selected ul')) {

        }

    }



    function addFeature(target) {

        target.classList.add("chosen")


        document.querySelector(`[data-feature="${feature}"`).classList.remove("hide")

        const newfeatureElement = createFeatureElement(feature)
        document.querySelector("#selected ul").appendChild(newfeatureElement)

        const start = target.lastElementChild.getBoundingClientRect();
        const end = newfeatureElement.getBoundingClientRect();

        const diffx = start.x - end.x + "px";
        const diffy = start.y - end.y + "px";

        newfeatureElement.style.setProperty("--diffx", diffx);
        newfeatureElement.style.setProperty("--diffy", diffy);

        //Animation feature in
        newfeatureElement.classList = "animate-feature-in";
    }

    function removeFeature(item) {
        item.classList.remove("chosen");
        console.log(item)

        console.log(document.querySelector(`[data-feature="${feature}"`))

        const theFeatureElement = document.querySelector(`#selected [data-feature="${feature}"]`);

        const end = theFeatureElement.getBoundingClientRect();
        const start = item.lastElementChild.getBoundingClientRect();

        const diffx = start.x - end.x + "px";
        const diffy = start.y - end.y + "px";

        theFeatureElement.style.setProperty("--diffx", diffx);
        theFeatureElement.style.setProperty("--diffy", diffy);

        theFeatureElement.offsetHeight;

        theFeatureElement.classList = "animate-feature-out";


        theFeatureElement.addEventListener("animationend", function () {
            theFeatureElement.remove();

            document.querySelector(`[data-feature=${feature}`).classList.add("hide");

            const copy = document.querySelector('.copy')

            copy.classList.add('hide')

            console.log(copy)

            copy.addEventListener('transitionend', () => {
                copy.remove()
            })



        });
    }




}


function createFeatureElement(feature) {
    const li = document.createElement("li");
    li.dataset.feature = feature;

    const img = document.createElement("img");
    img.src = `images/configurator-images/${feature}.png`;
    img.alt = capitalize(feature);

    li.append(img);

    return li;
}

function capitalize(text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}




document.querySelectorAll('.categories [data-category]').forEach(tab => {
    tab.addEventListener('click', (e) => {



        document.querySelectorAll('.categories [data-category]').forEach(item => {
            item.classList.remove('category-active')
        })




        const category = e.target.dataset.category
        e.target.classList.add('category-active')

        const currentTabs = document.querySelectorAll('.tab')
        const currentTab = document.querySelector(`.tabs [data-category="${category}"]`)

        currentTabs.forEach(item => {

            item.classList.remove('active')
        })

        currentTab.classList.add('active')
    })
})

document.querySelectorAll('.option-color').forEach(color => {


    color.firstElementChild.textContent = capitalize(color.dataset.color)
    color.lastElementChild.style.background = color.dataset.color
    color.addEventListener('click', (e) => {
        document.querySelector('.selected-color').style.background = color.dataset.color
    })
})
