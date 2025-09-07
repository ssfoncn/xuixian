// 游戏数据对象
const gameData = {
    // 养成数据
    currentStage: {
        name: "炼气期",
        level: 1,
        totalLevels: 9 // 每个大境界有9层
    },
    cultivationPoints: 0,
    nextStageRequirement: 500, // 下一级所需修为
    spiritualRoot: {
        type: "木灵根",
        level: 1,
        bonus: 0.1 // 10% 修为加成
    },
    
    // 资源数据
    spiritStones: 100,
    pills: {
        breakthrough: 0,
        cultivation: 3
    },
    
    // 挂机数据
    baseCultivationPerSecond: 4,
    baseSpiritStonePerSecond: 0.2,
    lastSaveTime: new Date().getTime(),
    offlineRewardAvailable: 0, // 离线可领取的秒数
    blessingValue: 0,
    
    // 仙宠系统
    pet: {
        name: "无",
        cultivationBonus: 0,
        spiritStoneBonus: 0,
        level: 0
    },
    petSkillLevel: 1,
    petSkillBonus: 0.05, // 御灵诀加成 5%
    
    // 仙宠列表
    pets: [
        { name: "青鸾", cultivationBonus: 0.1, spiritStoneBonus: 0.05 },
        { name: "火凤", cultivationBonus: 0.15, spiritStoneBonus: 0.03 },
        { name: "玄龟", cultivationBonus: 0.08, spiritStoneBonus: 0.1 },
        { name: "麒麟", cultivationBonus: 0.12, spiritStoneBonus: 0.08 },
        { name: "神龙", cultivationBonus: 0.2, spiritStoneBonus: 0.15 }
    ],
    
    // 门派系统
    clan: {
        name: "无",
        bonusType: "none",
        bonusValue: 0
    },
    clanContribution: 0,
    clanSkillLevel: 1,
    clanSkillBonus: 0.05, // 门派技能加成 5%
    
    // 门派列表
    clans: [
        { name: "青云门", bonusType: "cultivation", bonusValue: 0.15 },
        { name: "天玄宗", bonusType: "spiritStone", bonusValue: 0.1 },
        { name: "御灵派", bonusType: "pet", bonusValue: 0.05 },
        { name: "飘渺宫", bonusType: "breakthrough", bonusValue: 0.1 }
    ],
    
    // 挑战塔系统
    currentTowerLevel: 0,
    highestTowerLevel: 0,
    
    // 境界列表
    stages: [
        "炼气期", "筑基期", "金丹期", "元婴期", 
        "化神期", "炼虚期", "合体期", "大乘期",
        "渡劫期", "仙人期", "金仙期", "大罗金仙期"
    ],
    
    // 各境界突破所需修为和突破丹数量
    stageRequirements: [
        { cultivation: 500, pills: 0 },       // 炼气期1层突破
        { cultivation: 1000, pills: 0 },      // 炼气期2层突破
        { cultivation: 2000, pills: 0 },      // 炼气期3层突破
        { cultivation: 3500, pills: 0 },      // 炼气期4层突破
        { cultivation: 5500, pills: 0 },      // 炼气期5层突破
        { cultivation: 8000, pills: 0 },      // 炼气期6层突破
        { cultivation: 11000, pills: 0 },     // 炼气期7层突破
        { cultivation: 15000, pills: 0 },     // 炼气期8层突破
        { cultivation: 20000, pills: 1 },     // 炼气期9层突破至筑基期
        { cultivation: 30000, pills: 1 },     // 筑基期1层突破
        { cultivation: 45000, pills: 1 },     // 筑基期2层突破
        { cultivation: 65000, pills: 1 },     // 筑基期3层突破
        { cultivation: 90000, pills: 1 },     // 筑基期4层突破
        { cultivation: 120000, pills: 2 },    // 筑基期5层突破
        { cultivation: 155000, pills: 2 },    // 筑基期6层突破
        { cultivation: 195000, pills: 2 },    // 筑基期7层突破
        { cultivation: 240000, pills: 2 },    // 筑基期8层突破
        { cultivation: 300000, pills: 3 },    // 筑基期9层突破至金丹期
        // 后续境界要求可以根据需要继续添加
    ]
};

