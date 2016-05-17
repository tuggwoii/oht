'use strict';
var BaseApi = require('./base');
var shortid = require('shortid');
var Hotel = require('../database/models').Hotel;
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

class HotelApi extends BaseApi {

    createModel (data) {
        var model = data;
        model.sid = shortid.generate();
        return model;
    }

    serializerModel (data) {
        if (!data.id) {
            if (data['null']) {
                data['id'] = data['null'];
            }
            else {
                data['id'] = 0;
            }
        }
        var json = JSON.stringify(data);
        var model = JSON.parse(json);
        return model;
    }

    isValid (data) {
        var promise = new Promise(function (resolve, reject) {
            if (!data.name) {
                reject({ message: 'NAME REQUIRED' });
            }
            else {
                resolve();
            }
        });
        return promise;
    }

    get (context, req, res) {
        Hotel.findById(req.params.id).then(function (data) {
            context.success(req, res, data);
        }).catch(function (err) {
            context.error(req, res, err, 500);
        });
    }

    getAll (context, req, res) {
        Hotel.all().then(function (data) {
            context.success(req, res, data);
        }).catch(function (err) {
            context.error(req, res, err, 500);
        });
    }

    add (context, req, res) {
        context.isValid(req.body).then(function () {
            var model = context.createModel(req.body);
            Hotel.create(model, { isNewRecord: true }).then(function (_model) {
                context.success(req, res, _model)
            }).catch(function (err) {
                context.error(req, res, err, 500);
            });
        }).catch(function (err) {
            context.error(req, res, err, 400);
        });
    }

    delete (context, req, res) {
        Hotel.destroy({ where: { id: req.params.id } }).then(function () {
            context.success(req, res, {});
        }).catch(function (err) {
            context.error(req, res, err, 500);
        });
    }

    endpoints() {
        return [
            { url: '/hotels', method: 'get', roles: [], response: this.getAll },
            { url: '/hotels', method: 'get', roles: [], response: this.get, params: ['id'] },
			{ url: '/hotels', method: 'post', roles: ['admin', 'user'], response: this.add },
            { url: '/hotels', method: 'delete', roles: ['admin', 'user'], response: this.delete, params: ['id'] }
        ];
    }
}

module.exports = new HotelApi();