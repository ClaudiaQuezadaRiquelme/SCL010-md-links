const mdLinksFile = require('./md-links.js');
const mdLinksValidate = require('./md-links-validate.js');
const mdLinksStats = require('./md-links-stats.js');
const mdLinksToCOmbine = require('./md-links-toCombine.js');

// Get process.stdin as the standard input object.
let standardInput = process.stdin;

// Set input character encoding.
standardInput.setEncoding('utf-8');

// Prompt user to input data in console.
console.log('Please input a directory in command line, "exit" to close.');

// When user input data and click enter key.
standardInput.on('data', (data) => {

    // User input exit.
    if(data === 'exit\n' || data === 'EXIT\n' || data === 'Exit\n'){
        // Program exit.
        console.log("User input complete, program exit.");
        process.exit();
    } else {
      let input = data.split(' ');
      if (input.length === 3) { // directory --val --st
        
        let directory = input[0];
        let firstOption = input[1];
        let secondOption = input[2].replace('\n', '');

        if(  ( (!(firstOption.localeCompare('--validate'))  || !(firstOption.localeCompare('--val'))) && (!(secondOption.localeCompare('--stats'))  || !(secondOption.localeCompare('--st'))) ) || ( (!(firstOption.localeCompare('--stats'))  || !(firstOption.localeCompare('--st'))) && (!(secondOption.localeCompare('--validate'))  || !(secondOption.localeCompare('--val'))) )  ) {
          mdLinksToCOmbine.mdPromise(directory);//doesn`t work very well
        }

      } else if (input.length > 1) {
        let directory = input[0];
        let option = input[1];
     
        if (!(option.localeCompare('--validate\n'))  || !(option.localeCompare('--val\n'))) {
          //miau
          mdLinksValidate.mdPromise(directory);

        } else if (!(option.localeCompare('--stats\n')) || !(option.localeCompare('--st\n'))) {
          //re-miau
          mdLinksStats.mdPromise(directory);
        } 
      } else { //comportamiento por defecto
        mdLinksFile.mdPromise(data);//funciona. Bakán, terrible buena onda
      }
    }
});