// DOM元素引用
const elements = {
    currentStage: document.getElementById('current-stage'),
    cultivationPoints: document.getElementById('cultivation-points'),
    spiritualRoot: document.getElementById('spiritual-root'),
    spiritStones: document.getElementById('spirit-stones'),
    breakthroughPills: document.getElementById('breakthrough-pills'),
    cultivationPills: document.getElementById('cultivation-pills'),
    currentIncome: document.getElementById('current-income'),
    offlineReward: document.getElementById('offline-reward'),
    blessingValue: document.getElementById('blessing-value'),
    
    // 仙宠相关元素
    currentPet: document.getElementById('current-pet'),
    petBonus: document.getElementById('pet-bonus'),
    petSkillLevel: document.getElementById('pet-skill-level'),
    
    // 门派相关元素
    currentClan: document.getElementById('current-clan'),
    clanContribution: document.getElementById('clan-contribution'),
    clanSkillLevel: document.getElementById('clan-skill-level'),
    
    // 挑战塔相关元素
    towerLevel: document.getElementById('tower-level'),
    towerRecord: document.getElementById('tower-record'),
    nextTowerLevel: document.getElementById('next-tower-level'),
    
    // 按钮
    useCultivationPillBtn: document.getElementById('use-cultivation-pill'),
    breakthroughBtn: document.getElementById('breakthrough'),
    buyBreakthroughPillBtn: document.getElementById('buy-breakthrough-pill'),
    summonPetBtn: document.getElementById('summon-pet'),
    upgradePetSkillBtn: document.getElementById('upgrade-pet-skill'),
    joinClanBtn: document.getElementById('join-clan'),
    clanMissionBtn: document.getElementById('clan-mission'),
    upgradeClanSkillBtn: document.getElementById('upgrade-clan-skill'),
    challengeTowerBtn: document.getElementById('challenge-tower'),
    saveGameBtn: document.getElementById('save-game'),
    
    // 弹窗
    offlineRewardModal: document.getElementById('offline-reward-modal'),
    offlineTime: document.getElementById('offline-time'),
    offlineCultivation: document.getElementById('offline-cultivation'),
    offlineStones: document.getElementById('offline-stones'),
    claimOfflineRewardBtn: document.getElementById('claim-offline-reward'),
    
    breakthroughResultModal: document.getElementById('breakthrough-result-modal'),
    breakthroughResultTitle: document.getElementById('breakthrough-result-title'),
    breakthroughResultText: document.getElementById('breakthrough-result-text'),
    closeBreakthroughResultBtn: document.getElementById('close-breakthrough-result'),
    
    clanModal: document.getElementById('clan-modal'),
    clanModalTitle: document.getElementById('clan-modal-title'),
    clanList: document.getElementById('clan-list'),
    closeClanModalBtn: document.getElementById('close-clan-modal'),
    
    towerModal: document.getElementById('tower-modal'),
    towerModalTitle: document.getElementById('tower-modal-title'),
    currentTowerLevel: document.getElementById('current-tower-level'),
    highestTowerLevel: document.getElementById('highest-tower-level'),
    towerReward: document.getElementById('tower-reward'),
    startTowerChallengeBtn: document.getElementById('start-tower-challenge'),
    closeTowerModalBtn: document.getElementById('close-tower-modal'),
    
    // 门派数据显示
    currentClan: document.getElementById('current-clan'),
    clanContribution: document.getElementById('clan-contribution'),
    clanSkillLevel: document.getElementById('clan-skill-level'),
    
    // 挑战塔数据显示
    towerLevel: document.getElementById('tower-level'),
    towerRecord: document.getElementById('tower-record'),
    nextTowerLevel: document.getElementById('next-tower-level')
};

// 初始化游戏
function initGame() {
    // 尝试加载存档
    loadGameData();
    
    // 检查离线收益
    checkOfflineReward();
    
    // 更新UI
    updateUI();
    updateClanDisplay();
    updateTowerDisplay();
    
    // 设置自动挂机计时器
    setInterval(autoPlay, 1000);
    
    // 绑定事件监听器
    bindEventListeners();
    
    // 监听页面关闭事件，自动保存
    window.addEventListener('beforeunload', saveGameData);
}

