<?php
# @Author: eipex
# @Date:   2017-07-14T22:22:19-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-07-14T22:24:42-05:00




use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('channel_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')
                      ->references('id')->on('users');
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
        Schema::dropIfExists('subscriptions');
    }
}
