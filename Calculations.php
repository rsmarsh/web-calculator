<?php 

// if a get request was made to this file, return the calculations list
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    getCalculations();
}

// post requests signify a new calculation to save to the csv file
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    saveCalculation();
}

function saveCalculation() {
    $calculation = json_decode(file_get_contents('php://input'), true)['sum'];
    $userAgent = $_SERVER['HTTP_USER_AGENT'];
    $ipAddress = $_SERVER['REMOTE_ADDR'];
    $timestamp = date("F j, Y, g:i a", $_SERVER['REQUEST_TIME']);

    $csvFile = openCSVFile(true);

    // add a single calculation as a new line within the csv file
    fputcsv($csvFile, array(
        $calculation, 
        $ipAddress,
        $timestamp,
        $userAgent
    ));
    fclose($csvFile);

}

// Returns the whole list of calculations found within the csv file
function getCalculations() {
    $csvFile = openCSVFile(false);
    $entriesArray = [];

    
    
    // return each line/entry within the csv until the end of the file is reached
    while(!feof($csvFile)) {
        $entry = fgetcsv($csvFile);
        $entriesArray[] = $entry;
    }
    
    // flip the order so they range from newest to oldest
    $entriesArray = array_reverse($entriesArray);
    
    echo("<table>");
    echo(createTableHead());
    echo("<tbody>");

    foreach ($entriesArray as $entry) {
        echo createRow($entry);
    }

    echo("</tbody>");
    echo('</table>');

}

function createTableHead() {
    return "
        <thead>
            <tr>
                <th>
                    Calculation
                </th>
                <th>
                    IP Address
                </th>
                <th>
                    Timestamp
                </th>
                <th>
                    User Agent
                </th>
            </tr>
        </thead>
    ";
}

// Creates a table row for each entry in the array
function createRow($entry) {
    echo "
        <tr>
            <td>
                ".$entry[0]."
            </td>
            <td>
                ".$entry[1]."
            </td>
            <td>
                ".$entry[2]."
            </td>
            <td>
                ".$entry[3]."
            </td>
        </tr>
    ";
}

function openCSVFile($bwriteMode) {

    // default to read only permission
    $mode = 'r';

    // do we need to open the csv file as read only, or write mode
    if ($bwriteMode == true) {
        $mode = 'a';
    } 
    // open csv file for appending
    $file = fopen('calculations.csv', $mode);
    
    return $file;
}

?>