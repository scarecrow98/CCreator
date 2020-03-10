<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class ControllerTest extends TestCase
{
    public function testFunction()
    {
        $this->get('/test');

        $this->assertEquals(
            "Test works", $this->response->getContent()
        );
    }
}
