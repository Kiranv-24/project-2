// 1st code---------------------------------------------------------------------->
// const path = require('path');
// const bcrypt = require('bcrypt');
// const express = require('express');
// const collection = require("./config");

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.set('view engine', 'ejs');
// app.use(express.static("views"));

// // Define routes using app.get()
// app.get("/", (req, res) => {
//     res.render("login");
// });
// app.get("/signup", (req, res) => {
//     res.render("signup");
// });
// app.post("/signup", async(req, res) => {
//     const d = {
//         name: req.body.username,
//         password: req.body.password
//     }
//     const existingUser = await collection.findOne({ name: d.name });
//     if (existingUser) {
//         res.send('Username already exists. Please choose a different one.');
//     } else {
//         const hashedPassword = await bcrypt.hash(d.password, 10);
//         d.password = hashedPassword;
//         const userdata = await collection.insertMany(d)
//         res.redirect("/login")
//     }
// });
// // Route for handling user login
// app.post("/login", async(req, res) => {


//     try {
//         const user = await collection.findOne({ name: req.body.username });
//         if (!user) {
//             res.send("user not found")
//         }
//         const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

//         if (isPasswordValid) {
//             res.send("Login successful!");
//         } else {
//             res.send("Invalid password. Please try again.");

//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// const port = 5000;
// app.listen(port, () => {
//     console.log(`Server running on Port:${port}`);
// });





// 2nd code/////
// loginRouter.js
// const express = require('express');
// const bcrypt = require('bcrypt');
// const loginRouter = express.Router();
// const mongoose = require('mongoose');

// // Define User model
// const User = mongoose.model("User", {
//     name: String,
//     password: String,
// });

// // loginRouter.set('view engine', 'ejs');

// // Render login page
// loginRouter.get('/', (req, res) => {
//     res.render('login');
// });

// // Handle user login
// loginRouter.post('/', async(req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await User.findOne({ name: username });
//         if (user) {
//             const isPasswordValid = await bcrypt.compare(password, user.password);

//             if (isPasswordValid) {
//                 res.send("Login successful!");
//             } else {
//                 res.send("Invalid password. Please try again.");
//             }
//         } else {
//             res.send("User not found. Please sign up.");
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// module.exports = loginRouter;











// working
// 3rd code---------------------------------------->
// const path = require('path');
// const bcrypt = require('bcrypt');
// const express = require('express');
// const collection = require("./config");

// const app = express();
// const port = 5000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.set('view engine', 'ejs');
// app.use(express.static("views"));

// // Route for handling root path
// app.get("/", (req, res) => {
//     res.redirect("/login");
// });

// // Route for rendering login page
// app.get("/login", (req, res) => {
//     res.render("login");
// });

// // Route for rendering signup page
// app.get("/signup", (req, res) => {
//     res.render("signup");
// });

// // Route for handling signup form submission
// app.post("/signup", async(req, res) => {
//     const { username, password } = req.body;

//     try {
//         const existingUser = await collection.findOne({ name: username });

//         if (existingUser) {
//             res.send('Username already exists. Please choose a different one.');
//         } else {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             await collection.create({ name: username, password: hashedPassword });
//             res.redirect("/login");
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Route for handling user login
// app.post("/login", async(req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await collection.findOne({ name: username });

//         if (!user) {
//             res.send("User not found");
//         } else {
//             const isPasswordValid = await bcrypt.compare(password, user.password);

//             if (isPasswordValid) {
//                 // res.send("Login successful!");
//                 res.redirect("/adminejs")
//             } else {
//                 res.send("Invalid password. Please try again.");
//             }
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running on Port:${port}`);
// });









// combined working---------------------------------------------------------------------->
// ----------------------------------------------------------------------------------------------------------->
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const bodyParser = require('body-parser');
// const path = require('path');
// // const collection = require('./config');

// const app = express();
// const port = 5000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.set('view engine', 'ejs');
// app.use(express.static('views'));

// // Create a model for the data
// const Data = mongoose.model("Data", new mongoose.Schema({
//     name: String,
//     usn: String,
//     q1: Number,
//     t1: Number,
//     q2: Number,
//     t2: Number,
// }, { collection: "datas" }));

// // Connect to MongoDB (replace with your connection string)
// mongoose.connect("mongodb://localhost:27017/student", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log("Database connected");
// }).catch(err => {
//     console.error("Error connecting to database:", err);
// });

// const loginschema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
// });

// const LoginCollection = mongoose.model('lg', loginschema);

// // Function to fetch all data from the database
// async function fetchAllData() {
//     try {
//         const data = await Data.find({});
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }

// // Route for handling root path
// app.get('/', (req, res) => {
//     res.redirect('/login');
// });

// // Route for rendering login page
// app.get('/login', (req, res) => {
//     res.render('login');
// });

// // Route for rendering signup page
// app.get('/signup', (req, res) => {
//     res.render('signup');
// });

// // Route for handling signup form submission
// app.post('/signup', async(req, res) => {
//     const { username, password } = req.body;

//     try {
//         const existingUser = await LoginCollection.findOne({ name: username });

//         if (existingUser) {
//             res.send('Username already exists. Please choose a different one.');
//         } else {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             await LoginCollection.create({ name: username, password: hashedPassword });
//             res.redirect('/login');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Route for handling user login
// app.post('/login', async(req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await LoginCollection.findOne({ name: username });

//         if (!user) {
//             res.render('login', { error: 'User not found' });
//         } else {
//             const isPasswordValid = await bcrypt.compare(password, user.password);

//             if (isPasswordValid) {
//                 console.log("success")

//                 res.redirect('adminejs');
//             } else {
//                 res.render('login', { error: 'Invalid password. Please try again.' });
//             }
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Endpoint to fetch all data and render the HTML page
// app.get('/', async(req, res) => {
//     try {
//         const data = await fetchAllData();
//         res.render('adminejs', { datas: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Endpoint to add data
// app.get('/', async(req, res) => {
//     try {
//         const data = await fetchAllData();
//         res.render('adminejs', { datas: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Endpoint to add data
// app.post('/add', async(req, res) => {
//     const { name, usn, q1, t1, q2, t2 } = req.body;

//     try {
//         const newData = new Data({
//             name: name,
//             usn: usn,
//             q1: q1,
//             t1: t1,
//             q2: q2,
//             t2: t2,
//         });

//         await newData.save();

//         // Fetch updated data and render the page again
//         const updatedData = await fetchAllData();
//         res.render('adminejs', { datas: updatedData });
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running on Port:${port}`);
// });






















// ---------------------------------------------------------------------------------------------------------->
// three page connected-------------------------------------------------------------------------------------->
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const bodyParser = require('body-parser');
// const path = require('path');
// // const collection = require('./config');

// const app = express();
// const port = 5000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.set('view engine', 'ejs');
// app.use(express.static('views'));

// // Create a model for the data
// const Data = mongoose.model("Data", new mongoose.Schema({
//     name: String,
//     usn: String,
//     q1: Number,
//     t1: Number,
//     q2: Number,
//     t2: Number,
// }, { collection: "datas" }));

// // Connect to MongoDB (replace with your connection string)
// mongoose.connect("mongodb://localhost:27017/student", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log("Database connected");
// }).catch(err => {
//     console.error("Error connecting to database:", err);
// });

// const loginschema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
// });

// const LoginCollection = mongoose.model('lg', loginschema);

// // Function to fetch all data from the database
// async function fetchAllData() {
//     try {
//         const data = await Data.find({});
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }

// // Route for handling root path
// // app.get('/', (req, res) => {
// //     res.redirect('/login');
// // });

// // Route for rendering login page
// app.get('/', (req, res) => {
//     res.render('el');
// });
// app.post('/selectRole', (req, res) => {
//     const selectedRole = req.body.userType;

//     if (selectedRole === 'Admin') {
//         res.redirect('/login');
//     } else {
//         res.send('This role is not supported yet.'); // You can handle other roles as needed
//     }
// });


// app.get('/login', (req, res) => {
//     res.render('login');
// });


// // Route for rendering signup page
// app.get('/signup', (req, res) => {
//     res.render('signup');
// });

// // Route for handling signup form submission
// app.post('/signup', async(req, res) => {
//     const { username, password } = req.body;

//     try {
//         const existingUser = await LoginCollection.findOne({ name: username });

