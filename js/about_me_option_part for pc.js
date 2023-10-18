let optionTitles = document.querySelectorAll('#about_me .options_part dt')

for (optionTitle of optionTitles) {
    optionTitle.addEventListener('click', function () {
        for (let i = 0; i < optionTitles.length; i++) {
            optionTitles[i].removeAttribute("data-clicked")
            optionTitles[i].nextElementSibling.removeAttribute("data-showed")
        }

        this.setAttribute("data-clicked", "")
        this.nextElementSibling.setAttribute("data-showed", "")
    })
}