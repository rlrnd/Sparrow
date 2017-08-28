--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.4
-- Dumped by pg_dump version 9.6.4

-- Started on 2017-08-28 10:06:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 9 (class 2615 OID 17151)
-- Name: dbo; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA dbo;


ALTER SCHEMA dbo OWNER TO postgres;

--
-- TOC entry 1 (class 3079 OID 12387)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2433 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 2 (class 3079 OID 17189)
-- Name: ltree; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS ltree WITH SCHEMA public;


--
-- TOC entry 2434 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION ltree; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION ltree IS 'data type for hierarchical tree-like structures';


--
-- TOC entry 3 (class 3079 OID 17152)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 2435 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET search_path = dbo, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 195 (class 1259 OID 17445)
-- Name: assignments; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE assignments (
    id uuid NOT NULL,
    tenant_id uuid,
    user_id uuid,
    unit_id uuid,
    role_id uuid
);


ALTER TABLE assignments OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 17555)
-- Name: claims; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE claims (
    id uuid NOT NULL,
    tenant_id uuid,
    patient_id uuid,
    unit_id uuid,
    type character varying(255),
    state character varying(255),
    details json,
    created_by character varying(255),
    created_on timestamp with time zone,
    last_modified_by character varying(255),
    last_modified_on timestamp with time zone
);


ALTER TABLE claims OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 17369)
-- Name: entities; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE entities (
    id uuid NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE entities OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 17532)
-- Name: feedbacks; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE feedbacks (
    id uuid NOT NULL,
    tenant_id uuid,
    patient_id uuid,
    unit_id uuid,
    type character varying(255),
    severity character varying(255),
    state character varying(255),
    details json,
    created_by character varying(255),
    created_on timestamp with time zone,
    last_modified_by character varying(255),
    last_modified_on timestamp with time zone
);


ALTER TABLE feedbacks OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 17601)
-- Name: followups; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE followups (
    id uuid NOT NULL,
    tenant_id uuid,
    task_id uuid,
    entity character varying(50),
    entity_id uuid,
    action_type character varying(50),
    created_by character varying(255),
    created_on timestamp with time zone,
    last_modified_by character varying(255),
    last_modified_on timestamp with time zone,
    details jsonb
);


ALTER TABLE followups OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 17470)
-- Name: iconwalls; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE iconwalls (
    id uuid NOT NULL,
    tenant_id uuid,
    name character varying(255) NOT NULL,
    entity character varying(50) NOT NULL,
    details json,
    created_by character varying(255),
    created_on timestamp with time zone,
    last_modified_by character varying(255),
    last_modified_on timestamp with time zone
);


ALTER TABLE iconwalls OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 17509)
-- Name: incidents; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE incidents (
    id uuid NOT NULL,
    tenant_id uuid,
    patient_id uuid,
    unit_id uuid,
    type character varying(255),
    severity character varying(255),
    state character varying(255),
    details jsonb,
    created_by character varying(255),
    created_on timestamp with time zone,
    last_modified_by character varying(255),
    last_modified_on timestamp with time zone
);


ALTER TABLE incidents OWNER TO postgres;

--
-- TOC entry 193 (class 1259 OID 17422)
-- Name: patients; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE patients (
    id uuid NOT NULL,
    tenant_id uuid,
    full_name character varying(255) NOT NULL,
    gender character varying(50),
    dob timestamp without time zone,
    details json
);


ALTER TABLE patients OWNER TO postgres;

--
-- TOC entry 194 (class 1259 OID 17435)
-- Name: providers; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE providers (
    id uuid NOT NULL,
    tenant_id uuid,
    full_name character varying(255) NOT NULL
);


ALTER TABLE providers OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 17578)
-- Name: rca_cases; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE rca_cases (
    id uuid NOT NULL,
    tenant_id uuid,
    patient_id uuid,
    unit_id uuid,
    type character varying(255),
    severity character varying(255),
    state character varying(255),
    details json,
    created_by character varying(255),
    created_on timestamp with time zone,
    last_modified_by character varying(255),
    last_modified_on timestamp with time zone
);


ALTER TABLE rca_cases OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 17390)
-- Name: roles; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE roles (
    id uuid NOT NULL,
    tenant_id uuid,
    name character varying(255) NOT NULL,
    permanant boolean DEFAULT false NOT NULL,
    description text
);


