// Based on https://github.com/evanw/esbuild/issues/1601#issuecomment-937961652
import { context } from "esbuild";
import { createServer, request } from "http";

const publicPort = 1274;

const define = {};
for (const k in process.env) {
  define[`process.env.${k}`] = JSON.stringify(process.env[k]);
}

const ctx = await context({
  entryPoints: ["src/index.tsx"],
  bundle: true,
  minify: false,
  sourcemap: true,
  define,
  outfile: "www/dist/index.js",
  format: "esm",
});

const { host, port } = await ctx.serve({
  servedir: "www",
});

const server = createServer((req, res) => {
  const options = {
    hostname: host,
    port: port,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxyReq = request(options, (proxyRes) => {
    const date = new Date();
    console.log(`${date.toISOString()} - ${req.method} to ${req.url}`);
    if (proxyRes.statusCode === 404) {
      const redirectReq = request({ ...options, path: "/" }, (proxyRes) => {
        console.log(`  ↳ redirected to /`);
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      });
      redirectReq.end();
    } else {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    }
  });
  req.pipe(proxyReq, { end: true });
});

server.listen(publicPort);

console.log(`Listening at http://localhost:${publicPort}/`);
console.log("Watching for changes...");
