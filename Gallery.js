var fs = require('fs');
var path = require('path');

var idNum = 0;

module.exports = {
  add: addGallery,
  find: findGallery,
  edit: editGallery
};

var JSON_DATA_PATH = path.resolve('data', 'gallery.json');

function addGallery (data, callback) {
  fs.readFile(JSON_DATA_PATH, 'utf8', function (err, json) {
    if (err) {
      throw err;
    }
    var galleries = JSON.parse(json);
    data.idNum = idNum;
    galleries.push(data);
    fs.writeFile(JSON_DATA_PATH, JSON.stringify(galleries), function (err) {
      if (err) {
        throw err;
      }
      var result = {
        status: 'OK',
        data: data
      };
      idNum++;
      return callback(null, result);
    });
  });
}

function findGallery (id, callback) {
  var galleries;
  fs.readFile(JSON_DATA_PATH, 'utf8', function (err, json) {
    if (err) {
      return callback(err);
    }
    galleries = JSON.parse(json);
    for (var i = 0; i < galleries.length; i++) {
      if (galleries[i]['idNum'] === id) {
        return callback(null, galleries[i], galleries);
      }

    }
    callback(new Error('ufsdjlkzfujklmkgjduvcklmbn'));
  });
}

function editGallery (id, data, callback) {
  findGallery(id, function (err, result, galleries) {
    if (err) {
      return callback(err);
    }
    result.author = data.author;
    result.link = data.link;
    result.description = data.description;
    fs.writeFile(JSON_DATA_PATH, JSON.stringify(galleries), function (err) {
      if (err) {
        return callback(err);
      }
      return callback(null, result);
    });
  });
}