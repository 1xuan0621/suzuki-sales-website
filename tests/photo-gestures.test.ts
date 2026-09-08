import assert from "node:assert/strict";
import test from "node:test";
import { photoSwipeStep } from "../src/lib/photo-gestures";

test("horizontal swipes advance or return exactly one photo", () => {
  assert.equal(photoSwipeStep(-100, 10), 1);
  assert.equal(photoSwipeStep(100, -10), -1);
  assert.equal(photoSwipeStep(-48, 0), 1);
  assert.equal(photoSwipeStep(1000, 0), -1);
});

test("taps, short drags, and vertical or diagonal scrolling do not change photos", () => {
  for (const [x, y] of [[0, 0], [47, 0], [-47, 0], [20, 150], [-70, -100], [100, 100], [100, 80]]) {
    assert.equal(photoSwipeStep(x, y), 0);
  }
});
