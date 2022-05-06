<template>
    <el-menu class="el-menu-vertical-demo" background-color="#333744" text-color="#fff" 
    active-text-color="#ffd04b" :collapse="isCollapse" style="height: 100vh;">
        <h2>学生管理系统</h2>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path + ''" :key="item.path">
            <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </template>
        </el-menu-item>

        <el-submenu v-for="item in hasChildren" :index="item.path + ''" :key="item.path">
            <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group v-for="(subItem, subIndex) in item.children" :key="subItem.path">
                <el-menu-item @click="clickMenu(subItem)" :index="subIndex + ''">{{subItem.label}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>                
</template>

<script>
    export default {
        name:'Aside',
        data() {
            return {
                isCollapse: false,
                menu:[
                    {
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 'el-icon-s-home',
                    },
                    {
                    path: '/course',
                    name: 'course',
                    label: '课程管理',
                    icon: 'el-icon-menu',
                    },
                    {
                    path: '/student',
                    name: 'student',
                    label: '学生管理',
                    icon: 'el-icon-menu',
                    },
                    {
                    label: '数据统计',
                    icon: 'el-icon-s-marketing',
                    children: [
                        {
                        path: '/collegedist',
                        name: 'collegedist',
                        label: '院系分布情况',
                        // icon:'el-icon-star-on',
                        },
                        {
                        path: '/collegecount',
                        name: 'collegecount',
                        label: '专业人数统计',
                        // icon:'el-icon-star-on',
                        },
                    ]
                    },
                ]
            }
        },
        computed: {
            noChildren() {
                return this.menu.filter(item => !item.children)
            },
            hasChildren() {
                return this.menu.filter(item => item.children)
            },
        },
        methods: {
            clickMenu(item) {
                this.$router.push({
                    name:item.name
                })
            }
        },
        mounted() {
        
        }
    }
</script>

<style>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .el-menu {
        height: 100%;
        border: none;
    }
    .el-menu h2 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        margin-top: 8px;
    }
</style>