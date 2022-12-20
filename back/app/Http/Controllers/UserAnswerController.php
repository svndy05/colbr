<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserAnswer;
use App\Models\User;
use App\models\Question;
class UserAnswerController extends Controller
{
      /**
     * Log in user 
     *  @param  \Illuminate\Http\Request  $request
    */
    public function registerAnswer(Request $request){
        $user_answer = $request->all();
        $user = User::where('email',$user_answer['email'])->firstOrFail();
        foreach ($user_answer['data'] as $key => $value) {
                $new = UserAnswer::create([
                'user_id'=> $user->id,
                'question_id'=> $value['questionId'],
                'answer'=> $value['answer'],
                ]);
        }

    }
}
