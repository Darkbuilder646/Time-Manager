-- Insérer des utilisateurs dans la table users
INSERT INTO users (username, email, password, role, inserted_at, updated_at) VALUES
('alice', 'alice@example.com', 'password1', 'employee', NOW(), NOW()),
('bob', 'bob@example.com', 'password2', 'manager', NOW(), NOW()),
('carol', 'carol@example.com', 'password3', 'topmanager', NOW(), NOW());

-- Insérer des équipes dans la table teams
INSERT INTO teams (name, inserted_at, updated_at) VALUES
('Team Alpha', NOW(), NOW()),
('Team Beta', NOW(), NOW());

-- Insérer des associations utilisateur-équipes dans la table user_teams
INSERT INTO user_teams (user_id, team_id, inserted_at, updated_at) VALUES
(1, 1, NOW(), NOW()),  -- Alice dans Team Alpha
(2, 1, NOW(), NOW()),  -- Bob dans Team Alpha
(2, 2, NOW(), NOW()),  -- Bob dans Team Beta
(3, 2, NOW(), NOW());  -- Carol dans Team Beta

-- Insérer des entrées dans la table clocks
INSERT INTO clocks (time, status, user_id, inserted_at, updated_at) VALUES
('2023-10-10 06:30:00', true, 1, '2023-10-10 06:30:00', '2023-10-10 06:30:00'),  -- Alice démarre à 6h30
('2023-10-10 15:30:00', false, 1, '2023-10-10 15:30:00', '2023-10-10 15:30:00'), -- Alice arrête à 15h30
('2023-10-10 07:15:00', true, 2, '2023-10-10 07:15:00', '2023-10-10 07:15:00'),  -- Bob démarre à 7h15
('2023-10-10 17:00:00', false, 2, '2023-10-10 17:00:00', '2023-10-10 17:00:00'), -- Bob arrête à 17h00
('2023-10-11 06:45:00', true, 1, '2023-10-11 06:45:00', '2023-10-11 06:45:00'),  -- Alice démarre à 6h45
('2023-10-11 16:45:00', false, 1, '2023-10-11 16:45:00', '2023-10-11 16:45:00'); -- Alice arrête à 16h45

-- Insérer des périodes de travail dans la table workingtimes
INSERT INTO workingtimes (start, "end", user_id, inserted_at, updated_at) VALUES
('2023-10-10 06:30:00', '2023-10-10 15:30:00', 1, '2023-10-10 15:30:00', '2023-10-10 15:30:00'),  -- Alice, journée de 9h
('2023-10-10 07:15:00', '2023-10-10 17:00:00', 2, '2023-10-10 17:00:00', '2023-10-10 17:00:00'),  -- Bob, journée de 9h45
('2023-10-11 06:45:00', '2023-10-11 16:45:00', 1, '2023-10-11 16:45:00', '2023-10-11 16:45:00');  -- Alice, journée de 10h
