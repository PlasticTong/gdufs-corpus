/* eslint-disable @typescript-eslint/no-empty-function */
<template>
  <div class="table-list">
    <div class="search-form">
      <el-form :inline="true" size="mini" class="demo-form-inline">
        <el-form-item label="关键词">
          <el-input v-model="req_str" placeholder="请输入关键词"></el-input>
          <!-- <div>pengabaian</div> -->
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="getSyno(req_str, '0')"
            >同义词查询</el-button
          >
          <el-button type="success" @click="getSyno(req_str, '1')"
            >反义词查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="table-data">
      <el-table
        border
        :max-height="tableMinHeight()"
        :data="resultSynoSplit.res"
        style="width: 100%"
      >
        <el-table-column label="语料" size="max" header-align="center">
          <template #default="scope">
            <div align='center'>
          <el-button
              @click="deleteRow(scope.$index, scope.row)"
              type="text"
              size="small"
            >
              {{scope.row}}
            </el-button>
            </div>
        </template>
        </el-table-column>
        <el-table-column fixed="right" label="类别" width="120">
          <div>{{wordType}}</div>
          <!-- <template #default="scope">
            <div>{{ scope.row }}</div>
          
          <el-button
              @click="deleteRow(scope.$index, scope.row)"
              type="primary" round
              size="small"
            >
              {{scope.row}}
            </el-button>
            </template> -->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import axios from "axios";
import { searchServe } from "@/api/index";
import { getCurrentInstance } from "vue";
import { getTableList, getItem, deleteItem } from "@/api/index";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const req_str = ref(null);
    const resultSyno = [];
    const resultSynoSplit = reactive({ res: [] });
    const wordType = ref(null);
    function tableMinHeight() {
      return window.innerHeight - 156;
    }
    function getSyno(str, type) {
      axios({
        url: `${searchServe}/s/v1/search/getCRWord?req_word=${str}&req_type=${type}`,
        method: "GET",
        headers: {
          "x-token": localStorage.getItem("user"),
        },
      }).then((res) => {
        resultSyno.res = res.ans_word;
        console.log(res.ans_word);
        
        resultSynoSplit.res = resultSyno.res.split(", ");
        if(type == 0) wordType.value = '同义词';
        if(type == 1) wordType.value = '反义词';
        if(res.ans_word[0] == null) alert('暂无数据')
      });
    }
    function deleteRow(index, row) {
      // localStorage.setItem("word",row);
      router.push('/doc/doctxt/doctxtooo/docimg1')
    }
    return {
      tableMinHeight,
      req_str,
      getSyno,
      resultSyno,
      resultSynoSplit,
      deleteRow,
      wordType,
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