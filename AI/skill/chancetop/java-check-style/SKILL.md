---
name: java-check-style
description: Extract and apply the Java coding standards used by hdr-project from its static-analysis configuration. Use when Codex needs to write, modify, refactor, or review Java code in hdr-project, especially when fixing or avoiding Checkstyle, PMD, or SpotBugs issues, or when the user asks to follow project-specific code conventions rather than generic Java best practices.
---

# Java-Check-Style

## Overview

Use this skill to align Java changes with the standards encoded in `hdr-project/buildSrc/src/main/check`.
Do not tell the next agent to re-read `checkstyle.xml`, `pmd.xml`, or `spotbugs.xml` as a default step. The high-value rules are already distilled here and should be applied directly unless the current task proves there is an ambiguity.

## Workflow

1. Apply the built-in rules in this skill directly.
2. For implementation:
   - shape code to avoid static-analysis violations before writing too much,
   - split oversized methods early,
   - reduce nesting instead of adding suppressions,
   - prefer project-safe patterns for exceptions, null handling, collections, and resources.
3. For review:
   - prioritize findings that would break Checkstyle, PMD, or SpotBugs,
   - report structure, correctness, and maintainability issues before low-value formatting notes.
4. For bug fixing:
   - keep the fix compatible with the encoded project conventions,
   - only fall back to raw XML when a threshold, suppression, or edge-case rule is genuinely ambiguous.
5. Before completing Java code changes:
   - run the directly relevant Gradle static-analysis tasks, normally `checkstyleMain`, `pmdMain`, and `spotbugsMain` for the touched module,
   - if any task fails, fix the reported code issue and rerun the failed task,
   - repeat for at most 3 fix-and-rerun attempts, then report any remaining failure clearly.

## Built-In Rules

Apply these rules by default when working on Java in `hdr-project`.

### Structure And Size

- Keep Java files within 450 lines.
- Keep methods within 50 non-empty lines.
- Keep executable statement count within 50.
- Keep method or constructor parameter count within 6.
- Keep anonymous inner classes short; the configured limit is 15 lines.
- Avoid deep nesting; nested `try` is effectively disallowed and `if` / `for` nesting should stay shallow.
- Group constructors together.
- Keep overloaded methods adjacent.
- Follow declaration order:
  - static fields
  - static methods
  - anonymous-class fields
  - instance fields
  - constructors
  - main method
  - instance methods
  - inner enum, interface, class

### Formatting And Imports

- Do not use wildcard imports.
- Remove redundant and unused imports.
- Keep one statement per line and one declaration per line.
- Do not use tabs.
- Keep indentation, whitespace, and modifier order conventional.
- Put `.` at the start of the wrapped continuation line for chained calls.
- Keep `,` at end of line, not the start of the next line.
- Keep package names lowercase with dots only.
- Write code comments in English only; do not add Chinese comments.

### Documentation And Metadata

- When a file header, template, or generated block requires an author name, obtain it with Git instead of inventing one. Prefer `git config user.name`; if repository history is the more appropriate source, use a Git blame or log command that matches the touched file.

### Naming And Type Conventions

- Follow standard Java naming for classes, methods, members, parameters, locals, constants, type parameters, and enum values.
- Use interfaces as types, not as constant containers.
- Keep one top-level class per file.
- Make utility-style classes with only private constructors `final`.
- Put inner types after fields and methods.

### Control Flow And Readability

- Do not rely on empty statements, empty blocks, or empty catch blocks.
- Always provide a `default` branch in `switch`, and keep `default` last.
- Avoid unintended fall-through.
- Avoid assignments inside conditions except allowed increment or decrement cases.
- Simplify boolean expressions and boolean returns.
- Remove unnecessary parentheses, semicolons, constructors, modifiers, and fully qualified names.

### Exception Handling

- Do not call `printStackTrace`.
- Preserve the original exception cause and stack trace.
- Do not throw `null`, throw from `finally`, or use exceptions as normal control flow.
- Avoid unchecked exceptions in signatures unless existing project patterns clearly require them.
- Do not hide causes or create avoidable same-type replacement exceptions.
- Keep custom exceptions immutable where possible.

### Resource, Null, And Equality Safety

- Prefer `try-with-resources`.
- Do not rely on the default charset; use `StandardCharsets`.
- Compare strings with `.equals`, not `==`.
- Keep `equals` and `hashCode` consistent.
- Avoid redundant null checks, especially around `instanceof`.
- Guard against null dereferences on inputs, fields, and return values.
- Do not return `null` from `Optional`.
- Avoid exposing mutable internal state through fields, arrays, or collections.

### Concurrency And State

- Avoid mutable static state unless the repository already requires it and synchronization is explicit.
- Avoid method-level synchronization and thread-group usage.
- Do not call `Thread.run()` when you mean `start()`.
- Prefer `notifyAll()` over `notify()`.
- Avoid unsafe static formatter or calendar instances.

### Performance And Collection Rules

- Prefer enhanced `for` when appropriate.
- Use `isEmpty()` instead of size checks for emptiness.
- Use diamond operator where possible.
- Use method references when they clearly replace simple lambdas.
- Avoid unnecessary boxing, wrapper instantiation, string object construction, and redundant conversions.
- Reuse buffers and avoid inefficient string-building patterns in loops.

### Review Priorities

- First: correctness issues that map to SpotBugs or PMD error-prone rules.
- Second: maintainability issues such as oversized methods, deep nesting, poor declaration order, and exception misuse.
- Third: import, naming, and formatting violations that would fail static analysis.

## What To Prioritize

Focus first on the rules that change code structure or behavior:

- Method and file size limits
- Declaration order and overload grouping
- Import hygiene and naming conventions
- Exception handling and stack-trace preservation
- Null-safety, resource handling, and thread-safety hazards
- Avoidable performance and readability violations that are explicitly enforced

Do not turn the skill into a full mirror of the XML. Use these built-in rules as the default operating guidance.

## Decision Rules

- Treat the original XML files as the source of truth.
- Follow existing repository coding patterns when they are compatible with the configured rules.
- If a summarized rule and a concrete file disagree, trust the configuration and current local context over the summary.
- If a suppression exists, do not remove or bypass it unless the task explicitly requires that cleanup.

## Review Guidance

When reviewing Java changes in this repository:

1. Check whether the change risks violating the size, nesting, import, naming, or declaration-order rules from Checkstyle.
2. Check whether the change introduces PMD-style issues such as poor exception handling, redundant constructs, mutable static state, or unnecessary complexity.
3. Check whether the change introduces SpotBugs-style risks such as null dereferences, exposed mutable state, unsafe synchronization, ignored return values, or resource leaks.
4. Report the highest-signal findings first, with a short explanation tied to the relevant rule family.

## Escalation Rule

Only go back to the raw XML when:

- a numeric threshold must be verified,
- a suppression may apply,
- two rules appear to conflict,
- or the task touches an uncommon Java pattern not covered here.
