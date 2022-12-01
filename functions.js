// app calls
function init(cardsPerPage, cardIndex) {
    cardsContainer.textContent = "";
    pagesContainer.textContent = "";

    totalCards = data.length;
    totalPages = Math.ceil(totalCards / cardsPerPage);

    console.log(cardsPerPage);

    createPages(cardsPerPage, cardIndex);
}
function closeMaxiCard() {
    maximizedWindow.textContent = "";
    maximizedWindow.removeAttribute("style");
}
function goToLeft(cardIndex) {
    let prevIndex = cardIndex - 1;
    if (prevIndex >= 0) {
        maximizedWindow.textContent = "";
        let cardInfo = data[cardIndex - 1];
        generateMaxiCard(cardInfo, cardIndex - 1);
    }
}
function goToRight(cardIndex) {
    let nextIndex = cardIndex + 1;
    if (nextIndex < totalCards) {
        maximizedWindow.textContent = "";
        let cardInfo = data[nextIndex];
        generateMaxiCard(cardInfo, nextIndex);
    }
}

// page creation
function createPages(cardsPerPage, cardIndex) {
    console.log("There are " + totalCards + " total cards");
    console.log(
        "At " +
            cardsPerPage +
            " cards per page there are " +
            totalPages +
            " pages"
    );
    for (let i = 0; i < totalPages; i++) {
        generatePage(i + 1, Math.round(cardIndex / cardsPerPage));
    }
    // console.log(cardIndex);
    loadCards(data, cardIndex, cardsPerPage);
}
function generatePage(pageNumber, currentPage) {
    let article = document.createElement("article");
    let page = document.createElement("p");

    article.classList.add("page-element", "box", "page-" + pageNumber);
    page.classList.add("page-element", "page-number", "page-" + pageNumber);

    if (pageNumber == currentPage + 1) {
        article.classList.add("current-page");
        page.classList.add("current-page");
    }

    page.textContent = pageNumber;

    article.appendChild(page);
    pagesContainer.appendChild(article);

    console.log("Generated button for page: " + pageNumber);
}
function changePage(pageNumber) {
    let cardIndex = (pageNumber - 1) * cardsPerPage;
    init(cardsPerPage, cardIndex);
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

    if (amount <= 0 || amount > arr.length - lowerLimit) {
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
    portrait.style.webkitUserDrag = "none";

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

    let index = retrieveCardIndex(email, 0);
    let cardInfo = data[index];
    generateMaxiCard(cardInfo, index);
}
function buildMaxiCard(cardInfo, index) {
    let card = generateMaximizedElements(cardInfo);

    card.article.appendChild(card.upperContainer);
    card.article.appendChild(card.leftContainer);
    card.article.appendChild(card.mainContainer);
    card.article.appendChild(card.rightContainer);
    card.article.appendChild(card.lowerContainer);

    card.upperContainer.appendChild(card.closeButton);

    card.mainContainer.appendChild(card.portrait);
    card.mainContainer.appendChild(card.name);
    card.mainContainer.appendChild(card.email);
    card.mainContainer.appendChild(card.horizontalLine);
    card.mainContainer.appendChild(card.joinDate);
    card.mainContainer.appendChild(card.age);

    if (index != 0) {
        card.leftContainer.appendChild(card.leftArrow);
    } else {
        card.rightArrow.style.bottom = "150px";
    }
    if (index != totalCards - 1) {
        card.rightContainer.appendChild(card.rightArrow);
    }

    card.lowerContainer.appendChild(card.editButton);

    styleMaxiCard(card);

    card.article.draggable = "true";

    return card.article;
}
function generateMaxiCard(cardInfo, index) {
    let cardArticle = buildMaxiCard(cardInfo, index);

    maximizedWindow.appendChild(cardArticle);
    styleMaxiWindow(maximizedWindow);
}
function getCard(element) {
    let classes = element.classList;
    if (classes.contains("card") || classes.contains("maxi-card")) {
        return element;
    } else if (
        classes.contains("card-item") ||
        classes.contains("maxi-card-item")
    ) {
        return element.parentNode;
    } else {
        return null;
    }
}
function getMaxiCard(element) {
    while (!element.classList.contains("maximized")) {
        let classes = element.classList;
        if (classes.contains("maxi-card")) {
            return element;
        }
        element = element.parentNode;
    }
    return null;
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
    let editButton = document.createElement("button");

    let leftArrow = generateArrow(-1);
    let rightArrow = generateArrow(1);

    // containers
    let mainContainer = document.createElement("div");
    let upperContainer = document.createElement("div");
    let lowerContainer = document.createElement("div");
    let leftContainer = document.createElement("div");
    let rightContainer = document.createElement("div");

    // populate elements
    portrait.src = item.picture.large;
    age.textContent = "Account age: " + item.registered.age + " years";
    closeButton.src = "pictures/close.png";
    editButton.textContent = "Edit profile";

    // classes refactor for normal card items
    let elements = { portrait, name, email, horizontalLine, joinDate };

    let arr = Object.values(elements);

    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.replace("card-item", "maxi-card-item");
    }

    Object.assign(elements, {
        article,
        age,
        closeButton,
        leftArrow,
        rightArrow,
        editButton,
        mainContainer,
        upperContainer,
        lowerContainer,
        leftContainer,
        rightContainer,
    });

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

    leftArrow.classList = commonClasses;
    leftArrow.classList.add("arrow", "left");

    rightArrow.classList = commonClasses;
    rightArrow.classList.add("arrow", "right");

    editButton.classList = commonClasses;
    editButton.classList.add("edit");

    mainContainer.classList = commonClasses;
    mainContainer.classList.add("main-container");

    upperContainer.classList = commonClasses;
    upperContainer.classList.add("upper-container");

    lowerContainer.classList = commonClasses;
    lowerContainer.classList.add("lower-container");

    leftContainer.classList = commonClasses;
    leftContainer.classList.add("left-container");

    rightContainer.classList = commonClasses;
    rightContainer.classList.add("right-container");

    // return
    return elements;
}
function retrieveCardInfo(email, offset) {
    let index = retrieveCardIndex(email, offset);

    if (index != null) {
        return data[index];
    } else {
        return index;
    }
}
function retrieveCardIndex(email, offset) {
    for (let i = 0; i < totalCards; i++) {
        if (data[i].email == email) {
            return i + offset;
        }
    }
    return null;
}
function generateArrow(arrowDirection) {
    let arrow = document.createElement("img");
    arrow.src = "/pictures/arrow.png";
    arrow.style.height = "50px";
    arrow.style.webkitUserDrag = "none";

    if (arrowDirection < 0) {
        arrow.style.transform = "scaleX(-1)";
    }
    return arrow;
}

