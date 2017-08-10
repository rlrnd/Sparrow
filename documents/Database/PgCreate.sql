-- The extensions required to handle UUID/GUID type -----------
 CREATE EXTENSION pgcrypto
  SCHEMA public
  VERSION "1.3";

 CREATE EXTENSION uuid-ossp
  SCHEMA public
  VERSION "1.1";

-- Client Registrations ---------------------------------------

CREATE TABLE customers
(
  id uuid NOT NULL DEFAULT gen_random_uuid() primary key,
  name varchar(255) NOT NULL unique,
  contact text,
  status varchar(255),
  license text,
  notes text
);

CREATE TABLE known_entities
(
    id serial NOT NULL primary key,
    name varchar(255) not null,
    module_id int not null,
    notes text
);

CREATE TABLE customer_taxonomies
(
  id serial NOT NULL primary key,
  custmer_id uuid NOT NULL REFERENCES customers (id),
  entity_id INT NOT NULL REFERENCES known_entities (id),
  taxonomy varchar(50),
  version varchar(50)
);

CREATE TABLE taxonomy_mappings
(
  id serial NOT NULL primary key,
  entity_id INT NOT NULL REFERENCES known_entities (id),
  taxonomy varchar(50),
  version varchar(50),
  mappings text
);

CREATE TABLE issued_certificates
(
    id uuid NOT NULL DEFAULT gen_random_uuid() primary key,
    custmer_id uuid NOT NULL REFERENCES customers (id),
    issued_on timestamp not null default now() at time zone 'UTC',
    expiry_at timestamp,
    notes text
);

CREATE TABLE revoked_certificates 
(
    id uuid NOT NULL DEFAULT gen_random_uuid() primary key,
    custmer_id uuid NOT NULL REFERENCES customers (id),
    issued_on timestamp not null default now() at time zone 'UTC',
    expiry_at timestamp,
    notes text
);

-------------------------------- These two tables can go into separate place --------------------------------
CREATE TABLE upload_history
(
    id serial NOT NULL primary key,
    custmer_id uuid NOT NULL REFERENCES customers (id),
    from_ip varchar(50),
    upload_at timestamp not null default now() at time zone 'UTC',
    upload_result text,
    notes text
);

CREATE TABLE customer_data (
    id uuid NOT NULL DEFAULT gen_random_uuid() primary key,
    custmer_id uuid NOT NULL REFERENCES customers (id),
    entity_id int NOT NULL REFERENCES known_entities (id),
    taxonony int NOT NULL,
    last_modified_on timestamp not null default now() at time zone 'UTC',
    data json NOT NULL
);






