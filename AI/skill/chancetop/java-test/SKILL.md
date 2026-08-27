---
name: java-test
description: Create, update, or run Java tests in hdr-project. Use when adding enum compatibility coverage, testing new or changed service behavior, diagnosing JUnit failures, or choosing between a service-level and repository-wide Gradle test command. Do not use for Checkstyle, PMD, SpotBugs, or generic Java code review.
---

# Java Test

Use this skill for test authoring and test execution in `hdr-project`. Follow repository examples instead of introducing generic test structures or new test dependencies.

## Determine the mode

- For enum compatibility, follow **Enum tests**.
- For new or changed behavior inside a service, follow **Service behavior tests**.
- If the user only asks to run or diagnose tests, do not create or change test code unless the failure establishes that a test change is required and the requested scope permits it.

Before writing a test, read the production code, the nearest tests in the same module and package, and the relevant `IntegrationTest` and `TestModule`. Preserve the module's existing JUnit, assertion, injection, mocking, fixture, and resource-loading style.

## Enum tests

Use `backend/kitchen-management-service/src/test/java/app/kms/domain/EnumTest.java` (`app.kms.domain.EnumTest`) as the primary reference.

- Add the comparison to the existing `EnumTest` for the owning domain when one exists; do not create one test class per enum.
- Use JUnit 5 `@Test` and `core.framework.test.Assertions.assertEnumClass(...)`.
- Use `hasExactlyConstantsAs(...)` when both enum types must contain exactly the same constants.
- Use `hasAllConstantsOf(...)` only when the asserted enum may intentionally contain additional constants. Do not choose it merely to make a mismatch pass.
- Confirm the intended comparison direction from the closest existing domain example and the production mapping before adding the assertion.
- Keep enum tests focused on compatibility between enum types; test enum-specific behavior separately when behavior beyond constant parity exists.

## Service behavior tests

Use `backend/kitchen-management-service/src/test/java/app/kms/planning/service/PlanningCalculatorTest.java` (`app.kms.planning.service.PlanningCalculatorTest`) as the primary structural reference.

- Put `<ProductionClassName>Test` under the matching `src/test/java` package.
- A new test for service behavior must extend that module's `IntegrationTest`, for example `app.kms.IntegrationTest` in kitchen-management-service.
- Do not reuse `app.kms.IntegrationTest` across modules. Locate the `IntegrationTest` belonging to the target service and verify its `@Context`/`TestModule` setup.
- Use JUnit 5 annotations from `org.junit.jupiter.api`.
- For container-managed services, use `core.framework.inject.Inject` when the nearest tests obtain the subject from the integration context.
- Mock external or nondeterministic collaborators with the repository's existing Mockito style. Set deterministic behavior in `@BeforeEach` when multiple tests share it, and verify important interactions when the behavior depends on them.
- For pure deterministic objects that the reference tests construct directly, construct them directly rather than forcing injection.
- Name tests after observable behavior or the scenario being verified. Follow the nearest test's naming style; do not introduce an unrelated naming convention across an existing class.
- Arrange inputs, execute one behavior, and assert observable results. Cover the requested happy path plus material boundary, fallback, and failure paths supported by the production contract.
- Keep times, IDs, collections, and collaborator responses deterministic. Do not depend on the current clock, execution order, network, or a live external service.
- Use JUnit assertions with expected value first and actual value second. Do not add Java language `assert` statements to new tests.
- For substantial structured fixtures already represented as JSON, place inputs and expected results under the module's `src/test/resources` and load them with `ClasspathResources` and `JSON`, following `PlanningCalculatorTest`. Keep small scenarios inline.
- Do not change production behavior, loosen assertions, add dependencies, or create shared test abstractions merely to make a test pass without explicit authorization.

## Run tests

Run commands from the repository root.

- Test one service/module:

  ```bash
  ./gradlew :backend:<service-name>:test
  ```

  Example:

  ```bash
  ./gradlew :backend:kitchen-order-service:test
  ```

- Test the entire repository only when the user explicitly requests the whole suite or the change requires repository-wide validation:

  ```bash
  ./gradlew test
  ```

Prefer the affected service test first. Do not claim repository-wide success after running only one service.

After execution, report the exact command, exit code, affected test scope, failures, and any tests not run. Classify a failure before editing:

- production behavior defect;
- incorrect or stale expectation;
- fixture, isolation, injection, or mock setup problem;
- compilation or Gradle configuration problem;
- environment-dependent failure.

Do not rerun unchanged failing tests repeatedly. Use the failure output to narrow the cause, make an in-scope correction when authorized, then rerun the smallest affected service test.

## Completion check

- The test is in the correct module and matching package.
- Enum coverage follows the owning `EnumTest` and uses the correct equality semantics.
- New service behavior coverage extends the target module's `IntegrationTest`.
- Assertions verify observable behavior with deterministic data.
- The affected service test command was run when execution was requested or required by the implementation task.
- Repository-wide tests were run only when requested or justified, and the reported scope is accurate.
