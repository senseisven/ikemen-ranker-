import { handle } from '@hono/node-server/vercel';

const { default: app } = await import('../apps/web/build/server/index.js');

export default handle(app);
