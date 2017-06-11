<?php
# @Author: eipex
# @Date:   2017-06-09T13:54:55-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-06-09T14:16:22-05:00




use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('page_id')->unsigned();
            $table->string('content');
            $table->foreign('user_id')
                  ->references('id')->on('users');
            $table->foreign('page_id')
                  ->references('id')->on('pages');
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
        Schema::dropIfExists('activities');
    }
}