// stylize maxi card functions
function styleMaxiWindow(window) {
    let style = window.style;

    style.position = "fixed";
    style.top = "0";
    style.left = "0";
    style.height = "100%";
    style.width = "100%";
    style.backgroundColor = "rgba(142, 134, 135, 0.5)";
    style.display = "flex";
    style.flexDirection = "row";
    style.alignContent = "center";
    style.justifyContent = "center";
    style.alignItems = "center";
    style.justifyItems = "center";
    style.gap = "30px";
}
function styleMaxiCard(card) {
    styleMaxiArticle(card.article);
    styleMaxiContainers(card);

    styleMaxiClose(card.closeButton);
    styleMaxiPortrait(card.portrait);
    styleMaxiName(card.name);
    styleMaxiEmail(card.email);
    styleMaxiHorizontalLine(card.horizontalLine);
    styleMaxiJoinDate(card.joinDate);

    styleEditButton(card.editButton);
}

function styleMaxiArticle(cardArticle) {
    let style = cardArticle.style;

    style.width = "400px";
    style.height = "400px";
    style.boxShadow = "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px";
    style.borderRadius = "5px";
    style.backgroundColor = "white";

    style.display = "grid";
    style.gridTemplateColumns = "50px 270px 50px";
    style.gridTemplateRows = "20px 320px 30px";

    style.gridTemplateAreas = '"up up up" "le ma ri" "lo lo lo"';

    style.gap = "0px";
    style.alignContent = "center";
    style.justifyItems = "center";
    style.alignItems = "center";
    style.padding = "15px";
    style.borderTopRightRadius = "25px";
}
function styleMaxiContainers(card) {
    let main = card.mainContainer.style;
    let upper = card.upperContainer.style;
    let lower = card.lowerContainer.style;
    let left = card.leftContainer.style;
    let right = card.rightContainer.style;

    main.gridArea = "ma";
    upper.gridArea = "up";
    lower.gridArea = "lo";
    left.gridArea = "le";
    right.gridArea = "ri";

    main.width = "100%";
    main.height = "100%";
    main.display = "flex";
    main.flexDirection = "column";
    main.justifyContent = "flex-start";
    main.alignContent = "center";
    main.justifyItems = "center";
    main.alignItems = "center";

    upper.width = "100%";
    upper.height = "100%";
    upper.display = "flex";
    upper.flexDirection = "row-reverse";

    left.height = "100%";
    left.display = "flex";
    left.flexDirection = "column";
    left.alignContent = "center";
    left.justifyContent = "center";

    right.height = "100%";
    right.display = "flex";
    right.flexDirection = "column";
    right.alignContent = "center";
    right.justifyContent = "center";

    lower.width = "100%";
    lower.height = "100%";
    lower.display = "flex";
    lower.flexDirection = "row";
    lower.alignContent = "center";
    lower.justifyContent = "center";
}