// 绑定事件监听器
function bindEventListeners() {
    elements.useCultivationPillBtn.addEventListener('click', useCultivationPill);
    elements.breakthroughBtn.addEventListener('click', attemptBreakthrough);
    elements.buyBreakthroughPillBtn.addEventListener('click', buyBreakthroughPill);
    elements.summonPetBtn.addEventListener('click', summonPet);
    elements.upgradePetSkillBtn.addEventListener('click', upgradePetSkill);
    elements.joinClanBtn.addEventListener('click', showClanModal);
    elements.clanMissionBtn.addEventListener('click', doClanMission);
    elements.upgradeClanSkillBtn.addEventListener('click', upgradeClanSkill);
    elements.challengeTowerBtn.addEventListener('click', showTowerModal);
    elements.saveGameBtn.addEventListener('click', saveGameData);
    
    // 弹窗按钮事件
    elements.claimOfflineRewardBtn.addEventListener('click', claimOfflineReward);
    elements.closeBreakthroughResultBtn.addEventListener('click', closeBreakthroughResultModal);
    elements.closeClanModalBtn.addEventListener('click', closeClanModal);
    elements.closeTowerModalBtn.addEventListener('click', closeTowerModal);
    elements.startTowerChallengeBtn.addEventListener('click', startTowerChallenge);
    
    // 门派选择
    document.querySelectorAll('#clan-list .modal-item').forEach(item => {
        item.addEventListener('click', () => {
            const clanName = item.getAttribute('data-clan');
            joinClan(clanName);
        });
    });
}

// 自动挂机逻辑
function autoPlay() {
    // 计算当前收益
    let cultivationPerSecond = gameData.baseCultivationPerSecond * (1 + gameData.spiritualRoot.bonus);
    let spiritStonePerSecond = gameData.baseSpiritStonePerSecond;
    
    // 应用仙宠加成
    if (gameData.pet.name !== "无") {
        const petCultivationBonus = gameData.pet.cultivationBonus * (1 + gameData.petSkillBonus * (gameData.petSkillLevel - 1));
        const petSpiritStoneBonus = gameData.pet.spiritStoneBonus * (1 + gameData.petSkillBonus * (gameData.petSkillLevel - 1));
        
        cultivationPerSecond += gameData.baseCultivationPerSecond * petCultivationBonus;
        spiritStonePerSecond += gameData.baseSpiritStonePerSecond * petSpiritStoneBonus;
    }
    
    // 应用门派加成
    if (gameData.clan.name !== "无") {
        const clanBonus = gameData.clan.bonusValue * (1 + gameData.clanSkillBonus * (gameData.clanSkillLevel - 1));
        
        if (gameData.clan.bonusType === "cultivation") {
            cultivationPerSecond += gameData.baseCultivationPerSecond * clanBonus;
        } else if (gameData.clan.bonusType === "spiritStone") {
            spiritStonePerSecond += gameData.baseSpiritStonePerSecond * clanBonus;
        }
    }
    
    // 添加收益
    gameData.cultivationPoints += cultivationPerSecond;
    gameData.spiritStones += spiritStonePerSecond;
    
    // 更新UI
    updateIncomeDisplay();
    updateCultivationPoints();
    updateSpiritStones();
    
    // 每分钟自动保存一次
    if (new Date().getTime() - gameData.lastSaveTime >= 60000) {
        saveGameData();
    }
}

// 检查离线收益
function checkOfflineReward() {
    const lastQuitTime = localStorage.getItem('lastQuitTime');
    if (lastQuitTime) {
        const currentTime = new Date().getTime();
        const offlineTimeInSeconds = Math.floor((currentTime - parseInt(lastQuitTime)) / 1000);
        
        // 最多计算12小时离线收益
        const maxOfflineSeconds = 12 * 60 * 60;
        const availableOfflineSeconds = Math.min(offlineTimeInSeconds, maxOfflineSeconds);
        
        if (availableOfflineSeconds > 60) { // 至少离线1分钟才显示收益
            gameData.offlineRewardAvailable = availableOfflineSeconds;
            
            // 显示离线收益弹窗
            const hours = Math.floor(availableOfflineSeconds / 3600);
            const minutes = Math.floor((availableOfflineSeconds % 3600) / 60);
            
            elements.offlineTime.textContent = `${hours}小时${minutes}分`;
            
            // 计算离线收益，包含仙宠加成
            let cultivationPerSecond = gameData.baseCultivationPerSecond * (1 + gameData.spiritualRoot.bonus);
            let spiritStonePerSecond = gameData.baseSpiritStonePerSecond;
            
            // 应用仙宠加成
            if (gameData.pet.name !== "无") {
                const petCultivationBonus = gameData.pet.cultivationBonus * (1 + gameData.petSkillBonus * (gameData.petSkillLevel - 1));
                const petSpiritStoneBonus = gameData.pet.spiritStoneBonus * (1 + gameData.petSkillBonus * (gameData.petSkillLevel - 1));
                
                cultivationPerSecond += gameData.baseCultivationPerSecond * petCultivationBonus;
                spiritStonePerSecond += gameData.baseSpiritStonePerSecond * petSpiritStoneBonus;
            }
            
            // 应用门派加成
            if (gameData.clan.name !== "无") {
                const clanBonus = gameData.clan.bonusValue * (1 + gameData.clanSkillBonus * (gameData.clanSkillLevel - 1));
                
                if (gameData.clan.bonusType === "cultivation") {
                    cultivationPerSecond += gameData.baseCultivationPerSecond * clanBonus;
                } else if (gameData.clan.bonusType === "spiritStone") {
                    spiritStonePerSecond += gameData.baseSpiritStonePerSecond * clanBonus;
                }
            }
            
            const offlineCultivation = Math.floor(cultivationPerSecond * availableOfflineSeconds);
            const offlineStones = Math.floor(spiritStonePerSecond * availableOfflineSeconds);
            
            elements.offlineCultivation.textContent = offlineCultivation;
            elements.offlineStones.textContent = offlineStones;
            
            elements.offlineRewardModal.style.display = 'flex';
        }
    }
}

