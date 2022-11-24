// page init
function init(cardsPerPage, index) {
    let totalCards = data.length;
    console.log("There are " + totalCards + " total cards");
    let nrPages = Math.ceil(totalCards / cardsPerPage);
    console.log("At " + cardsPerPage + " there are " + nrPages + " pages");

    cardsContainer.textContent = "";
    pagesContainer.textContent = "";

    createPages(cardsPerPage, index);
}

// page creation
function createPages(cardsPerPage, start) {
    let totalCards = data.length;
    console.log("There are " + totalCards + " total cards");
    let nrPages = Math.ceil(totalCards / cardsPerPage);
    console.log("At " + cardsPerPage + " there are " + nrPages + " pages");
    for (let i = 0; i < nrPages; i++) {
        console.log("yey" + i);
        generatePage(i + 1, Math.round(start / cardsPerPage));
    }
    loadCards(data, start, cardsPerPage);
}
function generatePage(pageNumber, currentPage) {
    let article = document.createElement("article");
    let page = document.createElement("p");

    article.classList.add("page-element", "box", "page-" + pageNumber);
    page.classList.add("page-element", "page-number", "page-" + pageNumber);
    console.log(page);
    console.log(currentPage + 1);
    if (pageNumber == currentPage + 1) {
        article.classList.add("current-page");
    }

    page.textContent = pageNumber;

    article.appendChild(page);
    pagesContainer.appendChild(article);

    console.log("Generated page:");
    console.log(article);
}

// card loading
function loadCards(arr, start, amount) {
    console.log("LOADING ALL CARDS...");

    let lowerLimit = 0;
    let upperLimit = 0;

    if (start <= 0 || start >= arr.length) {
        lowerLimit = 0;
    } else {
        lowerLimit = start;
    }

    console.log("Starting index: " + lowerLimit);

    if (amount <= 0 || amount > lowerLimit + arr.length) {
        upperLimit = arr.length;
    } else {
        upperLimit = amount + lowerLimit;
    }

    console.log("Ending index: " + upperLimit);

    if (lowerLimit < upperLimit) {
        for (let i = lowerLimit; i < upperLimit; i++) {
            createCard(arr[i]);
        }
    } else {
        createCard(arr[lowerLimit]);
    }
}
function createCard(input) {
    // generate elements [article, portrait, name, email, horizontalLine, joinDate]
    let cardElements = generateCardElements(input);

    // console.log(cardElements);

    cardElements.article.appendChild(cardElements.portrait);
    cardElements.article.appendChild(cardElements.name);
    cardElements.article.appendChild(cardElements.email);
    cardElements.article.appendChild(cardElements.horizontalLine);
    cardElements.article.appendChild(cardElements.joinDate);

    cardsContainer.appendChild(cardElements.article);
}
function generateCardElements(item) {
    // console.log(item);

    // declare elements
    let article = document.createElement("article");
    let portrait = document.createElement("img");
    let name = document.createElement("h2");
    let email = document.createElement("p");
    let horizontalLine = document.createElement("hr");
    let joinDate = document.createElement("p");

    // populate elements

    // COMMON CLASSES CARDS
    let commonClasses = document.createElement("p").classList;
    commonClasses.add(item.name.first + "-" + item.name.last, "card");

    // -- article
    article.classList = commonClasses;

    // COMMON CLASSES CARD-ITEMS
    commonClasses.remove("card");
    commonClasses.add("card-item");

    // -- portrait
    portrait.classList = commonClasses;
    portrait.classList.add("portrait");
    portrait.src = item.picture.thumbnail;
    portrait.alt = "thumbnail-" + item.name.first + "-" + item.name.last;

    // -- name
    name.textContent = item.name.first + " " + item.name.last;
    name.classList = commonClasses;
    name.classList.add("name");

    if ((item.name.first + " " + item.name.last).length >= 15) {
        name.classList.add("double-line");
    }

    // -- email
    email.textContent = item.email;
    email.classList = commonClasses;
    email.classList.add("email");

    // // -- horizontal line
    horizontalLine.classList = commonClasses;
    horizontalLine.classList.add("horizontal-line");

    // -- join date
    joinDate.textContent = "Joined on " + item.registered.date;
    joinDate.classList = commonClasses;
    joinDate.classList.add("join-date");

    // control
    console.log(
        " - Card of " + item.name.first + " " + item.name.last + " generated."
    );

    return { article, portrait, name, email, horizontalLine, joinDate };
}

