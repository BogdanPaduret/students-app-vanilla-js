let cardsContainer = document.querySelector(
    "main section.cards-list.container"
);
let maximizedWindow = document.querySelector("main section.maximized");
let pagesContainer = document.querySelector("footer section.pages.container");

let cardsPerPage = 5;

init(cardsPerPage, 0);

cardsContainer.addEventListener("click", (e) => {
    let element = e.target;

    // let card=getCard();

    let elementClasses = element.classList;

    if (
        elementClasses.contains("card") ||
        elementClasses.contains("card-item")
    ) {
        let card = getCard(element);
        console.log(" ---------------- Selected card of:");
        console.log(card);
        maximizeCard(card);
    }
});

maximizedWindow.addEventListener("click", (e) => {
    let element = e.target;
    if (element.classList.contains("close")) {
        maximizedWindow
            .querySelector("article.maxi-card")
            .remove(":first-child");
        maximizedWindow.removeAttribute("style");
    }
});

pagesContainer.addEventListener("click", (e) => {
    let element = e.target;
    let classes = element.classList;
    if (classes.contains("page-element")) {
        if (!classes.contains("current-page")) {
            console.log("Page change!");
            let pageNumber = classes.item(2).split("-")[1];
            let index = (pageNumber - 1) * cardsPerPage;
            init(cardsPerPage, index);
        }
    }
});
