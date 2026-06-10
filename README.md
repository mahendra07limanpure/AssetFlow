# AssetFlow
Smart Asset Management &amp; Resource Allocation Platform built with MERN Stack featuring inventory tracking, asset booking workflows, approval management, return tracking, and analytics dashboards. 🚀
Smart Asset Management and Resource Allocation Platform
Participation Format
This is a team problem statement.
Teams may consist of up to the maximum number of 03 participants.
Participants are expected to design and develop a full-stack asset management platform that enables efficient inventory tracking, resource allocation, and operational visibility.
The challenge evaluates software engineering, database design, system architecture, API development, and user experience design skills.

1. Motivation
Organizations of all sizes rely on efficient asset management systems to track inventory, allocate resources, monitor utilization, and maintain accountability.
From universities and event management companies to logistics providers and enterprises, poor inventory visibility often results in scheduling conflicts, resource underutilization, delayed returns, and operational inefficiencies.
The Cultural Council of IIT Roorkee faces a similar challenge while managing a large pool of shared resources such as:
DSLR Cameras
Studio Lighting Equipment
Audio Systems
Costumes
Stage Props
Recording Equipment
Event Infrastructure
These assets are frequently shared across multiple sections and events, making efficient resource allocation critical.
Currently, resource management often relies on fragmented communication channels, spreadsheets, manual registers, and informal coordination processes.
This challenge provides an opportunity to build a real-world asset management platform that mirrors problems commonly encountered in inventory management, resource planning, logistics operations, and enterprise software systems.

2. Problem Statement
Design and develop a full-stack Asset Management and Resource Allocation Platform that enables organizations to efficiently manage shared resources.
The platform should provide a centralized system for:
Inventory management
Asset booking
Approval workflows
Resource allocation
Utilization tracking
Operational analytics
The system should support role-based workflows for administrators and resource consumers while maintaining simplicity, usability, and scalability.
Participants should focus on building a robust and user-friendly solution capable of handling real-world asset management scenarios.

3. Functional Requirements
Mandatory Features
A. User Authentication
Implement a secure authentication system.
Users should be able to:
Register and log in
Access role-specific functionality
Maintain secure sessions
Participants may use:
JWT Authentication
Session-Based Authentication
OAuth (Optional)

B. Inventory Management
Administrators should be able to:
Add assets
Edit asset information
Delete assets
Categorize assets
Manage available quantities
Each asset should contain information such as:
Asset Name
Category
Description
Quantity Available
Status

C. Asset Discovery and Booking
Users should be able to:
Browse available assets
Search and filter inventory
View asset availability
Request assets for specific durations
The platform should prevent booking requests exceeding available inventory.

D. Approval Workflow
Administrators should be able to:
Review booking requests
Approve requests
Reject requests
View active allocations
Users should be able to track the status of their requests.

E. Asset Issue and Return Management
The platform should support:
Asset issuance
Asset return tracking
Due date management
Asset status updates
The system should maintain accurate inventory counts throughout the asset lifecycle.

F. Analytics Dashboard
Build a dashboard providing insights such as:
Most frequently utilized assets
Asset utilization rates
Active bookings
Available inventory
Overdue returns
Visualizations may include:
Bar Charts
Pie Charts
Line Graphs
Summary Cards

G. Borrowing History
Users should be able to:
View their borrowing history
Track active bookings
Monitor past requests
Administrators should be able to view system-wide activity.

Optional Features
A. Notification System
Notify users regarding:
Booking approvals
Booking rejections
Upcoming return deadlines
Overdue assets
Notifications may be delivered through:
Email
In-App Notifications

B. Audit Logs
Track important actions such as:
Asset creation
Inventory updates
Booking approvals
Asset returns

C. QR Code-Based Asset Operations
Allow administrators to:
Generate QR codes for assets
Scan assets during issue and return
View asset information instantly

D. Asset Health Tracking
Track:
Asset condition
Maintenance history
Damage reports

