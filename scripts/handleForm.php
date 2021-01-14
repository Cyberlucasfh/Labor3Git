Welcome <?php echo $_POST["name"]; ?><br>
Your email address is: <?php echo $_POST["email"]; ?><br>
The specified date was :<?php echo $_POST["date"];?><br>
The message was :<?php echo $_POST["message"];?><br>
<?php
if ($_POST["password"]=="hunter2"){
echo "Password was correct";
}
else {
echo "Password was incorrect";
}
?><br>
<?php
if ($_POST["NO-REPLY"]==100){
echo "I will Reply soon";
}
else {
echo "I will not reply to you";
}?><br>