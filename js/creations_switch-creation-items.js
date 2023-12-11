let listBtn = document.querySelector('#creations .list_btn')
let optionsListDds = document.querySelectorAll('#creations .options_list dd')
let optionsListDl = document.querySelector('.options_list dl')
let creationsDisplayBox = document.querySelector('.creations_display_box')
let progressBarInner = document.querySelector('.progress_bar .progress_inner')
let creationsInfo_amount = document.querySelector('.creations_info h2')
let detailFrame = document.querySelector('section#detail-frame')
let allImageFrames

optionsListDl.style.display = 'none'
listBtn.setAttribute('data-switch-status', 'closed')

// fetch()串接資料...先測試
// fetch(`./creations_all/graphic_design/graphic_design_overview.html`).then(
//     res => {
//         return res.text()
//     }
// ).then(
//     content => {
//         creationsDisplayBox.innerHTML = content
//         creationsInfo_amount.innerText = `${creationsDisplayBox.querySelectorAll('.img_frame').length} items`
//     }
// )

/* 切換選單 + 串接資料 -start-*/
if (!sessionStorage.getItem('creationsName')) {
    sessionStorage.setItem('creationsName', 'graphic_design')
}

for (optionsListDd of optionsListDds) {
    if (optionsListDd.innerText.replace(' ', '_').toLowerCase() == sessionStorage.getItem('creationsName')) {
        listBtn.innerText = optionsListDd.innerText
    }
}

fetchingData(sessionStorage.getItem('creationsName'))

// 串接資料【函數】
function fetchingData(creationsName) {
    fetch(`./creations_all/${creationsName}/${creationsName}_overview.html`).then(
        res => {
            if (res.ok) {
                return res.text()
            } else {
                return
            }
        }
    ).then(
        content => {
            creationsDisplayBox.innerHTML = content
            creationsInfo_amount.innerText = `${creationsDisplayBox.querySelectorAll('.img_frame').length} items`
            allImageFrames = [...creationsDisplayBox.querySelectorAll('.img_frame')]

            compareCreationsDetailDataHtmlIdList()
            addViewBtnShowEvent()
        }
    )
}

for (optionsListDd of optionsListDds) {
    optionsListDd.addEventListener('click', function () {
        // 1. 關閉選單
        listBtn.setAttribute('data-switch-status', 'closed')

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

        // 2. 所有作品集圖片隱藏(動畫)
        let showingImgFrameAnimeTimes = Number(getComputedStyle(document.querySelector('.creations_display_box .img_frame.show')).animationDuration.replace('s', '')) * 1000

        let imgFrames = creationsDisplayBox.querySelectorAll('.img_frame')
        for (imgFrame of imgFrames) {
            imgFrame.classList.remove('hide')
            imgFrame.classList.remove('show')
            imgFrame.classList.add('hide')
        }

        // 3. 更改按鈕文字內容
        listBtn.innerText = this.innerText

        // 4. 串接資料
        setTimeout(function () {
            // 重置display-box transformX的位置&重置進度條
            creationsDisplayBox.style.transform = `translateX(0px)`
            progressBarInner.style.width = `0%`

            fetchingData(listBtn.innerText.toLowerCase().replace(' ', '_'))
            // resetMobileImgframeDataProcess()
            // startZoomImage()
            addViewBtnShowEvent()
        }, showingImgFrameAnimeTimes)

        setTimeout(function () {
            resetMobileImgframeDataProcess()
            startZoomImage()
        }, 1000)
    })
}
/* 切換選單 + 串接資料 -end-*/


