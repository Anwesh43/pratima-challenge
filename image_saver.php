<?php
    if($_POST["name"]) {
        $name = $_POST["name"];
        $imageData = $_POST["imageData"];
        $imageDataArray = explode(",",$imageData);
        $decodedData = base64_decode($imageDataArray[1]);
        if(!is_dir("uploaded_images")) {
            mkdir("uploaded_images");
            
        }
        file_put_contents("uploaded_images"."/".$name,$decodedData);    
    }
?>