// 领取离线收益
function claimOfflineReward() {
    const offlineCultivation = parseInt(elements.offlineCultivation.textContent);
    const offlineStones = parseInt(elements.offlineStones.textContent);
    
    // 添加离线收益
    gameData.cultivationPoints += offlineCultivation;
    gameData.spiritStones += offlineStones;
    
    // 重置离线收益
    gameData.offlineRewardAvailable = 0;
    
    // 隐藏弹窗
    elements.offlineRewardModal.style.display = 'none';
    
    // 更新UI
    updateCultivationPoints();
    updateSpiritStones();
    updateOfflineRewardDisplay();
    
    // 保存游戏
    saveGameData();
}

// 使用修为丹
function useCultivationPill() {
    if (gameData.pills.cultivation > 0) {
        // 每个修为丹增加500修为
        gameData.cultivationPoints += 500;
        gameData.pills.cultivation--;
        
        // 更新UI
        updateCultivationPoints();
        updatePillsDisplay();
        
        // 保存游戏
        saveGameData();
    }
}

// 购买突破丹
function buyBreakthroughPill() {
    const pillPrice = 1000; // 突破丹价格
    
    if (gameData.spiritStones >= pillPrice) {
        gameData.spiritStones -= pillPrice;
        gameData.pills.breakthrough++;
        
        // 更新UI
        updateSpiritStones();
        updatePillsDisplay();
        
        // 保存游戏
        saveGameData();
    }
}

// 召唤仙宠
function summonPet() {
    const summonCost = 5000; // 召唤仙宠的花费
    
    // 检查是否已拥有仙宠
    if (gameData.pet.name !== "无") {
        showBreakthroughResult('已有仙宠', '您已经拥有一只仙宠了！');
        return;
    }
    
    // 检查灵石是否足够
    if (gameData.spiritStones >= summonCost) {
        gameData.spiritStones -= summonCost;
        
        // 随机选择一只仙宠
        const randomIndex = Math.floor(Math.random() * gameData.pets.length);
        const summonedPet = gameData.pets[randomIndex];
        
        // 设置仙宠数据
        gameData.pet = {
            name: summonedPet.name,
            cultivationBonus: summonedPet.cultivationBonus,
            spiritStoneBonus: summonedPet.spiritStoneBonus,
            level: 1
        };
        
        // 更新UI
        updatePetDisplay();
        updateSpiritStones();
        updateIncomeDisplay();
        
        // 显示结果
        showBreakthroughResult('召唤成功', `恭喜您召唤到${summonedPet.name}！`);
        
        // 保存游戏
        saveGameData();
    } else {
        showBreakthroughResult('灵石不足', `召唤仙宠需要${summonCost}灵石！`);
    }
}

