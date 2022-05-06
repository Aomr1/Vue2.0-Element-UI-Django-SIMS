<template>
  <div>
      <el-row :gutter="20" style="margin-left: 0px;margin-right: 0px;">
        <el-col :span="24" style="margin-top:15px;">
          <h2 style="text-align: center;font-size: 20px;">集美大学诚毅学院专业人数统计</h2>
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
    name:'CollegeCount',
    data() {
        return {
          tableData:[]
        }
    },
    mounted(){
        this.$axios.get('http://127.0.0.1:8000/sims_app/select_stu/')
            .then(response=>{
                this.tableData = response.data
        var major_obj = {}
        var major_list = this.tableData.map(item => item.stu_major)
        for(var i=0; i<(major_list.length); i++){
            var key = major_list[i];
            if(major_obj[key]){
                major_obj[key] ++;
            }
            else{
                major_obj[key] = 1
            }
        }

        var major_obj_sort = Object.keys(major_obj).sort(function(a,b){return major_obj[a]-major_obj[b]})
        var keys = []
        var values = []
        for(key in major_obj_sort){                     
            keys.push(major_obj_sort[key])
            values.push(major_obj[major_obj_sort[key]])
        }
        var myChart = echarts.init(document.getElementById('pic'))
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'shadow'
                }
            },
            legend: {
                data: ['专业人数'],
                x: '92%',
            },
            calculable: true,
            grid: {
                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '10%',
                containLabel: true
            },
            yAxis: [
                {
                type: 'category',
                // prettier-ignore
                data: keys,
                axisLabel:{  
                    interval: 0, //此处关键， 设置文本标签全部显示 
                },
                }
            ],
            xAxis: [
                {
                type: 'value',
                }
            ],
            series: [
                {
                name: '专业人数',
                type: 'bar',
                data: values,
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