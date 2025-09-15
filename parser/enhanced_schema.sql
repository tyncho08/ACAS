-- Enhanced COBOL Analysis Database Schema v2.0
-- Phase 1: Deep Structural Analysis

-- Programs table with quality metrics
CREATE TABLE IF NOT EXISTS programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_path TEXT UNIQUE NOT NULL,
    file_name TEXT NOT NULL,
    program_id TEXT,
    program_type TEXT CHECK(program_type IN ('MAIN', 'SUBROUTINE', 'BATCH', 'ONLINE')),
    parse_confidence REAL CHECK(parse_confidence >= 0 AND parse_confidence <= 1),
    mccabe_complexity INTEGER,
    cognitive_complexity INTEGER,
    maintainability_index REAL,
    total_lines INTEGER,
    executable_lines INTEGER,
    comment_lines INTEGER,
    has_sql BOOLEAN DEFAULT 0,
    has_cics BOOLEAN DEFAULT 0,
    parse_timestamp TEXT NOT NULL,
    parser_used TEXT,
    validation_status TEXT CHECK(validation_status IN ('VALID', 'WARNING', 'ERROR')),
    ast_node_count INTEGER,
    has_identification BOOLEAN DEFAULT 0,
    has_environment BOOLEAN DEFAULT 0,
    has_data BOOLEAN DEFAULT 0,
    has_procedure BOOLEAN DEFAULT 0
);

-- Enhanced call graph with metadata
CREATE TABLE IF NOT EXISTS program_calls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    caller_program_id TEXT NOT NULL,
    caller_file_path TEXT NOT NULL,
    called_program_id TEXT NOT NULL,
    call_type TEXT CHECK(call_type IN ('STATIC', 'DYNAMIC')),
    line_number INTEGER,
    using_params TEXT,  -- JSON array
    returning_param TEXT,
    on_exception BOOLEAN DEFAULT 0,
    in_section TEXT,
    in_paragraph TEXT,
    confidence REAL DEFAULT 1.0,
    FOREIGN KEY (caller_file_path) REFERENCES programs(file_path)
);

-- Business rules table
CREATE TABLE IF NOT EXISTS business_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_id TEXT NOT NULL,
    file_path TEXT NOT NULL,
    rule_type TEXT CHECK(rule_type IN ('VALIDATION', 'CALCULATION', 'DECISION', 'TRANSFORMATION')),
    line_number INTEGER,
    condition_text TEXT,
    action_text TEXT,
    business_description TEXT,
    complexity_contribution INTEGER DEFAULT 1,
    confidence REAL DEFAULT 1.0,
    FOREIGN KEY (file_path) REFERENCES programs(file_path)
);

-- Data lineage
CREATE TABLE IF NOT EXISTS data_flows (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_id TEXT NOT NULL,
    file_path TEXT NOT NULL,
    source_field TEXT,
    target_field TEXT,
    transformation TEXT,
    line_number INTEGER,
    flow_type TEXT CHECK(flow_type IN ('MOVE', 'COMPUTE', 'TRANSFORM', 'AGGREGATE', 'INITIALIZE')),
    in_section TEXT,
    in_paragraph TEXT,
    FOREIGN KEY (file_path) REFERENCES programs(file_path)
);

-- Quality metrics
CREATE TABLE IF NOT EXISTS quality_issues (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_id TEXT,
    file_path TEXT NOT NULL,
    issue_type TEXT NOT NULL,
    severity TEXT CHECK(severity IN ('INFO', 'WARNING', 'ERROR', 'CRITICAL')),
    line_number INTEGER,
    description TEXT NOT NULL,
    suggestion TEXT,
    FOREIGN KEY (file_path) REFERENCES programs(file_path)
);

-- Copybook dependencies
CREATE TABLE IF NOT EXISTS copybook_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_file_path TEXT NOT NULL,
    copybook_name TEXT NOT NULL,
    line_number INTEGER,
    replacing_clause TEXT,
    used_fields TEXT,  -- JSON array of fields actually used
    FOREIGN KEY (program_file_path) REFERENCES programs(file_path)
);

-- File I/O operations
CREATE TABLE IF NOT EXISTS file_operations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_id TEXT NOT NULL,
    file_path TEXT NOT NULL,
    logical_file_name TEXT NOT NULL,
    physical_file_name TEXT,
    organization TEXT CHECK(organization IN ('SEQUENTIAL', 'INDEXED', 'RELATIVE', 'LINE SEQUENTIAL')),
    access_mode TEXT CHECK(access_mode IN ('SEQUENTIAL', 'RANDOM', 'DYNAMIC')),
    record_key TEXT,
    alternate_keys TEXT,  -- JSON array
    operations TEXT,  -- JSON array of operations (OPEN, READ, WRITE, etc.)
    line_numbers TEXT,  -- JSON array of line numbers for each operation
    FOREIGN KEY (file_path) REFERENCES programs(file_path)
);

