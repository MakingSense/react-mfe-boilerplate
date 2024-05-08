import { build } from "esbuild";
import { default as manifestPlugin } from "esbuild-plugin-manifest";

const normalizeManifest = (e) => ({
  entrypoints: Object.entries(e).map((x) => x[1]),
});

try {
  await build({
    entryPoints: ["src/index.tsx"],
    bundle: true,
    outdir: "dist/",
    plugins: [
      manifestPlugin({
        generate: normalizeManifest,
        filename: "asset-manifest.json",
      }),
    ],
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    treeShaking: true,
    platform: "browser",
  });
} catch (e) {
  console.error(e.message);
  process.exit(1);
}
