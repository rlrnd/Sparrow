# All parts of this miniature bird

![Minimal sets of parts](https://github.com/rlrnd/Sparrow/blob/master/src/parts/Sparrow-parts.jpg)

## Key architect concerns

* Deploy on appliance
* Huge instance cluster
* Mixed deployment(?)

## Modules and Parts
* Database Server (PostgreSQL)
  * Security Database
  * Configuration Database
  * Transactional Database
  * Analytical Database
  * Integration Databases (?)
  * Logs


* Message bus
  * Kafka/zoo-keeper (dev.rlpulse.net:9092)


* Redis cache
* File storage

* Parts
  * Identity Server
  * Main App
  * Analytical App
  * Configuration App
  * Transactional API
  * Report API
  * Configuration API
  * Normalizer/ETL
  * Notification
  * Workflow
  * Scheduler/Alerts
  * Log
