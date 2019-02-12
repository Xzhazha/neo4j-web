# coding=utf-8
from flask import Flask, jsonify, render_template
#from py2neo import Graph
from neo4j.v1 import GraphDatabase

driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "admin"))



app = Flask(__name__)
#graph = Graph(password="admin")

# def buildNodes(nodeRecord):
#     data = {"id": nodeRecord['n'].__name__, "label": str(nodeRecord['n']._Node__labels)}
#     data.update(dict(nodeRecord['n']))
#
#     return {"data": data}

def buildNodes(nodeRecord):
    data = {"id": nodeRecord._id, "label": list(nodeRecord._labels)[0]} #将集合元素变为list，然后取出值
    data.update(dict(nodeRecord._properties))

    return {"data": data}

# def buildEdges(relationRecord):
#     data = {"source": str(relationRecord['r'].start_node().__name__),
#             "target": str(relationRecord['r'].end_node().__name__),
#             "relationship": relationRecord['r']._Relationship__type}
#
#     return {"data": data}

def buildEdges(relationRecord):
    data = {"source": relationRecord.start_node._id,
            "target":relationRecord.end_node._id,
            "relationship": relationRecord.type}

    return {"data": data}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/graph')
def get_graph():
    # nodes = list(map(buildNodes, graph.run('MATCH (n) RETURN n').data()))
    #
    # edges = list(map(buildEdges, graph.run('MATCH ()-[r]->() RETURN r').data()))
    # elements = {"nodes": nodes, "edges": edges}

    with driver.session() as session:
        results=session.run('MATCH (p1{name:"Laurence Fishburne"})-[r1:ACTED_IN]->(m)<-[r2:DIRECTED]-(p2)  RETURN p1,m,p2,r1,r2').values()
        nodeList=[]
        edgeList=[]
        for result in results:
            nodeList.append(result[0])
            nodeList.append(result[1])
            nodeList.append(result[2])
            nodeList=list(set(nodeList))
            edgeList.append(result[3])
            edgeList.append(result[4])

        nodes = list(map(buildNodes, nodeList))
        edges= list(map(buildEdges,edgeList))


        # nodes = list(map(buildNodes,session.run("MATCH (n) RETURN n").value()))
        # edges= list(map(buildEdges,session.run("MATCH ()-[r]->() RETURN r").value()))

    return jsonify(elements = {"nodes": nodes, "edges": edges})

if __name__ == '__main__':
    app.run(debug = True)