// 獲取擁有詳細圖片的作品集 | 有詳細資訊就依序標上html ID【函數】
function compareCreationsDetailDataHtmlIdList() {
    if (typeof eval(`${listBtn.innerText.replace(' ', '_').toLowerCase()}_id_list`) == 'undefined') {
        console.log(`${listBtn.innerText.replace(' ', '_').toLowerCase()}_id_list`);
        console.log('未定義變量')

        let imgFrames = document.querySelectorAll('.img_frame')
        for (imgFrame of imgFrames) {
            imgFrame.addEventListener('click', openDetailFrame)
        }
        return
    } else {
        creationsMoreDetailIdList = eval(`${listBtn.innerText.replace(' ', '_').toLowerCase()}_id_list`)

        setTimeout(function () {
            let imgFrames = document.querySelectorAll('.img_frame')

            for (imgFrame of imgFrames) {
                for (let i = 0; i < creationsMoreDetailIdList.length; i++) {
                    if (imgFrame.querySelector('img').src.match(/ibb.co\/(.*)\//)[1] == creationsMoreDetailIdList[i]) {
                        imgFrame.setAttribute('data-detail-id', `${imgFrame.querySelector('img').src.match(/ibb.co\/(.*)\//)[1]}.html`)
                    }
                }

                imgFrame.addEventListener('click', openDetailFrame)
            }
        }, 1000)
    }
}


// 點擊圖片後開啟detail-frame【函數】
let initialHTMLScrollTop

function openDetailFrame() {
    initialHTMLScrollTop = document.documentElement.scrollTop

    if (this.dataset.detailId) {
        // console.log(`./creations_all/${listBtn.innerText.replace(' ', '_').toLowerCase()}/${this.dataset.detailId}`);
        fetch(`./creations_all/${listBtn.innerText.replace(' ', '_').toLowerCase()}/${this.dataset.detailId}`).then(
            res => {
                if (res.ok) {
                    return res.text()
                } else {
                    return
                }
            }
        ).then(
            content => {
                detailFrame.querySelector('.main-content').innerHTML = content
            }
        )

        detailFrame.scrollTop = 0
        // detailFrame.style.display = 'initial'
        detailFrameLayoutMode()
        detailFrame.classList.remove('hide')
        detailFrame.querySelector('.main-content').style.width = `${initialZoomPercent}%`;

        window.removeEventListener('wheel', scrollCreationsItems)
    } else if (this.children[0].tagName == 'A') {
        return
    } else {
        detailFrame.querySelector('.main-content').innerHTML = this.outerHTML
        detailFrame.scrollTop = 0
        // detailFrame.style.display = 'initial'
        detailFrameLayoutMode()
        detailFrame.classList.remove('hide')
        detailFrame.querySelector('.main-content').style.width = `${initialZoomPercent}%`;

        window.removeEventListener('wheel', scrollCreationsItems)
        console.log(`沒有detail`);
    }

    setTimeout(function () {
        if (controlBar.style.opacity == '0') {
            controlBar.style.removeProperty('opacity')
        }
    }, 100)
}

// 選擇detail-frame的對齊模式【函數】
function detailFrameLayoutMode() {
    if (detailFrame.querySelectorAll('.img_frame').length == 1) {
        if (listBtn.innerText == 'Graphic Design' || listBtn.innerText == 'Print Design') {
            detailFrame.classList.add('center-layout')
        } else {
            return
        }
    }
}

/*detail-frame control-bar 相關按鈕事件綁定 --start--*/
let controlBar = detailFrame.querySelector('.control-bar')
let orginalSizeBtn = detailFrame.querySelector('.orginal-size-btn')
let zoomOutBtn = detailFrame.querySelector('.zoom-out-btn')
let zoomInBtn = detailFrame.querySelector('.zoom-in-btn')
let fullScreenBtn = detailFrame.querySelector('.full-screen-btn')
let closeFrameBtn = detailFrame.querySelector('.close-frame-btn')
let zoomProgressNumber = detailFrame.querySelector('.zoom-progress-number')
let zoomPercent
let initialZoomPercent = Number(getComputedStyle(detailFrame.querySelector('.main-content')).width.replace('%', ''))
let hideControlBarTimer

function resetDetailFrameWidth() {
    if (window.innerWidth > 1195) {
        initialZoomPercent = 50
    } else {
        initialZoomPercent = 90
    }

    if (detailFrame.querySelector('.main-content').style.width) {
        zoomPercent = Number(detailFrame.querySelector('.main-content').style.width.replace('%', ''))
    } else {
        zoomPercent = initialZoomPercent
    }
    zoomProgressNumber.innerText = `${zoomPercent}%`
}
resetDetailFrameWidth()

orginalSizeBtn.addEventListener('click', function () {
    zoomPercent = initialZoomPercent
    this.parentNode.previousElementSibling.style.width = `${zoomPercent}%`
    zoomProgressNumber.innerText = `${zoomPercent}%`
})

zoomOutBtn.addEventListener('click', function () {
    if (zoomPercent > 50) {
        zoomPercent = zoomPercent - 10
    } else if (zoomPercent == 50) {
        zoomPercent = zoomPercent
    }

    this.parentNode.previousElementSibling.style.width = `${zoomPercent}%`
    zoomProgressNumber.innerText = `${zoomPercent}%`
})

zoomInBtn.addEventListener('click', function () {
    if (zoomPercent < 100) {
        zoomPercent = zoomPercent + 10
    } else if (zoomPercent == 100) {
        zoomPercent = zoomPercent
    }

    this.parentNode.previousElementSibling.style.width = `${zoomPercent}%`
    zoomProgressNumber.innerText = `${zoomPercent}%`
})

fullScreenBtn.addEventListener('click', function () {
    zoomPercent = 100
    this.parentNode.previousElementSibling.style.width = '100%'
    zoomProgressNumber.innerText = '100%'
})

closeFrameBtn.addEventListener('click', function () {
    // this.parentNode.parentNode.style.display = 'none'
    this.parentNode.parentNode.classList.add('hide')
    this.parentNode.parentNode.classList.remove('center-layout')
    this.parentNode.previousElementSibling.style.width = '50%'
    this.parentNode.previousElementSibling.innerHTML = ''

    zoomPercent = initialZoomPercent
    zoomProgressNumber.innerText = `${initialZoomPercent}%`
    // this.parentNode.previousElementSibling.style.width = `${zoomPercent}%`
    this.parentNode.previousElementSibling.style.removeProperty('width');

    document.documentElement.style.scrollBehavior = 'unset'
    document.documentElement.scrollTop = initialHTMLScrollTop
    document.documentElement.style.removeProperty('scroll-behavior')

    setTimeout(function () {
        clearTimeout(hideControlBarTimer)
        controlBar.style.opacity = 1
    }, 2100)

    if (getComputedStyle(document.querySelector('.creations_display_box')).display == 'flex') {
        window.addEventListener('wheel', scrollCreationsItems)
    }
})
/*detail-frame control-bar 相關按鈕事件綁定 --end--*/


/* control-bar 向下滾動隱藏|向上滾動顯示 for 手機版【函數】--start--*/
let initalScrollTop01 = detailFrame.scrollTop
function scrollAndHideControlBar() {
    if (this.scrollTop - initalScrollTop01 > 0 && this.scrollTop - initalScrollTop01 > 100) {
        controlBar.style.opacity = '0'
        initalScrollTop01 = this.scrollTop
    } else if (this.scrollTop - initalScrollTop01 < 0) {
        controlBar.style.opacity = '1'
        initalScrollTop01 = this.scrollTop
    }

    console.log(`detailFrame：${detailFrame.scrollTop}`)
    console.log(`main-content：${detailFrame.querySelector('.main-content').scrollTop}`)
}
detailFrame.addEventListener('scroll', scrollAndHideControlBar)
// detailFrame.querySelector('.main-content').addEventListener('scroll', scrollAndHideControlBar)


let initalScrollTop02 = detailFrame.querySelector('.main-content').scrollTop
function scrollAndHideControlBar2() {
    if (this.scrollTop - initalScrollTop02 > 0) {
        controlBar.style.opacity = '0'
        initalScrollTop02 = this.scrollTop
    } else if (this.scrollTop >= this.scrollHeight - window.innerHeight) {
        controlBar.style.opacity = '0'
    } else if (this.scrollTop <= 0) {
        controlBar.style.opacity = '1'
    } else {
        controlBar.style.opacity = '1'
        initalScrollTop02 = this.scrollTop
    }
}
detailFrame.querySelector('.main-content').addEventListener('scroll', scrollAndHideControlBar2)

/* control-bar 向下滾動隱藏|向上滾動顯示 for 手機版【函數】--end--*/


/* 滾動creations items --start--*/
let count = 0
window.addEventListener('wheel', scrollCreationsItems)

function scrollCreationsItems(e) {
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
}
/* 滾動creations items --end--*/



// options_list 按鈕滑鼠移入移出動畫效果切換
function buttonHoverAnimeToggle() {
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
listBtn.addEventListener('click', presentMenuButtonEffect)

function presentMenuButtonEffect() {
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
}


// 橫式展示圖片放大
let timeId01

function startZoomImage() {
    timeId01 = setInterval(zoomImage, 1000);
}

function stopZoomImage() {
    clearInterval(timeId01);
}

function zoomImage() {
    if (creationsDisplayBox.innerHTML) {
        let imgFrames = creationsDisplayBox.querySelectorAll('.img_frame')
        let imgNotLoadedCount = imgFrames.length

        if (window.innerWidth < 1195) {
            for (let i = 0; i < imgFrames.length; i++) {
                if (!imgFrames[i].querySelector('img').complete) {
                    continue
                } else {
                    if (imgFrames[i].dataset.loadedStatus) {
                        imgNotLoadedCount--
                        if (imgNotLoadedCount <= 0) {
                            stopZoomImage()
                            console.log('圖片已全數載入完成!!!');
                            return
                        }
                    } else if (!imgFrames[i].dataset.loadedStatus) {
                        imgFrames[i].setAttribute('data-loaded-status', 'done')
                        imgFrames[i].classList.remove('zoom')
                        imgFrames[i].classList.remove('show')
                        imgFrames[i].classList.remove('hide')
                        imgFrames[i].classList.add('show')

                        imgNotLoadedCount--
                        if (imgNotLoadedCount <= 0) {
                            stopZoomImage()
                            console.log('圖片已全數載入完成!!!');
                            return
                        }
                    }
                }
            }

            if (imgNotLoadedCount <= 0) {
                stopZoomImage()
                console.log('圖片已全數載入完成!!!');
                return
            } else {
                console.log('還有圖片未載入完成');
            }

        } else {
            for (let i = 0; i < imgFrames.length; i++) {
                if (!imgFrames[i].querySelector('img').complete) {
                    continue
                } else {
                    if (imgFrames[i].dataset.loadedStatus) {
                        imgNotLoadedCount--
                    } else if (!imgFrames[i].dataset.loadedStatus) {
                        imgFrames[i].setAttribute('data-loaded-status', 'done')

                        if (imgFrames[i].clientHeight / imgFrames[i].clientWidth < 1) {
                            imgFrames[i].classList.add('zoom')
                            imgFrames[i].classList.remove('show')
                            imgFrames[i].classList.remove('hide')
                            imgFrames[i].classList.add('show')
                        } else {
                            imgFrames[i].classList.remove('show')
                            imgFrames[i].classList.remove('hide')
                            imgFrames[i].classList.add('show')
                        }

                        imgNotLoadedCount--
                        if (imgNotLoadedCount <= 0) {
                            stopZoomImage()
                            console.log('圖片已全數載入完成2!!!');
                            return
                        }
                    }
                }
            }

            if (imgNotLoadedCount <= 0) {
                stopZoomImage()
                console.log('圖片已全數載入完成2!!!');
                return
            } else {
                console.log('還有圖片未載入完成2');
            }
        }
    } else {
        console.log('沒抓到')
        return
    }
}


// 懸浮view按鈕 移動、顯現、隱藏
let viewBtn = document.querySelector('.view-btn')
viewBtn.style.clipPath = `inset(0% calc(${viewBtn.querySelector('.text p').scrollWidth}px) 0% 0%)`

window.addEventListener('mousemove', function (e) {
    viewBtn.parentNode.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`
})

function showViewBtn() {
    viewBtn.parentNode.classList.remove('hide')
    viewBtn.parentNode.classList.add('show')
    setTimeout(function () {
        // viewBtn.querySelector('.text').style.maxWidth = `calc(${viewBtn.querySelector('.text p').scrollWidth}px + 2.5em)`
        viewBtn.style.clipPath = `inset(0% 0px 0% 0%)`
    }, 400)
}

function hideViewBtn(e) {
    viewBtn.parentNode.classList.remove('show')
    viewBtn.parentNode.classList.add('hide')
    // viewBtn.classList.add('hide')

    let timer = Number(getComputedStyle(viewBtn.parentNode).animationDuration.replace('s', '')) * 1000
    // let timer = Number(getComputedStyle(viewBtn.parentNode).transitionDuration.match(/ (.*)s/)[1]) * 1000
    viewBtn.style.clipPath = `inset(0% calc(${viewBtn.querySelector('.text p').scrollWidth}px) 0% 0%)`
    setTimeout(function () {
        viewBtn.parentNode.classList.remove('hide')
        viewBtn.classList.remove('hide')
    }, timer)
}

function addViewBtnShowEvent() {
    let imgFrames = document.querySelectorAll('.img_frame')
    for (imgFrame of imgFrames) {
        imgFrame.addEventListener('mouseenter', showViewBtn)
        imgFrame.addEventListener('mouseleave', hideViewBtn)
    }
}


// 電腦 | 手機響應式功能切換
let initialDeviceWidth = window.outerWidth
let closeFrameBtnInnerText = closeFrameBtn.innerText
function rwdEventAdderAndRemover() {
    if (window.innerWidth < 1195) {
        window.removeEventListener('wheel', scrollCreationsItems)
        // 手機版版型數據整理【測試】
        resetMobileImgframeDataProcess()
        // 重置display-box transformX的位置&重置進度條
        creationsDisplayBox.style.transform = `translateX(0px)`
        progressBarInner.style.width = `0%`
        startZoomImage()

        resetDetailFrameWidth()

        if (window.innerWidth < 700) {
            closeFrameBtn.innerText = ''
        } else {
            closeFrameBtn.innerText = closeFrameBtnInnerText
        }

    } else if (window.innerWidth > 1195) {
        window.addEventListener('wheel', scrollCreationsItems)
        // 手機版版型數據整理【測試】
        resetMobileImgframeDataProcess()
        // 重置display-box transformX的位置&重置進度條
        creationsDisplayBox.style.transform = `translateX(0px)`
        progressBarInner.style.width = `0%`
        startZoomImage()

        resetDetailFrameWidth()
    }
}
rwdEventAdderAndRemover()

resetMobileImgframeDataProcess()

window.addEventListener('resize', function () {
    setTimeout(function () {
        if (window.outerWidth == initialDeviceWidth) {
            return
        } else {
            initialDeviceWidth = window.outerWidth
            rwdEventAdderAndRemover()
        }
    }, 100)
})



// 數據整理for手機or電腦版版型
let columns = []
let timeId02

function resetMobileImgframeDataProcess() {
    if (getComputedStyle(document.querySelector('.creations_display_box')).display == 'grid') {
        if (!allImageFrames) {
            setTimeout(resetMobileImgframeDataProcess, 500)
            return
        }

        // 獲取當前欄位數
        let columnNum = Number(getComputedStyle(document.querySelector('.creations_display_box')).gridTemplateColumns.match(/px/g).length)

        creationsDisplayBox.innerHTML = ''
        for (let i = 0; i < columnNum; i++) {
            creationsDisplayBox.innerHTML = creationsDisplayBox.innerHTML + `<div class="column"></div>`
        }

        if (!document.querySelector('.creations_display_box').children[0].className == 'column') {
            setTimeout(resetMobileImgframeDataProcess, 500)
            return
        }

        // 分開img_frame到不同數組
        for (let i = 0; i < columnNum; i++) {
            columns[i] = new Array
        }

        for (let i = 0; i < columnNum; i++) {
            for (let j = i; j < allImageFrames.length; j += columnNum) {
                if (typeof allImageFrames[j] == 'undefined') {
                    break
                } else {
                    console.log('sss');
                    columns[i].push(allImageFrames[j])
                }
            }
        }

        for (let i = 0; i < columnNum; i++) {
            for (let j = 0; j < columns[i].length; j++) {
                creationsDisplayBox.querySelectorAll('.column')[i].innerHTML = creationsDisplayBox.querySelectorAll('.column')[i].innerHTML + columns[i][j].outerHTML
            }
        }

        compareCreationsDetailDataHtmlIdList()
        addViewBtnShowEvent()

    } else if (getComputedStyle(document.querySelector('.creations_display_box')).display == 'flex') {
        if (!allImageFrames) {
            console.log('看屁看');
            setTimeout(resetMobileImgframeDataProcess, 500)
            return
        }

        creationsDisplayBox.innerHTML = ''
        for (let i = 0; i < allImageFrames.length; i++) {
            creationsDisplayBox.innerHTML = creationsDisplayBox.innerHTML + allImageFrames[i].outerHTML
        }

        compareCreationsDetailDataHtmlIdList()
        addViewBtnShowEvent()
    }
}