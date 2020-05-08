[toc]



# MySQL数据库管理系统相关

## 信息数据库：information_schema

### 一、定义

- 保存着关于MySQL服务器所维护的所有其他数据库的信息。
- 如数据库名，数据库的表，表栏的数据类型与访问权 限等。在INFORMATION_SCHEMA中，有数个只读表。
- 它们实际上是视图，而不是基本表，因此，你将无法看到与之相关的任何文件。

### 二、表

#### STATISTICS

- 定义：提供有关**表索引**的信息。
- 作用
- 包含列：https://dev.mysql.com/doc/refman/8.0/en/statistics-table.html
  - 

## 核心数据库：mysql

- 定义：
  - 主要负责存储数据库的用户、权限设置、关键字等mysql自己需要使用的控制和管理信息。
  - 不可删除

## 性能数据库：performance_schema





```mysql
CREATE TABLE IF NOT EXISTS `customers` (
  `id`           INT                         AUTO_INCREMENT,
  `status`       ENUM ('ACTIVE', 'INACTIVE') NOT NULL,
  `email`        VARCHAR(50)                 NOT NULL UNIQUE,
  `first_name`   VARCHAR(50)                 NOT NULL,
  `last_name`    VARCHAR(50)                 NOT NULL,
  `updated_time` DATETIME                    NOT NULL,
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB
CHARACTER SET = utf8;

SET @TABLE_NAME = 'customers';
SET @MOBILE = 'mobile';
SELECT COUNT(*) INTO @INDEX
FROM information_schema.`COLUMNS`
WHERE table_schema = DATABASE()
  AND column_name = @MOBILE
  AND table_name = @TABLE_NAME ;
SET @SQL = IF(@INDEX < 1, 'ALTER TABLE customers ADD COLUMN mobile VARCHAR(50) NULL AFTER email',  '');
PREPARE statement  FROM  @SQL;
EXECUTE statement ;
DEALLOCATE PREPARE statement ;

SET @EMAIL = 'email';
SELECT
	COUNT(*) INTO @INDEX
FROM
	information_schema.`STATISTICS`
WHERE
	table_schema = DATABASE ()
	AND table_name = @TABLE_NAME
	AND INDEX_NAME = @EMAIL;

SELECT @INDEX;
SET @SQL = IF( @INDEX > 0, 'ALTER TABLE customers DROP INDEX email', '' );
PREPARE statement FROM	@SQL;
EXECUTE statement ;
DEALLOCATE PREPARE statement ;


```

