const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://<User>:<Password>@benoxdb.tvknv.mongodb.net/maik?retryWrites=true&w=majority", {})   
    .then(db => console.log('DB Connected!'))
    .catch(err => console.error(err));
