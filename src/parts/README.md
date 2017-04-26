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
  
  Based upon IdentityServer4 + Asp.Net Core Identity, making sure claims include tenantId and roles, Include 2 factors TOTP. 2 Weeks if rushed, following items not included:
    * Register by invitation/Invite new users
    * Email verification
    * Might take ~2-3 weeks
    

  * Main App

  Asp.Net core MVC app. Mostly place holder, need to put some thoughts over JSON/security


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
