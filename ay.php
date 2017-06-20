<?php

$filename='svg.txt';

if(isset($_GET['save'],$_POST['svg']))
{
	$svg=$_POST['svg'];

	var_dump($_POST);

	if($svg)
		file_put_contents($filename,$svg);
	die;
}

if(isset($_GET['get']))
{
	$svg=is_file($filename)?file_get_contents($filename):'';
	//var_dump($svg);
	echo $svg;
	die;
}

