var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WxGameInclude = (function () {
    function WxGameInclude() {
    }
    WxGameInclude.include = function () {
        window["ClientSocket"] = ClientSocket;
        window["Http"] = Http;
        window["NetLoading"] = NetLoading;
        window["Socket"] = Socket;
        window["JsonMsg"] = JsonMsg;
        window["BaseViewController"] = BaseViewController;
        window["BaseController"] = BaseController;
        window["BaseVo"] = BaseVo;
        window["BaseVoApi"] = BaseVoApi;
        window["BaseView"] = BaseView;
        window["App"] = App;
        window["CircleProgressBar"] = CircleProgressBar;
        window["CheckBox"] = CheckBox;
        window["ScrollListItem"] = ScrollListItem;
        window["ScrollList"] = ScrollList;
        window["CustomMovieClip"] = CustomMovieClip;
        window["PowerFly"] = PowerFly;
        window["Dictionary"] = Dictionary;
        window["TouchHelper"] = TouchHelper;
        window["DragProgressBar"] = DragProgressBar;
        window["ComponentManager"] = ComponentManager;
        window["RewardFly"] = RewardFly;
        window["ProgressBar"] = ProgressBar;
        window["CollectEffect"] = CollectEffect;
        window["ScrollView"] = ScrollView;
        window["LoopLamp"] = LoopLamp;
        window["TabBar"] = TabBar;
        window["GodBless"] = GodBless;
        window["TabBarGroup"] = TabBarGroup;
        window["BaseButton"] = BaseButton;
        window["Base64"] = Base64;
        window["NetManager"] = NetManager;
        window["LayerManager"] = LayerManager;
        window["ResourceManager"] = ResourceManager;
        window["LocalStorageManager"] = LocalStorageManager;
        window["SoundEffects"] = SoundEffects;
        window["BaseSound"] = BaseSound;
        window["SoundBg"] = SoundBg;
        window["SocketStateEnum"] = SocketStateEnum;
        window["SocketStateConst"] = SocketStateConst;
        window["BaseLoadDisplayObjectContiner"] = BaseLoadDisplayObjectContiner;
        window["BaseTextField"] = BaseTextField;
        window["BaseBitmapText"] = BaseBitmapText;
        window["BaseDisplayObject"] = BaseDisplayObject;
        window["BaseLoadBitmap"] = BaseLoadBitmap;
        window["BaseBitmap"] = BaseBitmap;
        window["BaseClass"] = BaseClass;
        window["BaseShape"] = BaseShape;
        window["BaseDisplayObjectContainer"] = BaseDisplayObjectContainer;
        window["BaseLoadDragonBones"] = BaseLoadDragonBones;
        window["Main"] = Main;
        window["MainUINewTop"] = MainUINewTop;
        window["MainUI"] = MainUI;
        window["MainUITop"] = MainUITop;
        window["LampRoll"] = LampRoll;
        window["PlatformCfg"] = PlatformCfg;
        window["RSDKHelper"] = RSDKHelper;
        window["WxGameInclude"] = WxGameInclude;
        window["PlatformManager"] = PlatformManager;
        window["StatisticsHelper"] = StatisticsHelper;
        window["ResBar"] = ResBar;
        window["LoginLoading"] = LoginLoading;
        window["ViewController"] = ViewController;
        window["SceneController"] = SceneController;
        window["NetManager"] = NetManager;
        window["TimerManager"] = TimerManager;
        window["LoginManager"] = LoginManager;
        window["SoundManager"] = SoundManager;
        window["TickManager"] = TickManager;
        window["LanguageManager"] = LanguageManager;
        window["ConquestVo"] = ConquestVo;
        window["PrestigeVo"] = PrestigeVo;
        window["AtkracecrossVo"] = AtkracecrossVo;
        window["AchievementInfoVo"] = AchievementInfoVo;
        window["AchievementVoApi"] = AchievementVoApi;
        window["AchievementVo"] = AchievementVo;
        window["WifestatusVo"] = WifestatusVo;
        window["ChatblockVo"] = ChatblockVo;
        window["ChatVo"] = ChatVo;
        window["OtherInfoVo"] = OtherInfoVo;
        window["TradeInfoVo"] = TradeInfoVo;
        window["TradeVo"] = TradeVo;
        window["AcTailorVo"] = AcTailorVo;
        window["AcDailyChargeVo"] = AcDailyChargeVo;
        window["AcSpringCelebrateVo"] = AcSpringCelebrateVo;
        window["AcMayDayVo"] = AcMayDayVo;
        window["AcPunishVo"] = AcPunishVo;
        window["AcCarnivalCostVo"] = AcCarnivalCostVo;
        window["AcWifeComeVo"] = AcWifeComeVo;
        window["AcRankActiveVo"] = AcRankActiveVo;
        window["AcRankVo"] = AcRankVo;
        window["AcBaseVo"] = AcBaseVo;
        window["AcTotalRechargeVo"] = AcTotalRechargeVo;
        window["AcFourPeopleVo"] = AcFourPeopleVo;
        window["AcRankInfoVo"] = AcRankInfoVo;
        window["AcLimitedRewardVo"] = AcLimitedRewardVo;
        window["AcWishTreeVo"] = AcWishTreeVo;
        window["AcTotalDayRechargeVo"] = AcTotalDayRechargeVo;
        window["AcCarnivalChargeVo"] = AcCarnivalChargeVo;
        window["AcCrossServerIntimacyVo"] = AcCrossServerIntimacyVo;
        window["AcDiscountVo"] = AcDiscountVo;
        window["AcLimitedRewardInfoVo"] = AcLimitedRewardInfoVo;
        window["AcNewYearVo"] = AcNewYearVo;
        window["AcCrossServerAtkRaceVo"] = AcCrossServerAtkRaceVo;
        window["AcVipShopVo"] = AcVipShopVo;
        window["MailVo"] = MailVo;
        window["MailInfoVo"] = MailInfoVo;
        window["ShopVo"] = ShopVo;
        window["ShopInfoVo"] = ShopInfoVo;
        window["AllianceVo"] = AllianceVo;
        window["AllianceMemberInfoVo"] = AllianceMemberInfoVo;
        window["AllianceMemberVo"] = AllianceMemberVo;
        window["MyAllianceVo"] = MyAllianceVo;
        window["EmperorwarVoApi"] = EmperorwarVoApi;
        window["BookroomInfoVo"] = BookroomInfoVo;
        window["BookroomVo"] = BookroomVo;
        window["DinnerVo"] = DinnerVo;
        window["DailybossVo"] = DailybossVo;
        window["SearchBuildInfoItemVo"] = SearchBuildInfoItemVo;
        window["SearchVo"] = SearchVo;
        window["InviteVo"] = InviteVo;
        window["PalaceVo"] = PalaceVo;
        window["PalaceRoleInfoVo"] = PalaceRoleInfoVo;
        window["WifeskinInfoVo"] = WifeskinInfoVo;
        window["WifeskinVo"] = WifeskinVo;
        window["WifeVo"] = WifeVo;
        window["WifeInfoVo"] = WifeInfoVo;
        window["AtkraceVo"] = AtkraceVo;
        window["AtkraceServantVo"] = AtkraceServantVo;
        window["AtkraceInfoVo"] = AtkraceInfoVo;
        window["AtkraceAtkInfoVo"] = AtkraceAtkInfoVo;
        window["TitleInfoVo"] = TitleInfoVo;
        window["ItemVo"] = ItemVo;
        window["ItemInfoVo"] = ItemInfoVo;
        window["MainTaskVo"] = MainTaskVo;
        window["PrisonVo"] = PrisonVo;
        window["SwitchVo"] = SwitchVo;
        window["ServantInfoVo"] = ServantInfoVo;
        window["ServantAttrVo"] = ServantAttrVo;
        window["ServantVo"] = ServantVo;
        window["RewardItemVo"] = RewardItemVo;
        window["DailyTaskAttrVo"] = DailyTaskAttrVo;
        window["DailytaskVo"] = DailytaskVo;
        window["AffairVo"] = AffairVo;
        window["ManageVo"] = ManageVo;
        window["AutoResVo"] = AutoResVo;
        window["EmperorwarActiveVo"] = EmperorwarActiveVo;
        window["EmperorwarVo"] = EmperorwarVo;
        window["AdultMarryInfoVo"] = AdultMarryInfoVo;
        window["AdultMarryVo"] = AdultMarryVo;
        window["AdultVo"] = AdultVo;
        window["AdultAttrVo"] = AdultAttrVo;
        window["AdultInfoVo"] = AdultInfoVo;
        window["ChallengeVo"] = ChallengeVo;
        window["PracticeVo"] = PracticeVo;
        window["RankVo"] = RankVo;
        window["RankUserVo"] = RankUserVo;
        window["ArrivalVo"] = ArrivalVo;
        window["StudyatkTableInfoVo"] = StudyatkTableInfoVo;
        window["StudyatkVo"] = StudyatkVo;
        window["ChildVo"] = ChildVo;
        window["ChildInfoVo"] = ChildInfoVo;
        window["ChildAttrVo"] = ChildAttrVo;
        window["PlayerVo"] = PlayerVo;
        window["GameinfoVo"] = GameinfoVo;
        window["ServerCfg"] = ServerCfg;
        window["LampVoApi"] = LampVoApi;
        window["VipVoApi"] = VipVoApi;
        window["ConquestVoApi"] = ConquestVoApi;
        window["PrestigeVoApi"] = PrestigeVoApi;
        window["AtkracecrossVoApi"] = AtkracecrossVoApi;
        window["WifestatusVoApi"] = WifestatusVoApi;
        window["ChatVoApi"] = ChatVoApi;
        window["CrossImacyVoApi"] = CrossImacyVoApi;
        window["OtherInfoVoApi"] = OtherInfoVoApi;
        window["TradeVoApi"] = TradeVoApi;
        window["AcVoApi"] = AcVoApi;
        window["AcRankVoApi"] = AcRankVoApi;
        window["AcBaseVoApi"] = AcBaseVoApi;
        window["AcTailorApi"] = AcTailorApi;
        window["MailVoApi"] = MailVoApi;
        window["RookieVoApi"] = RookieVoApi;
        window["ShopVoApi"] = ShopVoApi;
        window["AllianceVoApi"] = AllianceVoApi;
        window["BookroomVoApi"] = BookroomVoApi;
        window["DinnerVoApi"] = DinnerVoApi;
        window["Api"] = Api;
        window["DailybossVoApi"] = DailybossVoApi;
        window["SearchVoApi"] = SearchVoApi;
        window["InviteVoApi"] = InviteVoApi;
        window["PalaceVoApi"] = PalaceVoApi;
        window["WifeskinVoApi"] = WifeskinVoApi;
        window["WifeVoApi"] = WifeVoApi;
        window["AtkraceVoApi"] = AtkraceVoApi;
        window["ItemVoApi"] = ItemVoApi;
        window["RechargeVoApi"] = RechargeVoApi;
        window["MainTaskVoApi"] = MainTaskVoApi;
        window["PrisonVoApi"] = PrisonVoApi;
        window["SwitchVoApi"] = SwitchVoApi;
        window["ServantVoApi"] = ServantVoApi;
        window["DailytaskVoApi"] = DailytaskVoApi;
        window["ManageVoApi"] = ManageVoApi;
        window["StudyatkVoApi"] = StudyatkVoApi;
        window["EmperorwarVoApi"] = EmperorwarVoApi;
        window["AdultVoApi"] = AdultVoApi;
        window["ChallengeVoApi"] = ChallengeVoApi;
        window["PracticeVoApi"] = PracticeVoApi;
        window["RankVoApi"] = RankVoApi;
        window["ArrivalVoApi"] = ArrivalVoApi;
        window["ChildVoApi"] = ChildVoApi;
        window["PlayerVoApi"] = PlayerVoApi;
        window["GameinfoVoApi"] = GameinfoVoApi;
        window["PromotionView"] = PromotionView;
        window["PromotionSuccessView"] = PromotionSuccessView;
        window["PromptView"] = PromptView;
        window["Soldier"] = Soldier;
        window["FightView"] = FightView;
        window["BattleDotBar"] = BattleDotBar;
        window["BattleRattle"] = BattleRattle;
        window["BattleWin"] = BattleWin;
        window["BattleInfo"] = BattleInfo;
        window["BattleView"] = BattleView;
        window["GuideBackground"] = GuideBackground;
        window["RookieView"] = RookieView;
        window["GuideCreateUserView"] = GuideCreateUserView;
        window["WelfareViewFirstRecharge"] = WelfareViewFirstRecharge;
        window["WelfareViewFunctionScrollltem"] = WelfareViewFunctionScrollltem;
        window["WelfareViewYearCard"] = WelfareViewYearCard;
        window["WelfareViewRealname"] = WelfareViewRealname;
        window["WelfareViewQgroup"] = WelfareViewQgroup;
        window["WelfareViewFunctionPreview"] = WelfareViewFunctionPreview;
        window["WelfareViewTab"] = WelfareViewTab;
        window["WelfareViewRebateScrollItem"] = WelfareViewRebateScrollItem;
        window["WelfareViewSignScrollItem"] = WelfareViewSignScrollItem;
        window["WelfareViewMonthCard"] = WelfareViewMonthCard;
        window["WelfareViewOfficialWeChat"] = WelfareViewOfficialWeChat;
        window["WelfareViewGoldblessScrollItem"] = WelfareViewGoldblessScrollItem;
        window["WelfareView"] = WelfareView;
        window["WelfareViewRechargeBox"] = WelfareViewRechargeBox;
        window["WelfareViewSignin"] = WelfareViewSignin;
        window["WelfareViewRebate"] = WelfareViewRebate;
        window["WelfareViewGodBless"] = WelfareViewGodBless;
        window["WelfareViewBinding"] = WelfareViewBinding;
        window["UserNamePopupView"] = UserNamePopupView;
        window["ItemJumpPopupView"] = ItemJumpPopupView;
        window["AcRankListPopupView"] = AcRankListPopupView;
        window["RuleInfoPopupView"] = RuleInfoPopupView;
        window["ServantSelectedPopupView"] = ServantSelectedPopupView;
        window["CommonRewardPopupView"] = CommonRewardPopupView;
        window["ItemUseConstPopupView"] = ItemUseConstPopupView;
        window["ServantAttrDetailPopupView"] = ServantAttrDetailPopupView;
        window["ItemUsePopupView"] = ItemUsePopupView;
        window["WifeORServantInfoPopupView"] = WifeORServantInfoPopupView;
        window["ItemInfoPopupView"] = ItemInfoPopupView;
        window["ErrorPopupView"] = ErrorPopupView;
        window["PopupViewTab"] = PopupViewTab;
        window["MainTaskPopupView"] = MainTaskPopupView;
        window["DailyTaskRewardPreviewPopuiView"] = DailyTaskRewardPreviewPopuiView;
        window["PalaceHistoryPopupView"] = PalaceHistoryPopupView;
        window["ScorePopupView"] = ScorePopupView;
        window["NamePopupView"] = NamePopupView;
        window["RankUserinfoPopupView"] = RankUserinfoPopupView;
        window["CandyGetPopupView"] = CandyGetPopupView;
        window["DownloadPackagePopupView"] = DownloadPackagePopupView;
        window["OfflineView"] = OfflineView;
        window["PalaceEditSignPopupView"] = PalaceEditSignPopupView;
        window["SetPasswordPopupView"] = SetPasswordPopupView;
        window["RankPopupView"] = RankPopupView;
        window["RankPopupListItem"] = RankPopupListItem;
        window["PopupView"] = PopupView;
        window["NetErrorPopupView"] = NetErrorPopupView;
        window["ConfirmPopupView"] = ConfirmPopupView;
        window["RealnamePopupView"] = RealnamePopupView;
        window["CostGemBuyItemPopupView"] = CostGemBuyItemPopupView;
        window["WeiduanUpgradePopupView"] = WeiduanUpgradePopupView;
        window["AttentionPopupView"] = AttentionPopupView;
        window["ConquestRankPopupView"] = ConquestRankPopupView;
        window["ConquestWinPopupView"] = ConquestWinPopupView;
        window["ConquestInfoPopupView"] = ConquestInfoPopupView;
        window["ConquestRankScrollItem"] = ConquestRankScrollItem;
        window["ConquestView"] = ConquestView;
        window["ConquestBatchPopupView"] = ConquestBatchPopupView;
        window["ConquestFightView"] = ConquestFightView;
        window["PrestigeLogPopupView"] = PrestigeLogPopupView;
        window["PrestigeInfoPopupView"] = PrestigeInfoPopupView;
        window["PrestigeView"] = PrestigeView;
        window["PrestigeLogPopupScollItem"] = PrestigeLogPopupScollItem;
        window["PrestigeItemPopupView"] = PrestigeItemPopupView;
        window["KRAgreementView"] = KRAgreementView;
        window["AtkracecrossActivityRewardViewTab1"] = AtkracecrossActivityRewardViewTab1;
        window["ActrackCrossMoreItem"] = ActrackCrossMoreItem;
        window["AtkraceCorssRankItem"] = AtkraceCorssRankItem;
        window["AtkracecrossServerItem"] = AtkracecrossServerItem;
        window["AtkraceCrossRankListView"] = AtkraceCrossRankListView;
        window["AtkracecrossDetailPopupView"] = AtkracecrossDetailPopupView;
        window["AtkraceCrossChallengeItem"] = AtkraceCrossChallengeItem;
        window["AtkraceCrossChallengeView"] = AtkraceCrossChallengeView;
        window["ActrackCrossVisitTab1Item"] = ActrackCrossVisitTab1Item;
        window["AtkraceCrossVisitView"] = AtkraceCrossVisitView;
        window["AtkraceCrossVisitViewTab3"] = AtkraceCrossVisitViewTab3;
        window["AtkraceCrossVisitViewTab2"] = AtkraceCrossVisitViewTab2;
        window["AtkraceCrossVisitViewTab1"] = AtkraceCrossVisitViewTab1;
        window["ActrackCrossVisitTab2Item"] = ActrackCrossVisitTab2Item;
        window["AtkracecrossAgreePopupDialog"] = AtkracecrossAgreePopupDialog;
        window["AtkracecrossArrestView"] = AtkracecrossArrestView;
        window["AtkracecrossBattleView"] = AtkracecrossBattleView;
        window["AtkracecrossActivityRewardView"] = AtkracecrossActivityRewardView;
        window["AtkracecrossSummaryView"] = AtkracecrossSummaryView;
        window["AtkracecrossBuyPopupView"] = AtkracecrossBuyPopupView;
        window["AtkracecrossView"] = AtkracecrossView;
        window["AtkracecrossRewardPopupView"] = AtkracecrossRewardPopupView;
        window["AtkracecrossActivityRewardViewTab2"] = AtkracecrossActivityRewardViewTab2;
        window["CommonView"] = CommonView;
        window["AchievementView"] = AchievementView;
        window["AchievementDetailPopupView"] = AchievementDetailPopupView;
        window["AchievementDetailScrollItem"] = AchievementDetailScrollItem;
        window["AchievementScrollItem"] = AchievementScrollItem;
        window["WifestatusPopupScrollItem"] = WifestatusPopupScrollItem;
        window["WifestatusWifePopupView"] = WifestatusWifePopupView;
        window["WifestatusView"] = WifestatusView;
        window["WifestatusShowView"] = WifestatusShowView;
        window["WifestatusPopupView"] = WifestatusPopupView;
        window["WifestatusScrollItem"] = WifestatusScrollItem;
        window["ChatViewTab2"] = ChatViewTab2;
        window["ChatScrollItem"] = ChatScrollItem;
        window["ChatView"] = ChatView;
        window["ChatblockView"] = ChatblockView;
        window["ChatblockScrollItem"] = ChatblockScrollItem;
        window["ChatViewTab1"] = ChatViewTab1;
        window["TradeFightView"] = TradeFightView;
        window["TradeView"] = TradeView;
        window["TradeRankListView"] = TradeRankListView;
        window["TradeInfoPopupView"] = TradeInfoPopupView;
        window["TradeOneKeyPopupView"] = TradeOneKeyPopupView;
        window["TradeRankItem"] = TradeRankItem;
        window["AcTailorSkinItem"] = AcTailorSkinItem;
        window["AcTailorGetView"] = AcTailorGetView;
        window["AcTailorView"] = AcTailorView;
        window["AcTailorExchangeView"] = AcTailorExchangeView;
        window["AcTailorRewardPopupView"] = AcTailorRewardPopupView;
        window["AcTailorSkinHeadItem"] = AcTailorSkinHeadItem;
        window["AcCrossServerIntimacyRewardViewTab2"] = AcCrossServerIntimacyRewardViewTab2;
        window["AcCrossServerIntimacyRewardView"] = AcCrossServerIntimacyRewardView;
        window["AcCrossServerIntimacyEnterView"] = AcCrossServerIntimacyEnterView;
        window["AcCrossServerIntimacyRankListView"] = AcCrossServerIntimacyRankListView;
        window["AcCorssImacyServerItem"] = AcCorssImacyServerItem;
        window["AcCorssImacyPRankItem"] = AcCorssImacyPRankItem;
        window["AcCrossServerDetailPopupView"] = AcCrossServerDetailPopupView;
        window["AcCrossServerIntimacyView"] = AcCrossServerIntimacyView;
        window["AcCrossServerIntimacyRewardViewTab1"] = AcCrossServerIntimacyRewardViewTab1;
        window["AcWishTreeExchangeView"] = AcWishTreeExchangeView;
        window["AcWishTreeExchangeItem"] = AcWishTreeExchangeItem;
        window["AcWishTreeView"] = AcWishTreeView;
        window["AcLimitedRewardScrollItem"] = AcLimitedRewardScrollItem;
        window["AcLimitedRewardView"] = AcLimitedRewardView;
        window["AcLimitedRewardDetailPopupView"] = AcLimitedRewardDetailPopupView;
        window["AcLimitedRewardDetailScrollItem"] = AcLimitedRewardDetailScrollItem;
        window["AcTotalDayRechargeScrollItem"] = AcTotalDayRechargeScrollItem;
        window["AcTotalRechargeScrollItem"] = AcTotalRechargeScrollItem;
        window["AcRechargeItem"] = AcRechargeItem;
        window["AcRechargeView"] = AcRechargeView;
        window["AcDailyChargeScrollItem"] = AcDailyChargeScrollItem;
        window["AcNewYearView"] = AcNewYearView;
        window["AcNewYearViewTab2"] = AcNewYearViewTab2;
        window["NewYear2ScrollItem"] = NewYear2ScrollItem;
        window["AcNewYearPopupView"] = AcNewYearPopupView;
        window["NewYear1ScrollItem"] = NewYear1ScrollItem;
        window["AcNewYearViewTab1"] = AcNewYearViewTab1;
        window["AcCommonView"] = AcCommonView;
        window["AcFourPeopleView"] = AcFourPeopleView;
        window["AcFourPeopleScrollItem"] = AcFourPeopleScrollItem;
        window["AcDiscountView"] = AcDiscountView;
        window["AcRankListScrollItem"] = AcRankListScrollItem;
        window["AcRankActiveView"] = AcRankActiveView;
        window["RankActiveScrollItem"] = RankActiveScrollItem;
        window["RankActiveView"] = RankActiveView;
        window["AcCarnivalChargeScrollItem"] = AcCarnivalChargeScrollItem;
        window["AcCarnivalCostScrollItem"] = AcCarnivalCostScrollItem;
        window["AcCarnivalItem"] = AcCarnivalItem;
        window["AcCarnivalView"] = AcCarnivalView;
        window["AcWifeComeView"] = AcWifeComeView;
        window["AcVipShopPopupView"] = AcVipShopPopupView;
        window["AcVipShopViewScrollItem"] = AcVipShopViewScrollItem;
        window["AcVipShopView"] = AcVipShopView;
        window["AcSpringCelebrateViewTab4"] = AcSpringCelebrateViewTab4;
        window["Celebration1ScrollItem"] = Celebration1ScrollItem;
        window["AcSpringCelebrateViewTab1"] = AcSpringCelebrateViewTab1;
        window["Celebration3ScrollItem"] = Celebration3ScrollItem;
        window["Celebration4ScrollItem"] = Celebration4ScrollItem;
        window["AcSpringCelebrateViewTab2"] = AcSpringCelebrateViewTab2;
        window["Celebration2ScrollItem"] = Celebration2ScrollItem;
        window["AcSpringCelebrateViewTab3"] = AcSpringCelebrateViewTab3;
        window["AcSpringCelebrateView"] = AcSpringCelebrateView;
        window["AcPunishReportView"] = AcPunishReportView;
        window["AcPunishRankRewardPopupView"] = AcPunishRankRewardPopupView;
        window["AcPunishExScrollItem"] = AcPunishExScrollItem;
        window["AcPunishRankPopupView"] = AcPunishRankPopupView;
        window["AcPunishExPopupView"] = AcPunishExPopupView;
        window["AcPunishRankAllianceRewardScrollItem"] = AcPunishRankAllianceRewardScrollItem;
        window["AcPunishBuyItemPopupView"] = AcPunishBuyItemPopupView;
        window["AcPunishView"] = AcPunishView;
        window["AcPunishRankScrollItem"] = AcPunishRankScrollItem;
        window["AcPunishBuyItemScrollItem"] = AcPunishBuyItemScrollItem;
        window["AcPunishRankRewardScrollItem"] = AcPunishRankRewardScrollItem;
        window["AcMayDay2ScrollItem"] = AcMayDay2ScrollItem;
        window["AcMayDayRankScrollItem"] = AcMayDayRankScrollItem;
        window["AcMayDayRankRewardScrollItem"] = AcMayDayRankRewardScrollItem;
        window["AcMayDayViewTab1"] = AcMayDayViewTab1;
        window["AcMayDay3ScrollItem"] = AcMayDay3ScrollItem;
        window["AcMayDayRankPopupView"] = AcMayDayRankPopupView;
        window["AcMayDayView"] = AcMayDayView;
        window["AcMayDayViewTab2"] = AcMayDayViewTab2;
        window["AcMayDayRewardPopupView"] = AcMayDayRewardPopupView;
        window["AcMayDayViewTab3"] = AcMayDayViewTab3;
        window["MailPopupView"] = MailPopupView;
        window["MailScrollItem"] = MailScrollItem;
        window["MailRewardScrollItem"] = MailRewardScrollItem;
        window["MailDetailPopupView"] = MailDetailPopupView;
        window["ViewTab"] = ViewTab;
        window["RankScrollItem"] = RankScrollItem;
        window["RankWorshipView"] = RankWorshipView;
        window["RankView"] = RankView;
        window["Shop3ScrollItem"] = Shop3ScrollItem;
        window["ShopScrollItem"] = ShopScrollItem;
        window["ShopViewTab1"] = ShopViewTab1;
        window["ShopView"] = ShopView;
        window["ShopViewTab2"] = ShopViewTab2;
        window["ShopViewTab3"] = ShopViewTab3;
        window["AllianceTurnPopupView"] = AllianceTurnPopupView;
        window["AlliancePswdPopupView"] = AlliancePswdPopupView;
        window["AllianceSetPoPopupView"] = AllianceSetPoPopupView;
        window["AllianceTurnScrollItem"] = AllianceTurnScrollItem;
        window["AllianceCreateView"] = AllianceCreateView;
        window["AllianceApplyPopupView"] = AllianceApplyPopupView;
        window["AllianceRankPopupView"] = AllianceRankPopupView;
        window["AllianceMoreItem"] = AllianceMoreItem;
        window["AllianceFindPopupView"] = AllianceFindPopupView;
        window["AllianceRankScrollItem"] = AllianceRankScrollItem;
        window["AllianceBossAttackedPopupView"] = AllianceBossAttackedPopupView;
        window["AllianceBossScrollItem"] = AllianceBossScrollItem;
        window["AllianceBossOpenPopupView"] = AllianceBossOpenPopupView;
        window["AllianceCreatePopupView"] = AllianceCreatePopupView;
        window["AllianceInfoPopupView"] = AllianceInfoPopupView;
        window["AllianceCreateAniView"] = AllianceCreateAniView;
        window["AllianceManagePopupView"] = AllianceManagePopupView;
        window["AllianceBossRankScrollItem"] = AllianceBossRankScrollItem;
        window["AllianceBossMoreItem"] = AllianceBossMoreItem;
        window["AllianceBossSelectScrollItem"] = AllianceBossSelectScrollItem;
        window["AllianceView"] = AllianceView;
        window["AllianceBuildScrollItem"] = AllianceBuildScrollItem;
        window["AllianceTimePopupView"] = AllianceTimePopupView;
        window["AllianceBuildPopupView"] = AllianceBuildPopupView;
        window["AllianceBossBattleView"] = AllianceBossBattleView;
        window["AllianceMemberScrollItem"] = AllianceMemberScrollItem;
        window["AllianceMemberPopupView"] = AllianceMemberPopupView;
        window["AllianceExScrollItem"] = AllianceExScrollItem;
        window["AllianceApplyScrollItem"] = AllianceApplyScrollItem;
        window["AllianceBossPopupView"] = AllianceBossPopupView;
        window["AllianceShowInfoPopupView"] = AllianceShowInfoPopupView;
        window["AllianceExPopupView"] = AllianceExPopupView;
        window["AllianceBossRankPopupView"] = AllianceBossRankPopupView;
        window["BookroomServantScrollItem"] = BookroomServantScrollItem;
        window["BookroomInfoItem"] = BookroomInfoItem;
        window["BookroomServantSelectPopupView"] = BookroomServantSelectPopupView;
        window["BookroomView"] = BookroomView;
        window["HoldDinnerPopupView"] = HoldDinnerPopupView;
        window["DinnerRewardView"] = DinnerRewardView;
        window["DinnerDetailView"] = DinnerDetailView;
        window["DinnerRankItem"] = DinnerRankItem;
        window["DinnerView"] = DinnerView;
        window["DinnerMessageItem"] = DinnerMessageItem;
        window["DinnerTypePopupView"] = DinnerTypePopupView;
        window["DinnerMsgPopupScollItem"] = DinnerMsgPopupScollItem;
        window["DinnerInfoItem"] = DinnerInfoItem;
        window["GotoDinnerView"] = GotoDinnerView;
        window["DinnerExchangePopupView"] = DinnerExchangePopupView;
        window["DinnerSharePopupView"] = DinnerSharePopupView;
        window["DinnerMsgPopupView"] = DinnerMsgPopupView;
        window["DinnerFinishView"] = DinnerFinishView;
        window["DinnerDesk"] = DinnerDesk;
        window["DinnerRankPopupView"] = DinnerRankPopupView;
        window["DinnerFindPopupView"] = DinnerFindPopupView;
        window["DinnerFinishItem"] = DinnerFinishItem;
        window["DinnerOpenedView"] = DinnerOpenedView;
        window["DinnerMessagePopupView"] = DinnerMessagePopupView;
        window["CatchPrisonPopupView"] = CatchPrisonPopupView;
        window["BossSelectedScrollItem"] = BossSelectedScrollItem;
        window["BossBattleView"] = BossBattleView;
        window["CommonViewTab"] = CommonViewTab;
        window["DailybossBattleResultPopupView"] = DailybossBattleResultPopupView;
        window["DailybossType1BattleResultPopupView"] = DailybossType1BattleResultPopupView;
        window["DailybossAttackedPopupView"] = DailybossAttackedPopupView;
        window["DailybossBattleView"] = DailybossBattleView;
        window["DailybossDamageRankPopupView"] = DailybossDamageRankPopupView;
        window["BossRecSelectedScrollItem"] = BossRecSelectedScrollItem;
        window["DailybossRewardListItem"] = DailybossRewardListItem;
        window["DailybossScroePopupView"] = DailybossScroePopupView;
        window["DailybossRankPopupView"] = DailybossRankPopupView;
        window["DailybossView"] = DailybossView;
        window["DailybossLastAttackPopupView"] = DailybossLastAttackPopupView;
        window["DailybossRankRewardPopupView"] = DailybossRankRewardPopupView;
        window["DailybossPao"] = DailybossPao;
        window["LoginView"] = LoginView;
        window["SearchBuildPopupView"] = SearchBuildPopupView;
        window["SearchLuckPopupView"] = SearchLuckPopupView;
        window["SearchResultPopupView"] = SearchResultPopupView;
        window["SearchView"] = SearchView;
        window["ThanksgivingView"] = ThanksgivingView;
        window["InviteViewTab2"] = InviteViewTab2;
        window["InviteViewTab3"] = InviteViewTab3;
        window["InviteViewTab1ScrollItem"] = InviteViewTab1ScrollItem;
        window["InviteViewTab4ScrollItem"] = InviteViewTab4ScrollItem;
        window["InviteViewTab3ScrollItem"] = InviteViewTab3ScrollItem;
        window["InviteViewTab4"] = InviteViewTab4;
        window["InviteView"] = InviteView;
        window["InviteViewTab2ScrollItem"] = InviteViewTab2ScrollItem;
        window["InviteViewTab1"] = InviteViewTab1;
        window["AnnouncementScrollItem"] = AnnouncementScrollItem;
        window["GameAnnouncementView"] = GameAnnouncementView;
        window["PalaceHouseGroupView"] = PalaceHouseGroupView;
        window["PalaceCrossView"] = PalaceCrossView;
        window["PalaceHouseView"] = PalaceHouseView;
        window["PalaceRoleInfoItem"] = PalaceRoleInfoItem;
        window["PalaceView"] = PalaceView;
        window["PalaceRoleInfoItem2"] = PalaceRoleInfoItem2;
        window["WifeGetView"] = WifeGetView;
        window["WifeSkillScrollItem"] = WifeSkillScrollItem;
        window["WifeScrollItem1"] = WifeScrollItem1;
        window["WifeskinScrollItem"] = WifeskinScrollItem;
        window["WifeGiveScrollItem"] = WifeGiveScrollItem;
        window["WifeViewTab2"] = WifeViewTab2;
        window["WifeCallBatchSuccessView"] = WifeCallBatchSuccessView;
        window["WifeLoveAniView"] = WifeLoveAniView;
        window["WifeSkillPopupView"] = WifeSkillPopupView;
        window["WifeViewTab1"] = WifeViewTab1;
        window["WifeView"] = WifeView;
        window["WifeOptView"] = WifeOptView;
        window["WifeskinView"] = WifeskinView;
        window["WifeGivePopupView"] = WifeGivePopupView;
        window["WifeScrollItem2"] = WifeScrollItem2;
        window["WifeUnLockView"] = WifeUnLockView;
        window["WifeGetChildView"] = WifeGetChildView;
        window["AtkraceRankItem"] = AtkraceRankItem;
        window["AtkraceRankListView"] = AtkraceRankListView;
        window["AtkraceVisitView"] = AtkraceVisitView;
        window["ActrackVisitTab2Item"] = ActrackVisitTab2Item;
        window["AtkraceVisitViewTab3"] = AtkraceVisitViewTab3;
        window["AtkraceVisitViewTab2"] = AtkraceVisitViewTab2;
        window["AtkraceVisitViewTab1"] = AtkraceVisitViewTab1;
        window["ActrackVisitTab1Item"] = ActrackVisitTab1Item;
        window["BaseBattleView"] = BaseBattleView;
        window["AtkraceChallengeItem"] = AtkraceChallengeItem;
        window["AtkraceChallengeView"] = AtkraceChallengeView;
        window["ActrackMoreItem"] = ActrackMoreItem;
        window["BattleHero"] = BattleHero;
        window["AtkraceArrestView"] = AtkraceArrestView;
        window["AtkraceBattleView"] = AtkraceBattleView;
        window["AtkraceView"] = AtkraceView;
        window["AtkraceBuyPopupView"] = AtkraceBuyPopupView;
        window["AtkraceRewardPopupView"] = AtkraceRewardPopupView;
        window["AtkraceAgreePopupDialog"] = AtkraceAgreePopupDialog;
        window["ItemView"] = ItemView;
        window["ItemScrollItem"] = ItemScrollItem;
        window["ItemViewTab2"] = ItemViewTab2;
        window["ItemViewTab3"] = ItemViewTab3;
        window["ComposePopupView"] = ComposePopupView;
        window["ItemUseSuccessView"] = ItemUseSuccessView;
        window["ItemViewTab1"] = ItemViewTab1;
        window["RechargeVipViewScrollltem"] = RechargeVipViewScrollltem;
        window["RechargeVipView"] = RechargeVipView;
        window["RechargeVipViewTab1"] = RechargeVipViewTab1;
        window["RechargeVipViewTab2"] = RechargeVipViewTab2;
        window["VipBtnScrollItem"] = VipBtnScrollItem;
        window["PrisonDetailsPopupView"] = PrisonDetailsPopupView;
        window["PrisonPopView"] = PrisonPopView;
        window["PrisonView"] = PrisonView;
        window["PrisonHeadView"] = PrisonHeadView;
        window["ZhubowanghongView"] = ZhubowanghongView;
        window["ServantInfoFourItemScrollItem"] = ServantInfoFourItemScrollItem;
        window["ServantBookLevelupPopupView"] = ServantBookLevelupPopupView;
        window["DialogueGetBaseView"] = DialogueGetBaseView;
        window["ServantInfoItemsScrollItem"] = ServantInfoItemsScrollItem;
        window["ServantSelectedScrollItem"] = ServantSelectedScrollItem;
        window["ServantInfoView"] = ServantInfoView;
        window["ServantInfoBookItems"] = ServantInfoBookItems;
        window["ServantInfoWifeItemScrollItem"] = ServantInfoWifeItemScrollItem;
        window["ServantScrollItem"] = ServantScrollItem;
        window["DropToggleGroup"] = DropToggleGroup;
        window["ServantInfoItems"] = ServantInfoItems;
        window["ServantAdvancePopupView"] = ServantAdvancePopupView;
        window["ServantGetView"] = ServantGetView;
        window["ServantView"] = ServantView;
        window["ServantInfoWifeItem"] = ServantInfoWifeItem;
        window["ServantAdvanceView"] = ServantAdvanceView;
        window["ServantInfoFourItems"] = ServantInfoFourItems;
        window["ServantInfoSkillsItem"] = ServantInfoSkillsItem;
        window["DailyTaskScrollItem"] = DailyTaskScrollItem;
        window["DailyTaskView"] = DailyTaskView;
        window["ManageView"] = ManageView;
        window["AutoResPopupView"] = AutoResPopupView;
        window["StudyatkFailedPopupView"] = StudyatkFailedPopupView;
        window["StudyatkBookScrollItem"] = StudyatkBookScrollItem;
        window["StudyatkCreatePopupView"] = StudyatkCreatePopupView;
        window["StudyatkBattleResultView"] = StudyatkBattleResultView;
        window["StudyatkBattleView"] = StudyatkBattleView;
        window["StudyatkDetailRoleInfoItem"] = StudyatkDetailRoleInfoItem;
        window["StudyatkView"] = StudyatkView;
        window["StudyatkFindPopupView"] = StudyatkFindPopupView;
        window["StudyatkBookPopupView"] = StudyatkBookPopupView;
        window["StudyatkDetailView"] = StudyatkDetailView;
        window["StudyatkTableItem"] = StudyatkTableItem;
        window["StudyAtkBookLvupSuccessView"] = StudyAtkBookLvupSuccessView;
        window["StudyatkSuccessView"] = StudyatkSuccessView;
        window["ServerListMyScrollItem"] = ServerListMyScrollItem;
        window["ServerListPopupView"] = ServerListPopupView;
        window["ServerListServerScrollItem"] = ServerListServerScrollItem;
        window["ServerListTabScrollItem"] = ServerListTabScrollItem;
        window["EmperorWarRewardViewTab2"] = EmperorWarRewardViewTab2;
        window["EmperorWarEnterView"] = EmperorWarEnterView;
        window["EmperorWarBmceScrollItem"] = EmperorWarBmceScrollItem;
        window["EmperorWarRewardView"] = EmperorWarRewardView;
        window["EmperorWarRewardViewTab1"] = EmperorWarRewardViewTab1;
        window["EmperorWarSignPopView"] = EmperorWarSignPopView;
        window["EmperorWarBuzhenView"] = EmperorWarBuzhenView;
        window["EmperorWarBmceView"] = EmperorWarBmceView;
        window["AdultMarrySuccessView"] = AdultMarrySuccessView;
        window["AdultMarryView"] = AdultMarryView;
        window["AdultChooseChildView"] = AdultChooseChildView;
        window["AdultChooseTypeView"] = AdultChooseTypeView;
        window["Adult2ScrollItem"] = Adult2ScrollItem;
        window["AdultScrollItem"] = AdultScrollItem;
        window["AdultMarryRequestScrollItem"] = AdultMarryRequestScrollItem;
        window["AdultMarryScrollItem"] = AdultMarryScrollItem;
        window["AdultMarryRequestView"] = AdultMarryRequestView;
        window["AdultView"] = AdultView;
        window["AdultChooseChildScrollItem"] = AdultChooseChildScrollItem;
        window["SettingCDKPopupView"] = SettingCDKPopupView;
        window["SettingPopopView"] = SettingPopopView;
        window["SettingContactPopupView"] = SettingContactPopupView;
        window["ChallengeStory"] = ChallengeStory;
        window["ChallengeAutoRewardsPopupView"] = ChallengeAutoRewardsPopupView;
        window["ChallengeAutoPopupView"] = ChallengeAutoPopupView;
        window["ChallengeButton"] = ChallengeButton;
        window["ChallengeView"] = ChallengeView;
        window["PracticeBatchBuyPopupView"] = PracticeBatchBuyPopupView;
        window["PracticeStoragePopupView"] = PracticeStoragePopupView;
        window["PracticeAbilityDetailsPopupView"] = PracticeAbilityDetailsPopupView;
        window["PracticeView"] = PracticeView;
        window["PracticeBuyPopupView"] = PracticeBuyPopupView;
        window["PracticeAbilityView"] = PracticeAbilityView;
        window["PracticeGetView"] = PracticeGetView;
        window["PracticeExpandPopupView"] = PracticeExpandPopupView;
        window["PracticeGetPopupView"] = PracticeGetPopupView;
        window["PracticeAbilityScrollItem"] = PracticeAbilityScrollItem;
        window["BindView"] = BindView;
        window["DesktopPopupView"] = DesktopPopupView;
        window["BuyGiftPopupView"] = BuyGiftPopupView;
        window["CoverView"] = CoverView;
        window["SharePopupView"] = SharePopupView;
        window["DownloadView"] = DownloadView;
        window["GetGiftPopupView"] = GetGiftPopupView;
        window["ChildScrollItem"] = ChildScrollItem;
        window["ChildView"] = ChildView;
        window["ChildUpdView"] = ChildUpdView;
        window["PlayerViewTab1"] = PlayerViewTab1;
        window["PlayerBottomUI"] = PlayerBottomUI;
        window["PlayerViewTab2"] = PlayerViewTab2;
        window["PlayerView"] = PlayerView;
        window["AffairView"] = AffairView;
        window["BaseScene"] = BaseScene;
        window["CityScene"] = CityScene;
        window["HomeScene"] = HomeScene;
        window["ViewConst"] = ViewConst;
        window["LayoutConst"] = LayoutConst;
        window["LocalStorageConst"] = LocalStorageConst;
        window["TextFieldConst"] = TextFieldConst;
        window["NetRequestConst"] = NetRequestConst;
        window["NetPushConst"] = NetPushConst;
        window["ItemEnums"] = ItemEnums;
        window["RewardItemConst"] = RewardItemConst;
        window["ProgressBarConst"] = ProgressBarConst;
        window["SoundConst"] = SoundConst;
        window["SceneConst"] = SceneConst;
        window["MessageConst"] = MessageConst;
        window["ButtonConst"] = ButtonConst;
        window["GameData"] = GameData;
        window["Scale9gridCfg"] = Scale9gridCfg;
        window["Config"] = Config;
    };
    return WxGameInclude;
}());
__reflect(WxGameInclude.prototype, "WxGameInclude");
