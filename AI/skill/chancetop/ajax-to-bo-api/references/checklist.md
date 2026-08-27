# AJAX To BO API Checklist

## Before Editing

- Locate the AJAX interface
- Locate the AJAX request and response types
- Check package naming conventions for BO-layer files
- Check whether a shared BO base request already contains `operator` and `requestedBy`
- If the repository has a separate service project, locate `Main`
- Read `Main` to find the concrete `xxApp` class
- Open `xxApp` and locate `bindAPIServices()`
- Locate the caller module Gradle file if the BO interface will be consumed across modules
- If the site layer exposes the AJAX API, locate the site app class and its `bindAPIClients()`
- Decide the site-layer forwarding service package, typically `app.wds.site.service`

## During Editing

- Replace `/ajax/` with `/bo/` in the path when no repo-specific rule overrides it
- Rename interface from `*AJAXWebService` to `BO*WebService`
- Rename request from `*AJAXRequest` to `BO*Request`
- Rename response from `*AJAXResponse` to `BO*Response`
- Preserve business fields and validations
- Add `requestedBy` with `@NotNull`, `@NotBlank`, and `@Property(name = "requested_by")`
- Add `operator` with `@Property(name = "operator")`
- Check whether `BO*WebServiceImpl` already exists in the service project
- If missing, create `BO*WebServiceImpl` and make it implement `BO*WebService`
- Check whether `api().service(BO*WebService.class, bind(BO*WebServiceImpl.class));` already exists
- If missing, register it in `bindAPIServices()`
- Keep `*AJAXWebServiceImpl` free of business logic
- In `*AJAXWebServiceImpl`, get `currentUser` with `WebContext` and `SessionsV2`
- Create or update a site-layer forwarding service under `app.wds.site.service`
- Let `*AJAXWebServiceImpl` call the site-layer forwarding service instead of the BO API client directly
- In the site-layer forwarding service, map `requestedBy = LogManager.APP_NAME`
- In the site-layer forwarding service, map `operator = currentUser.email`
- In the site-layer forwarding service, explicitly map all remaining business fields from `request` or `currentUser`
- In the site-layer forwarding service, call the BO API client and map the response back
- Check whether `api().client(BO*WebService.class, requiredProperty("app.wonderDevelopment.serviceURL"));` already exists
- If missing, register it in `bindAPIClients()`
- Check whether the caller module already has the needed `implementation(project("..."))` dependency
- If missing, add the interface-project dependency in the existing `dependencies` block
- If a class is newly created, resolve the author from `git config user.name`, otherwise fall back to `YanniLan`

## Before Finishing

- Verify interface method signatures match request and response types
- Verify new BO request fields follow project conventions
- Verify the service implementation package mirrors the interface package when the project follows that convention
- Verify the app registration is added exactly once
- Verify the site app client registration is added exactly once
- Verify the AJAX impl delegates to the site-layer forwarding service
- Verify BO API invocation happens in the site-layer forwarding service rather than the AJAX impl
- Verify business fields such as `userId`, `name`, and `fieldCodes` are mapped explicitly when applicable
- Verify persistent-domain business logic remains in the backend service directory rather than the AJAX impl
- Verify the Gradle dependency is added exactly once and points to the correct module path
- Verify any newly created class uses the Git user name as author, or `YanniLan` as fallback
- Summarize generated files and assumptions