ALTER TABLE roles OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 17483)
-- Name: tasks; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE tasks (
    id uuid NOT NULL,
    user_id uuid,
    task_type character varying(255) NOT NULL,
    status character varying(50),
    created_by character varying(255) NOT NULL,
    due_date timestamp with time zone,
    complete_date timestamp with time zone,
    subject character varying(255),
    entity character varying(50),
    entity_id uuid,
    action_type character varying(50),
    details text,
    wf_task_id character varying(255)
);


ALTER TABLE tasks OWNER TO postgres;

--
-- TOC entry 188 (class 1259 OID 17364)
-- Name: tenants; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE tenants (
    id uuid NOT NULL,
    client_id uuid NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE tenants OWNER TO postgres;

--
-- TOC entry 192 (class 1259 OID 17404)
-- Name: units; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE units (
    id uuid NOT NULL,
    tenant_id uuid,
    parent_id uuid,
    path public.ltree,
    name character varying(255) NOT NULL
);


ALTER TABLE units OWNER TO postgres;

--
-- TOC entry 190 (class 1259 OID 17376)
-- Name: users; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE users (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    status character varying(50) DEFAULT 'new'::character varying NOT NULL,
    tenant_id uuid
);


ALTER TABLE users OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 17496)
-- Name: workflows; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE workflows (
    id uuid NOT NULL,
    tenant_id uuid,
    entity character varying(50),
    process_id character varying(255),
    bpmn_details xml,
    created_by character varying(255),
    created_on timestamp with time zone,
    last_modified_by character varying(255),
    last_modified_on timestamp with time zone
);


ALTER TABLE workflows OWNER TO postgres;

--
-- TOC entry 2266 (class 2606 OID 17449)
-- Name: assignments assignments_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY assignments
    ADD CONSTRAINT assignments_pkey PRIMARY KEY (id);


--
-- TOC entry 2278 (class 2606 OID 17562)
-- Name: claims claims_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY claims
    ADD CONSTRAINT claims_pkey PRIMARY KEY (id);


--
-- TOC entry 2252 (class 2606 OID 17375)
-- Name: entities entities_name_key; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY entities
    ADD CONSTRAINT entities_name_key UNIQUE (name);


--
-- TOC entry 2254 (class 2606 OID 17373)
-- Name: entities entities_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY entities
    ADD CONSTRAINT entities_pkey PRIMARY KEY (id);


--
-- TOC entry 2276 (class 2606 OID 17539)
-- Name: feedbacks feedbacks_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id);


--
-- TOC entry 2282 (class 2606 OID 17608)
-- Name: followups followups_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY followups
    ADD CONSTRAINT followups_pkey PRIMARY KEY (id);


--
-- TOC entry 2268 (class 2606 OID 17477)
-- Name: iconwalls iconwalls_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY iconwalls
    ADD CONSTRAINT iconwalls_pkey PRIMARY KEY (id);


--
-- TOC entry 2274 (class 2606 OID 17516)
-- Name: incidents incidents_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY incidents
    ADD CONSTRAINT incidents_pkey PRIMARY KEY (id);


--
-- TOC entry 2262 (class 2606 OID 17429)
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- TOC entry 2264 (class 2606 OID 17439)
-- Name: providers providers_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id);


--
-- TOC entry 2280 (class 2606 OID 17585)
-- Name: rca_cases rca_cases_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY rca_cases
    ADD CONSTRAINT rca_cases_pkey PRIMARY KEY (id);


--
-- TOC entry 2258 (class 2606 OID 17398)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 2270 (class 2606 OID 17490)
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- TOC entry 2250 (class 2606 OID 17368)
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (id);


--
-- TOC entry 2260 (class 2606 OID 17411)
-- Name: units units_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY units
    ADD CONSTRAINT units_pkey PRIMARY KEY (id);


--
-- TOC entry 2256 (class 2606 OID 17384)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2272 (class 2606 OID 17503)
-- Name: workflows workflows_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY workflows
    ADD CONSTRAINT workflows_pkey PRIMARY KEY (id);


--
-- TOC entry 2292 (class 2606 OID 17465)
-- Name: assignments assignments_role_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY assignments
    ADD CONSTRAINT assignments_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(id);


--
-- TOC entry 2289 (class 2606 OID 17450)
-- Name: assignments assignments_tenant_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY assignments
    ADD CONSTRAINT assignments_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id);


