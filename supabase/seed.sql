-- Seed data from https://portfolio-adhitama.vercel.app/

INSERT INTO profile (name, title, bio, location, email, phone, linkedin_url, github_url, cv_url, avatar_url) VALUES (
  'Adhitama Wichaksono',
  'Data Analyst & Backend Developer',
  'Bachelor of Informatics graduate from Telkom University with a strong interest in Data Analytics, Machine Learning, Web Development, and Backend Development. Skilled in Python, PHP, Golang, and data visualization with Power BI.',
  'Jakarta, Indonesia',
  'adhit1312@gmail.com',
  '+62 812-9058-6078',
  'https://linkedin.com/in/adhitama-wichaksono-15b56b199',
  'https://github.com/adhitamaw',
  '/assets/CV_Adhitama Wichaksono ATS.pdf',
  '/assets/profile.jpg'
);

-- Work Experience
INSERT INTO experiences (category, title, organization, location, period_start, period_end, highlights, sort_order) VALUES
('work', 'Software Engineer (Internship)', 'PT. Multi Utama Consultindo (MUC Consulting)', 'Jakarta, Indonesia', 'May 2026', 'Present',
 '["Developed a Web App GIR Reporting System to automate OECD Pillar Two GloBE Information Return XML generation for multinational clients by implementing validation rules aligned with the OECD GIR XML Schema", "Designed a normalized 3NF database with a centralized REST API architecture for tax reporting workflows"]', 1),
('work', 'Data Analyst Fleet Management (Internship)', 'PT. Toyota-Astra Motor', 'Jakarta, Indonesia', 'October 2025', 'December 2025',
 '["Developed and maintained Sales & Aftersales dashboards using Power BI to monitor fleet sales performance, sales trends, and operational KPIs", "Optimized dashboard performance by reducing loading time from ~45 seconds to 10 seconds through data model improvements, removal of unnecessary calculated columns, and DAX optimization", "Designed and implemented a Python-based data cleaning pipeline to automate preprocessing and improve data accuracy and consistency across multiple sources", "Performed regular data updates to ensure data quality and support ongoing operational and business analysis activities"]', 2),
('work', 'Backend Developer (Internship)', 'Badan Pengusahaan Batam (BP Batam)', 'Batam, Indonesia', 'June 2024', 'August 2024',
 '["Developed RESTful APIs using PHP to support data management for the SPPD Mobile system (Surat Perintah Perjalanan Dinas)", "Designed the SPPD Mobile database using MySQL with integrated relational tables to store application data", "Implemented API security via parameterized queries to prevent SQL injection, CORS configuration, and structured JSON response standards"]', 3),
('work', 'AI Integration In Backend Application Development (Independent Study Program)', 'Ruangguru, Kampus Merdeka (MSIB 6)', 'Remote', 'February 2024', 'June 2024',
 '["Developed RESTful backend services using Golang, applying clean architecture principles, middleware, and error handling", "Designed and optimized a PostgreSQL database through normalization, indexing, and query optimization (JOINs), integrated via ORM (GORM) for efficient data management", "Implemented JWT-based authentication and authorization to secure application endpoints"]', 4);

-- Education
INSERT INTO experiences (category, title, organization, location, period_start, period_end, description, highlights, sort_order) VALUES
('education', 'Bachelor of Informatics', 'Telkom University, Bandung', 'Bandung, Indonesia', '2021', '2025', 'GPA: 3.34/4.00',
 '["Data Visualization", "Backend Engineering", "Database Systems", "Machine Learning", "Software Engineering", "Cyber Security", "Computer Networks"]', 1);

-- Leadership
INSERT INTO experiences (category, title, organization, location, period_start, period_end, highlights, sort_order) VALUES
('leadership', 'Logistics Division Staff', 'Carnival HIMAIF (Informatics, Telkom University)', 'Telkom University', 'October 2023', 'November 2023',
 '["Managed venue permits and assisted in coordinating logistics operations (procurement, vendor management, and event supply distribution)", "Collaborated with multiple divisions and external parties to ensure events ran on time and within budget"]', 1),
('leadership', 'Logistics Division Staff', 'Batavia On Telkom (Cultural Festival)', 'Telkom University', 'October 2022', 'June 2023',
 '["Handled venue permits and vendor coordination to support event execution", "Managed procurement and logistics needs to ensure smooth multi-day event operations"]', 2);

-- Certifications
INSERT INTO experiences (category, title, organization, period_start, sort_order) VALUES
('certification', 'Becoming Data Engineer : Teori, Praktek dan Mini Project', 'Dunia Coding', '2026', 1),
('certification', 'Data Analytics and Visualization Bootcamp', 'Dsarea', '2026', 2),
('certification', 'Introduction to Data Analytics', 'RevoU Mini Course', '2026', 3),
('certification', 'IEEE 9th International Conference on Software Engineering & Computer Systems (ICSECS) - Published Author', 'IEEE ICSECS', '2025', 4),
('certification', 'Laravel 11 Web Developer Bootcamp', 'Sanbercode', '2025', 5),
('certification', 'Kampus Merdeka MSIB Batch 6 - AI Integration in Backend Application Development', 'Ruangguru', '2024', 6);

-- Publications
INSERT INTO experiences (category, title, organization, period_start, description, sort_order) VALUES
('publication', 'Network Anomaly Detection for Intrusion Detection Systems Using Q-Learning and Deep Q-Learning', 'IEEE ICSECS Conference', '2025',
 'Research evaluating Q-Learning and Deep Q-Learning (DQN) for adaptive network anomaly detection using the UNSW-NB15 dataset.', 1);

