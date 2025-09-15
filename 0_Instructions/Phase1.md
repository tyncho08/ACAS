### Phase 1

# Task 1.1: Discover and Process COBOL Files

## Objective
Your only task is to find and list all COBOL source code files within the ACAS project.

## Context
This is the first step of Phase 1 of the "Hybrid COBOL System Analysis" project. The output of this task will be the list of files to be processed in the next step.

## Specific Instructions
1.  **Discovery**: Search for all files ending with the extensions `.cbl`, `.cpy`, and `.CPY`.
2.  **Scope**: The scan must be recursive, covering all subdirectories, including `common/`, `mysql/`, `home/`, `sales/`, `purchase/`, `stock/`, `general/`, `irs/`, and `copybooks/`.
3.  **Execution**: Process directories sequentially to provide clear progress feedback and avoid memory issues.
4.  **Engine**: For this task, use a simple script or an operating system file search tool. You don’t need the COBOL parser yet.

## Deliverable
A list of absolute or relative file paths, one per line, representing all COBOL files found. You may print this list in the console or save it to a plain text file (e.g., `file_list.txt`).

---

# Task 1.2: Extraction of COBOL Code Structures

## Objective
For each COBOL file identified in the previous task, process it to extract its key structural components.

## Context
This task takes as input the list of files from Task 1.1. You will use a parser to analyze the content of each file.

## Specific Instructions
1.  **Engine**: Use a Node.js-based parser (such as `cobol-parsers` from npm) or a similar tool. Prioritize efficient pattern matching over a full AST analysis if it’s faster and sufficient for the task.
2.  **Identification Extraction**: Extract the `PROGRAM-ID` and the structure of the `IDENTIFICATION`, `ENVIRONMENT`, `DATA`, and `PROCEDURE` divisions.
3.  **Program Flow Extraction**: Identify and list all `CALL` statements to map dependencies between programs. Also identify all `PERFORM` statements to understand internal flow.
4.  **Dependency Extraction**: Extract all `COPY` statements to track copybook usage.
5.  **Data Structure Extraction**: Analyze file descriptions (`SELECT`, `FD`) and data definitions in the `DATA DIVISION`.

## Deliverable
A set of in-memory data structures (e.g., JavaScript/JSON objects) for each processed file. This output will serve as the input for the next task (1.3). Do not generate files yet. Report any parsing errors per file without stopping the overall process.

---

# Task 1.3: Generate JSON Outputs and Store in Database

## Objective
Persist the structural data extracted in the previous task into JSON files and a SQLite database.

## Context
You will use the in-memory data structures generated in Task 1.2.

## Specific Instructions
1.  **JSON Generation**: For each data structure of a COBOL file, generate a JSON file. The name should correspond to the original (e.g., `sales/sl000.cbl` becomes `sales_sl000.cbl.json`).
    -   Store all JSON files in a new directory called `1_Output/parsed-structures/`.
    -   Include in each JSON metadata such as the analysis timestamp and the original file path.
2.  **Database Storage**: Create a SQLite database named `database.sqlite` (to be saved in `1_Output/parser_analysis/`). Design a simple schema and persist all extracted metrics, structures, and dependency relationships (programs, calls, copybooks, etc.).
3.  **Summary Report**: Create a text or markdown file (`1_Output/parsing_summary.md`) summarizing the process. It must include statistics (files processed, errors encountered, total time) and a detailed log of any parsing errors.

## Deliverable
-   The directory `1_Output/parsed-structures/` filled with JSON files.
-   The file `1_Output/parser_analysis/database.sqlite`.
-   The file `1_Output/parsing_summary.md`.