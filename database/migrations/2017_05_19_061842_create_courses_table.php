<?php
# @Author: eipex
# @Date:   2017-05-19T01:35:41-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-05-23T03:13:48-05:00




use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('title');
            $table->string('subject');
            $table->integer('last_page_no')->unsigned()->default(0);
            $table->timestamps();
            $table->foreign('user_id')
                  ->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
