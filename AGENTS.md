# Contributor Guidelines

This file provides best practices for contributing to this project.

## Coding Practices
- Use ESLint or similar linters to maintain consistent style.
- Prefer modern JavaScript features available in Node.js 20.
- Write self-documenting code with clear variable names and comments.
- Keep functions small and focused on a single task.

## Git Commit Conventions
- Make each commit a logical unit of work.
- Start commit messages with a short, imperative summary (50 characters or less).
- Provide additional context in the body if necessary.
- Reference related issues or pull requests when applicable.

## Testing
- Add or update tests for all features and bug fixes.
- Ensure `npm test` runs cleanly before opening a pull request.
- Mock external services like AWS S3 in unit tests.

## Pull Request Expectations
- Describe the purpose of the change and provide clear instructions for reviewers.
- Keep pull requests focused; avoid mixing unrelated changes.
- Update documentation when behavior changes.

## Security
- Never commit secrets or credentials.
- Validate and sanitize all user input to prevent injection attacks.

## Documentation
- Keep README and other docs up to date with new features.
- Document environment variables and configuration options.

