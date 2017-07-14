<?php
# @Author: eipex
# @Date:   2017-07-05T22:09:10-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-11T14:26:54-05:00




use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('pages', function (Blueprint $table) {
          $table->increments('id');
          $table->integer('channel_id')->unsigned();
          $table->string('title');
          $table->string('content');
          $table->foreign('channel_id')
                ->references('id')->on('channels');
          $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pages');
    }
}
