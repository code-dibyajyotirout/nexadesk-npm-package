# Contributing to NexaDesk

Thank you for your interest in contributing to NexaDesk. We welcome bug reports, feature proposals, documentation improvements, and code contributions.

## Development Workflow

1. Fork the repository on GitHub.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/code-dibyajyotirout/nexadesk-npm-package.git
   cd nexadesk-npm-package
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a dedicated feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Code Quality Standards

- Maintain zero emojis across all source code, comments, commit messages, and documentation.
- Ensure strict TypeScript compliance:
   ```bash
   npm run typecheck
   ```
- Run the unit test suite before submitting changes:
   ```bash
   npm test
   ```
- Validate the library build output:
   ```bash
   npm run build:lib
   ```

## Pull Request Guidelines

1. Ensure all tests pass with 100% success rate.
2. Provide a clear description of the problem solved or feature added in the PR description.
3. Link any associated GitHub issues.
4. Adhere to our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License Agreement

By contributing to NexaDesk, you agree that your contributions will be licensed under the terms of the GNU Affero General Public License v3.0 (AGPL-3.0).
