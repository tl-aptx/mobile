<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登录表单 -->
    <van-cell-group>
    <van-field
      v-model="user.mobile"
      icon-prefix="iconfont"
      left-icon="icon-shouji"
      placeholder="请输入手机号"
    />
    <van-field
      v-model="user.code"
      clearable
      icon-prefix="iconfont"
      left-icon="icon-yanzhengma"
      placeholder="请输入验证码"
    >
      <template #button>
        <van-button
          class="send-btn"
          size="small"
          round>
          获取验证码
        </van-button>
      </template>
    </van-field>
  </van-cell-group>
  <div class="login-btn-wrap">
    <van-button class="login-btn" type="info" block>登录</van-button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .send-btn {
    background-color: #ededed;
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
