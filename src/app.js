const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/dbConfig');
const accountRoutes = require('./routes/accountRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const fieldRoutes = require('./routes/fieldRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authMiddleware = require('./middleware/authenticationMiddleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use('/account', accountRoutes);
app.use('/booking', bookingRoutes);
app.use('/field', fieldRoutes);
app.use('/comment', commentRoutes);
app.use('/api', authMiddleware.authenticateToken);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
