<template>
  <div class="client">
    <!-- 分页显示 -->
    <el-table :data="searchData.slice((paginationData.currentPage-1)*paginationData.pageSize,paginationData.currentPage*paginationData.pageSize)" style="width: 100%" height="92%">
      <el-table-column
       label="用户名称" 
       prop="username" 
       width="180" 
       align="center"
      >
      </el-table-column>
      <el-table-column
        label="用户电话"
        prop="phone"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column 
        label="用户邮箱" 
        prop="email" 
        width="180"
        show-overflow-tooltip 
        align="center"
      >
      </el-table-column>
      <el-table-column 
        label="用户信用" 
        prop="credit" 
        width="180"
        show-overflow-tooltip 
        align="center"
      >
      </el-table-column>
      <el-table-column 
        label="状态（测试）" 
        prop="state" 
        width="180"
        show-overflow-tooltip 
        align="center"
      >
      </el-table-column>
      <el-table-column align="center" class="gongneng">
        <template slot="header" slot-scope="scope">
          <el-input v-model='search'  placeholder="输入用户名称搜索"/>
        </template>
        <template slot-scope="scope">
            <el-button size="small" type="primary"
            @click="handleDelete(scope.$index, scope.row)">封禁/解封</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户弹窗 -->
    <!-- <Dialog :dialog="dialog" :formData="formData" @update="getGoods"></Dialog> -->
    <!-- 分页按钮 -->
      <el-row>
        <el-col :span="24">
          <div class="fenye">
            <el-pagination  @current-change="handleCurrentChange"
            :current-page.sync="paginationData.currentPage" :page-size="paginationData.pageSize" layout="total, prev, pager, next"
            :total="paginationData.total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: "Client",
  components: {},
  data() {
    return {
      search: "",
      states: 1,
      tableData: [],
      // 分页数据
      paginationData:{
        currentPage:1, //当前所在页
        total:0,  //总数
        pageSize:8 //一页显示多少条数据
      },
     
    };
  },
  created() { //每次重新加载都获取数据
     this.getGoods();
  },
  methods: {
    handleDelete(index, row) {
      // this.states = row.state
      // console.log(row);
      // console.log(row.id);
      this.$axios.post(`/api/buyer/state/${row.username}`,{state:row.state})
          .then(res => {
            console.log(res)
            this.$message({message:'成功',type:'success'})
            this.getGoods()
      })
    },
    getGoods() {
      this.$axios.get("/api/buyer")
        .then((result) => {
          // console.log(result);
          this.tableData = result.data.goodsInfo;
          this.paginationData.total=result.data.goodsInfo.length
          // console.log(this.tableData);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 
    
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.paginationData.currentPage=val
    },
  },
  computed:{
    searchData(){ //搜索且分页
      if (this.search) { //如有搜索内容
          // console.log("input输入的搜索内容：" + this.search)
          const s= this.tableData.filter(data=>data.username.includes(this.search.toLowerCase()))
          this.paginationData.total=s.length //页数改变
          return s
        }
        this.paginationData.total=this.tableData.length //搜索内容清空改回原页数
        return this.tableData
    }
  }
};
</script>

<style lang="less">
.client{
  height: 100%;
}
.el-main {
  .el-table th.el-table__cell > .cell {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-input__inner {
      width: 78%;
    }
  }
  .fenye{
    text-align: center;
    // margin: 0 auto;
  }
}
</style>
