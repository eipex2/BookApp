<?php
# @Author: eipex
# @Date:   2017-06-09T13:54:55-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-06-12T16:37:13-05:00




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
            $table->integer('course_id')->unsigned();
            $table->integer('page_no')->unsigned();
            $table->string('content')->nullable();
            $table->foreign('user_id')
                  ->references('id')->on('users');
            $table->foreign('course_id')
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
