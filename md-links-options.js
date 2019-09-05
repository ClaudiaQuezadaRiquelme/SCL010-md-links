module.exports = mdLinksOptions = {
    validate: (directory, link, text) => {
        const fetch = require('node-fetch');
        //let status;
        fetch(link)
        .then((res) => {
            if (!(res.statusText.localeCompare('Not Found'))) {
                console.log(directory,' ',link, ' ','Fail ',res.status,' ', text );
            } else {
                console.log(directory,' ',link, ' ',res.statusText,' ',res.status,' ', text );
            }
            
          })
        .catch((err) => {
            // handle error for example
            console.error(err);
        });
    }
};