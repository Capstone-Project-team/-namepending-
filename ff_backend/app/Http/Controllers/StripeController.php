<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\Factory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Exception\ApiErrorException;
use Stripe\Stripe;
use App\Models\Campaigns;

class StripeController extends Controller 
{
    //
    public function createSession(Request $request){
        \Stripe\Stripe::setApiKey(env("STRIPE_KEY",'sk_test_51IhzY5LCSLA6SrKuQJKgpKUIxJwHglUrlTe938gCn3nhsixQUrpVxjzmE5c9QGxY8qiBnAyMo1dqFfLMzqBPHIEe00z8eq3yVm'));

        $userEmail = request()->input('email');
        $id = request()->input('id');
        $donation = request()->input('donation');
        $title = request()->input('title');
        $port = env("CLIENT_PORT",3000);

        $session = Session::create([
            'payment_method_types' => ['card'],
            'customer_email' => $userEmail,
            'line_items' => [[
              'price_data' => [
                'currency' => 'usd',
                'product_data' => [
                  'name' => $title,
                ],
                'unit_amount' => $donation,
              ],
              'quantity' => 1,
            ]],
            'mode' => 'payment',
            //'success_url' => route('payment-success',['campaign_id'=>$id, 'dono'=>$donation]),
            'success_url' => url("/api/payment-success?id={$id}&dono={$donation}"),
            'cancel_url' => "http://localhost:{$port}/home",
          ]);
        $result = ['sessionId'=> $session['id']];
        return response()->json($result);
    }
    public function paymentSuccess(Request $request){
      $donation = (int) $request->input('dono') / 100;
      $id = (int) $request->input('id');
      //return $request;
      $port = env("CLIENT_PORT",3000);
      $campaign = Campaigns::find($id);
      $campaign -> increment('Donation Collected',$donation);
      //return $campaign;
      return redirect()->to("http://localhost:{$port}/home");
    }
}
