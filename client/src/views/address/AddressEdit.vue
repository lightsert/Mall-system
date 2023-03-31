<template>
    <div class="addressEdit">
        <LoginHeader><h2 v-text="viewStatus=='add'?'添加地址':'编辑地址'"></h2></LoginHeader>
        <van-address-edit :area-list="areaList" :show-delete='isShowDelete' 
        @save="onSave" @delete="onDelete"  show-set-default :address-info="addressInfo"/>
    </div>
</template>

<script>
import { Toast } from 'vant';
import LoginHeader from '../../components/common/LoginHeader.vue'
import { areaList } from '@vant/area-data';
export default {
    name:'AddressEdit',
    components:{
        LoginHeader
    },
    data() {
        return {
            isShowDelete:'', //是否显示删除按钮,显示了代表是编辑,否则是添加
            areaList, //地区选择列表数据
            viewStatus:'', //判断是添加还是编辑
            addressInfo:{} //地址信息
        };
    },
    methods: {
        onSave(content) {
            content.isDefault = content.isDefault==true? 1 : 0
            console.log(content);
            if(this.viewStatus=='add'){
                this.$axios.post('/api/buyer/addAddress',{addressInfo:content,token:localStorage.getItem('clientToken')}).then((result) => {
                    console.log(result);
                    Toast(result.data.msg);
                    if(result.data.success){
                        setTimeout(()=>{
                            this.$router.replace({name:'AddressList'})
                        },1000)
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }else{
                this.$axios.post('/api/buyer/editAddress',{addressInfo:content,token:localStorage.getItem('clientToken'),id:content.id}).then((result) => {
                // console.log(result);
                    Toast(result.data.msg);
                    if(result.data.success){
                        setTimeout(()=>{
                            this.$router.replace({name:'AddressList'})
                        },1000)
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        onDelete(content) {
            // console.log(content);
            this.$axios.post('/api/buyer/deleteAddress',{id:content.id}).then((result) => {
                Toast(result.data.msg);
                if(result.data.success){
                    setTimeout(()=>{
                        this.$router.replace({name:'AddressList'})
                    },1000)
                }
            }).catch((err) => {
                console.log(err);
            });
        },
    },
    mounted() {
        this.viewStatus = this.$route.params.key
        if(this.viewStatus=='edit'){
            this.isShowDelete=true
            this.$route.params.addressInfo.isDefault = this.$route.params.addressInfo.isDefault==0?false:true
            this.addressInfo=this.$route.params.addressInfo
        }
        else this.isShowDelete=false
    },
}
</script>

<style>

</style>