// 升级御灵诀
function upgradePetSkill() {
    // 计算升级所需灵石
    const upgradeCost = 10000 * gameData.petSkillLevel; // 每次升级价格递增
    
    // 检查是否有仙宠
    if (gameData.pet.name === "无") {
        showBreakthroughResult('无仙宠', '请先召唤一只仙宠！');
        return;
    }
    
    // 检查灵石是否足够
    if (gameData.spiritStones >= upgradeCost) {
        gameData.spiritStones -= upgradeCost;
        gameData.petSkillLevel++;
        
        // 更新UI
        updatePetSkillDisplay();
        updateSpiritStones();
        updateIncomeDisplay();
        
        // 显示结果
        const bonusPercentage = Math.round(gameData.petSkillBonus * (gameData.petSkillLevel - 1) * 100);
        showBreakthroughResult('升级成功', `御灵诀升至${gameData.petSkillLevel}级！仙宠效果提升${bonusPercentage}%！`);
        
        // 保存游戏
        saveGameData();
    } else {
        showBreakthroughResult('灵石不足', `升级御灵诀需要${upgradeCost}灵石！`);
    }
}

// 尝试突破境界
function attemptBreakthrough() {
    // 计算当前境界索引
    const currentStageIndex = gameData.stages.indexOf(gameData.currentStage.name) * gameData.currentStage.totalLevels + (gameData.currentStage.level - 1);
    
    if (currentStageIndex >= gameData.stageRequirements.length) {
        showBreakthroughResult('突破失败', '您已达到最高境界！');
        return;
    }
    
    const requirement = gameData.stageRequirements[currentStageIndex];
    
    // 检查突破条件
    if (gameData.cultivationPoints >= requirement.cultivation && gameData.pills.breakthrough >= requirement.pills) {
        // 计算突破成功率（基础成功率70%，祝福值每点增加1%成功率）
        let successRate = 0.7 + (gameData.blessingValue * 0.01);
        
        // 应用门派突破成功率加成
        if (gameData.clan.name !== "无" && gameData.clan.bonusType === "breakthrough") {
            const clanBonus = gameData.clan.bonusValue * (1 + gameData.clanSkillBonus * (gameData.clanSkillLevel - 1));
            successRate += clanBonus;
        }
        
        successRate = Math.min(successRate, 1.0); // 最高100%成功率
        
        const isSuccess = Math.random() < successRate;
        
        if (isSuccess) {
            // 突破成功
            breakthroughSuccess(currentStageIndex, requirement);
        } else {
            // 突破失败，增加祝福值
            gameData.blessingValue += 10;
            if (gameData.pills.breakthrough >= requirement.pills) {
                gameData.pills.breakthrough -= requirement.pills;
            }
            
            showBreakthroughResult('突破失败', `再接再厉！祝福值+10，当前祝福值：${gameData.blessingValue}/100`);
            
            // 更新UI
            updatePillsDisplay();
            updateBlessingValue();
            
            // 保存游戏
            saveGameData();
        }
    } else {
        // 条件不满足
        let message = '突破条件不足：';
        if (gameData.cultivationPoints < requirement.cultivation) {
            message += `修为值不足（当前：${Math.floor(gameData.cultivationPoints)}/${requirement.cultivation}）`;
        }
        if (gameData.pills.breakthrough < requirement.pills) {
            if (gameData.cultivationPoints < requirement.cultivation) message += '，';
            message += `突破丹不足（当前：${gameData.pills.breakthrough}/${requirement.pills}）`;
        }
        
        showBreakthroughResult('突破条件不足', message);
    }
}

// 突破成功处理
function breakthroughSuccess(currentStageIndex, requirement) {
    // 扣除突破所需资源
    gameData.cultivationPoints -= requirement.cultivation;
    gameData.pills.breakthrough -= requirement.pills;
    
    // 重置祝福值
    gameData.blessingValue = 0;
    
    // 升级境界
    gameData.currentStage.level++;
    
    // 检查是否需要晋升大境界
    if (gameData.currentStage.level > gameData.currentStage.totalLevels) {
        const currentStagePos = gameData.stages.indexOf(gameData.currentStage.name);
        if (currentStagePos < gameData.stages.length - 1) {
            gameData.currentStage.name = gameData.stages[currentStagePos + 1];
            gameData.currentStage.level = 1;
            
            // 提升基础收益
            gameData.baseCultivationPerSecond *= 1.5;
            gameData.baseSpiritStonePerSecond *= 1.5;
            
            // 提升灵根等级（每晋升大境界灵根等级+1）
            gameData.spiritualRoot.level++;
            gameData.spiritualRoot.bonus += 0.1;
        }
    }
    
    // 更新下一阶需求
    if (currentStageIndex + 1 < gameData.stageRequirements.length) {
        gameData.nextStageRequirement = gameData.stageRequirements[currentStageIndex + 1].cultivation;
    }
    
    // 显示突破结果
    showBreakthroughResult('突破成功！', `恭喜您突破至${gameData.currentStage.name} ${gameData.currentStage.level}层！`);
    
    // 更新UI
    updateUI();
    
    // 保存游戏
    saveGameData();
}

