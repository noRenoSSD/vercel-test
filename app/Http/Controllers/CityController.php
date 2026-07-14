<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CityController extends Controller
{
    public function index()
    {
        // Optimasi: Gunakan pagination atau limitasi absolut di lingkungan serverless
        $cities = City::latest()->take(50)->get();
        
        return Inertia::render('Cities/Index', [
            'cities' => $cities
        ]);
    }

    public function store(Request $request)
    {
        // Validasi ketat meminimalisir injeksi data kotor ke Aiven MySQL
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'province' => 'required|string|max:255',
        ]);

        City::create($validated);

        return redirect()->back();
    }
}