<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登录表单 -->
    <van-form
    ref="login-form"
    :show-error="false"
    :show-error-message="false"
    validate-first
    @submit="onLoginin"
    @failed="onFailed"
    >
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          icon-prefix="iconfont"
          left-icon="icon-shouji"
          placeholder="请输入手机号"
          name="mobile"
          :rules="fromRules.mobile"
        />
        <van-field
          v-model="user.code"
          clearable
          icon-prefix="iconfont"
          left-icon="icon-yanzhengma"
          placeholder="请输入验证码"
          name="code"
          :rules="fromRules.code"
        >
          <template #button>
            <van-count-down v-if="isCountDownShow" @finish="isCountDownShow = false" :time="1000 * 60" format="ss s"/>
            <van-button
            v-else
              class="send-btn"
              size="small"
              round
              @click.prevent="onSendSms">
              获取验证码
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button
        class="login-btn"
        type="info"
        block
        >登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      // 校验
      fromRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入合法手机号' }],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }]
      },
      isCountDownShow: false // 是否显示倒计时
    }
  },
  methods: {
    async onLoginin () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(this.user)
        this.$toast.success('登录成功')
        console.log(res)
      } catch (error) {
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    },
    onFailed (error) {
      if (error.errors[0].message) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        // 验证通过调用发送短信接口
        const res = await sendSms(this.user.mobile)
        // 接口调用后显示倒计时
        this.isCountDownShow = true
        console.log(res, '1')
      } catch (error) {
        let message = ''
        if (error && error.response && error.response.status === 429) {
          message = '发生太频繁了，请稍后重试'
        } else if (error.name === 'mobile') {
          message = error.message
        } else {
          message = '发送失败，请稍后重试'
        }
        this.$toast({
          message: message,
          position: 'top'
        })
      }
    }
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
