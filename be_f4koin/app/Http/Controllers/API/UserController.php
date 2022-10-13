<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function isvalidRequest(Request $request)
    {
       if($request->all() == null){
           return false;
         }else{
              return true;
            }   
    }
    public function isAdmin(Request $request)
    {
        if ($request->user()->userRoleID == 1) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($this->isAdmin($request)) {
            $user = User::all();
            return response()->json($user);
        } else {
            return response()->json([
                'message' => 'You have no permission'
            ], 401);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
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
            ], 401);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {      
        try {
            if ($this->isAdmin($request) && $this->isvalidRequest($request)) {       
                    return response()->json([
                        'status' => User::where('userID',User::find($request->username)->userID)->update([
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
            } 
            else {
                return response()->json([
                    // 'request' => $request->all(),
                    'message' => 'You have no permission'
                ], 401);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'request' => $request->all(),
                'message' => $th->getMessage()
            ], 401);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        // valid request
        if($this->isvalidRequest($request)){
            // check admin
            if ($this->isAdmin($request)) {
                $user = User::where('username',$request->username);
                if ($user == null || $user->count() == 0) {
                    return response()->json([
                        'message' => 'User not found'
                    ], 404);
                } else {
                    return response()->json([
                        'user deleted' => $user->get(),
                        'status' => $user->delete() ?  'success' : 'fail'
                    ], 200);
                }
            } else {
                return response()->json([
                    'message' => 'You have no permission'
                ], 401);
            }
        }
    }
    
}
