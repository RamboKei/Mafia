<!DOCTYPE HTML>
<html>
<head>
    <?php 
//        print_r($_SERVER);
        $iparr = array(
            // "192.168.101.67",
            // "118.144.133.12",
        );
        
        $isTest=false;
        if(in_array($ip,$iparr)||(isset($_REQUEST['raytestol'])&&$_REQUEST['raytestol']=='testol'))
        {
            $isTest=true;
        }
        $urlCfg = array(
            // 3k
            "gt_3k"=>"//gt-3kwan-cdn.raygame3.com/gt_3k/",
            "gt_test3k"=>"//gt-3kwan-cdn.raygame3.com/gt_test3k/",

            //疯狂游乐场
            "gt_fkylc"=>"//gt-fkylc-cdn.raygame3.com/gt_testfkylc/",
            "gt_testfkylc"=>"//gt-fkylc-cdn.raygame3.com/gt_testfkylc/",

            //港台和悦
            "gt_tw"=>"//gdcdn.heyyogame.com/gt_tw/",
            "gt_testtw"=>"//gdcdn.heyyogame.com/gt_testtw/",

            //玩吧
            "gt_wanba"=>"//wanba-cdn-1251001051.file.myqcloud.com/gt_wanba/",
            "gt_testwanba"=>"//wanba-cdn-1251001051.file.myqcloud.com/gt_testwanba/",

            //享乐源
            "gt_xly"=>"//gt-xly-cdn.raygame3.com/gt_xly/",
            "gt_testxly"=>"//gt-xly-cdn.raygame3.com/gt_testxly/",

            //应用宝
            "gt_yyb"=>"//gt-yyb-cdn.raygame3.com/gt_yyb/",
            "gt_testyyb"=>"//gt-yyb-cdn.raygame3.com/gt_testyyb/",

            //致劲联运
            "gt_zjly"=>"//gt-zjly-cdn.raygame3.com/gt_zjly/",
            "gt_testzjly"=>"//gt-zjly-cdn.raygame3.com/gt_testzjly/",

            //ewan
            "gt_ewan"=>"//gt-ewan-cdn.raygame3.com/gt_ewan/",
            "gt_testewan"=>"//gt-ewan-cdn.raygame3.com/gt_testewan/",

            //疯狂长尾
            "gt_fkcw"=>"//gt-fkcw-cdn.raygame3.com/gt_fkcw/",
            "gt_testfkcw"=>"//gt-fkcw-cdn.raygame3.com/gt_testfkcw/",

            //49游
            "gt_49y"=>"//gt-49y-cdn.raygame3.com/gt_49y/",
            "gt_test49y"=>"//gt-49y-cdn.raygame3.com/gt_test49y/",

            //韩国
            "gt_kr"=>"//gtcdn.mayngames.co.kr/gt_kr/",
            "gt_testkr"=>"//gtcdn.mayngames.co.kr/gt_testkr/",

            //私服
            "gt_sf"=>"//gt-sf-cdn.raygame3.com/gt_sf/",
            "gt_testsf"=>"//gt-sf-cdn.raygame3.com/gt_testsf/",

            //9130
            "gt_9130"=>"//gt-9130-cdn.raygame3.com/gt_9130/",
            "gt_test9130"=>"//gt-9130-cdn.raygame3.com/gt_test9130/",

            //cps
            "gt_cps"=>"//gt-cps-cdn.raygame3.com/gt_cps/",
            "gt_testcps"=>"//gt-cps-cdn.raygame3.com/gt_testcps/",
            );

            $appNameCfg=array(
                "kr"=>"역천",
                );

            $useImgCfg=array(
                "kr"=>1,
            );

            $domainCfg=array(
                "wanba"=>"5a26626c-0.gz.1251001051.clb.myqcloud.com",
                "3k"=>"gt-cn-in.raygame3.com",
                "local"=>"192.168.8.82",
                "locals"=>"local-test-82.raygame3.com",
                "test"=>"gt-test.raygame3.com",
                "yyb"=>"gt-yyb-web01.raygame3.com",
                "tw"=>"gd-game.heyyogame.com",
                "fkylc"=>"gt-fkylc-web01.raygame3.com",
                "xly"=>"gt-xly-web01.raygame3.com",
                "xzy"=>"gt-xzy-web01.raygame3.com",
                "iosshenhe"=>"gt-shenhe.raygame3.com",
                "zjlx"=>"gt-zjly-web01.raygame3.com",
                "ewan"=>"gt-ewan-web01.raygame3.com",
                "49y"=>"gt-49y-web01.raygame3.com",
                "sf"=>"gt-sf-web01.raygame3.com",
                "kr"=>"gt-kr-web01.mayngames.co.kr",
                "fkcw"=>"gt-fkcw-web01.raygame3.com",
                "9130"=>"gt-9130-web01.raygame3.com",
                "cps"=>"gt-cps-web01.raygame3.com",
            );

        $ip = $_SERVER['REMOTE_ADDR'];
        $requri = $_SERVER['REQUEST_URI'];
        $isfind=false;
        $domainKey='';
        if(strstr($requri,"?"))
        {
            $requri = substr($requri,0,stripos($requri,'?'));
        }
        if(substr($requri,strlen($requri)-1,1)=='/')
        {
            $requri=substr($requri,0,strlen($requri)-1);
        }
        else 
        {
            if(strstr($requri,"."))
            {
                $requri=substr($requri,0,strripos($requri,'/'));
            }
        }
        if(strstr($requri,"/"))
        {
            $requri=substr($requri,strripos($requri,'/')+1);
            if($urlCfg[$requri])
            {
                $isfind=true;
            }
        }
        else if($_SERVER['HTTP_HOST']!=$requri&&$urlCfg[$requri])
        {
            $isfind=true;
        }
        else
        {
            if($urlCfg[$requri])
            {
                $isfind=true;
            }
        }
        if($isfind==true)
        {
            if($isTest==true)
            {
                if(strstr($requri,"gt_")&&!strstr($requri,"gt_test"))
                {
                    $requri=str_replace("gt_","gt_test",$requri);
                }
            }
            echo '<base href="'.$urlCfg[$requri].'" />';
        }
        if(strstr($requri,"gt_"))
        {
            $domainKey=str_replace("gt_","",$requri);
            if(strstr($requri,"test")&&!$domainCfg[$domainKey])
            {
                $domainKey=str_replace("test","",$domainKey);
            }
        }
    ?>

    <meta charset="utf-8">
    <?php 
        echo '<title>'.($appNameCfg[$domainKey]?$appNameCfg[$domainKey]:'极品大官人').'</title>';
    ?>

    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-control" content="no-cache">
    <meta http-equiv="Cache" content="no-cache">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="full-screen" content="true" />
    <meta name="screen-orientation" content="portrait" />
    <meta name="x5-fullscreen" content="true" />
    <meta name="x5-orientation" content="portrait"/>
    <meta name="360-fullscreen" content="true" />
    <style>
        html, body {
            -ms-touch-action: none;
            background: #131F2C;
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }
        progress::-webkit-progress-bar {
            background-color: #001219;
        }
        
        progress::-webkit-progress-value {
            background-color: #21BDE1;
        }
    </style>
