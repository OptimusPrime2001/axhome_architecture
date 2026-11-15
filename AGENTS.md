
# Axhome Architecture - Engineering Rules

## Project Context
- Build a Vietnamese architecture and construction company website.
- Follow docs/product/project-brief.md.
- Public website language: Vietnamese.
- Technical discussions and code documentation: English.

## General Rules
- Read relevant docs before implementing any task.
- Never invent business requirements.
- Never change the agreed architecture without approval.
- Do not implement unrelated features.
- Avoid over-engineering.
- Prefer simple, maintainable, production-ready code.

## Development Workflow
Before coding:
1. Explain the task scope.
2. Identify assumptions.
3. List files to create or modify.
4. Define acceptance criteria.
5. Define tests.

After coding:
1. Run relevant tests.
2. Run lint and type checks.
3. Report changed files.
4. Report test results.
5. Identify unresolved issues.

## Git Rules
- Never work directly on main.
- Use feature branches.
- Never force push.
- Never commit secrets or .env files.
- Do not overwrite unrelated user changes.

## Design Rules
- Follow the approved design references.
- Do not invent a new visual style.
- Preserve spacing, typography, colors and hierarchy.
- Responsive behavior is mandatory.
- Reuse shared components where appropriate.
