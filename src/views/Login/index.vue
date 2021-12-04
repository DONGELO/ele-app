<template>
  <div class="login">
        <div class="logo">
            <img src="@/assets/logo.png" alt="">
        </div>
        <!-- 手机号 -->
        <van-field
            v-model="ruleFrom.phone"
            center
            clearable
            prop="getCodeValue"
            placeholder="请输入手机号"
            @btnClick="getVerifyCode"
        >
            <template #button>
                <van-button size="small" type="primary" @click="sendCode()">发送验证码</van-button>
            </template>
        </van-field>
        <div v-if="error" class="invalid_feedback">请填写正确的手机号</div>
        <!-- 验证码 -->
        <div style="margin-top:15px">
            <van-form>
                <van-field
                    clearable
                    v-model.number="ruleFrom.getCodeValue"
                    name="asyncValidator"
                    placeholder="请输入验证码"
                    prop="phone"
                />
                <div class="login_des">
                    <p>
                        新用户登录既自动注册，表示已同意
                        <span>《用户协议服务》</span>
                    </p>
                </div>
                <!-- 提交 -->
                <div>
                    <van-button round block type="info" native-type="submit" @click="submitForm()">登录</van-button>
                </div>
            </van-form>
        </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api';
import { validator, asyncValidator } from '@/untils/validata';
export default {
    name: 'Login',
    setup ( props, { root, refs }) {
        const error = ref(false)
        /* reactive */
        const ruleFrom = reactive({
            phone: '',
            getCodeValue: ''
        })

        let validator = (val) => {
            console.log()
        }
        let asyncValidator = (val) => {
            console.log()
        }

        const rules = reactive({
            phone: [
                { validator: validator, trigger: 'blur' }
            ],
            getCodeValue: [
                { validator: asyncValidator, trigger: 'blur' }
            ],
        })
        // 获取验证码
        const sendCode = (()=>{
            console.log(111111)
        })
        /* 手机号 */
        const getVerifyCode = () => {
            if(root.validataPhone() ){
                //发送网络请求
            }
        }
        /* 验证手机号 */
        const validataPhone = () => {
            /* if(!root.phone){
                root.errors = {
                    phone: '手机号码不能为空'
                }
                return false
            }else if (!/^1[345678]\d{9}$/.test(root.phone)) {
                root.errors = {
                    phone: '请填写正确的手机号'
                }
                return false
            }else {
                root.errors = {};
                return true
            } */
        }

         /* from表单登录 */
        const submitForm = (val) =>{
            if(root.phone === "19994648045" && root.getCodeValue === "2456"){
                console.log(3333333)
            }else{
                alert('手机号或验证码不正确')
            }
        }

        return {
            /* ref */
             error,
            /*reactive*/
            ruleFrom, rules,
            /* methods */
            getVerifyCode, validataPhone, sendCode, submitForm
        }
    }
}
</script>

<style lang="scss" scoped>
    .login{
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;
        background-color: #fff;
        text-align: center;
        .logo{
            text-align: center;
            img{
                width: 186px;
                height: 64px;
            }
        }
    }
    .invalid_feedback{
        color: red;
        text-align: left;
        padding-top: 5px;
    }
    .login_des{
        text-align: left;
        span{
            color: #4d90fe;
        }
    }
</style>