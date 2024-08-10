# Segment3D Frontend

This project is a part of the frontend service for the Segment3D App. It is built using [Next.js](https://nextjs.org/), a powerful React framework, and is bootstrapped with Node.js. For package management, the project utilizes [pnpm](https://pnpm.io/), which ensures fast and efficient installations while optimizing disk space usage.


## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
  - [Running the Production Server](#running-the-production-server)
- [Docker](#docker)
  - [Building the Docker Image](#building-the-docker-image)
  - [Running the Docker Container](#running-the-docker-container)
- [Running All Segment3d Services](#running-all-segment3d-services)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js v22.3.0**: You can download it from [nodejs.org](https://nodejs.org/).
- **pnpm**: You can install pnpm globally using npm:
    ```bash
    npm install -g pnpm
    ```
- **Docker**: You can download it from [docker.com](https://www.docker.com/).
- **Docker Compose**: Docker Compose is used for defining and running multi-container Docker applications. It typically comes bundled with Docker Desktop, but you can also install it separately. See [Docker Compose installation guide](https://docs.docker.com/compose/install/) for more details.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/segment3d-app/frontend.git
    ```
2. Navigate to the project directory:

    ```bash
    cd frontend
    ```

3. Install dependencies using pnpm:
    ```bash
    pnpm install
    ```
4. Create `.env` file from `.env.local.example` to store environtment variable
    ```bash
    cp .env.local.example .env
    ```
### Running the Development Server

To start the development server, run the following command:

```bash
pnpm dev
```

This will start the server on `http://localhost:3000`. You can then open this URL in your browser to view the application.

### Building for Production

To create an optimized production build, run:

```bash
pnpm build
```

This will generate the production files in the `.next` directory.

### Running the Production Server

After building the project, you can start the production server using:

```bash
pnpm start
```

The server will be running on `http://localhost:3000`.

## Docker

This project can be containerized using Docker. Below are the steps to build and run the Docker container for your Next.js application using Docker Compose.

### Using Docker Compose

Docker Compose is used to simplify the management of your application, making it easier to build and run with a single command.

### Building and Running the Docker Container

To build and run the container, run the following command in the root of your project directory (where your `docker-compose.yml` file is located):

```bash
docker-compose up --build
```

You can then access the application at `http://localhost:3000`.

## Running All Services
If you want to run all services, you can visit [Deployment Master Services](https://github.com/segment3d-app/deployment-master)

## Contributing

If you would like to contribute to this project, please feel free to open a pull request or submit an issue. All contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
