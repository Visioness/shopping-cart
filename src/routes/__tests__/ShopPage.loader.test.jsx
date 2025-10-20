import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loader as shopLoader } from '../ShopPage/ShopPage';

describe('ShopPage loader', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns products when fetch ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: 1, title: 'A', price: 1 }]),
    });

    const data = await shopLoader();
    expect(Array.isArray(data)).toBe(true);
    expect(data[0].id).toBe(1);
  });

  it('throws Error when fetch not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Server Error',
    });
    await expect(shopLoader()).rejects.toThrow('500 Server Error');
  });
});
