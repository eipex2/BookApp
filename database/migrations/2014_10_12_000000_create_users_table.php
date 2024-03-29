<?php
# @Author: eipex
# @Date:   2017-04-26T09:25:11-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-08-09T14:06:11-05:00




use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('firstname');
            $table->string('lastname');
            $table->string('email')->unique();
            $table->string('password', 60);
            $table->string('emoji')->default("😄 ");
            $table->string('color')->default("teal");
            // $table->string('type')->nullable();
            // $table->date('dob')->nullable();
            // $table->string('school')->nullable();
            // $table->string('sex')->nullable();
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
        Schema::drop('users');
    }
}
