<?php
# @Author: eipex
# @Date:   2016-12-01T13:46:23-06:00
# @Last modified by:   eipex
# @Last modified time: 2017-08-01T09:11:44-05:00





class LaravelRoutesTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testLandingResponseCode()
    {
        $response = $this->call('GET', '/');

        $this->assertEquals(200, $response->status());
    }

    // public function testUnsupportedBrowserPage()
    // {
    //     $this->visit('/unsupported-browser')
    //          ->see('update your browser')
    //          ->see('Internet Explorer');
    // }
}
