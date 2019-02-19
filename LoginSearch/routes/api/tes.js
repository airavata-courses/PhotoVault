// @route POST api/bookFilter/getSharedBooks
// @desc Return all books matching with search string
// @access Public

// TO DO: Location based filtering
router.post("/getSharedBooks", (req, res) => {
  //   console.log("req.body = ");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  req.body = req.body.data;
  const errors = {};
  var page = parseInt(req.body.page) || 0; //for next page pass 1 here
  var limit = parseInt(req.body.limit) || 12;
  var regExpAuthors = [];
  var regExpGenre = [];

  if (req.body.authors !== undefined && Array.isArray(req.body.authors)) {
    for (var i = 0;i < req.body.authors.length;i++) {
      regExpAuthors[i] = new RegExp(req.body.authors[i], "i");
    }
  } else {
    regExpAuthors[0] = new RegExp(req.body.authors, "i");
  }

  if (req.body.genre !== undefined && Array.isArray(req.body.genre)) {
    for (var i = 0;i < req.body.genre.length;i++) {
      regExpGenre[i] = new RegExp(req.body.genre[i], "i");
    }
  } else {
    regExpGenre[0] = new RegExp(req.body.genre, "i");
  }

  var subQuery = {
    genre: {
      $in: regExpGenre
    },
    language: {
      $regex: new RegExp(req.body.language, "i")
    },
    authors: {
      $in: regExpAuthors
    }
  };
  var query = {
    $or: [{
      $and: [{
        title: {
          $regex: new RegExp(req.body.searchString, "i")
        }
      },
        subQuery
      ]
    },
    {
      $and: [{
        ISBN: {
          $regex: new RegExp(req.body.searchString, "i")
        }
      },
        subQuery
      ]
    },
    {
      $and: [{
        genre: {
          $regex: new RegExp(req.body.searchString, "i")
        }
      },
        subQuery
      ]
    },
    {
      $and: [{
        subtitle: {
          $regex: new RegExp(req.body.searchString, "i")
        }
      },
        subQuery
      ]
    },
    {
      $and: [{
        location: {
          $regex: new RegExp(req.body.searchString, "i")
        }
      },
        subQuery
      ]
    },
    {
      $and: [{
        authors: {
          $regex: new RegExp(req.body.searchString, "i")
        }
      },
        subQuery
      ]
    },
    {
      subQuery
    }
    ]
  };

  var lowRating = -2;
  var highRating = 6;
  if (!isEmpty(req.body.rating) && req.body.rating != -2) {
    lowRating = parseInt(req.body.rating) - 1;
    highRating = parseInt(req.body.rating) + 1;
  }

  SharedBook.find(query)
    .where("rating")
    .gt(lowRating)
    .lt(highRating)
    .sort({
      update_at: -1
    })
    .skip(page * limit) //Notice here
    .limit(limit)
    .exec((err, doc) => {
      if (err) {
        return res.json(err);
      }
      SharedBook.count(query).exec((count_error, count) => {
        if (err) {
          return res.json(count_error);
        }
        return res.json({
          total: count,
          page: page,
          pageSize: doc.length,
          books: doc
        });
      });
    });
});