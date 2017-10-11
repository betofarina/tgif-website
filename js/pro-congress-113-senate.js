$(document).ready(function() {
    $.getJSON("https://nytimes-ubiqum.herokuapp.com/congress/113/senate", function(json){
        console.log(json);
        sizeOfNames = json.results["0"].members.length;
        for (var t = 0; t < sizeOfNames; t++) {
    var row = createRow(tBody);
    createCols(row, json.results["0"].members[t].first_name + " " + (json.results["0"].members[t].middle_name || "") + " " + (json.results["0"].members[t].last_name), json.results["0"].members[t].party, json.results["0"].members[t].state, json.results["0"].members[t].seniority, json.results["0"].members[t].votes_with_party_pct + "%", json.results["0"].members[t].url)

}
    })
})