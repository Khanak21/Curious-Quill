const express = require('express')
const morgan = require('morgan')
const mongoose=require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

//express app
const app = express();

//connect to mongodb
const dbURI="mongodb+srv://<username>:<password>@cluster1.3epms5u.mongodb.net/cqblogs?retryWrites=true&w=majority"
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
  .then((result)=>app.listen(3002))
  .catch((err)=>console.log(err))
//register view engine(lets us configure app's settings)
//by default it looks in views for ejs files
app.set('view engine','ejs')
// app.set('views','myviews') or set your custom folder name here

//listen for requests only after connection to mongodb made

//middleware & static files
app.use(express.static('public'))//look in the public folder to make these static files accessible to the browser/clients
app.use(express.urlencoded({extended:true}))//for accepting form data
//to log requests
app.use(morgan('dev'))

app.get('/',(req,res)=>{
    res.redirect('/blogs')
    // const blogs=[
    //     {title: 'How to ace boards',snippet:'hi hello ji namaste'},
    //     {title: 'How to ace jee',snippet:'hi hello ji namaste'},
    //     {title: 'How to ace bitsat',snippet:'hi hello ji namaste'},

        

    // ]
    // res.render("index",{title:"Home",blogs});//pass properties/like props inside to be passed to index
    // //it will automatically see in views folder
})

app.get('/about',(req,res)=>{
    res.render("about",{title:'About'});

})


app.get('/add-blog',(req,res)=>{
    const blog =new Blog({
        title: 'new blog',
        snippet:'about my new blog',
        body:'more about my new blog'
    });

    blog.save()
      .then(result=>{
        res.send(result)
      })
      .catch(err=>{
        console.log(err)
      })
})


//blog routes
app.use(blogRoutes)

//404 page
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
})
