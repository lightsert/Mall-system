<template>
  <div class="order">
    <!-- 分页显示 -->
    <el-table
      :data="
        searchData.slice(
          (paginationData.currentPage - 1) * paginationData.pageSize,
          paginationData.currentPage * paginationData.pageSize
        )
      "
      style="width: 100%"
      height="92%"
    >
      <el-table-column label="ID" prop="orderId" width="150" align="center">
      </el-table-column>
      <el-table-column label="订单号" prop="orderNo" width="150" align="center">
      </el-table-column>
      <el-table-column
        label="订单名"
        prop="goodsName"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="订单价格"
        prop="goodsTotal"
        width="100"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="订单数量"
        prop="goodsNum"
        width="100"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="手机号"
        prop="userphone"
        width="120"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="订单状态"
        prop="orderStatus"
        width="150"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column align="center" class="gongneng">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" placeholder="输入订单号搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <div class="fenye">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="paginationData.currentPage"
            :page-size="paginationData.pageSize"
            layout="total, prev, pager, next"
            :total="paginationData.total"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      search: "",
      tableData: [],
      // 分页数据
      paginationData: {
        currentPage: 1, //当前所在页
        total: 0, //总数
        pageSize: 8, //一页显示多少条数据
      },
    };
  },
  created() {
    //每次重新加载都获取数据
    this.getOrder();
  },
  methods: {
    handleDelete(index, row) {
      console.log(row);
      // console.log(row.id);
      if (confirm("是否删除")) {
        this.$axios.post(`/api/order/deleteOrder`,{orderNo:row.orderNo}).then((res) => {
          console.log(res);
          this.$message({ message: "删除成功", type: "success" });
          this.getOrder();
        });
      }
    },
    getOrder() {
      this.$axios
        .get("/api/order/AllOrder")
        .then((result) => {
          console.log(result);

          this.tableData = result.data.data;
          this.tableData.map((item) => {
            console.log(item);
            if (item.orderStatus === 1) {
              item.orderStatus = "待支付";
            } else if (item.orderStatus === 3) {
              item.orderStatus = "已支付";
            } else if (item.orderStatus === 4) {
              item.orderStatus = "支付失败";
            }
          });
          this.paginationData.total = result.data.goodsInfo.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.paginationData.currentPage = val;
    },
  },
  computed: {
    searchData() {
      //搜索且分页
      if (this.search) {
        //如有搜索内容
        console.log("input输入的搜索内容：" + this.search);
        const s = this.tableData.filter((data) =>
          data.orderNo.includes(this.search.toLowerCase())
        );
        this.paginationData.total = s.length; //页数改变
        return s;
      }
      this.paginationData.total = this.tableData.length; //搜索内容清空改回原页数
      return this.tableData;
    },
  },
};
</script>

<style lang="less">
.order {
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
  .fenye {
    text-align: center;
    // margin: 0 auto;
  }
}
</style>
