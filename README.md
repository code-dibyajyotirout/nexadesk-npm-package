# NexaDesk

**Client-Side Touchless 2D Window Manager & Spatial Computing Framework for React**

[![NPM Version](https://img.shields.io/npm/v/nexadesk.svg)](https://www.npmjs.com/package/nexadesk)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](LICENSE)
[![Types: TypeScript](https://img.shields.io/badge/Types-TypeScript%205-blue.svg)](https://www.typescriptlang.org/)
[![React: >=18.0.0](https://img.shields.io/badge/React-%3E%3D18.0.0-61dafb.svg)](https://react.dev/)

---

## Overview

NexaDesk is a production-grade, client-side spatial computing framework for React and Next.js applications. It translates real-time webcam video feeds into 21 three-dimensional skeletal hand landmarks using Google MediaPipe, smooths high-frequency coordinate tremor with an adaptive One Euro Filter, and executes a deterministic five-state gesture state machine to control a full-featured glassmorphic desktop operating system inside the browser.

The library is designed for zero-server dependency, executing all computer vision inference and window management entirely within the client's browser sandbox.

---

## Key Features

- **Touchless Spatial Gestures:** Native detection and classification of Hover, Pinch-to-Click, Window Drag, Dual-Hand Resize, and Fist-Hold Close interactions.
- **Adaptive Jitter Filtering:** Integrated One Euro Filter and Linear Interpolation (Lerp) dynamically adjust cutoff frequencies according to instantaneous hand velocity.
- **Glassmorphic Window Management:** Complete window lifecycle orchestration including z-index depth sorting, automatic cascading, minimize/restore transitions, and maximize scaling.
- **Modular Subpath Exports:** Import only what you need via `./components`, `./hooks`, `./utils`, or the complete desktop bundle.
- **Fallback Hand Simulator:** Built-in mouse and keyboard emulation layer allowing complete desktop interaction when camera access is unavailable or disabled.
- **Zero Server Dependency:** 100% client-side execution ensures user privacy; no video frames or biometric landmark coordinates are ever transmitted over the network.

---

## Installation

Install the package via your preferred package manager:

```bash
npm install nexadesk
```

Or using `pnpm` or `yarn`:

```bash
pnpm add nexadesk
# or
yarn add nexadesk
```

Ensure peer dependencies are satisfied in your project:
```bash
npm install react react-dom
```

---

## Quick Start

### Basic Desktop Integration

Import the `<NexaDesk />` component and stylesheet into your React or Next.js application:

```tsx
import React from 'react';
import { NexaDesk } from 'nexadesk';
import 'nexadesk/style.css';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <NexaDesk
        spatialModeDefault={false}
        initialApps={['control-panel', 'paint']}
        showTaskbar={true}
        showWebcamBubble={true}
        onGestureChange={(state) => {
          console.log('[GESTURE STATE]', state);
        }}
      />
    </div>
  );
}
```

---

## Modular Subpath Imports

NexaDesk exports dedicated subpaths for granular usage:

### 1. Root Import (`nexadesk`)
Exports all components, hooks, utilities, and TypeScript types:
```tsx
import {
  NexaDesk,
  NexaDesktop,
  NexaCursor,
  WebcamBubble,
  NexaTaskbar,
  useWindowManager,
  useGestureDetector,
  useSpatialTracker,
  OneEuroFilter,
  classifyGesture,
} from 'nexadesk';
```

### 2. Hooks (`nexadesk/hooks`)
Provides custom React hooks for building custom spatial interfaces:
```tsx
import {
  useWindowManager,
  useGestureDetector,
  useSpatialTracker,
  useHandSimulator,
} from 'nexadesk/hooks';
```

### 3. Components (`nexadesk/components`)
Individual glassmorphic UI components:
```tsx
import {
  NexaDesk,
  NexaCursor,
  WebcamBubble,
  NexaTaskbar,
  NexaWindow,
  VirtualKeyboard,
  HandSimulatorWidget,
} from 'nexadesk/components';
```

### 4. Utilities (`nexadesk/utils`)
Mathematical algorithms, signal filters, and constants:
```tsx
import {
  OneEuroFilter,
  lerp,
  euclideanDistance,
  classifyGesture,
  calculateCascadeGeometry,
  GESTURE_STATE,
  DEFAULT_APPS,
} from 'nexadesk/utils';
```

### 5. Stylesheets (`nexadesk/style.css`)
Complete glassmorphism design tokens, keyframe animations, and cursor styles:
```css
@import 'nexadesk/style.css';
```

---

## Component Props Reference

### `<NexaDesk />` / `<NexaDesktop />`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `className` | `string` | `''` | Optional CSS class name applied to root container. |
| `style` | `CSSProperties` | `{}` | Optional inline styles applied to root container. |
| `initialApps` | `string[]` | `['control-panel', 'paint']` | Array of default application window IDs to spawn on mount. |
| `spatialModeDefault` | `boolean` | `false` | Initial active state of camera-based spatial tracking. |
| `showTaskbar` | `boolean` | `true` | Whether the bottom glassmorphic dock is rendered. |
| `showWebcamBubble` | `boolean` | `true` | Whether the floating webcam monitor bubble is visible. |
| `onGestureChange` | `(gesture: GestureState) => void` | `undefined` | Callback fired when the classified gesture state changes. |
| `onWindowOpen` | `(windowId: string) => void` | `undefined` | Callback fired when an application window opens. |
| `onWindowClose` | `(windowId: string) => void` | `undefined` | Callback fired when an application window closes. |

---

## Gesture Control Architecture

```text
+-------------------+     +-------------------------+     +--------------------------+
| Camera Video Feed | --> | MediaPipe Hands WASM    | --> | 21 Skeletal Landmarks    |
+-------------------+     +-------------------------+     +--------------------------+
                                                                       |
                                                                       v
+-------------------+     +-------------------------+     +--------------------------+
| Desktop Action    | <-- | Gesture State Machine   | <-- | OneEuroFilter / Lerp     |
| (Drag/Resize/Win) |     | (Hover/Pinch/Fist/TwoH) |     | (Jitter Smoothing)       |
+-------------------+     +-------------------------+     +--------------------------+
```

| Gesture | Landmark Detection Criteria | Action |
| :--- | :--- | :--- |
| **Hover** | Index Finger Tip (Landmark 8) | Controls spatial cursor coordinates |
| **Click / Pinch** | Euclidean distance $(8, 4) < 0.065$ | Triggers click event or activates control |
| **Window Drag** | Active Pinch maintained within window titlebar | Translates window position across desktop |
| **Dual-Hand Resize** | Distance delta between Index Tips $(8_L, 8_R)$ | Scales width and height of active window |
| **Fist Close** | Finger tips curled over window for $> 1.0\text{s}$ | Fills countdown ring and destroys window |

---

## Privacy & Security

NexaDesk is built with privacy-first engineering standards:

- **Local Execution:** All MediaPipe skeletal landmark inference runs client-side via WebAssembly (WASM).
- **Zero Video Transmission:** Raw webcam video frames and biometric landmarks never leave the user's browser.
- **Ephemeral Storage:** Window geometries, session states, and terminal histories persist only in local `localStorage`.

---

## Contributing

We welcome community contributions. Please review [CONTRIBUTING.md](CONTRIBUTING.md) and our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before submitting pull requests.

---

## License

This project is licensed under the terms of the [GNU Affero General Public License v3.0 (AGPL-3.0)](LICENSE).
