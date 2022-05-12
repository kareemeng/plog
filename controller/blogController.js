const Blog = require('../models/blog');


// blog_index , blog_details, blog_create_get,blog_create_post,plog_delete



const blog_index = (req, res, next) => {
    //we used -1 to sort the blogs from the newst to oldest
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'All blogs', blogs: result });
        }).catch((err) => {
            console.log(err);
        });
};

const blog_details = (req, res, next) => {
    const id = req.params.id;
    Blog.findById(id).then((result) => {
        res.render('blogs/details', { blog: result, title: 'Blog Details' });
    }).catch((err) => {
        res.states(404).render('404', { title: 'Blog not found' });
    });
};

const blog_create_get = (req, res, next) => {
    //console.log('in the create controler')
    res.render('blogs/create', { title: 'Create A New Blog' });
};


const blog_create_post = (req, res, next) => {
    const blog = new Blog(req.body);
    blog.save().then((result) => {
        res.redirect('/blogs');
    }).catch((err) => { console.log(err); });
};


const blog_delete = (req, res, next) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' });
        }).catch((err) => { console.log(err) });
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete

}