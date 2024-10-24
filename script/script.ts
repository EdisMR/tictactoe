"use strict";

/* Declarations */
let ticTacToeForm: HTMLFormElement = document.forms[0];
var turno: boolean = true;
const innerUserHTML: HTMLElement = document.querySelector(".userInnerTurn");
let users: { user1: string; user2: string; winner: string } = {
    user1: "",
    user2: "",
    winner: "",
};
const classInner: { userO: string; userX: string } = {
    userO: "ms-Icon--LocationCircle",
    userX: "ms-Icon--Cancel",
};
const htmlElm: { [key: string]: HTMLElement } = {
    resetGame: document.querySelector(".resetGame"),
    turno: document.querySelector(".turno"),
    mostrarGanador: document.getElementById("mostrarGanador"),
};
const gridItems: HTMLElement[] = Array.from(document.querySelectorAll("#grid div"));
const gridItemsSpan: HTMLSpanElement[] = Array.from(document.querySelectorAll("#grid div span"));
var contadorDeTurnos: number = 0;

/* Listener for the Users Form */
ticTacToeForm.addEventListener("submit", defineUsers, false);

function defineUsers(evento: Event) {
    evento.preventDefault();
    if (ticTacToeForm.user1.value != ticTacToeForm.user2.value) {
        users.user1 = ticTacToeForm.user1.value;
        users.user2 = ticTacToeForm.user2.value;
    } else {
        return false;
    }
    let nombres: HTMLElement = document.querySelector(".nombres");
    nombres.classList.add("d-None");
    let juego: HTMLElement = document.getElementById("juego");
    juego.classList.remove("d-None");
    innerTurnUser();
}

/* Lister for each item of the game grid */
function addClickEventGrid(): void {
    gridItems.forEach(elm => {
        elm.addEventListener("click", listenerDivs, false);
    });
}
addClickEventGrid();


/* Grid Click controller */
function listenerDivs(e: Event): void {
    if ((e.target as HTMLElement).dataset.occupied == "false") {
        innerWithIcon((e.target as HTMLElement));
        contadorDeTurnos++;
        evaluarGanador();
        switchTurn();
        innerTurnUser();
    }
}

/* Inner the clicked element with the icon */
function innerWithIcon(donde: HTMLElement): void {
    let claseParaInner: string = "";
    turno ? claseParaInner = classInner.userX : claseParaInner = classInner.userO;
    let dondeIcon: HTMLElement = donde.querySelector(".ms-Icon");
    dondeIcon.classList.add(claseParaInner);
    donde.dataset.occupied = "true";
}

function switchTurn(): void {
    turno = !turno;
}

/* Inner the corresponding span with the User Name */
function innerTurnUser(): void {
    let innerUserHTMLParent: HTMLElement = innerUserHTML.parentNode as HTMLElement;
    if (turno) {
        innerUserHTML.innerHTML = users.user1;
        innerUserHTMLParent.classList.add("animatedWho");
        innerUserHTMLParent.addEventListener("animationend", animatedWhoRemove);
    }
    if (!turno) {
        innerUserHTML.innerHTML = users.user2;
        innerUserHTMLParent.classList.add("animatedWho");
        innerUserHTMLParent.addEventListener("animationend", animatedWhoRemove);
    }
}

/* Animate the intro for the current user shift */
function animatedWhoRemove(): void {
    let innerUserHTMLParent: HTMLElement = innerUserHTML.parentNode as HTMLElement;
    innerUserHTMLParent.classList.remove("animatedWho");
    innerUserHTMLParent.removeEventListener("animationend", animatedWhoRemove);
}

/* After the click, is it a winner? */
function evaluarGanador(): void {
    const winnerCombinations: number[][] = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let comparador: string = turno ? classInner.userX : classInner.userO;
    let winnerExist: boolean = false;

    for (const combinacion of winnerCombinations) {
        const [a, b, c] = combinacion;
        if (
            gridItemsSpan[a].classList[1] === comparador &&
            gridItemsSpan[b].classList[1] === comparador &&
            gridItemsSpan[c].classList[1] === comparador
        ) {
            [a, b, c].forEach(i => (gridItemsSpan[i].parentNode as HTMLElement).classList.add("winnerBGColor"));
            winnerExist = true;
            break;
        }
    }

    if (winnerExist) {
        users.winner = turno ? users.user1 : users.user2;
        displayWinner();
        htmlElm.resetGame.classList.remove("d-None");
    } else if (contadorDeTurnos >= 9) {
        htmlElm.turno.classList.add("d-None");
        htmlElm.resetGame.classList.remove("d-None");
        removeListeners();
    }
}


/* Show the cover title to show the winner */
function displayWinner(): void {
    removeListeners();
    htmlElm.turno.classList.add("d-None");
    htmlElm.mostrarGanador.classList.remove("d-None");
    document.querySelector("#mostrarGanador .ganadorInner").innerHTML = users.winner;
}

/* Remove listeners when there is a winner */
function removeListeners(): void {
    gridItems.forEach(elm => {
        elm.removeEventListener("click", listenerDivs, false);
    });
}
let buttonReset: HTMLButtonElement = document.querySelector(".resetGame button");
buttonReset.addEventListener("click", resetGame, false);

/* To restar the initial state */
function resetGame(): void {
    gridItemsSpan.forEach((elm: HTMLSpanElement) => {
        (elm.parentNode as HTMLElement).dataset.occupied = "false";
        try {
            (elm.parentNode as HTMLElement).classList.remove("winnerBGColor");
        } catch { }

        elm.classList.remove(classInner.userO);
        elm.classList.remove(classInner.userX);
    });
    htmlElm.mostrarGanador.classList.add("d-None");
    htmlElm.resetGame.classList.add("d-None");
    htmlElm.turno.classList.remove("d-None");
    addClickEventGrid();
    contadorDeTurnos = 0;


    if (users.winner == "") {
        firstRandomShift()
    }
    users.winner = ""
}

function firstRandomShift(): void {
    turno = Math.random() < 0.5;
}

firstRandomShift()