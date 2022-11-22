// page init
function init() {
    loadCards(data, 0, 0);
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

// card creation
function createCard(input) {
    // generate elements [article, portrait, name, email, horizontalLine, joinDate]
    let cardElements = generateCardElements(input);

    console.log(cardElements);

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

    // -- article
    article.className = "card";

    // -- portrait
    let separator = " ";
    let classes = [
        "card-item",
        item.name.first + "-" + item.name.last,
        "portrait",
    ];

    portrait.className = stringifyArray(classes, separator);
    portrait.src = item.picture.thumbnail;
    portrait.alt = "thumbnail-" + item.name.first + "-" + item.name.last;

    // -- name
    classes.pop();
    classes.push("name");

    name.textContent = item.name.first + " " + item.name.last;
    name.className = stringifyArray(classes, separator);

    if ((item.name.first + " " + item.name.last).length >= 15) {
        name.className = name.className.concat(" double-line");
    }

    // -- email
    classes.pop();
    classes.push("email");

    email.textContent = item.email;
    email.className = stringifyArray(classes, separator);

    // -- horizontal line
    classes.pop();
    classes.push("horizontal-line");

    horizontalLine.className = stringifyArray(classes, separator);

    // -- join date
    classes.pop();
    classes.push("join-date");

    joinDate.textContent = "Joined on " + item.registered.date;
    joinDate.className = stringifyArray(classes, separator);

    // control
    console.log(
        " - Card of " + item.name.first + " " + item.name.last + " generated."
    );

    return { article, portrait, name, email, horizontalLine, joinDate };
}

// helpers
function stringifyArray(arr, separator) {
    let string = "";
    for (let i = 0; i < arr.length; i++) {
        string += arr[i];
        if (i < arr.length - 1) {
            string += separator;
        }
    }
    return string;
}
