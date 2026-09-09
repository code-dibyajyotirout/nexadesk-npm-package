# Security Policy

## Supported Versions

Only the latest stable release of NexaDesk receives active security updates and vulnerability patches.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | Yes                |
| < 1.0   | No                 |

## Security Model

NexaDesk operates on a client-first, privacy-by-design paradigm:
- All computer vision pipelines, hand tracking routines, and spatial calculations execute entirely in the client browser.
- No video frames, raw webcam streams, or coordinate landmarks are transmitted over the network unless explicitly configured by the consumer.
- WebWorker and WebAssembly processing isolate computational workloads from the main UI thread.

## Reporting a Vulnerability

If you discover a security vulnerability within NexaDesk, please report it privately rather than filing a public issue.

1. Email vulnerability details to: security@nexadesk.local (or submit a private security advisory via GitHub Advisories).
2. Include reproduction steps, environment details (browser version, Node.js runtime), and proof-of-concept code if possible.
3. We acknowledge receipt within 48 hours and provide a timeline for remediation.
4. Public disclosure occurs only after an official patch release has been published.
