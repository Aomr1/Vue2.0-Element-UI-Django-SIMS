<template>
<div>
    <el-row class="home" :gutter="20" style="margin-left: 0px;margin-right: 0px;">
        <h2>欢迎来到学生管理系统</h2>
        <el-col :span="10" style="margin-top: 15px">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="imgsrc">
                    <div class="userinfo">
                        <p class="name">Admin</p> 
                        <p class="access">超级管理员</p>                                    
                    </div>
                </div>
                <div class="login-info">
                    <p>欢迎管理用户：<span>{{current_username}}</span></p>
                    <p>用户创建时间：<span>{{current_created_time}}</span></p>
                </div>
            </el-card>
            <el-card shadow="hover" style="margin-top: 20px;">
                <el-table :data="userlabel"
                height="250"
                border
                stripe
                style="width: 100%">
                    <el-table-column
                    v-for="(val,key) in tablelabel"
                    :key="key"
                    :prop="key"
                    :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="14" style="margin-top: 15px;">
            <el-card shadow="hover">
                <iframe style="margin-left: 60px;" scrolling="no" src="https://tianqiapi.com/api.php?style=tt&skin=pitaya" 
                frameborder="0" width="590" height="98" allowtransparency="true"></iframe>
            </el-card>
            <el-card shadow="hover" style="margin-top: 20px; height: 407px;">
                <el-collapse v-model="activeNames" accordion>
                    <el-collapse-item title="视频工具 video" name="1">
                        <p><a target="_blank" alt="视频剪切" href="https://www.67tool.com/video/edit/cut">
                            视频剪切
                        </a></p>
                        <p><a target="_blank" alt="视频裁剪" href="https://www.67tool.com/video/edit/cutting">
                            视频裁剪
                        </a></p>
                        <p><a target="_blank" alt="视频转换" href="https://www.67tool.com/video/convert?to=mp4&type=all">
                            视频转换
                        </a></p>
                        <p><a target="_blank" alt="视频压缩" href="https://www.67tool.com/video/compress">
                            视频压缩
                        </a></p>
                        <p><a target="_blank" alt="视频拼接" href="https://www.67tool.com/video/merge">
                            视频拼接
                        </a></p>
                        <p><a target="_blank" alt="视频调速" href="https://www.67tool.com/video/speed">
                            视频调速
                        </a></p>
                    </el-collapse-item>
                    <el-collapse-item title="音频工具 audio" name="2">
                        <p><a target="_blank" alt="音频剪切" href="https://www.67tool.com/audio/edit/cut">
                            音频剪切
                        </a></p>
                        <p><a target="_blank" alt="音频转换" href="https://www.67tool.com/audio/convert?to=mp3&type=all">
                            音频转换
                        </a></p>
                        <p><a target="_blank" alt="音频压缩" href="https://www.67tool.com/audio/compress">
                            音频压缩
                        </a></p>
                        <p><a target="_blank" alt="音频合并" href="https://www.67tool.com/audio/merge">
                            音频合并
                        </a></p
                        ><p><a target="_blank" alt="音频调速" href="https://www.67tool.com/audio/edit/speed">
                            音频调速
                        </a></p>
                    </el-collapse-item>
                    <el-collapse-item title="文档处理 pdf" name="3">
                        <p><a target="_blank" alt="PDF压缩" href="https://www.67tool.com/pdf/compress">
                            PDF压缩
                        </a></p>
                        <p><a target="_blank" alt="PDF合并" href="https://www.67tool.com/pdf/merge">
                            PDF合并
                        </a></p>
                        <p><a target="_blank" alt="PDF拆分" href="https://www.67tool.com/pdf/range">
                            PDF拆分
                        </a></p>
                        <p><a target="_blank" alt="PDF提取" href="https://www.67tool.com/pdf/extract">
                            PDF提取
                        </a></p>
                        <p><a target="_blank" alt="PDF删除" href="https://www.67tool.com/pdf/delItem">
                            PDF删除
                        </a></p>
                    </el-collapse-item>
                    <el-collapse-item title="图片工具 images" name="4">
                        <p><a target="_blank" alt="图片压缩" href="https://www.67tool.com/images/imgCompress">
                            图片压缩
                        </a></p>
                        <p><a target="_blank" alt="图片转换" href="https://www.67tool.com/images/imgConvert?to=png">
                            图片转换
                        </a></p>
                        <p><a target="_blank" alt="图片放大" href="https://www.67tool.com/images/enlarge">
                            图片放大
                        </a></p>
                        <p><a target="_blank" alt="图片编辑" href="https://www.67tool.com/images/edit">
                            图片编辑
                        </a></p>
                        <p><a target="_blank" alt="图片调色" href="https://www.67tool.com/images/tinting">
                            图片调色
                        </a></p>
                    </el-collapse-item>
                </el-collapse>
            </el-card>
        </el-col>
        <p style="text-align: right;line-height: 37px;">尊敬的用户，学生管理系统的日益完善离不开您的理解与支持！</p>
    </el-row>
</div>
</template>

<script>
export default {
    name:'Home',
    data() {
        return {
            imgsrc:require("../assets/avatar.jpg"),
            current_username:localStorage.getItem('current_username'),
            current_created_time:localStorage.getItem('current_created_time'),
            activeNames: ['1'],
            userlabel:[],
            tablelabel:{
                'username':'用户名',
                'created_time':'注册时间',
            },
            firstPlayFlag:true
        }
    },
    methods: {
        get_userlabel(){
            this.$axios.get('http://127.0.0.1:8000/sims_app/select_user/')
            .then(response=>{
                this.userlabel = response.data
            })
        },
    },
    mounted() {
        this.get_userlabel()
    }
}
</script>

<style >
    .user {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
    }

    .user img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin-right: 40px;
    }

    .home h2 {
        font-size: 30px;
        text-align: center;
        line-height: 48px;
    }

    .login-info p {
        line-height: 28px;
        font-size: 14px;
        color: #999999;
    }

    .login-info span {
        color: #666666;
        margin-left: 60px;
    }

    .userinfo .name {
        font-size: 32px;
        margin-bottom: 10px;
    }

    .userinfo .access {
        color: #999999;
    }

    .el-collapse a {
        text-decoration:none;
        color:#9999B2
    }

    .el-collapse a:hover{color:orange}
</style>