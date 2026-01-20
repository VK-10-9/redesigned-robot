-- Seed States
INSERT INTO states (name, code, region) VALUES
('Andhra Pradesh', 'AP', 'South'),
('Arunachal Pradesh', 'AR', 'Northeast'),
('Assam', 'AS', 'Northeast'),
('Bihar', 'BR', 'East'),
('Chhattisgarh', 'CG', 'Central'),
('Goa', 'GA', 'West'),
('Gujarat', 'GJ', 'West'),
('Haryana', 'HR', 'North'),
('Himachal Pradesh', 'HP', 'North'),
('Jharkhand', 'JH', 'East'),
('Karnataka', 'KA', 'South'),
('Kerala', 'KL', 'South'),
('Madhya Pradesh', 'MP', 'Central'),
('Maharashtra', 'MH', 'West'),
('Manipur', 'MN', 'Northeast'),
('Meghalaya', 'ML', 'Northeast'),
('Mizoram', 'MZ', 'Northeast'),
('Nagaland', 'NL', 'Northeast'),
('Odisha', 'OD', 'East'),
('Punjab', 'PB', 'North'),
('Rajasthan', 'RJ', 'North'),
('Sikkim', 'SK', 'Northeast'),
('Tamil Nadu', 'TN', 'South'),
('Telangana', 'TG', 'South'),
('Tripura', 'TR', 'Northeast'),
('Uttar Pradesh', 'UP', 'North'),
('Uttarakhand', 'UT', 'North'),
('West Bengal', 'WB', 'East')
ON CONFLICT (code) DO NOTHING;

-- Seed key districts for major states (sampling)
INSERT INTO districts (name, state_id, code, population) VALUES
-- Karnataka
('Bangalore Urban', (SELECT id FROM states WHERE code='KA'), 'KA001', 9652141),
('Bangalore Rural', (SELECT id FROM states WHERE code='KA'), 'KA002', 3170556),
('Belagavi', (SELECT id FROM states WHERE code='KA'), 'KA003', 1793081),

-- Maharashtra
('Mumbai Suburban', (SELECT id FROM states WHERE code='MH'), 'MH001', 9356962),
('Mumbai City', (SELECT id FROM states WHERE code='MH'), 'MH002', 3043827),
('Pune', (SELECT id FROM states WHERE code='MH'), 'MH003', 6430560),

-- Delhi
('North Delhi', (SELECT id FROM states WHERE code='UP'), 'UP001', 2111007),
('South Delhi', (SELECT id FROM states WHERE code='UP'), 'UP002', 1828122),

-- Tamil Nadu
('Chennai', (SELECT id FROM states WHERE code='TN'), 'TN001', 4646732),
('Coimbatore', (SELECT id FROM states WHERE code='TN'), 'TN002', 3458336),

-- Andhra Pradesh
('Hyderabad', (SELECT id FROM states WHERE code='AP'), 'AP001', 6809970),
('Visakhapatnam', (SELECT id FROM states WHERE code='AP'), 'AP002', 4288223)
ON CONFLICT (state_id, name) DO NOTHING;
