const Blog = require('../models/Blog');

const create = (blog)=>{
   return Blog.create(blog);
};

const createBlog = (blog) => Blog.create(blog);


const getMyblog = (query) => {
    return Blog.find(query).exec();
}

const getAll = () => {
    return Blog.find({}).exec();
}

const getById = (id) => {
    return Blog.findById(id).exec();
}

const editById = (id, editid, body) => {
    return Blog.updateOne({ $and: [{_id:editid}, { author:id }]}, { $set:body });
}

const deleteById = (id, deletedid) => {
    return Blog.find({$and:[{_id:deletedid}, {author:id}]}).remove();
}

const getByTitle=(title)=>{
   
    return Blog.find({title}).exec();
}

const getByTag=(tags) =>{
    return Blog.find({tags}).exec();
}

const like = (id, lid) => Blog.findByIdAndUpdate( lid, { $push: { likes:id } },{ new: true, useFindAndModify: false }).exec();

const unlike = (id, lid) => {
    Blog.findByIdAndUpdate( lid, { $pull: { likes:id } },{ new: true, useFindAndModify: false }).exec();
    return {"status":"unliked"};
}

const addComment=(body, id, blogId) =>Blog.findByIdAndUpdate(body, id,{$push:{comment:blogId}},{ new: true, useFindAndModify: false }).exec();


module.exports = {
    create,
    createBlog, 
    getMyblog,
    getAll,
    getById,
    editById,
    deleteById,
    getByTitle,
    getByTag,
    like,
    unlike,
    addComment
}