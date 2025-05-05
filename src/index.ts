import { Hono } from 'hono'

const app = new Hono()

import NamedNodeBase from '@rdfjs/data-model/lib/NamedNode.js'
import Literal from '@rdfjs/data-model/lib/Literal.js'
import QuadBase from '@rdfjs/data-model/lib/Quad.js'
import Dataset from '@rdfjs/dataset/DatasetCore.js'
import toNT from '@rdfjs/to-ntriples'
// import rdf from 'rdf-ext'

/// =============================== rdf-ext =============================== ///
// otherwise fails with 'Uncaught ReferenceError: window is not defined'
// rdf.dataset().toCanonical()

class NamedNode extends NamedNodeBase {
  toCanonical () {
    return toNT(this)
  }

  toString () {
    return this.value
  }

  toURL () {
    return new URL(this.value)
  }
}

class Quad extends QuadBase {
  toCanonical () {
    return toNT(this)
  }

  toString () {
    return this.toCanonical()
  }
}


function namedNode(value:any): NamedNode {
  if (typeof value !== 'string') {
    value = value.toString()
  }

  return new NamedNode(value)
}

const langStringDatatype = new NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
const stringDatatype = new NamedNode('http://www.w3.org/2001/XMLSchema#string')


function literal (value: any, languageOrDatatype: string|null = null) {
  if (typeof languageOrDatatype === 'string') {
    return new Literal(value, languageOrDatatype, langStringDatatype)
  } else {
    return new Literal(value, '', languageOrDatatype || stringDatatype)
  }
}

function quad (subject: NamedNode, predicate: NamedNode, object: NamedNode | Literal, graph: NamedNode) {
  return new Quad(subject, predicate, object, graph)
}


/// =============================== rdf-ext =============================== ///


// // all Quads are added to an RDF/JS Dataset
const dataset = new Dataset()

const example: any = {
  subject: namedNode('http://example.org/subject'),
  subject1: namedNode('http://example.org/subject1'),
  subject2: namedNode('http://example.org/subject2'),
  subject3: namedNode('http://example.org/subject3'),
  predicate: namedNode('http://example.org/predicate'),
  predicate1: namedNode('http://example.org/predicate1'),
  predicate2: namedNode('http://example.org/predicate2'),
  predicate3: namedNode('http://example.org/predicate3'),
  object: literal('object'),
  object1: literal('1'),
  object2: literal('2'),
  object3: literal('3'),
  graph: namedNode('http://example.org/graph'),
  graph1: namedNode('http://example.org/graph1'),
  graph2: namedNode('http://example.org/graph2'),
  graph3: namedNode('http://example.org/graph3')
}

example.quad = quad(example.subject, example.predicate, example.object, example.graph)
example.quad1 = quad(example.subject, example.predicate, example.object1, example.graph)
example.quad2 = quad(example.subject, example.predicate, example.object2, example.graph)
example.quad3 = quad(example.subject, example.predicate, example.object3, example.graph)


dataset.add(example.quad)
dataset.add(example.quad1)
dataset.add(example.quad2)
dataset.add(example.quad3)


app.get('/', (c) => {
  return c.text(toNT(dataset))
})
  
export default app

