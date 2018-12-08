var expect = require('chai').expect;
var code = require('../index.js');
var clicks = require('../clicks.json');

var createResultSet = code.createResultSet;
var buildDictionary = code.buildDictionary;
var reduceClicks = code.reduceClicks;
var findMostExpensivePerHour = code.findMostExpensivePerHour;


console.log("code = ", code);

results = [
  { "ip":"11.11.11.11", "timestamp":"3/11/2016 02:13:11", "amount": 7.25 },
  { "ip":"44.44.44.44", "timestamp":"3/11/2016 02:13:54", "amount": 8.75 },
  { "ip":"44.44.44.44", "timestamp":"3/11/2016 06:32:42", "amount": 5.00 },
  { "ip":"11.11.11.11", "timestamp":"3/11/2016 06:45:01", "amount": 12.00 },
  { "ip":"11.11.11.11", "timestamp":"3/11/2016 07:02:54", "amount": 4.50 },
  { "ip":"66.66.66.66", "timestamp":"3/11/2016 07:02:54", "amount": 14.25 },
  { "ip":"33.33.33.33", "timestamp":"3/11/2016 07:02:54", "amount": 15.75 },
  { "ip":"55.55.55.55", "timestamp":"3/11/2016 13:02:40", "amount": 8.00 },
  { "ip":"44.44.44.44", "timestamp":"3/11/2016 13:02:55", "amount": 8.00 },
  { "ip":"55.55.55.55", "timestamp":"3/11/2016 14:03:04", "amount": 5.25 },
  { "ip":"55.55.55.55", "timestamp":"3/11/2016 15:12:55", "amount": 6.25 },
  { "ip":"55.55.55.55", "timestamp":"3/11/2016 16:22:11", "amount": 8.50 },
  { "ip":"55.55.55.55", "timestamp":"3/11/2016 17:18:19", "amount": 11.25 },
  { "ip":"55.55.55.55", "timestamp":"3/11/2016 18:19:20", "amount": 9.00 },
]

var realIpFiltered = [
  {"ip":"11.11.11.11","timestamp":"3/11/2016 02:12:32","amount":6.5},
  {"ip":"11.11.11.11","timestamp":"3/11/2016 02:13:11","amount":7.25},
  {"ip":"44.44.44.44","timestamp":"3/11/2016 02:13:54","amount":8.75},
  {"ip":"44.44.44.44","timestamp":"3/11/2016 06:32:42","amount":5},
  {"ip":"11.11.11.11","timestamp":"3/11/2016 06:45:01","amount":12},
  {"ip":"11.11.11.11","timestamp":"3/11/2016 06:59:59","amount":11.75},
  {"ip":"11.11.11.11","timestamp":"3/11/2016 07:02:54","amount":4.5},
  {"ip":"33.33.33.33","timestamp":"3/11/2016 07:02:54","amount":15.75},
  {"ip":"66.66.66.66","timestamp":"3/11/2016 07:02:54","amount":14.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 13:02:40","amount":8},
  {"ip":"44.44.44.44","timestamp":"3/11/2016 13:02:55","amount":8},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 13:33:34","amount":8},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 13:42:24","amount":8},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 13:47:44","amount":6.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 14:02:54","amount":4.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 14:03:04","amount":5.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 15:12:55","amount":6.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 16:22:11","amount":8.5},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 17:18:19","amount":11.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 18:19:20","amount":9}
];

var subsetIpFiltered = [
  {"ip":"55.55.55.55","timestamp":"3/11/2016 13:02:40","amount":8},
  {"ip":"44.44.44.44","timestamp":"3/11/2016 13:02:55","amount":8},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 13:33:34","amount":8},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 13:42:24","amount":8},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 13:47:44","amount":6.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 14:02:54","amount":4.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 14:03:04","amount":5.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 15:12:55","amount":6.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 16:22:11","amount":8.5},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 17:18:19","amount":11.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 18:19:20","amount":9}
];

const reduce11ClicksDictionary = [
  {"ip":"55.55.55.55","timestamp":"3/11/2016 13:02:40","amount":8},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 13:02:55","amount":8},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 13:33:34","amount":8},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 13:42:24","amount":8},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 13:47:44","amount":6.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 14:02:54","amount":4.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 14:03:04","amount":5.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 15:12:55","amount":6.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 16:22:11","amount":8.5},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 17:18:19","amount":11.25},
  {"ip":"55.55.55.55","timestamp":"3/11/2016 18:19:20","amount":9}
]

