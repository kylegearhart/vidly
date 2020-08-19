const express = require('express')
const app = express()

app.listen(
  3000,
  () => {
    console.log('Vidley launched and listening on port 3000.')
  },
)
