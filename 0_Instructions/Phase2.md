### Phase 2

# Task 2.1: Subsystem Discovery and Justification

## Objective
Analyze the structural data from Phase 1 to identify and define the logical boundaries of business subsystems within the ACAS codebase.

## Context
This is the first task of Phase 2. You must use the JSON files in `1_Output/parsed-structures/` and the `database.sqlite` database as your main information sources. Your analysis must be bottom-up, based exclusively on code evidence.

## Specific Instructions
1.  **Guiding Principle**: Your main objective is to group programs and copybooks into “subsystems.” For each proposed subsystem, you must justify its existence based on concrete evidence (e.g., “Programs SL001, SL002, and SL005 form the ‘Order Management’ subsystem because they all operate on the `ORDERS.DAT` file, call each other, and handle credit validation logic”).
2.  **Discovery Criteria**:
    -   **Functional Cohesion**: Look for groups of programs that work toward a single business purpose.
    -   **Low Coupling**: Boundaries should exist where interactions between groups are minimal.
    -   **Business Alignment**: Groups should make sense as business domains (Sales, Purchasing, Accounting, etc.).
3.  **Categorization**: Once a subsystem is identified, classify it as:
    -   **Core**: Essential for business operation.
    -   **Supporting**: Serves the core systems (e.g., reporting).
    -   **Utility**: Provides cross-cutting technical capabilities (e.g., date calculations).

## Deliverable
A markdown document (`SUBSYSTEM_DISCOVERY.md`) listing the discovered subsystems. For each one, include:
-   Subsystem name.
-   Justification (code evidence).
-   List of main programs and copybooks it comprises.
-   Category (Core, Supporting, Utility).

---

# Task 2.2: Deep Functional Documentation of Subsystems

## Objective
For each subsystem identified in the previous task, generate a detailed functional specification document.

## Context
Use the subsystem list and components from the `SUBSYSTEM_DISCOVERY.md` file generated in Task 2.1. You must analyze the source code of the programs in each subsystem to infer the business logic.

## Specific Instructions
Perform this task **once per discovered subsystem**. Generate a separate document for each one following this exact structure:

1.  **Executive Summary**: Purpose, business value, key users, and criticality.
2.  **Functional Capabilities**: Main functions, business rules, triggers, and outcomes.
3.  **Data Domain**: Data entities it owns and references, with key attributes.
4.  **Interface Contracts**: Input, output, and internal interfaces (data, frequency, purpose).
5.  **Business Rules Engine**: Details of validation, calculation, and workflow rules.
6.  **Operational Characteristics**: Processing patterns (batch/online), data volumes.
7.  **Dependencies**: Mapping of dependencies with other systems.
8.  **Quality Attributes**: Performance requirements, reliability (RTO/RPO), etc.
9.  **Evolution Potential**: Opportunities for improvement or modernization.

## Deliverable
A series of markdown documents, one for each subsystem (e.g., `Order_Management.md`, `General_Accounting.md`).

---

```markdown
# Task 2.3: Subsystem Interaction Visualization

## Objective
Generate diagrams in Mermaid syntax to visualize the architecture and flows of each identified subsystem.

## Context
Use the functional documentation generated in Task 2.2. You must translate flow, data, and interaction descriptions into visual diagrams.

## Specific Instructions
For each subsystem, generate the following diagrams using Mermaid code:

1.  **Context Diagram**: Show the subsystem in the center and its interactions with users and other systems/subsystems.
2.  **Functional Flow Diagrams**: Illustrate at least one key business process (e.g., “End-of-Month Closing”).
3.  **Data Flow Diagrams**: Model how data moves through a process (e.g., “From Order to Payment”).
4.  **State Transition Diagrams**: Show the lifecycle of a key business entity (e.g., “Invoice Lifecycle”: Created → Approved → Paid → Archived).

## Deliverable
One markdown file per subsystem (`Visualizations_Order_Management.md`) containing the Mermaid code blocks for each requested diagram, with a clear title for each diagram.
```

---

# Task 2.4: Organize Subsystem Documentation

## Objective
Create the final directory structure for all functional and architectural documentation generated in Phase 2.

## Context
This is an organization task. You must take all artifacts from Tasks 2.1, 2.2, and 2.3 and place them in the correct location.

## Specific Instructions
1.  Create a main directory called `1_Output/SUBSYSTEM_DOCUMENTATION/`.
2.  Inside that directory, create a master document called `Master_Architecture_Document.md`. This document must list the discovered subsystems (from Task 2.1) and link to the detailed specification documents.
3.  Copy or move all detailed specification documents (from Task 2.2) and visualization documents (from Task 2.3) into this directory.

## Deliverable
The complete and organized directory structure `1_Output/SUBSYSTEM_DOCUMENTATION/` with all documents generated in Phase 2.