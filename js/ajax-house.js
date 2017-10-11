$(document).ready(function () {



    $.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/house", function (json) {
        sizeOfNames = json.results["0"].members.length;
        unsorted = json.results["0"].members;
        getList(democratList, "D", json.results["0"].members); // I create the list of objects (members)
        getList(republicanList, "R", json.results["0"].members);
        getList(independentList, "I", json.results["0"].members);
        createCellsForAverage(democratsRow, "Democrats", democratList); // Create the cells with their content
        createCellsForAverage(republicansRow, "Republicans", republicanList);
        createCellsForAverage(independentsRow, "Independents", independentList);
        var ptgSortedMembers = unsorted.concat().sort(function (a, b) {
            return parseFloat(a.missed_votes_pct) - parseFloat(b.missed_votes_pct);
        }); // now this array is sorted based on ptg of votes with party
        var ptgSortedLoyalty = unsorted.concat().sort(function (a, b) {
            return parseFloat(a.votes_with_party_pct) - parseFloat(b.votes_with_party_pct);
        })

        identifyMembers(leastLoyalMembers, ptgSortedLoyalty, 0.1, false, true, json.results["0"].members);
        identifyMembers(lessMissedVotesMembers, ptgSortedMembers, 0.1, false, false, json.results["0"].members);
        var reversedPtgMembers = ptgSortedMembers.reverse(); // now i have the biggest values at first
        var reversedPtgLoyalty = ptgSortedLoyalty.reverse();
        identifyMembers(mostLoyalMembers, reversedPtgLoyalty, 0.1, true, true, json.results["0"].members);
        identifyMembers(mostMissedVotesMembers, reversedPtgMembers, 0.1, true, false, json.results["0"].members);
        console.log(lessMissedVotesMembers);
        var statisticObject = {
            "democrats": [{
                "numberOfMembers": democratList.length,
                "averageVoting": averageVotingValueDemocrat,
    }],
            "republicans": [{
                "numberOfMembers": republicanList.length,
                "averageVoting": averageVotingValueRepublican,
    }],
            "independats": [{
                "numberOfMembers": independentList.length,
                "averageVoting": 0,
    }],
            "mostLoyalMembers": mostLoyalMembers,
            "lessLoyalMembers": leastLoyalMembers,
            "mostMissedVotesMembers": mostMissedVotesMembers,
            "lessMissedVotesMembers": lessMissedVotesMembers,
        }
        if (page == "senate-attendance.html" || page == "house-attendance.html") {
            var bottonMissedContent = [];
            bottonMissedContent = statisticObject.lessMissedVotesMembers; // lista de miembros
            var topMissedContent = [];
            topMissedContent = statisticObject.mostMissedVotesMembers;

            createTableMostAndLeast(bottonMissedContent, "botton-10-attendance", true);
            createTableMostAndLeast(topMissedContent, "top-10-attendance", true);
        } else {

            var bottonLoyaltyContent = [];

            var topLoyaltyContent = [];
            bottonLoyaltyContent = statisticObject.lessLoyalMembers;
            topLoyaltyContent = statisticObject.mostLoyalMembers;
            createTableMostAndLeast(bottonLoyaltyContent, "botton-10-loyalty", false);
            createTableMostAndLeast(topLoyaltyContent, "top-10-loyalty", false);
        }
        totalCell.innerHTML = "<td>" + sizeOfNames + "</td>";


    })
});