<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use App\User;
use App\Book;

class ProfileController extends Controller
{
    public function getCurrentUser(){
        $id = Auth::id();
        return response()->json(User::find($id));
    }

    public function getUserProfile(Request $request, $id){
        $user = User::with('listings.rents', 'rents.listing')->find($id);
        return response()->json($user);
    }

    public function getUserBooks(Request $request, $id){
        return response()->json(Book::where('user_id', $id)->get());
    }

    public function deleteBook(Request $request,$id,$book_id)
    {
        $book = new Book();
        $book->destroy($book_id);

        return response()->json(['success' => true]);
    }
}
