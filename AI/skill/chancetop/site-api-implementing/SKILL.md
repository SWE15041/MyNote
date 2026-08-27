---
name: site-api-implementing
description: Use when implementing or refactoring a Java site-layer AJAX API that should stay as a thin adapter over a BO or service-layer API, especially when you need current-user lookup, request/response mapping, site service extraction, BO client registration, or caller-module dependency wiring.
---

# Site API Implementing

## Overview

Keep site-layer `*AJAXWebServiceImpl` classes thin. Put only entrypoint adaptation in the AJAX impl, move request-forwarding orchestration into a site-layer service, and let that service call the BO API client.

If the task also requires creating the BO contract and service-side BO implementation, use `ajax-to-bo-api` together with this skill.

## Comment Rule

- By default, do not add comments to newly implemented methods.
- Do not add method-level Javadoc unless the user explicitly asks for it.
- Do not add inline comments inside methods unless the user explicitly asks for explanatory comments on a tricky block.
- If the user explicitly says not to write method comments, treat that as a hard rule for all generated or updated methods in the task.

## Workflow

1. Locate the site-layer AJAX interface and implementation.
2. Confirm whether the AJAX impl is directly calling a BO API or already delegating to a site-layer service.
3. Keep `*AJAXWebServiceImpl` focused on current-user lookup and a single service delegation.
4. Create or update a site-layer service under `app.wds.site.service`.
5. Move request mapping, BO API invocation, and response mapping into the site-layer service.
6. Verify the BO API client is registered in the site app class.
7. Verify the caller module depends on the required BO interface module.
8. Summarize every generated or updated file and explicitly call out any repository-specific deviations.

## Project Structure Rules

For the Wonder Development layout, use these defaults unless the repository clearly uses a different structure:

- Site-layer AJAX implementations live in the site project
- Site-layer forwarding services live under `app.wds.site.service`
- The site app class is typically `WDSSiteApp`
- BO API clients are registered inside `bindAPIClients()`
- The caller module may need an explicit dependency on the BO service interface project

For example:

- `frontend/wonder-development-site/src/main/java/app/wds/site/api/ViewAJAXWebServiceImpl.java`
- `frontend/wonder-development-site/src/main/java/app/wds/site/service/ViewService.java`
- `frontend/wonder-development-site/src/main/java/app/wds/site/WDSSiteApp.java`
- `frontend/build.gradle.kts`

## Core Layering Rules

### AJAX Impl Responsibilities

In `*AJAXWebServiceImpl`, keep only:

- current-user lookup
- delegating to the site-layer service

Do not put these in the AJAX impl:

- business logic
- BO request assembly
- BO response to AJAX response mapping
- direct multi-step orchestration

### Site Service Responsibilities

In the site-layer service, keep:

- request mapping
- BO API invocation
- response mapping

Do not move backend persistent-domain business logic into the site service unless the user explicitly asks for that architecture. Persistent-domain business logic should remain in the backend service project's `service/` directory.

## Current User Lookup Rule

Use this current-user lookup pattern in the AJAX impl unless the repository already uses a different established pattern:

```java
@Inject
WebContext webContext;
@Inject
SessionsV2 sessions;

LoginUserV2 currentUser = CurrentUserUtils.getCurrentUser(webContext, sessions);
```

If the project already uses a different current-user retrieval flow, follow the established repository pattern and call out the deviation in the summary.

## Request Mapping Rules

When mapping AJAX requests to BO requests inside the site-layer service, use these default special-field assignments unless the user asks for something else:

```java
boRequest.requestedBy = LogManager.APP_NAME;
boRequest.operator = currentUser.email;
```

Map the remaining business fields explicitly and conservatively. Do not omit fields that have a clear source in the AJAX request or current user context.

Typical mapping rules:

- identity fields sourced from the current user should be assigned explicitly
- business fields sourced from the AJAX request should be copied explicitly
- collection fields such as `fieldCodes` should also be copied explicitly unless the user requests a transformation

Example:

```java
BOCreateViewRequest boRequest = new BOCreateViewRequest();
boRequest.userId = currentUser.id;
boRequest.name = request.name;
boRequest.fieldCodes = request.fieldCodes;
boRequest.requestedBy = LogManager.APP_NAME;
boRequest.operator = currentUser.email;
```

## Response Mapping Rules

- Map BO response fields back to AJAX response fields explicitly.
- Keep mapping conservative and structural.
- Do not silently drop fields that have an obvious target in the AJAX response.
- If the BO response shape and AJAX response shape intentionally differ, preserve the repository pattern and call out the assumption.

## Site API Client Registration Rules

If the site layer calls a BO API, verify that the BO API client is registered in the site app class.

1. Locate the site app class, such as `WDSSiteApp`.
2. Inspect `bindAPIClients()`.
3. Check whether the BO API client is already registered.
4. If it is already registered, do not add it again.
5. If it is missing, add it using the existing registration style.

Example:

```java
api().client(BOViewWebService.class, requiredProperty("app.wonderDevelopment.serviceURL"));
```

Prefer the existing property key, import style, and formatting used by the site app class.

## Dependency Rules

When the site module introduces a BO interface usage, verify that the module already depends on the corresponding BO interface project.

1. Locate the relevant Gradle build file for the caller module.
2. Inspect the `dependencies` block for the BO interface-project dependency.
3. If the dependency already exists, do not add it again.
4. If the dependency is missing, add it using the existing Gradle style of the file.

Common example:

```kotlin
implementation(project(":backend:wonder-development-service-interface"))
```

Match the real target module path used by the repository you are editing. Reuse the surrounding indentation, DSL style, and dependency ordering as closely as possible.

## Example Pattern

Site service:

```java
package app.wds.site.service;

public class ViewService {
    @Inject
    BOViewWebService boViewWebService;

    public CreateViewAJAXResponse create(CreateViewAJAXRequest request, LoginUserV2 currentUser) {
        BOCreateViewRequest boRequest = new BOCreateViewRequest();
        boRequest.userId = currentUser.id;
        boRequest.name = request.name;
        boRequest.fieldCodes = request.fieldCodes;
        boRequest.requestedBy = LogManager.APP_NAME;
        boRequest.operator = currentUser.email;

        BOCreateViewResponse boResponse = boViewWebService.create(boRequest);

        CreateViewAJAXResponse response = new CreateViewAJAXResponse();
        response.viewId = boResponse.viewId;
        return response;
    }
}
```

Thin AJAX impl:

```java
public class ViewAJAXWebServiceImpl implements ViewAJAXWebService {
    @Inject
    ViewService viewService;
    @Inject
    WebContext webContext;
    @Inject
    SessionsV2 sessions;

    @Override
    public CreateViewAJAXResponse create(CreateViewAJAXRequest request) {
        LoginUserV2 currentUser = CurrentUserUtils.getCurrentUser(webContext, sessions);
        return viewService.create(request, currentUser);
    }
}
```

## Completion Check

- `*AJAXWebServiceImpl` 是否只剩当前用户获取与单次委托？
- BO request/response mapping 是否已经下沉到 site service？
- site app 的 `bindAPIClients()` 是否补齐了缺失 BO client？
- caller module 是否补齐了缺失的 interface dependency？
- 是否避免把后端核心业务逻辑搬到 site 层？
