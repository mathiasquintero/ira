jest.dontMock('../lib/jquery-1.3.2.js');
jest.dontMock('../lib/prototype.js');

var DataRelation = require('../js/data_relation.js');
var Rename = require('../js/expression_rename.js');

function createIntColumns(length) {
  var array = [];
  for (var i = 0; i < length; i++) {
    var r;
    do {
      r = Math.floor(Math.random()*100).toString();
    } while(!array.reduce(function(r,i) {
      return r && i !== r;
    }, true));
    array.push(r);
  }
  return array;
}

function checkAtSingleRename(a,b,i) {
  it('renames the entire relation correctly', function() {
    expect(a[i]).toBe("NewName." + b[i]);
  });
}

function checkRandomRename(a,b,i) {
  it('renames every column', function() {
    expect(a[i]).toBe(b[i]);
  });
}

describe('Rename', function() {
  var noOfCol = Math.floor(Math.random() * 5 + 1);
  var columns = createIntColumns(noOfCol);
  var relation = new DataRelation(1,columns,[columns]);
  var renamed = new Rename("NewName",relation);
  var renamedColumns = renamed.getColumns();
  for (var i = 0; i < columns.length; i++) {
    checkAtSingleRename(renamedColumns,columns,i);
  }
  var newCols = createIntColumns(noOfCol);
  var renameString = "";
  for (var i = 0; i < newCols.length; i++) {
    renameString += newCols[i] + "<-" + columns[i] + ",";
  }
  renamed = new Rename(renameString,relation);
  renamedColumns = renamed.getColumns();
  for (var i = 0; i < columns.length; i++) {
    checkRandomRename(renamedColumns,newCols,i);
  }
});
