# <Feature / Jira Title> Tech Design

[toc]

## Related Links

- Jira:
  - <Jira ticket link>
- Requirement / PRD:
  - <Confluence / document link>
- Figma / Prototype:
  - <Figma / prototype link>
- Related Designs:
  - <Related design document link>

# 1. Background

Describe why this work is needed from the business and product perspective.
Keep this section focused on the problem, not the implementation.

- What business problem are we solving?
- Which users, systems, or domains are affected?
- Why is the current capability insufficient?
- What product behavior or operational need is driving this change?

# 2. Goals / Non-Goals

Define what this design must achieve and what is intentionally out of scope.

| Goals | Non-Goals |
|---|---|
| <Goal 1> | <Non-goal 1> |
| <Goal 2> | <Non-goal 2> |
| <Goal 3> | <Non-goal 3> |

# 3. High-Level Design

Use this section as a concise summary of the technical approach and system boundary.
Avoid repeating Background. This section should help reviewers understand how the design works at a glance.

Recommended content:

- End-to-end path:
  - `<External System> -> <Service A> -> <Kafka / Queue> -> <Service B> -> <DB / Notification / UI>`
- Service responsibilities:
  - `<Service A>`:
  - `<Service B>`:
  - `<Other service>`:
- Key design decisions:
  - <Decision 1 and reason>
  - <Decision 2 and reason>
  - <Decision 3 and reason>
- Important boundaries:
  - <What this service owns>
  - <What this service does not own>

# 4. Sequence Diagram

Use a sequence diagram to show cross-service interactions and async boundaries.

Diagram requirement:

- Do not use Mermaid for the final diagram if visual quality matters.
- Generate a draw.io native XML file instead.
- The diagram must be editable in draw.io.
- Use fixed coordinates, explicit node sizes, and stable connector routes.
- Keep the visual style consistent with the document.

Recommended draw.io style:

- Landscape canvas.
- Clear title.
- Participants arranged left to right by execution order.
- Blue nodes/lines for normal processing.
- Orange nodes for async or policy decision points.
- Green nodes for successful persistence/result.
- Red nodes for reject/failure paths.

Deliverables:

- Editable source: `<feature>-sequence-flow.drawio`
- Markdown preview image: `<feature>-sequence-flow.png` or `<feature>-sequence-flow.svg`

Markdown embedding example:

```md
![Sequence Diagram](./<feature>-sequence-flow.png)

Editable source: [<feature>-sequence-flow.drawio](./<feature>-sequence-flow.drawio)
```

# 5. Flow Diagram

Use a flow diagram to show the main processing path, branch conditions, stop conditions, and final status.

Diagram requirement:

- Do not use Mermaid for the final diagram if visual quality matters.
- Generate a draw.io native XML file instead.
- Nodes must be editable, coordinates fixed, and layout intentionally designed.
- Prefer the screenshot-style layout:
  - left-side vertical happy path,
  - right-side validation/error branches,
  - bottom or side note box for important internal processing details.

Recommended draw.io style:

- White background.
- Large dark-blue title in the top-left.
- Main path nodes: light fill, blue border.
- Neutral async/return node: gray border.
- Failure nodes: light red fill, red border.
- Log/stop nodes: light yellow fill, orange border.
- Success node: light green fill, green border.
- Connectors should be mostly orthogonal, with minimal crossings.

Deliverables:

- Editable source: `<feature>-processing-flow.drawio`
- Markdown preview image: `<feature>-processing-flow.png` or `<feature>-processing-flow.svg`

Markdown embedding example:

```md
![Processing Flow](./<feature>-processing-flow.png)

Editable source: [<feature>-processing-flow.drawio](./<feature>-processing-flow.drawio)
```

# 6. API Design

Describe APIs by endpoint. Use sub-sections such as `6.1`, `6.2`, etc.

## 6.1 `<METHOD> /<path>`

Owner: `<service-name>`

Function:

- <What this API does>
- <What it validates>
- <What it persists or publishes>
- <What it returns>

Boundary:

