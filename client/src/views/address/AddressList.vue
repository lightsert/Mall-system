<template>
    <div class="addressList">
        <LoginHeader><h2>我的地址</h2></LoginHeader>
        <van-address-list
            v-model="list.id"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
        />
    </div>
</template>

<script>
import LoginHeader from "../../components/common/LoginHeader.vue";
import { mapState } from "vuex";
export default {
    name: "AddressList",
    components: { LoginHeader },
    data() {
        return {
            chosenAddressId: "1",
            selected: "", //
        };
    },
    computed: {
        ...mapState({
            list: (state) => state.address.addressList,
        }),
    },
    methods: {
        onAdd() {
            this.$router.push({ name: "AddressEdit", params: { key: "add" } });
        },
        onEdit(item, index) {
            console.log(item, index);
            this.$router.replace({
                name: "AddressEdit",
                params: { key: "edit", addressInfo: item },
            });
        },
        onSelect(item, index) {
            if (this.selected) {
                //是否是订单页进来选择地址的
                console.log(item);
                this.$bus.$emit("addressSelected", item);
                // this.$store.commit("selectedAddress", item);
                this.$router.back();
            }
        },
        getData() {
            this.$axios
                .post("/api/buyer/getAddress", {
                    token: localStorage.getItem("clientToken"),
                })
                .then((result) => {
                    console.log(result);
                    this.$store.commit("setAddressList", result.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    created() {
        this.getData();
        if (this.$route.query.type == "selected") {
            this.selected = true;
        }
    },
};
</script>

<style lang="less" scoped>
.addressList {
    .van-address-list {
    }
}
</style>