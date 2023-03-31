<template>
  <div class="goods">
    <!-- 分页显示 -->
    <el-table :data="searchData.slice((paginationData.currentPage-1)*paginationData.pageSize,paginationData.currentPage*paginationData.pageSize)" style="width: 100%" height="92%">
      <el-table-column label="ID" prop="id" width="180" align="center">
      </el-table-column>
      <el-table-column label="商品名称" prop="goodsName" width="180" align="center">
      </el-table-column>
      <el-table-column
        label="商品价格"
        prop="goodsPrice"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column 
        label="商品图片" 
        prop="goodsImg" 
        width="180"
        show-overflow-tooltip 
        align="center"
      >
      </el-table-column>
      <el-table-column align="center" class="gongneng">
        <template slot="header" slot-scope="scope">
          <el-input v-model='search'  placeholder="输入商品名称关键字搜索"/>
          <el-button type="primary" @click="handleAddGoods" size="small">添加商品</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加商品弹窗 -->
    <Dialog :dialog="dialog" :formData="formData" @update="getGoods"></Dialog>
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
import Dialog from "../components/Dialog.vue";
export default {
  name: "Goods",
  components: { Dialog },
  data() {
    return {
      search: "",
      tableData: [],
      dialog: {
        isShow: false,
        title:'编辑',
        option:'edit'
      },
      // 弹窗表格的数据放在父级，传给弹窗
      formData:{
          id:'',
          goodsName:'',
          goodsPrice:'',
          goodsImg:'',
          goodsType:''
      },
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
    handleEdit(index, row) {
      // console.log(index, row);
      this.dialog={
        isShow:true,
        title:'编辑商品信息',
        option:'edit'
      }
      this.formData={
        id:row.id,
        goodsName:row.goodsName,
        goodsPrice:row.goodsPrice,
        goodsImg:row.goodsImg,
      }
    },
    handleDelete(index, row) {
      console.log(row);
      // console.log(row.id);
      if(confirm('是否删除')){
          this.$axios.post(`/api/goods/delete/${row.id}`)
          .then(res => {
            console.log(res)
            this.$message({message:'删除成功',type:'success'})
            this.getGoods()
          })
      }
    },
    getGoods() {
      this.$axios.get("/api/goods")
        .then((result) => {
          console.log(result);
          this.tableData = result.data.goodsInfo;
          this.paginationData.total=result.data.goodsInfo.length
        })
        .catch((err) => {
          console.log(err);
        });
    }, 
    handleAddGoods() {  
      this.dialog={
        isShow:true,
        title:'添加商品',
        option:'add'
      }
      this.formData={
          goodsName:'',
          goodsPrice:'',
          goodsImg:''
      }
    },
    
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.paginationData.currentPage=val
    },
  },
  computed:{
    searchData(){ //搜索且分页
      if (this.search) { //如有搜索内容
          console.log("input输入的搜索内容：" + this.search)
          const s= this.tableData.filter(data=>data.goodsName.includes(this.search.toLowerCase()))
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
.goods{
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
