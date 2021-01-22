const mongoose=require('mongoose')

const dbConnect=()=>{
    //Connect DB
    mongoose.connect('mongodb://localhost:127.1.1.0/mybook', {
        useFindAndModify: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log('Database connected')
    }).catch((err) => {
        console.log('Errrror')
    })

};

module.exports=dbConnect