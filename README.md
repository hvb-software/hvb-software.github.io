# HVB.software's website with blog

The website: [HVB.software](https://hvb.software)

## Source
The project was generated using [chirpy-starter](https://github.com/cotes2020/chirpy-starter).

[Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) is a theme for [Jekyll](https://jekyllrb.com/) projects.

## How to develop locally?

Install dependencies using:
```shell
bundle
```

Then run the following command:
```shell
bundle exec jekyll s --livereload --drafts
```

or to run in Docker:
```shell
docker run -it --rm --volume="$PWD:/srv/jekyll" -p 4000:4000 jekyll/jekyll jekyll serve
```

## How to add a new post?

Create a new file in the `_posts` folder with pattern: `YEAR-MONTH-DAY-title-of-post.md`

At the beginning add:
```markdown
---
title: Example title (no markdown format)
author: the_author
date: 2024-01-08 21:40:00 +0100
categories: [Spring Boot]
tags: [spring data, tests]
pin: false
toc: true
---
```

After `---` you can add whatever you want in markdown format.

## Documentations

- [Jekyll](https://jekyllrb.com/docs/)
- [Chirpy](https://chirpy.cotes.page/)
- [Chirpy-starter](https://github.com/cotes2020/chirpy-starter)

### Modifications

- [set "about" as a start page](https://github.com/JinchaoLove/jekyll-theme-chirpy)
- [author pages](https://github.com/gouravkhunger/jekyll-auto-authors)
- [CSS updates based on Poison](https://poison.lukeorth.com)
