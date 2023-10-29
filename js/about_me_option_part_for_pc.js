let optionTitles = document.querySelectorAll('#about_me .options_part dt')
let paragraphFrame = document.querySelector('#about_me figure.paragraph')
let descBox = document.querySelector('#about_me .desc_box')
let imgsBox = document.querySelector('#about_me .imgs_box')
let imgsCssStyle = document.querySelector('[data-about-me-imgs-style]')
let basicDuration = Number(getComputedStyle(document.querySelector('#about_me .desc_box')).animationDuration.replace('s', '')) * 1000

for (optionTitle of optionTitles) {
    optionTitle.addEventListener('click', function () {
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
    })
}


let paraContents = {
    education: {
        para: `我畢業於僑光科技大學應用英語系，是的你沒看錯，別看我現在這樣，搞得自己好像是設計本科系出身一樣，當初我和許多應屆畢業生一樣，不知道畢業後要做什麼，到底是要繼續念書? 還是要去工作?
        如果去工作要找什麼工作?
        那時我腦中每天都被這些聲音困擾著...<br><br>

        突然有一天，一位朋友說他想去上電繪課，但一個人上課太過孤單，於是就問我有沒有興趣一起去上?<br><br>

        當時第一次聽到「電繪」這個詞彙時，我完全不知道這是一個什麼樣的課程，於是帶著好奇心上網找了一下資料和一些影片，那時看著影片的我瞬間就被吸引住了，心裡不假思索地想著〝就是它了〞，於是我在畢業前的最後一年，一邊致力於畢業專題英文論文，一邊開始挑戰著電繪課程，度過了一段最充實(<del>累死人</del>)的學生時光，也開啟了我的設計職涯。`,

        imgs: `<div class="img_frame"><img src="./img/education-01.jpg"></div>
    <div class="img_frame"><img src="./img/education-02.jpg"></div>
    <div class="img_frame"><img src="./img/education-03.jpg"></div>`,
    },
    experience: {
        para: `在我豐富的工作經歷中，我曾在多個不同領域積累了寶貴的經驗。起初，我進入了一家新創公司，這段經歷讓我學會了創新和快速適應市場的能力。在那裡，我參與了多個項目的開發，不僅深化了我的技術知識，還養成了團隊合作和解決問題的能力。

        後來，我加入了一家跨國企業，擔任了一個關鍵職位。在這個崗位上，我負責管理複雜的專案，與國際團隊合作，成功推動了多個高價值項目。這段經歷讓我學到了有效的領導和協作，也讓我更好地理解了不同文化間的業務運作方式。
        
        近年來，我在一家新興科技公司擔任高級技術顧問。這份工作讓我深入了解了人工智能、大數據和機器學習等前沿技術。我負責指導團隊開發創新性產品，同時也與客戶合作，提供量身定制的解決方案。這段經歷不僅挑戰了我的技術能力，還鍛煉了我的市場洞察力和客戶服務技能。
        
        這些工作經歷不僅豐富了我的專業知識，也讓我培養了解決問題和承擔責任的能力。我對於新挑戰充滿了熱情，期待著在未來的工作中繼續發揮我的專長與經驗，並為公司的成功貢獻力量。`,

        imgs: `<div class="img_frame"><img src="./img/experience-01.jpg"></div>
        <div class="img_frame"><img src="./img/experience-02.jpg"></div>
        <div class="img_frame"><img src="./img/experience-03.jpg"></div>`,
    },
    about_now: {
        para: `<div>ddd</div>`,

        imgs: `<div class="img_frame"><img src="./img/education-01.jpg"></div>
    <div class="img_frame"><img src="./img/education-02.jpg"></div>
    <div class="img_frame"><img src="./img/education-03.jpg"></div>`,
    }
}