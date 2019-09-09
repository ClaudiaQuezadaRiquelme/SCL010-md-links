const mdLinksFile = require('./md-links.js');
const mdLinksValidate = require('./md-links-validate.js');
const mdLinksStats = require('./md-links-stats.js');
const mdLinksToCOmbine = require('./md-links-toCombine.js');

// Get process.stdin as the standard input object.
let standardInput = process.stdin;

// Set input character encoding.
standardInput.setEncoding('utf-8');

// Prompt user to input data in console.
console.log('Welcome to md-links. Please input the key word "md-links", spacebar and a directory in command line; "md-links exit" to close.');

// When user input data and click enter key.
standardInput.on('data', (data) => {

    // User input exit.
    if(data === 'md-links exit\n' || data === 'md-links EXIT\n' || data === 'md-links Exit\n'){
        // Program exit.
        console.log("User input complete, program exit.");
        process.exit();
    } else {
      let input = data.split(' ');
      if ( !(input[0].replace('\n', '')).localeCompare('md-links') ) {
        
        if (input.length === 4) { // directory --val --st
        
          let directory = input[1];
          let firstOption = input[2];
          let secondOption = input[3].replace('\n', '');
  
          if(  ( (!(firstOption.localeCompare('--validate'))  || !(firstOption.localeCompare('--val'))) && (!(secondOption.localeCompare('--stats'))  || !(secondOption.localeCompare('--st'))) ) || ( (!(firstOption.localeCompare('--stats'))  || !(firstOption.localeCompare('--st'))) && (!(secondOption.localeCompare('--validate'))  || !(secondOption.localeCompare('--val'))) )  ) {
            mdLinksToCOmbine.mdPromise(directory);//doesn`t work very well
          }
  
        } else if (input.length === 3) {
          let directory = input[1];
          let option = input[2];
       
          if (!(option.localeCompare('--validate\n'))  || !(option.localeCompare('--val\n'))) {
            mdLinksValidate.mdPromise(directory);
  
          } else if (!(option.localeCompare('--stats\n')) || !(option.localeCompare('--st\n'))) {
            mdLinksStats.mdPromise(directory);
          } 
        } else { //comportamiento por defecto
          mdLinksFile.mdPromise(input[1]);//funciona. Bakán, terrible buena onda
        }
      }
      
    }
});

