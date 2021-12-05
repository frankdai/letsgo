const fs = require('fs');

export default function handler(req, res) {
  try {
    fs.writeFileSync('./data/data.json', JSON.stringify(req.body, null, 2))
    res.status(200).json({ success: true })
  } catch (e) {
    res.status(400).json({ success: false })
  }
}