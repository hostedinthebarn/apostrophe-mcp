# 2. Version 1: an in-app module that drafts as the signed-in editor, capped at contributor

- **Status:** accepted
- **Date:** 2026-11-16

## Context

Volunteers who look after an Apostrophe site should be able to update it by asking Claude, through a custom connector, without installing anything. Apostrophe 4's REST and server APIs cover the weekly job (pieces, pages, images, drafts). Two things had to be settled: how Claude acts for a person, and how "drafts only" is guaranteed when that person is an administrator, who can publish.

## Decision

1. **An Apostrophe module installed into the site**, serving the MCP at `/mcp` on the site's own address. The tool code sits in a plain `(req, input)` layer, so a standalone adapter can follow.
2. **Only people with an editing role connect.** Never members.
3. **Drafts only, enforced by Apostrophe.** Every call runs as the real person (so their name is on every change and version, marked as AI-assisted), with permissions **capped at contributor**. A bug or a prompt injection can't publish, because Apostrophe refuses it. If the cap can't be made watertight, the fallback is a contributor-only account per person.
4. **OAuth served by the module**, signing in through the site's own sign-in, with a consent screen. Tokens are short-lived with refresh, administrators can revoke connections, and deactivating a person cuts access.
5. **No publish or delete tools.**
6. **Tools that read or change member data are off by default.** When off, they aren't listed at all; when on, they also check at run time.
7. **An audit log** of every call, including refusals, readable by administrators.
8. **Released to npm via trusted publishing** from GitHub Actions, with provenance. No npm token exists.

## Consequences

- A spike proves the contributor cap and the `/mcp` transport inside Apostrophe's Express stack before the build.
- The definition of done is a real Claude Desktop session saving a correct draft on a live site.
