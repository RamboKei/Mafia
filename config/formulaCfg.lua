--[[
    跟游戏相关的公式方法
    author hyf
]]

local formula = {}

--获取门客最大可升级的等级
function formula:getServantMaxLv(level)
    level = tostring(level)
    local levelCfg = getConfig("levelCfg")
    return levelCfg[level].servantLv
end

--[[
普通战斗胜利及消耗公式 A方，武力A，兵力A B方，武力B，兵力B
如果 兵A - 兵B * （武B / 武A）^0.9 >=0
则 兵B=0
    兵A = 兵A - 兵B * （武B / 武A）^0.9  (向下取整)
否则  兵A=0
     兵B=兵B - 兵A * （武A / 武B）^0.9  (向下取整)

双方兵力都是0的时候 敌方兵力变为1 本场战斗失败
]]
function formula:battle(atk1,soldier1,atk2,soldier2)
    --atk1 武力A 兵力A atk2 武力B 兵力B
    local finaSold1 = math.floor(soldier1-soldier2 * math.pow(atk2/atk1, 0.9))
    local finaSold2 = math.floor(soldier2-soldier1 * math.pow(atk1/atk2, 0.9))
    local success = false
    if finaSold1>0 then
        finaSold2 = 0
        success = true
    elseif finaSold1==0 and finaSold2==0 then
        finaSold1 = 0
        finaSold2 = 1
    else
        finaSold1 = 0
    end
    local battleReport = {
        success = success,
        left1 = finaSold1,
        left2 = finaSold2
    }
    return battleReport
end

--关卡奖励的铜钱公式
--1000+角色的智力属性 / 8  （向下取整）
function formula:getBattleGoldReward(inte)
    --inte 角色的智力
    local goldNum = math.floor(1000+inte/8)
    return "2_1_"..goldNum
end

--宠幸消耗的元宝公式（跟亲密度相关）
--亲密度 * 10 最大值为1000元宝
function formula:getLoveNeedGem(intimacy)
    local needGem = intimacy * 10
    if needGem >1000 then
        needGem = 1000
    end
    return needGem
end

--获取儿子属性
function formula:getChildAttr(level,quality,intimacy,initRand)
    local attr = {0,0,0,0}
    --等级 * 等级 + （孩子的quality + random（1,5）） * 等级 +random（2,5） +  亲密度^1/2 * 等级 
    for k,v in ipairs(initRand) do
        attr[k] = level*level +(quality+v[1])*level + v[2] + math.floor(math.pow(intimacy,0.5)*level)
    end
    return attr
end

--获取并设置用户所有属性
function formula:setUserAttr(uid)
    local uobjs = getUserObjs(uid)
    local mUserinfo = uobjs.getModel('userinfo')
    local mServant = uobjs.getModel('servant')
    local atk,inte,politics,charm = mServant.getTotalAttr()
    mUserinfo.atk = atk
    mUserinfo.inte = inte
    mUserinfo.politics = politics
    mUserinfo.charm = charm
    mUserinfo.power = atk+inte+politics+charm

    --任务设置势力
    addGameTask(uid, "107", mUserinfo.power)
end

--计算寻访/政务类型获奖值公式
--[[
2：银两   智力属性和
3：粮食   政治属性和
4：士兵   魅力属性和
]]
function formula:getSearchByType(uid, rewardType, rate)
    local uobjs = getUserObjs(uid)
    local mUserinfo = uobjs.getModel('userinfo')
    rewardType = tonumber(rewardType)
    if rewardType == 2 then
        return math.floor(tonumber(mUserinfo.inte) * tonumber(rate)) -- 智力
    elseif rewardType == 3 then
        return math.floor(tonumber(mUserinfo.politics) * tonumber(rate)) --政治
    elseif rewardType==4 then
        return math.floor(tonumber(mUserinfo.charm) * tonumber(rate)) --士兵
    else
        return false
    end
end

--获取经营恢复速率
--恢复时间 = 60 + [（所有智力+所有政治+所有魅力）/3 ]/10000 * 60    单位：秒
function formula:getManageNeedTime(uid)
    local manageCfg = getConfig('manageCfg')
    local maxTime = manageCfg['maxTime']

    local uobjs = getUserObjs(uid)
    local mUserinfo = uobjs.getModel('userinfo')
    local calculateTime = math.floor((mUserinfo.inte + mUserinfo.politics + mUserinfo.charm)/3/10000*60 +60)
    local minNeedTime = math.min(calculateTime, maxTime)

    return minNeedTime
end

return formula