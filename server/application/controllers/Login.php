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
        $result = $this->curl_https($url, $form_data, $headers, "PB3_SESSION=".$pb3_session, 30, false);
        preg_match('/A2\=\"(.*)\"\;/', $result, $matches);
        if (!empty($matches[1])) {
            $A2 = $matches[1];
            $this->input->set_cookie(array(
                'name' => 'PB3_SESSION',
                'value' => $pb3_session
            ));
            $this->input->set_cookie(array(
                'name' => 'A2',
                'value' => $A2
            ));
            $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode(array('code' => 200, 'msg' => '登录成功')))
                ->_display();
            exit;

        } else {
            $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode(array('code' => 10001, 'msg' => '登录失败', 'result' => $result)))
                ->_display();
            exit;
        }
//        var_dump($pb3_session);

    }


    /** curl 获取 https 请求
     * @param String $url        请求的url
     * @param Array  $data       要發送的數據
     * @param Array  $header     请求时发送的header
     * @param int    $timeout    超时时间，默认30s
     * @param bool   $debug      是否打印错误信息，默认false
     */
    private function curl_https($url, $data=array(), $header=array(), $cookie, $timeout=60, $debug=false){
        $proxy = $this->get_proxy();
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 跳过证书检查
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);  // 从证书中检查SSL加密算法是否存在
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch,CURLOPT_COOKIE,$cookie);
        curl_setopt($ch, CURLOPT_PROXY, $proxy);
        curl_setopt($ch, CURLOPT_REFERER, $header['Referer']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
        curl_setopt ( $ch, CURLOPT_CONNECTTIMEOUT, 30 );
        curl_setopt ( $ch, CURLOPT_HEADER, true );

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

    private function get_proxy() {
        //$proxy = json_decode(file_get_contents('https://api.getproxylist.com/proxy?allowsHttps=1&protocol[]=http'));
        //return $proxy->ip.":".$proxy->port;
        return "59.67.152.230:3128";
     }


    public function create() {
        $this->load->view('welcome_message');
    }
}

