let paraContents = {
    education: {
        para: `我畢業於僑光科技大學應用英語系，是的你沒看錯，明明是應英系學生，但英文程度卻不怎麼樣的我和許多應屆畢業生一樣，不知道畢業後要做什麼，到底是要繼續念書? 還是要去工作?
        如果去工作要找什麼工作?
        那時的我腦中每天都迴盪著這些聲音，隨著離畢業的時間越來越近，內心也越來越焦躁不安...<br><br>

        有一天，一位朋友說他想去上電繪課，但一個人上課太過孤單，於是就問我有沒有興趣一起去上?<br><br>

        當時第一次聽到「電繪」這個詞彙時，我完全不知道這是一個什麼樣的課程，於是帶著好奇心上網找了一下資料和一些影片，那時看著影片的我瞬間就被吸引住了，心裡不假思索地想著〝就是它了〞，於是我在畢業前的最後一年，一邊致力於畢業專題英文論文，一邊開始挑戰著電繪課程，讓我人生中最後一段學生時光過得非常累死人的充實，同時也開啟了我往後的設計職涯。`,

        imgs: `<div class="img_frame"><img src="./img/education-01.jpg"></div>
    <div class="img_frame"><img src="./img/education-02.jpg"></div>
    <div class="img_frame"><img src="./img/education-03.jpg"></div>`,
    },
    experience: {
        para: `剛從學校畢業，同時也習得設計相關軟體基本操作的我，馬上就想投入設計相關行業，想說儘快累積設計相關工作經驗，但由於可能不是設計本科系畢業的關係，那時我投給每一間設計公司的履歷都是已讀不回，剛好那時網路行銷正興起，所以就算是一般公司，為了達到良好的網路行銷效益，也會招聘自己的設計人員，也就是所謂的美編。<br><br>
        雖然那時候的我很想進正規設計公司裡工作，但礙於剛畢業又沒有設計相關工作經驗，加上還不是擁有設計本科系學歷...等等身份上的限制，我只能退而求其次，先進入一般公司當起美編，想說先累積設計相關工作經驗再說，就這樣累積設計經驗值為優先的職涯生活，在不知不覺中就這樣展開了...<br><br>
        在累積設計經驗的途中，我也接觸了各種行業，從美妝保養、冷凍食品、工商顧問、電器電子、印刷業到客製禮品業等等，我都在這些行業裡待過，多虧這些經歷，我接觸了很多不同風格的設計，也能夠隨著各行業的不同和公司的需求，來因應設計上的變化，除此之外，我在職場中也參與過各種不同的工作流程，這也讓我在處理各種工作事務上的方式比其他人更加靈活多樣，藉此來達到更好的工作效率，我想這些事情，是待在正規設計公司裡都無法體會到的吧。`,

        imgs: `<div class="img_frame"><img src="./img/experience-01.jpg"></div>
        <div class="img_frame"><img src="./img/experience-02.jpg"></div>
        <div class="img_frame"><img src="./img/experience-03.jpg"></div>`,
    },
    about_now: {
        para: `現在的我任職於一間電商公司設計部的主管，雖然目前待在主管之位，但我還是依然致力於學習跟設計領域相關的知識與技術，當然學習的內容都是以自己感興趣的事物為主，雖然曾被一位在職場上遇到的設計前輩說過：『在名為設計這條既寬闊且看不到盡頭的路上，必須與時俱進』，雖然我覺得她說得沒錯，我也認同，但我不是那種，明明對某項事物沒興趣卻還要拼命學會的人，畢竟學習還是得伴隨著興致，才會有樂趣嘛~死命去學沒興趣的事物，說實話那是種痛苦，所以今天的我也是運用著工作以外的所有時間，學習著各種設計相關的技術。<br><br>
        目前還有3D建模渲染、美術設計、網頁後端技術...等等，如此多讓我感興趣的事物等著我去學習探討，期許將來的某天能夠學會興趣清單上的所有項目，除了讓自己的實力更上一層樓之外，結合當前所有習得的技術所創作出來的作品更讓我期待。`,

        imgs: `<div class="img_frame"><img src="./img/about_now-01.png"></div>
        <div class="img_frame"><img src="./img/about_now-02.jpg"></div><div class="img_frame"><img src="./img/about_now-03.jpg"></div>`,
    }
}



let optionsPart = document.querySelector('#about_me .options_part')
let optionTitles = document.querySelectorAll('#about_me .options_part dt')
let paragraphFrame = document.querySelector('#about_me figure.paragraph')
let descBox = document.querySelector('#about_me .desc_box')
let imgsBox = document.querySelector('#about_me .imgs_box')
let imgsCssStyle = document.querySelector('[data-about-me-imgs-style]')
let basicDuration = Number(getComputedStyle(document.querySelector('#about_me .desc_box')).animationDuration.replace('s', '')) * 1000