E. Dockerized Deployment
Provide a containerized development environment using Docker and Docker Compose.

4. Deliverables
Deliverable 1: Working Application
A functional application demonstrating the implemented features.

Deliverable 2: Design Document
Format: PDF
The document should include:
Problem Understanding
System Architecture
Database Schema
Entity Relationship Diagram (ERD)
API Overview
Design Decisions
Maximum Length: 8 Pages

Deliverable 3: Public GitHub Repository
The repository should contain:
Source Code
Configuration Files
Database Scripts
Documentation
The project should be reproducible.

Deliverable 4: README.md
The README should include:
Project Overview
Technology Stack
Setup Instructions
Running the Application
Feature List

Deliverable 5: Demonstration Video
Duration: Maximum 3 Minutes
The video should demonstrate:
User Authentication
Asset Booking Workflow
Approval Process
Dashboard Functionality
Key Technical Features

5. Guidelines
1. Prioritize Core Functionality
A well-executed booking and inventory management system is preferable to an incomplete feature-heavy platform.

2. Focus on User Experience
The platform should be intuitive and easy to use for both administrators and users.

3. Maintain Data Integrity
Inventory counts, bookings, and returns should remain consistent throughout the system.

4. Design for Scalability
Consider how the system would support larger inventories and increased user activity.

5. Follow Good Engineering Practices
Strong submissions should demonstrate:
Clean Code
Modular Design
Proper Documentation
Maintainability

6. Evaluation Criteria
Criterion
Weightage
Functionality & Feature Completeness
30%
System Design & Architecture
20%
Database Design & Backend Logic
15%
User Experience & Interface Design
15%
Code Quality & Documentation
10%
Innovation & Additional Features
10%


Bonus Considerations
Additional credit may be awarded for:
Notification Systems
QR-Based Operations
Audit Logging
Asset Health Tracking
Dockerized Deployment
Advanced Analytics















Real-Time Campus Mobility and Ride Management Platform
Participation Format
This is a team problem statement.
Teams may consist of up to the maximum number of 04 participants.
Participants are expected to design and develop a real-time ride management platform that enables passengers and drivers to seamlessly connect within a campus environment.
The challenge evaluates full-stack development, real-time communication systems, database design, API development, state management, and user experience design skills.

1. Motivation
Efficient transportation is a critical component of modern campuses, universities, airports, hospitals, logistics hubs, and smart cities.
Users require quick and reliable transportation, while drivers need visibility into ride demand and passenger requests. Without centralized coordination, transportation systems often suffer from inefficient resource utilization, delays, uneven demand distribution, and poor user experiences.
The IIT Roorkee campus spans a large geographical area and relies heavily on e-rickshaws for last-mile transportation. However, ride requests and driver availability are currently coordinated through fragmented and informal mechanisms.
This challenge provides an opportunity to build a real-world mobility platform that mirrors many of the engineering challenges encountered in ride-hailing and dispatch systems, including:
Real-time communication
Geospatial data handling
Ride assignment workflows
State synchronization
Dashboard analytics
Multi-user coordination
Participants will develop a campus-scale ride management platform capable of connecting passengers and drivers through a centralized digital system.

2. Problem Statement
Design and develop a responsive web or mobile application that enables passengers and drivers to discover, request, assign, and manage rides within a campus environment.
The platform should provide:
User authentication
Driver onboarding
Ride request management
Ride assignment workflows
Real-time ride updates
Driver analytics and insights
The system should prioritize usability, reliability, and responsiveness while remaining scalable and maintainable.
Participants are encouraged to focus on solving the core ride-management problem effectively rather than attempting to replicate every feature of commercial ride-hailing platforms.

3. Functional Requirements
Mandatory Features
A. User Authentication & Profile Management
Implement a secure authentication system.
Passenger Accounts
Registration
Login
Profile Management
Driver Accounts
Registration
Login
Vehicle Information
Driver Verification Information
Participants may implement:
JWT Authentication
Session-Based Authentication
OAuth Authentication (Optional)

