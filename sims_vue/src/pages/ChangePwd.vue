<template>
<div class="pwd-body">
    <div class="pwd-box">
        <div id="root" style="margin-right:35px">
            <h1>修改密码</h1>
            <div class="pwd-input-box">
                <el-form name="fileForm" :model="ruleForm" 
                status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                    <el-form-item label="用户名" prop="username" class="pwd-rewrite-label">
                        <el-input name="username" clearable v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="原密码" prop="old_password" class="pwd-rewrite-label">
                        <el-input type="password" clearable name="old_password" v-model="ruleForm.old_password" autocomplete="off" placeholder="请输入原密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="password" class="pwd-rewrite-label">
                        <el-input type="password" clearable name="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入新密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="check_password" class="pwd-rewrite-label">
                        <el-input type="password" clearable name="check_password" v-model="ruleForm.check_password" autocomplete="off" placeholder="请再次输入密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button style="margin-left: 30px;" @click="resetForm('ruleForm')">重置</el-button>
                        <el-button style="margin-left: 30px;" @click="toReturn">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        var checkOldpassword = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('原密码不能为空'));
            }
            setTimeout(() => {callback();}, 1000);
        };

        var checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            }
            setTimeout(() => {callback();}, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
            if (this.ruleForm.check_password !== '') {
                this.$refs.ruleForm.validateField('check_password');
            }
                callback();
            }
        };
         var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                username:'',
                old_password:'',
                password: '',
                check_password: '',
            },
            rules: {
                username: [
                    { validator: checkUsername, trigger: 'blur' }
                ],
                old_password: [
                    {validator: checkOldpassword, trigger: 'blur'}
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                check_password: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
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
        toBackstage(){
            this.$axios.post('http://127.0.0.1:8000/sims_app/update_user/',
                {
                    username:this.ruleForm.username,
                    old_password:this.ruleForm.old_password,
                    password:this.ruleForm.password,
                    check_password:this.ruleForm.check_password
                })
            .then(response=>{
                if (response.data.code==200){
                    this.$message({
                    message: '修改成功！',
                    center: true,
                    type: 'success'
                    });
                    this.timer = setInterval(() => {
                        this.$router.push({
					    name: 'login' 
                        })
			        },1000)
                }
                else if (response.data.code==405){
                    this.$message({
                    message:'用户名未注册，修改失败，请返回注册页面进行注册！',
                    center: true,
                    type: 'error'
                    });
                    this.timer = setInterval(() => {
                        this.$router.push({
					    name: 'reg' 
                        })
			        },1000)
                }
                else if (response.data.code==406){
                    this.$message({
                    message:'两次输入的密码不一致，修改失败，请重新尝试！',
                    center: true,
                    type: 'error'
                    });
                    this.ruleForm = {password:'',check_password:''}
                }
                else if (response.data.code==407){
                    this.$message({
                    message:'输入的原密码错误，修改失败，请重新尝试！',
                    center: true,
                    type: 'error'
                    });
                    this.ruleForm = {old_password:''}
                }
                else{
                    this.$message({
                    message:'存在字段未输入，请重新尝试！',
                    center: true,
                    type: 'error'
                    });
                }
            })
        },
        toReturn(){
            this.$router.push({
                name: 'login' 
            })
        }
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

    .pwd-body {
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

    .pwd-box h1 {
        text-align: center;
        padding-top: 0px;
        margin-left: 50px;
    }

    .pwd-box {
        display: flex;
        justify-content: center;
        align-content: space-around;
        flex-wrap: wrap;
        width: 750px;
        height: 480px;
        background-color: rgba(0,0,0,.5);    
        border-radius: 20px;
        color: #fff;
    }

    .pwd-input-box {
        width: 380px;
        height: 300px;
        color: #fff;
        margin-top: 40px;
    }

    .pwd-rewrite-label .el-form-item__label {
        color: #fff;  
        font-size: 16px;
    } 

    .el-input__inner {
        background-color: #ffffff00;
        color: #fff; 
    }
</style>