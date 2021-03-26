"use strict";

// The model of all features
const features = {
    Holder_phone: false,
    led: false,
    propeller: false,
    shield_black: false,
    solarfan: false
};

let onlyOne = true


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
/* this function make the lines blue so we can select the place  */
function theMouseover() {
    console.log(this)
    this.style.stroke = "blue"
}
/* this function makes desapear the blue stroke when we move the mouse */
function theMouseout() {
    console.log(this)
    this.style.stroke = "none"
}



function toggleOption(event) {
    const target = event.currentTarget;
    const feature = target.dataset.feature;

    // TODO: Toggle feature in "model"
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
        //Select target and add chosen class
        target.classList.add("chosen")

        //Remove the hide class
        document.querySelector(`[data-feature="${feature}"`).classList.remove("hide")
        const nameOfClass = document.querySelector(`#options [data-feature="${feature}"`).className
        if(nameOfClass=='option thumbs chosen'){
            console.log(feature)
            document.querySelector(`#${feature}-second`).classList.remove("hide")
        }
        //Create new featureElement and add it to the list
        const newfeatureElement = createFeatureElement(feature)
        document.querySelector("#selected ul").appendChild(newfeatureElement)
        // feature added

        //FLIP
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

        //Animation feature out
        theFeatureElement.classList = "animate-feature-out";

        const nameOfClass = document.querySelector(`#options [data-feature="${feature}"`).className
        console.log(nameOfClass)


        //when animation is complete, remove featureElement from the DOM
        theFeatureElement.addEventListener("animationend", function () {

            if(nameOfClass=='option thumbs'){
            console.log(document.querySelector(`.second-thumb`))
            document.querySelector(`#${feature}-second`).classList.add("hide")
        }

            theFeatureElement.remove();
            //Choose the feature element and hide it
            document.querySelector(`[data-feature=${feature}`).classList.add("hide");





        });
    }




}


// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
    //Create an li element and add feature img into it
    const li = document.createElement("li");
    li.dataset.feature = feature;

    const img = document.createElement("img");
    img.src = `images/configurator-images/${feature}.png`;
    img.alt = capitalize(feature);

    //Add the li element
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

document.querySelectorAll('.thumb').forEach(t => {
    const copy = t.cloneNode(true)
    copy.classList.remove('thumb')
    copy.classList.add('second-thumb')
    copy.id = t.id+'-second'
    console.log(copy)
    document.querySelector('.img-container').appendChild(copy)
})
