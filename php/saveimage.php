<?php

$img = $_POST['imgBase64'];
$name = $_POST['name'];

$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$fileData = base64_decode($img);
//saving
//$fileName = "../dataset/images/".$name.date("d-m-y").date("H-i-s").'.png';
$fileName = "../dataset/images/".$name.'.png';

file_put_contents($fileName, $fileData);

?>