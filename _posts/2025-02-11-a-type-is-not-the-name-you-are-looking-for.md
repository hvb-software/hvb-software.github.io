---
title: A type is not the name you are looking for
author: piotr
date: 2025-02-11 21:40:00 +0100
categories: [Development]
tags: [naming]
pin: false
---

Naming is one of the biggest challenges in programming. Meaningful names are crucial because developers spend far more time reading code than writing it. I've recently discovered that `type` is one of the most misused names in code.

I joined a team where `conversation` was one of our main entities. At the time, it already had a `type` property. What do you think: what is the `type` of a `conversation`? Take a moment to think about it before you read on...

In this case, the `type` property had an enumerated type taking the value `OUTGOING` or `INCOMING`. So far, so good. Up to that point, all conversations were telephone conversations. But surprise surprise... we decided to support SMS conversations as well. So what's next? It's time to add a new `type` property... Wait... What?!

That's right. We needed to handle new types: `PHONE` and `SMS`. So what now?

What if we get a request to distinguish between `INTERNAL` and `EXTERNAL` conversations? How do we add another `type`?

In our case:

- `OUTGOING` and `INCOMING` could be called `direction`,
- `PHONE` and `SMS` could be called `medium`,
- `INTERNAL` and `EXTERNAL` could be called `scope`.

Of course, it is possible that these different names are still too broad and that we should think more deeply. But for sure, `type` is often too generic and too broad as a property name.

**TOTD**: Think twice before naming a property `type`. Possibly it is not the name you are looking for.
