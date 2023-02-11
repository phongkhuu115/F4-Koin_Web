<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function send()
    {
        $data = [
            'title' => 'This is a test email',
            'content' => 'This is a test email sent from Laravel.'
        ];

        Mail::send('emails.test', $data, function ($message) {
            $message->to('n4t41.trash@gmail.com', 'Recipient Name')
                ->subject('Test Email');
        });

        return 'Email sent successfully';
    }
    
    public function sendEmailVerify($email, $verification_code)
    {
        $url = env('APP_ENV') == 'local' ? env('LOCAL_URL') : env('PRODUCTION_URL');
        $data = [
            'verification_link' => $url . '/api/auth/verify-email/' . $verification_code
        ];

        Mail::send('emails.verification', $data, function ($message) use ($email) {
            $message->to($email, 'Recipient Name')
                ->subject('Verify your account');
        });

        return 'Email sent successfully';
    }
}
