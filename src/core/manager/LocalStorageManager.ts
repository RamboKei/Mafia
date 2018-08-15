/**
 * 本地存储数据管理
 * author 陈可
 * date 2017/9/8
 * @class LocalStorageManager
 */
namespace LocalStorageManager 
{
	/**
     * 保存数据
     * @param key
     * @param value
     * @returns {boolean}
     */
    export function set(key:string,value:string):boolean
    {
        try
        {
            return egret.localStorage.setItem(key,value);
        }
        catch(e)
        {
            console.log("unsupport localStorage");
            return false;
        }
    }

    /**
     * 读取数据
     * @param key 要读取的键名称
     * @returns {string}
     */
    export function get(key:string):string
    {
        try
        {
            var str:string = egret.localStorage.getItem(key);
            if(str==null)
            {
                str="";
            }
            return str;
        }
        catch(e)
        {
            console.log("unsupport localStorage");
            return "";
        }
    }

    /**
     *
     * @param key 要删除的键名称
     */
    export function remove(key:string)
    {
        try
        {
            egret.localStorage.removeItem(key);
        }
        catch(e)
        {
            console.log("unsupport localStorage");
        }
    }

    /**
     * 将所有数据清空
     */
    export function clear()
    {
        try
        {
            egret.localStorage.clear();
        }
        catch(e)
        {
            console.log("unsupport localStorage");
        }
    }
}