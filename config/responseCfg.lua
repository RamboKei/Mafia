--[[
非model数据role
]]
local responsecfg = {
["response"] = "返回数据",
["response.*"] = "返回最新第n条数据",
["response.*.*"] = "具体接口名",
["response.*.*.*"] = "response是数据，param是参数",

--登录

--充值
["response.data.payment"] = "充值信息",
}
return responsecfg