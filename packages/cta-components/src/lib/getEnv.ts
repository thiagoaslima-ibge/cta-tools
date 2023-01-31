const variables = {
    GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID ?? '',
    ICONS_FOLDER: import.meta.env.VITE_ICONS_FOLDER ?? '',
} as const

export const getEnv = <T extends keyof typeof variables>(variable: T): typeof variables[T] => {
    return variables[variable];
}
