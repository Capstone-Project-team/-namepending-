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
        'Donation Requested',
        'Donation Collected',
        'Approval',
        'Date_end'
    ];
}
