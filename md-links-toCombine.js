const stats = require('./md-links-options.js');

module.exports = mdLinksToCombine = { //mdPromise y findUrlAndLinks hacen lo mismo. Uno es promesa y el otro, no
    mdPromise: (data) => { //con promesa
        let promise = new Promise ( (resolve, reject) => {
            if (data.substring(data.length-1, data.length-4) === '.md') {//si es url de un archivo
                // Print user input in console.
                console.log('User Input Data : ' + data);
                //Saltarse el paso de filehound e ir directo al paso de markdown-link-extractor
                resolve( mdLinksToCombine.printDirectoryLinkText(mdLinksToCombine.callMarkdownLinkExtractor(data.replace('\n', ''))) );
            } else {//si es un directorio
                // Print user input in console.
                console.log('User Input Data : ' + data);
                resolve( mdLinksToCombine.callFileHound(data.replace('\n', '')) );
            }
        })
        return promise;
    },

    findUrlAndLinks: (data) => { // sin promesa
        if (data.substring(data.length-1, data.length-4) === '.md') {//si es url de un archivo
            // Print user input in console.
            console.log('User Input Data : ' + data);
            //Saltarse el paso de filehound e ir directo al paso de markdown-link-extractor
            mdLinksToCombine.printDirectoryLinkText(mdLinksToCombine.callMarkdownLinkExtractor(data.replace('\n', '')));
        } else {//si es un directorio
            // Print user input in console.
            console.log('User Input Data : ' + data);
            mdLinksToCombine.callFileHound(data.replace('\n', ''));
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
                mdLinksToCombine.printDirectoryLinkText(mdLinksToCombine.callMarkdownLinkExtractor(element, directoryString));
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
        
        if (directoryString === undefined) { //if directoryString === udefined, directoryString = element
            directory = element;
            directory += '  ';
            
        } else {
            directory = directoryString;
            directory += ' ';
        }
    
        let ArrayOfLinkTextObjects = [];
        
        let count = 0;
        links.forEach( (link) => {
            let directoryLinkTextObject = {
                directory: '',
                link: '',
                text: ''
                //status: ''//valid / invalid === ok / fail //no se puede guardar el status porque fetch() funciona con promesas y las promesas no retornan cosas, sólo promesas
            }
    
            let truncatedText = mdLinksToCombine.returnTruncatedText(texts[count]);
            directoryLinkTextObject.directory = directory;
            directoryLinkTextObject.link = link;
            directoryLinkTextObject.text = truncatedText;
    
            ArrayOfLinkTextObjects.push(directoryLinkTextObject);
            count += 1;
        });
    
        return ArrayOfLinkTextObjects;
    },
    
    returnTruncatedText: (text) => {
        const length = 50;
        let truncatedText = text.substring(0, length);
        return truncatedText;
    },
    
    printDirectoryLinkText: (objectArray) => { //esto debería ser una promesa
        //aquí dentro deberías validar los link e imprimir el status y ok/fail
        //tal vez en vez de recibir arreglo de strings, debe recibir arreglo de objetos y aquí armar el string
        console.log(objectArray[0].directory);

        stats.statsAndBroken(objectArray) //hace lo mismo que lo comentado más abajo. No mejora nada... sí mejora: evita encadenar promesas
        .then( )
        .catch( (err) => {
            // handle error for example
            console.error(err);
        });
    
        // stats.stats(objectArray)
        // .then( stats.broken(objectArray) )
        // .then( )
        // .catch( (err) => {
        //     // handle error for example
        //     console.error(err);
        // });
 
    }
  };
