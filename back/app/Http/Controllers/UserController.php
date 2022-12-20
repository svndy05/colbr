<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\QuestionAnswer;
// use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    /**
     * Register user 
     *@param  \Illuminate\Http\Request  $request
    */
    public function register(Request $request){
        $form = $request->all();
        $user = User::create([
            'firstname'=> $form['firstname'],
            'name'=> $form['name'],
            'email'=> $form['email'],
            'password'=> Hash::make($form['password']),
        ]);
    }

     /**
     * Log in user 
     *  @param  \Illuminate\Http\Request  $request
    */
    public function Login(Request $request){
        $form = $request->all();
        $user = User::where('email',$request['email'])->firstOrFail();
        $ifAnswer = count(User::where('email',$user->email)->firstOrFail()->answer);
        if (Hash::check($request['password'], $user->password)) {
            return response()->json(['email' => $user->email, 'firstname' => $user->firstname, "answer" => $ifAnswer]);
        }
        else{
            return response('User Not found', 404);
        }
    }

    /**
     * Get answer of the user;
     *
     * @param  string  $email
    */
    public function getUserAnswer($email)
    {
        return User::where('email',$email)->firstOrFail()->answer;
    }

    
}
