PHP FastCGI Example
# zx
location ~ \.php(.*)$  {
location ~ [^/]\.php(/|$) {
    fastcgi_split_path_info ^(.+?\.php)(/.*)$;
    if (!-f $document_root$fastcgi_script_name) {
        return 404;
    }

    # Mitigate https://httpoxy.org/ vulnerabilities
    fastcgi_param HTTP_PROXY "";

    fastcgi_pass 127.0.0.1:9000;
    fastcgi_index index.php;

    # include the fastcgi_param setting
    include fastcgi_params;

    # SCRIPT_FILENAME parameter is used for PHP FPM determining
    #  the script name. If it is not set in fastcgi_params file,
    # i.e. /etc/nginx/fastcgi_params or in the parent contexts,
    # please comment off following line:
    # fastcgi_param  SCRIPT_FILENAME   $document_root$fastcgi_script_name;
}

# Here’s the correct output for 
    http://lemp.test/test.php/foo/bar.php?v=1

array (
  'USER' => 'www-data',
  'HOME' => '/var/www',
  'FCGI_ROLE' => 'RESPONDER',
  'QUERY_STRING' => 'v=1',                          #
  'REQUEST_METHOD' => 'GET',
  'CONTENT_TYPE' => '',
  'CONTENT_LENGTH' => '',
  'SCRIPT_FILENAME' => '/var/www/test.php',         #
  'SCRIPT_NAME' => '/test.php',
  'PATH_INFO' => '/foo/bar.php',                    # 
  'REQUEST_URI' => '/test.php/foo/bar.php?v=1',     #
  'DOCUMENT_URI' => '/test.php/foo/bar.php',        #
  'DOCUMENT_ROOT' => '/var/www',
  'SERVER_PROTOCOL' => 'HTTP/1.1',
  'GATEWAY_INTERFACE' => 'CGI/1.1',
  'SERVER_SOFTWARE' => 'nginx/1.4.0',
  'REMOTE_ADDR' => '192.168.56.1',
  'REMOTE_PORT' => '44644',
  'SERVER_ADDR' => '192.168.56.3',
  'SERVER_PORT' => '80',
  'SERVER_NAME' => '',
  'HTTPS' => '',
  'REDIRECT_STATUS' => '200',
  'HTTP_HOST' => 'lemp.test',
  'HTTP_USER_AGENT' => 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:20.0) Gecko/20100101 Firefox/20.0',
  'HTTP_ACCEPT' => 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'HTTP_ACCEPT_LANGUAGE' => 'en-US,en;q=0.5',
  'HTTP_ACCEPT_ENCODING' => 'gzip, deflate',
  'HTTP_CONNECTION' => 'keep-alive',
  'PHP_SELF' => '/test.php/foo/bar.php',
  'REQUEST_TIME' => 1367829847,
)