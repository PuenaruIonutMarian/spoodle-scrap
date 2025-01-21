/**
 * Wait for a given amount of time before resolving the promise
 *
 * @param ms The amount of time to wait in milliseconds
 * @returns A promise that resolves after the given amount of time
 */

export function waitFor(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}