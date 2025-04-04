const mongoose = require('mongoose');

const DB = process.env.MONGODB_URI_COMPASS ;

mongoose.connect(DB, {
    useNewUrlParser: true,
   
    useUnifiedTopology: true
    
})
.then(() => {
    console.log(`Connection successful`, DB);
})
.catch((err) => console.log(`No connection: ${err.message}`));
