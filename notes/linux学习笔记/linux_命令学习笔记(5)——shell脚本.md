# linux 命令学习笔记(5)—— shell脚本

## bash shell

### 命令列表

;

&&

||

### 命令别名

alias h=head

unalias 取消已定义的别名


### 命令替换

1. 大括号替换

		在当前目录下建p1-p4目录	
	
		mkdir p{1,2,3,4}	
		
2. 变量替换

	$变量名

3. 算术替换

		price=2
		n=3
		$((price * n))
		
4. 命令替换

	$(子shell命令)
	
### 转义字符

\

### 输入 输出 管道

1. 标准输出重定向

	">" 将输出写入文件
	
		ls /boot/ > boot.txt		

	">>" 将输出追加到文件
	
		ls /boot/ >> boot.txt	

2. 标准输出重定向

	“<” 
	
3. 管道

	"|" 前一个命令的输出是后一个命令的输入
	
		ipconfig | grep 192
		
## 正则表达式 （略）

## 高级文本处理

### tr

转换或删除指定内容

	将小写转大写
	cat ctu.txt | tr '[a-z]' '[A-Z]'

### sort

### cut

显示指定内容

### split

拆分文件

## shell 脚本

### 变量

1. 局部变量
	
	字符串的引号不是必须的
	
		str=ctu
		
		str="ctu"
		
		echo $str
		
bash shell 自动设置的信息

? 最有一个命令的返回值

$ 当前shell的进程id

! 最新后台命令的进程id

_ 前一个命令最后的标记

PPID

UID

BASH_VERSION

HOSTNAME

OLDPWD 上一次的工作目录

PWD 当前的工作目录

RANDOM 0-32767之间的随机数

SECONDS shell启动以来的秒数		
		
2. 环境变量

子进程会继承环境变量

export将局部变量提升为环境变量

3. 显示已定义的变量

set 显示定义的变量

evn 显示定义的环境变量

4. 清除变量

		unset str
		
5. 向脚本传递参数

$1,$2...
	
### 条件测试

1. 字符串测试

	=
	
	!=
	
	-z 是否是空字符串
	
	-n 是否非空
		
		test $str1=str2
		
		[$str1=str2]
		
		echo $?
		
2. 数值测试

	-eq
	
	-nq
	
	-gt
	
	-lt
	
	-ge
	
	-le
	
3. 文件状态测试

 	-d is directory 
 
 	-e is exist
 
 	-f is file
 
 	-L is Link
 
 	-r is read
 
 	-w is write
 
 	-x is execute
 
 	-u 是否拥有SUID
 
 	-g 是否拥有SGID
 
 	-s 测试文件长度大于0
 
 4. 逻辑操作符
 
 ### 流程控制
 
 1. 判断结构
 
 	if then else
 	
		if 条件; then
			
			# 要执行的
		
		elif 条件; then
		
			# 执行
			
		else
		
			# 执行
			
		fi
	
    
    
    case 
    
    	case $n in
    	
    	1)
    	
    	echo "1"
    	
    	;;
    	
    	2)
    	
    	echo "2"
    	
    	;;
    	
    	esac
    	
2. 循环结构

	for
	
	until
	
	while
	
	for
	
	
		while 条件
		
		do 
		
			# run
			
		done
		
		
		util 条件
		
		do
		
			# run
			
		done
		
		
		for (( ; ; ))
		
		do
		
			# run
			
		done
		
		
		var in con1 con2 con3
		
		do
		
			# run
			
		done
		
### 函数

	function show
	{
		echo "123"
	}			
	
	show
	
	
### 举几个栗子

1. 将文件名改为小写
		
		#!/bin/sh
		
		# 第一个参数
		file="$1"
		if[ $# -eq 0 ] # $#是参数的个数
		then
			echo "$(basename $0) file"  # $0 base的文件名
			exit 1   # 出错定义, exit 0是正常		
		fi			
		
		if [! $file ]		 
		then 
			echo "$file is not a file"
			exit 2
		fi
		
		lowercase = $(echo $file | tr '[A-Z]' '[a-z]')	
		if [ -f $lowercase ]
		then 
			echo "error"
			exit 3
		fi 
		
		/bin/mv $file $lowercase
		
		
	
---

zhh 于 2014年8月30 上午 浦东图书馆			
		
	
	
	
	
	
	
	
	
	
	
	
	
	
	  
  
    					
			
			
		 
 	



		
 
	
	
	
			
	

	

	
	

















			

	
	
			