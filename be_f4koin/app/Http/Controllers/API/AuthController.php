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
            'password' => bcrypt($fields['password'])
        ]);

        // create cart for user
        $cart = Cart::create([
            'id_user' => $user->userID,
        ]);


        $token = $user->createToken('myToken')->plainTextToken;
        $this->updateExpireTimeOfToken(substr($token, 2));
        $response = [
            'user' => $user,
            'token' => $token,
            'cart' => $cart
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
        // create new token
        $token = $user->createToken('loginToken')->plainTextToken;
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
        if (!$user) {
            $m1 = 'User not found, Created new user';
            // create new user
            $user = User::create([
                'username' => $fields['given_name'] . $fields['id'],
                'userEmail' => $fields['email'],
                'userFullName' => $fields['given_name'] . $fields['family_name'],
                'userRoleID' => '3',
                'password' => bcrypt($fields['id'])
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
            'message' =>  $m1 == null ?  'Login success' : $m1
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
