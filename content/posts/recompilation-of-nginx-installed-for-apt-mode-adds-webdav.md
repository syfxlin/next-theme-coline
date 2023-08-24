---
title: 为apt方式安装的nginx重新编译增加WebDAV
slug: recompilation-of-nginx-installed-for-apt-mode-adds-webdav
status: publish
published_time: 2019-05-05T00:00:00.000Z
modified_time: 2021-07-28T07:17:37.117Z
layout: post
categories:
  - 折腾记录
tags:
  - Apt
  - Nginx
  - Webdav
---

> 由于机房装了还原卡，重启就会恢复磁盘，作为 VSCode 的重度使用者实在受不了 Eclipse 这个编辑器，并且大部分时间也并非在编写 Java，所以博主搭建了 code-server 作为 Cloud IDE，把开发环境放到了服务器上，但是当回到了宿舍使用自己的笔电的时候 Cloud IDE 就派不上太大的用场(Node 除外，Node 这东西实在太吃性能了)，于是同步就成了大问题，这时有人会说用 Git，可惜 Git 并不具备实时性，在需要将服务部署在服务器上运行的时候操作就相对繁琐，所以就想到了挂载云端的文件到本地，然后 SSH 连接上服务器。
>
> \--- 假装有分割线 ---
>
> 之所以选择 webDAV 是因为它基于 HTTP，传输性能优于 SFTP 和 FTP， 同时能够利用 HTTP 的各种扩展，比如 HTTPS，HTTP 2.0 等等。

选择 Nginx 作为 webDAV 的服务程序是因为其轻量化，同时也可以为 PHP 等服务。

apt 安装的 Nginx 自带了一个`http_dav_module`，但是为了让 nginx 能够支持 WebDAV 规范中的`PROPFIND`和`OPTIONS`，还需要安装模块 `[nginx-dav-ext-module](https://github.com/arut/nginx-dav-ext-module)` 。

### 一、查看 Nginx 版本并下载对应源码包

```bash
# nginx -V
nginx version: nginx/1.14.0
built by gcc 7.3.0 (Ubuntu 7.3.0-27ubuntu1~18.04)
built with OpenSSL 1.1.1b  26 Feb 2019
TLS SNI support enabled
configure arguments: --with-cc-opt='-g -O2 -fdebug-prefix-map=/build/nginx-FIJPpj/nginx-1.14.0=. -fstack-protector-strong -Wformat -Werror=format-security -fPIC -Wdate-time -D_FORTIFY_SOURCE=2' --with-ld-opt='-Wl,-Bsymbolic-functions -Wl,-z,relro -Wl,-z,now -fPIC' --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --modules-path=/usr/lib/nginx/modules --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-debug --with-pcre-jit --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_auth_request_module --with-http_v2_module --with-http_dav_module --with-http_slice_module --with-threads --with-http_addition_module --with-http_geoip_module=dynamic --with-http_gunzip_module --with-http_gzip_static_module --with-http_image_filter_module=dynamic --with-http_sub_module --with-http_xslt_module=dynamic --with-stream=dynamic --with-stream_ssl_module --with-mail=dynamic --with-mail_ssl_module
```

