var fs = require('fs');
var path = require('path');

var idNum = 0;

module.exports = {
  add: addGallery,
  find: findGallery
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

function editGallery (data, callback) {
  fs.readFile(JSON_DATA_PATH, 'utf8', function (err, json) {
    if (err) {
      throw err;
    }
    var galleries = JSON.parse(json);
    console.log(galleries.length);
    data.idNum = idNum;
    fs.writeFile(JSON_DATA_PATH, JSON.stringify(galleries), function (err) {
      if (err) {
        throw err;
      }
      var result = {
        status: 'OK',
        data: data
      };
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
        console.log(galleries[i]['idNum']);
        return callback(null, galleries[i]);
      }

    }
    callback(new Error('ufsdjlkzfujklmkgjduvcklmbn'));
  });
}