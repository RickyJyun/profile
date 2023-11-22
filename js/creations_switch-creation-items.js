(function () {

    let creationsDisplayBox = document.querySelector('.creations_display_box')

    fetch(`./graphic_design.html`).then(
        res => {
            return res.text()
        }
    ).then(
        content => {
            creationsDisplayBox.innerHTML = content
        }
    )

    setTimeout(function () {
        let creationsInfo_amount = document.querySelector('.creations_info h2')
        creationsInfo_amount.innerText = `${creationsDisplayBox.querySelectorAll('img').length} items`
    }, 100)


    // 滾動creations items
    let count = 0
    let progressBarInner = document.querySelector('.progress_bar .progress_inner')

    window.addEventListener('wheel', function (e) {
        count = e.deltaY + count
        creationsDisplayBox.style.transform = `translateX(-${count}px)`
        progressBarInner.style.width = `${Math.floor(count / (creationsDisplayBox.clientWidth - this.window.innerWidth) * 100)}%`

        setTimeout(function () {
            if (count < 0) {
                count = 0
                creationsDisplayBox.style.transform = `translateX(-${count}px)`
                progressBarInner.style.width = `0%`
            } else if (count > creationsDisplayBox.clientWidth - this.window.innerWidth) {
                count = creationsDisplayBox.clientWidth - this.window.innerWidth
                creationsDisplayBox.style.transform = `translateX(-${count}px)`
                progressBarInner.style.width = `100%`
            }
        }, 100)
    })

})()


// options_list 按鈕滑鼠移入移出動畫效果切換
function buttonHoverAnimeToggle() {
    let listBtn = document.querySelector('#creations .list_btn')
    let optionsListDds = document.querySelectorAll('#creations .options_list dd')

    function mouseenterEffect() {
        this.classList.remove('leave_anime')
        this.classList.add('hover_anime')
    }

    function mouseleaveEffect() {
        this.classList.remove('hover_anime')
        this.classList.add('leave_anime')
    }

    listBtn.addEventListener('mouseenter', mouseenterEffect)
    listBtn.addEventListener('mouseleave', mouseleaveEffect)

    for (optionsListDd of optionsListDds) {
        optionsListDd.addEventListener('mouseenter', mouseenterEffect)

        optionsListDd.addEventListener('mouseleave', mouseleaveEffect)
    }
}
buttonHoverAnimeToggle()


// 叫出選單&關閉選單按鈕特效
function presentMenuButtonEffect() {
    let optionsListDl = document.querySelector('.options_list dl')
    let listBtn = document.querySelector('.options_list .list_btn')
    let creationsDisplayBox = document.querySelector('.creations_display_box')
    let optionsListDds = document.querySelectorAll('#creations .options_list dd')

    optionsListDl.style.display = 'none'
    listBtn.setAttribute('data-switch-status', 'closed')

    listBtn.addEventListener('click', function () {
        if (this.dataset.switchStatus == 'closed') {
            this.setAttribute('data-switch-status', 'opened')
            optionsListDl.style.display = 'flex'
            creationsDisplayBox.style.marginBottom = `${optionsListDl.clientHeight + optionsListDl.clientHeight * 0.2}px`

            // for (optionsListDd of optionsListDds) {
            //     optionsListDd.classList.add('show_anime')
            // }

            for (let i = 0; i < optionsListDds.length; i++) {
                setTimeout(function () {
                    optionsListDds[i].classList.add('show_anime')
                }, i * 120)
            }

        } else if (this.dataset.switchStatus == 'opened') {
            this.setAttribute('data-switch-status', 'closed')

            optionsListDl.classList.add('hide_anime')
            let hideAnimeTimes = Number(getComputedStyle(document.querySelector('dl.hide_anime')).animationDuration.replace('s', '')) * 1000

            setTimeout(function () {
                optionsListDl.style.display = 'none'

                for (optionsListDd of optionsListDds) {
                    optionsListDd.classList.remove('show_anime')
                    optionsListDd.classList.remove('hover_anime')
                    optionsListDd.classList.remove('leave_anime')
                }

                optionsListDl.classList.remove('hide_anime')
            }, hideAnimeTimes)

            setTimeout(function () {
                creationsDisplayBox.style.marginBottom = `unset`
            }, hideAnimeTimes - 150)

        }
    })
}
presentMenuButtonEffect()