// 显示突破结果弹窗
function showBreakthroughResult(title, message) {
    elements.breakthroughResultTitle.textContent = title;
    elements.breakthroughResultText.textContent = message;
    elements.breakthroughResultModal.style.display = 'flex';
}

// 关闭突破结果弹窗
function closeBreakthroughResultModal() {
    elements.breakthroughResultModal.style.display = 'none';
}

// 门派系统函数

// 显示门派选择弹窗
function showClanModal() {
    if (gameData.clan.name !== "无") {
        showBreakthroughResult('已有门派', '您已经加入了一个门派！');
        return;
    }
    elements.clanModal.style.display = 'flex';
}

// 关闭门派选择弹窗
function closeClanModal() {
    elements.clanModal.style.display = 'none';
}

// 加入门派
function joinClan(clanName) {
    const clan = gameData.clans.find(c => c.name === clanName);
    if (clan) {
        gameData.clan = {
            name: clan.name,
            bonusType: clan.bonusType,
            bonusValue: clan.bonusValue
        };
        
        // 更新UI
        updateClanDisplay();
        updateIncomeDisplay();
        
        // 显示结果
        let bonusDescription = '';
        if (clan.bonusType === 'cultivation') bonusDescription = '+15% 修为收益';
        else if (clan.bonusType === 'spiritStone') bonusDescription = '+10% 灵石收益';
        else if (clan.bonusType === 'pet') bonusDescription = '+5% 仙宠效果';
        else if (clan.bonusType === 'breakthrough') bonusDescription = '+10% 突破成功率';
        
        showBreakthroughResult('加入成功', `恭喜您加入${clan.name}！获得${bonusDescription}！`);
        
        // 关闭弹窗
        closeClanModal();
        
        // 保存游戏
        saveGameData();
    }
}

// 做门派任务
function doClanMission() {
    if (gameData.clan.name === "无") {
        showBreakthroughResult('无门派', '请先加入一个门派！');
        return;
    }
    
    // 消耗修为完成任务
    const cultivationCost = 1000 * (1 + gameData.clanContribution * 0.1); // 任务难度随贡献增加
    
    if (gameData.cultivationPoints >= cultivationCost) {
        gameData.cultivationPoints -= cultivationCost;
        gameData.clanContribution += 10;
        
        // 更新UI
        updateCultivationPoints();
        updateClanDisplay();
        
        // 显示结果
        showBreakthroughResult('任务完成', `获得10点门派贡献！当前贡献：${gameData.clanContribution}`);
        
        // 保存游戏
        saveGameData();
    } else {
        showBreakthroughResult('修为不足', `完成门派任务需要${cultivationCost}修为！`);
    }
}

// 升级门派技能
function upgradeClanSkill() {
    if (gameData.clan.name === "无") {
        showBreakthroughResult('无门派', '请先加入一个门派！');
        return;
    }
    
    // 计算升级所需贡献
    const contributionCost = 50 * gameData.clanSkillLevel;
    
    if (gameData.clanContribution >= contributionCost) {
        gameData.clanContribution -= contributionCost;
        gameData.clanSkillLevel++;
        
        // 更新UI
        updateClanDisplay();
        updateIncomeDisplay();
        
        // 显示结果
        const bonusPercentage = Math.round(gameData.clanSkillBonus * (gameData.clanSkillLevel - 1) * 100);
        showBreakthroughResult('技能升级', `门派技能升至${gameData.clanSkillLevel}级！门派效果提升${bonusPercentage}%！`);
        
        // 保存游戏
        saveGameData();
    } else {
        showBreakthroughResult('贡献不足', `升级门派技能需要${contributionCost}贡献！`);
    }
}

// 挑战塔系统函数

// 显示挑战塔弹窗
function showTowerModal() {
    // 更新弹窗信息
    elements.currentTowerLevel.textContent = gameData.currentTowerLevel;
    elements.highestTowerLevel.textContent = gameData.highestTowerLevel;
    
    // 计算下一层奖励
    const nextLevel = gameData.currentTowerLevel + 1;
    const cultivationReward = 1000 * nextLevel;
    const stoneReward = 500 * nextLevel;
    elements.towerReward.textContent = `修为+${cultivationReward}，灵石+${stoneReward}`;
    
    // 显示弹窗
    elements.towerModal.style.display = 'flex';
}

