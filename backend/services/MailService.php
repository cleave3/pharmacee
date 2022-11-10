<?php

namespace App\services;

use App\config\DotEnv;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;


(new DotEnv(__DIR__ . '/../.env'))->load();


class MailService
{
    /**
     * send mail
     *
     * @param string $recipient
     * @param string $subject
     * @param string $body
     * @return void
     */
    public static function sendMail($recipient, $subject, $body)
    {
        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host       = getenv("MAIL_HOST");
            $mail->SMTPAuth   = true;
            $mail->Username   = getenv("MAIL_USER");
            $mail->Password   = getenv("MAIL_PASS");
            $mail->SMTPSecure = "ssl";
            $mail->Port       = getenv("MAIL_PORT");
            $mail->setFrom(getenv("MAIL_SENDER"), getenv("MAIL_SENDER_NAME"));
            $mail->isHTML(true);
            $mail->addAddress($recipient);
            $mail->Subject = $subject;
            $mail->Body    = $body;

            if (!preg_match('/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i', $recipient)) {
                return;
            }
            return $mail->send();
        } catch (Exception $error) {
            return $error->getMessage();
        }
    }
}
