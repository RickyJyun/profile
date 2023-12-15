/*插入menu_nav CSS文件 --start--*/
let head = document.querySelector('head')
let menuNavCss = `<link rel="stylesheet" href="./css/menu_nav.css">`
let menuNavAnimeCss = `<link rel="stylesheet" href="./css/menu_nav_anime.css">`
head.insertAdjacentHTML('afterbegin', menuNavCss)
head.insertAdjacentHTML('afterbegin', menuNavAnimeCss)
/*插入menu_nav CSS文件 --end--*/


/*插入menu_nav HTML架構 --start--*/
let bodyEl = document.body
let navHTML = `<header>
<div class="menuBtn">
    <div><span></span><span></span><span></span></div>
</div>
<nav style="display: none;">
    <div>
        <div class="top-box"></div>
        <div class="lists-box">
            <dl>
                <dt data-link="./index">HOME</dt>
                <dd>首頁</dd>
            </dl>
            <dl>
                <dt data-link="./creations" data-link-name="graphic_design">CREATIONS</dt>
                <dd>作品集</dd>
                <!-- <dd>
                    <dl>
                        <dd data-link="./creations" data-link-name="web_design">網頁設計</dd>
                        <dd data-link="./creations" data-link-name="graphic_design">平面設計</dd>
                        <dd data-link="./creations" data-link-name="print_design">印刷設計</dd>
                        <dd data-link="./creations" data-link-name="landing_page">Landing Page</dd>
                    </dl>
                </dd> -->
            </dl>
            <dl>
                <dt>CONTACT</dt>
                <dd>與我聯繫</dd>
                <dd>
                    <dl>
                        <dd>+886 975665735</dd>
                        <dd>lussdesignstudio@gmail.com</dd>
                        <dd><a href="https://m.me/104462231406126">Messenger</a></dd>
                    </dl>
                </dd>
            </dl>
        </div>
        <div class="sns-icon-box">
            <div data-svg-name="facebook"></div>
            <div data-svg-name="linkedin"></div>
            <div data-svg-name="104"></div>
        </div>
    </div>
</nav>
</header>`
bodyEl.insertAdjacentHTML('afterbegin', navHTML)
/*插入menu_nav HTML架構 --end--*/



window.addEventListener('DOMContentLoaded', function () {
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


    /*menu nav 選項連結點擊 --start--*/
    let dataLinks = document.querySelectorAll('[data-link]')
    for (dataLink of dataLinks) {
        dataLink.addEventListener('click', function () {
            if (this.dataset.link == './creations') {
                sessionStorage.setItem('creationsName', this.dataset.linkName)
                window.location.href = this.dataset.link + `.html`
            } else {
                window.location.href = this.dataset.link + `.html`
            }
        })

    }
    /*menu nav 選項連結點擊 --end--*/
})