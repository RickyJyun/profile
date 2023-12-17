let glitchAnimeCss01 = `<style>
@keyframes text-p-before_glitch-anime {

    0%,
    100% {
        clip-path: inset(50% 50% 50% 50%);
    }

    5%,
    95% {
        clip-path: inset(76% 15% 12% 12%);
    }

    10%,
    90% {
        clip-path: inset(58% 49% 18% 1%);
    }

    15%,
    85% {
        clip-path: inset(28% 58% 62% 44%);
    }

    20%,
    80% {
        clip-path: inset(77% 3% 32% 69%);
    }

    25%,
    75% {
        clip-path: inset(75% 1% 19% 44%);
    }

    30%,
    70% {
        clip-path: inset(34% 42% 31% 23%);
    }

    35%,
    65% {
        clip-path: inset(63% 30% 23% 13%);
    }

    40%,
    60% {
        clip-path: inset(36% 68% 10% 55%);
    }

    45%,
    55% {
        clip-path: inset(50% 7% 46% 65%);
    }

    50% {
        clip-path: inset(38% 53% 68% 2%);
    }
</style>`

let glitchAnimeCss02 = `<style>
@keyframes text-p-after_glitch-anime {

    0%,
    100% {
        clip-path: inset(50% 50% 50% 50%);
    }

    5%,
    95% {
        clip-path: inset(74% 66% 24% 49%);
    }

    10%,
    90% {
        clip-path: inset(22% 60% 21% 9%);
    }

    15%,
    85% {
        clip-path: inset(15% 53% 15% 30%);
    }

    20%,
    80% {
        clip-path: inset(55% 13% 30% 65%);
    }

    25%,
    75% {
        clip-path: inset(60% 45% 70% 30%);
    }

    30%,
    70% {
        clip-path: inset(25% 56% 50% 15%);
    }

    35%,
    65% {
        clip-path: inset(70% 3% 71% 17%);
    }

    40%,
    60% {
        clip-path: inset(9% 55% 49% 34%);
    }

    45%,
    55% {
        clip-path: inset(27% 24% 69% 2%);
    }

    50% {
        clip-path: inset(20% 11% 43% 65%);
    }
</style>`

function getRandomPercent() {
    let percent = Math.floor(Math.random() * (80 - 1 + 1) + 1)
    return percent + '%'
}

function getRandomTextOrder(max, min) {
    return Math.floor(Math.random() * (max - min + min) + min)
}

let textsList = ['GRAPHIC DESIGN', 'WEBSITE DESIGN', 'PRINT DESIGN', 'LANDING PAGE', 'UI/UX DESIGN']
let text = document.querySelector('#top_section .texts>p')
text.setAttribute('data-text', text.innerText)
let headTag = document.querySelector('head')
headTag.insertAdjacentHTML('beforeend', glitchAnimeCss01)
headTag.insertAdjacentHTML('beforeend', glitchAnimeCss02)

let previousOrderNum = getRandomTextOrder(textsList.length, 0)

setInterval(function () {
    text.parentNode.classList.add('change-text')
    text.querySelector('span').classList.add('hide')
    let orderNum = getRandomTextOrder(textsList.length, 0)

    setTimeout(function () {
        if (orderNum == previousOrderNum) {
            if (orderNum == textsList.length - 1) {
                orderNum--
                previousOrderNum = orderNum
            } else if (orderNum == 0) {
                orderNum++
                previousOrderNum = orderNum
            }
            else {
                orderNum--
                previousOrderNum = orderNum
            }
        } else {
            orderNum == orderNum
            previousOrderNum = orderNum
        }

        text.querySelector('span').innerText = textsList[orderNum]
        text.dataset.text = text.innerText

        setTimeout(function () {
            text.parentNode.classList.remove('change-text')
            text.querySelector('span').classList.remove('hide')
        }, 200)
    }, 650)
}, 8000)