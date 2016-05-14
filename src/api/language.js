'use strict';
var BaseApi = require('./base');
var Language = require('../database/models').Language;

class LanguageApi extends BaseApi {

    createModel(data) {
        return {
            name: data.name,
            app_id: data.app_id
        };
    }

    serializerModel(data) {
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

    isValid(data) {
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

    getAll(context, req, res) {
        Language.all().then(function (data) {
            context.success(req, res, data);
        }).catch(function (err) {
            context.error(req, res, err, 500);
        });
    }

    add (context, req, res) {
        context.isValid(req.body).then(function () {
            var model = context.createModel(req.body);
            Language.create(model, { isNewRecord: true }).then(function (_model) {
                context.success(req, res, _model)
            }).catch(function (err) {
                context.error(req, res, err, 500);
            });

        }).catch(function (err) {
            context.error(req, res, err, 400);
        });
    }

    delete (context, req, res) {
        Language.destroy({ where: { id: req.params.id } }).then(function () {
            context.success(req, res, {});
        }).catch(function (err) {
            context.error(req, res, err, 500);
        });
    }

    endpoints() {
        return [
            { url: '/languages', method: 'get', roles: [], response: this.getAll },
			{ url: '/languages', method: 'post', roles: ['admin', 'user'], response: this.add },
            { url: '/languages', method: 'delete', roles: ['admin', 'user'], response: this.delete, params: ['id'] }
        ];
    }
}

module.exports = new LanguageApi();