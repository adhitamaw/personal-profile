DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM experiences
    WHERE category = 'work'
      AND title = 'Software Engineer (Internship)'
      AND organization = 'PT. Multi Utama Consultindo (MUC Consulting)'
  ) THEN
    INSERT INTO experiences (
      category,
      title,
      organization,
      location,
      period_start,
      period_end,
      highlights,
      sort_order
    ) VALUES (
      'work',
      'Software Engineer (Internship)',
      'PT. Multi Utama Consultindo (MUC Consulting)',
      'Jakarta, Indonesia',
      'May 2026',
      'Present',
      '["Developed a Web App GIR Reporting System to automate OECD Pillar Two GloBE Information Return XML generation for multinational clients by implementing validation rules aligned with the OECD GIR XML Schema", "Designed a normalized 3NF database with a centralized REST API architecture for tax reporting workflows"]'::jsonb,
      1
    );
  END IF;

  UPDATE experiences
  SET sort_order = 2
  WHERE category = 'work'
    AND title = 'Data Analyst Fleet Management (Internship)'
    AND organization = 'PT. Toyota-Astra Motor';

  UPDATE experiences
  SET sort_order = 3
  WHERE category = 'work'
    AND title = 'Backend Developer (Internship)'
    AND organization = 'Badan Pengusahaan Batam (BP Batam)';

  UPDATE experiences
  SET sort_order = 4
  WHERE category = 'work'
    AND title = 'AI Integration In Backend Application Development (Independent Study Program)'
    AND organization = 'Ruangguru, Kampus Merdeka (MSIB 6)';
END $$;
