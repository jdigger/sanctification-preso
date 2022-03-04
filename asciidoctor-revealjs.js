// Load Asciidoctor.js and the reveal.js converter
const asciidoctor = require("@asciidoctor/core")();
const asciidoctorRevealjs = require("@asciidoctor/reveal.js");
asciidoctorRevealjs.register();

const chokidar = require("chokidar");
const fs = require("fs");
const Path = require("path");
const Mkdirp = require("mkdirp");

const distDir = Path.join(__dirname, "dist");

// load RevealJS from the CDN using the version this was built with
const revealjsdir =
  "https://cdn.jsdelivr.net/npm/reveal.js@" +
  require("reveal.js/package.json").version;

const genHtml = () => {
  // const attributes = {'revealjsdir': 'node_modules/reveal.js@'};
  const attributes = {
    revealjsdir,
  };
  const options = {
    safe: "safe",
    backend: "revealjs",
    attributes,
    to_dir: distDir,
  };
  Mkdirp(distDir);
  asciidoctor.convertFile("src/asciidoc/index.adoc", options);
};

const srcDir = Path.join(__dirname, "src/asciidoc");

// One-liner for current directory, ignores .dotfiles
const watcher = chokidar.watch(srcDir);

watcher.on("add", (filePath) => {
  // console.log('add: ' + filePath)
  if (filePath.endsWith(".adoc")) {
    genHtml();
  } else {
    const relSrcPath = Path.relative(srcDir, filePath);
    const distPath = Path.join(distDir, relSrcPath);
    // console.log('copying ' + filePath + ' to ' + distPath)
    Mkdirp(Path.dirname(distPath));
    fs.copyFileSync(filePath, distPath);
  }
});

watcher.on("change", (filePath) => {
  if (filePath.endsWith(".adoc")) {
    genHtml();
  } else {
    const relSrcPath = Path.relative(srcDir, filePath);
    const distPath = Path.join(distDir, relSrcPath);
    // console.log('copying ' + filePath + ' to ' + distPath)
    Mkdirp(Path.dirname(distPath));
    fs.copyFileSync(filePath, distPath);
  }
});

console.log("Watching for file changes");
