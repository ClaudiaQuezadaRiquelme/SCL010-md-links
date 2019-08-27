module.exports = () => {
  // ...
};

const FileHound = require('filehound');
let fs = require('fs');
let markdownLinkExtractor = require('markdown-link-extractor');
 
const files = FileHound.create()
  .paths('./')
  .ext('md')
  .find();
 
files.then(res => {
  res.forEach( (element)=> {
    console.log('filehound: '+element)
    let markdown = fs.readFileSync(element).toString();
    let links = markdownLinkExtractor(markdown);
    links.forEach(function (link) {
      console.log('markdown-link-extractor: '+ link);
      });
    
  })
  
});









