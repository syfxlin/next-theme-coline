---
title: Laravel生成目录树
slug: laravel-generating-directory-tree
status: publish
published_time: 2019-03-15T00:00:00.000Z
modified_time: 2021-07-28T07:19:11.829Z
layout: post
categories:
  - 折腾记录
tags:
  - Laravel
  - PHP
  - 目录树
---

> 在 XK-Note 项目中由于需要读取取所有文件夹和所有文件，但是 Laravel 并没有提供生成目录树的函数，所以只能自己动手丰衣足食。ㄟ( ▔, ▔ )ㄏ

Laravel 提供了一个强大的文件系统抽象，我们可以直接使用，这样就不会使目录树只支持从本地存储生成。

## 实现原理

Laravel 内置了 `Storage::files($directory)`可以读取指定目录下的文件并生成一个索引数组， `Storage::directories($directory)`可以读取指定目录下的子目录并生成索引数组，利用这两个函数就可以将指定文件夹下的所有文件和所有子文件夹的信息都存入数组中，然后可以递归提取出来的子文件夹进行深层查找，直到没有子文件夹为止，但是这样提取出来的数组会变得乱七八糟的，在生成目录列表的时候就不容易，所以要在递归的同时修改生成的索引数组。

![](images/f4f040b4-b7a2-44d0-9a12-16d95be754dd.jpg)

生成的目录树结构如上，当 key 为数字时则代表 value 为文件，当 key 为字符串时则代表 value 为文件夹。

## 实现代码

### FolderModel

```php
namespace App\Http\Models;
use Illuminate\Support\Facades\Storage;

class FolderModel
{
    /**
     * 获取文件夹树
     */
    public function get_folders($dir = "")
    {
        $dirs = Storage::directories($dir);
        $dira = Storage::files($dir);
        foreach ($dirs as $name) {
            array_splice($dirs, 0, 1);
            if(Storage::directories($name) == []) {
                $dirs[$name] = Storage::files($name);
            } else {
                $dirs[$name] = $this->get_folders($name);
                array_merge($dirs[$name],Storage::files($name));
            }
        }
        foreach ($dira as $num => $value) {
            $dirs[$num] = $value;
        }
        return $dirs;
    }
}
```

### FolderController

```php
amespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Models\FolderModel;

class FolderController extends Controller
{
    /**
     * 文件夹html
     */
    public $out;
    public function get_folders($dir)
    {
        global $out;
        $folder = new FolderModel();
        $arr = $folder->get_folders($dir);
        $this->print_folders($arr, "");
        return $out;
    }
    /**
     * 将文件夹树生成html
     * @param Array $arr 文件夹树
     */
    public function print_folders($arr)
    {
        global $out;
        if($arr !== []) {
            foreach ($arr as $dir => $file) {
                if(gettype($dir) == 'integer') {
                    if(strrpos($file, '/') !== false) {
                        $file_name = substr($file, strrpos($file, '/') + 1);
                    } else {
                        $file_name = $file;
                    }
                    if(preg_match("/(.txt|.md)/i", $file_name)) {
                        $file = str_replace('uid_'.Auth::id().'/', '', $file);
                        $li_id = str_replace('.', '', $file);
                        $li_id = str_replace('/', '', $li_id);
                        $out .= '<li dir="'.$file.'" id="'.$li_id.'" class="dc"><a href="#"><i class="icon icon-file-text"></i>'.$file_name.'</a></li>';
                    }
                } else {
                    $dir = str_replace('uid_'.Auth::id().'/', '', $dir);
                    $dir_old = $dir;
                    if(strrpos($dir, '/') !== false) {
                        $dir = substr($dir, strrpos($dir, '/') + 1);
                    }
                    $out .= '<li dir="'.$dir_old.'" class="dp"><a href="#"><i class="icon icon-folder-close"></i>'.$dir.'</a><ul>';
                    $out .= $this->print_folders($file);
                    $out .= '</ul>';
                }
            }
        }
        $out .= '</li>';
    }
}
```
