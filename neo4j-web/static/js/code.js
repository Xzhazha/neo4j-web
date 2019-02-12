$(function(){
  $.get('/graph', function(result) {
    /*var style = [
      { selector: 'node[label = "Person"]', css: {'background-color': '#6FB1FC','content': 'data(name)'}},
      { selector: 'node[label = "Movie"]', css: {'background-color': '#F5A45D','content': 'data(title)'}},
	   { selector: 'edge', css: {'curve-style': 'bezier','target-arrow-shape': 'triangle', 'content': 'data(relationship)'}} 
    ];*/

    var cy =window.cy = cytoscape({
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
		
	  
    /* cy.nodes().forEach(function(ele) {
		ele.qtip({
			content: {
			text: function(ele){return 'Example qTip on ele ' + ele.data('id')},
			title: ele.data('name')
			},
			style: {
			classes: 'qtip-bootstrap'
			},
			position: {
			my: 'bottom center',
			at: 'top center',
			}
				
		})
	}); */
		
	cy.elements().qtip({ //点击elements处的提醒
		content: //function(){ return 'Example qTip on ele ' + this.id() },
			{text:'asdf',
			title:function(){ return 'Example qTip on ele ' + this.id() }},
		position: {
			my: 'top center',
			at: 'bottom center'
		},
		style: {
			classes: 'qtip-bootstrap',
			tip: {
				width: 16,
				height: 8
			}
		}
	});

			// call on core,点击空白处的提醒
	cy.qtip({
		content: 'Example qTip on core bg',
		position: {
			my: 'top center',
			at: 'bottom center'
		},
		show: {
			cyBgOnly: true
		},
		style: {
			classes: 'qtip-bootstrap',
			tip: {
				width: 16,
				height: 8
			}
		}
	}); 
    
	  /* cy.nodes().forEach(function(ele) {
			ele.qtip({
			  content: {
				text: qtipText(ele),
				title: ele.data('name')
			  },
			  style: {
				classes: 'qtip-bootstrap'
			  },
			  position: {
				my: 'bottom center',
				at: 'top center',
				target: ele
			  }
			})
		  });
    	
		function qtipText(node) {
		  
		  
		  var description = '<i>' + node.data('id') + '</i>';

		  return description + '</p>';
		} */
}, 'json');
});