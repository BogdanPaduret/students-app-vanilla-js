let cardsContainer = document.querySelector(
    "main section.cards-list.container"
);
let maximizedWindow = document.querySelector("main section.maximized");
let pagesContainer = document.querySelector("footer section.pages.container");

let cardsPerPage = 5;
let totalCards = data.length;
let totalPages = Math.ceil(totalCards / cardsPerPage);

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
    if (element.classList.contains("page-number")) {
        selectedPage = parseInt(element.textContent);
    } else {
        selectedPage = parseInt(
            element.querySelector(".page-number").textContent
        );
    }
    changePage(selectedPage);
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
            closeMaxiCard();
        } else if (e.key == "ArrowLeft") {
            goToLeft(cardIndex);
        } else if (e.key == "ArrowRight") {
            goToRight(cardIndex);
        } else if (e.key == "Enter") {
            console.log("EDIT PROFILE!");
        }
    } else {
        let currentPageIndex = parseInt(
            document.querySelector(".current-page.page-number").textContent
        );

        if (e.key == "ArrowLeft" && currentPageIndex > 1) {
            console.log("TO PREVIOUS PAGE");
            changePage(currentPageIndex - 1);
        } else if (e.key == "ArrowRight" && currentPageIndex < totalPages) {
            console.log("TO NEXT PAGE");
            changePage(currentPageIndex + 1);
        }
    }
});
