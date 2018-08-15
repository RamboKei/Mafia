--书院配置
local bookroomCfg={
    --书院位置扩展所需元宝  超过最大值取最大值
    needGem={300,600,1000,2000,3000,4000,5000,5000,5000},
    
    --最多书院席位
    maxPos=10,
    
    --初始书院席位
    iniPos=1,
    
    --每次获得书籍经验
    getBookExp=10,
    
    --每次获得技能经验
    getSkillExp=100,
    
    --每次学习时间  单位:秒
    studyTime=10800,
    
}
return bookroomCfg
