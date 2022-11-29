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
    let classes = element.classList;
    // console.log(classes);
    let card = getMaxiCard(element);

    if (classes.contains("close")) {
        closeMaxiCard();
    } else if (card != null) {
        console.log("CARD NOT NULL!");

        let cardItems = card.children[2].children;
        let email = cardItems[2].textContent;
        let cardIndex = retrieveCardIndex(email, 0);

        if (cardIndex != null) {
            console.log("CARD INDEX NOT NULL!!");

            if (classes.contains("arrow")) {
                if (classes.contains("left") && cardIndex > 0) {
                    goToLeft(cardIndex);
                } else if (classes.contains("right")) {
                    goToRight(cardIndex);
                }
            } else if (element.tagName == "BUTTON") {
                console.log("BUTTON!");
                if (classes.contains("edit")) {
                    let cardInfo = data[cardIndex];
                    editMaxiCard(cardInfo, cardIndex);
                } else if (classes.contains("save")) {
                    console.log("should save these modifications somewhere");
                }
            }
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

// key presses
document.addEventListener("keydown", (e) => {
    if (
        maximizedWindow.textContent != "" &&
        maximizedWindow.textContent.length > 22
    ) {
        let card = maximizedWindow.querySelector("article.maxi-card");

        let cardItems = card.children[2].children;
        let email = cardItems[2].textContent;
        let cardIndex = retrieveCardIndex(email, 0);

        if (e.key == "Escape") {
            // alert("ESCAPE" + maximizedWindow.textContent.length);
            closeMaxiCard();
        } else if (e.key == "ArrowLeft") {
            goToLeft(cardIndex);
        } else if (e.key == "ArrowRight") {
            goToRight(cardIndex);
        } else if (e.key == "Enter") {
            console.log("EDIT PROFILE!");
        }
    } else {
        if (e.key == "ArrowLeft") {
            console.log("TO PREVIOUS PAGE");
        } else if (e.key == "ArrowRight") {
            console.log("TO NEXT PAGE");
        }
    }
});
