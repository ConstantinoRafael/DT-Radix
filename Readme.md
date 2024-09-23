# Radix Challenge Documentation

## Project Description

The project aims to create an infrastructure to receive real-time sensor data from an oil and gas plant. Sensor data is sent in JSON format and stored in a database. Additionally, missing data can be received through CSV files.

## Project Structure

- **Backend**: Node.js with Express
- **Frontend**: React
- **Database**: MongoDB
- **Containerization**: Docker and Docker Compose

## Technologies Used

- Node.js
- Express
- Mongoose
- Next.js
- Chart.js
- Docker
- Docker Compose

## Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js (optional, for development outside Docker)

## Installation and Execution

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ConstantinoRafael/DT-Radix.git
   cd DT-Radix
   ```

2. **Navigate to the API folder and create a .env file**

   ```
   cd api
   cp .env.example .env

   ```

3. **Start the containers with Docker Compose**

   ```
   docker-compose up --build

   ```

4. **Access the Backend**

   The backend will be available at `http://localhost:5000`.

5. **Access the Frontend**

   The frontend will be available at `http://localhost:3000`.

## API Endpoints

## 1. **Receive Sensor Data**

- **Method:** POST
- **Endpoint:** `/api/sensors/sensor-data`
- **Example Payload:**

  ```json
  {
    "equipmentId": "EQ-12495",
    "timestamp": "2023-02-15T01:30:00.000-05:00",
    "value": 78.42
  }
  ```

- **Description:** Receives sensor data and stores it in the database.

## 2. **Receive CSV File**

- **Method:** POST
- **Endpoint:** `/api/sensors/upload-csv`
- **Description:** Receives a CSV file, parses it, and stores the data in the database.

## 3. **Get Sensor Averages**

- **Method:** GET
- **Endpoint:** `/api/sensors/sensor-averages`
- **Query Parameter:**
  period: Specify the timeframe for averaging (e.g., 24h, 48h, 1w, 1m).
- **Exemple:** `http://localhost:5000/api/sensors/sensor-averages?period=24h`
- **Description:** Receives a CSV file, parses it, and stores the data in the database.

## Obs

- When the container starts, the database will be empty. You can populate it by uploading a CSV file using either the backend or the frontend.
- The following CSV file can be used: [sensors.sensorreadings.csv](https://github.com/user-attachments/files/17104047/sensors.sensorreadings.csv)
