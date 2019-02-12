$(function(){
  $.get('/graph', function(result) {
    /*var style = [
      { selector: 'node[label = "Person"]', css: {'background-color': '#6FB1FC','content': 'data(name)'}},
      { selector: 'node[label = "Movie"]', css: {'background-color': '#F5A45D','content': 'data(title)'}},
	   { selector: 'edge', css: {'curve-style': 'bezier','target-arrow-shape': 'triangle', 'content': 'data(relationship)'}} 
    ];*/

    var cy = cytoscape({
      container: document.getElementById('cy'),
      /*style: style,*/
	  style:cytoscape.stylesheet()
      .selector('node[label = "Person"]').css({'background-color': '#6FB1FC','content': 'data(name)'})
      .selector('node[label = "Movie"]').css({'background-color': '#F5A45D','content': 'data(title)'})
	  .selector('edge').css({'curve-style': 'bezier','target-arrow-shape': 'triangle','line-color': '#ffaaaa','target-arrow-color': '#ffaaaa','content': 'data(relationship)'})
      .selector(':selected').css({'background-color': 'black','line-color': 'black','target-arrow-color': 'black','source-arrow-color': 'black','opacity': 1})
      .selector('.faded').css({'opacity': 0.25,'text-opacity': 0}),
      layout: { name: 'cose', fit: true },      
      elements: result.elements
    });
  }, 'json');  
});