const mongoose = require('mongoose');

const DB = process.env.MONGODB_URI;

mongoose.connect(DB, {
    useNewUrlParser: true,
   
    useUnifiedTopology: true
    
})
.then(() => {
    console.log(`Connection successful`);
})
.catch((err) => console.log(`No connection: ${err.message}`));
