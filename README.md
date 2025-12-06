# Corporate Vehicle Control API

Back-end solution for managing corporate transportation assets. This API acts as a central control unit for fleet operations, ensuring optimal resource allocation and preventing scheduling conflicts.

## 🎯 Core Features

The system is built around strict control mechanisms to ensure data integrity:

* **Conflict-Free Allocation:** Enforces business rules that prevent a single vehicle from being used by multiple drivers simultaneously, or a driver from booking multiple vehicles.
* **Asset Lifecycle:** Complete management (CRUD) of the **Automobile** inventory (filtering by brand/color) and **Driver** registry.
* **Usage Tracking:** Auditable logs of vehicle check-outs and returns, including timestamps and usage reasons.

## 🏗 Architecture & Tech Stack

* **Node.js & Express:** High-performance runtime.
* **In-Memory Strategy:** Optimized data structure for low-latency operations.
* **TDD Approach:** Comprehensive unit testing coverage to validate control logic.
