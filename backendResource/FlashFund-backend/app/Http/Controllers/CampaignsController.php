<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Campaigns;

class CampaignsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $results = Campaigns:: where ('approval_status', 'true');
        $campaigns = $results -> get();
        return $campaigns;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request -> validate([
            'Title' => 'required'
        ]);

        $campaign = new Campaigns();

        $campaign -> Title = request('Title');
        $campaign -> Description = request('Description');
        $campaign -> Donation_Requested = request('Donation_Requested');
        $campaign -> user_id = Auth::id();

        $campaign -> save();
        return response('Campaign Added', 200 ) -> 
        header('Content-Type', 'application/json');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        return Campaigns::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $campaign = Campaigns::find($id);
        $campaign -> update($request -> all());
        return $campaign;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        return Post::destroy($id);
    }
}
