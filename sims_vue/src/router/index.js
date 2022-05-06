// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

//创建并暴露一个路由器
const router =  new VueRouter({
	routes:[
		{
			path:'/',
			name:'Main',
			redirect:'/home',
			component:() => import('../pages/Main.vue'),
			children:[
				{
					path:'/home',
					name:'home',
					component:() => import('../pages/Home'),
				},
				{
					path:'/course',
					name:'course',
					component:() => import('../pages/Course'),
				},
				{
					path:'/student',
					name:'student',
					component:() => import('../pages/Student'),
				},
				{
					path:'/collegedist',
					name:'collegedist',
					component:() => import('../pages/CollegeDist'),
				},
				{
					path:'/collegecount',
					name:'collegecount',
					component:() => import('../pages/CollegeCount'),
				},
			]
		},
		{
			path:'/login',
			name:'login',
			component:() => import('../pages/Login.vue'),
		},
		{
			path:'/reg',
			name:'reg',
			component:() => import('../pages/Reg.vue'),
		},
		{
			path:'/changepwd',
			name:'changepwd',
			component:() => import('../pages/ChangePwd.vue'),
		}
	]
})

router.beforeEach((to,from,next)=>{
	if(!localStorage.getItem('current_username')){ //权限控制的具体规则
		if (to.path === '/login'){
			next()
		}
		else if(to.path === '/reg'){
			next()
		}
		else if (to.path === '/changepwd'){
			next()
		}
		else{
			router.push({
				name: 'login' 
			})
		}
	}
	else{
		next()
	}
})

export default router
