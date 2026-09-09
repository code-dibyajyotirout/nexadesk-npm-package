import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCascadeGeometry,
  DEFAULT_APPS,
} from '../dist/utils/index.js';

describe('Window Manager Geometry & Configuration', () => {
  it('should calculate initial cascading coordinates within viewport bounds', () => {
    const geom1 = calculateCascadeGeometry(0, 600, 400, 1920, 1080);
    assert.equal(geom1.x, 80);
    assert.equal(geom1.y, 80);
    assert.equal(geom1.width, 600);
    assert.equal(geom1.height, 400);

    const geom2 = calculateCascadeGeometry(1, 600, 400, 1920, 1080);
    assert.equal(geom2.x, 112); // 80 + 32
    assert.equal(geom2.y, 112); // 80 + 32
  });

  it('should clamp window width and height to small viewport boundaries', () => {
    const smallViewportWidth = 500;
    const smallViewportHeight = 350;
    const geom = calculateCascadeGeometry(0, 800, 600, smallViewportWidth, smallViewportHeight);

    assert.ok(geom.width <= smallViewportWidth);
    assert.ok(geom.height <= smallViewportHeight);
  });

  it('should provide valid default application configs', () => {
    const apps = Object.keys(DEFAULT_APPS);
    assert.ok(apps.includes('control-panel'));
    assert.ok(apps.includes('paint'));
    assert.ok(apps.includes('files'));
    assert.ok(apps.includes('terminal'));
    assert.ok(apps.includes('ide'));
    assert.ok(apps.includes('browser'));

    for (const id of apps) {
      const app = DEFAULT_APPS[id];
      assert.ok(app.title, `App ${id} missing title`);
      assert.ok(app.defaultWidth > 0, `App ${id} invalid defaultWidth`);
      assert.ok(app.defaultHeight > 0, `App ${id} invalid defaultHeight`);
    }
  });
});
