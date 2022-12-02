let cardsContainer = document.querySelector(
    "main section.cards-list.container"
);
let maximizedWindow = document.querySelector("main section.maximized");
let pagesContainer = document.querySelector("footer section.pages.container");

let cardsPerPage = 5;
let totalCards = data.length;
let totalPages = Math.ceil(totalCards / cardsPerPage);

maximizedWindow.style.visibility = "hidden";

init(cardsPerPage, 0);

// thumbnail cards click events
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

// maxi cards click events
maximizedWindow.addEventListener("click", (e) => {
    let element = e.target;
    let classes = element.classList;
    let card = getMaxiCard(element);

    if (classes.contains("close")) {
        closeMaxiCard();
    } else if (card != null && card.classList.contains("maxi-card")) {
        let email = card
            .querySelector(".main-container")
            .querySelector(".email").textContent;
        let cardIndex = retrieveCardIndex(email, 0);

        if (cardIndex != null) {
            if (classes.contains("arrow")) {
                if (classes.contains("left") && cardIndex > 0) {
                    goToLeft(cardIndex);
                } else if (classes.contains("right")) {
                    goToRight(cardIndex);
                }
            } else if (element.tagName == "BUTTON") {
                if (classes.contains("edit")) {
                    editMaxiCard(card, cardIndex);
                }
            } else if (classes.contains("delete")) {
                deleteMaxiCard(card);
            }
        }
    } else if (card != null && card.classList.contains("edit-card")) {
        if (element.tagName == "BUTTON") {
            if (classes.contains("save")) {
                saveMaxiCard(card);
            }
        }
    }
});

// pages click events
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
        let card = maximizedWindow.querySelector(".maxi-card");
        if (card == null) {
            card = maximizedWindow.querySelector(".edit-card");
        }

        if (card != null) {
            let email = card.querySelector("* .email").textContent;
            let cardIndex = retrieveCardIndex(email, 0);

            if (e.key == "Escape") {
                closeMaxiCard();
            } else if (card.classList.contains("maxi-card")) {
                if (e.key == "ArrowLeft") {
                    goToLeft(cardIndex);
                } else if (e.key == "ArrowRight") {
                    goToRight(cardIndex);
                } else if (e.key == "Enter") {
                    editMaxiCard(card, cardIndex);
                } else if (e.key == "Delete") {
                    deleteMaxiCard(card);
                }
            } else if (card.classList.contains("edit-card")) {
                if (e.key == "Enter") {
                    saveMaxiCard(card);
                }
            }
        }
    } else {
        let currentPageIndex = parseInt(
            document.querySelector(".current-page.page-number").textContent
        );

        if (e.key == "ArrowLeft" && currentPageIndex > 1) {
            changePage(currentPageIndex - 1);
        } else if (e.key == "ArrowRight" && currentPageIndex < totalPages) {
            changePage(currentPageIndex + 1);
        } else if (e.key == "Enter") {
            console.log("SHOULD ADD NEW CARD!");
        } else if (e.key == "ArrowUp") {
            if (cardsPerPage < totalCards) {
                cardsPerPage++;
            } else {
                alert(
                    "There can be at most " +
                        totalCards +
                        " cards per page as these are all the cards."
                );
            }
            init(cardsPerPage, 0);
        } else if (e.key == "ArrowDown") {
            if (cardsPerPage > 1) {
                cardsPerPage--;
            } else {
                alert("There should be at least one card per page.");
            }
            init(cardsPerPage, 0);
        }
    }
});