//         if (existingUser) {
//             res.send('Username already exists. Please choose a different one.');
//         } else {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             await LoginCollection.create({ name: username, password: hashedPassword });
//             res.redirect('/login');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Route for handling user login
// app.post('/login', async(req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await LoginCollection.findOne({ name: username });

//         if (!user) {
//             res.render('login', { error: 'User not found' });
//         } else {
//             const isPasswordValid = await bcrypt.compare(password, user.password);

//             if (isPasswordValid) {
//                 console.log("success")

//                 res.redirect('adminejs');
//             } else {
//                 res.render('login', { error: 'Invalid password. Please try again.' });
//             }
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Endpoint to fetch all data and render the HTML page
// app.get('/', async(req, res) => {
//     try {
//         const data = await fetchAllData();
//         res.render('adminejs', { datas: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Endpoint to add data
// app.get('/', async(req, res) => {
//     try {
//         const data = await fetchAllData();
//         res.render('adminejs', { datas: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Endpoint to add data
// app.post('/add', async(req, res) => {
//     const { name, usn, q1, t1, q2, t2 } = req.body;

//     try {
//         const newData = new Data({
//             name: name,
//             usn: usn,
//             q1: q1,
//             t1: t1,
//             q2: q2,
//             t2: t2,
//         });

//         await newData.save();

//         // Fetch updated data and render the page again
//         const updatedData = await fetchAllData();
//         res.render('adminejs', { datas: updatedData });
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running on Port:${port}`);
// });




// new version..1------------------------------------------------------------------->
// Import required modules
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const bodyParser = require('body-parser');
// const path = require('path');

// // Create Express app
// const app = express();
// const port = 5000;

// // Middleware setup
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.set('view engine', 'ejs');
// app.use(express.static('views'));

// // Define MongoDB model for data
// const Data = mongoose.model("Data", new mongoose.Schema({
//     name: String,
//     usn: String,
//     q1: Number,
//     t1: Number,
//     q2: Number,
//     t2: Number,
// }, { collection: "datas" }));

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/student", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log("Database connected");
// }).catch(err => {
//     console.error("Error connecting to database:", err);
// });

// // Define MongoDB model for login information
// const loginschema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
// });

// const LoginCollection = mongoose.model('lg', loginschema);

// // Function to fetch all data from the database
// async function fetchAllData() {
//     try {
//         const data = await Data.find({});
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }

// // Root route for rendering the login page
// app.get('/', (req, res) => {
//     res.render('el');
// });

// // Route to handle role selection
// app.post('/selectRole', (req, res) => {
//     const selectedRole = req.body.userType;

//     if (selectedRole === 'Admin') {
//         res.redirect('/login');
//     } else {
//         res.send('This role is not supported yet.'); // You can handle other roles as needed
//     }
// });

// // Route for rendering login page
// app.get('/login', (req, res) => {
//     res.render('login');
// });

// // Route for rendering signup page
// app.get('/signup', (req, res) => {
//     res.render('signup');
// });

// // Route for handling signup form submission
// app.post('/signup', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const existingUser = await LoginCollection.findOne({ name: username });

//         if (existingUser) {
//             res.send('Username already exists. Please choose a different one.');
//         } else {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             await LoginCollection.create({ name: username, password: hashedPassword });
//             res.redirect('/login');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Route for rendering student section page
// app.get('/sectionsa', (req, res) => {
//     res.render('sectionsa'); // Adjust the file name if needed
// });

// // Route for handling user login
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await LoginCollection.findOne({ name: username });

//         if (!user) {
//             res.render('login', { error: 'User not found' });
//         } else {
//             const isPasswordValid = await bcrypt.compare(password, user.password);

//             if (isPasswordValid) {
//                 console.log("Login success");
//                 res.redirect('sectionsa');
//             } else {
//                 res.render('login', { error: 'Invalid password. Please try again.' });
//             }
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Endpoint to fetch and render CSE student data
// app.get('/cse', async (req, res) => {
//     try {
//         const data = await fetchAllData();
//         res.render('cse_students', { datas: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Route to handle adding new CSE student data
// app.post('/cse', async (req, res) => {
//     const { name, usn, q1, t1, q2, t2 } = req.body;

//     try {
//         const newData = new Data({
//             name: name,
//             usn: usn,
//         });

//         await newData.save();

//         // Fetch updated data and render the page again
//         const updatedData = await fetchAllData();
//         res.render('cse_students', { datas: updatedData });
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Endpoint to fetch and render CSE-DS student data
// app.get('/cscd', async (req, res) => {
//     try {
//         const data = await fetchAllData();
//         res.render('cse-ds_students', { datas: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Route to handle adding new CSE-DS student data
// app.post('/cscd', async (req, res) => {
//     const { name, usn, q1, t1, q2, t2 } = req.body;

//     try {
//         const newData = new Data({
//             name: name,
//             usn: usn,
//         });

//         await newData.save();

//         // Fetch updated data and render the page again
//         const updatedData = await fetchAllData();
//         res.render('cse-ds_students', { datas: updatedData });
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Endpoint to fetch and render CSE-CY student data
// app.get('/cscy', async (req, res) => {
//     try {
//         const data = await fetchAllData();
//         res.render('cse-cy_students', { datas: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Route to handle adding new CSE-CY student data
// app.post('/cscy', async (req, res) => {
//     const { name, usn, q1, t1, q2, t2 } = req.body;

//     try {
//         const newData = new Data({
//             name: name,
//             usn: usn,
//         });

//         await newData.save();

//         // Fetch updated data and render the page again
//         const updatedData = await fetchAllData();
//         res.render('cse-cy_students', { datas: updatedData });
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Endpoint to fetch and render ISE student data
// app.get('/ise', async (req, res) => {
//     try {
//         const data = await fetchAllData();
//         res.render('is_students', { datas: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Route to handle adding new ISE student data
// app.post('/ise', async (req, res) => {
//     const { name, usn, q1, t1, q2, t2 } = req.body;

//     try {
//         const newData = new Data({
//             name: name,
//             usn: usn,
//         });

//         await newData.save();

//         // Fetch updated data and render the page again
//         const updatedData = await fetchAllData();
//         res.render('is_students', { datas: updatedData });
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on Port:${port}`);
// });





// //////////////////////////////new version...2--------------------------------------------------------------------------------------------->
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app = express();
// const port = 5000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.set('view engine', 'ejs');
// app.use(express.static('views'));

// // Create a model for the data
// const Data = mongoose.model("Data", new mongoose.Schema({
//     Name: String,
//     USN: String,
//     Email: String,
//     q1: Number,
//     t1: Number,
//     q2: Number,
//     t2: Number,
// }, { collection: "datas" }));

// // Model for cse-cy data
// const Datacy = mongoose.model("Datacy", new mongoose.Schema({
//     Name: String,
//     USN: String,
//     Email: String,
//     q1: Number,
//     t1: Number,
//     q2: Number,
//     t2: Number,
// }, { collection: "csecy" }));
// // Model for cse-cd
// const Datacd = mongoose.model("Datacd", new mongoose.Schema({
//     Name: String,
//     USN: String,
//     Email: String,
//     q1: Number,
//     t1: Number,
//     q2: Number,
//     t2: Number,
// }, { collection: "csecd" }));
// const Dataise = mongoose.model("Dataise", new mongoose.Schema({
//     Name: String,
//     USN: String,
//     Email: String,
//     q1: Number,
//     t1: Number,
//     q2: Number,
//     t2: Number,
// }, { collection: "isedata" }));
// const Dataec = mongoose.model("Dataec", new mongoose.Schema({
//     Name: String,
//     USN: String,
//     Email: String,
//     q1: Number,
//     t1: Number,
//     q2: Number,
//     t2: Number,
// }, { collection: "ece" }));
// const Datacv = mongoose.model("Datacv", new mongoose.Schema({
//     Name: String,
//     USN: String,
//     Email: String,
//     q1: Number,
//     t1: Number,
//     q2: Number,
//     t2: Number,
// }, { collection: "cve" }));
// const Dataas = mongoose.model("Dataas", new mongoose.Schema({
//     Name: String,
//     USN: String,
//     Email: String,
//     q1: Number,
//     t1: Number,
//     q2: Number,
//     t2: Number,
// }, { collection: "ase" }));
// const Datame = mongoose.model("Datame", new mongoose.Schema({
//     Name: String,
//     USN: String,
//     Email: String,
//     q1: Number,
//     t1: Number,
//     q2: Number,
//     t2: Number,
// }, { collection: "medata" }));

