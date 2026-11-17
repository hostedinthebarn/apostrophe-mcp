# Security policy

## Reporting a vulnerability

Please report security problems privately, through GitHub's **private vulnerability reporting** on this repository (Security → Report a vulnerability). Don't open a public issue.

We'll acknowledge within a few days and say what we'll do about it.

## What this package is trusted with

It runs inside an Apostrophe site and acts for signed-in editors, so its security rules are the point of it:

- Every call runs as the signed-in person with permissions **capped at contributor**, so Apostrophe itself refuses to publish.
- It has no publish or delete tools.
- Every call is written to an audit log the site's administrators can read.

A way around any of these is a vulnerability. Please report it.
