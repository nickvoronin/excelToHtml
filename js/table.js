/***************************************************************************************
 *
 * This script gets JSON object using XHR request and renders it as HTML table
 * By Nicolai Voronin
 *
 ***************************************************************************************/

"use strict";
// set up request
var oReq = new XMLHttpRequest(), //New request object
    url = "reader.php",
    method = "get";

var tableGoesHere = document.getElementById("build_table");


// Builds table and returns it as DOM Node
function buildTable(data) {
    "use strict";
    var table = document.createElement("table"),
        headerNames = Object.keys(data[0]),
        i = 0;

    // Build first table row with header names
    // Append it to the table
    // Use "th" tag for cell types
    table.appendChild(buildRow(headerNames, "td"));

    // Build remaining rows with data
    // Use "td" tag for cell types
    for ( ; i < data.length; i += 1) {
        table.appendChild(buildRow(headerNames.map( function (key) {
            return data[i][key];
        }), "td", headerNames));
    }

    // This function builds rows with data given
    // Uses array tableClasses to set classes for each cell (can use corresponding header names)
    // Arguments taken:
    //                  data -      text to insert into cell
    //                  cellType -  create cell of this type
    function buildRow( data, cellType ) {
        // here go classes for table styles
        // can use headerNames to set classes corresponding to table header names
        // var tableClasses = headerNames;
        var tableClasses = [ "a", "b", "c", "d" ];

        var newRow = document.createElement( "tr" );

        for (var i = 0; i < data.length; i++) {
            var cell = document.createElement( cellType );
            cell.className = tableClasses[i];
            cell.appendChild(document.createTextNode( data[i] ));
            newRow.appendChild( cell );
        }
        return newRow;
    }

    return table;
}


function reqListener () {
      console.log(this.responseText);
    }

// Make AJAX request to the server to get data for the table
oReq.open( method, url, true );
//                               ^ Don't block the rest of the execution.
//                                 Don't wait until the request finishes to
//                                 continue.
oReq.send();

// When response is loaded generate the table
oReq.onload = function() {
    tableGoesHere.appendChild( buildTable( JSON.parse( this.responseText )));
};

