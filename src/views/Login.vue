<template>
    <div class="Top">
        <van-icon name="revoke"  size="0.5rem" @click="this.$router.go(-1)"/>
    </div>
    <div class="login">
        <div class="loginTop">Welcome to NetMusic</div>
        <div class="loginContent">
            <div>
                <van-icon name="user-circle-o" size="0.5rem" color="#9ff"/>
                <input type="text" name="Phone" class="phone" placeholder="Phone number is required">
            </div>
            <div>
                <van-icon name="closed-eye" size="0.5rem" color="#9ff"/>
                <input type="password" name="password" class="password">
            </div>
            <button class="btn">Login</button>
        </div>
    </div>
</template>

<script>

export default {
    
}
</script>

<style lang="less" scoped>
.Top{
    margin-left: 0.2rem;
    margin-top: 0.3rem;
}
.login{
    width: 100%;
    height: 13rem;
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .loginTop{
        width: 100%;
        margin-top: 1rem;
        display: flex;
        justify-content: space-around;
        font-size: 0.7rem;
        align-items: center;
        color: #9ff;
    }
    .loginContent{
        width: 100%;
        height: 35%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        margin-top: 0.5rem;
        .phone,.password{
            width: 4rem;
            height: 0.5rem;
            border: 0.02rem;
            border-bottom: 0.02rem solid #ccc;
            
        }
        .btn{
            width: 3rem;
            line-height: 0.6rem;
            color: #ccc;
            padding: 0 0.2rem;
            border-radius: 0.4rem;
            background-color:#9ff;
            border: 1px solid #ccc;
            text-align: center;
        }
    }
}
    
</style>