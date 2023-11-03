let creationsPart = document.querySelector('#about_creations .creations_part')
let previewImgbox = creationsPart.querySelector('.preview_imgbox')
let imgFrames = creationsPart.querySelectorAll('.img_frame')
let figures = creationsPart.querySelectorAll('figure')

creationsPart.addEventListener('mouseenter', function () {
    previewImgbox.classList.add('zoom_in')
})

creationsPart.addEventListener('mousemove', function (e) {
    // previewImgbox.style.top = `${e.pageY - document.querySelector('#about_creations').offsetTop - this.clientHeight * 0.58}px`
    previewImgbox.style.top = `${e.clientY}px`
})

creationsPart.addEventListener('mouseleave', function () {
    previewImgbox.classList.remove('zoom_in')
})

previewImgbox.addEventListener('mouseenter', function () {
    this.classList.remove('zoom_in')
})

for (let i = 0; i < figures.length; i++) {
    figures[i].setAttribute('data-order-num', i)
}

function resetimgFramesSize() {
    for (imgFrame of imgFrames) {
        imgFrame.style.width = previewImgbox.clientWidth + 'px'
        imgFrame.style.height = previewImgbox.clientHeight + 'px'
    }
}
resetimgFramesSize()

previewImgbox.children[0].style.transition = '.3s'

for (figure of figures) {
    figure.addEventListener('mouseenter', function () {
        previewImgbox.children[0].style.transform = `translateY(-${imgFrames[this.dataset.orderNum].offsetTop}px)`
    })
}

window.addEventListener('resize', resetimgFramesSize)