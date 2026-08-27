---
name: service-api-implementing
description: Use when implementing or modifying Java service-layer APIs with interface, API implementation, service, and DAO layers, especially when you need to keep API impl classes thin, move business logic into service classes, and enforce consistent layering across projects.
---

# Service API Layering

适用于采用 `API interface -> API impl -> service -> DAO` 分层的 Java 后端项目。

## 何时使用

- 新增或修改 API interface
- 新增或修改 API impl，例如 `*WebServiceImpl`、`*Controller`、`*Endpoint`
- 新增或修改 `service` 层类
- 需要判断逻辑应该放在 API 层、service 层、DAO 层的哪一层
- 发现 API impl 正在变胖，希望把逻辑下沉到 service 层

## 核心目标

- API 契约层稳定
- API impl 保持很薄
- 业务逻辑集中在 service 层
- DAO 只负责数据访问
- 事务边界清晰
- 跨项目也能复用同一套判断标准

## 注释规则

- 默认不要给新实现的方法添加任何注释
- 不要添加方法级 Javadoc
- 不要添加方法体内的行内注释，除非用户明确要求解释某段特殊逻辑
- 如果用户明确要求“不要写任何方法注释”，则把这条视为硬约束，优先于其他通用编码偏好
- 已有方法上的历史注释是否保留，遵循用户当前任务要求；若只是新增或修改实现，默认不额外补注释

## 核心分层规则

### 1. API interface 只定义契约

- interface 只保留路由、方法签名、请求类型、响应类型
- 不写实现细节
- 不写业务逻辑
- 不把底层存储或事务细节暴露到接口语义里

### 2. API impl 只做薄转发

- API impl 负责接收 request、path param、query param 或上下文对象
- API impl 调用对应 service
- API impl 返回 service 的结果

API impl 中禁止出现以下内容：

- 业务规则判断
- 多步业务编排
- 直接注入 DAO
- 直接操作数据库事务
- 复杂的 domain 对象构建
- 大段 response 组装逻辑

理想形态示例：

```java
@Override
public ListViewResponse list() {
    return viewService.list();
}
```

### 3. 业务逻辑必须沉到 service 层

- 业务逻辑放在 `service` 层类中
- service 类优先按领域命名，而不是按 HTTP 动作命名
- API impl 到 service 的映射，优先保持“接口适配器 -> 领域服务”的关系

例如：

- `BOViewWebServiceImpl -> ViewService`
- `ProjectController -> ProjectService`
- `OrderEndpoint -> OrderService`

通常应放到 service 层的内容：

- 参数语义校验
- 默认值处理
- 查询/写入流程编排
- 多个 DAO 的协同
- 事务边界控制
- domain 对象构建
- response 组装
- 幂等、去重、状态流转

### 4. DAO 只负责数据访问

- DAO 只负责查询、插入、更新、删除
- DAO 不承载业务规则
- DAO 不感知 API 层语义
- DAO 的调用顺序和组合方式由 service 决定

### 5. 事务放在 service 层

- 多个写操作需要一致性时，在 service 层定义事务边界
- 不在 API impl 中开启或提交事务
- 不让事务控制分散在多个不透明 helper 中

### 6. 审计字段与调用语义要显式

对于后台写接口、管理接口或代他人执行操作的接口，优先评估 request 是否应显式包含：

- `operator`
- `requestedBy`
- `userId`
- `tenantId`
- 其他归属或审计字段

不要把这些关键语义偷偷藏在 API impl 的临时拼装代码里；应在契约或 service 逻辑里明确呈现。

### 7. 上层适配层不要复制核心业务

如果项目里还有 AJAX 层、site 层、controller 层、BFF 层或 facade 层：

- 上层适配类只负责协议转换、当前用户获取、请求映射、结果映射
- 不要在多个入口层各写一遍核心业务逻辑
- 核心业务规则应集中在真正的 service 层

## 实现步骤

实现一个新的 service API 时，按下面顺序检查：

1. 先确认接口契约
2. 在 API impl 中只保留一层委托
3. 在对应 service 中实现业务逻辑
4. 如果 service 不存在，则创建领域 service，而不是继续把逻辑堆在 API impl
5. 如果需要数据访问能力，再补 DAO
6. 如果需要多表或多资源一致性，再在 service 层补事务
7. 如果项目有上层适配模块，再检查它们是否只做转发和映射

## 命名建议

- API interface 使用项目既有命名
- API impl 保持与 interface 一一对应
- service 使用领域名，如 `ViewService`、`ProjectService`、`OrderService`
- 避免为了单个接口动作创建大量动作型 service，例如 `ListViewService`、`CreateViewService`，除非项目本身就采用 command/query 分离风格

## 判断规则

当你拿不准一段代码应该放哪一层时，用下面的判断：

- 如果这段代码是在“解释 HTTP / RPC / 协议入参”，放 API impl
- 如果这段代码是在“执行业务决策或流程编排”，放 service
- 如果这段代码是在“读写数据库或外部存储”，放 DAO 或 gateway
- 如果这段代码是在“保证多个写操作一致性”，放 service 的事务边界中

## 反例信号

如果出现下面任一情况，通常说明分层开始失真：

- `*WebServiceImpl` 或 `*Controller` 里直接注入多个 DAO
- API impl 方法越来越长，开始出现 if/else 业务分支
- response 组装逻辑主要堆在 API impl
- 为了绕开 service，新增很多 helper 直接被 API impl 调用
- 相同业务规则在 controller、AJAX、site、service 中重复出现

## 完成前自检

- API impl 是否只有薄转发？
- 业务逻辑是否集中在 service 层？
- DAO 是否只负责数据访问？
- 事务是否只在 service 层管理？
- 审计字段和调用语义是否显式？
- 是否避免了多入口层重复同一份核心业务逻辑？
- 是否避免为方法新增不必要的注释？

如果以上任一答案是否定的，先修正分层，再继续实现。
