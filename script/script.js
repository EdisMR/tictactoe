"use strict";

/* Declarations */
let formularioTicTacToe = document.forms[0];
var turno = true;
const innerUserHTML = document.querySelector(".userInnerTurn");
let users = {
    user1: "",
    user2: "",
    winner: "",
};
const classInner = {
    userO: "ms-Icon--LocationCircle",
    userX: "ms-Icon--Cancel",
};
const htmlElm = {
    resetGame: document.querySelector(".resetGame"),
    turno: document.querySelector(".turno"),
    mostrarGanador: document.getElementById("mostrarGanador"),
};
const gridItems = Array.from(document.querySelectorAll("#grid div"));
const gridItemsSpan = Array.from(document.querySelectorAll("#grid div span"));
var contadorDeTurnos = 0;

/* Listener for the Users Form */
formularioTicTacToe.addEventListener("submit", defineUsers, false);

function defineUsers(evento) {
    evento.preventDefault();
    if (formularioTicTacToe.user1.value != formularioTicTacToe.user2.value) {
        users.user1 = formularioTicTacToe.user1.value;
        users.user2 = formularioTicTacToe.user2.value;
    } else {
        return false;
    }
    let nombres = document.querySelector(".nombres");
    nombres.classList.add("d-None");
    let juego = document.getElementById("juego");
    juego.classList.remove("d-None");
    innerTurnUser();
}

/* Lister for each item of the game grid */
function addClickEventGrid() {
    gridItems.forEach(elm => {
        elm.addEventListener("click", listenerDivs, false);
    });
}
addClickEventGrid();


/* Grid Click controller */
function listenerDivs(e) {
    if (e.target.dataset.occupied == "false") {
        llenarConIcono(e.target);
        contadorDeTurnos++;
        evaluarGanador();
        switchTurno();
        innerTurnUser();
    }
}

/* Inner the clicked element with the icon */
function llenarConIcono(donde) {
    let claseParaInner = "";
    turno ? claseParaInner = classInner.userX : claseParaInner = classInner.userO;
    let dondeIcon = donde.querySelector(".ms-Icon");
    dondeIcon.classList.add(claseParaInner);
    donde.dataset.occupied = "true";
}

function switchTurno() {
    turno = !turno;
}

/* Inner the corresponding span with the User Name */
function innerTurnUser() {
    let innerUserHTMLParent = innerUserHTML.parentNode;
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
function animatedWhoRemove() {
    let innerUserHTMLParent = innerUserHTML.parentNode;
    innerUserHTMLParent.classList.remove("animatedWho");
    innerUserHTMLParent.removeEventListener("animationend", animatedWhoRemove);
}

/* After the click, is it a winner? */
function evaluarGanador() {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let comparador = turno ? classInner.userX : classInner.userO;
    let hayGanador = false;

    for (const combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if (
            gridItemsSpan[a].classList[1] === comparador &&
            gridItemsSpan[b].classList[1] === comparador &&
            gridItemsSpan[c].classList[1] === comparador
        ) {
            [a, b, c].forEach(i => gridItemsSpan[i].parentNode.classList.add("winnerBGColor"));
            hayGanador = true;
            break;
        }
    }

    if (hayGanador) {
        users.winner = turno ? users.user1 : users.user2;
        mostrarGanador();
        htmlElm.resetGame.classList.remove("d-None");
    } else if (contadorDeTurnos >= 9) {
        htmlElm.turno.classList.add("d-None");
        htmlElm.resetGame.classList.remove("d-None");
        removeListeners();
    }
}


/* Show the cover title to show the winner */
function mostrarGanador() {
    removeListeners();
    htmlElm.turno.classList.add("d-None");
    htmlElm.mostrarGanador.classList.remove("d-None");
    document.querySelector("#mostrarGanador .ganadorInner").innerHTML = users.winner;
}

/* Remove listeners when there is a winner */
function removeListeners() {
    gridItems.forEach(elm => {
        elm.removeEventListener("click", listenerDivs, false);
    });
}
let buttonReset = document.querySelector(".resetGame button");
buttonReset.addEventListener("click", resetGame, false);

/* To restar the initial state */
function resetGame() {
    gridItemsSpan.forEach(elm => {
        elm.parentNode.dataset.occupied = "false";
        try {
            elm.parentNode.classList.remove("winnerBGColor");
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

function firstRandomShift() {
    turno = Math.random() < 0.5;
}

firstRandomShift()