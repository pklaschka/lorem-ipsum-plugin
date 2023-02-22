# Scripts for the project

This directory contains scripts for the project. They are used to automate
various tasks during development.

## Scripts

**`build.mjs`:** Builds the project. Compiles the TypeScript code and copies the
assets from the `static` directory to the `dist` directory.

**`watch.mjs`:** Does the same as build, but also watches for changes in the
source code and automatically rebuilds the project when a change is detected.

## ESBuild plugins

We use `esbuild` to build the project. In order to get a good developer
experience during development, we use a few custom plugins to make `esbuild`
suit our needs:

**`image-data-url-loader-plugin.mts`:** This plugin allows us to import images
as data URLs. This is useful for importing images in the source code.

**`reporter-plugin.mts`:** This plugin makes esbuild console output more
readable.

**`uxp-plugin.mts`:** This plugin allows us to import UXP modules. This is
useful for importing UXP modules in the source code.

## Other files

All other files in this directory are used by the scripts.