其中`nginx version`就是 Nginx 版本，前往[http://nginx.org/download/](http://nginx.org/download/)下载对应的版本，并解压

```bash
# wget http://nginx.org/download/nginx-1.4.0.tar.gz
# tar xzf nginx-1.4.0.tar.gz
```

### 二、下载 nginx-dav-ext-module

进入 nginx-x.x.x 文件夹

```bash
# git clone https://github.com/arut/nginx-dav-ext-module.git
```

### 三、配置**configure**

首先复制上方`nginx -V`命令得到的`configure arguments`，进入 nginx-x.x.x 文件夹，加入`--add-module=./nginx-dav-ext-module`参数

```bash
# ./configure --with-cc-opt='-g -O2 -fdebug-prefix-map=/build/nginx-FIJPpj/nginx-1.14.0=. -fstack-protector-strong -Wformat -Werror=format-security -fPIC -Wdate-time -D_FORTIFY_SOURCE=2' --with-ld-opt='-Wl,-Bsymbolic-functions -Wl,-z,relro -Wl,-z,now -fPIC' --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --modules-path=/usr/lib/nginx/modules --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-debug --with-pcre-jit --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_auth_request_module --with-http_v2_module --with-http_dav_module --with-http_slice_module --with-threads --with-http_addition_module --with-http_geoip_module=dynamic --with-http_gunzip_module --with-http_gzip_static_module --with-http_image_filter_module=dynamic --with-http_sub_module --with-http_xslt_module=dynamic --with-stream=dynamic --with-stream_ssl_module --with-mail=dynamic --with-mail_ssl_module --add-module=./nginx-dav-ext-module
```

运行后可能会有出现报错，一般是都是依赖不存在导致的，利用 apt 安装对应的依赖，后重新运行一遍`configure`即可，**注意：**依赖是一个个报错的，请确认没有报错的情况下进行下一步。

#### 以下是部分常见的报错和依赖的安装方法

1\. rewrite 需要 pcre 支持
./configure: error: the HTTP rewrite module requires the PCRE library

```bash
# apt-get install libpcre3 libpcre3-dev
```

2\. http cache 需要 openssl
./configure: error: the HTTP cache module requires md5 functions from OpenSSL library

```bash
# apt-get install libssl-dev openssl
```

3\. 安装 libxslt
./configure: error: the HTTP XSLT module requires the libxml2/libxslt libraries

```bash
#  apt-get install libxslt-dev
```

4\. 缺少 GD library
./configure: error: the HTTP image filter module requires the GD library

```bash
# apt-get install libgd2-xpm libgd2-xpm-dev
```

5\. 安装 GeoIP library
./configure: error: the GeoIP module requires the GeoIP library

```bash
 # apt-get install libgeoip-dev
```

### 四、编译 Nginx

首先安装编译工具

```bash
# apt install make gcc g++
```

开始编译，**注意：**执行`make`即可，不需要再执行`make install`

```bash
# make
```

编译完后新的 nginx 二进制运行文件就出现再 objs 文件夹下，接下来只需要复制到`/usr/sbin`即可

先备份下

```bash
# cp /usr/sbin/nginx /usr/sbin/nginx.bak
```

然后复制新的 nginx 到/usr/sbin，并重启 nginx

```bash
# cp objs/nginx /usr/sbin/nginx
# nginx -s reload
```

### 五、配置 WebDAV

进入`/etc/nginx/sites-enabled`文件夹，新建一个`conf`文件，并使用以下配置文件

```nginx
server {
    # 监听的端口
    listen 8090;
    # 连接的地址
    server_name 119.3.59.114;
    charset utf-8,gbk;
    location / {
        set $dest $http_destination;
        if (-d $request_filename) {
            rewrite ^(.*[^/])$ $1/;
            set $dest $dest/;
        }
        if ($request_method ~ (MOVE|COPY)) {
            more_set_input_headers 'Destination: $dest';
        }

        if ($request_method ~ MKCOL) {
                        rewrite ^(.*[^/])$ $1/ break;
        }
        # 要进行WebDAV共享的文件夹
        root /home/coder;
        # alias /data/dav;
        autoindex on;
        dav_methods PUT DELETE MKCOL COPY MOVE;
        # 需要 nginx-dav-ext-module 才有下面的选项
        dav_ext_methods PROPFIND OPTIONS;
        create_full_put_path on;
        dav_access user:rw group:rw all:rw;
        auth_basic "Authorized Users Only";
        # 更改为你的htpasswd文件
        auth_basic_user_file /etc/nginx/syfxlin_htpasswd;
    }
}
```

接着重启 nginx 即可

### 结语

至此 WebDAV 就配置完成了，当时配置的时候就遇到了一大堆没有安装的依赖，依赖一个个跳出来，差点把我心态搞炸，好在最后还是编译成功了，上面的配置还有些问题，暂时还不支持移动和新建文件夹的操作，博主正在研究修复，请耐心等待(￣ ▽ ￣)"。
