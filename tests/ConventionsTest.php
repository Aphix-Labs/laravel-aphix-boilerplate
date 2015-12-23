<?php

class ConventionsTest extends PHPUnit_Framework_TestCase
{

    /** @test */
    public function controllers_must_be_postfixed_with_controller_keyword()
    {
        $directory = new RecursiveDirectoryIterator($this->controller_path());
        $iterator = new RecursiveIteratorIterator($directory);
        $regex = new RegexIterator($iterator, '/^.+\.php$/i', RecursiveRegexIterator::GET_MATCH);

        foreach ($regex as $filename => $r) {
            $this->assertStringEndsWith('Controller.php', $filename, 'Controllers deben finalizar con la palabra Controller');
        }
    }

    /** @test */
    public function filenames_must_start_with_uppercase()
    {
        $directory = new RecursiveDirectoryIterator($this->app_path());
        $iterator = new RecursiveIteratorIterator($directory);
        $regex = new RegexIterator($iterator, '/^.+\.php$/i', RecursiveRegexIterator::GET_MATCH);

        foreach ($regex as $fullpath => $r) {
            $filename = basename($fullpath);

            if ($filename != 'routes.php') {
                $this->assertEquals($filename, ucfirst($filename), 'Clases deben comenzar con mayusculas');

                $classname = $this->file_get_php_classes($fullpath)[0];
                $this->assertEquals($filename, $classname . '.php', 'Clase debe llamarse igual a nombre de archivo');
            }
        }
    }

    private function app_path()
    {
        $basePath = getcwd();
        return $basePath . '/app/';
    }

    private function controller_path()
    {
        $basePath = getcwd();
        return $basePath . '/app/Http/Controllers/';
    }

    private function file_get_php_classes($filepath) {
        $php_code = file_get_contents($filepath);
        $classes = $this->get_php_classes($php_code);
        return $classes;
    }

    private function get_php_classes($php_code) {
        $classes = array();
        $tokens = token_get_all($php_code);
        $count = count($tokens);
        for ($i = 2; $i < $count; $i++) {
            if (   $tokens[$i - 2][0] == T_CLASS
                && $tokens[$i - 1][0] == T_WHITESPACE
                && $tokens[$i][0] == T_STRING) {

                $class_name = $tokens[$i][1];
                $classes[] = $class_name;
            }
        }
        return $classes;
    }
}
