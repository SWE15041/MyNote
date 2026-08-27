---
name: ticket-development
description: "Turn a Jira ticket URL into a reviewed PRD, spec, implementation plan, test plan, and gated code delivery for hdr-project."
---

# Ticket Development

Use this skill when the user wants to start a future delivery workflow from a Jira ticket, including but not limited to `hdr-project`.
## Required input

The first action is to check whether the user supplied a complete ticket URL.

- If no ticket URL is present, ask the user to provide one and stop.
- If the user does not provide a URL after that request, stop. Do not guess an issue key, search Jira broadly, or start repository work.
- Accept a Jira issue URL only when it is specific enough to open one ticket, for example `https://wonder.atlassian.net/browse/HDR-11066`.

## Ticket retrieval

After receiving the URL, use the browser capability to open the ticket and collect its complete visible content: title, description, acceptance criteria, comments relevant to the request, status, priority, attachments or linked requirements, and any repository or rollout constraints.

If the browser is redirected to login, shows a permission error, or hides required content, tell the user exactly what access is missing and ask them to sign in or release the required permission. Pause until the user confirms access; do not infer missing requirements.

## Staged definition and delivery gates

After retrieving the ticket, use these mandatory approval gates. Approval of one stage authorizes only the next stage; never generate later artifacts or begin implementation in the same turn unless the user has explicitly approved the immediately preceding artifact.

1. Analyze the requirements and resolve material ambiguities. Present the analysis and wait for user confirmation.
2. After the analysis is confirmed, prepare the ticket branch from the repository baseline, then create only the PRD and technical spec. The spec must include problem, goal, users, scope, non-goals, requirements, acceptance criteria, dependencies, risks, open questions, and technical decisions. Present the persisted spec and wait for explicit user approval.
3. After the spec is approved, create the implementation plan and acceptance-criteria test matrix. Include affected files/modules, ordered steps, verification commands, rollback considerations, PR requirements, happy paths, failure paths, boundary cases, and regression coverage. Present the persisted plan and wait for explicit user approval.
4. After the plan is approved, verify that the current branch is the intended ticket branch, then begin implementation.
5. After implementation and verification, present the code changes for user review. Do not commit, push, or create a PR until the user explicitly confirms the code review.

Persist the definition artifacts on disk; presenting them only in the Codex task is not sufficient. Follow repository-specific documentation conventions when present. For `hdr-project`:

- store the PRD and technical spec in `docs/superpowers/specs/YYYY-MM-DD-<ticket-key-lowercase>-<short-slug>.md`;
- store the implementation plan and acceptance-criteria test matrix outside the Git repository at `/Users/yannilan/workspace/Chancetop/DOC/ct-doc/hdr/tech design/plan/YYYY-MM-DD-<ticket-key-lowercase>-<short-slug>.md`. Create the parent directory when it does not exist.

Create each file only at its approved stage and treat it as a living delivery artifact. Update the plan status, affected files, verification commands and results, risks, decisions, commit, and PR information as the work progresses. Keep the spec synchronized when requirements, scope, or technical decisions change.

## Plan storage and PR documentation boundary

For `hdr-project`, implementation plans are local execution artifacts stored only under `/Users/yannilan/workspace/Chancetop/DOC/ct-doc/hdr/tech design/plan/`; never create a new plan under the hdr-project working tree. If a legacy plan exists under `docs/superpowers/plans/`, move it to the external plan directory before continuing and preserve its filename unless a collision requires an explicit user decision.

Implementation plans must never be included in a commit, pushed branch, or pull request. Before committing or updating a PR, inspect the staged file list and PR diff. If any implementation plan is present, remove it from Git while preserving the external copy.

The approved PRD/technical spec under `docs/superpowers/specs/` may still be committed when repository conventions or the user require it. This exclusion applies only to implementation plan files.

## Development gate

Inspect the current Codex session's access mode. Full access means the session explicitly permits the requested local code changes; it does not imply permission to push, create a PR, or change external systems.

- Full access does not bypass the staged approval gates.
- Begin implementation only after the user explicitly approves the plan and the repository baseline gate is complete.
- Without confirmed full access, ask the user to approve implementation after plan approval and stop. Approval for implementation does not authorize commit, push, or PR creation.

## Project language gate

