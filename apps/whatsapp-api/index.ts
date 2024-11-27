import express from 'express';

const port = 5173;

const app = express()

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})