<template>
<div class="main-box">
	<el-container style="height:100%">
		
	<el-aside width="auto">
		<Aside></Aside>
	</el-aside>

	<el-container>
		<el-header>
			<Header></Header>
		</el-header>

		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>

	</el-container>
</div>
</template>

<script>
	import Aside from '../components/Aside'
	import Header from '../components/Header'
	export default {
		name:'Home',
		components:{
			Aside,
			Header
		},
		data() {
			return {}
		}
	}
</script>

<style scoped>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
	.el-main {
		padding-top: 0;
		/* background: url("../picture/bg.png") repeat; */
		background-color:#d1cece
	}
	.main-box {
		width: 1536px;
		margin: 0 auto;
	}
	
</style>