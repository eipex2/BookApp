<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use App\User;
use App\Book;
use Image;
use File;

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

    public function updateAvatar(Request $request){
        //get current user
        $user = User::find($request->input('id'));

        $avatar = $request->file('file');
        $filename = time() . '.' . $avatar->getClientOriginalExtension();

        //TODO: add code to delete existing file and move files to appropriate storage

        Image::make($avatar)->resize(150,150)->save(public_path('uploads/avatars/' . $filename));
        $user->avatar = $filename;
        $user->save();
    }

    public function deleteBook(Request $request,$id,$book_id)
    {
        $book = new Book();
        $book->destroy($book_id);

        return response()->json(['success' => true]);
    }
}