-- Skill Groups & Skills
INSERT INTO skill_groups (name, icon, sort_order) VALUES
('Tools & Programming', 'code', 1),
('Data & Analytics', 'analytics', 2),
('Data Visualization', 'chart', 3),
('Database', 'database', 4),
('Data Engineering', 'pipeline', 5),
('Web & Backend', 'api', 6),
('Development Tools', 'tools', 7),
('Languages', 'languages', 8);

INSERT INTO skills (group_id, name, sort_order)
SELECT id, unnest(ARRAY['Python','SQL','Golang','PHP']), generate_series(1,4)
FROM skill_groups WHERE name = 'Tools & Programming';

INSERT INTO skills (group_id, name, sort_order)
SELECT id, unnest(ARRAY['Exploratory Data Analysis (EDA)','Data Cleaning','Data Preprocessing','Predictive Analytics','Reporting','Excel']), generate_series(1,6)
FROM skill_groups WHERE name = 'Data & Analytics';

INSERT INTO skills (group_id, name, sort_order)
SELECT id, unnest(ARRAY['Power BI','Dashboard Development','Data Storytelling']), generate_series(1,3)
FROM skill_groups WHERE name = 'Data Visualization';

INSERT INTO skills (group_id, name, sort_order)
SELECT id, unnest(ARRAY['MySQL','PostgreSQL']), generate_series(1,2)
FROM skill_groups WHERE name = 'Database';

INSERT INTO skills (group_id, name, sort_order)
SELECT id, unnest(ARRAY['Data Pipeline Development','ETL','Data Scraping','REST API Integration']), generate_series(1,4)
FROM skill_groups WHERE name = 'Data Engineering';

INSERT INTO skills (group_id, name, sort_order)
SELECT id, unnest(ARRAY['Laravel','Golang']), generate_series(1,2)
FROM skill_groups WHERE name = 'Web & Backend';

INSERT INTO skills (group_id, name, sort_order)
SELECT id, unnest(ARRAY['Visual Studio Code','GitHub']), generate_series(1,2)
FROM skill_groups WHERE name = 'Development Tools';

INSERT INTO skills (group_id, name, sort_order)
SELECT id, unnest(ARRAY['English','Indonesia']), generate_series(1,2)
FROM skill_groups WHERE name = 'Languages';

-- Projects
INSERT INTO projects (title, subtitle, description, tags, year, project_url, doc_url, image_url, featured, sort_order) VALUES
('Fleet Sales Dashboard Power BI', 'Toyota Astra Motor Internship Project | Power BI',
 'Built a comprehensive dashboard to monitor Toyota Fleet sales performance, providing visualizations of sales target achievement, period-over-period comparisons, and in-depth analysis by customer segment and vehicle model.',
 '["Microsoft Power BI","Data Analytics","Data Visualization"]', '2025', NULL,
 '/assets/Adhitama - Portofolio_Project_Power_BI_Fleet_Sales_Dashboard copy.pdf', '/assets/fleet-thumb.jpg', true, 1),
('Car Sales Performance Dashboard', 'Data Analytics & Visualization Project | Power BI',
 'Built comprehensive Power BI dashboard tracking total sales, revenue, customer metrics, and trend analysis. Implemented dynamic filters and drill-down capabilities for granular performance insights across regions and time periods.',
 '["Microsoft Power BI","Python","Microsoft Excel","Critical Thinking"]', '2026', NULL,
 '/assets/Data Analyst Car Sales Portofolio_compressed.pdf', '/assets/car-thumb.jpg', true, 2),
('Bakery Sales Data Analysis', 'RevoU Mini Course Project – Intro to Data Analytics | Excel',
 'Analyzed bakery transaction data for January 2021 to identify peak sales periods and best-selling products. Provided data-driven recommendations to optimize weekend production and improve inventory management.',
 '["Data Analytics","Data Analysis","Data Visualization","Microsoft Excel","Spreadsheets"]', '2026', NULL,
 '/assets/Adhitama Wichaksono_Analisis Tren Penjualan Bakery.pdf', '/assets/bakery-thumb.jpg', true, 3),
('Network Anomaly Detection for Intrusion Detection Systems', 'IEEE ICSECS Conference',
 'Research evaluating Q-Learning and Deep Q-Learning (DQN) for adaptive network anomaly detection using the UNSW-NB15 dataset. DQN achieved 99.09% accuracy and 0.9918 F1-score.',
 '["Python","Machine Learning","Deep Q-Learning","SMOTE-Tomek"]', '2025',
 'https://github.com/adhitamaw/Anomaly-Detection-using-Reinforcement-Learning',
 '/assets/Conference Adhit icsecs 2025 (4)_compressed.pdf', '/assets/conf-thumb.jpg', true, 4),
('SPPD Mobile – BP Batam', 'BP Batam Internship Project',
 'A Flutter-based mobile travel order management system integrated with a PHP backend and MySQL database, designed to streamline business trip administration.',
 '["Flutter","PHP","MySQL","REST API"]', '2024', 'https://github.com/adhitamaw/sppd', NULL, NULL, false, 5),
('Task Tracker Plus', 'MSIB 6 Ruangguru Project',
 'Web-based task management application built using Go (Golang). Implements Monolithic Architecture using RESTful API and follows the MVC design pattern.',
 '["Go (Golang)","REST API","MVC","PostgreSQL"]', '2024', 'https://github.com/adhitamaw/task-tracker-plus-go', NULL, NULL, false, 6),
('AI Model App: Translate & Chat', 'MSIB 6 Ruangguru Project',
 'Web-based application built with Go that integrates various AI models from Hugging Face for translation, chat/question-answering, and text processing. Features JWT-authenticated endpoints and clean architecture backend.',
 '["Go (Golang)","HuggingFace API","JWT","REST API"]', '2024', 'https://github.com/adhitamaw/ai-model-app-using-golang', NULL, NULL, false, 7);
