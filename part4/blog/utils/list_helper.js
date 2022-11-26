const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes))
  //return blogs.find((blog) => blog.likes === maxLikes)
  const result = blogs.find((blog) => blog.likes === maxLikes)
  console.log(result)
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
