# 项目目录
filepath=$(cd "$(dirname "$0")"; pwd)

# 碎图父目录
projectpath=$(cd ../../.. "$(dirname "$0")"; pwd)
filepath2=$projectpath/外网地址
scriptpath=$projectpath/clientscript/script/versionMd5
clientpath=$(cd ../.. "$(dirname "$0")"; pwd)

platname=$1

if [ "$platname" = "test" ]
then
    zhengshiname="test"
    echo "test目录打包"
else
    zhengshiname=${platname//_test/}
    zhengshiname=${zhengshiname//test/}
fi

if [ "$platname" = "" ]
then
    echo "没有参数，退出"
    exit
fi
echo $filepath2

echo 删除上次gt_$platname发布版本文件
rm -rf $filepath/bin-release/web/gt_$platname
echo 开始发布h5版本
egret publish --version gt_$platname
echo 处理loading icon
cp loding.jpg $filepath/bin-release/web/gt_$platname/loding.jpg
echo 删除gt_$platname的resource目录
rm -rf $filepath2/$zhengshiname/gt_$platname/resource
echo 删除gt_$platname的js目录
rm -rf $filepath2/$zhengshiname/gt_$platname/js
echo 复制文件
cp -R $filepath/bin-release/web/gt_$platname $filepath2/$zhengshiname
echo 复制完成，删除原始文件目录
rm -rf $filepath/bin-release/web/gt_$platname

if [ -f "$filepath2/$zhengshiname/gt_$platname/index.php" ]; then
    if [ -f "$filepath2/$zhengshiname/gt_$platname/index.html" ]; then
        rm -rf $filepath2/$zhengshiname/gt_$platname/index.html
    fi
fi

multifile=$clientpath/trunk/resoucres_multi/assets_$zhengshiname
if [ -d "$multifile" ]; then
    echo 存在多语言版本资源
    # sh $projectpath/clientscript/script/resource/resourceEnter.sh $multifile/  $multifile/ $multifile/.resourceMd5.json
    echo 开始合并多语言资源资源
    cp -R $multifile/* $filepath2/$zhengshiname/gt_$platname/resource/assets/
fi
multsoundfile=$clientpath/trunk/resoucres_multi/sound_$zhengshiname
if [ -d "$multsoundfile" ]; then
    echo 存在多语言版本音效
    echo 开始合并多语言音效
    cp -R $multsoundfile/* $filepath2/$zhengshiname/gt_$platname/resource/sound/
else
    yuanshisoundfild=$clientpath/trunk/resources/sound_$zhengshiname
    if [ -d "$yuanshisoundfild" ]; then
        echo 存在多语言版本音效原始目录
        echo 开始合并多语言音效原始目录
        cp -R $yuanshisoundfild/* $filepath2/$zhengshiname/gt_$platname/resource/sound/
    fi
fi



echo 开始添加资源版本号
node $scriptpath/buildResourcesVersion.js $filepath2/$zhengshiname/gt_$platname/resource/default.res.json
# echo 开始添加代码版本号
# node $scriptpath/buildJSVersion.js $filepath2/$zhengshiname/gt_$platname/manifest.json
echo 发布成功，需要手动点提交