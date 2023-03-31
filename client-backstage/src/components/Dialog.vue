<template>
<!-- 弹窗dialog 添加和编辑功能 -->
  <div class="dialog">
      <el-dialog :title="dialog.title" :visible.sync="dialog.isShow" :close-on-click-modal="false"  :modal-append-to-body='false'>
          <!-- 表单 -->
        <div class="form">
            <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
                <!-- prop属性需要跟验证规则一致 -->
                <el-form-item label="商品名称" prop="goodsName"> 
                     <el-input type="string" v-model="formData.goodsName"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="goodsPrice"> 
                     <el-input type="string" v-model="formData.goodsPrice"></el-input>
                </el-form-item>
                <el-form-item label="商品图片" prop="goodsImg"> 
                     <el-input type="string" v-model="formData.goodsImg" placeholder="图片为链接/相对路径格式"></el-input>
                </el-form-item>
                <el-form-item label="商品类型" prop="goodsType" v-if="dialog.option === 'add'"> 
                     <el-input type="string" v-model="formData.goodsType" placeholder="商品的类型(苹果/笔记本/饮料/家用品/水果)"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitAddGoods('form')">提交</el-button>
                    <el-button @click="dialog.isShow=false">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
    name:'Dialog',
    props:['dialog','formData'],
    data() {
        return {
            // formData:{
            //     goodsName:'',
            //     goodsPrice:'',
            //     goodsImg:''
            // },
            rules:{
                goodsName:[
                    { required: true, message: '商品名称不能为空',trigger: 'blur'}
                ],
                goodsPrice:[
                    { required:true, message: '商品价格不能为空',trigger: 'blur'}
                ],
                goodsType:[
                    { required:true, message: '商品类型不能为空',trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        submitAddGoods(form){
            this.$refs[form].validate(valid=>{
                if(valid){
                    const url = this.dialog.option == 'add'?'add':`edit/${this.formData.id}`
                    console.log(url);
                    this.$axios.post(`/api/goods/${url}`,{
                        goodsName:this.formData.goodsName,
                        goodsPrice:this.formData.goodsPrice,
                        goodsImg:this.formData.goodsImg,
                        goodsType:this.formData.goodsType
                    }).then((result) => {
                        // 因为elementUi 给全局添加了$message,可直接用
                        this.$message({message:'操作成功',type:'success'})
                        // 隐藏dialog
                        this.dialog.isShow=false
                        // 自动刷新 触发自定义事件，父级再获取一次商品信息
                        this.$emit('update')
                    })
                }else{
                    this.$message({message:'操作失败',type:'error'})
                    return false
                }
            })
        }
    },
}
</script>
