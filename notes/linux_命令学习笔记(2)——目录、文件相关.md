# linux 命令学习笔记(2)——目录、文件相关

> zhh 于 2014年8月30 上午 浦东图书馆  (只包含常用命令)


## 常见的目录

/ 根

/root 系统管理员的目录

/bin 

/usr/bin

/sbin 只有root用户可使用

/usr/sbin 只有root用户可使用

/usr/local

/usr/share

/usr/src

/var 系统日志等

/lib 库文件

/boot

/proc 操作系统运行时，进程及内核信息

/etc 配置

/dev 

/home 

/tmp

## 目录命令

#### pwd

#### cd

#### ls

-l 显示目录下所有文件和目录的详细信息

#### mkdir

-p 

	连同父目录一起创建
	
	mkdir -p /test/testSon
	
#### tree

树状图显示目录，mac下无此命令

## 文件操作命令

### 文件操作

#### touch

改变指定文件或目录的访问时间，如果文件不存在会建立空文件

#### file

识别文件类型

#### cp

-r recursion [英][rɪˈkɜ:ʃn][美][rɪˈkɚʒən]

-f force

-i inquiry [ɪn'kwaɪərɪ]

#### rm

#### mv

移动或更名

#### ln

-d hard

-s soft

### 查找操作

#### locate

查找文件或目录

速度快，不是在硬盘，而是在数据库中

对于刚刚新增的，需要

	updatedb
	locate hi*.txt
	
#### which 

查找文件

只会在$PATH配置的路径中查找

#### whereis 

如果不指定目录，会在系统目录查找

#### find

查找文件或目录

比较慢

### 压缩与归档 （略）

#### gzip

#### tar

### 文本查看

#### cat

显示文件内容

-b 给每一行编号, cat -b hello

#### head 

显示文件的最前部分

-n 设置显示多少行

#### tail 

显示文件的末尾部分

tail -f hello 动态显示

tail -2 hello

#### more

#### less

比more更强大

#### grep 

查找并显示符合条件的

















