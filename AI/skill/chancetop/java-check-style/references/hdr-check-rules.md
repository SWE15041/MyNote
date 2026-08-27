# HDR Project Static-Analysis Rules

## Sources

This summary is distilled from:

- `/Users/yannilan/workspace/Chancetop/hdr/hdr-project/buildSrc/src/main/check/checkstyle.xml`
- `/Users/yannilan/workspace/Chancetop/hdr/hdr-project/buildSrc/src/main/check/pmd.xml`
- `/Users/yannilan/workspace/Chancetop/hdr/hdr-project/buildSrc/src/main/check/spotbugs.xml`

Use the XML files as the source of truth when exact thresholds or edge cases matter.

## 1. Structure And Size

- Keep Java files within 450 lines.
- Keep methods within 50 non-empty lines.
- Keep executable statement count within 50.
- Keep method or constructor parameter count within 6.
- Keep anonymous inner classes short; the configured limit is 15 lines.
- Avoid deep nesting. The configuration restricts nested `for`, `if`, and `try` usage aggressively, with nested `try` effectively disallowed.
- Group constructors together.
- Keep overloaded methods adjacent.
- Follow the configured declaration order:
  - static fields
  - static methods
  - anonymous-class fields
  - instance fields
  - constructors
  - main method
  - instance methods
  - inner enum, interface, class

## 2. Formatting And Imports

- Do not use wildcard imports.
- Remove redundant and unused imports.
- Keep one statement per line and one declaration per line.
- Do not use tabs.
- Keep indentation, whitespace, and modifier order conventional.
- Put `.` at the start of the wrapped continuation line when a chained call wraps.
- Keep `,` at end of line, not the start of the next line.
- Keep package names lowercase with dots only.

## 3. Naming And Type Conventions

- Follow standard Java naming for classes, methods, members, parameters, locals, constants, type parameters, and enum values.
- Use interfaces as types, not as constant containers.
- Keep one top-level class per file.
- Make utility-style classes with only private constructors `final`.
- Put inner types after fields and methods.

## 4. Control Flow And Readability

- Do not rely on empty statements, empty blocks, or empty catch blocks.
- Always provide a `default` branch in `switch`, and keep `default` last.
- Avoid fall-through unless it is explicit and valid.
- Avoid assignments inside conditions except allowed increment or decrement cases.
- Simplify boolean expressions and boolean returns.
- Remove unnecessary parentheses, semicolons, constructors, modifiers, and fully qualified names.
- Collapse trivially collapsible `if` logic where it improves clarity.

## 5. Exception Handling

- Do not call `printStackTrace`.
- Preserve the original exception cause and stack trace.
- Do not throw `null`, throw from `finally`, or use exceptions as normal control flow.
- Avoid unchecked exceptions in method signatures unless justified by existing project patterns.
- Do not hide causes or create avoidable same-type replacement exceptions.
- Keep custom exceptions immutable where possible.

## 6. Resource And Charset Safety

- Prefer `try-with-resources`.
- Do not rely on the default charset.
- Use `StandardCharsets`.
- Avoid file and stream handling patterns that risk leaks or ignored results.

## 7. Null, Equality, And Object Correctness

- Compare strings with `.equals`, not `==`.
- Keep `equals` and `hashCode` consistent.
- Avoid redundant null checks, especially around `instanceof`.
- Guard against null dereferences on method inputs, fields, and return values.
- Do not return `null` from `Optional`.
- Avoid exposing mutable internal state through fields, arrays, or collections.

## 8. State, Concurrency, And Initialization

- Avoid mutable static state unless the repository already requires it and the code handles synchronization explicitly.
- Avoid method-level synchronization and thread-group usage.
- Do not call `Thread.run()` when you mean `start()`.
- Prefer `notifyAll()` over `notify()`.
- Avoid unsafe static formatter or calendar instances.
- Watch for partially constructed objects, unsafe publication, and synchronization on shared constants or boxed primitives.

## 9. Collections, Loops, And Performance

- Prefer enhanced `for` when appropriate.
- Use `isEmpty()` instead of size checks for emptiness.
- Use diamond operator where possible.
- Use method references when they clearly replace simple lambdas.
- Avoid unnecessary boxing, wrapper instantiation, string object construction, and redundant conversions.
- Reuse buffers and avoid inefficient string concatenation patterns in loops.
- Avoid needless array loops and use standard collection utilities when they are clearer.

## 10. Logging, Tests, And Miscellaneous

- Do not use `System.out.println`.
- Keep JUnit 5 tests package-private.
- Avoid warning suppressions unless required.
- Avoid commented-out cleanup gaps such as dead stores, unread fields, ignored return values, or useless control flow.
- Treat SpotBugs naming, package, and equality warnings as correctness signals, not style-only noise.

## 11. How To Use This Summary

- For code generation: shape the code around these constraints before writing large methods.
- For refactoring: split oversized methods early and reduce nesting instead of fighting the checks later.
- For review: report rule-backed issues first, especially correctness and maintainability problems that map to PMD or SpotBugs findings.
- For ambiguous cases: re-open the raw XML and verify the exact rule instead of guessing.
