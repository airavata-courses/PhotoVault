const request = require('supertest');
var test = require('tape');
const express = require('express');
var assert = require('assert');

describe('request(url)', function () {

  const app = express();

  test('testing search', function (t) {

    request(app)
      .get('/api/fileOps/searchString')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        t.end();
      });
  })

});