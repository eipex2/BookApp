<?php
# @Author: eipex
# @Date:   2017-04-26T09:25:11-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-05-19T01:43:57-05:00




/***
  Listing controller handles saving, editing, retrieving listings
**/
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use App\Listing;
use AntoineAugusti\Books\Fetcher;
use AntoineAugusti\Books\InvalidResponseException;
use GuzzleHttp\Client;

class ListingController extends Controller
{

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {   try {
          $listings = Listing::with('user')->paginate(10);
      } catch (Exception $e) {
        return response()->error($e->getMessage());
      }

      return response()->json($listings);
  }

  // public function index()
  // {
  //     try {
  //       $listings = Listing::with('user')
  //                   ->orderBy('created_at', 'desc')
  //                   ->get();
  //     } catch (Exception $e) {
  //       response()->error($e->getMessage);
  //     }
  //     return response()->success(compact('listing',$listings));
  // }

  public function count()
  {
    $count = Listing::count();
    return response()->success(compact('count', $count));
  }


  /**
   * Display one listing
   *@param $id - id of listing
   * @return \Illuminate\Http\Response
   */
  public function show(Request $request, $id)
  {
    return response()->json(Listing::with('user','rents.user')->find($id));
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
      try{
          $this->validate($request, [
              'isbn'  => 'required',
          ]);

          $listing = new Listing;
          $listing->isbn = $request->input('isbn');
          $listing->title = $request->input('title');
          $listing->category = $request->input('category');
          $listing->thumbnail = $request->input('thumbnail');
          $listing->user_id = Auth::id();
          $listing->buy_price = $request->input('buyPrice');
          $listing->rent_price = $request->input('rentPrice');
          $listing->active = true;
          $listing->save();

      }catch(Exception $e){
          return response()->error($e->getMessage());
      }

      return response()->success(compact('listing'));
  }

  public function getBookInfo(Request $request, $isbn)
  {
    try{
      $client = new Client(['base_uri' => 'https://www.googleapis.com/books/v1/']);
      $fetcher = new Fetcher($client);
      $book = $fetcher->forISBN($isbn);
    }catch(InvalidResponseException $e){
      return response()->error("Book not found");
    }

    return response()->success(compact('book',$book));
  }
}
