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
    let hayGanador = false;
    let comparador;
    if (turno) {
        comparador = classInner.userX;
    } else {
        comparador = classInner.userO;
    }
    if (gridItemsSpan[0].classList[1] == comparador &&
        gridItemsSpan[1].classList[1] == comparador &&
        gridItemsSpan[2].classList[1] == comparador) {

        gridItemsSpan[0].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[1].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[2].parentNode.classList.add("winnerBGColor")

        hayGanador = true;
    }
    if (gridItemsSpan[3].classList[1] == comparador &&
        gridItemsSpan[4].classList[1] == comparador &&
        gridItemsSpan[5].classList[1] == comparador) {

        gridItemsSpan[3].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[4].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[5].parentNode.classList.add("winnerBGColor")

        hayGanador = true;
    }
    if (gridItemsSpan[6].classList[1] == comparador &&
        gridItemsSpan[7].classList[1] == comparador &&
        gridItemsSpan[8].classList[1] == comparador) {

        gridItemsSpan[6].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[7].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[8].parentNode.classList.add("winnerBGColor")

        hayGanador = true;
    }
    if (gridItemsSpan[0].classList[1] == comparador &&
        gridItemsSpan[3].classList[1] == comparador &&
        gridItemsSpan[6].classList[1] == comparador) {

        gridItemsSpan[0].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[3].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[6].parentNode.classList.add("winnerBGColor")

        hayGanador = true;
    }
    if (gridItemsSpan[1].classList[1] == comparador &&
        gridItemsSpan[4].classList[1] == comparador &&
        gridItemsSpan[7].classList[1] == comparador) {

        gridItemsSpan[1].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[4].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[7].parentNode.classList.add("winnerBGColor")

        hayGanador = true;
    }
    if (gridItemsSpan[2].classList[1] == comparador &&
        gridItemsSpan[5].classList[1] == comparador &&
        gridItemsSpan[8].classList[1] == comparador) {

        gridItemsSpan[2].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[5].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[8].parentNode.classList.add("winnerBGColor")

        hayGanador = true;
    }
    if (gridItemsSpan[0].classList[1] == comparador &&
        gridItemsSpan[4].classList[1] == comparador &&
        gridItemsSpan[8].classList[1] == comparador) {

        gridItemsSpan[0].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[4].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[8].parentNode.classList.add("winnerBGColor")

        hayGanador = true;
    }
    if (gridItemsSpan[2].classList[1] == comparador &&
        gridItemsSpan[4].classList[1] == comparador &&
        gridItemsSpan[6].classList[1] == comparador) {

        gridItemsSpan[2].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[4].parentNode.classList.add("winnerBGColor")
        gridItemsSpan[6].parentNode.classList.add("winnerBGColor")

        hayGanador = true;
    }
    if (turno && hayGanador) {
        users.winner = users.user1;
    }
    if (!turno && hayGanador) {
        users.winner = users.user2;
    }
    if (hayGanador) {
        mostrarGanador();
        htmlElm.resetGame.classList.remove("d-None");
    } else {
        if (contadorDeTurnos >= 9) {
            htmlElm.turno.classList.add("d-None");
            htmlElm.resetGame.classList.remove("d-None");
            removeListeners();
        }
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
        try{
            elm.parentNode.classList.remove("winnerBGColor");
        }catch{}

        elm.classList.remove(classInner.userO);
        elm.classList.remove(classInner.userX);
    });
    htmlElm.mostrarGanador.classList.add("d-None");
    htmlElm.resetGame.classList.add("d-None");
    htmlElm.turno.classList.remove("d-None");
    addClickEventGrid();
    contadorDeTurnos = 0;

    
    if(users.winner==""){
        firstRandomShift()
    }
    users.winner=""
}

function firstRandomShift(){
    turno = Math.random() < 0.5;
    console.log("firstRandomShift",turno);
}

firstRandomShift()