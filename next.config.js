const BOM_TOOL_HOST = 'https://bom-tool-ng.octopart.com'

module.exports = {
  poweredByHeader: false,
  publicRuntimeConfig: {
    bomToolHost: process.env.BOM_TOOL_HOST || BOM_TOOL_HOST,
  },
  serverRuntimeConfig: {
    bomToolProto: process.env.BOM_TOOL_PROTO || 'http',
    bomToolSecret: process.env.BOM_TOOL_SECRET,
  },
}

