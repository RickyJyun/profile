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

            addViewBtnShowEvent()
            compareCreationsDetailDataHtmlIdList()
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
            // imgFrame.classList.add('hide')
            // imgFrame.classList.remove('show')
            imgFrame.classList.toggle('hide')
            imgFrame.classList.toggle('show')
        }

        // 3. 更改按鈕文字內容
        listBtn.innerText = this.innerText

        // 4. 串接資料
        setTimeout(function () {
            // 重置display-box transformX的位置&重置進度條
            creationsDisplayBox.style.transform = `translateX(0px)`
            progressBarInner.style.width = `0%`

            fetchingData(listBtn.innerText.toLowerCase().replace(' ', '_'))

            startZoomImage()
            addViewBtnShowEvent()
        }, showingImgFrameAnimeTimes)
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
function openDetailFrame() {
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
        window.removeEventListener('wheel', scrollCreationsItems)
    } else if (this.children[0].tagName == 'A') {
        return
    } else {
        detailFrame.querySelector('.main-content').innerHTML = this.outerHTML
        detailFrame.scrollTop = 0
        // detailFrame.style.display = 'initial'
        detailFrameLayoutMode()
        detailFrame.classList.remove('hide')
        window.removeEventListener('wheel', scrollCreationsItems)
        console.log(`沒有detail`);
    }

    hideControlBar()
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
let zoomPercent = 50
let hideControlBarTimer

controlBar.addEventListener('mouseenter', function () {
    clearTimeout(hideControlBarTimer)
    console.log('sss');
    controlBar.style.opacity = 1
})

controlBar.addEventListener('mouseleave', function () {
    hideControlBar()
})

function hideControlBar() {
    hideControlBarTimer = setTimeout(function () {
        controlBar.style.opacity = 0
    }, 2000)
}


orginalSizeBtn.addEventListener('click', function () {
    zoomPercent = 50
    this.parentNode.previousElementSibling.style.width = '50%'
    zoomProgressNumber.innerText = '50%'
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

    zoomPercent = 50
    zoomProgressNumber.innerText = '50%'
    setTimeout(function () {
        clearTimeout(hideControlBarTimer)
        controlBar.style.opacity = 1
    }, 2100)

    rwdEventAdderAndRemover()
    // window.addEventListener('wheel', scrollCreationsItems)
})

/*detail-frame control-bar 相關按鈕事件綁定 --end--*/



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
        console.log('有抓到HTML架構')
        let imgFrames = creationsDisplayBox.querySelectorAll('.img_frame')

        if (window.innerWidth < 1195) {
            for (let i = 0; i < imgFrames.length; i++) {
                if (!imgFrames[i].querySelector('img').complete) {
                    console.log(`第 ${i} 張圖片未讀取完成`)
                    return
                } else {
                    // 所有作品集圖片顯示(動畫)
                    for (imgFrame of imgFrames) {
                        imgFrame.classList.remove('zoom')
                        imgFrame.classList.add('show')
                    }
                    stopZoomImage()
                    return
                }
            }
        } else {
            for (let i = 0; i < imgFrames.length; i++) {
                if (!imgFrames[i].querySelector('img').complete) {
                    console.log(`第 ${i} 張圖片未讀取完成`)
                    return
                } else {
                    for (imgFrame of imgFrames) {
                        if (imgFrame.querySelector('img').complete) {
                            if (imgFrame.clientHeight / imgFrame.clientWidth < 1) {
                                imgFrame.classList.add('zoom')
                            }
                        } else {
                            return
                        }
                    }
                    stopZoomImage()
                    // 所有作品集圖片顯示(動畫)
                    for (imgFrame of imgFrames) {
                        imgFrame.classList.add('show')
                    }

                    return
                }
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
function rwdEventAdderAndRemover() {
    if (window.innerWidth < 1195) {
        window.removeEventListener('wheel', scrollCreationsItems)
        startZoomImage()
        // 手機版版型數據整理【測試】
        checkAllImageFrames()
    } else if (window.innerWidth > 1195) {
        window.addEventListener('wheel', scrollCreationsItems)
        startZoomImage()
        // 手機版版型數據整理【測試】
        checkAllImageFrames()
    }
}
rwdEventAdderAndRemover()

window.addEventListener('load', function () {
    rwdEventAdderAndRemover()
})

window.addEventListener('resize', function () {
    rwdEventAdderAndRemover()
})



// 手機版版型數據整理
let columns = []
let timeId02

function checkAllImageFrames() {
    if (allImageFrames) {
        mobileImgframeDataReset()
        stopCheckAllImageFrames()
    } else {
        return
    }
}

function startCheckAllImageFrames() {
    timeId02 = setInterval(checkAllImageFrames, 1000)
}

function stopCheckAllImageFrames() {
    clearInterval(timeId02);
}

function mobileImgframeDataReset() {
    // window.innerWidth < 1195
    if (getComputedStyle(document.querySelector('.creations_display_box')).display == 'grid') {
        let columnNum = Number(getComputedStyle(document.querySelector('.creations_display_box')).gridTemplate.match(/repeat(\(.*),/)[1].replace('(', ''))

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

        creationsDisplayBox.innerHTML = ''
        for (let i = 0; i < columnNum; i++) {
            creationsDisplayBox.innerHTML = creationsDisplayBox.innerHTML + `<div class="column"></div>`
        }

        for (let i = 0; i < columnNum; i++) {
            for (let j = 0; j < columns[i].length; j++) {
                creationsDisplayBox.querySelectorAll('.column')[i].innerHTML = creationsDisplayBox.querySelectorAll('.column')[i].innerHTML + columns[i][j].outerHTML
            }
        }

        compareCreationsDetailDataHtmlIdList()
    } else if (getComputedStyle(document.querySelector('.creations_display_box')).display == 'flex') { //window.innerWidth > 1195
        creationsDisplayBox.innerHTML = ''
        for (let i = 0; i < allImageFrames.length; i++) {
            creationsDisplayBox.innerHTML = creationsDisplayBox.innerHTML + allImageFrames[i].outerHTML
        }

        compareCreationsDetailDataHtmlIdList()
    }
}