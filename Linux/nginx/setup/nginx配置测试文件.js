/**
 * Created by zhaixiang on 2017/4/21.
 */
location / {
    index index.html index.php;
if (-f $request_filename/index.html){
    rewrite (.*) $1/index.html break;
}
if (-f $request_filename/index.php){
    echo "request_filename -f index.php = $request_filename";
    echo "request_filename -f index.php= $request_filename";
    echo "fastcgi_path_info -f index.php = $fastcgi_path_info";
    #rewrite (.*) $1/index.php;
}
if (!-f $request_filename){
    echo "request_filename !-f index.php = $request_filename";
    echo "fastcgi_script_name !-f index.php = $fastcgi_script_name";
    echo "fastcgi_path_info !-f index.php = $fastcgi_path_info";
    #rewrite (.*) /index.php;
}
}

# http://nginx.org/en/docs/http/ngx_http_rewrite_module.html