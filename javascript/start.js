      document.body.addEventListener('click', () => {
            const overlay = document.querySelector('.overlay')
            document.querySelector('.overlay').style.background = 'white';



            document.querySelector('.controller').classList.add('z-index')
            setTimeout(() => {
                document.querySelector('.stage').remove()
                logo = document.createElement('img')
                logo.src = 'http://quater.org/xbox-controller/images/home-page-images/logo.svg'
                logo.classList.add('logo')
                document.querySelector('main').appendChild(logo)
            }, 1000);

            setTimeout(() => {
                window.location.assign("home.html");
            }, 4000);


        })

        const controller = document.querySelector('.controller')

        controller.addEventListener('mouseenter', () => {
            console.log('mouseenter')
            controller.style.transform = 'rotate(20deg)'
            controller.classList.remove('hover')
        })

        controller.addEventListener('mouseleave', () => {
            controller.style.transform = 'rotate(0)'
            controller.classList.add('hover')
        })
