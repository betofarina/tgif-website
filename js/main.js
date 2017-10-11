var sizeOfNames;
var table = document.getElementById("senate-data");
table.setAttribute("class", "table");
var tHEAD = table.createTHead();
var rowThead = document.createElement("tr");
rowThead.setAttribute("class", "tbody");
table.appendChild(rowThead);
createCols(rowThead, "Senator", "Party", "State", "Years in Office", "% Votes w/ Party");
tHEAD.appendChild(rowThead);
var tBody = document.getElementById("tabla-tbody");

function createRow(element) {
    var row = document.createElement("tr");
    element.appendChild(row);
    return row;
}

function createCols(fila, nombre, partido, estado, experiencia, porcentaje, elUrl) {
    var nameLink = document.createElement("a");
    nameLink.setAttribute("href", elUrl);
    var FULLName = fila.insertCell(0);
    FULLName.setAttribute("class", "text-center");
    var PARTY = fila.insertCell(1);
    PARTY.setAttribute("class", "text-center party-type");
    var STATE = fila.insertCell(2);
    STATE.setAttribute("class", "text-center state-type");
    var SENIORITY = fila.insertCell(3);
    SENIORITY.setAttribute("class", "text-center");
    var PERCENTAGEOfVote = fila.insertCell(4);
    PERCENTAGEOfVote.setAttribute("class", "text-center");
    if (nombre == "Senator") {
        FULLName.innerHTML = nombre;
    } else {
        FULLName.appendChild(nameLink);
        var fullNameText = document.createTextNode(nombre);
        nameLink.appendChild(fullNameText);
    }
    PARTY.innerHTML = partido;
    STATE.innerHTML = estado;
    SENIORITY.innerHTML = experiencia;
    PERCENTAGEOfVote.innerHTML = porcentaje;
}


function updateUI() {
    var partyArray = $("input[name='Party']:checked")
        .map(function () {
            return $(this).val();
        })
        .get();
    var stateValor = $("#state-filter").val();
    var stateArray = stateValor ? [stateValor] : [];

    $("#senate-data tbody tr").each(function () {
        var partyValor = $(this).find(".party-type").text();
        var partySelected = isIncluded(partyValor, partyArray);
        var stateValor = $(this).find(".state-type").text();
        var stateSelected = isIncluded(stateValor, stateArray);
        console.log("state " + stateSelected);
        console.log("state " + stateArray);
        if (partySelected && stateSelected) {
            $(this).toggle(true);
        } else if (stateSelected === false) {
            $(this).toggle(stateSelected);
        } else {
            $(this).toggle(partySelected);
        }

    });
}

function isIncluded(x, lst) {
    return lst.length === 0 || lst.indexOf(x) != -1;
}
$("input[name='Party']").on("change", updateUI);


function updateUI2() {
    var partyArray = $("input[name='Party']:checked")
        .map(function () {
            return $(this).val();
        })
        .get();

    var stateValor = $("#state-filter").val();
    var stateArray = stateValor ? [stateValor] : [];


    $("#senate-data tbody tr").each(function () {
        var partyValor = $(this).find(".party-type").text();
        var partySelected = isIncluded(partyValor, partyArray);
        var stateValor = $(this).find(".state-type").text();
        var stateSelected = isIncluded(stateValor, stateArray);
        console.log("party " + partySelected);
        console.log("state " + stateSelected);
        if (partySelected && stateSelected) {
            $(this).toggle(true);
        } else if (partySelected == false) {
            $(this).toggle(false);
        } else {
            $(this).toggle(stateSelected);
        }




    });
}


$("#state-filter").on("change", updateUI2);