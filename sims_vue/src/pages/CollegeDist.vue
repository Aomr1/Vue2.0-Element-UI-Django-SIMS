<template>
    <div>
      <el-row :gutter="20" style="margin-left: 0px;margin-right: 0px;">
        <el-col :span="24" style="margin-top:15px;">
          <h2 style="text-align: center;font-size: 20px;">集美大学诚毅学院院系分布情况</h2>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-left: 0px;margin-right: 0px;">
        <el-col :span="24" style="margin-top: 15px;">
            <el-card shadow="hover">
              <div id="pic" style="width:1300px;height:540px"></div>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
    name:'CollegeDist',
    data() {
        return {
          tableData:[]
        }
    },
     mounted(){
        this.$axios.get('http://127.0.0.1:8000/sims_app/college_dist/')
            .then(response=>{
                this.tableData = response.data
         
        var myChart = echarts.init(document.getElementById('pic'))
        const data = {
          name: '集美大学诚毅学院',
          children: this.tableData
        };
        data.children.forEach(function (datum, index) {
          index % 2 !== 0 && (datum.collapsed = true);})
        var option = {
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'
            },
            series: [
              {
                type: 'tree',
                data: [data],
                top: '0%',
                left: '9%',
                bottom: '0%',
                right: '11%',
                symbolSize: 7,
                
                lineStyle: {
                  width: 2
                },
                label: {
                  backgroundColor: '#fff',
                  position: 'left',
                  verticalAlign: 'middle',
                  align: 'right'
                },
                leaves: {
                  label: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                  }
                },
                emphasis: {
                  focus: 'descendant'
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
              }
            ]
        };

        myChart.setOption(option)
      })
    }
}
</script>

<style>
</style>