
import pandas as pd

def getresult_one(start_data):
    # 将列表转换为DataFrame 再用grouby进行分类
    df = pd.DataFrame(start_data,columns=['stu_name','stu_class','stu_major'])
    x = df.groupby(['stu_class','stu_major']).size()
    
    #建立字典嵌套判断，字典判断是否有该系，有再往里加该系的专业及该专业人数
    #若不存在，新建一个key为该系
    all_data = {}
    for i in range(len(x.keys())):
        key1 = x.keys()[i][0]
        key2 = x.keys()[i][1]
        if key1 in all_data:
            all_data[key1][key2] = x.values[i]
        else:
            all_data[key1] = {}
            all_data[key1][key2] = x.values[i]
    return all_data

def getresult_two(one_dict):
    dicts = {}
    for ks,vs in one_dict.items():
        dicts['name'] = ks
        arrs = []
        for k,v in vs.items():
            arrs.append({'name':k,'value':str(v)})
        dicts['children'] = arrs
    return dicts

def getresult_three(all_data):
    arrs = []
    for k,v in all_data.items():
        none_dict = {}
        none_dict[k]=v
        arrs.append(getresult_two(none_dict))
    return arrs

    










