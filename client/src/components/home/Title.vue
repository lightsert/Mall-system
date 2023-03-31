<template>
<!-- 首页->推荐下的各标题 -->
    <div class="title">
        <slot>
            <h1>爆款推荐</h1>
        </slot>
    </div>
</template>

<script>
export default {
    name:'Title'
}
</script>

<style lang="less" scoped>
.title{
        width: 100%;
        text-align: center;
        font-size: .4267rem;
        padding: .2667rem 0;
        margin-bottom: .2667rem;
        h1{
            position: relative;
            display: inline-block;
            font-size: .5067rem;
            color: #333;
            font-weight: 400;
        }   
        h1:before,h1:after {
            content: "";
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: block;
            background: #d4c0a7;
            top: 50%;
            left: -30%;
            margin-top: -4px;
        }
        h1::after {
            left:115%;
        }   
    }
</style>