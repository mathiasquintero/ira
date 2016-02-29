var DataRelation = require('../js/data_relation.js');
var Union = require('../js/expression_union.js');

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

function createColumns(length) {
  return (new Array(length)).map(function(x) { return Math.random()*100;});
}

function createData(rows,columns) {
  return (new Array(rows)).map(function() { return createColumns(columns); });
}

describe('Union', function() {

  var assertionsEqual = function(union,rel) {
    var res = union.getResult();
    for (var i = 0; i < rel.length; i++) {
      expect(rel[i]).toBe(res[i]);
    }
  };

  var assertionsSingle = function(union,rel1, rel2) {
    it('does a union without duplicates', function() {
      var sideA = rel1.concat(rel2);
      assertionsEqual(union,sideA);
    });
  };

  for (var i = 0; i < 10; i++) {
    var noOfCol = Math.floor(Math.random() * 100) + 1;
    var noOfRows = Math.floor(Math.random() * 100) + 1;
    var columns = createColumns(noOfCol);
    var itemsInRelationOne = createData(noOfCol,noOfRows);
    var itemsInRelationTwo = createData(noOfCol,noOfRows).map(function(x) {
      return x.map(function(i) {
        return x + "d";
      });
    });
    var relationOne = new DataRelation("DataOne",columns,itemsInRelationOne);
    var relationTwo = new DataRelation("DataTwo",columns,itemsInRelationTwo);
    var union = new Union(relationOne,relationTwo);
    assertionsSingle(union,itemsInRelationOne,itemsInRelationTwo);
    relationTwo = new DataRelation("DataTwo",columns,itemsInRelationOne);
    union = new Union(relationOne,relationTwo);
    assertionsEqual(union,itemsInRelationOne);
  }

});
