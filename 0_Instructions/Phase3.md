### Phase 3

# Task 3.1: Code Visualization Generation

## Objective
Create visual representations of COBOL code structure and dependencies.

## Context
Use the `database.sqlite` database and the JSON files in `1_Output/parsed-structures/` generated in Phase 1.

## Specific Instructions
1.  **Call Graph**: Generate a graph (using Graphviz/DOT or a similar library) that shows dependencies between programs based on `CALL` statements. The output may be an image (PNG, SVG).
2.  **Flowcharts**: For a selection of 3-5 key programs, generate flowcharts illustrating the logic of their `PROCEDURE DIVISION`.
3.  **Copybook Dependency Maps**: Create a visualization (matrix or graph) showing which programs use which `COPYBOOK`s.

## Deliverable
-   A new directory `1_Output/parser_analysis/visualizations/`.
-   Inside this directory, save the image or interactive HTML files of the generated graphs and diagrams.

---

# Task 3.2: Code Metrics and Web Dashboard

## Objective
Calculate code quality metrics for each program and present them in an interactive web dashboard.

## Context
Analyze the source code or the parsed data from Phase 1 to calculate the metrics.

## Specific Instructions
1.  **Complexity Analysis**: For each program, calculate:
    -   **McCabe Cyclomatic Complexity**.
    -   **Halstead Metrics** (difficulty, volume, effort).
2.  **Maintainability Index**: Calculate a maintainability score for each program.
3.  **Web Dashboard**: Create a simple web dashboard (it may be a single `index.html` file with JavaScript, using a library like Chart.js or D3.js). The dashboard must show all calculated metrics, allowing filtering and sorting by program.

## Deliverable
-   A new directory `1_Output/parser_analysis/dashboard/`.
-   Inside this directory, place the `index.html` and any necessary JS/CSS files so that the dashboard works locally in a browser.

---

# Task 3.3: Automated Technical Documentation

## Objective
Generate technical reports and indexes based on the extracted structural data.

## Context
Use the `database.sqlite` database and the JSON files from `1_Output/parsed-structures/`.

## Specific Instructions
1.  **System-Level Report**: Generate a markdown document (`System_Level_Report.md`) including:
    -   Summary of all programs and copybooks.
    -   Dependency analysis (which programs depend on others, which are most critical).
    -   List of “orphan” programs (not called by anyone) or main entry points.
2.  **Indexes**: Generate two documents:
    -   `Program_Index.md`: An alphabetical index of all programs, with a brief description and a link to its analysis (if applicable).
    -   `Copybook_Index.md`: An alphabetical index of all copybooks, listing in which programs each one is used.

## Deliverable
-   A new directory `1_Output/parser_analysis/docs/`.
-   Inside, the files `System_Level_Report.md`, `Program_Index.md`, and `Copybook_Index.md`.

---

# Task 3.4: Consolidation and Verification of Final Deliverables

## Objective
Perform a final verification of all generated artifacts and ensure the project directory structure is complete and consistent.

## Context
This is the last task of the project. It is a quality and organization review of all completed work.

## Specific Instructions
1.  **Verify Directory Structure**: Ensure the following structure exists and contains the correct files:
    ```
    1_Output/
    ├── parsed-structures/       (JSONs from Phase 1)
    ├── parser_analysis/
    │   ├── dashboard/           (Web dashboard from Task 3.2)
    │   ├── docs/                (Technical documents from Task 3.3)
    │   ├── visualizations/      (Graphs and diagrams from Task 3.1)
    │   └── database.sqlite      (Database from Phase 1)
    └── SUBSYSTEM_DOCUMENTATION/ (Functional documents from Phase 2)
    ```
2.  **Check Consistency**: Open `Master_Architecture_Document.md` and verify that links to subsystem documents work.
3.  **Check Quality**: Open the dashboard and a couple of visualizations to confirm they were generated correctly.
4.  **Create a README**: In the project root, create a `README.md` file briefly explaining the purpose of the analysis and describing the contents of each directory in `1_Output/`.
