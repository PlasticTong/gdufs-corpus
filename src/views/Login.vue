<template>
  <div>
    <div class="login"></div>
    <div class="login-form">
      <el-form
        :model="user"
        ref="loginForm"
        label-width="50px"
        class="demo-ruleForm"
      >
        <div class="text-header">登录</div>
        <el-form-item label="账号" prop="mobile">
          <el-input
            type="text"
            v-model="user.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="user.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha" label-width="60px">
          <el-input
            type="captcha"
            v-model="user.captcha"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div class="fl">
          <img
            :src="captchaSrc.picPath"
            alt="Base64 encoded image"
            width="140"
            height="70"
          />
        </div>
        <el-form-item>
          <el-button type="success" size="mini" @click="submitForm()"
            >提交</el-button
          >
          <el-button @click="resetForm()" size="mini">重置</el-button>
        </el-form-item>
        <!-- <div class="tips">账号：admin 密码：123456</div> -->
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { accountServe } from "@/api/index";
import { defineComponent, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const loginForm = ref(null);
    const form = reactive({
      account: "",
      pass: "",
      captcha: "",
    });
    const captchaSrc = reactive({ captchaId: "", picPath: "" });
    const user = reactive({
      mobile: "",
      password: "",
      captcha: "",
      captcha_id: "",
      flag: "",
    });
    //获取验证码
    const getCaptcha = () => {
      axios.get(`${accountServe}/u/v1/base/captcha`).then((res) => {
        captchaSrc.captchaId = res.captchaId;
        captchaSrc.picPath = res.picPath;
        user.captcha_id = res.captchaId;
      });
    };
    getCaptcha();
    let submitForm = () => {
      axios({
        url: `${accountServe}/u/v1/user/pwd_login`,
        data: JSON.stringify(user),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.msg === "登录成功") {
          console.log(res);      
          localStorage.setItem("lan", "ind");
          localStorage.setItem("user", res.token);
          localStorage.setItem("name", res.nick_name);
          router.push("/");
          console.log(localStorage);
          // 将登录成功的标识（token）存储到localStorage中
          // localStorage.setItem("token", data.token);
        } else {
          console.log("登录失败");
          // this.$message.error(meta.msg)
          // this.$message({
          //   type: "error",
          //   //   message: meta.msg,
          //   duration: 1000,
          // });
        }
      });
    };
    // const submitForm = () => {
    //   login();
    //   console.log('这是'+flag);
    //   // if (flag == 1) {
    //   //   console.log("fuckyou");
    //   //   localStorage.setItem("user", JSON.stringify(form));
    //   //   // console.log(router);
    //   //   router.push("/");
    //   //   // console.log('nhssss');
    //   // } else {
    //   //   console.log("dam");
    //   // }
    // };
    const resetForm = () => {
      loginForm.value.resetFields();
      getCaptcha();
    };

    return {
      captchaSrc,
      user,
      form,
      submitForm,
      resetForm,
      loginForm,
    };
  },
});
</script>

<style scoped lang="less">
.text-header {
  text-align: center;
  font-size: 20px;
  color: #fff;
  margin-bottom: 50px;
}
.fl {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.login {
  width: 100vw;
  height: 100vh;
  // background-image: url("https://img.zcool.cn/community/011cc26067bf7c11013e87f41a7eb1.jpg@1280w_1l_2o_100sh.jpg");
  background-image: url("../assets/back2.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(5px);
}
.login-form {
  position: absolute;
  width: 400px;
  height: 400px;
  top: 200px;
  right: 300px;
  border-radius: 10px;
  box-shadow: 1px 1px 5px #333;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style lang="less">
.login-form {
  .el-form-item__label {
    color: #fff;
  }
}
</style>
