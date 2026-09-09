import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import * as NexaDesk from '../dist/index.js';
import * as Hooks from '../dist/hooks/index.js';
import * as Components from '../dist/components/index.js';
import * as Utils from '../dist/utils/index.js';

describe('NexaDesk Root Public API Exports', () => {
  it('should export core React components', () => {
    assert.equal(typeof NexaDesk.NexaDesk, 'function');
    assert.equal(typeof NexaDesk.NexaDesktop, 'function');
    assert.equal(typeof NexaDesk.NexaCursor, 'function');
    assert.equal(typeof NexaDesk.WebcamBubble, 'function');
    assert.equal(typeof NexaDesk.NexaTaskbar, 'function');
    assert.equal(typeof NexaDesk.NexaWindow, 'function');
    assert.equal(typeof NexaDesk.VirtualKeyboard, 'function');
    assert.equal(typeof NexaDesk.HandSimulatorWidget, 'function');
  });

  it('should export core React hooks', () => {
    assert.equal(typeof NexaDesk.useWindowManager, 'function');
    assert.equal(typeof NexaDesk.useGestureDetector, 'function');
    assert.equal(typeof NexaDesk.useSpatialTracker, 'function');
    assert.equal(typeof NexaDesk.useHandSimulator, 'function');
  });

  it('should export utility classes, functions, and constants', () => {
    assert.equal(typeof NexaDesk.OneEuroFilter, 'function');
    assert.equal(typeof NexaDesk.LowPassFilter, 'function');
    assert.equal(typeof NexaDesk.lerp, 'function');
    assert.equal(typeof NexaDesk.euclideanDistance, 'function');
    assert.equal(typeof NexaDesk.euclideanDistance2D, 'function');
    assert.equal(typeof NexaDesk.classifyGesture, 'function');
    assert.equal(typeof NexaDesk.isFistGesture, 'function');
    assert.equal(typeof NexaDesk.calculateCascadeGeometry, 'function');
    assert.ok(NexaDesk.GESTURE_STATE);
    assert.ok(NexaDesk.DEFAULT_APPS);
  });
});

describe('NexaDesk Subpath Exports', () => {
  it('should export hooks from ./hooks', () => {
    assert.equal(typeof Hooks.useWindowManager, 'function');
    assert.equal(typeof Hooks.useGestureDetector, 'function');
    assert.equal(typeof Hooks.useSpatialTracker, 'function');
    assert.equal(typeof Hooks.useHandSimulator, 'function');
  });

  it('should export components from ./components', () => {
    assert.equal(typeof Components.NexaDesk, 'function');
    assert.equal(typeof Components.NexaDesktop, 'function');
    assert.equal(typeof Components.NexaCursor, 'function');
    assert.equal(typeof Components.NexaTaskbar, 'function');
    assert.equal(typeof Components.WebcamBubble, 'function');
  });

  it('should export utilities from ./utils', () => {
    assert.equal(typeof Utils.OneEuroFilter, 'function');
    assert.equal(typeof Utils.classifyGesture, 'function');
    assert.ok(Utils.GESTURE_STATE);
    assert.ok(Utils.DEFAULT_APPS);
  });
});
