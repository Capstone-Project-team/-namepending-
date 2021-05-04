<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Http\Models\Campaigns;
use App\Models\User;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\StripeController;
use Stripe\Stripe;

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
Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'me']);
    
});
Route::get('/campaigns/top',[CampaignController::class, 'top']);
Route::get('/campaigns/pending',[CampaignController::class, 'pending']);

Route::apiResource('campaigns', 'App\http\Controllers\CampaignController');

Route::post('/admin', function(Request $request){
        $password  = request() -> input('password');
        $password  = Hash::make($password);
        $type = 3;

        User::create([
            'name' => request() -> input('name'),
            'email' => request() -> input('email'),
            'password' => $password,
            'user_type' => $type
         ]);
        return response('User Added', 200 ) -> 
        header('Content-Type', 'application/json');
});



Route::post('/stripe',[StripeController::class,'createSession']);
Route::get('/payment-success',[StripeController::class,'paymentSuccess']);

Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth') -> get('/mypost', function(){
    $user = auth() -> user();
    return [$user -> name, $user -> campaigns];
});