</head>

<body>
    <div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
         data-entry-class="Main"
         data-orientation="portrait"
         data-scale-mode="fixedWidth"
         data-frame-rate="30"
         data-content-width="640"
         data-content-height="1136"
         data-multi-fingered="2"
         data-show-fps="false" data-show-log="false"
         data-show-fps-style="x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9">
    </div>
    <?php
        if($useImgCfg[$domainKey])
        {
            echo '<div id="alertdiv" style="position:absolute;width:100%;top:20%;height:60%; left:0;text-align:center;color:white;font-size:20px;">
        <img src="loding.jpg?vs=4"></br>
        <progress id="loadJsProgress" value="15" max="100" style="position:relative;text-align:center;background:white;width:13em;height:0.3em;top:40%"></progress>
    </div>
    <script type="text/javascript">
        document.getElementById("alertdiv").style.fontSize =Math.ceil(20*document.body.scrollWidth/320)+"px";
    </script>';
        }
        else
        {
            echo '<div id="alertdiv" style="position:absolute;width:100%;top:30%;height:60%; left:0;text-align:center;color:white;font-size:20px;">
                <tl id="rayIdxTitle" style="color: #b0faff;font-size: 30;">健康游戏忠告</tl><br>
                <tf id="rayIdxDesc1" style="color: #6ebdc6;font-size: 26;">抵制不良游戏，拒绝盗版游戏。</tf><br>
                <tf id="rayIdxDesc2" style="color: #6ebdc6;font-size: 26;">注意自我保护，谨防上当受骗。</tf><br>
                <tf id="rayIdxDesc3" style="color: #6ebdc6;font-size: 26;">适度游戏益脑，沉迷游戏伤身。</tf><br>
                <tf id="rayIdxDesc4" style="color: #6ebdc6;font-size: 26;">合理安排时间，享受健康生活。</tf><br>
                <progress id="loadJsProgress" value="15" max="100" style="position:relative;text-align:center;background:white;width:16em;height:0.3em;top:40%"></progress>
            </div>
            <script type="text/javascript">
                var window_width = document.documentElement.clientWidth;
                var window_height = document.documentElement.clientHeight;
                var fontsizeValue=document.body.scrollWidth;
                if(window_height/window_width<3/2)
                {
                    fontsizeValue=document.body.scrollHeight*2/3;
                }
                document.getElementById("rayIdxTitle").style.fontSize =Math.ceil(15*fontsizeValue/320)+"px";
                document.getElementById("rayIdxDesc1").style.fontSize =Math.ceil(13*fontsizeValue/320)+"px";
                document.getElementById("rayIdxDesc2").style.fontSize =Math.ceil(13*fontsizeValue/320)+"px";
                document.getElementById("rayIdxDesc3").style.fontSize =Math.ceil(13*fontsizeValue/320)+"px";
                document.getElementById("rayIdxDesc4").style.fontSize =Math.ceil(13*fontsizeValue/320)+"px";
            </script>';
        }
    ?>

    <script>
        window["VERINFO_VER"]=2;
		var window_width = document.documentElement.clientWidth;
	    var window_height = document.documentElement.clientHeight;
    	var egretDocument = document.getElementsByClassName("egret-player")[0];
        var isPC=false;
        var p=navigator.platform;
        if(p.indexOf("Win")==0||p.indexOf("Mac")==0||p.indexOf("Linux")==0||p=="X11")
        {
            isPC=true;
        }
        if(window_height/window_width>=1136/640)
        {
            if(egretDocument.getAttribute("data-content-height"))
            {
                egretDocument.setAttribute("data-content-height","1136");
            }
            if(egretDocument.getAttribute("data-scale-mode"))
            {
                if(window_height/window_width>2)
                {
                    egretDocument.setAttribute("data-scale-mode","showAll");
                }
                else
                {
                    egretDocument.setAttribute("data-scale-mode","exactFit");
                }
            }
        }
        else if(window_height/window_width<=960/640)
        {
            if(egretDocument.getAttribute("data-content-height"))
            {
                egretDocument.setAttribute("data-content-height","960");
            }
            if(egretDocument.getAttribute("data-scale-mode"))
            {
                egretDocument.setAttribute("data-scale-mode","exactFit");
            }
        }
        else
        {
            if(isPC)
            {
                if(egretDocument.getAttribute("data-content-height"))
                {
                    egretDocument.setAttribute("data-content-height",(window_height/window_width*640).toString());
                }
                if(egretDocument.getAttribute("data-scale-mode"))
                {
                    egretDocument.setAttribute("data-scale-mode","exactFit");
                }
            }
        }
        if(isPC)
        {
            if(egretDocument.getAttribute("data-scale-mode"))
            {
                egretDocument.setAttribute("data-scale-mode","showAll");
            }
            if(egretDocument.getAttribute("data-orientation"))
            {
                egretDocument.setAttribute("data-orientation","auto");
            }
        }
	</script>
    <script>
        var loadScript = function (list, callback) {
            var loaded = 0;
            var loadNext = function () {
                loadSingleScript(list[loaded], function () {
                    loaded++;
                    var progress = document.getElementById('loadJsProgress');
                    progress.value=Math.floor(loaded/list.length*100);
                    if (loaded >= list.length) {
                        progress.style.display="none";
                        callback();
                    }
                    else {
                        loadNext();
                    }
                })
            };
            loadNext();
        };

            <?php
                if($domainCfg[$domainKey])
                {
                echo 'var requestGetStepData={};
        var requestGetStep=function(step){
            if(!requestGetStepData[step])
            {
                var getxhr = new XMLHttpRequest();
                getxhr.open("GET", "//'.$domainCfg[$domainKey].'/tank-global/index.php/?t=sendstepstat&step="+step, true);
                getxhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                getxhr.send();
                requestGetStepData[step]=1;
            };
        };
        requestGetStep(1);';
                }
            ?>

    var loadSingleScript = function (src, callback) {
        var s = document.createElement('script');
        s.async = false;
        s.src = src;
        s.addEventListener('load', function () {
            s.parentNode.removeChild(s);
            s.removeEventListener('load', arguments.callee, false);
            callback();
        }, false);
        document.body.appendChild(s);
    };

    var xhr = new XMLHttpRequest();
    var idxdatev=new Date();
	var mainJsonVersion=Math.floor(idxdatev.getTime()/3000);
    xhr.open('GET', './manifest.json?v=' + Math.floor(idxdatev.getTime()/1000), true);
    xhr.addEventListener("load", function () {
        var manifest = JSON.parse(xhr.response);
		var rsdkurl = "//sdk-h5-cdn.rayjoy.com/rsdk/rsdk.js?v="+Math.floor(idxdatev.getTime()/10000);
		var list = manifest.initial.concat(manifest.game);
		list.unshift(rsdkurl);
        loadScript(list, function () {
            /**
             * {
             * "renderMode":, //Engine rendering mode, "canvas" or "webgl"
             * "audioType": 0 //Use the audio type, 0: default, 2: web audio, 3: audio
             * "antialias": //Whether the anti-aliasing is enabled in WebGL mode, true: on, false: off, defaults to false
             * "calculateCanvasScaleFactor": //a function return canvas scale factor
             * }
             **/
			 var ua3="";
                var audioTp=0;
                try {
                    ua3=navigator.userAgent.toLowerCase();
                    if(ua3.indexOf("micromessenger") >= 0)
                    {
                        audioType = 0;
                    }
                    else if (ua3.indexOf("android") >= 0) {//android
                        var andStr= ua3.substring(ua3.indexOf("android"));
                        andStr= andStr.substring(0,andStr.indexOf("."));
                        andStr= andStr.replace("android","");
                        andStr= andStr.replace(/\r/g,"");
                        if(Number(andStr)<5)
                        {
                            audioTp=3;
                        }
						else
						{
							if(ua3.indexOf("lex")>0)
							{
								audioTp=3;
							}
						}
                    }
                } catch (error) 
                {
                    audioTp=3;
                }
            <?php
                if($domainCfg[$domainKey])
                {
                    echo 'requestGetStep(2);';
                }
            ?>

            egret.runEgret({ renderMode: "webgl", audioType: audioTp, calculateCanvasScaleFactor:function(context) {
                var backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;
                return (window.devicePixelRatio || 1) / backingStore;
            }});
        });
    });
    xhr.send(null);
</script>
</body>

</html>