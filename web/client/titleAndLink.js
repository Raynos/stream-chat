module.exports = renderTitleAndLink

function renderTitleAndLink(root) {
    var title = document.createElement("div")
        , description = document.createElement("div")
        , githubLink = document.createElement("a")

    githubLink.href = "https://github.com/Raynos/stream-chat"
    title.textContent = "welcome to stream chat!"
    description.textContent = "Experimental chat room build on streams. Try joining the test room!"

    root.appendChild(title)
    root.appendChild(description)
    root.appendChild(githubLink)
}