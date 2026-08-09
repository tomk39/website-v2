#!/bin/bash

bundle exec jekyll build
npx pagefind --site "_site"
bundle exec jekyll serve --host=0.0.0.0 --livereload --trace --verbose
