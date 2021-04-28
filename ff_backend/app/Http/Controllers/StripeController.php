<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\Factory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Exception\ApiErrorException;
use Stripe\Stripe;

class StripeController extends Controller 
{
    //
    public function createSession(Request $request){
        \Stripe\Stripe::setApiKey(env("STRIPE_KEY",'sk_test_51IhzY5LCSLA6SrKuQJKgpKUIxJwHglUrlTe938gCn3nhsixQUrpVxjzmE5c9QGxY8qiBnAyMo1dqFfLMzqBPHIEe00z8eq3yVm'));

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => [[
              'price_data' => [
                'currency' => 'usd',
                'product_data' => [
                  'name' => 'T-shirt',
                ],
                'unit_amount' => 2000,
              ],
              'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => 'http://localhost:8000/success.html',
            'cancel_url' => 'http://localhost:8000/cancel.html',
          ]);
        $result = ['sessionId'=> $session['id']];
        return response()->json($result);
    }
}
