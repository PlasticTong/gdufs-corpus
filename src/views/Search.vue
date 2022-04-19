/* eslint-disable @typescript-eslint/no-empty-function */
<template>
  <div class="table-list">
    <div class="search-form">
      <el-form
        :inline="true"
        size="mini"
        class="demo-form-inline"
      >
        <el-form-item label="关键词">
          <el-input v-model="req_str" placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getNews(req_str), getWord2(req_str)"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item
          ><span style="color: red">{{ req_str }}</span></el-form-item
        >
        <el-form-item label="词频">
          <div>{{ wordNum }}</div>
        </el-form-item>
      </el-form>
    </div>
    <div class="search-form">
      <el-form
        :inline="true"
        size="mini"
        class="demo-form-inline"
      >
        <el-form-item label="正则表达式">
          <el-input v-model="req_strCov" placeholder="请输入正则表达式"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="getNewsCov(req_strCov)"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="table-data">
      <el-table
        border
        :max-height="tableMinHeight()"
        :data="resultNews.news"
        style="width: 100%"
      >
        <el-table-column
          prop="res_news"
          label="语料"
          size="max"
          header-align="center"
        >
        <template #default="scope">
          <div v-html="scope.row.res_news"></div>
        </template>
        </el-table-column>
         <el-table-column
          label="语料链接"
          min-width="20%"
          header-align="center"
        >
        <template #default="scope">
          <a :herf="scope.row.request_url" target="_blank" class="buttonText">{{scope.row.request_url}}</a>
        </template>
        </el-table-column>
      </el-table>
      <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    class="pagination"
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="[3,15, 20, 25, 50, 100, 500]"
    :page-size="pageSize"
    :total="totalSize"
  ></el-pagination>
    </div>
    
  </div>
  
</template>

<script>
import { reactive, ref } from "vue";
import axios from "axios";
import { searchServe } from "@/api/index";
import { getCurrentInstance } from "vue";
import { getTableList, getItem, deleteItem } from "@/api/index";
export default {
  data() {
    return {};
  },
  methods: {},
  setup() {
    const tableDataList = reactive({ id: "", list: [] });
    function getList() {
      getTableList().then((data) => {
        if (data.err === "") {
          tableDataList.list = data.result;
        }
      });
    }
    // const {proxy} = getCurrentInstance()
    // console.log(proxy)
    // console.log(proxy.getItem('pageSize'))
    // const datab = getCurrentInstance();
    // async function getdata(){
    //   let dataa=datab.data.pageSize;
    //   console.log(datab.data);

    // 	console.log(dataa)
    // }
    // getdata();
    const req_str = ref(null);
    const req_strCov = ref(null);
    const resultNews = reactive({ news: [],url:[] });
    const test = ref(null);
    let result_news = new Array();
    //词频获取
    const wordNum = ref(null);
    function getWord(str) {
      resultNews.news = [];
      result_news = [];
      axios({
        url: `${searchServe}/s/v1/search/getWordNum?word=${str}&language=${localStorage.getItem(
          "lan"
        )}`,
        method: "GET",
        headers: {
          "x-token": localStorage.getItem("user"),
        },
      }).then((res) => {
        wordNum.value = res.num;
      });
    }


    function getWord2(str) {
      resultNews.news = [];
      result_news = [];
      axios({
        url: `${searchServe}/s/v1/search/getWordFrqTab?word=${str}&language=${localStorage.getItem(
          "lan"
        )}`,
        method: "GET",
        headers: {
          "x-token": localStorage.getItem("user"),
        },
      }).then((res) => {
        console.log(res);
        
        // console.log(res.data.filter((item) => item.name.includes('dilakukan')));
        
        wordNum.value = res.num;
      });
    }
    // getWord2('pandemi');


    //新闻获取
    function getNews(str) {
      if(str==null)alert('输入为空')
      else{
      resultNews.news = [];
      result_news = [];
      // console.log('页码',currentPage);
      // console.log('页数',pageSize);
      axios({
        url: `${searchServe}/s/v1/search/getNews?req_str=${str}&language=${localStorage.getItem(
          "lan"
        )}&pn=${currentPage.value}&psize=${pageSize.value}`,
        method: "GET",
        headers: {
          "x-token": localStorage.getItem("user"),
        },
      }).then((res) => {
        console.log('新闻',res);
        if (res.data[0] == null) alert("暂无数据");
        else {
          resultNews.news = res.data;
          totalSize.value = res.totalNum;
          console.log(resultNews.news);
          console.log(totalSize.value);          
          for(var i=0;i<resultNews.news.length; i++){
          const replaceString = `<span style="color: red;">${str}</span>`;
          resultNews.news[i].res_news = resultNews.news[i].res_news.replace(
            RegExp(str, "gi"),
            replaceString
          );
          }
        }
      });
    }
    }
    //新闻获取正则
    function getNewsCov(str) {
      if(str==null)alert('输入为空')
      else{
      resultNews.news = [];
      result_news = [];
      // console.log('页码',currentPage);
      // console.log('页数',pageSize);
      axios({
        url: `${searchServe}/s/v1/search/getNewsFromRegexp?regexp=${str}&language=${localStorage.getItem(
          "lan"
        )}&pn=${currentPage.value}&psize=${pageSize.value}`,
        method: "GET",
        headers: {
          "x-token": localStorage.getItem("user"),
        },
      }).then((res) => {
        console.log('新闻',res);
        if (res.data[0] == null) alert("暂无数据");
        else {
          resultNews.news = res.data;
          totalSize.value = res.totalNum;
          console.log(resultNews.news);
          console.log(totalSize.value);          
          for(var i=0;i<resultNews.news.length; i++){
          const replaceString = `<span style="color: red;">${str}</span>`;
          str= new RegExp(str,"mgi")
          resultNews.news[i].res_news = resultNews.news[i].res_news.replace(
            str,
            function (item) {
        return `<span style="color:red">${item}</span>`;
    }
          );
          }
        }
      });
    }
    }
    // getNews(localStorage.getItem('w'))
    //分页
    const pageSize = ref("3");
    const currentPage = ref("1");
    const totalSize = ref("0");
    function handleSizeChange(val) {
      pageSize.value = val;
      getNews(req_str.value);
    }

    function handleCurrentChange(val) {
      currentPage.value = val;
      getNews(req_str.value);
    }
    console.log(pageSize);

    function tableMinHeight() {
      return window.innerHeight - 156;
    }

    function onSearch() {
      getItem({ id: tableDataList.id }).then((data) => {
        if (data.err === "") {
          let arr = [];
          arr.push(data.result);
          tableDataList.list = arr;
        }
      });
    }
    function deleteRow(index, row) {
      // console.log(index, row, 'params');
      deleteItem({ id: row.id }).then((data) => {
        console.log(data, "delete");
        if (data.err === "") {
          getList();
        }
      });
    }

    return {
      test,
      getWord,
      getWord2,
      wordNum,
      result_news,
      tableDataList,
      tableMinHeight,
      onSearch,
      deleteRow,
      req_str,
      getNews,
      resultNews,
      getNewsCov,
      totalSize,
      pageSize: 3,
      currentPage: 1,
      handleSizeChange,
      handleCurrentChange,
      req_strCov,
    };
  },
};
</script>

<style lang="less" scoped>
.pagination {
  margin-top: 10px;
  justify-content: flex-end;
}
</style>