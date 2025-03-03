---
title: Two useful uses of git when working with monorepo - skipping or selecting only a specific part of a branch
author: piotr
date: 2025-03-03 21:40:00 +0100
categories: [Development]
tags: [git, monorepo]
pin: false
---

During my adventure with monorepo, I've often struggled with the need to skip a particular module, directory, or set of files when merging from one branch to another. 

On the other hand, I also had the need to merge only a specific module, directory or set of files.  

This happened so often that I've created a cheat sheet that I'll share below. I hope you find it as useful as I did.

## Merge everything but a specific item

First, check out the target branch.

```bash
git checkout dest_branch
```

Do the merge, but do not commit. Do not resolve conflicts (if any) yet.

```bash
git merge --no-commit --no-ff source_branch
```

Reset the directory (or files) you want to skip in the merge.

```bash
git reset -- module_to_skip
```

Now it is time to resolve conflicts and commit changes.

```bash
git commit
```

Then you can remove files from the _Changes not staged for commit_ section. 

```bash
git restore module_to_skip
```

And files from the _Untracked files_ section. 

```bash
git clean -fd
```

## Merge only a specific item

Of course, in this case, we could use the exact same procedure as above, but with many more modules, directories, or files reset. 

Fortunately, for our use case, the following way was just as useful.

First, check out the destination branch.

```bash
git checkout dest_branch
```

Checkout the necessary changes from the source branch.

```bash
git checkout source_branch -- module_to_get
```

Resolve conflicts and commit.

```bash
git commit
```

## There is ~~no~~ other way

I have found many more uses of git to perform similar operations. I'm not saying the above is the only one. It was convenient to use. If you have another more efficient way, please share it in the comments section below.
