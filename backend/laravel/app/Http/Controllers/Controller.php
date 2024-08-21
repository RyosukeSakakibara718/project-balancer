<?php

declare(strict_types=1);

abstract class Controller
{
    //
}

class ExampleController extends Controller
{
    public function divide(int $a, int $b): float
    {
        if ($b === 0) {
            return 'division by zero'; // 返り値で定義しているfloatではなく、stringを返すのでエラーになる
            // throw new \InvalidArgumentException('Division by zero');
        }

        return $a / $b;
    }

    public function process(): void
    {
        $this->undefinedMethod(); // 存在しないメソッドを呼び出しているのでエラーになる
    }

    // public function undefinedMethod(): string
    // {
    //     return "検証用";
    // }

}
