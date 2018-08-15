--好友系统配置
local friendCfg={
    --解锁好友功能所需官职
    needLv=2,
    
    --好友数量上限
    maxFriend=50,
    
    --单次赠送政绩
    presentExp=1,
    
    --每日领取政绩赠礼次数上限
    maxGetNum=20,
    
    --系统推荐好友数量
    adviseFriendNum=10,
    
    --刷新按钮冷却时间（单位：秒）
    refreshCD=10,
    
    --可发送的申请数量上限（玩家发出的、并且未被自己取消也未被对方接受或者拒绝的好友申请达到该值时，将不能再发送好友申请）
    maxSendRequest=200,
    
    --可接收的申请数量上限（玩家未处理的好友申请达到该值时，将不再接收到新的好友申请）
    maxReceiveRequest=50,
    
    --屏蔽玩家数量上限
    maxShieldPlayer=50,
    
}
return friendCfg
