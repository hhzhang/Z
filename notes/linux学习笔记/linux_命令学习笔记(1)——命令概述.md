# linux 命令学习笔记(1)——命令概述

## 概述

#### 命令分类

- shell内部命令：系统本身的

- shell外部命令：应用程序的

shell外部命令在执行的时候，系统需要找到对应的可执行程序，$PATH用来配置系统自动搜索的路径，如果外部命令在$PATH包含的路径，可以直接输入程序名称运行，如果不在需要输入路径名称；

	查看PATH变量的内容：
	echo $PATH;

#### 命令辅助

1. Tab补全
2. history命令
	
	history查看命令的历史记录，history -c清楚历史记录

3. 快捷键 
	
	Crtl+L 清屏
	
	Crtl+C 停止
	

4. 强制换行

	\ 命令分多行输入
	
#### 获取帮助

1. man 命令名称
2. 命令名称 --help
3. info 命令名称

	
---

zhh 于 2014年8月30 上午 浦东图书馆








