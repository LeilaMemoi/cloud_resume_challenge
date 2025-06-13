var footerContainer = document.querySelector(".footer-counter");

fetch('https://qz12b6la48.execute-api.eu-central-1.amazonaws.com/default/visitorCountFunction', {
    method: "POST"
})
.then((response) => response.json())
.then((json) => {
    footerContainer.innerHTML =json.visits; //text.replaceAll('"', '');
});