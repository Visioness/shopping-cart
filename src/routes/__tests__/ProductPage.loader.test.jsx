import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loader as productLoader } from '../ProductPage/ProductPage.jsx';

describe('ProductPage loader', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns product when fetch ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1, title: 'A', price: 1 }),
    });

    const data = await productLoader({ params: { id: 1 } });
    expect(data.id).toBe(1);
  });

  it('throws Error when fetch not ok', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue({ ok: false, status: 404, statusText: 'Not Found' });
    await expect(productLoader({ params: { id: 1 } })).rejects.toThrow(
      '404 Not Found'
    );
  });
});
