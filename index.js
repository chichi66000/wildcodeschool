const express = require('express');
const app = express();

// const http = require('http');
// const server = http.createServer(app);

const cors = require('cors');
const dotenv = require('dotenv').config();
const express_sanitizer = require('express-sanitizer');
const PORT = process.env.PORT || "5000";
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100  // limit each IP to 100 requests per windowMs
})
const argonautesRoutes = require('./routes/routes');

// var whitelist = ['https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png']
// var corsOptions = {
//     origin: function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1) {
//         callback(null, true)
//       } else {
//         callback(new Error('Not allowed by CORS'))
//       }
//     }
// }

app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
    "default-src": ["'self'", "https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"],
    "script-src": ["'self'",  "'unsafe-inline'", "'unsafe-eval'"],
    "style-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", " https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css "],
    "img-src": ["https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"]
    },
  }));

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express_sanitizer());
// app.use(helmet());

// set Headers
app.use( (req, res, next) => {
    // res.setHeader('Content-Type', 'application/json, text/html');
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, DELETE, OPTIONS, GET, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content, Accept, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next()
});

mongoose.connect(process.env.MGD_URI, 
    {useNewUrlParser:true,
    useUnifiedTopology:true})
    .then(() => {console.log('Connected to MongoDB');})
    .catch(error => {console.log(error)})

app.use('/argonaute', argonautesRoutes)
// let pathFile = path.join(__dirname , 'public' ,'index.html')
// console.log(pathFile);
// entry point: public/index.html
app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => res.sendFile(path.join(__dirname ,'public' ,'index.html')));

app.listen(PORT, () => {console.log("Listening on port " + PORT)})

module.exports = app