// mongoose.connect("mongodb://localhost:27017/student", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log("Database connected");
// }).catch(err => {
//     console.error("Error connecting to database:", err);
// });

// const loginschema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
// });

// const LoginCollection = mongoose.model('lg', loginschema);

// async function fetchAllData() {
//     try {
//         const data = await Data.find({});
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }
// // function for cse-cy
// async function fetchAllDataCSCY() {
//     try {
//         const data = await Datacy.find({});
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }
// async function fetchAllDataCSCD() {
//     try {
//         const data = await Datacd.find({});
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }
// async function fetchAllDataISE() {
//     try {
//         const data = await Dataise.find({});
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }
// async function fetchAllDataECE() {
//     try {
//         const data = await Dataec.find({});
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }
// async function fetchAllDataASE() {
//     try {
//         const data = await Dataas.find({});
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }
// async function fetchAllDataCV() {
//     try {
//         const data = await Datacv.find({});
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }
// async function fetchAllDataME() {
//     try {
//         const data = await Datame.find({});
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error;
//     }
// }

// app.get('/', (req, res) => {
//     res.render('el');
// });

// app.post('/selectRole', (req, res) => {
//     const selectedRole = req.body.userType;

//     if (selectedRole === 'Admin') {
//         res.redirect('/login');
//     } else if (selectedRole === 'coordinator') {
//         res.redirect('/login');
//     } else {
//         res.send('This role is not supported yet.');
//     }
// });

// app.get('/login', (req, res) => {
//     res.render('login');
// });

// app.get('/signup', (req, res) => {
//     res.render('signup');
// });

// app.post('/signup', async(req, res) => {
//     const { username, password } = req.body;

//     try {
//         const existingUser = await LoginCollection.findOne({ name: username });

//         if (existingUser) {
//             res.send('Username already exists. Please choose a different one.');
//         } else {
//             const hashedPassword = await bcrypt.hash(password, 10);
//             await LoginCollection.create({ name: username, password: hashedPassword });
//             res.redirect('/login');
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.get('/sectionsa', (req, res) => {
//     res.render('sectionsa');
// });
// // for admin
// app.post('/login', async(req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await LoginCollection.findOne({ name: username });

//         if (!user) {
//             res.render('login', { error: 'User not found' });
//         } else {
//             const isPasswordValid = await bcrypt.compare(password, user.password);

//             if (isPasswordValid) {
//                 console.log("success");
//                 // if (selectedRole === 'Admin') {
//                 res.redirect('sectionsa');
//                 // }

//             } else {
//                 res.render('login', { error: 'Invalid password. Please try again.' });
//             }
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });


// app.get('/cse', async(req, res) => {
//     try {
//         const data = await fetchAllData();
//         res.render('cse_students', { datas: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.post('/cse', async(req, res) => {
//     const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

//     try {
//         const newData = new Data({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//         });

//         await newData.save();

//         const updatedData = await fetchAllData();
//         res.render('cse_students', { datas: updatedData });
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.get('/cscd', async(req, res) => {
//     try {
//         const data = await fetchAllDataCSCD();
//         res.render('cse-ds_students', { csecd: data }); // Pass 'csecd' variable to the template
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });


// app.post('/cscd', async(req, res) => {
//     const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

//     try {
//         const newDataCSCD = new Datacd({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//         });

//         await newDataCSCD.save();

//         const updatedData = await fetchAllDataCSCD();
//         res.render('cse-ds_students', { datas: updatedData });
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Assuming this is your route for rendering cse-cy_students.ejs
// app.get('/cscy', async(req, res) => {
//     try {
//         const data = await fetchAllDataCSCY();
//         res.render('cse-cy_students', { csecy: data }); // Pass 'csecy' variable to the template
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });


// app.post('/cscy', async(req, res) => {
//     const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

//     try {
//         const newDataCSCY = new Datacy({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//         });

//         await newDataCSCY.save();

