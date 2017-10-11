/*

var path = window.location.pathname;
var page = path.split("/").pop();


function createTableMostAndLeast(list, id_table, selector) {
    var thisTable = document.getElementById(id_table);
    for (var f = 0; f < list.length; f++) {
        var row = document.createElement("tr");
        thisTable.appendChild(row);
        var nameLink = document.createElement("a");
        nameLink.setAttribute("href", list[f].url);
        var FULLName = row.insertCell(0); // variables starting in caps are for td elements
        FULLName.setAttribute("class", "text-center");
        var completeName = list[f].first_name + " " + (list[f].middle_name || "") + " " + list[f].last_name;
        var fullNameText = document.createTextNode(completeName);
        nameLink.appendChild(fullNameText);
        FULLName.appendChild(nameLink);
        var NOMissedVotes = row.insertCell(1);
        if (selector === true) {
            NOMissedVotes.innerHTML = list[f].missed_votes;
        } else {
            NOMissedVotes.innerHTML = list[f].total_votes;
        }
        NOMissedVotes.setAttribute("class", "text-center");
        var PTGMissed = row.insertCell(2);
        PTGMissed.setAttribute("class", "text-center");
        if (selector === true) {
            PTGMissed.innerHTML = list[f].missed_votes_pct + "%";
        } else {
            PTGMissed.innerHTML = list[f].votes_with_party_pct + "%";
        }
        thisTable.appendChild(row);
    }
}