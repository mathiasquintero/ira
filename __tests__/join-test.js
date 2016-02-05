jest.dontMock('../lib/jquery-1.3.2.js');
jest.dontMock('../lib/prototype.js');

var DataRelation = require('../js/data_relation.js');
var Join = require('../js/expression_join.js');

function createIntColumns(length) {
  var array = [];
  for (var i = 0; i < length; i++) {
    array.push(Math.floor(Math.random()*100).toString());
  }
  return array;
}

function createFloatColumns(length) {
  return createIntColumns(length).map(function(x) { return x + ".5";});
}

function createData(rows,columns) {
  var array = [];
  for (var i = 0; i < rows; i++) {
    array.push(createIntColumns(columns));
  }
  return array;
}

describe('Join Result', function() {

  var noOfCol = Math.floor(Math.random() * 5 + 1);
  var noOfRows = Math.floor(Math.random() * 5 + 1);

  var columns = createIntColumns(noOfCol);
  columns.push("Data");
  var data = createData(noOfRows, noOfCol + 1);
  var index = Math.floor(Math.random() * noOfRows);
  data[index][noOfCol] = "Common Data";
  var firstRelation = new DataRelation(1,columns,data);

  columns = createFloatColumns(noOfCol);
  columns.push("Data");
  data = createData(noOfRows,noOfCol+1);
  index = Math.floor(Math.random() * noOfRows);
  data[index][noOfCol] = "Common Data";
  var secondRelation = new DataRelation(1,columns,data);
  var join = new Join(firstRelation,secondRelation);
  it('has exactly one Result', function() {
    expect(join.getResult().length).toBe(1);
  });
});