//         const updatedData = await fetchAllDataCSCY();
//         res.render('cse-cy_students', { datas: updatedData });
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.get('/ise', async(req, res) => {
//     try {
//         const data = await fetchAllDataISE();
//         res.render('is_students', { isedata: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.post('/ise', async(req, res) => {
//     const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

//     try {
//         const newDataISE = new Dataise({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//         });

//         await newDataISE.save();

//         const updatedData = await fetchAllDataISE();
//         res.render('is_students', { datas: updatedData });
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.get('/ec', async(req, res) => {
//     try {
//         const data = await fetchAllDataECE();
//         res.render('ec_students', { ece: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.post('/ec', async(req, res) => {
//     const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

//     try {
//         const newDataECE = new Dataec({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//         });

//         await newDataECE.save();

//         const updatedData = await fetchAllDataECE();
//         res.render('ec_students', { datas: updatedData });
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.get('/as', async(req, res) => {
//     try {
//         const data = await fetchAllDataASE();
//         res.render('as_students', { ase: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.post('/as', async(req, res) => {
//     const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

//     try {
//         const newDataACE = new Dataas({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//         });

//         await newDataACE.save();

//         const updatedData = await fetchAllDataACE();
//         res.render('as_students', { datas: updatedData });
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.get('/cv', async(req, res) => {
//     try {
//         const data = await fetchAllDataCV();
//         res.render('cv_students', { cve: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.post('/cv', async(req, res) => {
//     const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

//     try {
//         const newDataCV = new Datacv({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//         });

//         await newDataCV.save();

//         const updatedData = await fetchAllDataCV();
//         res.render('cv_students', { datas: updatedData });
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.get('/me', async(req, res) => {
//     try {
//         const data = await fetchAllDataME();
//         res.render('me_students', { medata: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.post('/me', async(req, res) => {
//     const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

//     try {
//         const newDataMe = new Datame({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//         });

//         await newDataMe.save();

//         const updatedData = await fetchAllDataMe();
//         res.render('me_students', { datas: updatedData });
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.get('/add', async(req, res) => {
//     try {
//         const data = await fetchAllData();
//         res.render('addstudent/add_student', { datas: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.post('/add', async(req, res) => {
//     const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

//     try {
//         // Add data to the 'datas' collection
//         const newData = new Data({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//             q1: q1,
//             t1: t1,
//             q2: q2,
//             t2: t2,
//         });

//         await newData.save();

//         redirectToPreviousPage(res);
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.get('/addcy', async(req, res) => {
//     try {
//         const data = await fetchAllDataCSCY();
//         res.render('addstudent/add_studentcy', { csecy: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.post('/addcy', async(req, res) => {
//     const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

//     try {

//         // Add data to the 'csecy' collection
//         const newDataCSCY = new Datacy({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//             q1: q1,
//             t1: t1,
//             q2: q2,
//             t2: t2,
//         });

//         await newDataCSCY.save();


//         redirectToPreviousPage(res);
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.get('/addcd', async(req, res) => {
//     try {
//         const data = await fetchAllDataCSCY();
//         res.render('addstudent/add_studentcd', { csecd: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.post('/addcd', async(req, res) => {
//     const { Name, Email, USN, q1, t1, q2, t2 } = req.body;

//     try {

//         // Add data to the 'csecy' collection
//         const newDataCSCD = new Datacd({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//             q1: q1,
//             t1: t1,
//             q2: q2,
//             t2: t2,
//         });

//         await newDataCSCD.save();


//         redirectToPreviousPage(res);
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });


// app.get('/addise', async(req, res) => {
//     try {
//         const data = await fetchAllDataISE();
//         res.render('addstudent/add_studentise', { isedata: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.post('/addise', async(req, res) => {
//     const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

//     try {


//         const newDataISE = new Dataise({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//             q1: q1,
//             t1: t1,
//             q2: q2,
//             t2: t2,
//         });

//         await newDataISE.save();


//         redirectToPreviousPage(res);
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.get('/addec', async(req, res) => {
//     try {
//         const data = await fetchAllDataECE();
//         res.render('addstudent/add_studentec', { ece: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.post('/addec', async(req, res) => {
//     const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

//     try {


//         const newDataECE = new Dataec({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//             q1: q1,
//             t1: t1,
//             q2: q2,
//             t2: t2,
//         });

//         await newDataECE.save();


//         redirectToPreviousPage(res);
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.get('/addas', async(req, res) => {
//     try {
//         const data = await fetchAllDataASE();
//         res.render('addstudent/add_studentas', { ase: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.post('/addas', async(req, res) => {
//     const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

//     try {


//         const newDataACE = new Dataas({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//             q1: q1,
//             t1: t1,
//             q2: q2,
//             t2: t2,
//         });

//         await newDataACE.save();


//         redirectToPreviousPage(res);
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.get('/addcv', async(req, res) => {
//     try {
//         const data = await fetchAllDataCV();
//         res.render('addstudent/add_studentcv', { cve: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.post('/addcv', async(req, res) => {
//     const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

//     try {


//         const newDataCV = new Datacv({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//             q1: q1,
//             t1: t1,
//             q2: q2,
//             t2: t2,
//         });

//         await newDataCV.save();


//         redirectToPreviousPage(res);
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.get('/addme', async(req, res) => {
//     try {
//         const data = await fetchAllDataME();
//         res.render('addstudent/add_studentme', { medata: data });
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });
// app.post('/addme', async(req, res) => {
//     const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

//     try {


//         const newDataMe = new Datame({
//             Name: Name,
//             USN: USN,
//             Email: Email,
//             q1: q1,
//             t1: t1,
//             q2: q2,
//             t2: t2,
//         });

//         await newDataMe.save();


//         redirectToPreviousPage(res);
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });


// function redirectToPreviousPage(res) {
//     res.redirect('back');
// }

// app.listen(port, () => {
//     console.log(`Server running on Port:${port}`);
// });










//////////////////////////////new version......3---------------------------------------------------------------------------------------->
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const session = require('express-session');
const flash = require('express-flash');
const cors = require('cors');
const { Console } = require('console');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(bodyParser.json());
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));
app.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'veeracharij123@gmail.com ',
        pass: '9972978411'
    }
});

// app.use(express.json());

app.post('/send-email', async(req, res) => {
    console.log('Received request:', req.body);

    const { to, subject, body } = req.body;

    // Send email
    try {
        const info = await transporter.sendMail({
            from: 'veeracharij123@gmail.com',
            to,
            subject,
            text: 'Plain text version of the email',
            html: body
        });

        console.log('Email sent:', info);
        res.json({ message: 'Email sent successfully!', info });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
});


app.use(flash());
// Create a model for the data
const Data = mongoose.model("Data", new mongoose.Schema({
    Name: String,
    USN: String,
    Email: String,
    Subjects: {
        ADLDCO: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        },
        DSA: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        },
        OS: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        },
        MATHS: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        }
    },

}, { collection: "datas" }));


// Model for cse-cy data
const Datacy = mongoose.model("Datacy", new mongoose.Schema({
    Name: String,
    USN: String,
    Email: String,
    Subjects: {
        ADLDCO: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        },
        DSA: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        },
        OS: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        },
        MATHS: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        }
    },
}, { collection: "csecy" }));
// Model for cse-cd
const Datacd = mongoose.model("Datacd", new mongoose.Schema({
    Name: String,
    USN: String,
    Email: String,
    Subjects: {
        ADLDCO: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        },
        DSA: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        },
        OS: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        },
        MATHS: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        }
    },
}, { collection: "csecd" }));
const Dataise = mongoose.model("Dataise", new mongoose.Schema({
    Name: String,
    USN: String,
    Email: String,
    Subjects: {
        ADLDCO: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        },
        DSA: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        },
        OS: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        },
        MATHS: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        }
    },
}, { collection: "isedata" }));
const Dataec = mongoose.model("Dataec", new mongoose.Schema({
    Name: String,
    USN: String,
    Email: String,
    Subjects: {
        AMC: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        },
        DSA: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        },
        OS: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        },
        MATHS: {
            q1: Number,
            t1: Number,
            q2: Number,
            t2: Number,
            AvgQuiz: Number,
            AvgTest: Number,
            TotalClasses: Number,
            AttendedClasses: Number,
            AttendancePercentage: Number
        }
    },
}, { collection: "ece" }));
const Datame = mongoose.model("Datame", new mongoose.Schema({
    Name: String,
    USN: String,
    Email: String,
    q1: Number,
    t1: Number,
    q2: Number,
    t2: Number,
}, { collection: "medata" }));
const Datad = mongoose.model("Datad", new mongoose.Schema({
    user: String,
    subject: String,
    branch: String,
}, { collection: "detail" }));

mongoose.connect("mongodb://localhost:27017/student", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connected");
}).catch(err => {
    console.error("Error connecting to database:", err);
});


const loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const LoginCollection = mongoose.model('lg', loginschema);

