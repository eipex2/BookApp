<?php
# @Author: eipex
# @Date:   2017-07-05T21:34:09-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-20T12:07:54-05:00




use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChannelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('channels', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('name')->unique();
            $table->mediumText('about');
            $table->text('tags');
            $table->timestamps();
            $table->foreign('user_id')
                  ->references('id')->on('users');
        });

        // Schema::create('activities', function (Blueprint $table) {
        //     $table->increments('id');
        //     $table->integer('user_id')->unsigned();
        //     $table->integer('course_id')->unsigned();
        //     $table->integer('page_no')->unsigned();
        //     $table->string('content')->nullable();
        //     $table->foreign('user_id')
        //           ->references('id')->on('users');
        //     $table->foreign('course_id')
        //           ->references('id')->on('pages');
        //     $table->timestamps();
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('channels');
    }
}
