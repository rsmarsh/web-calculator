<?php 

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