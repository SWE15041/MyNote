---
name: controller-api-implementing
description: Implement or refactor a Core Framework Java Controller in hdr-project, especially when Codex needs to quickly determine where the Controller class should live, where the HTTP route and request bean should be registered, and where injected dependencies should be bound or configured in App or Module classes.
---

# Controller API Implementing

## Overview

Use this skill when adding or changing a `Controller` in `hdr-project`.
Its main job is to make the placement rules explicit: where to create `XXXController`, where to register `http().route(...)`, when to add `http().bean(...)`, and when missing dependencies belong in a `Module`, in `mongoCollections()`, or nowhere at all.

## Comment Rule

- By default, do not add comments to newly implemented controller methods.
- Do not add method-level Javadoc unless the user explicitly asks for it.
- Do not add inline comments inside methods unless the user explicitly asks for explanatory comments on a tricky block.

## Workflow

1. Find the nearest existing controller in the same domain and service.
2. Decide whether the controller belongs to:
   - the service app's `initControllers()` block, or
   - a feature `Module` that already owns a group of routes.
3. Place the controller class under the matching package, usually `...controller`.
4. Register the route with `http().route(HTTPMethod.X, "/path", bind(XXXController.class))`.
5. If the controller reads request body via `httpRequest.bean(...)`, also register that request bean with `http().bean(...)`.
6. Resolve each `@Inject` dependency by type:
   - normal service/publisher/helper bean -> `bind(...)` in the owning module
   - `MongoCollection<Entity>` -> ensure the entity is registered in app `mongoCollections()`
   - request bean -> `http().bean(...)`
   - controller itself -> usually no extra bind beyond `bind(XXXController.class)` inside the route registration
7. For Mongo queries in init/repair/backfill controllers, do not filter on fields that are not indexed. If the backfill must find missing values on an unindexed field, prefer scanning with an indexed/empty query and filtering in Java, or first add/confirm an index through the proper data-model process.
8. For post-release backfill/init controllers, register the route call in `backend/scheduler-service/src/main/java/app/scheduler/releaseexecutor/PostReleaseExecutorXX.java` for the current sprint, for example `call(context.kms, "/_app/init-training-session-parent-id", null);`.
9. Make controller API implementations idempotent by default. Repeated calls to the same endpoint with the same inputs must be safe and produce the same final state, especially for init/repair/backfill/post-release controllers.
10. Default to keeping initialization, repair, backfill, and one-off admin logic inside the controller file itself.
11. Only extract external service/helper methods when the logic is clearly reusable, long-lived, or shared by multiple entrypoints.

## Placement Rules

### 1. Where to put `XXXController`

Default rule:

- Put the class in the same service project that owns the route.
- Put it under the closest domain package ending in `.controller`.

For the `SetRestaurantGoLiveDateController` pattern:

- class file path:
  `backend/kitchen-management-service/src/main/java/app/kms/hdr/controller/SetRestaurantGoLiveDateController.java`
- package:
  `app.kms.hdr.controller`

Use nearby controllers to choose the package. Do not invent a new top-level package if the domain already has a controller package.

### 2. Where to register `http().route(...)`

Use the app or module that already owns the surrounding routes.

Two common patterns in this repository:

- App-level registration:
  `HDRServiceApp.initControllers()`
- Module-level registration:
  methods inside `DataSyncModule`, such as `dataCopy()` or `initPrinterForStressTest()`

Decision rule:

- If the route belongs to the core service and nearby controllers are wired in the main app, add it to the app's controller init method.
- If the route belongs to a feature that already groups routes in a `Module`, add it to that module instead of bloating the main app.

Example from `SetRestaurantGoLiveDateController`:

```java
http().route(HTTPMethod.POST, "/_app/hdr-restaurant/set-go-live-date", bind(SetRestaurantGoLiveDateController.class));
```

### 3. Where to register `http().bean(...)`

Register request beans only when the controller parses request payloads with `httpRequest.bean(...)`.

Example:

```java
var request = httpRequest.bean(SetRestaurantGoLiveDateRequest.class);
```

Then register:

```java
http().bean(SetRestaurantGoLiveDateController.SetRestaurantGoLiveDateRequest.class);
```