B. Driver Availability Management
Drivers should be able to:
Go Online
Go Offline
Update current availability status
Passengers should be able to view available drivers before requesting rides.

C. Ride Request Workflow
Passengers should be able to:
Request a ride
Specify pickup location
Specify destination
View ride status
Drivers should be able to:
View incoming ride requests
Accept requests
Reject requests
The system must ensure that a ride can only be assigned to a single driver.

D. Real-Time Ride Updates
Implement real-time communication using technologies such as:
WebSockets
Socket.IO
Server-Sent Events
The platform should support:
Live ride status updates
Driver availability updates
Ride assignment notifications
This is the core engineering component of the challenge.

E. Ride Lifecycle Management
Support complete ride tracking through states such as:
Requested
Accepted
In Progress
Completed
Cancelled
The system should maintain a consistent ride state throughout the workflow.

F. Driver Dashboard
Provide a dashboard displaying:
Total rides completed
Active rides
Ride history
Ratings received
Basic ride statistics
Visualizations may include:
Summary Cards
Charts
Activity Tables

G. Ratings & Feedback
Passengers should be able to:
Rate completed rides
Provide optional written feedback
The platform should maintain:
Average driver ratings
Feedback history
Driver performance summaries

Optional Features
A. Live Map Integration
Display:
Driver locations
Pickup points
Active rides
using mapping solutions such as:
Leaflet
OpenStreetMap
Google Maps

B. Ride Scheduling
Allow users to:
Schedule rides for future time slots
Manage upcoming bookings
Examples:
Early morning classes
Club rehearsals
Event transportation

C. Digital Payments
Simulate or integrate:
UPI Payments
QR Code Payments
Payment History

D. Demand Analytics
Analyze historical ride data and identify:
Peak demand hours
Popular pickup locations
Ride demand patterns

E. Demand Forecasting
Use machine learning techniques to predict:
High-demand periods
Potential ride hotspots
Examples:
Linear Regression
Decision Trees
Time-Series Models

4. Deliverables
Deliverable 1: Working Application
A functional application demonstrating the implemented features.

Deliverable 2: Design Document
Format: PDF
The document should include:
Problem Understanding
System Architecture
Database Schema
Entity Relationship Diagram (ERD)
API Overview
Design Decisions
Maximum Length: 8 Pages

Deliverable 3: Public GitHub Repository
The repository should contain:
Source Code
Configuration Files
Documentation
The solution should be reproducible.

Deliverable 4: README.md
The README should include:
Project Overview
Technology Stack
Setup Instructions
Running the Application
Feature List

Deliverable 5: Demonstration Video
Duration: Maximum 3 Minutes
The video should demonstrate:
User Registration & Login
Ride Request Workflow
Ride Assignment Process
Real-Time Updates
Driver Dashboard
Ratings & Feedback System

5. Guidelines
1. Prioritize Core Ride Workflows
A reliable ride management system is preferable to numerous incomplete features.

2. Focus on Real-Time Communication
The strongest submissions will effectively utilize WebSockets or similar technologies to deliver live updates.

3. Maintain Data Consistency
Ride states, assignments, and driver availability should remain synchronized across the platform.

4. Design for Scalability
Consider how the system would support larger numbers of users and ride requests.

5. Follow Good Engineering Practices
Strong submissions should demonstrate:
Clean Code
Modular Architecture
Proper Documentation
Maintainability

6. Evaluation Criteria

Criterion

Weightage
Functionality & Feature Completeness
30%
Real-Time System Design
20%
Backend & Database Design
15%
User Experience & Interface Design
15%
Code Quality & Documentation
10%
Innovation & Additional Features
10%


Bonus Considerations
Additional credit may be awarded for:
Live Map Integration
Ride Scheduling
Digital Payments
Demand Analytics
Demand Forecasting
Advanced Dashboard Features

