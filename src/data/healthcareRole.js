// Healthcare / Health Informatics role data.
// Built from current job postings (health data analyst, clinical data analyst,
// health informatics specialist) plus India's ABDM / DPDP requirements.

export const HEALTHCARE_ROLE = {
  title: 'Junior Health Data & Informatics Specialist',
  boomingReason:
    'Hospitals are digitising fast. Health data analyst postings ask for SQL, a BI tool (Power BI or Tableau), EHR data and healthcare data standards, and in India the ABDM programme is pushing every provider toward FHIR-based records and DPDP-compliant consent.',
  beginnerPhilosophy:
    'You do not need to be a doctor or a programmer on day one. Learn the language of healthcare data first (terminology and codes), then privacy rules, then Excel and SQL, then dashboards, and finally the interoperability standards (FHIR / ABDM) that make you stand out.',

  portfolioProjects: [
    {
      id: 'hc-proj-1',
      title: 'De-identified Patient Intake & Clinical Spreadsheet Tracker',
      difficulty: 'Beginner (Step 1-3)',
      timeToBuild: '4-5 days',
      requiredSkills: [
        'Medical Terminology & Clinical Coding (ICD-10, SNOMED CT, LOINC)',
        'Health Data Privacy & Compliance (HIPAA + India DPDP Act)',
        'Spreadsheet Analysis for Clinical Data',
      ],
      description:
        'A spreadsheet that models clinic appointments, insurance status and ICD-10 diagnosis categories using fully synthetic patients, with identifiers removed and formulas that flag incomplete records.',
      whyRecruitersLoveIt:
        'Shows you understand medical codes, privacy rules and clean data handling, which is the day-one work of most health data analyst roles.',
      techStack: ['Excel / Google Sheets', 'ICD-10 code lists', 'Synthea synthetic data'],
      keyFeatures: [
        'Synthetic patient records only (never real patient data)',
        'Identifiers removed or generalised following HIPAA Safe Harbor and DPDP data-minimisation ideas',
        'Formula checks for missing insurance IDs and impossible dates',
        'Pivot summary of top diagnoses per age band',
      ],
      githubTemplate: 'https://github.com/synthetichealth/synthea',
    },
    {
      id: 'hc-proj-2',
      title: '30-Day Readmission Analysis with SQL',
      difficulty: 'Intermediate (Step 3-4)',
      timeToBuild: '1-2 weeks',
      requiredSkills: [
        'Spreadsheet Analysis for Clinical Data',
        'SQL for Healthcare Data',
      ],
      description:
        'Load a synthetic patient database (Synthea) into SQLite or PostgreSQL and write queries that find patients readmitted within 30 days, average length of stay, and the most common chronic conditions.',
      whyRecruitersLoveIt:
        'Postings for health data analysts list strong SQL with joins, window functions and common table expressions on clinical tables (encounters, diagnoses, medications).',
      techStack: ['SQL (SQLite / PostgreSQL)', 'Synthea CSV export', 'Window functions & CTEs'],
      keyFeatures: [
        'Joins across patients, encounters, conditions and medications',
        'Window functions (LAG / ROW_NUMBER) to detect repeat admissions',
        'A written summary of findings for a non-technical manager',
      ],
      githubTemplate: 'https://github.com/topics/healthcare-data-analysis',
    },
    {
      id: 'hc-proj-3',
      title: 'Hospital Quality Dashboard (Power BI or Tableau)',
      difficulty: 'Intermediate (Step 4-5)',
      timeToBuild: '1-2 weeks',
      requiredSkills: [
        'SQL for Healthcare Data',
        'Healthcare Dashboards (Power BI / Tableau)',
      ],
      description:
        'An interactive dashboard on public hospital quality data showing readmission rates, average length of stay and patient volumes, with filters by department and month.',
      whyRecruitersLoveIt:
        'BI dashboards for operations, quality and revenue reporting are the most common deliverable in healthcare analyst job descriptions.',
      techStack: ['Power BI Desktop or Tableau Public', 'Public hospital data (CMS / open data)', 'SQL'],
      keyFeatures: [
        'KPI cards: readmission rate, ALOS, patient volume',
        'Drill-down by department, month and age group',
        'One-page executive summary of insights',
      ],
      githubTemplate: 'https://github.com/topics/healthcare-analytics',
    },
    {
      id: 'hc-proj-4',
      title: 'FHIR Patient Viewer (HAPI FHIR test server)',
      difficulty: 'Advanced (Step 7)',
      timeToBuild: '1-2 weeks',
      requiredSkills: [
        'Interoperability: HL7 FHIR & India ABDM',
        'EHR Systems & Clinical Data Models',
      ],
      description:
        'A small web page or Python script that reads Patient, Observation and Condition resources from the public HAPI FHIR test server and shows a simple patient summary.',
      whyRecruitersLoveIt:
        'Few beginners can show working FHIR code. It proves you understand how records move between hospital systems, which India\'s ABDM requires.',
      techStack: ['HAPI FHIR public test server', 'JavaScript or Python', 'Postman'],
      keyFeatures: [
        'Search patients and fetch their Observations (labs, vitals)',
        'Show conditions using SNOMED CT / ICD-10 codes',
        'Uses test data only. Never put real patient data on a public server.',
      ],
      githubTemplate: 'https://github.com/topics/fhir',
    },
  ],

  skills: {
    critical: [
      {
        skill: 'Medical Terminology & Clinical Coding (ICD-10, SNOMED CT, LOINC)',
        keywords: ['medical terminology', 'icd-10', 'icd10', 'icd', 'cpt', 'snomed', 'loinc', 'medical coding', 'clinical coding', 'coding'],
        yourLevel: 0,
        required: 80,
        time: '2 weeks',
        priority: 'Critical',
        stepNumber: 1,
        shortDesc: 'Read and use the standard codes every healthcare dataset depends on: ICD-10 (diagnoses), CPT (procedures), SNOMED CT (clinical terms) and LOINC (lab tests).',
        tip: 'Learn the structure of ICD-10 codes (letter + digits) so you can group diagnoses into categories in any dataset.',
        mentorNote: 'You do not have to memorise codes. You need to know what each code system is for and how to look codes up.',
        suggestedResources: [
          { name: 'WHO ICD-10 online browser', type: 'Official Code Lookup', topic: 'Browse chapters and blocks, and practise finding the code for a diagnosis' },
          { name: 'SNOMED CT browser', type: 'Official Terminology Tool', topic: 'See how clinical concepts are linked and why records use SNOMED' },
          { name: 'LOINC search', type: 'Lab Code Lookup', topic: 'Find codes for lab tests such as HbA1c and haemoglobin' },
        ],
        suggestedSearch: 'ICD-10 SNOMED CT LOINC explained for beginners health data',
        lessonSteps: [
          { title: 'Four code systems, four jobs', desc: 'ICD-10 labels diagnoses, CPT labels procedures for billing, SNOMED CT labels clinical findings in detail, LOINC labels lab tests and observations.' },
          { title: 'Group codes into categories', desc: 'Most reports group codes into chapters (for example E10-E14 for diabetes). Practise grouping a list of diagnoses.', code: "// Example: group ICD-10 codes by their first letter\nconst chapter = (code) => code[0]; // 'E11.9' -> 'E' (endocrine)" },
        ],
        quiz: {
          question: 'Which code system is mainly used to identify laboratory tests and observations?',
          options: ['LOINC', 'ICD-10', 'CPT', 'HIPAA'],
          correctIndex: 0,
        },
      },
      {
        skill: 'Health Data Privacy & Compliance (HIPAA + India DPDP Act)',
        keywords: ['hipaa', 'dpdp', 'privacy', 'phi', 'compliance', 'data protection', 'gdpr', 'abdm consent'],
        yourLevel: 0,
        required: 80,
        time: '1 week',
        priority: 'Critical',
        stepNumber: 2,
        shortDesc: 'Know what counts as protected health data, how to de-identify it, and the basics of consent under HIPAA (US employers) and India\'s DPDP Act 2023.',
        tip: 'Under India\'s DPDP Act the hospital is usually the data fiduciary and its software vendor the data processor. Employers will expect you to know who is responsible for what.',
        mentorNote: 'Privacy questions come up in almost every healthcare interview. A simple, correct answer beats a long, vague one.',
        suggestedResources: [
          { name: 'HHS.gov HIPAA Privacy Rule summary', type: 'Official US Government Guide', topic: 'PHI, Safe Harbor de-identification and minimum necessary use' },
          { name: 'DPDP Act 2023 and Rules (MeitY)', type: 'Official Indian Law', topic: 'Consent, data fiduciary duties, breach notification and penalties' },
          { name: 'ABDM Health Data Management Policy', type: 'Official Indian Policy', topic: 'Consent-based sharing of health records through ABHA' },
        ],
        suggestedSearch: 'HIPAA Safe Harbor 18 identifiers and India DPDP Act health data explained',
        lessonSteps: [
          { title: 'What is protected data?', desc: 'Anything that can identify a patient together with their health information: names, phone numbers, full dates, record numbers, addresses.' },
          { title: 'Consent and minimisation', desc: 'Collect only what you need, use it only for the stated purpose, and let people withdraw consent. ABDM and DPDP both work this way.' },
        ],
        quiz: {
          question: 'Under India\'s DPDP Act, who is normally responsible for protecting patient data?',
          options: ['The hospital (data fiduciary)', 'Only the patient', 'Only the software vendor', 'Nobody, health data is exempt'],
          correctIndex: 0,
        },
      },
      {
        skill: 'Spreadsheet Analysis for Clinical Data',
        keywords: ['excel', 'google sheets', 'sheets', 'pivot', 'pivot tables', 'xlookup', 'vlookup', 'spreadsheet'],
        yourLevel: 0,
        required: 80,
        time: '2 weeks',
        priority: 'Critical',
        stepNumber: 3,
        shortDesc: 'Clean messy patient data, look up codes with XLOOKUP, and build pivot tables for diagnoses, departments and visits.',
        tip: 'Always work on synthetic or de-identified data. Never practise on real patient records.',
        suggestedResources: [
          { name: 'Microsoft Excel training (Microsoft Learn / Support)', type: 'Official Tutorials', topic: 'XLOOKUP, pivot tables, conditional formatting' },
          { name: 'Synthea synthetic patient data', type: 'Free Practice Dataset', topic: 'Realistic fake patient records for Excel and SQL practice' },
        ],
        suggestedSearch: 'Excel pivot tables XLOOKUP data cleaning tutorial for analysts',
      },
      {
        skill: 'SQL for Healthcare Data',
        keywords: ['sql', 'mysql', 'postgres', 'postgresql', 'sqlite', 'sql server', 't-sql', 'joins', 'queries', 'database'],
        yourLevel: 0,
        required: 85,
        time: '3 weeks',
        priority: 'Critical',
        stepNumber: 4,
        shortDesc: 'Write joins, aggregations, window functions and CTEs on clinical tables such as patients, encounters, diagnoses, labs and medications.',
        tip: 'Job postings for health data analysts repeatedly ask for window functions, CTEs and query optimisation. Practise those, not just SELECT.',
        mentorNote: 'Think in clinical questions first ("who was readmitted within 30 days?"), then translate them into SQL.',
        suggestedResources: [
          { name: 'Mode SQL Tutorial', type: 'Interactive SQL Practice', topic: 'Joins, aggregations and window functions' },
          { name: 'Synthea synthetic patient data', type: 'Practice Database', topic: 'Load encounters, conditions and medications into SQLite or PostgreSQL' },
          { name: 'MIMIC-IV demo (PhysioNet)', type: 'Open Clinical Dataset', topic: 'Real-style ICU data with a free demo version (check its access terms)' },
        ],
        suggestedSearch: 'SQL window functions and CTEs tutorial healthcare patient encounters',
        lessonSteps: [
          { title: 'Clinical tables you will meet', desc: 'Patients, encounters (visits), diagnoses, procedures, labs, medications. Most questions need two or three of these joined.' },
          { title: 'Find repeat admissions', desc: 'Use LAG() to compare each admission date with the same patient\'s previous one.', code: 'SELECT patient_id, admit_date,\n  LAG(discharge_date) OVER (PARTITION BY patient_id ORDER BY admit_date) AS prev_discharge\nFROM encounters;' },
        ],
        quiz: {
          question: 'Which SQL feature lets you compare each patient visit with that patient\'s previous visit?',
          options: ['A window function such as LAG()', 'DROP TABLE', 'ORDER BY alone', 'LIMIT 1'],
          correctIndex: 0,
        },
      },
    ],
    important: [
      {
        skill: 'Healthcare Dashboards (Power BI / Tableau)',
        keywords: ['power bi', 'powerbi', 'tableau', 'looker', 'dashboards', 'dashboard', 'dax', 'bi', 'data visualization'],
        yourLevel: 0,
        required: 75,
        time: '3 weeks',
        priority: 'Important',
        stepNumber: 5,
        shortDesc: 'Build dashboards for readmissions, length of stay, patient volume and wait times. Power BI or Tableau is named in most analyst postings.',
        suggestedResources: [
          { name: 'Microsoft Learn: Power BI', type: 'Free Official Course', topic: 'Data modelling, DAX basics and report design' },
          { name: 'Tableau Public', type: 'Free Tool and Gallery', topic: 'Build and publish a dashboard for your portfolio' },
          { name: 'CMS hospital quality datasets', type: 'Public Data', topic: 'Real hospital quality measures to practise on' },
        ],
        suggestedSearch: 'Power BI healthcare dashboard tutorial readmission length of stay',
      },
      {
        skill: 'EHR Systems & Clinical Data Models',
        keywords: ['ehr', 'emr', 'epic', 'cerner', 'openmrs', 'clinical data model', 'his', 'hmis', 'hospital information system', 'data warehouse'],
        yourLevel: 0,
        required: 70,
        time: '2 weeks',
        priority: 'Important',
        stepNumber: 6,
        shortDesc: 'Understand how electronic health record systems store data (Epic Clarity and Caboodle are named often in postings) and how a hospital data warehouse is organised.',
        tip: 'Epic certification is generally obtained through an employer, so you can\'t realistically buy it yourself. Learn the concepts with open-source OpenMRS instead.',
        suggestedResources: [
          { name: 'OpenMRS demo system', type: 'Open-source EHR Sandbox', topic: 'Click through patient charts, visits and orders' },
          { name: 'Synthea data dictionary', type: 'Data Model Reference', topic: 'How patients, encounters and conditions relate to each other' },
        ],
        suggestedSearch: 'Epic Clarity Caboodle explained EHR data warehouse for beginners',
      },
      {
        skill: 'Interoperability: HL7 FHIR & India ABDM',
        keywords: ['fhir', 'hl7', 'abdm', 'abha', 'ndhm', 'interoperability', 'hapi'],
        yourLevel: 0,
        required: 70,
        time: '3 weeks',
        priority: 'Important',
        stepNumber: 7,
        shortDesc: 'Learn FHIR R4 resources (Patient, Observation, Condition) and how India\'s ABDM uses them with ABHA IDs and consent-based record sharing.',
        tip: 'FHIR is a set of web APIs that return JSON. If you know basic REST, you can start reading FHIR today with the HAPI FHIR public test server.',
        mentorNote: 'ABDM names three roles: Health Information Provider (hospital or lab), Health Information User, and the consent manager in between.',
        suggestedResources: [
          { name: 'HL7 FHIR documentation (R4)', type: 'Official Standard', topic: 'Resources, search parameters and JSON examples' },
          { name: 'HAPI FHIR public test server', type: 'Free Practice Server', topic: 'Send real FHIR requests against test data' },
          { name: 'NRCeS ABDM FHIR Implementation Guide', type: 'Official Indian Profile', topic: 'India-specific FHIR profiles used by ABDM-compliant systems' },
        ],
        suggestedSearch: 'HL7 FHIR R4 tutorial beginners and ABDM ABHA integration',
        lessonSteps: [
          { title: 'Resources', desc: 'FHIR splits health data into small resources such as Patient, Observation, Condition and Encounter, each a JSON document with a standard shape.' },
          { title: 'Try a request', desc: 'Fetch patients from the public HAPI test server.', code: "fetch('https://hapi.fhir.org/baseR4/Patient?_count=3')\n  .then(r => r.json())\n  .then(bundle => console.log(bundle.entry));" },
        ],
        quiz: {
          question: 'What does FHIR mainly provide?',
          options: ['A standard format and API for exchanging health records', 'A spreadsheet formula', 'A billing code list', 'A hospital building plan'],
          correctIndex: 0,
        },
      },
    ],
    niceToHave: [
      {
        skill: 'Python for Health Data (Pandas)',
        keywords: ['python', 'pandas', 'numpy', 'jupyter', 'data cleaning', 'r'],
        yourLevel: 0,
        required: 65,
        time: '3 weeks',
        priority: 'Nice to Have',
        stepNumber: 8,
        shortDesc: 'Clean and analyse large clinical files with Pandas. Many analyst postings list Python next to SQL.',
        suggestedResources: [
          { name: 'Kaggle Learn: Pandas', type: 'Free Interactive Course', topic: 'DataFrames, grouping and cleaning' },
        ],
        suggestedSearch: 'Pandas tutorial for healthcare data analysis',
      },
      {
        skill: 'Healthcare Quality Metrics & Claims Basics',
        keywords: ['hedis', 'quality metrics', 'claims', 'revenue cycle', 'readmission', 'insurance', 'pmjay', 'pm-jay', 'nabh'],
        yourLevel: 0,
        required: 60,
        time: '2 weeks',
        priority: 'Nice to Have',
        stepNumber: 9,
        shortDesc: 'Understand common measures (30-day readmission, average length of stay, HEDIS) and how insurance claims work. In India, learn the basics of PM-JAY claims and NABH accreditation.',
        suggestedResources: [
          { name: 'NCQA HEDIS overview', type: 'Quality Measure Standard', topic: 'What HEDIS measures and why insurers report it' },
          { name: 'NABH standards overview', type: 'Indian Accreditation Body', topic: 'Quality and digital-record expectations for hospitals' },
        ],
        suggestedSearch: 'HEDIS measures and hospital readmission rate explained',
      },
    ],
  },

  weeklyPlan: [
    {
      week: 1, title: 'Step 1: Medical Terminology & Clinical Coding',
      days: [
        { day: 'Mon', task: 'Learn the healthcare data journey: clinic, hospital, lab, insurer (1.5 hrs)', done: false },
        { day: 'Tue', task: 'Medical terminology basics: prefixes, suffixes, body systems (2 hrs)', done: false },
        { day: 'Wed', task: 'ICD-10: chapters, structure, and look up 15 diagnoses in the WHO browser (2 hrs)', done: false },
        { day: 'Thu', task: 'CPT, SNOMED CT and LOINC: what each is for, with 5 lookups each (2 hrs)', done: false },
        { day: 'Fri', task: 'Mini quiz: match 20 records to the right code system (1.5 hrs)', done: false },
      ],
    },
    {
      week: 2, title: 'Step 2: Health Data Privacy (HIPAA + India DPDP Act)',
      days: [
        { day: 'Mon', task: 'Read the HIPAA Privacy Rule summary and list what counts as PHI (1.5 hrs)', done: false },
        { day: 'Tue', task: 'Memorise the idea behind the 18 Safe Harbor identifiers (1.5 hrs)', done: false },
        { day: 'Wed', task: 'Read a DPDP Act 2023 explainer: consent, data fiduciary, breach duties (2 hrs)', done: false },
        { day: 'Thu', task: 'Read about ABDM consent: HIP, HIU and consent artefacts (1.5 hrs)', done: false },
        { day: 'Fri', task: 'Case study: review a fake patient list and mark what must be removed (2 hrs)', done: false },
      ],
    },
    {
      week: 3, title: 'Step 3: Spreadsheet Analysis for Clinical Data',
      days: [
        { day: 'Mon', task: 'Download Synthea sample CSVs and inspect them in Excel (1.5 hrs)', done: false },
        { day: 'Tue', task: 'Clean data: trim spaces, fix date formats, remove duplicates (2 hrs)', done: false },
        { day: 'Wed', task: 'Use XLOOKUP to attach diagnosis categories to patients (2 hrs)', done: false },
        { day: 'Thu', task: 'Build pivot tables: visits per department and top diagnoses by age band (2 hrs)', done: false },
        { day: 'Fri', task: 'Finish the Patient Intake & Clinical Spreadsheet portfolio project (2 hrs)', done: false },
      ],
    },
    {
      week: 4, title: 'Step 4: SQL for Healthcare Data (Part 1)',
      days: [
        { day: 'Mon', task: 'Install SQLite or PostgreSQL and load the Synthea tables (1.5 hrs)', done: false },
        { day: 'Tue', task: 'SELECT, WHERE, ORDER BY on patients and encounters (1.5 hrs)', done: false },
        { day: 'Wed', task: 'GROUP BY: visits per condition, average age per diagnosis (2 hrs)', done: false },
        { day: 'Thu', task: 'JOINs: patients to encounters to conditions (2 hrs)', done: false },
        { day: 'Fri', task: 'Practice set: 10 clinical questions answered in SQL (2 hrs)', done: false },
      ],
    },
    {
      week: 5, title: 'Step 4: SQL for Healthcare Data (Part 2)',
      days: [
        { day: 'Mon', task: 'CTEs: break a long query into readable steps (1.5 hrs)', done: false },
        { day: 'Tue', task: 'Window functions: ROW_NUMBER and RANK for top patients per clinic (2 hrs)', done: false },
        { day: 'Wed', task: 'LAG(): find repeat admissions in the same patient (2 hrs)', done: false },
        { day: 'Thu', task: 'Flag readmissions within 30 days of discharge (2 hrs)', done: false },
        { day: 'Fri', task: 'Finish the 30-Day Readmission Analysis project and write the summary (2 hrs)', done: false },
      ],
    },
    {
      week: 6, title: 'Step 5: Healthcare Dashboards (Power BI / Tableau)',
      days: [
        { day: 'Mon', task: 'Install Power BI Desktop or open Tableau Public and import your SQL results (1 hr)', done: false },
        { day: 'Tue', task: 'Model tables and relationships between patients and encounters (2 hrs)', done: false },
        { day: 'Wed', task: 'Build KPI cards: readmission rate, ALOS, patient volume (2 hrs)', done: false },
        { day: 'Thu', task: 'Add filters for department and month, and a trend chart (2 hrs)', done: false },
        { day: 'Fri', task: 'Publish the dashboard and write a short executive summary (2 hrs)', done: false },
      ],
    },
    {
      week: 7, title: 'Step 6: EHR Systems & Clinical Data Models',
      days: [
        { day: 'Mon', task: 'Explore the OpenMRS demo: patient chart, visits, orders (1.5 hrs)', done: false },
        { day: 'Tue', task: 'Learn how EHR data flows into a data warehouse (Clarity / Caboodle concepts) (1.5 hrs)', done: false },
        { day: 'Wed', task: 'Draw a simple data model: patient, encounter, diagnosis, lab, medication (2 hrs)', done: false },
        { day: 'Thu', task: 'Read a real health data analyst job post and list the tools it asks for (1.5 hrs)', done: false },
        { day: 'Fri', task: 'Map your Synthea tables to your drawn model (2 hrs)', done: false },
      ],
    },
    {
      week: 8, title: 'Step 7: Interoperability: HL7 FHIR & India ABDM',
      days: [
        { day: 'Mon', task: 'Read the FHIR overview: resources, JSON, REST (1.5 hrs)', done: false },
        { day: 'Tue', task: 'Fetch Patient and Observation resources from the HAPI FHIR test server (2 hrs)', done: false },
        { day: 'Wed', task: 'Learn ABDM basics: ABHA, HIP, HIU, consent manager (1.5 hrs)', done: false },
        { day: 'Thu', task: 'Read how the NRCeS ABDM FHIR profiles extend base FHIR (2 hrs)', done: false },
        { day: 'Fri', task: 'Build the FHIR Patient Viewer portfolio project (2 hrs)', done: false },
      ],
    },
    {
      week: 9, title: 'Step 8: Python & Step 9: Quality Metrics + Mock Interviews',
      days: [
        { day: 'Mon', task: 'Pandas basics: load a Synthea CSV and clean it (2 hrs)', done: false },
        { day: 'Tue', task: 'Group and summarise: diagnoses by age band in Pandas (2 hrs)', done: false },
        { day: 'Wed', task: 'Learn readmission rate, ALOS and HEDIS in plain language (1.5 hrs)', done: false },
        { day: 'Thu', task: 'Learn the basics of claims, PM-JAY and NABH (1.5 hrs)', done: false },
        { day: 'Fri', task: 'Complete the healthcare mock interview set (2 hrs)', done: false },
      ],
    },
  ],

  mockInterview: [
    {
      id: 1,
      question: 'What is the difference between ICD-10, CPT, SNOMED CT and LOINC?',
      type: 'Healthcare Data Standards',
      keywords: ['icd-10', 'diagnos', 'cpt', 'procedure', 'billing', 'snomed', 'clinical', 'loinc', 'lab'],
      rubric: ['ICD-10 is for diagnoses', 'CPT is for procedures and billing', 'SNOMED CT is a detailed clinical vocabulary', 'LOINC is for lab tests and observations'],
      idealAnswer: 'ICD-10 classifies diagnoses and is widely used for statistics and claims. CPT codes procedures and services, mainly for billing in the US. SNOMED CT is a detailed clinical terminology used inside records, so findings can be shared and analysed consistently. LOINC identifies laboratory tests and observations, for example a specific blood glucose test.',
    },
    {
      id: 2,
      question: 'How would you de-identify a patient dataset before analysing it?',
      type: 'Privacy & Compliance',
      keywords: ['identifier', 'name', 'date', 'address', 'phone', 'safe harbor', 'consent', 'minimi', 'dpdp', 'hipaa'],
      rubric: ['Removes direct identifiers such as names, phone numbers and record numbers', 'Generalises dates and locations', 'Mentions HIPAA Safe Harbor or DPDP data minimisation and consent', 'Uses only the data needed for the purpose'],
      idealAnswer: 'I would first confirm I need the data at all, and take only the fields required. Then I would remove direct identifiers such as names, phone numbers, addresses and record numbers, and generalise dates to the year. In the US that follows the HIPAA Safe Harbor method; in India I would also follow DPDP principles of consent, purpose limitation and data minimisation, remembering the hospital is the data fiduciary.',
    },
    {
      id: 3,
      question: 'Write or describe a SQL query to find patients readmitted within 30 days of discharge.',
      type: 'Technical SQL',
      keywords: ['lag', 'window', 'partition', 'discharge', 'admit', 'join', 'datediff', '30', 'encounter'],
      rubric: ['Identifies the encounters table with admit and discharge dates', 'Uses a self-join or LAG() partitioned by patient', 'Compares the next admission date to the previous discharge date', 'Filters for a gap of 30 days or less'],
      idealAnswer: 'From the encounters table, I would use LAG(discharge_date) OVER (PARTITION BY patient_id ORDER BY admit_date) to get each patient\'s previous discharge. Then I would keep rows where admit_date minus that previous discharge is 30 days or less. I would also check for transfers and planned readmissions so the rate is not overstated.',
    },
    {
      id: 4,
      question: 'What is FHIR, and how does India\'s ABDM use it?',
      type: 'Interoperability',
      keywords: ['fhir', 'api', 'json', 'resource', 'abdm', 'abha', 'consent', 'hip', 'interoperab'],
      rubric: ['Explains FHIR as a standard for exchanging health data through APIs', 'Mentions resources such as Patient and Observation', 'Mentions ABDM, ABHA and consent-based sharing', 'Mentions the HIP and HIU roles'],
      idealAnswer: 'FHIR is an HL7 standard that represents health data as small resources, such as Patient or Observation, exchanged as JSON over web APIs. ABDM uses FHIR R4 with India-specific profiles. A hospital or lab acts as a Health Information Provider, a user app as a Health Information User, and records are shared only through a patient\'s consent, linked by their ABHA ID.',
    },
    {
      id: 5,
      question: 'A hospital manager says readmissions look high. How would you investigate with data?',
      type: 'Analytical Thinking',
      keywords: ['define', 'metric', 'segment', 'department', 'diagnosis', 'age', 'trend', 'data quality', 'dashboard', 'compare'],
      rubric: ['Confirms the metric definition and data quality first', 'Segments by department, diagnosis, age and period', 'Compares with a benchmark or past trend', 'Presents findings clearly to a non-technical audience'],
      idealAnswer: 'I would first confirm how readmission is defined and check the data for errors or duplicates. Then I would break the rate down by department, diagnosis, age band and month to see where it is concentrated, and compare it with earlier periods or a benchmark. I would summarise the findings in a simple dashboard and flag the likely drivers for the clinical team to review.',
    },
  ],
};