Rules:

- If the request class is a nested static class inside the controller, register that nested type directly.
- If the request class is a standalone class such as `InitPrinterRequest`, register that standalone class.
- If the controller only uses path params, query params, or no request body, do not add `http().bean(...)`.

### 4. Post-Release Executor Registration

For one-off init, repair, and backfill endpoints that should run after release, add the route call to the sprint-specific scheduler executor:

```java
call(context.kms, "/_app/example-init", null);
```

Use the current iteration's file, such as:

```text
backend/scheduler-service/src/main/java/app/scheduler/releaseexecutor/PostReleaseExecutor17.java
```

Do not stop at adding the controller route in KMS; the post-release executor is what makes the init/backfill run during the release process.

### 5. Idempotency Requirement

Controller APIs must be idempotent unless the user or existing domain contract explicitly requires non-idempotent behavior.

For init, repair, backfill, and post-release controllers:

- Repeated calls must be safe.
- Repeated calls with the same request must leave the system in the same final state.
- Existing-correct data must be skipped instead of rewritten unnecessarily.
- Missing or malformed data should be updated only to the intended target state.
- Response text should make repeated execution understandable, such as returning `No records need to update` when everything is already initialized.
- Avoid appending duplicate records, publishing duplicate side effects, or incrementing counters on repeated calls unless guarded by an existing idempotency key or equivalent state check.

Before finishing a controller, ask: "If this endpoint runs twice during post-release, will the second run be harmless and produce the same final result?" If not, add a guard or redesign the operation.

## Injection Rules

### 1. Controller itself

Do not separately `bind(XXXController.class)` in a module just to make routing work.
In this codebase, the normal pattern is:

```java
http().route(HTTPMethod.POST, "/path", bind(XXXController.class));
```

That is the controller registration point.

### 2. Service, publisher, helper, or cache dependencies

If the controller injects a normal bean such as:

- service
- publisher
- cache service
- helper

then check whether it is already bound in the owning module.

Example:

`SetRestaurantGoLiveDateController` injects `RestaurantGoLiveDateSnapshotMessagePublisher`.

That bean is bound in:

```java
bind(RestaurantGoLiveDateSnapshotMessagePublisher.class);
```

inside:

- `backend/kitchen-management-service/src/main/java/app/kms/HDRModule.java`

Rule:

- If the dependency already exists elsewhere in the same service, reuse it.
- If it is missing, bind it in the module that owns that domain service, not in the controller.
- Do not create a brand-new service class for a one-off init, repair, or migration-style controller unless reuse is already clear.
- For throwaway operational endpoints, prefer injecting existing beans such as `MongoCollection`, publisher, cache, or an existing domain service directly into the controller.

### 3. `MongoCollection<Entity>` dependencies

If the controller injects:

```java
@Inject
MongoCollection<HDRRestaurant> hdrRestaurantCollection;
```

do not add a normal `bind(...)` for that collection.

Instead verify the entity is registered in the app's Mongo setup, such as `mongoCollections()`:

```java
config.collection(HDRRestaurant.class);
```

Rule:

- `MongoCollection<Entity>` comes from Mongo config registration, not module service binding.
- If the entity is not registered, add `config.collection(Entity.class)` in the service app's Mongo config method.
- Do not write Mongo filters against unindexed fields in controller-local backfills. Confirm an index exists before filtering in Mongo; otherwise use a safe scan plus Java-side filtering for one-off initialization logic, or add the required index through the normal collection/index change path.

### 4. Request bean classes

Request bean classes are not module service beans.
They belong in `http().bean(...)`.

### 5. Property-built custom instances

If a controller dependency needs constructor args or property values, follow the repository's module style:

```java
var service = new RepairProdSyncService();
service.cloudPrintingHost = requiredProperty("cloud.printing.server.host");
bind(service);
```

Do this in the owning module, not in the controller.

## Controller-Local Logic Rule

Default preference in this repository:

