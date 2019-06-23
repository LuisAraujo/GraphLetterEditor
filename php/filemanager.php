<?php

$data = $_POST["data"];

$fp = fopen("../dataset/dataset.txt", "a");

fwrite($fp, $data . "\n");

fclose($fp);


?>