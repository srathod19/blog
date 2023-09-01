const conn = require('../../config/database');
var blog = {
    createBlog: function (req, res) {
        conn.query(`INSERT INTO tbl_blog(title,description,category) VALUES('${req.body.title}', '${req.body.description}','${req.body.category}')`, function (err, result) {
            // console.log(this.sql);
            // console.log(err);
            if (result) {
                res.status(200).send({ "Message": "Blog has been created successfully !" })
            } else {
                res.status(400).send({ "Message": "failed!" })

            }
        })
    },
    getList: function (req, res) {
        conn.query(`SELECT * FROM tbl_blog ORDER BY created_time ASC`, function (err, result) {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(400).send({ "Message": "failed!" })
            }
        })
    },
    editBlog: function (req, res) {

        conn.query(`SELECT id FROM tbl_blog WHERE id ='${req.body.id}'`, function (err1, result1) {
            if (result1 != '') {
                var params1 = {};

                if (req.body.title != undefined && req.body.title != '') {
                    params1.title = req.body.title;
                }
                if (req.body.description != undefined && req.body.description != '') {
                    params1.description = req.body.description;
                }
                if (req.body.category != undefined && req.body.category != '') {
                    params1.category = req.body.category;
                }
                conn.query(`UPDATE tbl_blog SET ? WHERE id = '${req.body.id}'`, params1, function (err, result) {
                    if (!err) {
                        res.status(200).send({ "Message": "Blog has been updated succesfully !" })
                    } else {
                        res.status(400).send({ "Message": "Failed !" })

                    }
                })
            } else {
                res.status(404).send({ "msg": "Id not found" })
            }
        })
    },
    deleteBlog: function (req, res) {
        conn.query(`SELECT * FROM tbl_blog WHERE id ='${req.body.id}'`, function (err, result) {
            // console.log(this.sql);
            if (result != '') {
                conn.query(`DELETE FROM tbl_blog WHERE id= '${req.body.id}'`, function (errDel, resultDel) {
                    // console.log(this.sql);
                    if (!errDel) {

                        res.status(200).send({ "Message": "blog has been deleted !" })
                    } else {
                        res.status(400).send({ "Message": "Failed !" })
                    }

                })
            }
        })
    }
}
module.exports = blog;