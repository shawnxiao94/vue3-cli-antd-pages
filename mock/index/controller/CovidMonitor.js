/*
 * @Author: shawnxiao
 * @Date: 2021-02-01 11:53:35
 * @LastEditTime: 2021-02-07 14:28:25
 * @FilePath: /vue3-cli-antd-pages/mock/index/controller/CovidMonitor.js
 */

module.exports = [
  {
    url: '/reportAndMonitor/findAll',
    type: 'get',
    response() {
      return {
        code: 200,
        message: '查询成功',
        data: {
          number0: 17018,
          number1: 1952,
          number2: 1952,
          number3: 0,
          number4: 15066,
          number5: 1952,
          number6: 0,
          number7: 46,
          number11: 11.0,
          number12: 100.0,
          number13: 0.0,
          number14: 89.0,
          number15: 11.0,
          number16: 0.0,
          number17: 11.0
        }
      }
    }
  },
  {
    url: '/reportAndMonitor/update',
    type: 'get',
    response() {
      return {
        code: 200,
        message: '查询成功'
      }
    }
  },
  {
    url: '/reportAndMonitor/getGridList',
    type: 'get',
    response() {
      return {
        code: 200,
        message: '查询成功',
        data: {
          total: 376,
          GridList: [
            {
              girdName: 'ATLAS项目第一格（经理部办公生活区）',
              gridLengthName: '徐晓斌',
              projectName: '埃塞ATLAS房建项目',
              affiliatedUnitName: '埃塞国家总项目部',
              voidMark: '否'
            },
            {
              girdName: '亚的斯公司第一格（经理部）-1',
              gridLengthName: '于耀宁',
              projectName: '亚的斯项目',
              affiliatedUnitName: '埃塞国家总项目部',
              voidMark: '否'
            },
            {
              girdName: '科技大学项目第一格（项目营地)',
              gridLengthName: '姚春灵',
              projectName: '埃塞亚的斯科技大学项目',
              affiliatedUnitName: '埃塞国家总项目部',
              voidMark: '否'
            },
            {
              girdName: '亚的斯公司第十一格（孔博恰项目）',
              gridLengthName: '马强',
              projectName: '亚的斯项目',
              affiliatedUnitName: '埃塞国家总项目部',
              voidMark: '否'
            },
            {
              girdName: 'NQI项目项目经理部1-1格子',
              gridLengthName: '张君健',
              projectName: '埃塞ESA和NQI房建项目',
              affiliatedUnitName: '埃塞国家总项目部',
              voidMark: '否'
            },
            {
              girdName:
                '宝丽机场项目第二格（协作队江苏敦邦和兰天大诚中方人员）',
              gridLengthName: '毕海啸',
              projectName: '埃塞宝丽机场项目',
              affiliatedUnitName: '埃塞国家总项目部',
              voidMark: '否'
            },
            {
              girdName: '河道项目经理部',
              gridLengthName: '刘永祥',
              projectName: '援埃塞俄比亚河岸绿色发展项目',
              affiliatedUnitName: '埃塞国家总项目部',
              voidMark: '否'
            },
            {
              girdName: 'NIB项目第一格（经理部）',
              gridLengthName: '葛自丽',
              projectName: '埃塞NIB房建项目',
              affiliatedUnitName: '埃塞国家总项目部',
              voidMark: '否'
            },
            {
              girdName: 'NQI项目施工二区2-1格子',
              gridLengthName: '李春桥',
              projectName: '埃塞ESA和NQI房建项目',
              affiliatedUnitName: '埃塞国家总项目部',
              voidMark: '否'
            },
            {
              girdName: '宝丽机场项目第一格（经理部中方人员）',
              gridLengthName: '姜辉云',
              projectName: '埃塞宝丽机场项目',
              affiliatedUnitName: '埃塞国家总项目部',
              voidMark: '否'
            },
            {
              girdName: '亚的斯公司第七格（沥青拌和站）-1',
              gridLengthName: '耿立辉',
              projectName: '亚的斯项目',
              affiliatedUnitName: '埃塞国家总项目部',
              voidMark: '否'
            },
            {
              girdName: '亚的斯公司第十三格（上海金岭-分包商）',
              gridLengthName: '顾恒恒',
              projectName: '亚的斯项目',
              affiliatedUnitName: '埃塞国家总项目部',
              voidMark: '否'
            },
            {
              girdName: '埃塞国家总项目部机关（办公生活区、隔离区）',
              gridLengthName: '祝一轩',
              projectName: null,
              affiliatedUnitName: '埃塞国家总项目部',
              voidMark: '否'
            },
            {
              girdName: 'WM铁路项目第七格（亚的斯代表处）',
              gridLengthName: '宫荣廷',
              projectName: '埃塞WM铁路项目',
              affiliatedUnitName: '埃塞国家总项目部',
              voidMark: '否'
            },
            {
              girdName: '亚的斯公司第二格（机场项目、机场料场）-1',
              gridLengthName: '何亦伟',
              projectName: '亚的斯项目',
              affiliatedUnitName: '埃塞国家总项目部',
              voidMark: '否'
            }
          ]
        }
      }
    }
  }
]
