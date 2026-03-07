# AI Team Framework

## Overview
The AI Team Framework is a structured approach to software development that follows a rigid workflow with dedicated roles and audit gates. This framework is optimized for Full-stack/UI projects (Python/TS) with a focus on quality, collaboration, and clear responsibilities.

## Folder Structure

### Root Directories
- **.ai-team/**: Contains team configuration, rules, and memory
  - **rules/**: Role-specific guidelines and responsibilities
  - **memory/**: Team lessons learned and patterns
- **docs/**: Project documentation
  - **01-PRD/**: Product Requirements Documents
  - **02-Arch/**: System Architecture documentation
  - **03-Handover/**: Review comments and verification reports
- **src/**: Source code implementation
- **tests/**: Automated tests

### Key Files
- **.ai-team/project-rules.md**: Global project laws and workflow
- **.ai-team/rules/**: Role definitions for PO, UX, Architect, Tester, Developer, and Verification
- **.ai-team/memory/lessons_learned.md**: Team memory for lessons learned
- **docs/STATUS.md**: Project status tracker

## How to Use This AI Team

### Workflow & Audit Gates
1. **PO (Product Owner)**: Creates PRD in `docs/01-PRD/PRD.md` → User Approval
2. **UX (UI/UX Designer)**: Defines User Flows and Layouts in `docs/01-PRD/UI_UX_SPEC.md` → User Approval
3. **Architect**: Designs system architecture in `docs/02-Arch/ARCHITECTURE.md` → User Approval
4. **Tester**: Writes automated tests in `tests/` → Architect Review → User Approval
5. **Developer**: Implements code in `src/` to pass tests → Architect Code Review → Fix Loop
6. **Verification**: Conducts end-to-end acceptance test → User Final Sign-off

### Getting Started
1. **Initialization**: Run the setup to create the directory structure
2. **Define Requirements**: PO creates the PRD
3. **Design UI/UX**: UX creates the UI/UX specification
4. **System Design**: Architect designs the system architecture
5. **Write Tests**: Tester writes comprehensive tests
6. **Implement Code**: Developer implements the code
7. **Verify**: Verification conducts final acceptance test

## Roles and Responsibilities

- **PO (Product Owner)**: Requirements analysis, defines "WHAT" we are building
- **UX (UI/UX Designer)**: User experience and visual specification
- **Architect**: System design and quality gatekeeping
- **Tester (QA Engineer)**: TDD execution, writes automated tests
- **Developer (Full-Stack)**: Implementation and refinement
- **Verification**: End-to-end compliance audit

## Technical Standards
- **Preferred Languages**: Python (Streamlit/PySide) or TypeScript (Web)
- **Quality Gate**: Mandatory 90% test coverage
- **Philosophy**: SOLID, DRY, Clean Code, and TDD

## Communication
- **ALL documentation, code comments, and commit messages MUST be in English**
- All internal discussions and handovers must be documented in `docs/`
