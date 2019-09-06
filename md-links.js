module.exports = mdLinksDefect = { //mdPromise y findUrlAndLinks hacen lo mismo. Uno es promesa y el otro, no
    mdPromise: (data) => { //con promesa
        let promise = new Promise ( (resolve, reject) => {
            if (data.substring(data.length-1, data.length-4) === '.md') {//si es url de un archivo
                // Print user input in console.
                console.log('User Input Data : ' + data);
                //Saltarse el paso de filehound e ir directo al paso de markdown-link-extractor
                resolve( mdLinksDefect.printDirectoryLinkText(mdLinksDefect.callMarkdownLinkExtractor(data.replace('\n', ''))) );
            } else {//si es un directorio
                // Print user input in console.
                console.log('User Input Data : ' + data);
                resolve( mdLinksDefect.callFileHound(data.replace('\n', '')) );
            }
        })
        return promise;
    },

    findUrlAndLinks: (data) => { // sin promesa
        if (data.substring(data.length-1, data.length-4) === '.md') {//si es url de un archivo
            // Print user input in console.
            console.log('User Input Data : ' + data);
            //Saltarse el paso de filehound e ir directo al paso de markdown-link-extractor
            mdLinksDefect.printDirectoryLinkText(mdLinksDefect.callMarkdownLinkExtractor(data.replace('\n', '')));
        } else {//si es un directorio
            // Print user input in console.
            console.log('User Input Data : ' + data);
            mdLinksDefect.callFileHound(data.replace('\n', ''));
        }
    },
    
    callFileHound: (Directory) => {//no se puede testear porque no se puede retornar nada desde una promesa. más info aquí https://stackoverflow.com/questions/22232280/how-do-you-return-inside-a-promise
        const FileHound = require('filehound');
        
        const files = FileHound.create()
        .paths(Directory)
        .ext('md')
        .find();
        
        files.then(res => {
            res.forEach( (element) => {
                let directoryString = '';
                directoryString += element;
                directoryString += ' ';
                mdLinksDefect.printDirectoryLinkText(mdLinksDefect.callMarkdownLinkExtractor(element, directoryString));
            }); 
        });
    },
    
    callMarkdownLinkExtractor: (element, directoryString) => {
        const fs = require('fs');
        const markdownLinkExtractor = require('markdown-link-extractor');
        let markdown = fs.readFileSync(element).toString();
        let links = markdownLinkExtractor(markdown);//[]
        const mdTextLinkExtractor = require('./markdown-text-link-extractor');
        let texts = mdTextLinkExtractor(markdown);//[]
        let directory = '';
        let linkText = '';
        let returnDirectoryLinkText = [];
        
        if (directoryString === undefined) { //if directoryString === udefined, directoryString = element
            directory = element;
            directory += '  ';
            
        } else {
            directory = directoryString;
            directory += ' ';
        }
    
        linkText += directory;
        let ArrayOfLinkTextObjects = [];
        
        let count = 0;
        links.forEach( (link) => {
            let LinkTextObject = {
                link: '',
                text: ''
                //status: ''//valid / invalid === ok / fail //no se puede guardar el status porque fetch() funciona con promesas y las promesas no retornan cosas, sólo promesas
            }
    
            let truncatedText = mdLinksDefect.returnTruncatedText(texts[count]);
            LinkTextObject.link = link;
            LinkTextObject.text = truncatedText;
    
            ArrayOfLinkTextObjects.push(LinkTextObject);
            count += 1;
        });
    
        for(count = 0; count < ArrayOfLinkTextObjects.length; count++) {
            linkText += ArrayOfLinkTextObjects[count].link;
            linkText += '  ';
            linkText += ArrayOfLinkTextObjects[count].text;
            linkText += '  ';
            returnDirectoryLinkText.push(linkText);
            linkText = directory;
        }
    
        return returnDirectoryLinkText;//[]
    },
    
    returnTruncatedText: (text) => {
        const length = 50;
        let truncatedText = text.substring(0, length);
        return truncatedText;
    },
    
    printDirectoryLinkText: (stringArray) => {
        //tal vez en vez de recibir arreglo de strings, debe recibir arreglo de objetos y aquí armar el string
        stringArray.forEach( (stringOfThisArray) => {
            console.log(stringOfThisArray);
        })
    }
  };

