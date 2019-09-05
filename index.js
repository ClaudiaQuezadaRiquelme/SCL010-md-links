const mdLinksFile = require('./md-links.js');
//const mdLinksOptions = require('./md-links-options.js');
const mdLinksValidate = require('./md-links-validate.js');

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
    } else {
      let input = data.split(' ');
      if (input.length > 1) {
        
        let directory = input[0];
        let option = input[1];
        
        /* después modificar para combinar dos opciones*/

        if (!(option.localeCompare('--validate\n'))  || !(option.localeCompare('--val\n'))) {
          
          //miau
          //mdLinksOptions.returnValidate(directory,'https://hackersandslackers.com/making-api-requests-with-nodejs/', 'blablabla');//valid
          //mdLinksOptions.returnValidate(directory,'http://pastie.org/private/1wfgxtoipkeaokbqgtpjig', 'blablabla');//invalid

          mdLinksValidate.mdPromise(directory);

        } else if (option === '--stats' || option === '--st') {
          //re-miau
        } 
      } else { //comportamiento por defecto
        mdLinksFile.findUrlAndLinks(data);//funciona. Bakán, terrible buena onda
      }
    }
});

