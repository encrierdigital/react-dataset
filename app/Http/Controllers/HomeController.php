<?php
/**
 * HomeController.php
 * Author: François Maujean
 * Created at: 30.12.2023 17:45
 * Project: ${PROJECT_NAME}
 */

namespace App\Http\Controllers;

class HomeController extends Controller
{
    public function index()
    {
        return view('home');
    }
}
