/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import * as Rx from 'rxjs';
import { toArray, map } from 'rxjs/operators';
import { lastValueFrom } from '@kbn/std';

import { pipeClosure, debounceTimeBuffer, maybeMap, maybe } from './rxjs_helpers';

jest.useFakeTimers({ legacyFakeTimers: true });

describe('pipeClosure()', () => {
  it('calls closure on each subscription to setup unique state', async () => {
    let counter = 0;

    const foo$ = Rx.of(1, 2, 3).pipe(
      pipeClosure((source$) => {
        const multiplier = ++counter;
        return source$.pipe(map((i) => i * multiplier));
      }),
      toArray()
    );

    await expect(lastValueFrom(foo$)).resolves.toMatchInlineSnapshot(`
            Array [
              1,
              2,
              3,
            ]
          `);
    await expect(lastValueFrom(foo$)).resolves.toMatchInlineSnapshot(`
            Array [
              2,
              4,
              6,
            ]
          `);
    await expect(lastValueFrom(foo$)).resolves.toMatchInlineSnapshot(`
            Array [
              3,
              6,
              9,
            ]
          `);
  });
});

describe('maybe()', () => {
  it('filters out undefined values from the stream', async () => {
    const foo$ = Rx.of(1, undefined, 2, undefined, 3).pipe(maybe(), toArray());

    await expect(lastValueFrom(foo$)).resolves.toEqual([1, 2, 3]);
  });
});

describe('maybeMap()', () => {
  it('calls map fn and filters out undefined values returned', async () => {
    const foo$ = Rx.of(1, 2, 3, 4, 5).pipe(
      maybeMap((i) => (i % 2 ? i : undefined)),
      toArray()
    );

    await expect(lastValueFrom(foo$)).resolves.toEqual([1, 3, 5]);
  });
});

describe('debounceTimeBuffer()', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: true });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('buffers items until there is n milliseconds of silence, then flushes buffer to stream', async () => {
    const foo$ = new Rx.Subject<number>();
    const dest = new Rx.BehaviorSubject<number | undefined>(undefined);
    foo$
      .pipe(
        debounceTimeBuffer(100),
        map((items) => items.reduce((sum, n) => sum + n))
      )
      .subscribe(dest);

    foo$.next(1);
    expect(dest.getValue()).toBe(undefined);

    // only wait 99 milliseconds before sending the next value
    jest.advanceTimersByTime(99);
    foo$.next(1);
    expect(dest.getValue()).toBe(undefined);

    // only wait 99 milliseconds before sending the next value
    jest.advanceTimersByTime(99);
    foo$.next(1);
    expect(dest.getValue()).toBe(undefined);

    // send the next value after 100 milliseconds and observe that it was forwarded
    jest.advanceTimersByTime(100);
    foo$.next(1);
    expect(dest.getValue()).toBe(3);

    foo$.complete();
    if (!dest.isStopped) {
      throw new Error('Expected destination to stop as soon as the source is completed');
    }
  });

  it('clears queue as soon as source completes if source completes before time is up', () => {
    const foo$ = new Rx.Subject<number>();
    const dest = new Rx.BehaviorSubject<number | undefined>(undefined);
    foo$
      .pipe(
        debounceTimeBuffer(100),
        map((items) => items.reduce((sum, n) => sum + n))
      )
      .subscribe(dest);

    foo$.next(1);
    expect(dest.getValue()).toBe(undefined);
    foo$.complete();
    expect(dest.getValue()).toBe(1);
  });
});
