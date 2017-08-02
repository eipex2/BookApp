<?php
# @Author: eipex
# @Date:   2017-07-29T15:46:07-04:00
# @Last modified by:   eipex
# @Last modified time: 2017-08-02T10:39:20-05:00




use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\User;
use Carbon\Carbon;

class PageTest extends TestCase
{
    public function testPostAPage()
    {
      $page = factory(App\Page::class)->create();

      $this->authUserPost('/api/page/store_page', [
          'channel_id'    => $page->channel_id,
          'title' => $page->title,
          'content' => $page->content,
      ])
      ->seeApiSuccess();

      //$this->assertTrue(false);
    }

    public function testGetPage()
    {
      // $uri = 'page/1';
      //
      // $this->authUserGet($uri)->seeJsonKey('page');
    }


    public function testPageRetrievalAfter24hrs()
    {

      $channel = factory(App\Channel::class)->create();
      $created_at = Carbon::createFromDate(2017, 8, 1);
      $updated_at = Carbon::createFromDate(2017, 8, 1);

      $page = factory(App\Page::class)->create([
        'channel_id' => $channel->id,
        'created_at' => $created_at,
        'updated_at' => $updated_at
      ]);

      $this->authUserPost('/api/page/store_page', [
          'channel_id'    => $page->channel_id,
          'title' => $page->title,
          'content' => $page->content,
      ]);

      $uri = 'channel/{$channel->id}';

      $this->authUserGet($uri)->seeApiSuccess();
    }
}
