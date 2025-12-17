前言：

打包数据命令：

`mysqldump -u root -p --databases dbName >D:\dbname2.sql`

还原数据命令：

`mysql -u root -p <D:\dbname2.sql`

正文：

聚合函数：

```sql
，，
```

SQL 子句的标准顺序：

```sql
SELECT ...FROM ...WHERE ...
GROUP BY ...
HAVING ...        -- 组级过滤（分组后过滤）
ORDER BY ...      -- 排序
LIMIT ...
```

2.1 单表、汇总、分组

```sql
SELECT sNo,sName,sSex,sBirth FROM student WHERE mNo='24173';

SELECT sNo FROM student WHERE sName LIKE '陈__' OR sName LIKE '陈_';

SELECT sNo FROM student WHERE sName NOT LIKE '陈%';

SELECT sNo FROM student WHERE (mNO='24173') AND (sBirth <= '2025/12/17');

SELECT sNo,sName,(YEAR(CURDATE())-YEAR(sBirth)) AS '年龄' FROM student;

SELECT * FROM sc WHERE score BETWEEN 80 AND 85;

SELECT DISTINCT sNo FROM sc WHERE score<60 GROUP BY sNo;
SELECT DISTINCT LEFT(sName, 1) FROM student; 
# distinct 去除重复值。
# left(字符串, 取前几个字符) 
# substring(字符串, 起始位置1, 长度)

SELECT sName, subject, SUM(score) FROM sc GROUP BY sName, subject;
SELECT sName, GROUP_CONCAT(subject), SUM(score) FROM sc GROUP BY sName;
# 错误：SELECT sName, subject, SUM(score) FROM sc GROUP BY sName;
# 使用 GROUP BY 时，SELECT 中的每个非聚合列都必须出现在 GROUP BY 子句中。

SELECT sNo,ROUND(sweight, 1) FROM stuinfo WHERE ssex = '女' AND ROUND(sweight, 1) <= 80;

SELECT  sSex,COUNT(*) FROM  student GROUP BY ssex ORDER BY COUNT(*) DESC;
# DES Descending 降序，从低到高
# ASC Ascending，升序，从高到低，默认值

SELECT COUNT(cpNo 通常表示先修课程编号 prerequisite course number) FROM course;
# COUNT(*)：数行数，包括 NULL 行
# COUNT(列名)：数该列非 NULL 值的数量

SELECT AVG(score), MAX(score), MIN(score) FROM sc WHERE sNo = '714';

SELECT MAX(sheight) FROM studetail T1, stuclass T2 WHERE T1.sno = T2.sno AND T2.mno = '24173';

SELECT courseNo, COUNT(*),AVG(score) FROM sc WHERE sNo LIKE '24173%' 
GROUP BY courseNo HAVING COUNT(*)>10;
# 24173班超过10人选了这门课程的课程编号、课程人数、课程平均分。

SELECT sName FROM sc WHERE tcno='2413010302' ORDER  BY score DESC LIMIT 0,3;
# LIMIT 0,3 表示从第0条开始取前3条，等价于 LIMIT 3

SELECT student.sname FROM student 
JOIN sc ON student.sno = sc.sno
GROUP BY student.sno
HAVING AVG(sc.score) > 80 AND COUNT(*) >= 2;
注：这里是按学号进行了分组，所以这里的COUNT(*) >= 2是分组后该学生的选课门数的统计。
```

这句 `SELECT student.sname FROM student JOIN sc ON student.sno = sc.sno `的其他写法：



1. 逗号分隔两个表（老式写法）

```sql
SELECT student.sname FROM student,sc WHERE student.sno = sc.sno;
```

2. 写成 `INNER JOIN` 更明确。

3. WHERE EXISTS（ 相关子查询 ）

```sql
SELECT sname FROM student 
WHERE EXISTS (SELECT 1 FROM sc WHERE sc.sno = student.sno);
```

4. WHERE IN（子查询）

```sql
SELECT sname 
FROM student 
WHERE sno IN (
    SELECT sno 
    FROM sc
);
```



如果 `sc` 表中 `sno` 有重复，建议加上 `DISTINCT`：

sql

```
SELECT sname 
FROM student 
WHERE sno IN (
    SELECT DISTINCT sno 
    FROM sc
);
```



------

## **5. 使用 NATURAL JOIN（自然连接）**

sql

```
SELECT student.sname 
FROM student 
NATURAL JOIN sc;
```



前提：两个表必须有同名的连接列（这里是 `sno`）。

------

## **6. 使用 USING 子句（简化 ON）**

sql

```
SELECT student.sname 
FROM student 
JOIN sc USING(sno);
```



当连接列名称相同时，比 `ON` 更简洁。

