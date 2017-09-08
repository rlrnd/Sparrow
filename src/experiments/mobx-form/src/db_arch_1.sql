CREATE TABLE tenants (
  id UUID primary key,
  name varchar(255) not null unique,
  active boolean not null
);

CREATE TABLE units (
  tenant_id UUID foreign key references tenants(id),
  id UUID primary key,
  parent_id UUID foreign key references units(id),
  level int,
  name varchar(255) not null,
  hierachy_path ltree // similar to hierarchy_id from MSSQL
);

CREATE TABLE users (
  tenant_id UUID foreign key references tenants(id),
  id UUID primary key,
  user_id varchar(255) not null unique,
  email varchar(255) not null,
  account_status varchar(50) 
);

CREATE TABLE patients (
  tenant_id UUID foreign key references tenants(id),
  id UUID primary key,
  first_name varchar(255),
  -- Other attributes from patients - we donot really allow extendibility here? 
);

CREATE TABLE tasks (
  tenant_id UUID foreign key references tenants(id),
  id UUID primary key,
  created_by varchar(255) not null,
  created_on timestamp with timezone not null,
  assigned_to UUID foreign key references users(id),
  status varchar(255) not null,
  deadline timestamp with timezone,
  external_id varchar(255),  -- Camunda human task id, 
  entity_name varchar(255),
  entity_id UUID, // the PK 
  task_type varchar(255),
  task_subject varchar(255),
  task_details text,
  completed_by UUID foreign key references users(id),
  completed_on datetime with timezone,
  completion_notes text
);

CREATE TABLE feedbacks (
  tenant_id UUID foreign key references tenants(id),
  id UUID primary key,
  current_unit UUID foreign key references units(id),
  file_status varchar(50),
  file_name varchar(255) not null, -- unique business key for that tenant  
  file_owner UUID foreign key references users(id),
  created_by varchar(255) not null,
  created_on timestamp with timezone,
  details jsonb
);

CREATE TABLE feedback_subjects (
  tenant_id UUID foreign key references tenants(id),
  feedback_id UUID foreign key references feedbacks(id),
  id UUID primary key,
  person_type varchar(255) not null,
  patient_id UUID foreign key references patients(id),
)

CREATE TABLE activities (
);
