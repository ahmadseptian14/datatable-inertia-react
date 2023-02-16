<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public $loadDefault = 10;

    public function index(Request $request)
    {
        $users = (
            UserResource::collection(User::paginate($request->load))
        )->additional([
            'attributes' => [
                'total' => User::count(),
                'per_page' => 10
            ],
            'filtered' => [
                'load' => $request->load ?? $this->loadDefault
            ]
        ]);

        return inertia('Users/Index', [
            'users' => $users
        ]);
    }
}
