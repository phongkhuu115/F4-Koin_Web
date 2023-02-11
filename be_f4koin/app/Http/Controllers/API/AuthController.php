<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\Cart;
use App\Http\Controllers\API\CartController as CartController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Str;
use App\Http\Controllers\EmailController;

class AuthController extends Controller
{
    // const timeout = 60;
    // 30 days
    const timeout = 60 * 60 * 24 * 30;
    // update expire time of token
    public function updateExpireTimeOfToken($token)
    {
        try {
            $token = hash('sha256', $token);
            // update expire time
            DB::table('personal_access_tokens')->where('token', $token)->update(['expires_at' => now()->addMinute(self::timeout)]);
        } catch (\Throwable $th) {
        }
    }

    public function getClientId(Request $request)
    {
        if ($request->secret_message != hash('sha256', 'f4koin')) {
            return response([
                'message' => 'Invalid secret message'
            ], 200);
        }

        return response([
            'expoClientId' => env('GOOGLE_EXPO_CLIENT_ID'),
            'clientId' => env('GOOGLE_CLIENT_ID'),
            'iosClientId' => env('GOOGLE_IOS_CLIENT_ID'),
            'androidClientId' => env('GOOGLE_ANDROID_CLIENT_ID'),
        ], 200);
    }

    public function verifyEmail(Request $request, $vrfcode)
    {
        // get verification code from first parameter
        $verification_code = $vrfcode;

        if (!$verification_code) {
            return response([
                'message' => 'Invalid verification code',
                'verification_code' => $verification_code,
            ], 200);
        }

        // check verification code in database
        $user = User::where('verification_code', $verification_code)->first();
        if (!$user) {
            return response([
                'message' => 'Invalid verification code'
            ], 200);
        }

        // update user status
        $user->email_verified_at = now();
        $user->save();
        if (!$user->wasChanged()) {
            return response([
                'message' => 'Invalid verification code'
            ], 200);
        }

        return response([
            'message' => 'Email verified successfully'
        ], 200);
    }

    public function register(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required|string|unique:users,username|min:3',
            'userEmail' => 'required|string|unique:users,userEmail',
            'password' => 'required|min:4|confirmed',
            'userFullName' => 'string',
            'userTelephone' => 'string'
        ]);

        $user = User::create([
            'username' => $fields['username'],
            'userEmail' => $fields['userEmail'],
            'userFullName' => $fields['userFullName'],
            'userTelephone' => $fields['userTelephone'],
            'userRoleID' => '3',
            'password' => bcrypt($fields['password']),
            'verification_code' => Str::random(32),
        ]);


        // create cart for user
        $cart = Cart::create([
            'id_user' => $user->userID,
        ]);

        // send email to user to verify email
        $emailController = new EmailController();
        $response = [
            'user' => $user,
            'token' => $user->email_verified_at ? $user->createToken('loginToken')->plainTextToken : 'unverified',
            'cart' => $cart,
            'message' => $emailController->sendEmailVerify($user->userEmail, $user->verification_code)
                != 'Email sent successfully'
                ? 'Register success, but email not sent'
                : 'Register success, please verify your email'
        ];

        return response($response, 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'username' => 'required|string|min:3',
            'password' => 'required|min:4',
        ]);

        $user = User::where('username', $fields['username'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Invalid username or password'
            ], 200);
        };

        // clear all the token of this user
        $user->tokens()->delete();
        // create new token if user is verified
        $token = $user->email_verified_at ? $user->createToken('loginToken')->plainTextToken : 'unverified';
        // add expire time to personal access token
        // $user->tokens()->where('name','loginToken')->update(['expires_at' => now()->addDay(1)]);
        $user->tokens()->where('name', 'loginToken')->update(['expires_at' => now()->addMinute(self::timeout)]);

        // remove username field in user data
        $userReturnData = [
            'userID' => $user->userID,
            // 'username' => $user->username,
            'userEmail' => $user->userEmail,
            'userFullName' => $user->userFullName,
            'userTelephone' => $user->userTelephone,
            'userRoleID' => $user->userRoleID,
            'userAvatar' => $user->userAvatar,
            'userAddress' => $user->userAddress,
            'userStatus' => $user->userStatus,
            // 'expiration' => $expiration,
        ];

        $response = [
            'user' => $userReturnData,
            'token' => $token,
            'message' => 'Login success'
        ];

        return response($response, 201);
    }

    public function googleSignIn(Request $request)
    {
        $fields = $request->validate([
            'id' => 'required|string|min:3',
            'email' => 'required|min:4',
        ]);

        $fields['given_name'] = $request->given_name;
        $fields['family_name'] = $request->family_name;
        $fields['picture'] = $request->picture;

        // check user exsting in database
        $user = User::where('userEmail', $fields['email'])->first();
        $m1 = null;
        if (!$user) {
            $m1 = 'User not found, Created new user';
            // create new user
            $user = User::create([
                'username' => $fields['given_name'] . $fields['id'],
                'userEmail' => $fields['email'],
                'userFullName' => $fields['given_name'] . $fields['family_name'],
                'userRoleID' => '3',
                'password' => bcrypt($fields['id']),
                'verification_code' => Str::random(32),
                'email_verified_at' => now(),
                'userAvatar' => $fields['picture'],
            ]);

            $cart = Cart::create([
                'id_user' => $user->userID,
            ]);

        }


        // clear all the token of this user
        $user->tokens()->delete();
        // create new token
        $token = $user->createToken('loginToken')->plainTextToken;
        // add expire time to personal access token
        // $user->tokens()->where('name','loginToken')->update(['expires_at' => now()->addDay(1)]);
        $user->tokens()->where('name', 'loginToken')->update(['expires_at' => now()->addMinute(self::timeout)]);



        $response = [
            'user' => $user,
            'token' => $token,
            'message' =>  $m1 == null ?  'Login success' : $m1,
            'request' => $fields
        ];

        return response($response, 201);
    }

    public function logout(User $user)
    {
        $user->tokens()->delete();

        return [
            'message' => 'User logged out'
        ];
    }
}
