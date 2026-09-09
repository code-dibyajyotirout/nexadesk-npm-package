import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  euclideanDistance,
  euclideanDistance2D,
  OneEuroFilter,
  isFistGesture,
  classifyGesture,
  GESTURE_STATE,
} from '../dist/utils/index.js';

describe('Spatial Gesture Mathematical Utilities', () => {
  it('should calculate 2D Euclidean distance accurately', () => {
    const p1 = { x: 0, y: 0 };
    const p2 = { x: 3, y: 4 };
    assert.equal(euclideanDistance2D(p1, p2), 5);
  });

  it('should calculate 3D Euclidean distance accurately', () => {
    const p1 = { x: 0, y: 0, z: 0 };
    const p2 = { x: 2, y: 3, z: 6 };
    assert.equal(euclideanDistance(p1, p2), 7);
  });

  it('should filter noisy input smoothly with OneEuroFilter', () => {
    const filter = new OneEuroFilter(30, 1.0, 0.007);
    const initial = filter.filter(100, 1000);
    assert.equal(initial, 100);

    // Rapid noisy jitter input
    const smoothed = filter.filter(105, 1033);
    assert.ok(smoothed > 100 && smoothed < 105, `Expected smoothed value between 100 and 105, got ${smoothed}`);
  });

  it('should classify idle state when no hands are detected', () => {
    const res = classifyGesture([]);
    assert.equal(res.state, GESTURE_STATE.IDLE);
    assert.equal(res.isFist, false);
  });

  it('should classify click gesture when index and thumb are pinched together', () => {
    // Generate mock 21 landmarks
    const landmarks = Array.from({ length: 21 }, () => ({ x: 0.5, y: 0.5, z: 0 }));
    // Landmark 8 is index tip, Landmark 4 is thumb tip
    landmarks[8] = { x: 0.50, y: 0.50, z: 0 };
    landmarks[4] = { x: 0.51, y: 0.51, z: 0 }; // distance < 0.065

    const res = classifyGesture([landmarks]);
    assert.equal(res.state, GESTURE_STATE.CLICK);
  });

  it('should classify fist gesture when finger tips are curled past PIP joints', () => {
    const landmarks = Array.from({ length: 21 }, () => ({ x: 0.5, y: 0.5, z: 0 }));
    // PIP joints (lower Y in screen space)
    landmarks[6] = { x: 0.5, y: 0.4 };
    landmarks[10] = { x: 0.5, y: 0.4 };
    landmarks[14] = { x: 0.5, y: 0.4 };
    landmarks[18] = { x: 0.5, y: 0.4 };

    // Tips (higher Y in screen space = curled down)
    landmarks[8] = { x: 0.5, y: 0.6 };
    landmarks[12] = { x: 0.5, y: 0.6 };
    landmarks[16] = { x: 0.5, y: 0.6 };
    landmarks[20] = { x: 0.5, y: 0.6 };

    assert.equal(isFistGesture(landmarks), true);
    const res = classifyGesture([landmarks]);
    assert.equal(res.state, GESTURE_STATE.FIST_CLOSE);
  });

  it('should classify resize gesture when two hands are detected', () => {
    const hand1 = Array.from({ length: 21 }, () => ({ x: 0.3, y: 0.5, z: 0 }));
    const hand2 = Array.from({ length: 21 }, () => ({ x: 0.7, y: 0.5, z: 0 }));

    const res = classifyGesture([hand1, hand2]);
    assert.equal(res.state, GESTURE_STATE.RESIZE);
    assert.ok(res.twoHandDistance !== undefined);
  });
});
