// thumbnail cards variables
let cardsContainer = document.querySelector(
    "main section.cards-list.container"
);

// maximized card variables
let maximizedWindow = document.querySelector("main section.maximized");

// pages variables
let pagesContainer = document.querySelector("footer section.pages.container");
let btnAdd = document.querySelector(
    "main section.buttons.container button.add-card"
);
let dataTemp = [];
Object.assign(dataTemp, data);
let cardsPerPage = 5;
let totalCards = dataTemp.length;
let totalPages = Math.ceil(totalCards / cardsPerPage);

// filter variables
let filterStartDate = document.querySelector(
    "main section.control.container article.filter.container div.filter-date-start.container #filter-date-start"
);
let filterEndDate = document.querySelector(
    "main section.control.container article.filter.container div.filter-date-end.container #filter-date-end"
);
let btnFilter = document.querySelector(
    "main section.control.container article.filter.container div.filter.buttons button.filter-all"
);

// search variables
let searchQueueName = document.querySelector(
    "main section.control.container article.search.container div.search-name.container #search-name"
);
let btnSearch = document.querySelector(
    "main section.control.container article.search.container div.search.buttons button.search-all"
);

// site init calls
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
        let cardIndex = getCardIndex(email, 0);

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
    } else if (card != null && card.classList.contains("new-card")) {
        if (element.tagName == "BUTTON") {
            if (classes.contains("add")) {
                addNewUser(card);
            }
        } else if (element.classList.contains("portrait")) {
            uploadPicture(card);
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

// add button click event
btnAdd.addEventListener("click", () => {
    addCard();
});

// key presses
document.addEventListener("keydown", (e) => {
    if (maximizedWindow.querySelectorAll("article").length > 0) {
        let card = maximizedWindow.querySelector(".maxi-card");
        if (card == null) {
            card = maximizedWindow.querySelector(".edit-card");
        }
        if (card == null) {
            card = maximizedWindow.querySelector(".new-card");
        }

        if (card != null) {
            let email = card.querySelector("* .email").textContent;
            let cardIndex = getCardIndex(email, 0);

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
            } else if (card.classList.contains("new-card")) {
                if (e.key == "Enter") {
                    addNewUser();
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

// filter click events
btnFilter.addEventListener("click", () => {
    let newData = [...data];

    if (filterStartDate.value != "") {
        newData = trimOlder(newData, filterStartDate.value);
        dataTemp = [...newData];
    }
    if (filterEndDate.value != "") {
        newData = trimNewer(newData, filterEndDate.value);
    }

    dataTemp = [...newData];
    init(cardsPerPage, 0);
});

btnSearch.addEventListener("click", () => {
    let newArr = [...data];
    if (searchQueueName.value != "") {
        newArr = [...searchByName(newArr, searchQueueName.value)];
    }
    dataTemp = [...newArr];
    init(cardsPerPage, 0);
});