async function fetchAllData() {
    try {
        const data = await Data.find({});
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
// function for cse-cy
async function fetchAllDataCSCY() {
    try {
        const data = await Datacy.find({});
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
async function fetchAllDataCSCD() {
    try {
        const data = await Datacd.find({});
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
async function fetchAllDataISE() {
    try {
        const data = await Dataise.find({});
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
async function fetchAllDataECE() {
    try {
        const data = await Dataec.find({});
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
async function fetchAllDataME() {
    try {
        const data = await Datame.find({});
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
app.get('/', (req, res) => {
    res.render('login');
});
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

function checkLoggedIn(req, res, next) {
    if (req.session.username) {
        next();
    } else {
        res.redirect('/login');
    }
}
app.get('/change-password', (req, res) => {
    res.render('change-password');
});


app.post('/signup', async(req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await LoginCollection.findOne({ name: username });

        if (existingUser) {
            res.send('Username already exists. Please choose a different one.');
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await LoginCollection.create({ name: username, password: hashedPassword });
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/sectionsa', checkLoggedIn, async(req, res) => {
    // Render your sectionsa page for logged-in users

    const username = req.session.username;
    const a = await Datad.findOne({ user: username });
    // console.log('a:', username);
    console.log('Data retrieved:', a);


    res.render('sectionsa', { username, a });
});
app.get('/cse_coordinator', checkLoggedIn, async(req, res) => {
    // Render your sectionsa page for logged-in users
    const username = req.session.username;
    const a = await Datad.findOne({ user: username });
    res.render('cse_coordinator', a);
});
app.get('/ec_coordinator', checkLoggedIn, async(req, res) => {
    const username = req.session.username;
    const a = await Datad.findOne({ user: username });
    res.render('ec_coordinator');
});
app.get('/me_coordinator', checkLoggedIn, async(req, res) => {
    const username = req.session.username;
    const a = await Datad.findOne({ user: username });
    res.render('me_coordinator');
});
app.get('/ise_coordinator', checkLoggedIn, async(req, res) => {
    const username = req.session.username;
    const a = await Datad.findOne({ user: username });
    res.render('ise_coordinator');
});
app.get('/Students', (req, res) => {
    // const username = req.session.username;
    res.render('Students');
});

app.get('/Student', async(req, res) => {
    try {
        const username = req.session.username;
        const userType = req.session.userType
            // Find data for the specified username (Email in this case)
        const data = await Data.findOne({ Email: username });
        const a = await Datad.findOne({ user: username });
        if (!data) {
            res.status(404).send('Student not found');
            return;
        }

        // Render 'Students' template with the data
        res.render('Students', { data, a }); // Ensure 'data' is passed to the template
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/change-password', (req, res) => {
    res.render('change-password');
});

app.post('/change-password', async(req, res) => {
    const { newPassword, confirmPassword } = req.body;

    try {
        // Validate newPassword and confirmPassword

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and set hasLoggedInBefore to true
        await LoginCollection.updateOne({ name: req.session.username }, { $set: { password: hashedPassword, hasLoggedInBefore: true } });

        // Redirect to the dashboard or another page after changing the password
        return res.redirect('/login');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});






// Your existing login route
app.post('/login', async(req, res) => {
    const { username, password, userType } = req.body;

    try {
        const user = await LoginCollection.findOne({ name: username });

        // console.log("a:", a.subject);
        if (!user) {
            // Set flash message for user not found
            req.flash('error', 'User not found');
            return res.redirect('/login'); // Redirect back to login page
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            await LoginCollection.updateOne({ name: username }, { $inc: { loginCount: 1 } });

            req.session.username = username;
            req.session.userType = userType;
            const a = await Datad.findOne({ user: username });



            if (userType === 'Admin' && a.subject === 'admin') {
                res.redirect('/sectionsa');
            } else if (userType === 'Coordinator') {
                if (a.subject === 'cse' || a.subject === 'csecy' || a.subject === 'cseds') {
                    res.redirect('/cse_coordinator');
                } else if (a.subject === 'ece') {
                    res.redirect('/ec_coordinator');
                } else if (a.subject === 'is') {
                    res.redirect('/ise_coordinator');
                } else if (a.subject === 'mech') {
                    res.redirect('/me_coordinator');
                }
            } else if (userType === 'Student') {
                if (password === '123') {
                    res.redirect('/change-password');
                } else {
                    // Redirect to the appropriate student pge or handle it as needed
                    return res.redirect('/Student');
                }
            } else if (userType === 'Teacher' && a.subject !== 'cse' || a.subject !== 'ece' || a.subject !== 'ase' || a.subject !== 'cv' || a.subject !== 'ise' || a.subject !== 'me') {
                if (password === '123') {
                    res.redirect('/change-password');
                } else {
                    // Redirect to the appropriate student page or handle it as needed
                    return res.redirect('/sectionsa');
                }
            } else {
                res.send('This role is not supported yet.');
            }

        } else {
            // Set flash message for invalid password
            req.flash('error', 'Invalid password. Please try again.');
            res.redirect('/login'); // Redirect back to login page
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/cse', async(req, res) => {
    try {
        // Accessing username from session
        const username = req.session.username;
        const userDetail = await Datad.findOne({ user: username });
        console.log('User Detail:', userDetail);
        // Corrected log statement
        // Fetch data from the database
        const data = await fetchAllData();

        // Find user details for the specific user
        if (!userDetail) {
            return res.status(404).send('User not found'); // Handle if user details not found
        }

        // Render the page
        res.render('cse_students', { datas: data, userDetail, username });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Your '/cse' POST route
// Your '/cse' POST route
app.post('/cse', async(req, res) => {
    try {
        const { Name, USN, Email, Subjects, TotalClasses, AttendedClasses } = req.body;

        // Create a new Data document
        const newData = new Data({
            Name,
            USN,
            Email,
            Subjects: {
                ADLDCO: {
                    q1: Subjects.ADLDCO.q1,
                    t1: Subjects.ADLDCO.t1,
                    q2: Subjects.ADLDCO.q2,
                    t2: Subjects.ADLDCO.t2
                },
                DSA: {
                    q1: Subjects.DSA.q1,
                    t1: Subjects.DSA.t1,
                    q2: Subjects.DSA.q2,
                    t2: Subjects.DSA.t2
                },
                OS: {
                    q1: Subjects.OS.q1,
                    t1: Subjects.OS.t1,
                    q2: Subjects.OS.q2,
                    t2: Subjects.OS.t2
                },
                MATHS: {
                    q1: Subjects.MATHS.q1,
                    t1: Subjects.MATHS.t1,
                    q2: Subjects.MATHS.q2,
                    t2: Subjects.MATHS.t2
                }
            },
        });

        // Save the new data document to the database
        await newData.save();

        // Fetch updated data from the database
        const updatedData = await fetchAllData();

        // Accessing username from session
        const username = req.session.username;
        const userDetail = await Datad.findOne({ user: req.session.username });

        // Render the page with updated data
        res.render('cse_students', { datas: updatedData, detail: userDetail, username });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/coordinator-teacher', async(req, res) => {
    try {
        // Accessing username from session
        const username = req.session.username;
        const userDetail = await Datad.findOne({ user: username });
        console.log('User Detail:', userDetail);
        // Corrected log statement
        // Fetch data from the database
        const data = await fetchAllData();

        // Find user details for the specific user
        if (!userDetail) {
            return res.status(404).send('User not found'); // Handle if user details not found
        }

        // Render the page
        res.render('coordinator-teacher', { datas: data, userDetail, username });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Your '/cse' POST route
app.post('/coordinator-teacher', async(req, res) => {
    try {
        const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

        // Create a new Data document
        const newData = new Data({
            Name: String,
            USN: String,
            Email: String,
            ADLDCOq1: Number,
            ADLDCOt1: Number,
            ADLDCOq2: Number,
            ADLDCOt2: Number,
            DSAq1: Number,
            DSAq2: Number,
            DSAt1: Number,
            DSAt2: Number,
            OSq1: Number,
            OSq2: Number,
            OSt1: Number,
            OSt2: Number,
            MATHSq1: Number,
            MATHSq2: Number,
            MATHSt1: Number,
            MATHSt2: Number,
        });

        // Save the new data document to the database
        await newData.save();

        // Fetch updated data from the database
        const updatedData = await fetchAllData();

        // Accessing username from session
        const username = req.session.username;
        const userDetail = await Datad.findOne({ user: req.session.username });

        // Render the page with updated data
        res.render('coordinator-teacher', { datas: updatedData, detail: userDetail, username });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/teacher', async(req, res) => {
    try {
        // Accessing username from session
        const username = req.session.username;
        const userDetail = await Datad.findOne({ user: username });

        if (!userDetail) {
            return res.status(404).send('User not found'); // Handle if user details not found
        }

        // If user detail is found, extract the subject and branch
        const { subject, branch } = userDetail;

        let data;
        if ((subject === 'ADLDCO' || subject === 'OS' || subject === 'DSA' || subject === 'MATHS') && branch === 'cse') {
            data = await fetchAllData();
        } else if ((subject === 'AMC' || subject === 'ADDC' || subject === 'NACS' || subject === 'MATHS') && branch === 'ece') {
            data = await fetchAllDataECE();
        } else if ((subject === 'ADLDCO' || subject === 'OS' || subject === 'DSA' || subject === 'MATHS') && branch === 'csecy') {
            data = await fetchAllDataISE();
        } else if ((subject === 'ADLDCO' || subject === 'OS' || subject === 'DSA' || subject === 'MATHS') && branch === 'csecd') {
            data = await fetchAllDataISE();
        }

        // Check if data is defined before rendering the template
        if (data) {
            res.render('teacher', { datas: data, userDetail, username });
        } else {
            // Handle if data is not found
            res.status(404).send('Data not found');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});




// Your '/cse' POST route
app.post('/teacher', async(req, res) => {
    try {
        const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

        // Create a new Data document
        const newData = new Data({
            Name: String,
            USN: String,
            Email: String,
            ADLDCOq1: Number,
            ADLDCOt1: Number,
            ADLDCOq2: Number,
            ADLDCOt2: Number,
            DSAq1: Number,
            DSAq2: Number,
            DSAt1: Number,
            DSAt2: Number,
            OSq1: Number,
            OSq2: Number,
            OSt1: Number,
            OSt2: Number,
            MATHSq1: Number,
            MATHSq2: Number,
            MATHSt1: Number,
            MATHSt2: Number,
        });

        // Save the new data document to the database
        await newData.save();

        // Fetch updated data from the database
        const updatedData = await fetchAllData();

        // Accessing username from session
        const username = req.session.username;
        const userDetail = await Datad.findOne({ user: req.session.username });

        // Render the page with updated data
        res.render('teacher', { datas: updatedData, detail: userDetail, username });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/csesec', checkLoggedIn, async(req, res) => {
    const username = req.session.username;
    const a = await Datad.findOne({ user: req.session.username });
    // console.log('Fetched Data:', username);
    res.render('cse_section', { username, a });
});
app.post('/csesec', async(req, res) => {
    try {

        res.redirect('cse_section');
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/cscd', async(req, res) => {
    try {
        // Accessing username from session
        const username = req.session.username;
        const userDetail = await Datad.findOne({ user: username });
        console.log('User Detail:', userDetail);
        // Corrected log statement
        // Fetch data from the database
        const data = await fetchAllDataCSCD();

        // Find user details for the specific user
        if (!userDetail) {
            return res.status(404).send('User not found'); // Handle if user details not found
        }

        // Render the page
        res.render('cse-ds_students', { csecd: data, userDetail, username });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/cscd', async(req, res) => {
    const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

    try {
        const newDataCSCD = new Datacd({
            Name: Name,
            USN: USN,
            Email: Email,
        });

        await newDataCSCD.save();

        const updatedData = await fetchAllDataCSCD();
        res.render('cse-ds_students', { datas: updatedData });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/cscy', async(req, res) => {
    try {
        // Accessing username from session
        const username = req.session.username;
        const userDetail = await Datad.findOne({ user: username });
        console.log('User Detail:', userDetail);
        // Corrected log statement
        // Fetch data from the database
        const data = await fetchAllDataCSCY();

        // Find user details for the specific user
        if (!userDetail) {
            return res.status(404).send('User not found'); // Handle if user details not found
        }

        // Render the page
        res.render('cse-cy_students', { csecy: data, userDetail, username });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/cscy', async(req, res) => {
    const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

    try {
        const newDataCSCY = new Datacy({
            Name: Name,
            USN: USN,
            Email: Email,
        });

        await newDataCSCY.save();

        const updatedData = await fetchAllDataCSCY();
        res.render('cse-cy_students', { datas: updatedData });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/ise', async(req, res) => {
    try {
        // Accessing username from session
        const username = req.session.username;
        const userDetail = await Datad.findOne({ user: username });
        console.log('User Detail:', userDetail);
        // Corrected log statement
        // Fetch data from the database
        const data = await fetchAllDataISE();

        // Find user details for the specific user
        if (!userDetail) {
            return res.status(404).send('User not found'); // Handle if user details not found
        }

        // Render the page
        res.render('is_students', { isedata: data, userDetail, username });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/ise', async(req, res) => {
    const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

    try {
        const newDataISE = new Dataise({
            Name: Name,
            USN: USN,
            Email: Email,
        });

        await newDataISE.save();

        const updatedData = await fetchAllDataISE();
        res.render('is_students', { datas: updatedData });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/ec', async(req, res) => {
    try {
        // Accessing username from session
        const username = req.session.username;
        const userDetail = await Datad.findOne({ user: username });
        console.log('User Detail:', userDetail);
        // Corrected log statement
        // Fetch data from the database
        const data = await fetchAllDataECE();

        // Find user details for the specific user
        if (!userDetail) {
            return res.status(404).send('User not found'); // Handle if user details not found
        }

        // Render the page
        res.render('ec_students', { ece: data, userDetail, username });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/ec', async(req, res) => {
    const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

    try {
        const newDataECE = new Dataec({
            Name: Name,
            USN: USN,
            Email: Email,
        });

        await newDataECE.save();

        const updatedData = await fetchAllDataECE();
        res.render('ec_students', { datas: updatedData });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/me', async(req, res) => {
    try {
        // Accessing username from session
        const username = req.session.username;
        const userDetail = await Datad.findOne({ user: username });
        console.log('User Detail:', userDetail);
        // Corrected log statement
        // Fetch data from the database
        const data = await fetchAllDataME();

        // Find user details for the specific user
        if (!userDetail) {
            return res.status(404).send('User not found'); // Handle if user details not found
        }

        // Render the page
        res.render('ec_students', { medata: data, userDetail, username });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/me', async(req, res) => {
    const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

    try {
        const newDataMe = new Datame({
            Name: Name,
            USN: USN,
            Email: Email,
        });

        await newDataMe.save();

        const updatedData = await fetchAllDataMe();
        res.render('me_students', { datas: updatedData });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// GET route for rendering the add student page
app.get('/add', async(req, res) => {
    try {
        const data = await fetchAllData();
        res.render('addstudent/add_student', { datas: data });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// POST route for adding a new student
app.post('/add', async(req, res) => {
    const {
        Name,
        USN,
        Email,
        Subjects,
        TotalClasses,
        AttendedClasses
    } = req.body;

    try {
        // Create a new Data document
        const newData = new Data({
            Name,
            USN,
            Email,
            Subjects: {
                ADLDCO: {
                    q1: Subjects.ADLDCO.q1,
                    t1: Subjects.ADLDCO.t1,
                    q2: Subjects.ADLDCO.q2,
                    t2: Subjects.ADLDCO.t2
                },
                DSA: {
                    q1: Subjects.DSA.q1,
                    t1: Subjects.DSA.t1,
                    q2: Subjects.DSA.q2,
                    t2: Subjects.DSA.t2
                },
                OS: {
                    q1: Subjects.OS.q1,
                    t1: Subjects.OS.t1,
                    q2: Subjects.OS.q2,
                    t2: Subjects.OS.t2
                },
                MATHS: {
                    q1: Subjects.MATHS.q1,
                    t1: Subjects.MATHS.t1,
                    q2: Subjects.MATHS.q2,
                    t2: Subjects.MATHS.t2
                }
            },
            TotalClasses,
            AttendedClasses
        });

        // Save the new data document to the database
        await newData.save();

        // Redirect to the previous page
        redirectToPreviousPage(res);
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/addcy', async(req, res) => {
    try {
        const data = await fetchAllDataCSCY();
        res.render('addstudent/add_studentcy', { csecy: data });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
app.post('/addcy', async(req, res) => {
    const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

    try {

        // Add data to the 'csecy' collection
        const newDataCSCY = new Datacy({
            Name: Name,
            USN: USN,
            Email: Email,
            q1: q1,
            t1: t1,
            q2: q2,
            t2: t2,
        });

        await newDataCSCY.save();


        redirectToPreviousPage(res);
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/addcd', async(req, res) => {
    try {
        const data = await fetchAllDataCSCY();
        res.render('addstudent/add_studentcd', { csecd: data });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
app.post('/addcd', async(req, res) => {
    const { Name, Email, USN, q1, t1, q2, t2 } = req.body;

    try {

        // Add data to the 'csecy' collection
        const newDataCSCD = new Datacd({
            Name: Name,
            USN: USN,
            Email: Email,
            q1: q1,
            t1: t1,
            q2: q2,
            t2: t2,
        });

        await newDataCSCD.save();


        redirectToPreviousPage(res);
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/addise', async(req, res) => {
    try {
        const data = await fetchAllDataISE();
        res.render('addstudent/add_studentise', { isedata: data });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
app.post('/addise', async(req, res) => {
    const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

    try {


        const newDataISE = new Dataise({
            Name: Name,
            USN: USN,
            Email: Email,
            q1: q1,
            t1: t1,
            q2: q2,
            t2: t2,
        });

        await newDataISE.save();


        redirectToPreviousPage(res);
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/addec', async(req, res) => {
    try {
        const data = await fetchAllDataECE();
        res.render('addstudent/add_studentec', { ece: data });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
app.post('/addec', async(req, res) => {
    const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

    try {


        const newDataECE = new Dataec({
            Name: Name,
            USN: USN,
            Email: Email,
            q1: q1,
            t1: t1,
            q2: q2,
            t2: t2,
        });

        await newDataECE.save();


        redirectToPreviousPage(res);
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/addme', async(req, res) => {
    try {
        const data = await fetchAllDataME();
        res.render('addstudent/add_studentme', { medata: data });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
app.post('/addme', async(req, res) => {
    const { Name, USN, Email, q1, t1, q2, t2 } = req.body;

    try {


        const newDataMe = new Datame({
            Name: Name,
            USN: USN,
            Email: Email,
            q1: q1,
            t1: t1,
            q2: q2,
            t2: t2,
        });

        await newDataMe.save();


        redirectToPreviousPage(res);
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/me', async(req, res) => {
    try {
        const data = await fetchAllDataME();
        res.render('me_students', { medata: data });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});






// Render the page for logged-in users
// Render 'stud1' template without any data
app.get('/stud1', async(req, res) => {
    try {
        // Retrieve the username from the session
        const username = req.session.username;

        // Fetch user detail from the database
        const userDetail = await Datad.findOne({ user: username });

        // If user detail is found, extract the subject
        if (userDetail) {
            const subject = userDetail.subject;

            // Render 'stud1' template with the subject information
            res.render('stud1', { subject });
        } else {
            // If user detail is not found, send an error response
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Fetch data for a specific student based on the provided USN
app.get('/stud', async(req, res) => {
    try {
        const studentUSN = req.query.USN;
        const username = req.session.username;

        // Fetch user detail from the database
        const userDetail = await Datad.findOne({ user: username });

        // If user detail is found, extract the subject
        if (userDetail) {
            const subject = userDetail.subject;
            const branch = userDetail.branch;

            let data;

            // Find data for the specified USN based on the subject
            if (subject === 'cse' || subject === 'admin') {
                data = await Data.findOne({ USN: studentUSN });
            } else if (subject === 'ece') {
                data = await Dataec.findOne({ USN: studentUSN });
            } else if (subject === 'mech') {
                data = await Datame.findOne({ USN: studentUSN });
            } else if (subject === 'is') {
                data = await Dataise.findOne({ USN: studentUSN });
            }

            // If data is found, render 'stud1' template with the data
            if (data) {
                const plainData = data.toObject();
                res.render('stud1', { data: plainData });
            } else {
                // If data is not found, send an error response
                res.status(404).send('Student not found');
            }
        } else {
            // If user detail is not found, send an error response
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});



// POST route to add new student data
app.post('/stud', async(req, res) => {
    const {
        Name,
        USN,
        Email,
        Subjects,

    } = req.body;

    try {
        // Find existing data for the specified USN
        let existingData = await Data.findOne({ USN });
        console.log('<%= JSON.stringify(data) %>');
        // If data exists, update the fields; otherwise, create a new entry
        if (existingData) {
            // Calculate average quiz and test marks for ADLDCO


            // Update existing fields
            existingData.set({
                Name,
                Email,
                Subjects: {
                    ADLDCO: {
                        q1: Subjects.ADLDCO.q1,
                        t1: Subjects.ADLDCO.t1,
                        q2: Subjects.ADLDCO.q2,
                        t2: Subjects.ADLDCO.t2,
                        AvgQuiz: Subjects.ADLDCO.AvgQuiz,
                        AvgTest: Subjects.ADLDCO.AvgTest,
                        AttendedClasses: Subjects.ADLDCO.AttendedClasses,
                        TotalClasses: Subjects.ADLDCO.TotalClasses,
                        AttendancePercentage: Subjects.ADLDCO.AttendancePercentage
                    },
                    DSA: {
                        q1: Subjects.DSA.q1,
                        t1: Subjects.DSA.t1,
                        q2: Subjects.DSA.q2,
                        t2: Subjects.DSA.t2,
                        AvgQuiz: Subjects.DSA.AvgQuiz,
                        AvgTest: Subjects.DSA.AvgTest,
                        AttendedClasses: Subjects.DSA.AttendedClasses,
                        TotalClasses: Subjects.DSA.TotalClasses,
                        AttendancePercentage: Subjects.DSA.AttendancePercentage
                    },
                    OS: {
                        q1: Subjects.OS.q1,
                        t1: Subjects.OS.t1,
                        q2: Subjects.OS.q2,
                        t2: Subjects.OS.t2,
                        AvgQuiz: Subjects.OS.AvgQuiz,
                        AvgTest: Subjects.OS.AvgTest,
                        AttendedClasses: Subjects.OS.AttendedClasses,
                        TotalClasses: Subjects.OS.TotalClasses,
                        AttendancePercentage: Subjects.OS.AttendancePercentage
                    },
                    MATHS: {
                        q1: Subjects.MATHS.q1,
                        t1: Subjects.MATHS.t1,
                        q2: Subjects.MATHS.q2,
                        t2: Subjects.MATHS.t2,
                        AvgQuiz: Subjects.MATHS.AvgQuiz,
                        AvgTest: Subjects.MATHS.AvgTest,
                        AttendedClasses: Subjects.MATHS.AttendedClasses,
                        TotalClasses: Subjects.MATHS.TotalClasses,
                        AttendancePercentage: Subjects.MATHS.AttendancePercentage
                    },
                },

            });
        } else {
            // If no data exists, create a new entry
            existingData = new Data({
                Name,
                USN,
                Email,
                Subjects,

            });

            // Calculate average quiz and test marks for ADLDCO for new entry

        }

        // Save the updated or new data entry
        await existingData.save();

        // Redirect to '/stud' with the entered USN as a query parameter
        res.redirect(`/stud1?USN=${USN}`);
    } catch (error) {
        console.error('Error updating/adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});




// Your other routes and configurations...

// Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
// app.get('/stud2', (req, res) => {
//     res.render('stud2');
// });

// Fetch data for a specific student based on the provided USN
app.get('/stud2', async(req, res) => {
    try {
        const studentUSN = req.query.USN;
        const subject = req.query.subject;
        const username = req.session.username;
        const userType = req.session.userType;
        // console.log(aa)
        // console.log('cccc:', subject)
        // Find data for the specified USN
        // const data = await Data.findOne({ USN: studentUSN });
        const a = await Datad.findOne({ user: username })
        if (a) {
            // const subject = userDetail.subject;
            const branch = a.branch;

            let data;

            // Find data for the specified USN based on the subject
            if (branch === 'cse' || userType === 'Student') {
                data = await Data.findOne({ USN: studentUSN });
            } else if (branch === 'ece') {
                data = await Dataec.findOne({ USN: studentUSN });
            } else if (branch === 'mech') {
                data = await Datame.findOne({ USN: studentUSN });
            } else if (branch === 'is') {
                data = await Dataise.findOne({ USN: studentUSN });
            }

            // If data is found, render 'stud1' template with the data
            if (data) {
                const plainData = data.toObject();
                res.render('stud2', { data: plainData, subject, a });
            } else {
                // If data is not found, send an error response
                res.status(404).send('Student not found');
            }
        } else {
            // If user detail is not found, send an error response
            res.status(404).send('User not found');
        }

        // Render 'stud1' template with the plain data

        // Render 'stud1' template with the data
        // res.render('stud1', { data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add new data for a student
app.post('/stud2', async(req, res) => {
    const {
        Name,
        USN,
        Email,
        ADLDCOq1,
        ADLDCOt1,
        ADLDCOq2,
        ADLDCOt2,
        DSAq1,
        DSAq2,
        DSAt1,
        DSAt2,
        OSq1,
        OSq2,
        OSt1,
        OSt2,
        MATHSq1,
        MATHSq2,
        MATHSt1,
        MATHSt2,
    } = req.body;

    try {
        // Create a new data entry
        const newData = new Data({
            Name: Name,
            USN: USN,
            Email: Email,
            ADLDCOq1: ADLDCOq1,
            ADLDCOt1: ADLDCOt1,
            ADLDCOq2: ADLDCOq2,
            ADLDCOt2: ADLDCOt2,
            DSAq1: DSAq1,
            DSAq2: DSAq2,
            DSAt1: DSAt1,
            DSAt2: DSAt2,
            OSq1: OSq1,
            OSq2: OSq2,
            OSt1: OSt1,
            OSt2: OSt2,
            MATHSq1: MATHSq1,
            MATHSq2: MATHSq2,
            MATHSt1: MATHSt1,
            MATHSt2: MATHSt2,

        });

        // Save the new data entry
        await newData.save();

        // Pass the newly added data to the 'stud1' template
        res.render('stud2', { datas: newData });
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/updateStudent', (req, res) => {
    res.render('updateStudent');
});

app.post('/updateStudent', async(req, res) => {
    const { USN, Name, Email } = req.body;

    try {
        console.log('Received update request for:', USN, Name, Email);

        // Find the student with the given USN in the database
        const student = await Data.findOneAndUpdate({ USN: USN }, { Name: Name, Email: Email }, { new: true });

        if (student) {
            console.log('Update successful!');
            res.status(200).send('Update successful!');
        } else {
            console.log('Student not found.');
            res.status(404).send('Student not found.');
        }
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/marksedit', async(req, res) => {
    try {
        const studentUSN = req.query.USN; // Extract the USN from query parameters

        // Fetch the username from the session
        const username = req.session.username;

        // Find user data based on the username
        const a = await Datad.findOne({ user: username });

        if (a) {
            const branch = a.branch; // Extract branch from user data

            let data;

            // Find data for the specified USN based on the branch
            switch (branch) {
                case 'cse':
                    data = await Data.findOne({ USN: studentUSN });
                    break;
                case 'ece':
                    data = await Dataec.findOne({ USN: studentUSN });
                    break;
                case 'mech':
                    data = await Datame.findOne({ USN: studentUSN });
                    break;
                case 'is':
                    data = await Dataise.findOne({ USN: studentUSN });
                    break;
                default:
                    throw new Error('Invalid branch');
            }

            // If data is found, render 'marksedit' template with the data
            if (data) {
                const plainData = data.toObject();
                res.render('marksedit', { data: plainData, a: a });

            } else {
                // If data is not found, send an error response
                res.status(404).send('Student not found');
            }
        } else {
            // If user detail is not found, send an error response
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Add new data for a student
// app.post('/marksedit', async(req, res) => {
//     const {
//         Name,
//         USN,
//         Email,
//         Subjects,



//     } = req.body;

//     try {
//         // Create a new data entry
//         const newData = new Data({
//             Name,
//             USN,
//             Email,
//             Subjects: {
//                 ADLDCO: {
//                     q1: Subjects.ADLDCO.q1,
//                     t1: Subjects.ADLDCO.t1,
//                     q2: Subjects.ADLDCO.q2,
//                     t2: Subjects.ADLDCO.t2,
//                     AvgQuiz: Subjects.ADLDCO.AvgQuiz,
//                     AvgTest: Subjects.ADLDCO.AvgTest,
//                     AttendedClasses: Subjects.ADLDCO.AttendedClasses,
//                     TotalClasses: Subjects.ADLDCO.TotalClasses,
//                     AttendancePercentage: Subjects.ADLDCO.AttendancePercentage

//                 },
//                 DSA: {
//                     q1: Subjects.DSA.q1,
//                     t1: Subjects.DSA.t1,
//                     q2: Subjects.DSA.q2,
//                     t2: Subjects.DSA.t2,
//                     AvgTest: Subjects.DSA.AvgTest,
//                     AttendedClasses: Subjects.DSA.AttendedClasses,
//                     TotalClasses: Subjects.DSA.TotalClasses,
//                     AttendancePercentage: Subjects.DSA.AttendancePercentage
//                 },
//                 OS: {
//                     q1: Subjects.OS.q1,
//                     t1: Subjects.OS.t1,
//                     q2: Subjects.OS.q2,
//                     t2: Subjects.OS.t2,
//                     AvgTest: Subjects.OS.AvgTest,
//                     AttendedClasses: Subjects.OS.AttendedClasses,
//                     TotalClasses: Subjects.OS.TotalClasses,
//                     AttendancePercentage: Subjects.OS.AttendancePercentage
//                 },
//                 MATHS: {
//                     q1: Subjects.MATHS.q1,
//                     t1: Subjects.MATHS.t1,
//                     q2: Subjects.MATHS.q2,
//                     t2: Subjects.MATHS.t2,
//                     AvgTest: Subjects.MATHS.AvgTest,
//                     AttendedClasses: Subjects.MATHS.AttendedClasses,
//                     TotalClasses: Subjects.MATHS.TotalClasses,
//                     AttendancePercentage: Subjects.MATHS.AttendancePercentage
//                 }
//             },


//         });

//         // Save the new data entry
//         await newData.save();

//         // Pass the newly added data to the 'stud1' template
//         res.render('marksedit', { datas: newData });
//     } catch (error) {
//         console.error('Error adding data:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });



// app.get('/updateMarks', async(req, res) => {
//     res.render('marksedit');
// });

app.post('/updateMarks', async(req, res) => {
    try {
        const username = req.session.username;
        const usn = req.body.usn;

        // Fetch the user's details
        const user = await Datad.findOne({ user: username });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const branch = user.branch;
        const subject = user.subject;

        // Fetch the corresponding data based on the branch
        let data;
        switch (branch) {
            case 'cse':
                data = await Data.findOne({ USN: usn });
                break;
            case 'ece':
                data = await Dataec.findOne({ USN: usn });
                break;
            case 'mech':
                data = await Datame.findOne({ USN: usn });
                break;
            case 'ise':
                data = await Dataise.findOne({ USN: usn });
                break;
            default:
                throw new Error('Invalid branch');
        }

        // If no data exists, create a new entry for the subject
        if (!data) {
            data = new Data({
                USN: usn,
                Subjects: {},
            });
        }

        // Update or create the subject data
        data.Subjects[subject] = {
            q1: parseFloat(req.body.q1),
            q2: parseFloat(req.body.q2),
            t1: parseFloat(req.body.t1),
            t2: parseFloat(req.body.t2),
            TotalClasses: parseInt(req.body.TotalClasses),
            AttendedClasses: parseInt(req.body.AttendedClasses),
        };

        // Save the updated data
        switch (branch) {
            case 'cse':
                await data.save();
                break;
            case 'ece':
                await data.save();
                break;
            case 'mech':
                await data.save();
                break;
            case 'ise':
                await data.save();
                break;
            default:
                throw new Error('Invalid branch');
        }

        res.redirect('/teacher'); // Redirect to the same page
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});






app.get('/edit', async(req, res) => {
    try {
        // Accessing username from session
        const username = req.session.username;
        const a = await Datad.findOne({ user: username });

        // Find user details for the specific user
        if (!a) {
            return res.status(404).send('User not found'); // Handle if user details not found
        }

        // Redirect to /editall route with quizType as a query parameter
        res.redirect('/editall?quiz=' + req.query.quiz);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Modify the /editall route to retrieve the quiz type from the query parameter
app.get('/editall', async(req, res) => {
    try {
        // Accessing username from session
        const username = req.session.username;

        // Find user details for the specific user
        const a = await Datad.findOne({ user: username });
        if (!a) {
            return res.status(404).send('User not found'); // Handle if user details not found
        }

        // Retrieve quiz type from query parameter
        const quizType = req.query.quiz;
        const branch = a.branch;

        let data;
        switch (branch) {
            case 'cse':
                data = await fetchAllData();
                break;
            case 'ece':
                data = await fetchAllDataECE();
                break;
            case 'mech':
                data = await fetchAllDataME();
                break;
            case 'ise':
                data = await fetchAllDataISE();
                break;
            default:
                throw new Error('Invalid branch');
        }

        // Render the page with quizType parameter
        res.render('editall', { datas: data, a, username, quizType });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST request handling for /updateall
// app.get('/updateall', async(req, res) => {
//     const quizType = req.query.quiz;
//     console.log('cccc', quizType);
//     res.render(`/editall?quiz=${quizType}`);
// })
app.post('/updateall', async(req, res) => {
    try {
        const username = req.session.username;
        const usnList = req.body.usn || [];
        const quizType = req.query.quiz;
        console.log('cccc', quizType);

        // Debugging output to log the username and subject
        console.log("Username:", username);
        // console.log("Subject:", 'MATHS');

        const user = await Datad.findOne({ user: username });
        if (!user) {
            console.log("User not found in the database!");
            return res.status(404).send('User not found');
        }

        const branch = user.branch;
        const subject = user.subject;

        // Loop through each USN in the list
        for (let i = 0; i < usnList.length; i++) {
            const usn = usnList[i];
            let data;

            try {
                // Fetch the corresponding data based on the branch
                switch (branch) {
                    case 'cse':
                        data = await Data.findOne({ USN: usn });
                        break;
                    case 'ece':
                        data = await Dataec.findOne({ USN: usn });
                        break;
                    case 'mech':
                        data = await Datame.findOne({ USN: usn });
                        break;
                    case 'ise':
                        data = await Dataise.findOne({ USN: usn });
                        break;
                    default:
                        throw new Error('Invalid branch');
                }

                // If no data exists, create a new entry for the subject
                if (!data) {
                    data = new Data({
                        USN: usn,
                        Subjects: {},
                    });
                }

                // Update subject data for the user
                data.Subjects[subject] = {
                    q1: parseFloat(req.body[`q1_${usn}`]) || 0,
                    q2: parseFloat(req.body[`q2_${usn}`]) || 0,
                    t1: parseFloat(req.body[`t1_${usn}`]) || 0,
                    t2: parseFloat(req.body[`t2_${usn}`]) || 0,
                };

                // Save the updated data
                switch (branch) {
                    case 'cse':
                        await data.save();
                        break;
                    case 'ece':
                        await data.save();
                        break;
                    case 'mech':
                        await data.save();
                        break;
                    case 'ise':
                        await data.save();
                        break;
                    default:
                        throw new Error('Invalid branch');
                }
            } catch (error) {
                console.error('Error updating data for', usn, ':', error);
                continue; // Continue with the next iteration if an error occurs
            }
        }

        // Redirect to /teacher after updating all data
        res.redirect('/teacher');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



function redirectToPreviousPage(res) {
    res.redirect('back');
}

app.listen(port, () => {
    console.log(`Server running on Port:${port}`);
});