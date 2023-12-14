let menuBtn = document.querySelector('.menuBtn')
let menuBtnAnimeTimes = Number(getComputedStyle(document.querySelector('.menuBtn *')).animationDuration.replace('s', '')) * 1000

let navMenu = document.querySelector('nav')
let navMenuTransitionsTimes = Number(getComputedStyle(document.querySelector('nav>div')).transitionDuration.replace('s', '')) * 1000

menuBtn.addEventListener('click', function () {
    if (!this.dataset.status || this.dataset.status == 'closed') {
        document.documentElement.style.overflow = 'hidden'
        this.setAttribute('data-status', 'opened')

        navMenu.style.removeProperty('display')
        setTimeout(function () {
            navMenu.classList.add('opened')
        }, 10)
    } else {
        this.setAttribute('data-status', 'closed')
        setTimeout(function () {
            menuBtn.removeAttribute('data-status')
        }, menuBtnAnimeTimes)

        navMenu.classList.remove('opened')
        setTimeout(function () {
            navMenu.style.display = 'none'
            document.documentElement.style.removeProperty('overflow')
        }, navMenuTransitionsTimes)
    }
})