- For init, repair, populate, backfill, cleanup, and one-off operational controllers, keep the business logic in `XXXController` itself.
- Favor deleting a single controller file later over creating a controller plus service plus helper chain that must all be cleaned up.
- Small private methods inside the controller are preferred over extracting a brand-new external service for short-lived logic.
- Keep controller-local backfill logic idempotent: select only records that still need correction, set deterministic target values, and make the no-op path explicit.

Examples that should usually stay controller-local:

- initialize one configuration record
- repair malformed data
- backfill a field across a collection
- publish a one-time corrective event
- populate missing values

Only extract logic out of the controller when at least one of these is true:

- the same logic is already used by another entrypoint
- the logic is becoming a stable domain capability rather than a one-off operation
- the controller would become too large or too nested to maintain safely
- a separate bean is already the established owner of that domain behavior

## Thin Controller Rule

Prefer controllers that do one of these:

- parse request
- call one service
- return response

This rule is not absolute for operational controllers.
For init or repair controllers, it is acceptable to keep the logic in the controller when that makes cleanup and locality better.

If the controller starts doing many of these at once in long-lived product code, move logic out:

- complex validation
- multi-step orchestration
- repeated Mongo query/write logic
- publishing side effects in multiple branches

The `SetRestaurantGoLiveDateController` example is useful as a locator example.
For one-off admin or init endpoints, it is acceptable to follow that more self-contained style when it avoids creating extra files that would later need to be deleted together.

## Fast Decision Table

When you need to know where something goes, use this table:

- `XXXController.java` implementation:
  place under the domain `...controller` package in the owning service module
- `http().route(...)`:
  add in the app or module that already owns nearby routes
- `http().bean(Request.class)`:
  add next to the route registration when request body parsing is used
- `@Inject SomeService/Publisher/Helper`:
  ensure it is bound in the owning module with `bind(...)`
- `@Inject MongoCollection<Entity>`:
  ensure `config.collection(Entity.class)` exists in app Mongo config
- one-off init or repair logic:
  keep it in the controller file first, then extract only if reuse or complexity justifies it
- idempotent controller behavior:
  ensure duplicate calls are safe and converge to the same final state
- nested request DTO:
  define as `public static class` inside the controller if it is only used there
- shared request DTO:
  extract to a standalone class only when reused across multiple controllers

## Example Pattern

Controller:

```java
package app.kms.hdr.controller;

import core.framework.inject.Inject;
import core.framework.mongo.MongoCollection;
import core.framework.web.Controller;
import core.framework.web.Request;
import core.framework.web.Response;

public class ExampleController implements Controller {
    @Inject
    MongoCollection<ExampleEntity> exampleCollection;

    @Override
    public Response execute(Request request) {
        ExampleRequest bean = request.bean(ExampleRequest.class);
        var entity = exampleCollection.get(bean.id).orElse(null);
        if (entity == null) {
            return Response.text("not found");
        }
        entity.enabled = Boolean.TRUE;
        exampleCollection.replace(entity);
        return Response.text("done");
    }

    public static class ExampleRequest {
        public String value;
    }
}
```

App or module registration:

```java
http().route(HTTPMethod.POST, "/_app/example", bind(ExampleController.class));
http().bean(ExampleController.ExampleRequest.class);
```

Owning module dependency binding:

```java
config.collection(ExampleEntity.class);
```

## Completion Check

- `XXXController` 是否放在已有领域的 `...controller` 包下？
- route 是否加在拥有相邻路由的 `App` 或 `Module` 中？
- 如果用了 `request.bean(...)`，是否补了 `http().bean(...)`？
- controller 注入的普通依赖是否在对应 `Module` 中已 `bind(...)`？
- controller 注入的 `MongoCollection<Entity>` 是否由 app 的 `config.collection(Entity.class)` 提供？
- 是否避免为了让 controller 可用而错误地额外 `bind(XXXController.class)` 到模块里？
- 对于一次性 init/repair controller，逻辑是否优先内聚在当前文件中，避免新增不必要的外部 service/helper 引用？
- controller API 是否幂等，重复调用同一个 endpoint 是否安全且最终状态一致？
- post-release controller 第二次执行时是否会进入明确的 no-op 路径，而不是重复写入、重复发布或重复追加？
- 如果已经抽出外部方法或 service，是否真的有复用价值，而不只是增加后续删除成本？
