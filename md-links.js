// Get process.stdin as the standard input object.
let standardInput = process.stdin;

// Set input character encoding.
standardInput.setEncoding('utf-8');

// Prompt user to input data in console.
console.log('Please input a directory in command line, "exit" to close.');

// When user input data and click enter key.
standardInput.on('data', (data) => {

    // User input exit.
    if(data === 'exit\n'){
        // Program exit.
        console.log("User input complete, program exit.");
        process.exit();
    } else if (data.substring(data.length-1, data.length-4) === '.md') {
        //Saltarse el paso de filehound e ir directo al paso de markdown-link-extractor
        callMarkdownLinkExtractor(data.replace('\n', ''));
    } else {
        // Print user input in console.
        console.log('User Input Data : ' + data);
        let directory = data.replace('\n', '');
        findUrlAndLinks(directory);
    }
});

//esto tiene que ser una función y adentro de paths tiene que ingresar data
const findUrlAndLinks = (Directory) => {
    callFileHound(Directory);
}

const callFileHound = (Directory) => {
    const FileHound = require('filehound');
    
    const files = FileHound.create()
    .paths(Directory)
    .ext('md')
    .find();
    
    files.then(res => {
        res.forEach( (element) => {
            console.log('filehound: '+element);
            callMarkdownLinkExtractor(element);
        })
    });
}

const callMarkdownLinkExtractor = (element) => {
    let fs = require('fs');
    let markdownLinkExtractor = require('markdown-link-extractor');
    let markdown = fs.readFileSync(element).toString();
    let links = markdownLinkExtractor(markdown);
    let mdTextLinkExtractor = require('./markdown-text-link-extractor');
    let texts = mdTextLinkExtractor(markdown);
    let returnObjectArray = [];
    let returnObject = {
        link: '',
        text: ''
    }
    links.forEach(function (link) {
        //console.log('markdown-link-extractor: '+ link);
        texts.forEach(function (text) {
            //console.log('markdown-text-link-extractor: '+ text); 
            returnObject.link = link;
            returnObject.text = text;
        });
        returnObjectArray.push(returnObject);
    });

    console.log(returnObjectArray);
}


