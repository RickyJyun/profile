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
            } else if (count > creationsDisplayBox.clientWidth - this.window.innerWidth) {
                count = creationsDisplayBox.clientWidth - this.window.innerWidth
                creationsDisplayBox.style.transform = `translateX(-${count}px)`
            }
        }, 100)
    })

})()