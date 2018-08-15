# 项目目录
filepath=$(cd "$(dirname "$0")"; pwd)

# 碎图父目录
filepath2=$(cd .. "$(dirname "$0")"; pwd)

echo 删除上次localtest发布版本文件
rm -rf $filepath/bin-release/web/localtest
echo 开始发布h5版本
egret publish --runtime h5 --version localtest
echo 删除localtest的resource目录
rm -rf $filepath2/localtest/resource
echo 复制文件
cp -R $filepath/bin-release/web/localtest $filepath2
echo 开始添加资源版本号
node $filepath2/localtest/版本控制/buildResourcesVersion.js
echo 开始添加代码版本号
node $filepath2/localtest/版本控制/buildJSVersion.js
echo 发布成功，需要手动点提交