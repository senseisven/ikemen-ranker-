import { handle } from '@hono/node-server/vercel';

let handler;

try {
  const { default: app } = await import('../apps/web/build/server/index.js');
  handler = handle(app);
} catch (e) {
  console.error('Failed to initialize server:', e);
  handler = (req, res) => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: 'Server initialization failed',
      message: e?.message,
      stack: e?.stack,
    }));
  };
}

export default handler;
