var json;
var democratList = [];
var republicanList = [];
var independentList = [];
var sizeOfNames;
var averageVotingValueDemocrat = getAverageVoting(democratList); // get the average of voting for Ds ands Rs
var averageVotingValueRepublican = getAverageVoting(republicanList);
var tableOfAverageVoting = document.getElementById("table-parties"); // Create table of average with rows
var democratsRow = createRow(tableOfAverageVoting);
var republicansRow = createRow(tableOfAverageVoting);
var independentsRow = createRow(tableOfAverageVoting);
var totalCell = document.getElementById("total-reps"); // I give the total to the cell in the tfoot
var leastLoyalMembers = [];
var mostLoyalMembers = [];
var lessMissedVotesMembers = [];
var mostMissedVotesMembers = [];
var unsorted; // unsorted would be my members list by default
var path = window.location.pathname;
var page = path.split("/").pop();

function identifyMembers(targetlist, list, ptgRange, mostOrLeastSelector, attSelector, array) {
    /* the last to parameters are to select from most or least of an attribute and from selecting which atttributte i'll to the calculation:
for false x  -- is least of something       x true  -- loyalty
for true  x  -- most of something           x false -- missed votes   
*/
    var M = 0; // M is the number of members "added"
    var X = findSmallestValue(array);
    for (var t = 0; t < list.length; t++) {
        var member = list[t];
        if (attSelector === true) {
            var value = member.votes_with_party_pct;
        } else {
            var value = member.missed_votes_pct;
        }
        if (((M / list.length) < ptgRange) || value === X) {
            if (mostOrLeastSelector === false) {

                if (value >= X) {
                    M = M + 1;
                    targetlist.push(member);
                    X = value;
                }

            } else if (value <= X) {
                M = M + 1;
                targetlist.push(member);
                X = value;
            }

        }
    }


    function findSmallestValue(array) {
        var arrayOfPtg = [];
        createArrayOfPtg(arrayOfPtg, array);
        arrayOfPtg.sort();
        if (mostOrLeastSelector === false) {
            return arrayOfPtg[0];
        } else {
            return arrayOfPtg[arrayOfPtg.length - 1]
        }

    }

    function createArrayOfPtg(array, arraySrc) {
        for (var g = 0; g < arraySrc.length; g++) {
            var member = arraySrc[g];
            if (attSelector === true) {
                var ptgValue = +member.votes_with_party_pct;
            } else {
                var ptgValue = +member.missed_votes_pct;
            }
            array.push(ptgValue);
        }
    }



}

function createCellsForAverage(theRow, theParty, theList) {
    var partyCell = theRow.insertCell(0);
    var noOfRepsCell = theRow.insertCell(1);
    var averageCell = theRow.insertCell(2);
    partyCell.innerHTML = "<td>" + theParty + "</td>";
    noOfRepsCell.innerHTML = "<td>" + theList.length + "</td>";
    if (theParty === "Independents") {
        averageCell.innerHTML = "<td></td>"
    } else {
        averageCell.innerHTML = "<td>" + getAverageVoting(theList) + "%</td>";
    }
}

function createRow(element) {
    var row = document.createElement("tr");
    element.appendChild(row);
    return row;
}

function getAverageVoting(list) {
    var averageSum = 0;
    for (var x = 0; x < list.length; x++) {
        averageSum = averageSum + (+list[x].votes_with_party_pct);
    }
    return (averageSum / list.length).toFixed(2);
}

function getList(list, party, array) {
    for (var t = 0; t < sizeOfNames; t++) {
        var partyValue = array[t].party;

        if (party === partyValue) {
            var member = array[t];
            list.push(member);
        }
    }
}

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