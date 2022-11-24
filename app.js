let cardsContainer = document.querySelector(
    "main section.cards-list.container"
);
let maximizedWindow = document.querySelector("main section.maximized");

init(5);

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
