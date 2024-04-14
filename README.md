# CloudflareAI
Steps to build a text generator application in workers ai by cloudflare

Remember that Cloudflare Workers supports two main syntaxes for writing worker scripts:
• Service Worker Syntax: This is the older syntax and addEventListener is used to register event handlers.
• Module Syntax: This is the newer syntax and export default is used to define the function of the controller.
If you are using module syntax, you must configure Cloudflare Wrangler (the deployment tool) to recognize it.
