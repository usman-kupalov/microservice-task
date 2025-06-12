# 🧩 Microservices Task – User & Notification Services

This project demonstrates a microservices-based architecture using **Node.js**, **TypeScript**, **MongoDB**, **RabbitMQ**, and **Docker**. It includes:

- 🧑 **User Service** – Handles user CRUD operations.
- 🔔 **Notification Service** – Sends mock notifications when users are created or deleted.

---

## 🛠 Tech Stack

- **Node.js** + **TypeScript**
- **Express.js**
- **MongoDB**
- **RabbitMQ**
- **Docker** & **Docker Compose**
- **Joi** for validation
- **js-logger**
- **Health checks**

---

## 📦 Project Structure

microservice-task/
├── user-service/
│ ├── src/
│ ├── Dockerfile
│ └── package.json
├── notification-service/
│ ├── src/
│ ├── Dockerfile
│ └── package.json
├── docker-compose.yml
└── .env


---

## ☁️ MongoDB Configuration

This project uses a **MongoDB cluster** (e.g., **MongoDB Atlas**) as the primary datastore for the User Service.  
Make sure to update your `.env` file with the correct MongoDB connection string:
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority

# User Service
PORT=
DATABASE_URL=
RABBITMQ_URL=
QUEUE_NAME=

# Notification Service
PORT=1
RABBITMQ_URL=
QUEUE_NAME=

# RabbitMQ
RABBITMQ_DEFAULT_USER=
RABBITMQ_DEFAULT_PASS=
RABBITMQ_DEFAULT_VHOST=
RABBITMQ_HOST=

### Running the Application
```docker-compose up --build
```bash
docker-compose up --build
