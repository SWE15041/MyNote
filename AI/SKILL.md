---
name: ajax-to-bo-api
description: Generate or update BO-layer APIs by referencing existing AJAX-layer APIs in Java web service codebases. Use when the user asks to convert an AJAX API to a BO API, create BO create/delete/update/view endpoints from AJAX examples, align BO path/interface/request/response naming, add BO-only request fields such as operator and requestedBy, create BO service implementations, register BO API services in the service app startup class, add missing Gradle module dependencies for the new interface module, or implement site-layer AJAX APIs that forward requests to service-layer BO APIs.
---

# AJAX To BO API

## Overview

Reference an existing AJAX-layer API and create the matching BO-layer API with consistent path, interface, request, and response naming. For BO `create`, `delete`, and `update` requests, add BO-only request parameters `operator` and `requestedBy` unless the target project already uses a different shared base request that provides them. When the repository is split into interface and service projects, also create the BO service implementation and register it in the service app if needed. When the site layer calls the service layer, keep AJAX impl classes as thin request-forwarding adapters, create a site-layer service under `app.wds.site.service`, and move request-forwarding orchestration there.

## Workflow

1. Read the AJAX API interface, request, response, and related path annotations.
2. Infer the BO target names using the project naming pattern first, then fall back to the default mapping rules in this skill.
3. Create or update the BO interface, request, response, and implementation files.
4. For BO `create`, `delete`, and `update` request objects, add `operator` and `requestedBy`.
5. When the BO interface lives in an interface project and the implementation lives in a service project, check whether the BO implementation already exists before creating it.
6. Register the BO API service in the target app startup class if the binding is missing.
7. If the site layer calls the BO API, keep the AJAX impl focused on current-user lookup, request mapping, service invocation, and response mapping only.
8. Check whether the calling module already depends on the required interface project and add the Gradle dependency if it is missing.
9. Keep the business fields aligned with the AJAX API unless the user asks for deliberate BO-specific differences.
10. Summarize every generated or updated file and explicitly call out any assumptions.

## Project Structure Rules

For the Wonder Development layout, use these defaults unless the repository clearly uses a different structure:

- BO interface definitions live in `wonder-development-service-interface`
- BO implementations live in `wonder-development-service`
- The service startup entry is located from `Main`, which constructs the concrete `xxApp`
- API service bindings are registered inside `bindAPIServices()`
- Calling modules may need an explicit Gradle dependency on the interface project
- Site-layer AJAX implementations live in the site project
- Site-layer forwarding services live under `app.wds.site.service`

For example:

- `backend/wonder-development-service-interface/src/main/java/app/wds/api/BOViewWebService.java`
- `backend/wonder-development-service/src/main/java/app/wds/api/BOViewWebServiceImpl.java`
- `backend/wonder-development-service/src/main/java/Main.java`
- `backend/wonder-development-service/src/main/java/app/wds/WDSServiceApp.java`
- `frontend/build.gradle.kts`
- `frontend/wonder-development-site/src/main/java/app/wds/site/WDSSiteApp.java`
- `frontend/wonder-development-site/src/main/java/app/wds/site/api/ViewAJAXWebServiceImpl.java`
- `frontend/wonder-development-site/src/main/java/app/wds/site/service/ViewService.java`

## Default Mapping Rules

Apply project-local conventions first. If the repository does not already define a different rule, use these defaults.

### Path

- Convert `@Path("/ajax/<resource>")` to `@Path("/bo/<resource>")`
- Example: `@Path("/ajax/view")` => `@Path("/bo/view")`

### Interface

- Convert `<Domain>AJAXWebService` to `BO<Domain>WebService`
- Example: `ViewAJAXWebService` => `BOViewWebService`

### Request

- Convert `<Action><Domain>AJAXRequest` to `BO<Action><Domain>Request`
- Example: `CreateViewAJAXRequest` => `BOCreateViewRequest`

### Response

- Convert `<Action><Domain>AJAXResponse` to `BO<Action><Domain>Response`
- Example: `CreateViewAJAXResponse` => `BOCreateViewResponse`

## BO Request Field Rules

For BO request models used by `create`, `delete`, and `update` APIs, ensure these fields exist:

- `operator`
- `requestedBy`

Use these default annotations unless the repository already enforces a different shared request pattern:

```java
@NotNull
@NotBlank
@Property(name = "requested_by")
public String requestedBy;

@Property(name = "operator")
public String operator;
```

Follow the project's existing field style for:

- naming style
- annotations
- Javadoc
- getter/setter or Lombok usage
- field order

If the project already has a shared BO base request that includes these fields, reuse the base type instead of duplicating fields.

## Execution Guidance

When implementing this skill in a repository:

1. Find the AJAX source files first.
2. Reuse the same package structure where possible, changing only the layer-specific naming.
3. Copy the request and response structure conservatively.
4. Preserve validation annotations, serialization annotations, and comments unless they are AJAX-specific and clearly invalid for BO.
5. For `create`, `delete`, and `update`, inject `operator` and `requestedBy` in the BO request model.
6. If the user asks to add new request parameters, append them in the BO request while keeping the original AJAX fields intact unless asked otherwise.
7. If the AJAX API has multiple related files, enumerate them before editing so the generated BO set stays complete.
8. If the repository has a separate service-interface project and service project, create the BO interface in the interface project and the implementation in the service project.
9. If the BO interface is consumed from another module, inspect that module's Gradle build file and add the interface-project dependency only when it is missing.
10. If the site layer exposes an AJAX API, implement it as a thin adapter that calls a site-layer service instead of directly calling the BO API from the AJAX impl.

