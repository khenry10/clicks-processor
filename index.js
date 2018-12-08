console.log("running Keiths solution...")

var package = require('./package.json');
const fs = require('fs');

console.log("package.maxIpClicks = ", package.maxIpClicks)

function getTime( date ){
  return new Date( date ).getTime();
};

const breakDownTime = ( timeArr, timestamp, click ) => {
  const
    date = new Date( timestamp ),
    hour = date.getHours();

    timeArr.hasOwnProperty( hour ) ?
      timeArr[hour].push( click ) :
      timeArr[hour] = [click];

    return timeArr;
};

exports.buildDictionary = ( clicks ) => {

  let dictionary = {};

  clicks.forEach( click => {
    const ip = click.ip;

    if( !dictionary.hasOwnProperty( ip ) ){
      dictionary[ip] = {};
    }

    dictionary[ip].count = dictionary[ip].hasOwnProperty( 'count' ) ?
      dictionary[ip].count + 1
      : 1;

    if( !dictionary[ip].hasOwnProperty( "time" ) ){
      dictionary[ip].time = {};
    }

    dictionary[ip].time = breakDownTime( dictionary[ip].time, click.timestamp, click );

  });

  writeToJson('dictionary.json', dictionary);

  return dictionary;
};


exports.reduceToWinningClick =  function( prev, current ) {
  if( prev.amount == current.amount)
  {
    return ( getTime( prev.timestamp ) < getTime( current.timestamp ) ) ? prev : current;
  }
  else
  {
    return (prev.amount > current.amount) ? prev : current
  }
};

exports.reduceClicks = dictionary => {
  resultset = [];

  for(const key of Object.keys( dictionary ) ) {

      if( dictionary[key].count <= package.maxIpClicks )
      {
        const timeObj = dictionary[key].time;

        for(const key of Object.keys( timeObj ) ) {

            if( timeObj[key].length === 1 )
            {
              resultset.push( timeObj[key][0] )
            }
            else
            {
              const winner = timeObj[key]
                .reduce( ( prev, current ) => exports.reduceToWinningClick( prev, current ) );

              resultset.push( winner );
            }
        }
      };
   };
   return resultset;
};

writeToJson = function( fileName, payload ){
  fs.writeFile( fileName , JSON.stringify( payload , null, 2), 'utf8', function( err, data ){
    if( err ){
      console.log(" writeToJson err = ", err);
    }
  });
};

exports.createResultSet = function( clicks ){
  console.log("package.maxIpClicks = ", package.maxIpClicks)

  const
    dictionary = exports.buildDictionary( clicks ),
    resultset = exports.reduceClicks(dictionary)
      .sort( ( a, b ) => getTime( a.timestamp ) - getTime( b.timestamp ) );

  writeToJson( 'results.json', resultset );

  return resultset;
};

console.log("solution has been run...")