// 关闭挑战塔弹窗
function closeTowerModal() {
    elements.towerModal.style.display = 'none';
}

// 开始挑战塔挑战
function startTowerChallenge() {
    const nextLevel = gameData.currentTowerLevel + 1;
    
    // 挑战条件：境界要求
    const requiredStageIndex = Math.floor(nextLevel / 5); // 每5层要求提升一个大境界
    
    if (requiredStageIndex >= gameData.stages.length) {
        showBreakthroughResult('挑战失败', '您已达到挑战塔最高层！');
        closeTowerModal();
        return;
    }
    
    const requiredStage = gameData.stages[requiredStageIndex];
    
    // 检查是否达到所需境界
    const currentStageIndex = gameData.stages.indexOf(gameData.currentStage.name);
    
    if (currentStageIndex < requiredStageIndex) {
        showBreakthroughResult('境界不足', `挑战第${nextLevel}层需要达到${requiredStage}！`);
        return;
    }
    
    // 计算挑战成功率（基于当前境界和层数）
    let successRate = 0.5 + (currentStageIndex - requiredStageIndex) * 0.2;
    successRate = Math.min(successRate, 0.9); // 最高90%成功率
    
    const isSuccess = Math.random() < successRate;
    
    if (isSuccess) {
        // 挑战成功
        gameData.currentTowerLevel = nextLevel;
        
        // 更新最高记录
        if (nextLevel > gameData.highestTowerLevel) {
            gameData.highestTowerLevel = nextLevel;
        }
        
        // 发放奖励
        const cultivationReward = 1000 * nextLevel;
        const stoneReward = 500 * nextLevel;
        gameData.cultivationPoints += cultivationReward;
        gameData.spiritStones += stoneReward;
        
        // 更新UI
        updateTowerDisplay();
        updateCultivationPoints();
        updateSpiritStones();
        
        // 显示结果
        showBreakthroughResult('挑战成功', `成功通过第${nextLevel}层！获得修为+${cultivationReward}，灵石+${stoneReward}！`);
        
        // 关闭弹窗
        closeTowerModal();
        
        // 保存游戏
        saveGameData();
    } else {
        // 挑战失败
        showBreakthroughResult('挑战失败', `未能通过第${nextLevel}层，再接再厉！`);
    }
}

// 保存游戏数据
function saveGameData() {
    try {
        // 保存游戏数据
        localStorage.setItem('xiuxianGameData', JSON.stringify(gameData));
        
        // 记录退出时间
        localStorage.setItem('lastQuitTime', new Date().getTime().toString());
        
        // 更新最后保存时间
        gameData.lastSaveTime = new Date().getTime();
        
        // 可以添加保存提示
    } catch (error) {
        console.error('保存游戏数据失败:', error);
    }
}

// 加载游戏数据
function loadGameData() {
    try {
        const savedData = localStorage.getItem('xiuxianGameData');
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            
            // 合并保存的数据到当前游戏数据
            Object.assign(gameData, parsedData);
        }
    } catch (error) {
        console.error('加载游戏数据失败:', error);
        // 如果加载失败，使用默认数据
    }
}

// 更新整个UI
function updateUI() {
    updateStageDisplay();
    updateCultivationPoints();
    updateSpiritualRootDisplay();
    updateSpiritStones();
    updatePillsDisplay();
    updateIncomeDisplay();
    updateOfflineRewardDisplay();
    updateBlessingValue();
    updatePetDisplay();
    updatePetSkillDisplay();
    updateClanDisplay();
    updateTowerDisplay();
}

// 更新仙宠显示
function updatePetDisplay() {
    elements.currentPet.textContent = gameData.pet.name;
    
    // 计算仙宠最终加成（考虑御灵诀）
    let finalCultivationBonus = 0;
    let finalSpiritStoneBonus = 0;
    
    if (gameData.pet.name !== "无") {
        finalCultivationBonus = gameData.pet.cultivationBonus * (1 + gameData.petSkillBonus * (gameData.petSkillLevel - 1));
        finalSpiritStoneBonus = gameData.pet.spiritStoneBonus * (1 + gameData.petSkillBonus * (gameData.petSkillLevel - 1));
    }
    
    elements.petBonus.textContent = `${Math.round(finalCultivationBonus * 100)}% 修为，${Math.round(finalSpiritStoneBonus * 100)}% 灵石`;
}

