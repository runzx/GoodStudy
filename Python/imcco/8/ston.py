'''
五行石 算法
    购买1级五行石： 金，钻石
    1级合成3级： 金，体力，1级五行石
    3级合成4级： 金，体力，1级五行石（一定概率）
    4级合成6级： 金，体力，4级五行石
'''
# 购买1级石头
l1_value = 0.75
l1_value_diamond = 8
# 1级合成3级
l1_to_l3 = 12           # 1颗1级 + 12颗1级石头
l1_to_l3_gold = 0.39
l1_to_l3_vit = 10       # 消耗体力 10点
# 3级合成4级
l3_to_l4 = 16           # 1颗3级 + 16颗1级石头
l3_to_l4_gold = 0.897
l3_to_l4_vit = 10
l3_to_l4_rate = 0.4878  # 成功率， 失败：金，16颗1级石被扣
# 4级合成6级
l4_to_l6 = 12           # 1颗4级 + 12颗4级
l4_to_l6_gold = 19.75
l4_to_l6_vit = 10
'''
市场卖价如下， 请问是自己合成划算还是购买划算？
6级石头 = 750 金
钻石diamond = 0.05金
体力vit = 1金
'''
DIAMOND = 0.05
VIT = 1

def l1_cost(quantity):
    '''
    # 计算1级石头成本
    '''
    cost = l1_value  + l1_value_diamond  * DIAMOND
    return cost * quantity

def l3_cost(quantity):
    '''
    计算1级合成3级石头的成本
    '''
    cost = l1_cost(l1_to_l3 + 1)  + l1_to_l3_gold + l1_to_l3_vit * VIT
    return cost * quantity

def l4_cost(quantity):
    '''
    计算3级合成4级石头的成本
    '''
    cost = l3_cost(1) + (l1_cost(l3_to_l4) + l3_to_l4_gold ) / l3_to_l4_rate\
            + l3_to_l4_vit * VIT
    return cost *quantity

def l6_cost(quantity):
    '''
    计算4级合成6级石头成本
    '''
    cost = l4_cost(1+l4_to_l6) + l4_to_l6_gold + l4_to_l6_vit * VIT
    return cost * quantity
if l6_cost(1) < 750:
    print('自己购买1颗1级五行石的成本是:', l1_cost(1), '金。')
    print('自己合成1颗3级五行石的成本是:', l3_cost(1), '金。')
    print('自己合成1颗4级五行石的成本是:', l4_cost(1), '金。')
    print('自己合成1颗6级五行石的成本是:', l6_cost(1), '金, 划算！')
else:
    print('自己购买1颗1级五行石的成本是:', l1_cost(1), '金。')
    print('自己合成1颗3级五行石的成本是:', l3_cost(1), '金。')
    print('自己合成1颗4级五行石的成本是:', l4_cost(1), '金。')
    print('自己合成1颗6级五行石的成本是:', l6_cost(1), '金, 不划算！')
