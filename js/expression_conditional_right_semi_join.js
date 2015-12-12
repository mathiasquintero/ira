/*
IRA - Interactive Relational Algebra Tool
Copyright (C) 2010-2012 Henrik Mühe

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
function ConditionalRightSemiJoin(condition, input1, input2) {
    this.input1 = input1;
    this.input2 = input2;
    this.condition = condition;

    this.setChildren([this.condition, this.input1, this.input2]);

    this.getName = function() {
        return this.input1.getName() + "_" + this.input2.getName();
    };
    this.setName = null;

    this.getColumns = function() {
        if (this.condition.isEmpty()) return (new ConditionalJoin(this.condition, this.input1, this.input2)).getColumns();
        return this.input2.getColumns();
    };
    this.setColumns = null;

    this.getResult = function() {
      if (this.condition.isEmpty()) return (new ConditionalJoin(this.condition, this.input1, this.input2)).getResult();
        var r = new Projection(this.input2.getColumns().join(","), new ConditionalJoin(this.condition, this.input1, this.input2));
        return r.getResult();
    };

    this.copy = function() {
        return new ConditionalRightSemiJoin(this.input1.copy(), this.input2.copy());
    };

    this.toHTML = function(options) {
        var display = '';
        display += '(' + this.input1.toHTML(options) + " " + latex("\\rtimes") + "<span style='font-size:10pt; vertical-align: bottom'>" + this.condition.toHTML(options) + "</span> " + " " + this.input2.toHTML(options) + ")";
        return display;
    };

    this.toLatex = function(options) {
        return "(" + this.input1.toLatex(options) + "\\rtimes_{" + this.condition.toLatex(options) + "} " + this.input2.toLatex(options) + ")";
    };
}
ConditionalRightSemiJoin.prototype = new Relation();