function optionTitleClickEvent() {
    let stopWindowScrollValue = document.documentElement.scrollTop
    let contentTag = this.innerText.toLowerCase().replace(/\s/, '_')

    descBox.classList.remove('expand')
    descBox.classList.add('collapse')
    imgsBox.classList.remove('show')
    imgsBox.classList.add('hide')
    paragraphFrame.classList.remove('flashing')
    paragraphFrame.classList.add('hiding')

    for (let i = 0; i < optionTitles.length; i++) {
        optionTitles[i].removeAttribute("data-clicked")
        optionTitles[i].nextElementSibling.removeAttribute("data-showed")
    }
    this.setAttribute("data-clicked", "")
    this.nextElementSibling.setAttribute("data-showed", "")

    setTimeout(function () {
        descBox.parentNode.parentNode.setAttribute('data-content', `${contentTag}`)
        imgsCssStyle.href = `./css/index_about_me_${contentTag}_img.css`

        descBox.innerHTML = `<p>${paraContents[contentTag].para}</p>`
        imgsBox.innerHTML = paraContents[contentTag].imgs

        document.documentElement.scrollTop = stopWindowScrollValue

        descBox.classList.remove('collapse')
        descBox.classList.add('expand')
        imgsBox.classList.remove('hide')
        imgsBox.classList.add('show')
        paragraphFrame.classList.remove('hiding')
        paragraphFrame.classList.add('flashing')
    }, basicDuration + 1200)
}


function removeOptionFuncForPC() {
    for (optionTitle of optionTitles) {
        optionTitle.removeEventListener('click', optionTitleClickEvent)
    }
}










let startPoint
let currentPoint
let valueNumTag
let arrayNum = 0
let stopWindowScrollValue

function optionTitleTouchstartEvent(e) {
    startPoint = e.pageX
    currentPoint = Number(optionsPart.querySelector('div').style.transform.match(/translateX\((.+)px\)/)[1])

    for (let i = 0; i < optionTitles.length; i++) {
        optionTitles[i].removeAttribute("data-clicked")
        optionTitles[i].nextElementSibling.removeAttribute("data-showed")
    }

    stopWindowScrollValue = document.documentElement.scrollTop

    descBox.classList.remove('expand')
    descBox.classList.add('collapse')
    paragraphFrame.classList.remove('flashing')
    paragraphFrame.classList.add('hiding')
}


function optionTitleTouchmoveEvent(e) {
    this.querySelector('div').style.transform = `translateX(${-(startPoint - e.pageX - currentPoint) + 'px'})`

    valueNumTag = startPoint - e.pageX

    document.documentElement.scrollTop = stopWindowScrollValue
}


function optionTitleTouchendEvent(e) {
    if (valueNumTag <= 0) {
        if (arrayNum <= 0) {
            arrayNum = 0
        } else {
            arrayNum--
        }
    } else if (valueNumTag > 0) {
        if (arrayNum >= optionTitles.length - 1) {
            arrayNum = optionTitles.length - 1
        } else {
            arrayNum++
        }
    }

    // console.log(optionTitles[1].parentNode.offsetLeft)
    this.querySelector('div').style.transform = `translateX(${-optionTitles[arrayNum].parentNode.offsetLeft}px)`

    optionTitles[arrayNum].setAttribute("data-clicked", "")
    setTimeout(function () {
        optionTitles[arrayNum].nextElementSibling.setAttribute("data-showed", "")
    }, 300)

    let contentTag = document.querySelector('#about_me [data-clicked]').innerText.toLowerCase().replace(/\s/, '_')
    imgsCssStyle.href = `./css/index_about_me_${contentTag}_img.css`
    imgsBox.innerHTML = paraContents[contentTag].imgs

    descBox.parentNode.parentNode.setAttribute('data-content', `${contentTag}`)

    descBox.innerHTML = `<p>${paraContents[contentTag].para}</p>`

    descBox.classList.remove('collapse')
    descBox.classList.add('expand')
    paragraphFrame.classList.remove('hiding')
    paragraphFrame.classList.add('flashing')
}


function removeOptionFuncForMobile() {
    for (optionTitle of optionTitles) {
        optionsPart.removeEventListener('touchstart', optionTitleTouchstartEvent)
        optionsPart.removeEventListener('touchmove', optionTitleTouchmoveEvent)
        optionsPart.removeEventListener('touchend', optionTitleTouchendEvent)
    }
}




if (window.innerWidth < 700) {
    removeOptionFuncForPC()
    optionsPart.querySelector('div').style.transform = `translateX(0px)`
    optionsPart.querySelector('div').style.transition = `.3s`

    optionsPart.addEventListener("touchstart", optionTitleTouchstartEvent)
    optionsPart.addEventListener("touchmove", optionTitleTouchmoveEvent)
    optionsPart.addEventListener("touchend", optionTitleTouchendEvent)
} else {
    removeOptionFuncForMobile()
    optionsPart.querySelector('div').removeAttribute('style')

    for (optionTitle of optionTitles) {
        optionTitle.addEventListener('click', optionTitleClickEvent)
    }
}

window.addEventListener('resize', function () {
    if (window.innerWidth < 700) {
        removeOptionFuncForPC()
        // optionsPart.querySelector('div').style.transform = `translateX(0px)`
        optionsPart.querySelector('div').style.transform = `translateX(${-document.querySelector('#about_me [data-clicked]').parentNode.offsetLeft}px)`

        optionsPart.querySelector('div').style.transition = `.3s`

        optionsPart.addEventListener("touchstart", optionTitleTouchstartEvent)
        optionsPart.addEventListener("touchmove", optionTitleTouchmoveEvent)
        optionsPart.addEventListener("touchend", optionTitleTouchendEvent)
    } else {
        removeOptionFuncForMobile()
        optionsPart.querySelector('div').removeAttribute('style')

        for (optionTitle of optionTitles) {
            optionTitle.addEventListener('click', optionTitleClickEvent)
        }
    }
})