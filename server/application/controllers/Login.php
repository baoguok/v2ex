<?php

class Login extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('cookie');
    }

    public function index() {
        $form_data = $this->input->post();
        $pb3_session = $this->input->cookie('PB3_SESSION');
        $url = 'https://www.v2ex.com/signin';
        $headers = array(
            "Content-Type" => "application/x-www-form-urlencoded",
            "Origin" => "https://www.v2ex.com",
            "Referer" => "https://www.v2ex.com/signin",
            "Pragma" => "no-cache",
            "upgrade-insecure-request" => 1
        );
        $result = $this->curl_https($url, $form_data, $headers, "PB3_SESSION=".$pb3_session, 30, true);
        var_dump($result);
//        var_dump($pb3_session);

    }


    /** curl 获取 https 请求
     * @param String $url        请求的url
     * @param Array  $data       要發送的數據
     * @param Array  $header     请求时发送的header
     * @param int    $timeout    超时时间，默认30s
     * @param bool   $debug      是否打印错误信息，默认false
     */
    public function curl_https($url, $data=array(), $header=array(), $cookie, $timeout=30, $debug=false){

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 跳过证书检查
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  // 从证书中检查SSL加密算法是否存在
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch,CURLOPT_COOKIE,$cookie);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);

        $response = curl_exec($ch);
        preg_match('/Set-Cookie:(.*);/iU',$response,$str);
        if($error=curl_error($ch)){
            print_r($error);
            die($error);
        }

        // 打印错误信息
        if($debug)
        {

            echo '=====info====='."\r\n";
            print_r( curl_getinfo($ch) );

            echo '=====error====='."\r\n";
            print_r( curl_error($ch) );

            echo '=====$response====='."\r\n";
            print_r( $response );
            print_r($str);

        }
        curl_close($ch);

        return $response;

    }


    public function create() {
        $this->load->view('welcome_message');
    }
}