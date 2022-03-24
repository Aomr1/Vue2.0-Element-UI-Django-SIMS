# 基于Vue2.0、Element-UI、Django、MySQL实现的学生管理系统

**实现前后端分离，前端使用Vue2.0、Element-UI，后端使用Django，数据库选用MySQL**

**实现管理员登录、注册、修改密码，未登录不能进入主页面，采用路由守卫和localStorage**

**实现对学生数据的增删改查，对课程数据的增删改查**

**实现对学生院系分布情况和学生专业人数统计的统计图表**

**具体页面效果可查看pic文件夹**
[登录界面](https://github.com/Aomr1/Vue2.0-Element-UI-Django-MySQL/blob/main/pic/%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2.png)
[学生管理界面](https://github.com/Aomr1/Vue2.0-Element-UI-Django-MySQL/blob/main/pic/%E5%AD%A6%E7%94%9F%E7%AE%A1%E7%90%86%E7%95%8C%E9%9D%A2.png)
[课程管理界面](https://github.com/Aomr1/Vue2.0-Element-UI-Django-MySQL/blob/main/pic/%E8%AF%BE%E7%A8%8B%E7%AE%A1%E7%90%86%E7%95%8C%E9%9D%A2.png)

## 1. 创建Django项目、Vue项目和sims_app

#### Anaconda下

到项目创建的目录下，输入：

```shell
django-admin startproject sims_project

cd sims_project

python manage.py startapp sims_app

python manage.py makemigrations

python manage.py migrate

python manage.py runserver
```

#### Cmd下

到sims_project同级目录下，输入：

```shell
vue create sims_vue
```

选择vue2版本，一直默认即可

vscode中安装所需要的包：

```shell
npm install echarts@4.6.0

npm install vue-router@3.2.0

npm i element-ui

npm i vuex@3

npm install axios
```

#### 打包

原文链接：https://blog.csdn.net/weixin_53072519/article/details/122186102

在根目录 src 下创建文件 vue.config.js，需注意文件名称必须是 vue.config.js，然后在文件中插入以下代码：

```javascript
//打包配置文件
module.exports = {
  lintOnSave:false,
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  devServer: { //启动项目在8000端口自动打开
    open: true,
    host:'0.0.0.0',
    port: 8000,
    proxy: 'http://localhost:8000',
	},
};
```

将Vue路由及前端页面全部搭建完，**即写完所有Vue代码后**，输入打包命令：

```shell
npm run build
```

然后将打包后的dist文件移动至sims_project文件夹里

#### 项目结构

[项目结构](https://github.com/Aomr1/Vue2.0-Element-UI-Django-MySQL/blob/main/pic/%E6%80%BB%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84.png)


#### 启动项目

在Anaconda下输入python manage.py runserver，默认打开8000端口，复制链接到浏览器即可

## 2. 修改Django默认配置

```python
#1. 注释掉csrf验证

   'django.middleware.csrf.CsrfViewMiddleware',

#2. 在DIRS中添加templates模板，可在里面写入html

   'DIRS': [os.path.join(BASE_DIR,'templates')],

#3. 修改语言配置和时区

   	LANGUAGE_CODE = 'zh-Hans'

   	TIME_ZONE = 'Asia/Shanghai'

  	USE_I18N = True

	USE_L10N = True

	USE_TZ = False

#4. 加入静态文件static及指定存放位置

   	STATIC_URL = '/static/'

   	STATICFILES_DIRS = (os.path.join(BASE_DIR,'static'),)

#5. 在与manage.py同级的目录下创建templates和static文件夹

#6. 在INSTALLED_APPS下引入sims_app

#7. 配置mysql数据库

   	DATABASES = {

         'default': {

           'ENGINE': 'django.db.backends.mysql',  # 引擎，使用 mysql

           'NAME': 'sims_data',  # 数据库名称

           'USER': 'root',  # 数据库的登录用户名

           'PASSWORD': '412412412',  # 数据库的登录的密码

           'HOST': '127.0.0.1',  # 数据库所在的主机

           'PORT': 3306,  # 数据库使用的端口号

         	}
     	}

```

## 3. 解决Vue和Django跨域问题

```python
#8. vue和django跨域问题  原文链接：https://blog.csdn.net/qq_44614115/article/details/113578276
INSTALLED_APPS = [
    'corsheaders',
]


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]


CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    ['http://127.0.0.1:*']
)
CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
    'VIEW',
)

CORS_ALLOW_HEADERS = (
    'XMLHttpRequest',
    'X_FILENAME',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
    'Pragma',
)

#9. 修改setting.py  原文链接：http://t.zoukankan.com/lymmurrain-p-13894342.html
STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),# 项目默认会有的路径，如果你部署的不仅是前端打包的静态文件，项目目录static文件下还有其他文件，最好不要删
    os.path.join(BASE_DIR, "dist/static"),# 加上这条
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates'),
                 os.path.join(BASE_DIR,'dist')] # 加上这条，其余的是默认配置
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
#10. 修改vue里的vue.config.js，写入代理
 devServer: { //启动项目在8000端口自动打开
    open: true,
    host:'0.0.0.0',
    port: 8000,
    proxy: 'http://localhost:8000',
	},
```

## 4. 修改sims_project里的urls.py

```python
from django.contrib import admin
from django.urls import path
from django.urls import include
from django.views.generic import TemplateView 

urlpatterns = [
    path('', TemplateView.as_view(template_name="index.html")),  
    path('admin/', admin.site.urls),

    path('sims_app/',include('sims_app.urls'))
]
```

## 5. 修改sims_project里的setting.py

```python
"""
Django settings for sims_project project.

Generated by 'django-admin startproject' using Django 3.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-z2!yleni%xmrgse#tanw_x&paan8(ser+bjr&6%dapgj^za^h-'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'sims_app'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
]

ROOT_URLCONF = 'sims_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates'),
                 os.path.join(BASE_DIR,'dist')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'sims_project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {

        'default': {

        'ENGINE': 'django.db.backends.mysql',  # 引擎，使用 mysql

        'NAME': 'sims_data',  # 数据库名称

        'USER': 'root',  # 数据库的登录用户名

        'PASSWORD': '412412412',  # 数据库的登录的密码

        'HOST': '127.0.0.1',  # 数据库所在的主机

        'PORT': 3306,  # 数据库使用的端口号

        }
    }

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'zh-Hans'

TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),# 项目默认会有的路径，如果你部署的不仅是前端打包的静态文件，项目目录static文件下还有其他文件，最好不要删
    os.path.join(BASE_DIR, 'dist/static'),# 加上这条
]

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    ['http://127.0.0.1:8080']
)
CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
    'VIEW',
)

CORS_ALLOW_HEADERS = (
    'XMLHttpRequest',
    'X_FILENAME',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
    'Pragma',
)

```

   ## 6. 修改sims_app应用下的models.py

User为用户表，Course为课程表，Student为学生表

```python
from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField("用户名", max_length=30)
    password = models.CharField("密码", max_length=32)
    created_time = models.DateTimeField('创建时间', auto_now_add=True)
    updated_time = models.DateTimeField('更新时间', auto_now=True)
    class Meta:
        db_table = 'user_data'
    def __str__(self):
        return '{"username":"%s","created_time":"%s"}'%(str(self.username),
                            str(self.created_time).split('.')[0].replace('T',' '),)
    
class Course(models.Model):
    cour_id = models.CharField('课程ID', max_length=15, primary_key=True)
    cour_name = models.CharField('课程名', max_length=30)
    credit = models.CharField('学分', max_length=30)
    period= models.CharField('学时', max_length=30)
    class Meta():
        db_table = 'course_data'
    def __str__(self):
        return '{"cour_id":"%s","cour_name":"%s","credit":"%s","period":"%s"},'%(str(self.cour_id),
                                                    str(self.cour_name),
                                                    str(self.credit),
                                                    str(self.period))

class Student(models.Model):
    stu_id = models.CharField('学生ID', max_length=15, primary_key=True)
    stu_name = models.CharField('学生名', max_length=30)
    stu_sex = models.CharField('性别', max_length=20, default='男')
    stu_class = models.CharField('院系', max_length=20)
    stu_major = models.CharField('专业', max_length=30)
    class Meta():
        db_table = 'student_data'
    def __str__(self):
        return '{"stu_id":"%s","stu_name":"%s","stu_sex":"%s","stu_class":"%s","stu_major":"%s"},'%(str(self.stu_id),
                                                    str(self.stu_name),
                                                    str(self.stu_sex),
                                                    str(self.stu_class),
                                                    str(self.stu_major))
```

## 7. 修改sims_app应用下的urls.py

```python
from django.urls import path
from . import views


urlpatterns = [
    # path('',views.start_view),
    # path('login/',views.login_view),   
    # path('reg/',views.reg_view),
    # path('change_pwd/',views.change_pwd_view),
    path('check_login/',views.check_login),
    path('select_user/',views.select_user),
    path('insert_user/',views.insert_user),
    path('update_user/',views.update_user),
 
    path('update_stu/',views.update_stu),
    path('select_stu/',views.select_stu),
    path('delete_stu/',views.delete_stu),
    path('insert_stu/',views.insert_stu),
    
    path('update_cour/',views.update_cour),
    path('select_cour/',views.select_cour),
    path('delete_cour/',views.delete_cour),
    path('insert_cour/',views.insert_cour),  
    
    path('college_dist/',views.college_dist),

]
```

## 8. 修改sims_app应用下的views.py

接口说明：

check_login ：登录检验

select_user ： 查询所有注册管理员用户名和创建时间

insert_user ：  注册

update_user ：修改密码



update_stu ： 修改学生院系信息和专业信息

select_stu ： 查询所有学生信息

delete_stu ： 删除学生信息

insert_stu ： 插入学生信息



update_cour ： 修改课程学分和课程学时

select_cour ： 查询所有课程信息

delete_cour ： 删除课程信息

insert_cour ： 插入课程信息



college_dist ： 为获得echarts树图数据的对应匹配数据结构



```python
from django.http import JsonResponse
from .models import User,Student,Course
import json
from .get_dist_data import getresult_one,getresult_three

def check_login(request):
    print((request.body).decode())
    user_dict = json.loads((request.body).decode())
    username = user_dict['username']
    password = user_dict['password'] 
    user_list = User.objects.filter(username=username, password=password)
    if user_list:
        created_time = User.objects.get(username=username).created_time
        split_create_time = str(created_time).split('.')[0].replace('T',' ')
        return JsonResponse({'msg': '登录成功', 'code': 200, 'current_username':username, 'current_created_time':split_create_time}) 
    else:
        return JsonResponse({'msg': '登录失败', 'code': 404})
        
def update_user(request):
    print((request.body).decode())
    user_dict = json.loads((request.body).decode())
    username = user_dict['username']
    old_password = user_dict['old_password']
    password = user_dict['password']
    check_password = user_dict['check_password']
    user_list = [i for i in User.objects.exclude(username=username)]
    all_list = [i for i in User.objects.all()]
    try:
        old_password_judge = [i.password for i in User.objects.filter(username=username)]
        if user_list == all_list:
            return JsonResponse({'msg': '用户名未注册，修改失败', 'code': 405})
        elif old_password != old_password_judge[0]:
            return JsonResponse({'msg': '输入的旧密码错误，修改失败', 'code': 407})
        elif password != check_password:
            return JsonResponse({'msg': '两次输入的密码不一致，修改失败', 'code': 406})
        elif username and old_password and check_password and password and user_list:
            newobj = User.objects.get(username=username)
            newobj.password = password
            newobj.save()
            return JsonResponse({'msg': '修改成功', 'code': 200})
        else:
            return JsonResponse({'msg': '修改失败', 'code': 404})
    except Exception as e:
        print('Error:',e)
        return JsonResponse({'msg': '修改失败', 'code': 404})
    
def select_user(request):
    users = User.objects.all()
    user_data = [{'username': i.username, 'created_time': str(i.created_time).split('.')[0]} for i in users]
    return JsonResponse(user_data, safe=False, json_dumps_params={'ensure_ascii': False})    

def insert_user(request):
    print((request.body).decode())
    user_dict = json.loads((request.body).decode())
    username = user_dict['username']
    password = user_dict['password']
    check_password = user_dict['check_password']
    user_list = User.objects.filter(username=username)
    if user_list:
        return JsonResponse({'msg': '该用户已存在', 'code': 405})
    elif password != check_password:
        return JsonResponse({'msg': '两次输入的密码不同', 'code': 406})
    elif username and password and check_password:
        new_user = User.objects.create(username=username,password=password)
        new_user.save()
        return JsonResponse({'msg': '添加成功', 'code': 200})  
    else:
        return JsonResponse({'msg': '添加失败', 'code': 404})



def insert_stu(request):
    print((request.body).decode())
    stu_dict = json.loads((request.body).decode())
    new_stu_id = stu_dict['stu_id']
    new_stu_name= stu_dict['stu_name']
    new_stu_sex= stu_dict['stu_sex']
    new_stu_class = stu_dict['stu_class']
    new_stu_major = stu_dict['stu_major']
    stu_list = Student.objects.filter(stu_id=new_stu_id)
    if stu_list:
        return JsonResponse({'msg': '学生id已存在，添加失败，请重新尝试！', 'code': 405}) 
    elif new_stu_id and new_stu_name and new_stu_sex and new_stu_class and new_stu_major:
        new_student = Student.objects.create(stu_id=new_stu_id,stu_name=new_stu_name,
                                     stu_sex=new_stu_sex,stu_class=new_stu_class,
                                     stu_major=new_stu_major)
        new_student.save()
        return JsonResponse({'msg': '添加成功', 'code': 200})  
    else:
        return JsonResponse({'msg': '添加失败', 'code': 404})

def delete_stu(request):
    print((request.body).decode())
    stu_dict = json.loads((request.body).decode())
    stu_id = stu_dict['stu_id']
    if stu_id:
        delete_obj = Student.objects.filter(stu_id = stu_id)
        delete_obj.delete()
        return JsonResponse({'msg': '删除成功', 'code': 200})  
    else:
        return JsonResponse({'msg': '删除失败', 'code': 200}) 

def update_stu(request):
    print((request.body).decode())
    stu_dict = json.loads((request.body).decode())
    stu_id = stu_dict['stu_id']
    new_stu_class = stu_dict['stu_class']
    new_stu_major = stu_dict['stu_major']
    if stu_id and new_stu_class and new_stu_major:    
        update_obj = Student.objects.filter(stu_id = stu_id)
        update_obj.update(stu_class=new_stu_class)
        update_obj.update(stu_major=new_stu_major)
        return JsonResponse({'msg': '修改成功', 'code': 200})
    else:
        return JsonResponse({'msg': '修改失败', 'code': 404})

def select_stu(request):
    students = Student.objects.all()
    students_data = [{'stu_id': i.stu_id, 'stu_name': i.stu_name, 'stu_sex': i.stu_sex, 
                  'stu_class': i.stu_class, 'stu_major': i.stu_major} for i in students]
    return JsonResponse(students_data, safe=False, json_dumps_params={'ensure_ascii': False})
    



def insert_cour(request):
    print((request.body).decode())
    cour_dict = json.loads((request.body).decode())
    new_cour_id = cour_dict['cour_id']
    new_cour_name= cour_dict['cour_name']
    new_credit= cour_dict['credit']
    new_period = cour_dict['period']
    cour_list = Course.objects.filter(cour_id=new_cour_id)
    if cour_list:
        return JsonResponse({'msg': '课程id已存在，添加失败，请重新尝试！', 'code': 405})        
    elif new_cour_id and new_cour_name and new_credit and new_period:
        new_course = Course.objects.create(cour_id=new_cour_id,cour_name=new_cour_name,
                                     credit=new_credit,period=new_period)
        new_course.save()
        return JsonResponse({'msg': '添加成功', 'code': 200})  
    else:
        return JsonResponse({'msg': '添加失败，请重新尝试！', 'code': 404})
 
def delete_cour(request):
    print((request.body).decode())
    cour_dict = json.loads((request.body).decode())
    cour_id = cour_dict['cour_id']
    if cour_id:
        delete_obj = Course.objects.filter(cour_id = cour_id)
        delete_obj.delete()
        return JsonResponse({'msg': '删除成功', 'code': 200})  
    else:
        return JsonResponse({'msg': '删除失败', 'code': 404}) 

def update_cour(request):
    print((request.body).decode())
    cour_dict = json.loads((request.body).decode())
    cour_id = cour_dict['cour_id']
    new_credit = cour_dict['credit']
    new_period = cour_dict['period']
    if new_credit and new_period:
        update_obj = Course.objects.filter(cour_id = cour_id)
        update_obj.update(credit=new_credit)
        update_obj.update(period=new_period)
        return JsonResponse({'msg': '修改成功', 'code': 200})
    else:
        return JsonResponse({'msg': '修改失败', 'code': 404}) 
    
def select_cour(request):
    courses = Course.objects.all()
    courses_data = [{'cour_id': i.cour_id, 'cour_name': i.cour_name, 'credit': i.credit, 
                  'period': i.period} for i in courses]
    return JsonResponse(courses_data, safe=False, json_dumps_params={'ensure_ascii': False})




def college_dist(request):
    students = Student.objects.all()
    students_data = [{'stu_id': i.stu_id, 'stu_name': i.stu_name, 'stu_sex': i.stu_sex, 
                  'stu_class': i.stu_class, 'stu_major': i.stu_major} for i in students]
    all_data = getresult_one(students_data)
    result_data = getresult_three(all_data)
    return JsonResponse(result_data, safe=False, json_dumps_params={'ensure_ascii': False})
```

## 9. vue前端页面结构

[vue前端项目结构](https://github.com/Aomr1/Vue2.0-Element-UI-Django-MySQL/blob/main/pic/vue%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84.png)

## 10. 参考来源

http://gl.timemeetyou.com/

https://element.eleme.cn/#/zh-CN/component/icon

https://www.bilibili.com/video/BV1QU4y1E7qo?p=1
