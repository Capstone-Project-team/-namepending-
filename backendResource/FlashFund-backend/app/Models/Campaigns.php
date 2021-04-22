<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaigns extends Model
{
    use HasFactory;

    protected $fillable = [
        'Description',
        'Title',
        'Donation_Requested',
        'approval_status',
        'Donation_Collected'
    ];

    public function user(){
        return $this -> belongsTo(User::class, 'user');
    }

}
