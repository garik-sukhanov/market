import { renderHook, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useSession } from './session';
import { instance } from '../api/instance';
import { jwtDecode } from 'jwt-decode';

// Mock dependencies
vi.mock('../api/instance', () => ({
    instance: {
        post: vi.fn(),
    },
}));

vi.mock('jwt-decode', () => ({
    jwtDecode: vi.fn(),
}));

describe('useSession', () => {
    const originalLocation = window.location;
    const replaceMock = vi.fn();

    beforeAll(() => {
        delete (window as unknown as { location: unknown }).location;
        (window as unknown as { location: unknown }).location = { replace: replaceMock };
    });

    afterAll(() => {
        (window as unknown as { location: unknown }).location = originalLocation;
    });

    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        // Default jwtDecode behavior to return a dummy session object to avoid undefined
        (jwtDecode as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ exp: Date.now() / 1000 + 3600 });

        // Reset singleton state
        const { result } = renderHook(() => useSession());
        act(() => {
            result.current.logout();
        });
    });

    it('manages login and logout state', async () => {
        const { result } = renderHook(() => useSession());

        act(() => {
            result.current.logout();
        });

        expect(result.current.session).toBeNull();

        // Login
        act(() => {
            result.current.login('test-token');
        });

        await waitFor(() => {
            expect(localStorage.getItem('token')).toBe('test-token');
            expect(result.current.session).not.toBeNull();
        });


        // Logout
        act(() => {
            result.current.logout();
        });

        await waitFor(() => {
            expect(result.current.session).toBeNull();
            expect(localStorage.getItem('token')).toBeNull();
        });
    });

    it('refreshToken flow', async () => {
        const { result } = renderHook(() => useSession());

        // Setup: Login first
        act(() => {
            result.current.login('valid-token');
        });

        await waitFor(() => {
            expect(result.current.session).not.toBeNull();
        });

        // 1. Valid token
        (jwtDecode as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ exp: Date.now() / 1000 + 3600 });
        let token: string | null = null;
        await act(async () => {
            token = await result.current.refreshToken();
        });

        await waitFor(() => {
            expect(token).toBe('valid-token');
        });
        expect(instance.post).not.toHaveBeenCalled();

        // 2. Expired token, successful refresh
        (jwtDecode as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ exp: Date.now() / 1000 - 3600 });
        (instance.post as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
            data: { accessToken: 'refreshed-token' }
        });

        await act(async () => {
            token = await result.current.refreshToken();
        });

        expect(instance.post).toHaveBeenCalledWith('/auth/refresh');
        expect(token).toBe('refreshed-token');
        expect(localStorage.getItem('token')).toBe('refreshed-token');

        // 3. Refresh failure
        (jwtDecode as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ exp: Date.now() / 1000 - 3600 });
        (instance.post as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('Fail'));

        await act(async () => {
            token = await result.current.refreshToken();
        });

        expect(token).toBeNull();
        expect(result.current.session).toBeNull();
    });
});
