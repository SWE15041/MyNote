---
name: ajax-to-bo-api
description: Use when converting an existing Java AJAX-layer API into a BO-layer API, especially when you need to mirror interface/request/response naming, add BO write-request audit fields, create service-side BO implementations, register BO API services, or add missing interface-module dependencies.
---

# AJAX To BO API

## Overview

Reference an existing AJAX-layer API and create the matching BO-layer API with consistent path, interface, request, and response naming. This skill focuses on the BO contract, BO request model adjustments, service-side implementation, service registration, and caller dependency wiring.

If the task also requires implementing the site-layer AJAX adapter that forwards to the BO API, use `site-api-implementing` together with this skill.

## Comment Rule

- By default, do not add comments to newly implemented methods.
- Do not add method-level Javadoc unless the user explicitly asks for it.
- Do not add inline comments inside methods unless the user explicitly asks for explanatory comments on a tricky block.
- If the user explicitly says not to write method comments, treat that as a hard rule for all generated or updated methods in the task.

## Workflow

1. Read the AJAX API interface, request, response, and related path annotations.
2. Infer the BO target names using the project naming pattern first, then fall back to the default mapping rules in this skill.
3. Create or update the BO interface, request, response, and implementation files.
4. For BO `create`, `delete`, and `update` request objects, add `operator` and `requestedBy`.
5. When the BO interface lives in an interface project and the implementation lives in a service project, check whether the BO implementation already exists before creating it.
6. Register the BO API service in the target app startup class if the binding is missing.
7. Check whether the calling module already depends on the required interface project and add the Gradle dependency if it is missing.
8. If the task also includes a site-layer AJAX endpoint that forwards to the BO API, switch to `site-api-implementing` for the site-layer portion instead of embedding site rules here.
9. Keep the business fields aligned with the AJAX API unless the user asks for deliberate BO-specific differences.
10. Summarize every generated or updated file and explicitly call out any assumptions.

## Project Structure Rules

For the Wonder Development layout, use these defaults unless the repository clearly uses a different structure:

- BO interface definitions live in `wonder-development-service-interface`
- BO implementations live in `wonder-development-service`
- The service startup entry is located from `Main`, which constructs the concrete `xxApp`
- API service bindings are registered inside `bindAPIServices()`
- Calling modules may need an explicit Gradle dependency on the interface project

For example:

- `backend/wonder-development-service-interface/src/main/java/app/wds/api/BOViewWebService.java`
- `backend/wonder-development-service/src/main/java/app/wds/api/BOViewWebServiceImpl.java`
- `backend/wonder-development-service/src/main/java/Main.java`
- `backend/wonder-development-service/src/main/java/app/wds/WDSServiceApp.java`
- `frontend/build.gradle.kts`

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
10. If the task also includes site-layer forwarding, apply `site-api-implementing` for the site-side classes and registrations.
11. If you create a brand-new class, set the author comment from `git config user.name` when available, and fall back to `YanniLan` if Git user information is unavailable.

## New Class Author Rule

For any newly created class, resolve the author name in this order:

1. `git config user.name`
2. `git config --global user.name`
3. Fallback to `YanniLan`

Then use the resolved author name in the class comment:

```java
/**
 * @author <resolved-git-user-name>
 */
```

In the current environment, the Git user name resolves to `YanniLan`.

If you are editing an existing class, preserve the existing author style unless the user explicitly asks to normalize it.

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

If the same capability also needs a site-layer AJAX adapter that forwards to the BO API, stop here for the BO portion and use `site-api-implementing` for the site-side implementation.

## Reference Files

Read `references/checklist.md` when you need a compact execution checklist during implementation.
