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
        res.forEach( (element) => {//nunca entra acá cuando poones ruta de archivo
            let directoryString = '';
            directoryString += element;
            directoryString += ' ';
            callMarkdownLinkExtractor(element, directoryString);
        })
    });
}

const callMarkdownLinkExtractor = (element, directoryString) => {
    let fs = require('fs');
    let markdownLinkExtractor = require('markdown-link-extractor');
    let markdown = fs.readFileSync(element).toString();
    let links = markdownLinkExtractor(markdown);//[]
    let mdTextLinkExtractor = require('./markdown-text-link-extractor');
    let texts = mdTextLinkExtractor(markdown);//[]
    let directory = '';
    let linkText = '';
    
    if (directoryString === undefined) { //if directoryString === udefined, directoryString = element
        directory = element;
        directory += '  ';
        
    } else {
        directory = directoryString;
        directory += ' ';
    }

    linkText += directory;
    let returnObjectArray = [];
    
    let count = 0;
    links.forEach( (link) => {
        let returnObject = {
            link: '',
            text: ''
        }

        let truncatedText = returnTruncatedText(texts[count]);
        returnObject.link = link;
        returnObject.text = truncatedText;

        returnObjectArray.push(returnObject);
        count += 1;
    });

    for(count = 0; count < returnObjectArray.length; count++) {
        linkText += returnObjectArray[count].link;
        linkText += '  ';
        linkText += returnObjectArray[count].text;
        linkText += '  ';
        console.log(linkText);//lo que queremos ver como resultado final en terminal
        linkText = directory;
    }
}

const returnTruncatedText = (text) => {
    let length = 50;
    let truncatedText = text.substring(0, length);
    return truncatedText;
}