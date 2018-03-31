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
        }
        exit;

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
        $proxy_list = array (
            'list' =>
                array (
                    0 =>
                        array (
                            'host' => '114.230.31.244',
                            'port' => '14162',
                        ),
                    1 =>
                        array (
                            'host' => '223.245.181.57',
                            'port' => '23936',
                        ),
                    2 =>
                        array (
                            'host' => '182.42.44.197',
                            'port' => '38735',
                        ),
                    3 =>
                        array (
                            'host' => '180.107.164.59',
                            'port' => '28541',
                        ),
                    4 =>
                        array (
                            'host' => '115.226.147.209',
                            'port' => '36619',
                        ),
                    5 =>
                        array (
                            'host' => '183.149.240.52',
                            'port' => '21729',
                        ),
                    6 =>
                        array (
                            'host' => '120.37.165.151',
                            'port' => '65206',
                        ),
                    7 =>
                        array (
                            'host' => '123.55.92.217',
                            'port' => '49856',
                        ),
                    8 =>
                        array (
                            'host' => '222.189.244.221',
                            'port' => '59559',
                        ),
                    9 =>
                        array (
                            'host' => '58.219.90.39',
                            'port' => '23613',
                        ),
                    10 =>
                        array (
                            'host' => '114.232.94.238',
                            'port' => '32806',
                        ),
                    11 =>
                        array (
                            'host' => '122.4.45.119',
                            'port' => '44500',
                        ),
                    12 =>
                        array (
                            'host' => '117.64.2.161',
                            'port' => '24076',
                        ),
                    13 =>
                        array (
                            'host' => '125.109.192.211',
                            'port' => '27888',
                        ),
                    14 =>
                        array (
                            'host' => '183.149.252.58',
                            'port' => '31161',
                        ),
                    15 =>
                        array (
                            'host' => '121.237.138.162',
                            'port' => '21865',
                        ),
                    16 =>
                        array (
                            'host' => '183.149.225.162',
                            'port' => '46494',
                        ),
                    17 =>
                        array (
                            'host' => '180.121.129.249',
                            'port' => '58005',
                        ),
                    18 =>
                        array (
                            'host' => '113.128.30.54',
                            'port' => '58543',
                        ),
                    19 =>
                        array (
                            'host' => '117.86.204.128',
                            'port' => '48087',
                        ),
                    20 =>
                        array (
                            'host' => '117.87.176.115',
                            'port' => '27811',
                        ),
                    21 =>
                        array (
                            'host' => '117.90.252.164',
                            'port' => '56232',
                        ),
                    22 =>
                        array (
                            'host' => '36.248.132.119',
                            'port' => '22645',
                        ),
                    23 =>
                        array (
                            'host' => '123.163.20.42',
                            'port' => '32762',
                        ),
                    24 =>
                        array (
                            'host' => '115.202.185.100',
                            'port' => '62974',
                        ),
                    25 =>
                        array (
                            'host' => '114.227.36.218',
                            'port' => '65355',
                        ),
                    26 =>
                        array (
                            'host' => '115.219.104.66',
                            'port' => '56393',
                        ),
                    27 =>
                        array (
                            'host' => '1.198.13.112',
                            'port' => '22142',
                        ),
                    28 =>
                        array (
                            'host' => '171.80.184.21',
                            'port' => '12950',
                        ),
                    29 =>
                        array (
                            'host' => '112.194.40.126',
                            'port' => '22423',
                        ),
                    30 =>
                        array (
                            'host' => '58.217.26.99',
                            'port' => '44620',
                        ),
                    31 =>
                        array (
                            'host' => '115.230.68.225',
                            'port' => '40836',
                        ),
                    32 =>
                        array (
                            'host' => '112.233.108.115',
                            'port' => '23344',
                        ),
                    33 =>
                        array (
                            'host' => '223.153.97.7',
                            'port' => '43410',
                        ),
                    34 =>
                        array (
                            'host' => '175.147.97.150',
                            'port' => '25776',
                        ),
                    35 =>
                        array (
                            'host' => '180.114.224.156',
                            'port' => '31956',
                        ),
                    36 =>
                        array (
                            'host' => '114.223.62.92',
                            'port' => '63236',
                        ),
                    37 =>
                        array (
                            'host' => '123.161.152.128',
                            'port' => '42402',
                        ),
                    38 =>
                        array (
                            'host' => '115.213.147.47',
                            'port' => '46644',
                        ),
                    39 =>
                        array (
                            'host' => '61.130.225.7',
                            'port' => '20545',
                        ),
                    40 =>
                        array (
                            'host' => '114.99.27.153',
                            'port' => '48000',
                        ),
                    41 =>
                        array (
                            'host' => '180.121.132.140',
                            'port' => '36093',
                        ),
                    42 =>
                        array (
                            'host' => '110.85.89.84',
                            'port' => '23505',
                        ),
                    43 =>
                        array (
                            'host' => '114.99.87.52',
                            'port' => '56044',
                        ),
                    44 =>
                        array (
                            'host' => '114.223.60.215',
                            'port' => '26176',
                        ),
                    45 =>
                        array (
                            'host' => '60.167.20.206',
                            'port' => '22562',
                        ),
                    46 =>
                        array (
                            'host' => '125.104.242.176',
                            'port' => '21750',
                        ),
                    47 =>
                        array (
                            'host' => '115.202.92.54',
                            'port' => '32096',
                        ),
                    48 =>
                        array (
                            'host' => '49.85.2.193',
                            'port' => '32096',
                        ),
                    49 =>
                        array (
                            'host' => '121.206.71.170',
                            'port' => '29248',
                        ),
                    50 =>
                        array (
                            'host' => '110.85.89.209',
                            'port' => '56950',
                        ),
                    51 =>
                        array (
                            'host' => '60.182.238.46',
                            'port' => '64082',
                        ),
                    52 =>
                        array (
                            'host' => '183.149.238.45',
                            'port' => '42424',
                        ),
                    53 =>
                        array (
                            'host' => '59.60.209.171',
                            'port' => '28737',
                        ),
                    54 =>
                        array (
                            'host' => '61.143.17.4',
                            'port' => '25012',
                        ),
                    55 =>
                        array (
                            'host' => '222.212.169.232',
                            'port' => '10310',
                        ),
                    56 =>
                        array (
                            'host' => '1.195.10.9',
                            'port' => '32531',
                        ),
                    57 =>
                        array (
                            'host' => '121.237.140.174',
                            'port' => '20493',
                        ),
                    58 =>
                        array (
                            'host' => '49.76.10.6',
                            'port' => '13650',
                        ),
                    59 =>
                        array (
                            'host' => '122.246.50.38',
                            'port' => '10432',
                        ),
                    60 =>
                        array (
                            'host' => '110.85.89.209',
                            'port' => '56950',
                        ),
                    61 =>
                        array (
                            'host' => '60.182.238.46',
                            'port' => '64082',
                        ),
                    62 =>
                        array (
                            'host' => '183.149.238.45',
                            'port' => '42424',
                        ),
                    63 =>
                        array (
                            'host' => '59.60.209.171',
                            'port' => '28737',
                        ),
                    64 =>
                        array (
                            'host' => '61.143.17.4',
                            'port' => '25012',
                        ),
                    65 =>
                        array (
                            'host' => '222.212.169.232',
                            'port' => '10310',
                        ),
                    66 =>
                        array (
                            'host' => '1.195.10.9',
                            'port' => '32531',
                        ),
                    67 =>
                        array (
                            'host' => '121.237.140.174',
                            'port' => '20493',
                        ),
                    68 =>
                        array (
                            'host' => '49.76.10.6',
                            'port' => '13650',
                        ),
                    69 =>
                        array (
                            'host' => '122.246.50.38',
                            'port' => '10432',
                        ),
                )
        );
        $rand_num = rand(0, count($proxy_list["list"])-1);
        $proxy = $proxy_list["list"][$rand_num];
        //return $proxy["host"].':'.$proxy["port"];
        return "118.114.77.47:8080";
     }


    public function create() {
        $this->load->view('welcome_message');
    }
}

