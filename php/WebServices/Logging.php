<?php
header('Content-Type: application/json');
header('Pragma: no-cache'); // HTTP 1.0.
header('Expires: 0'); // Proxies.
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require 'PHPMailer/PHPMailerAutoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') :
	if(isset($_REQUEST['type']) && isset($_REQUEST['message']) && isset($_REQUEST['script']) && isset($_REQUEST['line'])) :
		$subject = "JavaScript " . $_REQUEST['type'];
		$message = $_REQUEST['message'] . "\n" . $_REQUEST['script'] . "\n" . $_REQUEST['line'];
		if(error_log(date("D d M Y, G.i:s\n").$message." ".$_SERVER['REQUEST_URI']."\n",3,"../logs/".date("Y_m_d_His").".txt")) :

			// Create a new PHPMailer instance
			$mail = new PHPMailer;

			$mail->isSMTP();
			$mail->Host = 'smtp1.example.com;smtp2.example.com';	// Specify main and backup SMTP servers
			$mail->SMTPAuth = true;									// Enable SMTP authentication
			$mail->Username = 'bugs@example.com';					// SMTP username
			$mail->Password = 'p@$$wørd';							// SMTP password
			$mail->SMTPSecure = 'tls';								// Enable TLS encryption, `ssl` also accepted
			$mail->Port = 587;										// TCP port to connect to

			$mail->setFrom('bugs@example.com', 'Bugmail');			// Sender
			$mail->addAddress('bugs@example.com', 'Bugmail');		// Recipient

	    	switch($_REQUEST['type'])
	    	{
		    	case 'error':
		    		/* High */
		    		$mail->Priority = 1;
		    		break;
		    	case 'warn':
		    		/* Normal */
		    		$mail->Priority = 3;
		    		break;
		    	case 'info':
		    	case 'log':
		    		/* Low */
		    		$mail->Priority = 5;
		    		break;
		    	default:
		    		$mail->Priority = null;
		    		break;
	    	}

			$mail->Subject = "[ERROR] " + $subject;
			$mail->Body    = $message;
			$mail->AltBody = $message;


			// Send the message, check for errors
			if(!$mail->send()) :
				echo 'Message could not be sent.';
				echo 'Mailer Error: ' . $mail->ErrorInfo;
				echo json_encode(false);
			else :
				echo json_encode(true);
			endif;
		else :
			echo json_encode(true);
		endif;
	else :
		echo json_encode(false);
	endif;
else :
	echo json_encode(false);
endif;
?>