- <What this API intentionally does not do>
- <Which downstream service or async handler owns later processing>

Request contract:

| Field | Required | Purpose | Constraint / Mapping |
|---|---|---|---|
| `<field>` | Yes / No | <Purpose> | <Constraint / target mapping> |

Response behavior:

- Success:
- Validation failure:
- Duplicate handling:
- Downstream failure:
- Error code / message:

## 6.2 `<METHOD> /<path>`

Owner: `<service-name>`

Function:

- <What this API does>

Boundary:

- <What this API does not do>

# 7. DB Design

| Collection / Table | Change | Purpose |
|---|---|---|
| `<collection>` | New / update / no change | <Purpose> |
| `<table>` | New / update / no change | <Purpose> |

Details:

- New collection / table:
- New fields:
- Index changes:
- Migration:
- Backfill:
- Retention / troubleshooting data:
- Impact on old data:

# 8. Kafka Design

List all new and reused topics that are part of the design.

| Topic | Producer | Consumer | Purpose |
|---|---|---|---|
| `<new-topic>` | `<service>` | `<service>` | <Why this topic exists> |
| `<existing-topic>` | `<service>` | `<service>` | <How this design uses it> |

For each important topic, add a short subsection.

## 8.1 topic: `<topic-name>`

- Purpose:
- Message contract:
- Producer behavior:
- Consumer behavior:
- Retry behavior:
- Failure behavior:
- Idempotency strategy:
- Reason for async processing:

If the topic has a complex processing flow, include a draw.io native XML diagram instead of Mermaid.
For multi-stage flows, prefer a three-lane layout:

- Trigger & filtering
- Policy / decision selection
- Notification / side-effect execution

# 9. Core Business Logic

Describe business behavior instead of implementation diff.

## 9.1 Validation

- <Validation rule 1>
- <Validation rule 2>

## 9.2 Duplicate / Idempotency

- Idempotency key:
- Duplicate behavior:
- Logging / error handling:

## 9.3 State Transition

| Current State / Condition | Action | Result |
|---|---|---|
| <condition> | <action> | <result> |

## 9.4 Business Mapping

| Source Field | Target Field | Rule |
|---|---|---|
| `<source>` | `<target>` | <mapping rule> |

## 9.5 Notification

| Condition | Notification | Recipient / Target | Content Source |
|---|---|---|---|
| <condition> | <email / banner / event> | <recipient / target> | <content source> |

When describing service-hours behavior, describe whether notification is skipped because of hours.
Avoid vague wording such as "Always active."

Examples:

- `Sends escalation notifications even outside IKC service hours.`
- `Sends escalation emails only when the HDR is open.`
- `Does not check service hours before sending escalation notifications.`

## 9.6 Error Handling

| Error Case | Behavior | Persisted? | Retried? |
|---|---|---|---|
| Invalid request | Reject / log | No | No |
| Downstream failure | Mark failed | Yes | Depends |

# 10. Environment Configuration

| Config | Environment | Value / Source | Purpose |
|---|---|---|---|
| `<config.key>` | dev / qa / prod | Secret manager / config repo | <Purpose> |

Details:

- New config:
- Secret location:
- Default / fallback:
- Feature flag:
- Environment-specific values:
- Initialization data:

# 11. Impact on Existing Features

Describe final product/system impact, not development history.

- API behavior changes:
- UI display changes:
- Enum / category / permission changes:
- Existing flows that remain unchanged:
- Cross-domain impact:
- Backward compatibility:
- Data migration or old-data compatibility:

# 12. Test Plan

Keep this at key acceptance-case level. Do not turn it into a full QA suite unless required.

| Case | Expected Result |
|---|---|
| Happy path | Creates expected business object and notification |
| Unsupported input | Does not create business object and records/logs reason |
| Duplicate event | Does not create duplicate business object |
| Downstream failure | Marks failure or retries according to design |
| Missing config | Uses fallback or fails clearly |

Suggested coverage:

- Happy path
- Unsupported / invalid input
- Duplicate / idempotency
- State transition
- Notification
- Config missing / fallback
