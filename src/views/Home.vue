<template>
  <div class="home">
    <h3>{{ localStorage.name }},你好</h3>
    <h2>欢迎使用广东外语外贸大学新闻语料库检索系统</h2>
    <div>印尼语新闻语料：{{ number.ind }}</div>
    <div>菲律宾语新闻语料：{{ 24481 }}</div>
    <div>马来语新闻语料：{{ 43587}}</div>
      <div class="table-data">
      <el-table
        border
        :max-height="tableMinHeight()"
        :data="number_table"
        style="width: 100%"
      >
        <el-table-column
          label="语料"
          size="50"
          header-align="center"
        >
        <template #default="scope">
            <el-form-item >
              <span>{{ scope.row.name }}</span>
            </el-form-item>
        </template>
        </el-table-column>
        <el-table-column
          label="总数"
          size="50"
          header-align="center"
        >       
        <template #default="scope">
            <el-form-item >
              <span>{{ scope.row.number }}</span>
            </el-form-item>
        </template>
        </el-table-column>
        
      </el-table>
    </div>
    <div align="center">
    <div id="main" style="width: 900px; height: 300px" ></div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, provide } from "vue";
import * as echarts from "echarts";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import axios from "axios";
import { searchServe } from "@/api";
export default {
  data() {
    // const number = reactive({ ind: "0", phi: "0", may: "0" });
    return {
      ind: 100,
      phi: 0,
      may: 0,
    };
  },
  mounted: function () {
    this.$nextTick(async () => {
      //       async function getNumber222() {
      //     const getNumber = () => {
      //         return new Promise((resolve, reject) => {
      //             axios({xxx}).then(res => {
      //                 resolve(res)
      //             })
      //         })
      //     }
      //     this.$data.ind = await getNumber()
      //     this.$data.phi = await getNumber()
      //     this.$data.mar = await getNumber()
      //     this.getPie()
      // }
      this.getNumber222();
      // await this.getPie();
    });
  },
  methods: {
    async getNumber222() {
      const getNumber = (language) => {
        return new Promise((resolve, reject) => {
          axios({
            url: `${searchServe}/s/v1/search/getTotalNum?language=${language}`,
            method: "GET",
            headers: {
          "x-token": localStorage.getItem("user"),
        },
          }).then((res) => {
            resolve(Number(res.totalNum));
          });
        });
      };
      this.$data.ind = await getNumber("ind");
      this.$data.phi = await getNumber("phi");
      this.$data.mar = await getNumber("mar");
      this.getPie();
    },
    async getPie() {
      // console.log(this.$data);
      // console.log(document.getElementById("main"));
      
      // 绘制图表
      var myChart = echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
        //标题
        title: {
          text: "语料构成",
          x: "center", //标题位置
          textStyle: {
            //标题内容的样式
            color: "#FF00FF",
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
        //饼图中各模块的颜色
        color: ["#32dadd", "#b6a2de", "#5ab1ef"],
        // 饼图数据
        series: {
          // name: 'bug分布',
          type: "pie", //echarts图的类型   pie代表饼图
          radius: "70%", //饼图中饼状部分的大小所占整个父元素的百分比
          center: ["50%", "50%"], //整个饼图在整个父元素中的位置
          // data:''               //饼图数据
          data: [
            //每个模块的名字和值
            { name: "印尼语", value: this.$data.ind },
            { name: "马来语", value: 43587 },
            { name: "菲律宾语", value: 24481 },
          ],
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
    function tableMinHeight() {
      return window.innerHeight - 156;
    }
    const number = reactive({ ind: "1", phi: "0", may: "0" });   
    // const numberResult = reactive({totalNum:''});
    const getNumber = (language) => {
      axios({
        url: `${searchServe}/s/v1/search/getTotalNum?language=${language}`,
        method: "GET",
        headers: {
          "x-token": localStorage.getItem("user"),
        },
      }).then((res) => {
        if (language == "ind") {
          number.ind = res.totalNum;
          };
        if (language == "phi") {
          number.phi = res.totalNum;
          }
        if (language == "mar") {
          number.may = res.totalNum;
          }
      });
    };
    getNumber("ind");
    getNumber("phi");
    getNumber("mar");
    const number_table = [
      {
        name:'印尼语',
        number:53199,
      },
      {
        name:'马来语',
        number:43587,
      },
      {
        name:'菲律宾语',
        number:24481,
      },
    ];
    console.log(number_table);
    return {
      getNumber,
      number,
      number_table,
      localStorage,
      tableMinHeight,
    };
  },
  components: {
    HelloWorld,
  },
};
</script>
<style lang="less">
.home {
  // text-align: center;
  line-height: 24px;
}
.height {
  height: 999px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.el-form-item{
  text-align: center;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
