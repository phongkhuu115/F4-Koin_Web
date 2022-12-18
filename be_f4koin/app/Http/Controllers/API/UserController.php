<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery\Generator\Method;
use PhpParser\Builder\Method as BuilderMethod;
use App\Models\Cart;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;

class UserController extends Controller
{
    // panigating for returning data
    public function paginate($items, $perPage, $page = null, $options = [])
    {
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }
    // 30day
    const timeout = 60 * 60 * 24 * 30;
    // const timeout = 60;
    public function isvalidRequest(Request $request)
    {
        if ($request->all() == null) {
            return false;
        } else {
            return true;
        }
    }

    // update expire time of token
    public function updateExpireTimeOfToken(Request $request)
    {
        try {
            $token = $request->bearerToken();
            $token = hash('sha256', $token);
            // update expire time
            DB::table('personal_access_tokens')->where('token', $token)->update(['expires_at' => now()->addMinute(self::timeout)]);
        } catch (\Throwable $th) {
        }
    }

    // check expired token
    public function isExpiredToken(Request $request)
    {
        $token = $request->bearerToken();
        $token = hash('sha256', $token);
        $token = DB::table('personal_access_tokens')->where('token', $token)->first();
        // if expired time is less than current time revoke token
        if ($token->expires_at < now()) {
            $token->delete();
            return true;
        } else {
            return false;
        }
    }

    // revoke token
    public function revokeToken($userID)
    {
        $token = DB::table('personal_access_tokens')->where('tokenable_id', $userID);
        $token->delete();
        return $token;
    }

    public function isAdmin(Request $request)
    {
        if ($request->user()->userRoleID == 1) {
            return true;
        } else {
            return false;
        }
    }

    public function index(Request $request)
    {
        if ($this->isAdmin($request)) {
            $user = User::all();
            return response()->json(
                [
                    'user' => $this->paginate($user, 10),
                    'message' => 'success',
                ],
                200
            );
        } else {
            return response()->json([
                'message' => 'You have no permission'
            ], 200);
        }
    }

    public function create(Request $request)
    {
        if ($this->isAdmin($request)) {
            // validate
            $isValid = $request->validate([
                'username' => 'required|string|min:3',
                'userEmail' => 'required|string|unique:users,userEmail',
                'password' => 'required|min:4|confirmed',
                'userFullName' => 'required|string',
                'userTelephone' => 'required|string'
            ]);
            if ($isValid) {
                $user = new User;
                $user->userName = $request->username;
                $user->userFullName = $request->userFullName;
                $user->userEmail = $request->userEmail;
                $user->password =  bcrypt($request->password);
                $user->userRoleID = $request->userRoleID;
                $user->userTelephone = $request->userTelephone;
                $user->userAddress = $request->userAddress;
                $user->userAvatar = $request->userAvatar;
                $user->userStatus = $request->userStatus;
                $isSuccess = $user->save();
                return response()->json([
                    'user created' => $user,
                    'status' => $isSuccess ?  'success' : 'fail'
                ], 200);
            }
        } else {
            return response()->json([
                'status' => 'fail',
                'message' => 'You have no permission'
            ], 200);
        }
    }

    public function getbyid(Request $request)
    {
        if ($this->isAdmin($request)) {
            $user = User::find($request->userID);
            return response()->json([
                'user found' => $user,
                'status' => $user != null ?  'success' : 'fail, please check userID'
            ], 200);
        } else {
            return response()->json([
                'message' => 'You have no permission'
            ], 200);
        }
    }


    public function edit(Request $request)
    {
        try {
            if ($this->isAdmin($request) && $this->isvalidRequest($request)) {
                return response()->json([
                    'status' => User::where('userID', User::find($request->username)->userID)->update([
                        'userName' => $request->username,
                        'userFullName' => $request->userFullName,
                        'userEmail' => $request->userEmail,
                        'password' =>  bcrypt($request->password),
                        'userTelephone' => $request->userTelephone,
                        'userAddress' => $request->userAddress,
                        'userAvatar' => $request->userAvatar,
                        'userStatus' => $request->userStatus,
                    ])    ?  'success' : 'fail, user not found',
                    'user updated' => User::where('username', $request->username)->get(),
                ], 200);
            } else {
                return response()->json([
                    // 'request' => $request->all(),
                    'message' => 'You have no permission'
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'request' => $request->all(),
                'message' => $th->getMessage()
            ], 200);
        }
    }

    public function stringToArray($string)
    {
        $string = explode(",", $string);
        // clear array
        return $string = array_filter($string);
    }

    public function destroy(Request $request)
    {
        try {
            if ($this->isvalidRequest($request)) {
                // check admin
                if ($this->isAdmin($request)) {
                    $userIDArr = $this->stringToArray($request->id);

                    foreach ($userIDArr as $userID) {
                        $this->revokeToken($userID);
                        // delete all item in cart of user
                        $isSuccess4 = DB::table('item_in_carts')->whereIn('id_cart', function ($query) use ($userID) {
                            $query->select('cartID')->from('carts')->where('id_user', $userID);
                        })->delete();
                        // delete all item_in_order of user
                        $isSuccess5 = DB::table('item_in_order')->whereIn('order_id', function ($query) use ($userID) {
                            $query->select('order_id')->from('orders')->where('user_id', $userID);
                        })->delete();

                        // delete all message have channelOfUser in message table
                        $channelOfUser = substr($userID, 0, 8) . DB::table('users')->where('userID', $userID)->first()->username;
                        $isSuccess8 = DB::table('messages')->where('channel_id', $channelOfUser)->delete();
                    }

                    // delete all cart have userID in cart table
                    $isSuccess1 = DB::table('carts')->whereIn('id_user', $userIDArr)->delete();
                    // delete all order have userID in order table
                    $isSuccess2 = DB::table('orders')->whereIn('user_id', $userIDArr)->delete();
                    // delete all message have userID in message table
                    $isSuccess6 = DB::table('messages')->whereIn('user_from', $userIDArr)->delete();
                    // delete all channel have userID in message table
                    $isSuccess7 = DB::table('channel')->whereIn('user_id', $userIDArr)->delete();
                    // delete all user have userID in user table
                    $isSuccess3 = User::destroy($userIDArr);
                    return response()->json([
                        'message' =>  $isSuccess3 ?  'success' : 'fail',
                        'user deleted' => $userIDArr
                    ], 200);
                } else {
                    return response()->json([
                        'message' => 'You have no permission'
                    ], 200);
                }
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => strpos($th->getMessage(), 'Attempt to read property') !== false ? 'user not found' : $th->getMessage()
            ], 200);
        }
        // valid request

    }

    // get my profile
    public function getmyprofile(Request $request)
    {
        try {
            // get token from request
            $token = $request->bearerToken();
            // hash token
            $token = hash('sha256', $token);
            // get userID from personal_access_tokens table
            $userID = DB::table('personal_access_tokens')->where('token', $token)->first()->tokenable_id;
            // check userID and hash token is exist in personal access token table
            $isMySelf = DB::table('personal_access_tokens')->where('tokenable_id', $userID)->where('token', $token)->count() > 0;

            if ($isMySelf && !$this->isExpiredToken($request)) {
                $user = User::find($userID);
                $this->updateExpireTimeOfToken($request);
                return response()->json(
                    [
                        'profile' => $user,
                        'message' => 'success'
                    ],
                    200
                );
            } else {
                return response()->json([
                    'message' => 'You Are Not Your Self, Who Are You?, What are you going to do :)?'
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 200);
        }
    }
}