// maximize card
function maximizeCard(card) {
    let cardItems = card.children;
    let email = cardItems[2].textContent;

    let cardInfo = retrieveCardInfo(email);
    generateMaxiCard(cardInfo);
}
function generateMaxiCard(cardInfo) {
    let elements = generateMaximizedElements(cardInfo);
    console.log(elements);

    elements.article.appendChild(elements.closeButton);
    elements.article.appendChild(elements.portrait);
    elements.article.appendChild(elements.name);
    elements.article.appendChild(elements.email);
    elements.article.appendChild(elements.horizontalLine);
    elements.article.appendChild(elements.joinDate);
    elements.article.appendChild(elements.age);

    maximizedWindow.appendChild(elements.article);
    stylizeMaxiWindow(maximizedWindow);
    stylizeMaxiCard(elements.article);
    stylizeMaxiClose(elements.closeButton);
}
function getCard(element) {
    let classes = element.classList;
    if (classes.contains("card")) {
        return element;
    } else if (classes.contains("card-item")) {
        return element.parentNode;
    } else {
        return null;
    }
}
function generateMaximizedElements(item) {
    let thumbnailCardElements = generateCardElements(item);

    let article = thumbnailCardElements.article;
    let portrait = thumbnailCardElements.portrait;
    let name = thumbnailCardElements.name;
    let email = thumbnailCardElements.email;
    let horizontalLine = thumbnailCardElements.horizontalLine;
    let joinDate = thumbnailCardElements.joinDate;
    let age = document.createElement("p");
    let closeButton = document.createElement("img");

    // populate elements
    portrait.src = item.picture.large;
    age.textContent = "Account age: " + item.registered.age + " years";
    closeButton.src = "pictures/close.png";

    // classes refactor for normal card items
    let elements = { portrait, name, email, horizontalLine, joinDate };

    let arr = Object.values(elements);

    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.replace("card-item", "maxi-card-item");
    }

    Object.assign(elements, { article, age, closeButton });

    // class refactor for article class
    article.classList.replace("card", "maxi-card");

    // classes for new elements
    let commonClasses = document.createElement("p").classList;
    copyClasses(name.classList, commonClasses);
    commonClasses.remove("name");

    age.classList = commonClasses;
    age.classList.add("age");

    closeButton.classList = commonClasses;
    closeButton.classList.add("close");

    // return
    return elements;
}
function retrieveCardInfo(email) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].email == email) {
            return data[i];
        }
    }
    return null;
}

// stylize maxi card functions
function stylizeMaxiWindow(window) {
    let style = window.style;

    style.position = "fixed";
    style.top = "0";
    style.left = "0";
    style.height = "100%";
    style.width = "100%";
    style.backgroundColor = "rgba(142, 134, 135, 0.5)";
    style.display = "flex";
    style.flexDirection = "column";
    style.alignContent = "center";
    style.justifyContent = "center";
    style.alignItems = "center";
    style.justifyItems = "center";
}
function stylizeMaxiCard(card) {
    let style = card.style;

    style.width = "400px";
    style.height = "400px";
    style.boxShadow = "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px";
    style.borderRadius = "5px";
    style.backgroundColor = "white";
    style.display = "flex";
    style.gap = "0px";
    style.flexDirection = "column";
    style.justifyContent = "flex-start";
    style.alignContent = "center";
    style.justifyItems = "center";
    style.alignItems = "center";
    style.padding = "15px";
    style.borderTopRightRadius = "25px";
}
function stylizeMaxiClose(item) {
    let style = item.style;
}

// helpers
function copyClasses(from, to) {
    for (let i = 0; i < from.length; i++) {
        to.add(from[i]);
    }
}
