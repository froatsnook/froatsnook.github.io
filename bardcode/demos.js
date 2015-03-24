(function() {

"use strict";

window.drawGrid = function(g, w, h, spacing) {
  g.strokeStyle = "black";

  for (var x = 0; x < w; x += spacing) {
    g.beginPath();
    g.moveTo(x, 0);
    g.lineTo(x, h);
    g.stroke();
  }

  for (var y = 0; y < h; y += spacing) {
    g.beginPath();
    g.moveTo(0, y);
    g.lineTo(w, y);
    g.stroke();
  }
};

var Demo = React.createClass({displayName: "Demo",
  getInitialState: function() {
    return { code: this.props.children.toString().trim() };
  },

  runCode: function() {
    var code = this.state.code;
    //console.log(code);
    eval(code);
  },

  updateCode: function(e) {
    var newCode = e.target.value;
    this.setState({
      code: newCode
    });
  },

  render: function() {
    var self = this;

    // Extract the canvasId from the code.
    var canvasId = /document.getElementById\("(.*)"\)/.exec(this.state.code)[1];

    var w = /w = (\d+)/.exec(this.state.code)[1];
    var h = /h = (\d+)/.exec(this.state.code)[1];

    var codeStyle = {
        width: w + "px",
        height: h + "px"
    };
    var canvasStyle = {
        width: w + "px",
        height: h + "px"
    };

    setTimeout(function() {
      self.runCode();
    }, 0);

    return (
      React.createElement("article", {className: "demo-container"}, 
        React.createElement("div", {className: "demo"}, 
          React.createElement("h3", null, this.props.name), 

          React.createElement("textarea", {className: "demo-code", 
                    value: this.state.code, 
                    onChange: this.updateCode, 
                    autoComplete: "off", 
                    autoCorrect: "off", 
                    autoCapitalize: "off", 
                    spellCheck: "false", 
                    style: codeStyle}), 

          React.createElement("canvas", {id: canvasId, 
                  className: "demo-canvas", 
                  width: w, 
                  height: h, 
                  style: canvasStyle})
        )
      )
    );
  }
});

React.render(
  React.createElement("div", {id: "demos"}, 

    React.createElement("section", null, 
      React.createElement("h2", null, "Introduction"), 

      React.createElement("p", null, "By default, bardcode renders in the top left corner of the canvas."), 

      React.createElement(Demo, {name: "demo 1 - just draw something"}, 
("\nvar w = 420, h = 200;\nvar canvas = document.getElementById(\"demo-1\");\nvar g = canvas.getContext(\"2d\");\ng.fillStyle = \"white\";\ng.fillRect(0, 0, w, h);\ndrawBarcode(g, \"test\", { });\n"






)
      ), 

      React.createElement("p", null, "So why is it not at the very top left?  bardcode, by default, includes a quiet zone to the left and right of the barcode.  Since it's left aligned, there is some space on the left.  This can be configured:"), 

      React.createElement(Demo, {name: "demo 2 - no quiet zone"}, 
("\nvar w = 420, h = 200;\nvar canvas = document.getElementById(\"demo-2\");\nvar g = canvas.getContext(\"2d\");\ng.fillStyle = \"white\";\ng.fillRect(0, 0, w, h);\ndrawBarcode(g, \"test\", {\n    quietZoneSize: 0\n});\n"








)
      ), 

      React.createElement("p", null, "You can align and position the barcode within the canvas however you want:"), 

      React.createElement(Demo, {name: "demo 3 - position and alignment"}, 
("\nvar w = 420, h = 230;\nvar canvas = document.getElementById(\"demo-3\");\nvar g = canvas.getContext(\"2d\");\ng.fillStyle = \"white\";\ng.fillRect(0, 0, w, h);\ndrawBarcode(g, \"test\", {\n    x: w/2,\n    y: h/2,\n    horizontalAlign: \"center\",\n    verticalAlign: \"middle\"\n});\n"











)
      ), 

      React.createElement("p", null, "You might also find it useful to rotate the barcode.  Use ", React.createElement("span", {className: "mono"}, "options.angle"), " (degrees clockwise)."), 

      React.createElement(Demo, {name: "demo 4 - rotation"}, 
("\nvar w = 420, h = 250;\nvar canvas = document.getElementById(\"demo-4\");\nvar g = canvas.getContext(\"2d\");\ng.fillStyle = \"white\";\ng.fillRect(0, 0, w, h);\ndrawBarcode(g, \"test\", {\n    x: w/2,\n    y: h/2,\n    horizontalAlign: \"center\",\n    verticalAlign: \"middle\",\n    angle: 90\n});\n"












)
      )

    ), 

    React.createElement("section", null, 
      React.createElement("h2", null, "Width and height"), 

      React.createElement("p", null, "There are several options for controlling the width and height of rendered barcodes."), 

      React.createElement("p", null, "Setting the ", React.createElement("span", {className: "mono"}, "moduleWidth"), " sets the width of the thinnest bar.  The default value is 2.892."), 

      React.createElement("p", null, "That is, of course, unless you specify the ", React.createElement("span", {className: "mono"}, "maxWidth"), " which will decrease the ", React.createElement("span", {className: "mono"}, "moduleWidth"), " (if necessary) so that the barcode will fit within it (including the quiet zone unless ", React.createElement("span", {className: "mono"}, "quietZoneSize"), " is set to 0)."), 

      React.createElement("p", null, "However, both are ignored if the ", React.createElement("span", {className: "mono"}, "width"), " is specfied.  The ", React.createElement("span", {className: "mono"}, "moduleWidth"), " will be set to whatever value is necessary to make the barcode (plus quiet zone unless ", React.createElement("span", {className: "mono"}, "quietZoneSize"), " is set to 0) have the given width."), 

      React.createElement(Demo, {name: "demo 5 - width and height"}, 
("\nvar w = 420, h = 290;\nvar canvas = document.getElementById(\"demo-5\");\nvar g = canvas.getContext(\"2d\");\ng.fillStyle = \"white\";\ng.fillRect(0, 0, w, h);\n\ndrawGrid(g, w, h, 20);\n\ndrawBarcode(g, \"test\", {\n    x: w/2,\n    y: 0,\n    moduleWidth: 2,\n    quietZoneSize: 0,\n    horizontalAlign: \"center\",\n    verticalAlign: \"top\",\n    height: 50\n});\ndrawBarcode(g, \"test\", {\n    x: w/2,\n    y: 60,\n    maxWidth: 2*w/3,\n    horizontalAlign: \"center\",\n    verticalAlign: \"top\",\n    height: 50\n});\ndrawBarcode(g, \"test\", {\n    x: w/2,\n    y: 120,\n    maxWidth: 2*w/3,\n    quietZoneSize: 0,\n    horizontalAlign: \"center\",\n    verticalAlign: \"top\",\n    height: 50\n});\ndrawBarcode(g, \"test\", {\n    x: w/2,\n    y: 180,\n    width: w,\n    horizontalAlign: \"center\",\n    verticalAlign: \"top\",\n    height: 50\n});\ndrawBarcode(g, \"test\", {\n    x: w/2,\n    y: 240,\n    width: w,\n    quietZoneSize: 0,\n    horizontalAlign: \"center\",\n    verticalAlign: \"top\",\n    height: 50\n});\n"



















































)
      )

    ), 

    React.createElement("section", null, 
      React.createElement("h2", null, "Symbologies"), 

      React.createElement("p", null, "So far all of the barcodes have been Code-128 encoded \"test\".  Use the second parameter to `drawBarcode` to change the barcode text, and set ", React.createElement("span", {className: "mono"}, "options.type"), " to use a different symbology."), 

      React.createElement("p", null, "The supported symbologies are:"), 
      React.createElement("ul", null, 
        React.createElement("li", null, "Codabar"), 
        React.createElement("li", null, "Code 128"), 
        React.createElement("li", null, "Code 39"), 
        React.createElement("li", null, "EAN-8"), 
        React.createElement("li", null, "EAN-13"), 
        React.createElement("li", null, "FIM"), 
        React.createElement("li", null, "ITF (interleaved 2 of 5)"), 
        React.createElement("li", null, "UPC-A")
      ), 

      React.createElement(Demo, {name: "demo 6 - symbologies"}, 
("\nvar w = 420, h = 370;\nvar canvas = document.getElementById(\"demo-6\");\nvar g = canvas.getContext(\"2d\");\ng.fillStyle = \"white\";\ng.fillRect(0, 0, w, h);\n\nvar barcodes = [\n  { type: \"Codabar\", val: \"31117013206375\" },\n  { type: \"Code 128\", val: \"BarCode 1\" },\n  { type: \"Code 39\", val: \"0123456789\" },\n  { type: \"EAN-8\", val: \"9638507\" },\n  { type: \"EAN-13\", val: \"590123412345\" },\n  { type: \"FIM\", val: \"C\" },\n  { type: \"ITF\", val: \"04004\" },\n  { type: \"UPC-A\", val: \"90123412345\" }\n];\n\nvar targetHeight = (h + 5)/barcodes.length;\n\nfor (var i = 0; i < barcodes.length; i++) {\n  var barcode = barcodes[i];\n  drawBarcode(g, barcode.val, {\n    type: barcode.type,\n    x: w/2,\n    y: i*targetHeight,\n    maxWidth: w,\n    horizontalAlign: \"center\",\n    verticalAlign: \"top\",\n    height: targetHeight - 5\n  });\n}\n"































)
      )

    )
  ),
  document.getElementById("content")
);

})();

