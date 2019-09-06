module.exports = mdLinksOptions = {
    validate: (directory, link, text) => {
        const fetch = require('node-fetch');
        //let status;
        fetch(link)
        .then((res) => {
            if (!(res.statusText.localeCompare('Not Found'))) {
                console.log(directory,' ',link, ' ','FAIL ',res.status,' ', text );
            } else {
                console.log(directory,' ',link, ' ',res.statusText,' ',res.status,' ', text );
            }
            
          })
        .catch((err) => {
            // handle error for example
            console.error(err);
        });
    },

    stats: (arrayOfObjects) => {
        let promise = new Promise ( (resolve, reject) => {
            let total = arrayOfObjects.length;
            console.log('Total: ', total);
            let same = 0;
            
            for (let i=0; i<arrayOfObjects.length; i++) {
                for (let j=0; j<arrayOfObjects.length; j++) {
                    if (i === j) {//compara con todos menos consigo mismo
                        continue;
                    }
                    if ( !(arrayOfObjects[i].link.localeCompare(arrayOfObjects[j].link)) ) {
                        same++;
                    }
                } 
            }

            let unique = total - same;
            console.log('Unique: ', unique);
            
            resolve( { total, unique });
        })
        return promise;
    },

    broken: (arrayOfObjects) => {
        const fetch = require('node-fetch');
        let broken = 0;
        for (let i=0; i<arrayOfObjects.length; i++) {
            fetch(arrayOfObjects[i].link)
            .then((res) => {
                if (!(res.statusText.localeCompare('Not Found'))) {
                    broken = broken + 1;
                    //process.stdout.write(broken, '\r');
                    console.log(arrayOfObjects[i].directory,'  Broken: ',broken);
                    
                } 
            })
            .catch((err) => {
                // handle error for example
                console.error(err);
            });
        }
    }
};