--
-- TOC entry 2291 (class 2606 OID 17460)
-- Name: assignments assignments_unit_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY assignments
    ADD CONSTRAINT assignments_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES units(id);


--
-- TOC entry 2290 (class 2606 OID 17455)
-- Name: assignments assignments_user_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY assignments
    ADD CONSTRAINT assignments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2303 (class 2606 OID 17568)
-- Name: claims claims_patient_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY claims
    ADD CONSTRAINT claims_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients(id);


--
-- TOC entry 2302 (class 2606 OID 17563)
-- Name: claims claims_tenant_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY claims
    ADD CONSTRAINT claims_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id);


--
-- TOC entry 2304 (class 2606 OID 17573)
-- Name: claims claims_unit_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY claims
    ADD CONSTRAINT claims_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES units(id);


--
-- TOC entry 2300 (class 2606 OID 17545)
-- Name: feedbacks feedbacks_patient_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY feedbacks
    ADD CONSTRAINT feedbacks_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients(id);


--
-- TOC entry 2299 (class 2606 OID 17540)
-- Name: feedbacks feedbacks_tenant_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY feedbacks
    ADD CONSTRAINT feedbacks_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id);


--
-- TOC entry 2301 (class 2606 OID 17550)
-- Name: feedbacks feedbacks_unit_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY feedbacks
    ADD CONSTRAINT feedbacks_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES units(id);


--
-- TOC entry 2309 (class 2606 OID 17614)
-- Name: followups followups_task_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY followups
    ADD CONSTRAINT followups_task_id_fkey FOREIGN KEY (task_id) REFERENCES tasks(id);


--
-- TOC entry 2308 (class 2606 OID 17609)
-- Name: followups followups_tenant_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY followups
    ADD CONSTRAINT followups_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id);


--
-- TOC entry 2293 (class 2606 OID 17478)
-- Name: iconwalls iconwalls_tenant_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY iconwalls
    ADD CONSTRAINT iconwalls_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id);


--
-- TOC entry 2297 (class 2606 OID 17522)
-- Name: incidents incidents_patient_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY incidents
    ADD CONSTRAINT incidents_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients(id);


--
-- TOC entry 2296 (class 2606 OID 17517)
-- Name: incidents incidents_tenant_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY incidents
    ADD CONSTRAINT incidents_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id);


--
-- TOC entry 2298 (class 2606 OID 17527)
-- Name: incidents incidents_unit_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY incidents
    ADD CONSTRAINT incidents_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES units(id);


--
-- TOC entry 2287 (class 2606 OID 17430)
-- Name: patients patients_tenant_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY patients
    ADD CONSTRAINT patients_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id);


--
-- TOC entry 2288 (class 2606 OID 17440)
-- Name: providers providers_tenant_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY providers
    ADD CONSTRAINT providers_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id);


--
-- TOC entry 2306 (class 2606 OID 17591)
-- Name: rca_cases rca_cases_patient_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY rca_cases
    ADD CONSTRAINT rca_cases_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES patients(id);


--
-- TOC entry 2305 (class 2606 OID 17586)
-- Name: rca_cases rca_cases_tenant_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY rca_cases
    ADD CONSTRAINT rca_cases_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id);


--
-- TOC entry 2307 (class 2606 OID 17596)
-- Name: rca_cases rca_cases_unit_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY rca_cases
    ADD CONSTRAINT rca_cases_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES units(id);


--
-- TOC entry 2284 (class 2606 OID 17399)
-- Name: roles roles_tenant_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id);


--
-- TOC entry 2294 (class 2606 OID 17491)
-- Name: tasks tasks_user_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY tasks
    ADD CONSTRAINT tasks_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);


--
-- TOC entry 2286 (class 2606 OID 17417)
-- Name: units units_parent_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY units
    ADD CONSTRAINT units_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES units(id);


--
-- TOC entry 2285 (class 2606 OID 17412)
-- Name: units units_tenant_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY units
    ADD CONSTRAINT units_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id);


--
-- TOC entry 2283 (class 2606 OID 17385)
-- Name: users users_tenant_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id);


--
-- TOC entry 2295 (class 2606 OID 17504)
-- Name: workflows workflows_tenant_id_fkey; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY workflows
    ADD CONSTRAINT workflows_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(id);


-- Completed on 2017-08-28 10:06:38

--
-- PostgreSQL database dump complete
--

