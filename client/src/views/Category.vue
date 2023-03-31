<template>
  <div class="category">
    <!-- 分类选择 -->
    <van-tree-select height="100vh" :main-active-index.sync="active" :items="typeName"
    @click-nav="handleActive">
      <template #content>
        <ul>
            <li v-for="(i,index) in likeData" :key="index">
                <van-card :price="i.goodsPrice+'.00'" :title="i.goodsName" :thumb="i.goodsImg"
                @click="$router.push({name:'GoodsDetail',query:{id:i.id}})"/>
            </li>            
        </ul>
      </template>
    </van-tree-select>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '../components/common/Tabbar.vue'
import TopSearch from '../components/common/TopSearch.vue'
export default {
  name:'Category',
  components: {
    Tabbar,TopSearch
  },
  data() {
    return {
      active: 0,
      typeName:[],
      likeData:'',
      text:'苹果'
      // items: [{ text: '分组 1' }, { text: '分组 2' }],
    }
  },
  methods: {
    handleActive(index){
        // console.log(this.typeName[index].text);
        let text = this.typeName[index].text
        console.log(text);
        this.getCate(text)
    },
    getTypeName(){
      this.$axios.get('/api/cart/typeName').then((result) => {
        // console.log(result);
        this.typeName=result.data.data
        // console.log(this.typeName);
      }).catch((err) => {
        console.log(err);
      });
    },
    getCate(text){
      this.$axios.post(`/api/cart/getCate`,{text}).then((result) => {
              // console.log(result);
              this.likeData=result.data.result
            }).catch((err) => {
              console.log(err);
            });
    },
  },
  created() {
    this.getTypeName()
    this.getCate(this.text)
  },
}
</script>

<style lang="less" scoped>
ul{
  margin-bottom: 1.3333rem;
}
</style>