<?php 

$sSum = json_decode(file_get_contents('php://input'), true)['sum'];
echo $sSum;

?>