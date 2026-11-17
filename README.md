# apostrophe-mcp

An open-source [Model Context Protocol](https://modelcontextprotocol.io) server for [ApostropheCMS 4](https://apostrophecms.com), so the people who look after an Apostrophe site can update it by asking Claude. Built by [Hosted in the Barn](https://hostedinthebarn.com). **Not an official ApostropheCMS product.**

**Status:** designed, not built yet. The first site to use it is [church-system](https://github.com/hostedinthebarn/church-system).

## How it works

- It's an Apostrophe module you add to your site. It serves the MCP at `/mcp`, so editors add your site to Claude as a custom connector by its URL. Nobody installs Node.
- Each editor signs in as **their own Apostrophe user**, so the site's history shows who changed what, marked as AI-assisted.
- **Claude can only save drafts.** Every call runs with the editor's permissions capped at contributor level, so Apostrophe itself refuses to publish. A person reviews and publishes in Apostrophe's own editor.
- There are no publish or delete tools, and every call is written to an audit log administrators can read.

The design is in [docs/adr/0002-v1-scope.md](docs/adr/0002-v1-scope.md).

## Security

See [SECURITY.md](SECURITY.md). Releases are published from GitHub Actions with npm provenance, so each version on npm links to the commit that built it.

## Licence

MIT. Changes reach `main` through pull requests only, and CI must pass.
