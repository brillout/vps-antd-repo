const express = require('express')
const compression = require('compression')
const { renderPage } = require('vite-plugin-ssr')
const { performance } = require('perf_hooks')


const isProduction = process.env.NODE_ENV === 'production'
const root = `${__dirname}/..`

startServer()

async function startServer() {
  global.__vite_server_start_time = performance.now()
  global.__vite_dom_mounted = false

  const app = express()

  app.use(compression())

  if (isProduction) {
    const sirv = require('sirv')
    app.use(sirv(`${root}/dist/client`))
  } else {
    const vite = require('vite')
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares
    app.use(viteDevMiddleware)
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    const pageContextInit = {
      url,
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return next()
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  const port = 3001
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
