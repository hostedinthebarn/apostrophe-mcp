// @hostedinthebarn/apostrophe-mcp: an MCP server for ApostropheCMS 4, installed
// into the site as a module and served at /mcp. The design is in
// docs/adr/0002-v1-scope.md. Nothing is built yet: a spike proves the
// contributor cap and the transport first. This is the module shell, so the
// package, CI and release pipeline exist before the code does.
module.exports = {
  options: {
    alias: 'mcp'
  }
};
