---
layout: post
title: On Frameworks | Maintainability | Dependencies | Documentation | Release HELL
categories: [Software Engineering, JS, Node, Python, Web Development]
---

 It's 12:40 at night and instead of doing what I had planned, I spent two hours googling, reading, debugging failing builds, deprecation warnings, errors, and security vulnerability warnings of high and critical issues within dependencies.

I finally realized that not only was the issue with the npm package I was attempting to use, It was a problem with the package's latest version, the node version, the npm version, and an obscure dependency (another npm package) that relies on certain operating system specific build tools used by node!

The specific build tools needed by this 'sub-dependency' are to run scripts written in Python that are called by nodejs somewhere in their JavaScript source code, which were incompatible with my local Python version! 

These Python scripts then relied on other Python libraries that needed to run using certain Python versions as well! Which, even though I'm using Pipenv, I had to downgrade to an older Python release to simply install a library that relied on another library which called Python! The kicker, none of this is documented anywhere!

I will revisit this and write about how to avoid this scenario as an author/company/team that is distributing software, and how to not have to go through hell like this as a developer when trying to get xyz package, library, module, program, etc. simply to build, install, or run.

I will update this post and rant about it more by the end of the week. I'd love to hear other developer's feedback on the woes of dependency/version hell. 

Lastly, thank goodness for NVM and Pipenv, but at times dependency management still turns into a nightmare and a bad time for all.

Send me a solid nod, thumbs up, or hug if ya feel my pain and have been through similar trial and error with software libraries and tools.

Cheers! 
