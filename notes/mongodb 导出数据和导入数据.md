

# mongodb 导出数据和导入数据

=============

## mongoexport
### 参数说明：
-h:指明数据库宿主机的IP

-u:指明数据库的用户名

-p:指明数据库的密码

-d:指明数据库的名字

-c:指明collection的名字

-f:指明要导出那些列

-o:指明到要导出的文件名

-q:指明导出数据的过滤条件

### 举个栗子

mongoexport -d test -c students -o students.dat  

mongoexport -d test -c students --csv -f classid,name,age -o students_csv.dat 

-csv：指明要导出为csv格式

-f：指明需要导出classid、name、age这3列的数据

## mongoimport

### 参数说明

-h:指明数据库宿主机的IP

-u:指明数据库的用户名

-p:指明数据库的密码

-d:指明数据库的名字

-c:指明collection的名字

-f:指明要导入那些列

### 举个栗子

mongoimport -d test -c students students.dat  

mongoimport -d test -c students --type csv --headerline --file students_csv.dat 

-type:指明要导入的文件格式

-headerline:指明第一行是列名，不需要导入

-file：指明要导入的文件

-------------

zhh 2014.8.26