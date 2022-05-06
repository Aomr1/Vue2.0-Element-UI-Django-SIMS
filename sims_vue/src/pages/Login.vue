<template>
    <div class='login-body'>
        <div class="login-box">
            <div id="root" style="margin-right:35px">
                <h1>用户登录</h1>
                <div class="login-input-box">
                    <el-form name="fileForm"  :model="ruleForm" 
                    status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                        <el-form-item label="用户名" prop="username" class="login-rewrite-label">
                            <el-input name="username" clearable v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password" class="login-rewrite-label">
                            <el-input type="password" clearable name="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码" show-password @keyup.enter.native="submitForm('ruleForm')"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button style="margin-left: 5px;" type="primary" @click="submitForm('ruleForm')" >登录</el-button>
                            <el-button style="margin-left: 85px;" @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="sign-up">
                    还没账户？<a style="margin-right: 40px;" @click="toReg">立即注册</a>
                    忘记密码？<a  @click="toChangepwd">修改密码</a>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name:'Login',
    data() {
        var checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            }
            setTimeout(() => {callback();}, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } 
            setTimeout(() => {callback();}, 1000);
        };
        return {
            ruleForm: {
                username:'',
                password: '',
            },
            rules: {
                username: [
                    { validator: checkUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
            }
        };
        },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.toBackstage()
            } else {
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        toChangepwd(){
            this.timer = setInterval(() => {
                this.$router.push({
                name: 'changepwd' 
                })
            },500)
        },
        toReg(){
            this.timer = setInterval(() => {
                this.$router.push({
                name: 'reg' 
                })
            },500)           
        },
        toBackstage(){
            this.$axios.post('http://127.0.0.1:8000/sims_app/check_login/',
                {
                    username:this.ruleForm.username,
                    password:this.ruleForm.password,
                })
            .then(response=>{
                if (response.data.code==200){
                    this.$message({
                    message: '登录成功！',
                    center: true,
                    type: 'success'
                    });
                    this.timer = setInterval(() => {
                        this.$router.push({
					    name: 'home',
                        })
                        localStorage.setItem('current_username',response.data.current_username)
                        localStorage.setItem('current_created_time',response.data.current_created_time)   
			        },1000)
                }
                else{
                    this.$message({
                    message:'您输入的用户名或密码有误，请重新尝试！',
                    center: true,
                    type: 'error'
                    });
                    this.ruleForm = {username:'',password:''}    
                }
            })
        },
    },
    beforeDestroy() {
        //清除定时器
        clearInterval(this.timer);
    },
    destroyed() {
        //清除定时器
        clearInterval(this.timer);
    },
}
</script>

<style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .login-body {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;   
        min-height: 100vh;
        background-image:url("../assets/background.jpg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        overflow: hidden;
        
    }

    .login-box h1 {
        text-align: center;
        margin-top: 50px;
        padding-top: 0px;
        margin-left: 50px;
    }

    .login-box {
        display: flex;
        justify-content: center;
        align-content: space-around;
        flex-wrap: wrap;
        width: 750px;
        height: 450px;
        background-color: rgba(0,0,0,.5);    
        border-radius: 20px;
        color: #fff;
    }

    .login-input-box {
        width: 380px;
        height: 210px;
        color: #fff;
        margin-top: 40px;
    }

    .login-rewrite-label .el-form-item__label {
        color: #fff;  
        font-size: 16px;
        margin-bottom: 7px;
    } 
    .el-input__inner {
        background-color: #ffffff00;
        color: #fff; 
    }

    .sign-up{
        margin-left: 52px;
        margin-bottom: 50px;
    }

    a {
    color: #3498db;
    text-decoration: none;
    cursor: pointer;
    }

    a:hover{color:orange}
</style>