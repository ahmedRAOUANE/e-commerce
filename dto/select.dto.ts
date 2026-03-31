export function buildSelect<T extends Record<string, unknown>>(
    shape: T
): { [K in keyof T]: true } {
    return Object.fromEntries(
        Object.keys(shape).map((key) => [key, true] as const)
    ) as { [K in keyof T]: true };
}
