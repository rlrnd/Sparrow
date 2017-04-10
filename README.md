# Project Sparrow
![A sparrow](/sparrow.png?raw=true)]

# Project Goal

- Prepare RL to build new modular cloud-ready product line as the successor to RL6

# Project Vision

- &quot;Build a Sparrow prototype and take it on a test flight&quot;

# Project Objectives

- Eliminate technical uncertainties
- Identify all key architectural pieces
- Determine which technologies will be used
- Build a proof of concept
- Draft of a plan to build an &quot;Eagle&quot;

# Business Requirements

1. Hosted or On-premises
2. Continuous delivery of fixes and new features
3. Data Security
4. Handle clients from smallest to largest
5. Version-less - update under RL (not client) control
6. Direct access for support (no VPN)
7. Cross-client Data Analytics
8. Integration with social feeds, government feeds, patient mobile devices
9. Services and apps for Patients
10. Platform independent
11. Hybrid options - Application hosting, data hosting: RL or Client
12. Security certification
13. Intrusion detection and defenses (assume intruders are already in)
14. Authentication varieties - RL native, LDAP, SAML, OAuth, Custom
15. Multi-factor authentication
16. Multi-tenancy with unbreakable boundaries
17. Multi-Language
18. Multi-time-zone
19. Controlled roll-out of new versions; EAP; score cards
20. Options to allow clients to keep old UX (for some period of time)
21. Integration from cloud or on premises: HL7, FHIR, CSV, [web services]
22. Modular, layered, separate front-end
23. Easy to add new products
24. One-click migration from Delphi and RL6
25. Configuration through apps entirely (no hacking files or DB)
26. System Health Dashboard, instance status
27. Troubleshooting tools for junior techs

# Technical Unknowns (Risks)

1. Audit needs a service?
2. Configuration global or for each tenant?
3. Environments (production, test, staging, configuration, training) - what pieces do the share? Security? How are they connected?
4. Versions - allowing qualified clients to move onto new version first
5. Tenants and hierarchy (tiers): split/move
6. Billing and trial mode, usage, finance
7. Integration - feeds or interfaces for Patients (HL7), Providers, Medication, Equipment, Prescriptions, Locations, where sources are not in the cloud.
8. Forms…
9. Platform vendor independence
10. Multi-lingual coexistence - data problem bigger than application
11. VAR development platform? Let clients build their own front end?
12. Data push - public submission via RL - push files to clients - Patient Centric
13. Front-end architecture
14. Vulnerability/Intrusion detection and defense
15. Performance and Scalability

# Deliverables

## Scope of Deliverables

### The sparrow: Bones, muscles and guts

- Enough bones to keep it together,
- Enough guts to keep it alive;
- Enough muscles to make it fly

### The nest: Business dependencies

- End-to-end process: how do we see it working from PM-&gt; Deployment-&gt; Client Feedback, and all the steps in between?

## Details of Deliverables

### Deliverables: Sparrow

- Message Bus
- Front-end Applications
  - Main App: File Management, Analysis, Configuration, Public Submission, Mobile
- Daemons
  - Workflow, Notifier, Scheduler, Analytic ETL/Normalizer, File pusher
- APIs
  - Security, Transactional, Analytical, Configuration, Submission, Copy Configuration
- Databases
  - Security, Transactional, Analytical, Configuration, Public Submission

### Deliverables: Nest

- Migration Strategy
- Methodologies
  - PM
  - Analysis
  - Design
  - Development
  - Testing
  - Deployment
  - Support
  - Client Feedback

# Success Criteria

TBD

# Project Plan

TBD
