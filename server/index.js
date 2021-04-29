const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const fs = require('fs');

// middleware
app.use(cors());
app.use(express.json());

// parsing?
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES //

// get all yoga videos
/* app.get("/YogaChoice", async (req, res) => {
  try {
    const allYoga = await pool.query("SELECT * FROM exercises;");
    res.json(allYoga.rows);
    console.log(allYoga.rows);
  } catch (err) {
    console.error(err);
  }
}); */


app.get("/ImageTest", async(req, res) => {
  try {
    const getImage = await pool.query(
      "select photo from users where id = 1;"
    )
    res.json(getImage.rows);
    console.log(getImage.rows);
  } catch (err) {
    console.error(err);
  }
})

// get specific yoga video
app.get("/YogaChoice/:duration/:intensity/:time", async(req, res) => {
  try {

    const duration = req.params.duration;
    const intensity = req.params.intensity;
    const time = req.params.time;

    const yogaVid = await pool.query(
      "SELECT * FROM exercises where duration = $1 and intensity = $2 and upper(time_of_day) = upper($3) and upper(type) = 'YOGA';",
      [duration, intensity, time]
    );
    res.json(yogaVid.rows);
    console.log(yogaVid.rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/MeditationChoice/:duration/:time", async (req, res) => {
  try {
    const duration = req.params.duration;
    const time = req.params.time;

    const meditationVid = await pool.query(
      "SELECT link FROM exercises where duration = $1 and time_of_day = $3 and type = 'meditation';",
      [duration, time]
    );
    res.json(meditationVid.rows);
    console.log(meditationVid.rows);
  } catch (err) {
    console.error(err);
  }
});

// post a user profile
app.post("/SignUp", async (req, res) => {
  try {
    console.log(req.body);
    const { email, username } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (email, name, last_accessed) VALUES ($1, $2, cast('now' as timestamp)) returning *;",
      [ email, username ]
    );
    res.json(newUser.rows); // return the new user details
  } catch (err) {
    console.error(err);
  }
})

// Login
app.post("/Login", async (req, res) => {
  try {
    console.log(req.body);
    const { email } = req.body;
    const updateUser = await pool.query(
      "UPDATE users set last_accessed = cast('now' as timestamp) where email = $1 returning *;",
      [ email ]
    );
    res.json(updateUser.rows);// return user details to check
    
  } catch (err) {
    console.error(err);
  }
})

// get a user profile
app.get("/Profile/:id", async (req, res) => {
  try {
    // get the profile of the logged in user
    
    const id = req.params.id;
    console.log("id: " + id);
    
    const profile = await pool.query("SELECT id, email, name, username, bio, photo_url FROM users where id = $1;", [
      id,
    ]);
    res.json(profile.rows);
    //console.log(profile.rows);
  } catch (err) {
    console.error(err);
  }
});


// get achievements
app.get("/MyAchievements", async (req, res) => {
  try {
    // get the list of this user's achievements
    console.log(req.query);
    let userId = parseInt(req.query.userId);

    // reduce the number of fields returned here
    const achievements = await pool.query(
      "select * from user_achievements x  left join users u on (x.user_id = u.id) left join achievements a on (x.achievement_id = a.id) where x.user_id = $1;",
      [userId]
    );
    res.json(achievements.rows);
    console.log(achievements.rows);
  } catch (err) {
    console.error(err);
  }
});

// update achievements
// where will these be updated?


// update profile
// SHOULD WE USE BODY OR QUERY FOR THESE?
app.put("/Profile/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, username, bio, photoUrl } = req.body;
    console.log(req.body);
    const updateProfile = await pool.query(
      "UPDATE users SET name = $1, username = $2, bio = $3, photo_url = $4 where id = $5 returning *;",
      [ name, username, bio, photoUrl, id ]
    );
    res.json(updateProfile.rows);
    console.log(updateProfile.rows);
  } catch (err) {
    console.error(err);
  }
})

// get favourites
app.get("/Favourites/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id: " + id);
    const favourites = await pool.query(
      "SELECT * FROM favourites WHERE user_id = $1",
      [id]
    );
    res.json(favourites.rows);
    console.log(favourites.rows);
  } catch (err) {
    console.error(err);
  }
});


// add to favourites
app.get("/Favourites/:id/:link", async (req, res) => {
  try {

    const id = req.params.id;
    const link = req.params.link;

    const addFav = await pool.query(
      `INSERT INTO favourites ('times_watched', 'user_id', 'exercise_id') VALUES (1, $1, (SELECT id FROM exercises WHERE link = $2))`, [id, link]
    );
    res.json(addFav.rows);
    console.log(addFav.rows);
  } catch (err){
    console.log(err)
  }
})

// get watch list
app.get("/MyWatchList/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id: " + id);
    const watchList = await pool.query(
      "SELECT * FROM watch_list WHERE user_id = $1",
      [id]
    );
    res.json(watchList.rows);
    console.log(watchList.rows);
  } catch (err) {
    console.error(err);
  }
});

// add to watch list
app.get("/Watchlist/:id/:link", async (req, res) => {
  try {

    const id = req.params.id;
    const link = req.params.link;

    const addWatch = await pool.query(
      `INSERT INTO watchlist ('times_watched', 'user_id', 'exercise_id') VALUES (1, $1, (SELECT id FROM exercises WHERE link = $2))`, [id, link]
    );
    res.json(addWatch.rows);
    console.log(addWatch.rows); 
  } catch (err){
    console.log(err)
  }
})

// get watch history
app.get("/PreviouslyWatched", async (req, res) => {
  try {
    console.log(req.query);
    const userId = parseInt(req.query.userId);
    const history = await pool.query(
      "SELECT * FROM history WHERE user_id = $1;",
      [ userId ]
    );
    res.json(history.rows);
    console.log(history.rows);
  } catch (err) {
    console.error(err);
  }
})

// start the server
app.listen(5000, () => {
  console.log("server has started on port 5000");
});
