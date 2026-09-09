# Changelog

All notable changes to the NexaDesk project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## [1.0.0] - 2026-09-09

### Added
- Modular library distribution built for ESM with full TypeScript type declarations (.d.ts).
- Package exports for root (`nexadesk`), hooks (`nexadesk/hooks`), components (`nexadesk/components`), utilities (`nexadesk/utils`), and styles (`nexadesk/style.css`).
- Spatial tracking engine supporting both real MediaPipe vision streams and headless HandSimulator input.
- Jitter filtering implementations: 1-Euro Filter and Low-Pass Exponential Moving Average filter.
- Mathematical geometry helpers: Euclidean distance, angle calculations, bounding boxes, normalization, and linear interpolation (lerp).
- Gesture recognition finite state machine classifying pinch, fist, point, peace, thumbs up, and neutral states.
- Window management state engine supporting window creation, focus management, minimize, maximize, snap docking, and dragging.
- Comprehensive React component suite: NexaDesk, NexaDesktop, NexaCursor, WebcamBubble, NexaTaskbar, NexaWindow, VirtualKeyboard, and HandSimulatorWidget.
- Glassmorphism design system bundled as standalone CSS (`dist/style.css`).
- Complete automated unit testing suite across exports, gestures, and window manager state logic.
- Community and repository governance templates (README, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, issue and pull request templates).
