
const superagent = require("superagent")

const completionsUrl = 'https://api.openai.com/v1/completions'
const headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer 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",
}

const getConfig = (words) => ({
  model: "text-davinci-003",
  prompt: `${words}`,
  temperature: 0.7,
  n: 1,
  stream: false,
  logprobs: null,
  max_tokens: 2000,
})

export default async function handler(req, res) {
  const body = getConfig(req.body.words)
  superagent.post(completionsUrl)
    .send(body)
    .set('Content-Type', "application/json")
    .set('Authorization', "Bearer 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")
    .end((err, response) => {
      console.log({
        err,
        response
      })
      const data = err ? '服务正忙，请稍后再试...' : JSON.parse(response.text).choices[0].text
      res.status(200).json({ data })
    })
}