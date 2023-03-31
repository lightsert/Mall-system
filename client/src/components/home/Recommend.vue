<template>
    <div class="recommend">
        <Title>
            <!-- 插槽，默认爆款推荐,修改用<h1>内容</h1> -->
        </Title>
        <ul>
            <li
                v-for="(item, index) in recommendData"
                :key="index"
                @click="
                    $router.push({
                        name: 'GoodsDetail',
                        query: { id: item.id },
                    })
                "
            >
                <h2>
                    <img :src="item.goodsImg" alt="无图片" />
                </h2>
                <div>
                    <h3>{{ item.goodsName }}</h3>
                    <span class="price">￥</span>
                    <b class="price">{{ item.goodsPrice }}</b>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Title from "../home/Title.vue";
export default {
    name: "Recommend",
    components: { Title },
    props: { recommendData: Array },
};
</script>

<style lang="less" scoped>
.recommend {
    padding: 0.2667rem;

    ul {
        li {
            margin-top: 10px;
            h2 {
                position: relative;
                display: block;
                width: 100%;
                height: 120px;
                img {
                    position: absolute;
                    border-radius: 13px;
                    // width: 100%;
                    height: 100%;
                }
            }
            position: relative;
            div {
                position: absolute;
                right: 0;
                top: 40%;
                transform: translateY(-50%);
                text-align: right;
                line-height: 1em;
                padding: 15px;
                h3 {
                    font-size: 0.3467rem;
                    color: #666666;
                    margin-bottom: 0.2667rem;
                    // white-space: nowrap;
                    // overflow: hidden;
                    // text-overflow: ellipsis;
                }
                p {
                    font-size: 0.4rem;
                    color: #333;
                }
            }
            .price {
                // margin-top: 10px;
                color: #b0352f;
                font-size: 0.5867rem;
            }
        }
    }
}
</style>