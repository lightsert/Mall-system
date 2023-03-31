<template>
    <!-- 头部搜索框 -->
    <div class="top">
        <b class="back">
            <van-icon
                name="arrow-left"
                color="white"
                size="26px"
                @click="goback"
            />
        </b>
        <van-search
            v-model="searchData"
            show-action
            placeholder="请输入搜索关键词"
            shape="round"
            background="#b0352f"
            @search="onSearch(searchData)"
            autofocus
        >
            <template #action>
                <div
                    @click="onSearch(searchData)"
                    style="color: white; font-size: 16px"
                >
                    搜索
                </div>
            </template>
        </van-search>
    </div>
</template>

<script>
export default {
    name: "TopSearch",
    data() {
        return {
            searchData: "" || this.$route.query.key,
        };
    },
    methods: {
        onSearch(searchData) {
            if (searchData == "") return;
            if (!localStorage.getItem("history")) {
                // 如果没有
                localStorage.setItem("history", "[]");
            } else {
                // 如有
                this.historyArr = JSON.parse(localStorage.getItem("history"));
            }
            // 增加数据
            this.historyArr.unshift(searchData);
            // 去重
            let newArr = new Set(this.historyArr);
            // 存入本地
            localStorage.setItem("history", JSON.stringify(Array.from(newArr)));
            // 如果重复查询，不响应
            if (this.searchData === this.$route.query.key) return;
            // 跳转
            this.$router.push({
                name: "searchList",
                query: {
                    key: this.searchData,
                },
            });
        },
        goback() {
            this.$router.push("/home");
        },
    },
    created() {
        if (!localStorage.getItem("history")) {
            // 如果没有
            localStorage.setItem("history", "[]");
        }
    },
};
</script>

<style lang="less" scoped>
.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.1733rem;
    background: #b0352f;
}
.back {
    width: 10%;
    margin-left: 15px;
}
.van-search {
    flex: 1;
    width: 7.8933rem;
    height: 1.1733rem;
}
.van-field__control {
    font-size: 0.4267rem;
}
.van-search__content {
    background: #fff;
    height: 0.8rem;
}
.van-search__action:active {
    background: #b0352f;
}
</style>