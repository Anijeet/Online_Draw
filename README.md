# Online Draw

A real-time collaborative drawing application built with modern web technologies.

## Project Structure

This is a monorepo project managed with Turborepo and pnpm, containing the following components:

### Apps
- `apps/frontend` - The web client application
- `apps/http-backend` - HTTP backend service
- `apps/ws-backend` - WebSocket backend service for real-time collaboration

### Packages
- `packages/backend-common` - Shared backend utilities
- `packages/common` - Common utilities shared across all applications
- `packages/db` - Database models and utilities
- `packages/ui` - Shared UI components
- `packages/eslint-config` - Shared ESLint configuration
- `packages/typescript-config` - Shared TypeScript configuration

## Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (Package manager)

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development servers:
   ```bash
   pnpm dev
   ```

This will start all applications in development mode using Turborepo.

## Development

- Use `pnpm dev` to start the development environment
- Use `pnpm build` to build all applications
- Use `pnpm lint` to run linting
- Use `pnpm test` to run tests

## Project Architecture

The project uses a microservices architecture:
- Frontend application for the user interface
- HTTP backend for REST API endpoints
- WebSocket backend for real-time drawing collaboration
- Shared packages for code reuse and maintainability

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Demo Video


https://github.com/user-attachments/assets/d4bf8309-2674-4eb1-984e-4bc17e3b29ce




https://github.com/user-attachments/assets/ad4dd765-fc31-44d4-8984-8be4996770ef


