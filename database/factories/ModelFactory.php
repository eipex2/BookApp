<?php
# @Author: eipex
# @Date:   2017-05-29T11:02:01-05:00
# @Last modified by:   eipex
# @Last modified time: 2017-08-02T11:29:29-05:00




/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'firstname' => $faker->firstname,
        'lastname' => $faker->lastname,
        'email' => $faker->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        //'remember_token' => str_random(10),
    ];
});


$factory->define(App\PasswordReset::class, function (Faker\Generator $faker) {
    return [
        'email'  => $faker->safeEmail,
        'token' => str_random(10),
    ];
});

$factory->define(App\Channel::class, function(Faker\Generator $faker){
  return [
    'name' => $faker->word,
    'about'=>$faker->text,
    'tags' => [$faker->word]
  ];
});

$factory->define(App\Page::class, function(Faker\Generator $faker){
  return [
    'channel_id' => 1,
    'title' => $faker->word,
    'content'=> $faker->text
  ];
});

$factory->define(App\Message::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'sender_id' => rand(1,3),
        'recipient_id' => rand(1,3),
        'message' => $faker->text,
        'read' => false,
    ];
});
