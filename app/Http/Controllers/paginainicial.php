<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class paginainicial extends Controller
{
    public function index()
    {
        return view("welcome");
    }
}
