const request = require("supertest");
var expect = require("chai").expect;
const express = require("express");

describe("searchTest()", function() {
  it("Testing search", function() {
    // 1. ARRANGE
    request(express)
      .get("api/fileOps/searchString")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function(err, res) {
        t.end();
      });
  });
});