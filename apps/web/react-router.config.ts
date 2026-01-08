import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	ssr: true,
	// Disable prerendering in production to avoid hanging on database connections
	prerender: process.env.NODE_ENV === 'production' ? false : ['/*?'],
} satisfies Config;