// 更新门派信息显示
function updateClanDisplay() {
    elements.currentClan.textContent = gameData.clan.name;
    elements.clanContribution.textContent = gameData.clanContribution;
    
    const bonusPercentage = Math.round(gameData.clan.bonusValue * (1 + gameData.clanSkillBonus * (gameData.clanSkillLevel - 1)) * 100);
    let bonusText = '';
    if (gameData.clan.bonusType === 'cultivation') bonusText = `+${bonusPercentage}% 修为收益`;
    else if (gameData.clan.bonusType === 'spiritStone') bonusText = `+${bonusPercentage}% 灵石收益`;
    else if (gameData.clan.bonusType === 'pet') bonusText = `+${bonusPercentage}% 仙宠效果`;
    else if (gameData.clan.bonusType === 'breakthrough') bonusText = `+${bonusPercentage}% 突破成功率`;
    
    elements.clanSkillLevel.textContent = `门派技能 ${gameData.clanSkillLevel}级 (${bonusText})`;
}

// 更新挑战塔信息显示
function updateTowerDisplay() {
    elements.towerLevel.textContent = gameData.currentTowerLevel;
    elements.towerRecord.textContent = gameData.highestTowerLevel;
    
    const nextLevel = gameData.currentTowerLevel + 1;
    const requiredStageIndex = Math.floor(nextLevel / 5);
    
    if (requiredStageIndex < gameData.stages.length) {
        const requiredStage = gameData.stages[requiredStageIndex];
        elements.nextTowerLevel.textContent = `第${nextLevel}层 (需要${requiredStage})`;
    } else {
        elements.nextTowerLevel.textContent = '已达到最高层';
    }
}

// 更新御灵诀显示
function updatePetSkillDisplay() {
    const bonusPercentage = Math.round(gameData.petSkillBonus * (gameData.petSkillLevel - 1) * 100);
    elements.petSkillLevel.textContent = `${gameData.petSkillLevel}级 (+${bonusPercentage}% 仙宠效果)`;
}

// 更新境界显示
function updateStageDisplay() {
    elements.currentStage.textContent = `${gameData.currentStage.name} ${gameData.currentStage.level}层`;
}

// 更新修为值显示
function updateCultivationPoints() {
    elements.cultivationPoints.textContent = `${Math.floor(gameData.cultivationPoints)}/${gameData.nextStageRequirement}`;
}

// 更新灵根显示
function updateSpiritualRootDisplay() {
    const bonusPercentage = Math.round(gameData.spiritualRoot.bonus * 100);
    elements.spiritualRoot.textContent = `${gameData.spiritualRoot.type} ${gameData.spiritualRoot.level}级 (+${bonusPercentage}% 修为/秒)`;
}

// 更新灵石显示
function updateSpiritStones() {
    elements.spiritStones.textContent = Math.floor(gameData.spiritStones);
}

// 更新丹药显示
function updatePillsDisplay() {
    elements.breakthroughPills.textContent = gameData.pills.breakthrough;
    elements.cultivationPills.textContent = gameData.pills.cultivation;
}

// 更新收益显示
function updateIncomeDisplay() {
    const cultivationPerSecond = gameData.baseCultivationPerSecond * (1 + gameData.spiritualRoot.bonus);
    const spiritStonePerSecond = gameData.baseSpiritStonePerSecond;
    
    elements.currentIncome.textContent = `${cultivationPerSecond.toFixed(1)} 修为/秒，${spiritStonePerSecond.toFixed(1)} 灵石/秒`;
}

// 更新离线收益显示
function updateOfflineRewardDisplay() {
    if (gameData.offlineRewardAvailable > 0) {
        const hours = Math.floor(gameData.offlineRewardAvailable / 3600);
        const minutes = Math.floor((gameData.offlineRewardAvailable % 3600) / 60);
        elements.offlineReward.textContent = `${hours}小时${minutes}分`;
    } else {
        elements.offlineReward.textContent = '0小时0分';
    }
}

// 更新祝福值显示
function updateBlessingValue() {
    elements.blessingValue.textContent = `${gameData.blessingValue}/100`;
}

// 游戏启动
window.addEventListener('DOMContentLoaded', initGame);