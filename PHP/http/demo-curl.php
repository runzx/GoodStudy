<?php
/**
 * cURL封装类
 *
 * @author guo
 * @date 2016-12-17
 */
namespace app\home\Request;

class cURL
{
    private static $url = '';         // 访问的url
    private static $oriUrl = '';      // Referer url,告诉服务器来源页面
    private static $data = array();   // 可能发出的请求参数 get和post都有数组传参方式
    private static $method;           // 访问方式，默认是GET请求
    private static $cookie = '';      // 是否传递cookie; 默认为空, 需要时传入cookie参数
    private static $returnCookie = 0; // 是否返回cookie; 默认0不返回
 
    /*
     * 发送请求入口
     * **/
    public static function send($url, $data = array(), $method = 'get', $cookie = '', $returnCookie = 0)
    {
        //判断传入的url
        if (!$url) {
            return self::output('100', 'url不能为空!', '');
        }
        self::$url = $url;
        self::$data = $data;
        self::$method = $method;
        self::$oriUrl = request()->url(true);//助手函数request获取当前url
        self::$cookie = $cookie;
        self::$returnCookie = $returnCookie;
        // 请求方式判断
        if (!in_array(self::$method, array('get', 'post'))) {
            return self::output('101', '非法请求方式!', '');
        }
 
        return self::doRequest(self::$method);
    }
 
    /**
     * 基础发起curl请求函数
     * @param string $method 请求方式, get或者post
     */
    private static function doRequest($method)
    {
        $curl = curl_init(); //初始化curl
        /* get方式 */
        if ($method != 1) {
            self::$data = empty(self::$data) ? '' : self::dealGetData(self::$data);//处理get数据
            self::$url  = self::$url.self::$data;
        }
        curl_setopt($curl, CURLOPT_URL, self::$url); //抓取指定网页
        curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)');
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($curl, CURLOPT_AUTOREFERER, 1);
        curl_setopt($curl, CURLOPT_REFERER, self::$oriUrl); //来源,获取的当前站点url
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
        /* post方式数据传递 */
        if ($method == 1) {
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query(self::$data));
        }
 
        /* 如果提交了cookie参数, 传递cookie参数 */
        if (self::$cookie) {
            curl_setopt($curl, CURLOPT_COOKIE, self::$cookie);
        }
 
        curl_setopt($curl, CURLOPT_HEADER, self::$returnCookie); //是否返回cookie
        curl_setopt($curl, CURLOPT_TIMEOUT, 30); //超时设置
 
        /* 执行并获取数据 */
        $result = curl_exec($curl);
 
        /* 出错时的操作 */
        $error_num = curl_error($curl); // 获取错误码,正常时为0
        //出错时
        if ($error_num >0) {
            $error = include 'cURLError.php'; //载入错误信息
            $error_msg = $error[$error_num]; //获取对应错误信息
            return self::output($error_num, $error_msg, '');
        } else {
            $error_num = '0';
            $error_msg = "请求正常！";
            curl_close($curl); //关闭
 
            /* 如果返回cookie */
            if (self::$returnCookie) {
                list($header, $body) = explode("\r\n\r\n", $result, 2);
                preg_match_all("/Set\-Cookie:([^;]*);/", $header, $matches);
                $info['cookie']  = substr($matches[1][0], 1);
                $info['content'] = $body;
                return self::output($error_num, $error_msg, $info);
            } else {
                return self::output($error_num, $error_msg, $result);
            }
        }
    }
 
    /*
     * 处理get数据
     * @param array $data 传入的需要处理的数据
     * @return string 包含参数与值的字符串
     * **/
    public static function dealGetData($data)
    {
        $output = '?';
        foreach ($data as $k => $v) {
            $output .= $k.'='.$v.'&';
        }
        $output = substr($output, 0, -1);
        return $output;
    }
 
    /*
     * 返回数据
     * @param int $code 状态码,为0时是ok的没有出错正常请求
     * @param string $info  返回的错误信息
     * @param array $result 返回的数据
     * @return array
     * **/
    public static function output($code, $info, $result)
    {
        return array(
            'code'   => $code,
            'info'   => $info,
            'result' => $result
);
    }
}
