<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Http\Models\Campaigns;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::apiResource('Campaings', 'App\http\Controllers\CampaignsController');

Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/user-create', function (Request $request){
    $password  = request() -> input('password');
    $password  = Hash::make($password);
    User::create([
        'name' => request() -> input('name'),
        'email' => request() -> input('email'),
        'password' => $password
     ]);
     return response('User Added', 200 ) -> 
        header('Content-Type', 'application/json');
});


Route::post('/login', function(){
    $credentials = request() -> only(['email','password']);
    if(auth() -> attempt($credentials)){
        $token = auth() -> attempt($credentials);
        return $token;
    }
    else {
        return response('User not found', 401) ->
            header('Content-Type', 'application/json');
    }
});

Route::middleware('auth') -> get('/mypost', function(){
    $user = auth() -> user();
    return [$user -> name, $user -> campaigns];
});