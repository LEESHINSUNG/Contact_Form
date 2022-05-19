const path = require("path")

const screenContact = (req, res) => {
  res.sendFile(path.join(__dirname,'..','html','contact.html'))
}

const screenInquiry = (req, res) => {
  res.sendFile(path.join(__dirname,'..','html','inquiry.html'));
}

module.exports = {
  screenContact,
  screenInquiry,
}
