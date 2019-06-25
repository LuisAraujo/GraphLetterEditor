<?php

$data = $_POST["data"];
$latter = $_POST["latter"];
$min = $_POST["min"];
$training= $_POST["training"];

$fp = fopen("../dataset/toRNA/".$latter."_".$min." [".$training."].txt", "w");

fwrite($fp, $data);

fclose($fp);


?>