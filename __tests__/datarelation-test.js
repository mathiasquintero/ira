var DataRelation = require('../js/data_relation.js');

function createColumns(length) {
  return (new Array(length)).map(function(x) { return Math.random()*100;});
}

function createData(rows,columns) {
  return (new Array(rows)).map(function() { return createColumns(columns); });
}

describe('DataRelation', function() {

  var assertions = function(relation,columns,itemsInRelation) {
    it('holds the right data', function() {
      expect(relation.getColumns()).toBe(columns);
      expect(relation.getResult()).toBe(itemsInRelation);
    });
  };

  for (var i = 0; i < 10; i++) {
    var noOfCol = Math.random() * 100 + 1;
    var noOfRows = Math.random() * 100 + 1;
    var columns = createColumns(10);
    var itemsInRelation = createData(10,10);
    var relation = new DataRelation("Data",columns,itemsInRelation);
    assertions(relation,columns,itemsInRelation);
  }

});
