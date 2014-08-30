# linux 命令学习笔记(4)——文件权限

## 文件权限类型

r : read

w : write

x : execute[英]['eksɪkju:t][美][ˈɛksɪˌkjut]

ls -l查看，有三组权限，分别是

所有者 

拥有组

其他用户


root用户新建目录的权限是 755，化作二进制对应于读写执行

111 101 101

root用户新建目录的权限是 644，化作二进制对应于读写执行

## 命令

#### chgrp

更改目录或文件的拥有组

#### chown 

更改目录或文件的所有者或拥有组

	将/h目录的所有者改为zhh
	chown zhh /h

	将/h目录的拥有组改为hh
	chown :hh /h
	
#### chmod 

更改目录或文件权限

	将/h目录的权限改为777
	chmod 777 /h
	
	将/h目录的拥有组权限减去读权限
	chmod g-r /h
	
u : user

g : group

o : other

a : all








