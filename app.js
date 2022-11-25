let cardsContainer = document.querySelector(
    "main section.cards-list.container"
);
let maximizedWindow = document.querySelector("main section.maximized");
let pagesContainer = document.querySelector("footer section.pages.container");

let cardsPerPage = 6;

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
    let classes = element.classList;
    // console.log(classes);
    if (classes.contains("close")) {
        maximizedWindow.textContent = "";
        maximizedWindow.removeAttribute("style");
    } else if (classes.contains("arrow")) {
        let card = getMaxiCard(element);
        let cardItems = card.children[2].children;
        let email = cardItems[2].textContent;
        let cardIndex = retrieveCardIndex(email, 0);

        if (classes.contains("left") && cardIndex > 0) {
            maximizedWindow.textContent = "";
            let cardInfo = data[cardIndex - 1];
            generateMaxiCard(cardInfo, cardIndex - 1);
        } else if (classes.contains("right")) {
            maximizedWindow.textContent = "";
            let cardInfo = data[cardIndex + 1];
            generateMaxiCard(cardInfo, cardIndex + 1);
        }
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
