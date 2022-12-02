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
    maximizedWindow.style.visibility = "hidden";
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
    console.log(card);
    let email = card.querySelector("* .email").textContent;

    let index = getCardIndex(email, 0);
    let cardInfo = data[index];
    generateMaxiCard(cardInfo, index);
}
function generateMaxiCard(cardInfo, index) {
    let cardArticle = buildMaxiCard(cardInfo, index);

    maximizedWindow.appendChild(cardArticle);
    maximizedWindow.style.visibility = "visible";
}
function buildMaxiCard(cardInfo, index) {
    let card = generateMaximizedElements(cardInfo);

    card.article.appendChild(card.upperContainer);
    card.article.appendChild(card.leftContainer);
    card.article.appendChild(card.mainContainer);
    card.article.appendChild(card.rightContainer);
    card.article.appendChild(card.lowerContainer);

    card.upperContainer.appendChild(card.closeButton);
    card.upperContainer.appendChild(card.deleteButton);

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
        if (classes.contains("maxi-card") || classes.contains("edit-card")) {
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
    let deleteButton = document.createElement("img");

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
    deleteButton.src = "pictures/delete.png";

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
        deleteButton,
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

    deleteButton.classList = commonClasses;
    deleteButton.classList.add("delete");

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
function getCardInfo(email, offset) {
    let index = getCardIndex(email, offset);

    if (index != null) {
        return data[index];
    } else {
        return index;
    }
}
function getCardIndex(email, offset) {
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

    if (arrowDirection < 0) {
        arrow.style.transform = "scaleX(-1)";
    }
    return arrow;
}

// stylize maxi-card functions
function styleMaxiCard(card) {
    styleMaxiName(card.name);
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

// edit maxi-card
function editMaxiCard(card, cardIndex) {
    buildEditCard(card);

    card.classList.replace("maxi-card", "edit-card");
}
function buildEditCard(card) {
    let inputElements = generateInputElements(card);

    let button = card.querySelector("* .edit");
    button.classList.replace("edit", "save");
    button.textContent = "Save Modifications";

    let mainContainer = card.querySelector(".main-container");

    let currentNameElement = mainContainer.querySelector(".name");
    let currentEmailElement = mainContainer.querySelector(".email");
    let currentJoinDateElement = mainContainer.querySelector(".join-date");
    let currentAgeElement = mainContainer.querySelector(".age");

    mainContainer.replaceChild(inputElements.name, currentNameElement);
    mainContainer.replaceChild(inputElements.email, currentEmailElement);
    mainContainer.replaceChild(inputElements.joinDate, currentJoinDateElement);
    mainContainer.replaceChild(inputElements.age, currentAgeElement);
}
function generateInputElements(card) {
    let mainContainer = card.querySelector(".main-container");

    let currentNameElement = mainContainer.querySelector(".name");
    let currentEmailElement = mainContainer.querySelector(".email");
    let currentJoinDateElement = mainContainer.querySelector(".join-date");
    let currentAgeElement = mainContainer.querySelector(".age");

    let nameInput = document.createElement("input");
    nameInput.classList = currentNameElement.classList;
    nameInput.type = "text";
    nameInput.placeholder = currentNameElement.textContent;

    let emailInput = document.createElement("input");
    emailInput.classList = currentEmailElement.classList;
    emailInput.type = "email";
    emailInput.placeholder = currentEmailElement.textContent;

    let joinDateInput = document.createElement("input");
    joinDateInput.classList = currentJoinDateElement.classList;
    joinDateInput.type = "date";
    // current date format mm-dd-yyyy
    let currentJoinDateValue = currentJoinDateElement.textContent
        .split(" ")[2]
        .split("-");
    joinDateInput.value =
        currentJoinDateValue[2] +
        "-" +
        currentJoinDateValue[0] +
        "-" +
        currentJoinDateValue[1];

    let ageInput = document.createElement("input");
    ageInput.classList = currentAgeElement.classList;
    ageInput.type = "number";
    ageInput.min = "0";
    let currentAgeValue = currentAgeElement.textContent.split(" ");
    ageInput.placeholder = currentAgeValue[2];

    let joinDateContainer = document.createElement("div");
    let joinDateDescription = document.createElement("p");
    joinDateDescription.textContent = "Joined on: ";
    joinDateContainer.classList = joinDateInput.classList;
    joinDateContainer.appendChild(joinDateDescription);
    joinDateContainer.appendChild(joinDateInput);

    let ageContainer = document.createElement("div");
    let agePreffix = document.createElement("p");
    let ageSuffix = document.createElement("p");
    agePreffix.textContent = "Account age: ";
    ageSuffix.textContent = " years";
    ageContainer.classList = ageInput.classList;
    ageContainer.appendChild(agePreffix);
    ageContainer.appendChild(ageInput);
    ageContainer.appendChild(ageSuffix);

    return {
        name: nameInput,
        email: emailInput,
        joinDate: joinDateContainer,
        age: ageContainer,
    };
}

// save maxi-card
function saveMaxiCard(card) {
    let oldName = card.classList[0];
    let thumbnailCard = document.querySelector("article.card." + oldName);

    let oldEmail = thumbnailCard.querySelector("* .email").textContent;
    let cardIndex = getCardIndex(oldEmail, 0);

    let fullName = card.querySelector("* .name").value;
    console.log(fullName);
    let email = card.querySelector("* .email").value;
    let joinDateArray = card
        .querySelector("* .join-date")
        .querySelector("input")
        .value.split("-");
    let joinDate =
        joinDateArray[1] + "-" + joinDateArray[2] + "-" + joinDateArray[0];
    let age = card.querySelector("* .age").querySelector("input").value;

    let nameArray = oldName.split("-");

    if (fullName != "" && fullName.split(" ").length == 2) {
        data[cardIndex].name.first = fullName.split(" ")[0];
        data[cardIndex].name.last = fullName.split(" ")[1];
        nameArray = fullName.split(" ");
    }
    if (email != "") {
        data[cardIndex].email = email;
    }
    if (joinDate != "") {
        data[cardIndex].registered.date = joinDate;
    }
    if (age != "") {
        data[cardIndex].registered.age = age;
    }

    let cardClassName = nameArray[0] + "-" + nameArray[1];

    init(cardsPerPage, 0);
    closeMaxiCard();
    thumbnailCard = document.querySelector("article.card." + cardClassName);
    maximizeCard(thumbnailCard);
}

// delete maxi-card
function deleteMaxiCard(card) {
    let email = card.querySelector("* .email").textContent;
    let cardIndex = getCardIndex(email, 0);

    console.log(data.length);

    data.splice(cardIndex, 1);

    console.log(data.length);

    init(cardsPerPage, 0);
    maximizedWindow.textContent = "";
    maximizedWindow.style.visibility = "hidden";
}

// add new card
function addCard() {
    console.log("should add card");
    let card = buildNewCard();
    maximizedWindow.appendChild(card);
    maximizedWindow.style.visibility = "visible";
    maximizedWindow.querySelector(".new-card * .name").select();
}
function buildNewCard() {
    let e = generateAddCardElements();

    // containers
    e.article.appendChild(e.upperContainer);
    e.article.appendChild(e.leftContainer);
    e.article.appendChild(e.mainContainer);
    e.article.appendChild(e.rightContainer);
    e.article.appendChild(e.lowerContainer);

    // upper elements
    e.upperContainer.appendChild(e.close);

    // main elements
    e.mainContainer.appendChild(e.portrait);
    e.mainContainer.appendChild(e.name);
    e.mainContainer.appendChild(e.email);
    e.mainContainer.appendChild(e.horizontalLine);
    e.mainContainer.appendChild(e.joinDate);
    e.mainContainer.appendChild(e.age);

    // lower elements
    e.lowerContainer.appendChild(e.btnAdd);

    return e.article;
}
function generateAddCardElements() {
    // card
    let article = document.createElement("article");
    article.classList.add("firstname-lastname", "new-card");

    // card-item
    let mainContainer = document.createElement("div");
    let upperContainer = document.createElement("div");
    let lowerContainer = document.createElement("div");
    let leftContainer = document.createElement("div");
    let rightContainer = document.createElement("div");

    let portrait = document.createElement("img");

    let name = document.createElement("input");
    let email = document.createElement("input");
    let joinDate = document.createElement("input");
    let age = document.createElement("input");

    let horizontalLine = document.createElement("hr");

    let close = document.createElement("img");

    let btnAdd = document.createElement("button");

    let cardItems = [
        mainContainer,
        upperContainer,
        lowerContainer,
        leftContainer,
        rightContainer,
        portrait,
        name,
        email,
        joinDate,
        age,
        horizontalLine,
        close,
        btnAdd,
    ];

    let commonClasses = document.createElement("p").classList;
    commonClasses.add("firstname-lastname", "new-card-item");

    let specificClasses = [
        "main-container",
        "upper-container",
        "lower-container",
        "left-container",
        "right-container",
        "portrait",
        "name",
        "email",
        "join-date",
        "age",
        "horizontal-line",
        "close",
        "add",
    ];

    for (let i = 0; i < cardItems.length; i++) {
        cardItems[i].classList = commonClasses;
        cardItems[i].classList.add(specificClasses[i]);
    }

    // populate elements with data
    let inputElements = [name, email, joinDate, age];
    let inputTypes = ["text", "email", "date", "number"];
    let inputPlaceholders = [
        "[first name] [last name]",
        "[email@provider.com]",
        "[date active]",
        "[account age]",
    ];
    for (let i = 0; i < inputElements.length; i++) {
        inputElements[i].type = inputTypes[i];
        inputElements[i].placeholder = inputPlaceholders[i];
    }

    // nu merge sa pun alta valoare la data
    let today = new Date(Date.now());
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let year = today.getFullYear();
    joinDate.value = year + "-" + month + "-" + day;
    joinDate.removeAttribute("placeholder");
    // gata cu joinDate

    portrait.src = "pictures/generic-portrait.png";
    close.src = "pictures/close.png";
    btnAdd.textContent = "Add Card";

    // return statement
    return {
        article,
        mainContainer,
        upperContainer,
        lowerContainer,
        leftContainer,
        rightContainer,
        portrait,
        name,
        email,
        joinDate,
        age,
        horizontalLine,
        close,
        btnAdd,
    };
}

// helpers
function copyClasses(from, to) {
    for (let i = 0; i < from.length; i++) {
        to.add(from[i]);
    }
}
