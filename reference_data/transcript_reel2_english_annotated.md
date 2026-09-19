# Instagram Reel 2 English Annotated Transcript
**Source URL**: `https://www.instagram.com/reel/DdeCyNIqBWz/`  
**Creator**: Nishant Tiwari (`@yournishaant`)  
**Duration**: 96.02 seconds  
**Topic**: The Spec-Driven AI Agent Framework (The 6 Essential Markdown Files)

---

### Segment-by-Segment English Translation with Engineering Annotations

#### 1. Introduction & PRD.md (00:00 - 00:12)
> **English**: "If you haven't included these files while doing AI coding, the AI agent will completely mess up your project! File Number 1 is `PRD.md` (Product Requirements Document). In this, clearly state what you are building, what problem you are solving, and what the core features are going to be."  
> **Engineering Annotation**: Without a PRD, LLM context windows drift over multi-turn interactions. A persistent PRD pins down non-functional requirements, scope boundaries, and core user workflows.

#### 2. Architecture Specification (00:12 - 00:24)
> **English**: "File Number 2 is `ARCHITECTURE.md`. Define your application flow in this: how files and folders will be organized, what the technology stack will be, and how different parts of the project connect with each other."  
> **Engineering Annotation**: Prevents the agent from inventing redundant directories or mismatching module imports. Dictates clean separation of concerns between client components, server endpoints, and data stores.

#### 3. Agent Rules & Constraints (00:24 - 00:36)
> **English**: "File Number 3 is `RULES.md`. It is essentially a rule book for the AI specifying what it must do and what it must strictly avoid, which libraries to use, how to handle errors, and what the technical constraints are."  
> **Engineering Annotation**: Enforces coding standards, such as strict TypeScript, forbidding `@ts-ignore` or `any`, requiring proper cleanup of canvas animation frames, and error boundaries.

#### 4. Design System & Tokens (00:36 - 00:48)
> **English**: "File Number 4 is `DESIGN.md`. This defines the overall primary and secondary colors, typography, fonts, component styling, and visual aesthetics so that the AI doesn't generate completely mismatched UI on every turn."  
> **Engineering Annotation**: Ensures visual consistency across screens by specifying exact hex tokens (e.g. bioluminescent emerald, cyan, and amber), glassmorphism properties, and micro-animation keyframes.

#### 5. Milestone Task Decomposition (00:48 - 01:12)
> **English**: "File Number 5 is `TASKS.md`. You divide the project into structured, bite-sized milestone tasks. For instance: Task 1 gives the AI the job to create the logo/hero, Task 2 to build the dashboard, Task 3 to build the payments/simulation. This ensures the AI tackles one focused objective at a time, which it can complete efficiently without hallucination."  
> **Engineering Annotation**: Enforces test-driven and task-oriented execution, minimizing context bloat and preventing unfinished code blocks.

#### 6. Persistent Project Memory (01:12 - 01:36)
> **English**: "File Number 6 is `MEMORY.md`. As your project evolves, you save the context here: all important architectural decisions, resolved bugs, and key changes made along the way. If you are starting for the first time and want this template, comment 'AI' and I'll send it to your DM!"  
> **Engineering Annotation**: Acts as long-term episodic memory for agent sessions. When context is wiped or compacted, `MEMORY.md` preserves the rationale behind bug fixes and design choices.
