/**
 * BlgController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
    list: function (req, res) {
        sails.log('Inside List')
        Blg.find({}, function (err, blogs) {
            if (err) {
                res.send(500, { err: 'Database Error' })
            }
            res.view('list', { blogs: blogs });
        });
    },
    add: function (req, res) {
        res.view('add')
    },
    create: function (req, res) {
        var title = req.body.title
        var body = req.body.body
        Blg.create({ title: title, body: body }, function (err) {
            if (err) {
                res.send(500, { err: 'Database Error' })
            }
            res.redirect('/list')
        })
    },
    delete: function (req, res) {
        sails.log('Inside Delete')
        // param beacause we are taking value from url
        Blg.destroy({ id: req.params.id }, function (err) {
            if (err) {
                res.send(500, { err: 'Database Error' })
            }
            res.redirect('/list');
        });
        return false;
    },
    edit: function (req, res) {
        sails.log('Inside Delete')
        Blg.findOne({ id: req.params.id }, function (err, blog) {
            if (err) {
                res.send(500, { err: 'Database Error' })
            }
            res.view('edit', { blog: blog })
        });
    },
    update: function (req, res) {
        var title = req.body.title
        var body = req.body.body
        Blg.update({id:req.params.id},{ title: title, body: body }, function (err) {
            if (err) {
                res.send(500, { err: 'Database Error' })
            }
            res.redirect('/list')
        })
        return false;
    }

};

