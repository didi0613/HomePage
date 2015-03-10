<?php
if(isset($_POST['submit'])){
    $to = "gina.ds1991@gmail.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $name = $_POST['name'];
    $subject = "From Home Page";
    $subject2 = "Copy of your form submission";
    $message = $first_name . " " . $$name . " wrote the following:" . "\n\n" . $_POST['message'];
    $message2 = "Thank you for contacting me " . $first_name . "\n\n" + "Will reply to you shortly ;-)";

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
    mail($to,$subject,$message,$headers);
    mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
    echo "Mail Sent. Thank you " . $$name . ", I will contact you shortly.";
    }
?>