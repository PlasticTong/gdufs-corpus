<template>
        <Card class="card-style">
        <div
          class="siggle-chart"
          id="main"
        ></div>
      </Card>
</template>

<script>
import { searchServe } from "@/api";
import axios from "axios";
import { ref, reactive, provide } from "vue";
import * as echarts from "echarts";
import { toRaw } from 'vue';
export default {
  data() {
    return {
      data:[]
    };
  },
  mounted: function () {
    this.$nextTick(async () => {
      this.getNumber222();
    });
  },
  methods: {
    async getNumber222() {
      const getNumber = (language) => {
        return new Promise((resolve, reject) => {
          axios({
            url: `${searchServe}/s/v1/search/getCategory?language=${localStorage.getItem("lan")}`,
            method: "GET",
            headers: {
          "x-token": localStorage.getItem("user"),
        },
          }).then((res) => {
            resolve(res.categoryMap);
          });
        });
      };
      this.$data.data= await getNumber();
      this.getPie();
    },
    async getPie() {
      // console.log(this.$data.data.length);
      let datapie = []
      for(let i =0;i<this.$data.data.length;i++){
        datapie.push({ name: this.$data.data[i].name, value: this.$data.data[i].number })
      }
      
      console.log(datapie[0]);
      let shit='';
      console.log(localStorage);
      
      if(localStorage.getItem('lan')=='ind') shit='印尼语';
      if(localStorage.getItem('lan')=='phi') shit='菲律宾语';
      if(localStorage.getItem('lan')=='mar') shit='马来语';
      // 绘制图表
      var myChart = echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
        //标题
        title: {
          text: shit+"文本类型",
          x: "center", //标题位置
          textStyle: {
            //标题内容的样式
            color: "#C0FF3E",
            fontStyle: "normal",
            fontWeight: 100,
            fontSize: 16, //主题文字字体大小，默认为18px
          },
        },
        // stillShowZeroSum: true,
        //鼠标划过时饼状图上显示的数据
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c} ({d}%)",
        },
        //图例
        legend: {
          //图例  标注各种颜色代表的模块
          // orient: 'vertical',//图例的显示方式  默认横向显示
          bottom: 10, //控制图例出现的距离  默认左上角
          left: "center", //控制图例的位置
          // itemWidth: 16,//图例颜色块的宽度和高度
          // itemHeight: 12,
          textStyle: {
            //图例中文字的样式
            color: "#000",
            fontSize: 16,
          },
          data: ["印尼语", "马来语", "菲律宾语"], //图例上显示的饼图各模块上的名字
        },
        dataset:{
          datapie
        },
        //饼图中各模块的颜色
        color: ['#62d1de','#54d6b6','#a6db69','#ffd454','#ffa361','#d1d1d1'],
        // 饼图数据
        series: {
          // name: 'bug分布',
          type: "pie", //echarts图的类型   pie代表饼图
          radius: "70%", //饼图中饼状部分的大小所占整个父元素的百分比
          center: ["50%", "50%"], //整个饼图在整个父元素中的位置
          data:datapie,             //饼图数据
          // dataset: [
          //       datapie
          // ],
          itemStyle: {
            normal: {
              label: {
                show: true, //饼图上是否出现标注文字 标注各模块代表什么  默认是true
                // position: 'inner',//控制饼图上标注文字相对于饼图的位置  默认位置在饼图外
              },
              labelLine: {
                show: true, //官网demo里外部标注上的小细线的显示隐藏    默认显示
              },
            },
          },
        },
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
    setup() { 
      const getMap = () => {
        return new Promise((resolve, reject) => {
          axios({
            url: `${searchServe}/s/v1/search/getCategory?language=${localStorage.getItem("lan")}`,
            method: "GET",
            headers: {
          "x-token": localStorage.getItem("user"),
        },
          }).then((res) => {
            // console.log(res.categoryMap);            
          });
        });
      };
      getMap();
    },
}

</script>
<style lang="less">
.card-style {
  height: 600px;
  width: 100%;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 40px;
}
.siggle-chart {
  width: 1100px;
  height: 520px;
  margin: auto;
}
</style>