function styleMaxiClose(item) {
    let style = item.style;

    style.width = "20px";
    style.height = "20px";
    style.margin = "0px";
    style.webkitUserDrag = "none";

    // style.alignSelf = "flex-start";
}
function styleMaxiPortrait(portrait) {
    let s = portrait.style;

    s.width = "150px";
    s.height = "150px";
    s.objectFit = "cover";
    s.borderRadius = "50%";
    s.margin = "00px 0px 10px 0px";
    s.webkitUserDrag = "none";
}
function styleMaxiName(name) {
    let s = name.style;

    if (name.textContent.length < 15) {
        s.fontSize = "32px";
        s.margin = "2.5px 0px";
    } else {
        s.fontSize = "28px";
        s.margin = "5px 0px";
    }
}
function styleMaxiEmail(email) {
    let s = email.style;

    s.margin = "2.5px 0px 0px 0px";
}
function styleMaxiHorizontalLine(horizontalLine) {
    let s = horizontalLine.style;

    s.width = "100%";
    s.height = "0px";
    s.margin = "20px 0px";
}
function styleMaxiJoinDate(joinDate) {
    let s = joinDate.style;

    s.margin = "0px 0px 5px 0px";
}
// does nothing currently since the edit button is styled through CSS
function styleEditButton(editButton) {}

// edit maxi card
function editMaxiCard(cardInfo, cardIndex) {
    buildEditCard(cardInfo, cardIndex);
    let card = maximizedWindow.querySelector("article.maxi-card");
    console.log(card.classList);
    card.classList.replace("maxi-card", "edit-card");
    console.log(card.classList);
}
function saveMaxiCard(cardInfo, cardIndex) {}
function buildEditCard(cardInfo, index) {
    let inputCard = generateInputElements(cardInfo, index);
    maximizedWindow.textContent = "";
    maximizedWindow.appendChild(inputCard);
}
function generateInputElements(cardInfo, index) {
    let card = buildMaxiCard(cardInfo, index);
    let mainContainer = card.querySelector(".main-container");

    let leftContainer = card.querySelector(".left-container");
    let rightContainer = card.querySelector(".right-container");

    // card.style.gridTemplateAreas = '"up up up" "ma ma ma" "lo lo lo"';

    // card.removeChild(leftContainer);
    // card.removeChild(rightContainer);

    leftContainer.style.visibility = "hidden";
    rightContainer.style.visibility = "hidden";

    let mcName = mainContainer.querySelector(".name");
    let mcEmail = mainContainer.querySelector(".email");

    let name = document.createElement("input");
    name.classList = mcName.classList;
    name.type = "text";
    name.value = mcName.textContent;
    name.style.fontSize = "20px";
    name.style.fontWeight = "bold";
    name.style.fontStyle = "italic";
    name.style.width = "120%";
    name.style.height = "37px";
    name.style.margin = "2.5px 0px";
    name.style.border = "0px";
    name.style.borderBottom = "2px solid rgb(128, 128, 128)";
    name.style.borderBottomLeftRadius = "5px";
    name.style.borderBottomRightRadius = "5px";
    name.style.outline = "none";
    name.style.textAlign = "center";

    let email = document.createElement("input");
    email.classList = mcEmail.classList;
    email.type = "text";
    email.value = mcEmail.textContent;
    email.style.fontSize = "14px";
    email.style.fontWeight = "normal";
    email.style.fontStyle = "italic";
    email.style.height = "18px";
    email.style.width = "120%";
    email.style.margin = "2.5px 0px 0px 0px";
    email.style.border = "0px";
    email.style.borderBottom = "2px solid rgb(128, 128, 128)";
    email.style.borderBottomLeftRadius = "5px";
    email.style.borderBottomRightRadius = "5px";
    email.style.outline = "none";
    email.style.textAlign = "center";

    let button = card.querySelector(".lower-container").querySelector(".edit");

    button.classList.replace("edit", "save");
    button.textContent = "Save Modifications";

    mainContainer.replaceChild(name, mcName);
    mainContainer.replaceChild(email, mcEmail);

    return card;
}

// helpers
function copyClasses(from, to) {
    for (let i = 0; i < from.length; i++) {
        to.add(from[i]);
    }
}