For `hdr-project`, every repository change and external implementation plan must be written in English. This includes source code, code comments, test names and fixtures, UI text, configuration, generated artifacts, PRDs, specs, implementation plans, test matrices, and other delivery documentation. Chinese may be used in the Codex conversation, but never in project delivery files. Do not translate identifiers or exact external references that must be preserved verbatim.

## Repository baseline gate

For every new ticket, prepare the ticket branch from the latest remote `master` after requirements analysis is approved and before persisting the spec:

1. Check the worktree and index. If either contains changes, stop and ask the user how to preserve them; do not stash, discard, commit, or carry them onto the new ticket branch without explicit direction.
2. Switch to the local `master` branch.
3. Run `git pull --ff-only origin master` so local `master` exactly incorporates the latest remote `master`. Do not use a merge pull or start from a stale local branch.
4. Create and switch to a new feature branch from that updated `master`, using the repository's Jira branch-naming convention. Never create a ticket branch from another feature branch.
5. If the intended branch name already exists locally or on the remote, do not overwrite, reset, or recreate it. Report the existing branch and ask whether to reuse it or choose a different branch name.

Obtain any approval required by the current session before Git operations that mutate local state. Updating local `master` and creating a feature branch do not authorize commit, push, PR creation, or other remote writes.

## Implementation and verification

Implement only the approved scope. Preserve the ticket-to-repository mapping and follow repository instructions. After implementation:

1. Run the repository's focused checks.
2. Run JUnit unit tests. Use the project's documented Gradle/Maven command; if no focused command is documented, discover it from the build files before running it.
3. Report changed files, commands, results, failures, risks, and remaining questions.

If JUnit fails, stop the delivery gate, show the failure, and fix or ask for direction. Do not create a PR from a failing test result.

## PR gate

When JUnit and required checks pass, present the code changes and verification evidence for user code review. Only after the user explicitly approves the code review may you prepare a PR proposal with:

- branch name following the repository/Jira convention;
- commit message exactly matching `<Jira key> <ticket title>` as displayed in Jira. Preserve the original capitalization, punctuation, spacing, and wording; do not add a Conventional Commit prefix or scope, translate it, or otherwise rewrite it. For example: `HDR-11066 (HDR Portal) Newly Go Live Restaurant bypass Offline Appliance Restrictions`;
- apply that exact commit message rule to the initial implementation and every follow-up fix. Before pushing or updating a PR, amend or squash the ticket commits when needed so the PR contains one delivery commit with the exact Jira commit message, unless the user explicitly asks to preserve multiple commits;
- PR title and body summarizing the change, tests, risks, and linked ticket.

Show the generated commit and PR messages and ask whether the user wants adjustments. Code-review approval does not itself authorize commit, push, or PR creation. The final decision to perform each external mutation belongs to the user; do not perform it without explicit confirmation in the current conversation.

## Ticket comment gate

After the PR has been successfully created, prepare a concise Jira comment draft using the actual delivered change, PR URL, and relevant acceptance criteria. Use this exact structure:

```text
What I changed:
1. <short description of the delivered change>

Code Review:
1. <PR URL>

Test Suggestion:
1. <primary acceptance test>
2. <relevant regression or boundary test>
```

- Keep the draft brief and factual. For `hdr-project`, write it in English unless the user explicitly requests another language.
- Include only changes that were actually delivered. Do not add implementation details, unaffected-scope statements, or extra numbered items unless they materially help ticket reviewers.
- Use the real PR URL; never post a placeholder or generate the comment before the PR exists.
- Present the exact draft to the user and stop for explicit approval. If the user requests edits, revise the draft and present it again. Do not write any Jira comment until the user confirms the final text.
- After approval, add the final text once to the Jira ticket using the available Atlassian/Jira capability, verify that it was created, and report the result. Approval to add the comment does not authorize changing ticket status, fields, assignee, or any other Jira data.

## Handoff and continuity

For one ticket, keep one Codex task/chat across analysis, plan, implementation, tests, and PR preparation. Reflect each stage's output in the current task so the user can review the exact artifact that enabled the next stage.
Before handoff, verify that the repository spec and the external plan under `/Users/yannilan/workspace/Chancetop/DOC/ct-doc/hdr/tech design/plan/` reflect the final implementation and validation state. The task summary supplements these files but does not replace them, and the external plan remains excluded from commits and pull requests.
