<?php

class ConventionsTest extends PHPUnit_Framework_TestCase
{

    /** @test */
    public function controllers_must_be_postfixed_with_controller_keyword()
    {
        $directory = new RecursiveDirectoryIterator($this->controllerPath());
        $iterator = new RecursiveIteratorIterator($directory);
        $regex = new RegexIterator($iterator, '/^.+\.php$/i', RecursiveRegexIterator::GET_MATCH);

        foreach ($regex as $filename => $r) {
            $this->assertStringEndsWith('Controller.php', $filename, 'Controllers deben finalizar con la palabra Controller');
        }
    }

    private function controllerPath()
    {
        $basePath = getcwd();
        return $basePath . '/app/Http/Controllers/';
    }
}
