<template>
	<el-header style="padding-left: 0px;padding-right: 0px;">	
		<div class="l-content">
			<i class="el-icon-location"></i>
			<h4>当前定位：福建厦门</h4>
		</div>
		<div class="r-content">
			<el-link icon="el-icon-right" :underline="false" onclick="javascript:history.go(-1);">前进</el-link>
			<el-link icon="el-icon-back" :underline="false" onclick="javascript:history.go(1);">后退</el-link>
			<el-link icon="el-icon-s-home" :underline="false" @click="ReturnIndex">返回首页</el-link>
			<el-link icon="el-icon-user-solid" :underline="false" @click="ReturnChangepwd">修改密码</el-link>
			<el-link icon="el-icon-s-promotion" :underline="false" @click="ReturnLogin">退出登录</el-link>
			<el-dropdown trigger="click" size="medium">
				<span style="margin-left: 20px;">
					<el-avatar :src="imgsrc"></el-avatar>
				</span>
			</el-dropdown>
		</div>
	</el-header>
</template>

<script>
	export default {
		name:'Header',
		data() {
			return {
				imgsrc:require("../assets/avatar.jpg")
			}
		},
		methods: {
			ReturnIndex() {
                this.$router.push({
					name: 'home' 
                })
            },
			ReturnChangepwd(){
				this.$confirm('此操作将注销当前账号,前往修改密码页面, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        })
                        .then(() => {
                        this.$message({
                            type: 'success',
                            center: true,
                            message: '注销成功!'
                        	});
							this.timer = setInterval(() => {
								localStorage.clear()
                				this.$router.push({
                    			name:'changepwd'
                				})	
							},1000);
                        })
                        .catch(() => {
                        this.$message({
                            type: 'info',
                            center: true,
                            message: '已取消注销!'
                        });          
                	});		
			},
			ReturnLogin(){
				this.$confirm('此操作将注销当前账号, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        })
                        .then(() => {
                        this.$message({
                            type: 'success',
                            center: true,
                            message: '注销成功!'
                        	});
							this.timer = setInterval(() => {
								localStorage.clear()
                				this.$router.push({
                    			name:'login'
                				})	
							},1000);
                        })
                        .catch(() => {
                        this.$message({
                            type: 'info',
                            center: true,
                            message: '已取消注销!'
                        });          
                	});
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

<style scoped>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
	.el-header {
		background-color: #63646d;
		background-image: linear-gradient(43deg, #63646d 0%, #363436 46%, #32312f 100%);
		display: flex;
		height: 100%;
		justify-content: space-between;
		align-items: center;
		color:#fff;
	}
	.l-content {
		display: flex;
		align-items: center;
		margin-left: 10px;
	}

	.l-content i {
		margin-right: 10px;
	}

	.r-content {
		display: flex;
		align-items: center;
	}

	.r-content .el-link,i {
		color: #fff;
		font-size:16px;
		margin-left: 16.5px;
		font-weight: 700;
	}

	.el-avatar {
		width: 40px;
		height: 40px;
	}
	.el-dropdown{
		margin-right: 25px;
	}
</style>