const dictionaryClicks = [
    { "ip":"11.11.11.11", "timestamp":"3/11/2016 02:12:32", "amount": 6.50 },
    { "ip":"11.11.11.11", "timestamp":"3/11/2016 02:13:11", "amount": 7.25 },
    { "ip":"11.11.11.11", "timestamp":"3/11/2016 06:45:01", "amount": 12.00 },
    { "ip":"11.11.11.11", "timestamp":"3/11/2016 06:59:59", "amount": 11.75 },
    { "ip":"11.11.11.11", "timestamp":"3/11/2016 07:02:54", "amount": 4.50 },
  ];

const dictionaryJson = { "11.11.11.11": {
    "count": 5,
    "time": {
      "2": [
        {
          "ip": "11.11.11.11",
          "timestamp": "3/11/2016 02:12:32",
          "amount": 6.5
        },
        {
          "ip": "11.11.11.11",
          "timestamp": "3/11/2016 02:13:11",
          "amount": 7.25
        }
      ],
      "6": [
        {
          "ip": "11.11.11.11",
          "timestamp": "3/11/2016 06:45:01",
          "amount": 12
        },
        {
          "ip": "11.11.11.11",
          "timestamp": "3/11/2016 06:59:59",
          "amount": 11.75
        }
      ],
      "7": [
        {
          "ip": "11.11.11.11",
          "timestamp": "3/11/2016 07:02:54",
          "amount": 4.5
        }
      ]
    }
  }
}

describe('data setup and processing', function(){

  it("buildDictionary", function(){
    expect( buildDictionary( dictionaryClicks ) ).to.eql( dictionaryJson )
    expect( buildDictionary( [] ) ).to.eql({})
    expect( buildDictionary( dictionaryClicks )["11.11.11.11"].count ).to.eql(5)
    expect( buildDictionary( dictionaryClicks )["11.11.11.11"].time["2"].length ).to.eql(2)

  })

  it("reduceClicks", function(){

    expect( reduceClicks(reduce11ClicksDictionary ) ).to.eql([]);
    expect( reduceClicks( dictionaryClicks ) ).to.eql(["hell"]);

  })

  // it("hourly scan", function(){
  //
  //   expect( subsetIpFiltered.map( ( clicks, i) => findExpensivePerHour( clicks, i, subsetIpFiltered ) )  ).to.eql(
  //     [
  //       {"ip":"55.55.55.55","timestamp":"3/11/2016 13:02:40","amount":8},
  //       {"ip":"55.55.55.55","timestamp":"3/11/2016 13:33:34","amount":8},
  //       {"ip":"55.55.55.55","timestamp":"3/11/2016 13:42:24","amount":8},
  //       {"ip":"55.55.55.55","timestamp":"3/11/2016 13:47:44","amount":6.25}
  //     ]
  //   )
  //
  // })

})

const smallerDataSet = [
  { "ip":"22.22.22.22", "timestamp":"3/11/2016 02:02:58", "amount": 7.00 },
  { "ip":"11.11.11.11", "timestamp":"3/11/2016 02:12:32", "amount": 6.50 },
  { "ip":"11.11.11.11", "timestamp":"3/11/2016 02:13:11", "amount": 7.25 },
  { "ip":"44.44.44.44", "timestamp":"3/11/2016 02:13:54", "amount": 8.75 },
  { "ip":"22.22.22.22", "timestamp":"3/11/2016 05:02:45", "amount": 11.00 },
  { "ip":"44.44.44.44", "timestamp":"3/11/2016 06:32:42", "amount": 5.00 },
  { "ip":"22.22.22.22", "timestamp":"3/11/2016 06:35:12", "amount": 2.00 },
];

const smallerResults = [
  { "ip":"22.22.22.22", "timestamp":"3/11/2016 02:02:58", "amount": 7.00 },
  { "ip":"11.11.11.11", "timestamp":"3/11/2016 02:13:11", "amount": 7.25 },
  { "ip":"44.44.44.44", "timestamp":"3/11/2016 02:13:54", "amount": 8.75 },
  { "ip":"22.22.22.22", "timestamp":"3/11/2016 05:02:45", "amount": 11.00 },
  { "ip":"44.44.44.44", "timestamp":"3/11/2016 06:32:42", "amount": 5.00 },
  { "ip":"22.22.22.22", "timestamp":"3/11/2016 06:35:12", "amount": 2.00 }
]

describe('run the whole thing', function(){
  it('whole pacakge', function(){
    expect( createResultSet( smallerDataSet ) ).to.eql( smallerResults );
    expect( createResultSet( clicks ) ).to.eql( results );
  })
})
