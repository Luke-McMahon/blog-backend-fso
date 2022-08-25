const _ = require("lodash");

const dummy = (blogs) => {
  return 1 || blogs.length;
};

const totalLikes = (blogs) => {
  let total = 0;
  blogs.forEach((blog) => {
    total += blog.likes;
  });

  return total;
};

const favourite = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const fav = blogs.reduce((max, blog) =>
    blog.likes < max.likes ? max : blog
  );
  delete fav.__v;
  delete fav.url;
  delete fav._id;
  return fav;
};

const mostBlogs = (blogs) => {
  const mostBlogged = _.chain(blogs)
    .groupBy("author")
    .map((group, author) => {
      return { author: author, blogs: group.length };
    })
    .maxBy((object) => object.blogs)
    .value();

  return mostBlogged || {};
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const mostLiked = _.chain(blogs)
    .groupBy("author")
    .map((blogs, author) => {
      let likes = 0;
      _.each(blogs, (blog) => {
        likes += blog["likes"];
      });
      return {
        author: author,
        likes: likes,
      };
    })
    .orderBy("likes", "desc")
    .first()
    .value();

  return mostLiked || {};
};

module.exports = { dummy, totalLikes, favourite, mostBlogs, mostLikes };
