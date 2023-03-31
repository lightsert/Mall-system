<template>
    <div class="like">
        <!-- 猜你喜欢模块 -->
        <Title>
            <h1>猜你喜欢</h1>
        </Title>

        <ul>
            <li
                v-for="(i, index) in likeData[0]"
                :key="index"
                @click="
                    $router.push({
                        name: 'GoodsDetail',
                        query: { id: i.id },
                    })
                "
            >
                <img v-lazy="i.goodsImg" alt="image" />
                <span class="name">{{ i.goodsName }}</span>
                <div class="price">
                    <span>￥</span>
                    <b>{{ i.goodsPrice }}</b>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Title from "../home/Title.vue";
export default {
    name: "Like",
    components: { Title },
    props: {
        likeData: Array,
    },
};
</script>

<style lang="less" scoped>
.like {
    // width: 100%;
    padding: 0.1333rem;
    margin-bottom: 50px;
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 50%;
            text-align: left;
            margin-bottom: 0.48rem;
            img {
                width: 4.6667rem;
                height: 4.6667rem;
            }
            .name {
                display: block;
                width: 100%;
                margin: 5px 0 8px 10px;
                // 文字超出省略号代替
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 0.48rem;
                color: #222;
            }
            .price {
                width: 100%;
                color: #b0352f;
                font-size: 0.5067rem;
            }
        }
    }
}
</style>