## Service Implementation Rules

When creating the service-side BO API:

1. Locate `Main` in the service project.
2. Read `Main` to determine the concrete app class, such as `app.wds.WDSServiceApp`.
3. Open that app class and locate `bindAPIServices()`.
4. Check whether the BO implementation class already exists in the corresponding service package.
5. If the implementation class exists, reuse it and do not create a duplicate.
6. If the implementation class does not exist, create it in the package that mirrors the BO interface package.

For example, if the interface is:

```java
package app.wds.api;

public interface BOViewWebService {
}
```

Then the implementation should normally be:

```java
package app.wds.api;

public class BOViewWebServiceImpl implements BOViewWebService {
}
```

Keep the directory hierarchy aligned between interface and implementation projects whenever the codebase already follows that pattern.

Do not place business logic in `BO*WebServiceImpl`. The implementation class should delegate into a class under the `service/` directory, typically a sibling domain service such as `ViewService`.

## API Service Registration Rules

After locating the service app class:

1. Inspect `bindAPIServices()`.
2. Check whether the BO API service is already registered.
3. If the binding already exists, do not add it again.
4. If the binding is missing, add it in the existing registration style.

Example:

```java
private void bindAPIServices() {
    api().service(BOViewWebService.class, bind(BOViewWebServiceImpl.class));
}
```

Prefer the existing import and formatting style of the app class. Add missing imports only when needed.

## Site Forwarding Rules

When implementing site-layer AJAX APIs that call service-layer BO APIs:

1. Keep `*AJAXWebServiceImpl` thin.
2. Do not write business logic in the AJAX impl.
3. Create a site-layer forwarding service under a package such as `app.wds.site.service`.
4. Let the AJAX impl call the site-layer service.
5. Let the site-layer service call the BO API client.
6. Keep actual persistent-domain business logic inside the backend service project's `service/` directory unless the user explicitly requests another location.
7. In the AJAX impl, perform only:
   - current-user lookup
   - delegating to the site-layer service
8. In the site-layer service, perform:
   - request mapping
   - BO API invocation
   - response mapping

Use this current-user lookup pattern in the AJAX impl:

```java
@Inject
WebContext webContext;
@Inject
SessionsV2 sessions;

LoginUserV2 currentUser = CurrentUserUtils.getCurrentUser(webContext, sessions);
```

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

For example:

```java
BOCreateViewRequest boRequest = new BOCreateViewRequest();
boRequest.userId = currentUser.id;
boRequest.name = request.name;
boRequest.fieldCodes = request.fieldCodes;
boRequest.requestedBy = LogManager.APP_NAME;
boRequest.operator = currentUser.email;
```

If the project already uses a different current-user or operator convention, follow the established repository pattern and call out the deviation in the summary.

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

## Dependency Injection Rules

When the BO interface is introduced into a caller module, verify that the module already depends on the corresponding interface project.

1. Locate the relevant Gradle build file for the caller module.
2. Inspect the `dependencies` block for the interface-project dependency.
3. If the dependency already exists, do not add it again.
4. If the dependency is missing, add it using the existing Gradle style of the file.

Reference example from `frontend/build.gradle.kts`:

```kotlin
implementation(project(":frontend:wonder-development-site-interface"))
```

For Wonder Development BO service integration, a common dependency is:

```kotlin
implementation(project(":backend:wonder-development-service-interface"))
```

Match the real target module path used by the repository you are editing. Reuse the surrounding indentation, DSL style, and dependency ordering as closely as possible.

## Example Conversion

### Input

```java
@Path("/ajax/view")
public interface ViewAJAXWebService {
    CreateViewAJAXResponse createView(CreateViewAJAXRequest request);
}
```

### Output

```java
@Path("/bo/view")
public interface BOViewWebService {
    BOCreateViewResponse createView(BOCreateViewRequest request);
}
```

`BOCreateViewRequest` should include the original business fields plus:

```java
@NotNull
@NotBlank
@Property(name = "requested_by")
public String requestedBy;

@Property(name = "operator")
public String operator;
```

Apply the validation annotations only to `requestedBy`. Do not add `@NotNull` or `@NotBlank` to `operator` unless the user explicitly asks for it or the repository already requires it.

If `BOViewWebServiceImpl` does not yet exist in the service project, create:

```java
package app.wds.api;

public class BOViewWebServiceImpl implements BOViewWebService {
}
```

Then ensure the target app class contains:

```java
private void bindAPIServices() {
    api().service(BOViewWebService.class, bind(BOViewWebServiceImpl.class));
}
```

If the implementation or registration already exists, reuse it and avoid duplicate definitions.

If the caller module is missing the interface dependency, add the corresponding Gradle entry in the existing `dependencies` block, for example:

```kotlin
implementation(project(":frontend:wonder-development-site-interface"))
```

or, when the caller needs the BO service interface module:

```kotlin
implementation(project(":backend:wonder-development-service-interface"))
```

If the site layer exposes an AJAX API for the same capability, first create a site-layer service such as:

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

Then keep the AJAX impl thin:

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

If `WDSSiteApp` does not yet register the BO API client, ensure it contains:

```java
private void bindAPIClients() {
    api().client(BOViewWebService.class, requiredProperty("app.wonderDevelopment.serviceURL"));
}
```

Keep any actual create/update/delete business logic inside the service project, for example in `app.wds.service.ViewService`, not in the site-layer impl.

## Reference Files

Read `references/checklist.md` when you need a compact execution checklist during implementation.