-- Paragraph and section definitions
CREATE TABLE IF NOT EXISTS code_sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_id TEXT NOT NULL,
    file_path TEXT NOT NULL,
    section_type TEXT CHECK(section_type IN ('SECTION', 'PARAGRAPH')),
    section_name TEXT NOT NULL,
    start_line INTEGER,
    end_line INTEGER,
    performs_count INTEGER DEFAULT 0,
    is_performed BOOLEAN DEFAULT 0,
    is_dead_code BOOLEAN DEFAULT 0,
    complexity INTEGER DEFAULT 1,
    FOREIGN KEY (file_path) REFERENCES programs(file_path)
);

-- PERFORM relationships
CREATE TABLE IF NOT EXISTS perform_relationships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_file_path TEXT NOT NULL,
    from_section TEXT NOT NULL,
    to_section TEXT NOT NULL,
    line_number INTEGER,
    perform_type TEXT CHECK(perform_type IN ('SIMPLE', 'TIMES', 'UNTIL', 'VARYING', 'THRU')),
    condition TEXT,
    FOREIGN KEY (program_file_path) REFERENCES programs(file_path)
);

-- Variables and data structures
CREATE TABLE IF NOT EXISTS data_definitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_id TEXT NOT NULL,
    file_path TEXT NOT NULL,
    data_name TEXT NOT NULL,
    level_number INTEGER,
    picture_clause TEXT,
    usage_clause TEXT,
    value_clause TEXT,
    occurs_clause TEXT,
    redefines_clause TEXT,
    section TEXT CHECK(section IN ('FILE', 'WORKING-STORAGE', 'LOCAL-STORAGE', 'LINKAGE')),
    parent_data_name TEXT,
    is_group BOOLEAN DEFAULT 0,
    line_number INTEGER,
    FOREIGN KEY (file_path) REFERENCES programs(file_path)
);

-- Embedded SQL statements
CREATE TABLE IF NOT EXISTS sql_statements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_id TEXT NOT NULL,
    file_path TEXT NOT NULL,
    sql_type TEXT CHECK(sql_type IN ('SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DECLARE', 'OPEN', 'FETCH', 'CLOSE')),
    line_number INTEGER,
    sql_text TEXT,
    tables_used TEXT,  -- JSON array
    host_variables TEXT,  -- JSON array
    in_section TEXT,
    in_paragraph TEXT,
    FOREIGN KEY (file_path) REFERENCES programs(file_path)
);

-- Program entry points
CREATE TABLE IF NOT EXISTS entry_points (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    program_file_path TEXT NOT NULL,
    entry_name TEXT NOT NULL,
    line_number INTEGER,
    using_params TEXT,  -- JSON array
    is_main BOOLEAN DEFAULT 0,
    FOREIGN KEY (program_file_path) REFERENCES programs(file_path)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_programs_program_id ON programs(program_id);
CREATE INDEX IF NOT EXISTS idx_program_calls_caller ON program_calls(caller_program_id);
CREATE INDEX IF NOT EXISTS idx_program_calls_called ON program_calls(called_program_id);
CREATE INDEX IF NOT EXISTS idx_business_rules_program ON business_rules(program_id);
CREATE INDEX IF NOT EXISTS idx_data_flows_program ON data_flows(program_id);
CREATE INDEX IF NOT EXISTS idx_quality_issues_program ON quality_issues(program_id);
CREATE INDEX IF NOT EXISTS idx_copybook_usage_program ON copybook_usage(program_file_path);
CREATE INDEX IF NOT EXISTS idx_file_operations_program ON file_operations(program_id);
CREATE INDEX IF NOT EXISTS idx_code_sections_program ON code_sections(program_id);
CREATE INDEX IF NOT EXISTS idx_perform_relationships_program ON perform_relationships(program_file_path);
CREATE INDEX IF NOT EXISTS idx_data_definitions_program ON data_definitions(program_id);
CREATE INDEX IF NOT EXISTS idx_sql_statements_program ON sql_statements(program_id);

-- Views for analysis
CREATE VIEW IF NOT EXISTS program_complexity_summary AS
SELECT 
    p.program_id,
    p.file_name,
    p.mccabe_complexity,
    p.cognitive_complexity,
    p.total_lines,
    p.executable_lines,
    COUNT(DISTINCT pc.called_program_id) as dependencies_count,
    COUNT(DISTINCT br.id) as business_rules_count,
    COUNT(DISTINCT qi.id) as quality_issues_count
FROM programs p
LEFT JOIN program_calls pc ON p.file_path = pc.caller_file_path
LEFT JOIN business_rules br ON p.file_path = br.file_path
LEFT JOIN quality_issues qi ON p.file_path = qi.file_path
GROUP BY p.program_id;

CREATE VIEW IF NOT EXISTS call_graph_view AS
SELECT 
    pc.caller_program_id,
    pc.called_program_id,
    pc.call_type,
    pc.line_number,
    p1.file_name as caller_file,
    p2.file_name as called_file
FROM program_calls pc
LEFT JOIN programs p1 ON pc.caller_file_path = p1.file_path
LEFT JOIN programs p2 ON pc.called_program_id = p2.program_id;