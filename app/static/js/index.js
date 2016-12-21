// console.log('It goes until here');
var ws = new WebSocket("ws://localhost:8888/vis");

ws.onopen = function(){
    // ws.send("Sent message ok");
    var e = document.getElementById("PopClass");
    ws.send(e.options[e.selectedIndex].text);
};

ws.onmessage = function(event) {
    data_json = event.data;
    console.log('You\'re here');
    // console.log(data_json);

    var json_obj = JSON.parse(data_json);

    // size=0;
    energycal_arr = [];
    for (var key in json_obj)
    {
       if (json_obj.hasOwnProperty(key))
       {
          energycal_arr.push(json_obj[key].EnergyCal);
          // size++;
       }
    }
    // console.log(size)
    // console.log(energycal_arr);

    final_bins = findBins(energycal_arr);
    // console.log(final_bins);

    var jsonBarData = {};
    jsonBarData["key"] = "Bins of "+document.getElementById("PopClass").options[document.getElementById("PopClass").selectedIndex].text;
    jsonBarData["bar"] = true
    jsonBarData["values"] = final_bins;
    // console.log(jsonBarData);
    var jsonLineData = {};
    jsonLineData["key"] = "Line of "+document.getElementById("PopClass").options[document.getElementById("PopClass").selectedIndex].text;
    jsonLineData["values"] = final_bins;
    // console.log(jsonBarData);

    buildBarChart(jsonBarData, jsonLineData);

};

function return_pop(){
	var d = document.getElementById("PopClass");
    ws.send(d.options[d.selectedIndex].text);
}

function findBins(data_arr){
    // data_arr = [1704.648,1766.856,1522.408,1471.296,1694.776,1630.12,1823.36,1964.528,1964.528,1578.888,1827.792,1878.712,1933.52,1635.512,1735.848,1964.528,1361.136,1487.064,1854.368,1512.536,1772.248,1782.288,1788.016,1866.976,1571.816,1256.68,1823.36,1543.376,1806.632,2036.608];
    console.log("data_arr.length: "+data_arr.length);
    min_data_arr = Math.min.apply(null,data_arr);
    console.log("min: "+min_data_arr);
    max_data_arr = Math.max.apply(null,data_arr)
    console.log("max: "+max_data_arr);
    numbins = 20;

    var bins = d3.layout.histogram()    // create layout object
    .bins(numbins)   // to use 20 bins
    .range([min_data_arr, max_data_arr])    // to cover range from 0 to 1
    (data_arr); // group the data into the bins
    // bins[i] is an array of values in the ith bin
    // bins[i].x is the lower bounds of the ith bin
    // bins[i].dx is the width of the ith bin
    // bins[i].x + bins[i].dx is the upper bounds of the ith bin
    // bins[i].y is the number of values in the ith bin
    // for (i = 0; i < bins.length; i++) {
    //     console.log(bins[i]);
    // }

    var final_bins = new Array(bins.length);
    for (var i = 0; i < bins.length; i++) {
        final_bins[i] = new Array(2);
        final_bins[i][0] = bins[i].x
        final_bins[i][1] = bins[i].y
    }

    return final_bins;
}

function buildBarChart(jsonBarData, jsonLineData){
    d3.selectAll("svg > *").remove();

    var testdata = [jsonBarData, jsonLineData
        // {
        //     "key" : "Quantity" ,
        //     "bar": true,
        //     "values" : [ [ 1136005200000 , 1271000.0] , [ 1138683600000 , 1271000.0] , [ 1141102800000 , 1271000.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0] , [ 1172638800000 , 3564700.0] , [ 1175313600000 , 2648493.0] , [ 1177905600000 , 2648493.0] , [ 1180584000000 , 2648493.0] , [ 1183176000000 , 2522993.0] , [ 1185854400000 , 2522993.0] , [ 1188532800000 , 2522993.0] , [ 1191124800000 , 2906501.0] , [ 1193803200000 , 2906501.0] , [ 1196398800000 , 2906501.0] , [ 1199077200000 , 2206761.0] , [ 1201755600000 , 2206761.0] , [ 1204261200000 , 2206761.0] , [ 1206936000000 , 2287726.0] , [ 1209528000000 , 2287726.0] , [ 1212206400000 , 2287726.0] , [ 1214798400000 , 2732646.0] , [ 1217476800000 , 2732646.0] , [ 1220155200000 , 2732646.0] , [ 1222747200000 , 2599196.0] , [ 1225425600000 , 2599196.0] , [ 1228021200000 , 2599196.0] , [ 1230699600000 , 1924387.0] , [ 1233378000000 , 1924387.0] , [ 1235797200000 , 1924387.0] , [ 1238472000000 , 1756311.0] , [ 1241064000000 , 1756311.0] , [ 1243742400000 , 1756311.0] , [ 1246334400000 , 1743470.0] , [ 1249012800000 , 1743470.0] , [ 1251691200000 , 1743470.0] , [ 1254283200000 , 1519010.0] , [ 1256961600000 , 1519010.0] , [ 1259557200000 , 1519010.0] , [ 1262235600000 , 1591444.0] , [ 1264914000000 , 1591444.0] , [ 1267333200000 , 1591444.0] , [ 1270008000000 , 1543784.0] , [ 1272600000000 , 1543784.0] , [ 1275278400000 , 1543784.0] , [ 1277870400000 , 1309915.0] , [ 1280548800000 , 1309915.0] , [ 1283227200000 , 1309915.0] , [ 1285819200000 , 1331875.0] , [ 1288497600000 , 1331875.0] , [ 1291093200000 , 1331875.0] , [ 1293771600000 , 1331875.0] , [ 1296450000000 , 1154695.0] , [ 1298869200000 , 1154695.0] , [ 1301544000000 , 1194025.0] , [ 1304136000000 , 1194025.0] , [ 1306814400000 , 1194025.0] , [ 1309406400000 , 1194025.0] , [ 1312084800000 , 1194025.0] , [ 1314763200000 , 1244525.0] , [ 1317355200000 , 475000.0] , [ 1320033600000 , 475000.0] , [ 1322629200000 , 475000.0] , [ 1325307600000 , 690033.0] , [ 1327986000000 , 690033.0] , [ 1330491600000 , 690033.0] , [ 1333166400000 , 514733.0] , [ 1335758400000 , 514733.0]]
        // }
        // ,{
        //     "key" : "Price" ,
        //     "values" : [ [ 1136005200000 , 71.89] , [ 1138683600000 , 75.51] , [ 1141102800000 , 68.49] , [ 1143781200000 , 62.72] , [ 1146369600000 , 70.39] , [ 1149048000000 , 59.77] , [ 1151640000000 , 57.27] , [ 1154318400000 , 67.96] , [ 1156996800000 , 67.85] , [ 1159588800000 , 76.98] , [ 1162270800000 , 81.08] , [ 1164862800000 , 91.66] , [ 1167541200000 , 84.84] , [ 1170219600000 , 85.73] , [ 1172638800000 , 84.61] , [ 1175313600000 , 92.91] , [ 1177905600000 , 99.8] , [ 1180584000000 , 121.191] , [ 1183176000000 , 122.04] , [ 1185854400000 , 131.76] , [ 1188532800000 , 138.48] , [ 1191124800000 , 153.47] , [ 1193803200000 , 189.95] , [ 1196398800000 , 182.22] , [ 1199077200000 , 198.08] , [ 1201755600000 , 135.36] , [ 1204261200000 , 125.02] , [ 1206936000000 , 143.5] , [ 1209528000000 , 173.95] , [ 1212206400000 , 188.75] , [ 1214798400000 , 167.44] , [ 1217476800000 , 158.95] , [ 1220155200000 , 169.53] , [ 1222747200000 , 113.66] , [ 1225425600000 , 107.59] , [ 1228021200000 , 92.67] , [ 1230699600000 , 85.35] , [ 1233378000000 , 90.13] , [ 1235797200000 , 89.31] , [ 1238472000000 , 105.12] , [ 1241064000000 , 125.83] , [ 1243742400000 , 135.81] , [ 1246334400000 , 142.43] , [ 1249012800000 , 163.39] , [ 1251691200000 , 168.21] , [ 1254283200000 , 185.35] , [ 1256961600000 , 188.5] , [ 1259557200000 , 199.91] , [ 1262235600000 , 210.732] , [ 1264914000000 , 192.063] , [ 1267333200000 , 204.62] , [ 1270008000000 , 235.0] , [ 1272600000000 , 261.09] , [ 1275278400000 , 256.88] , [ 1277870400000 , 251.53] , [ 1280548800000 , 257.25] , [ 1283227200000 , 243.1] , [ 1285819200000 , 283.75] , [ 1288497600000 , 300.98] , [ 1291093200000 , 311.15] , [ 1293771600000 , 322.56] , [ 1296450000000 , 339.32] , [ 1298869200000 , 353.21] , [ 1301544000000 , 348.5075] , [ 1304136000000 , 350.13] , [ 1306814400000 , 347.83] , [ 1309406400000 , 335.67] , [ 1312084800000 , 390.48] , [ 1314763200000 , 384.83] , [ 1317355200000 , 381.32] , [ 1320033600000 , 404.78] , [ 1322629200000 , 382.2] , [ 1325307600000 , 405.0] , [ 1327986000000 , 456.48] , [ 1330491600000 , 542.44] , [ 1333166400000 , 599.55] , [ 1335758400000 , 583.98] ]
        // }
    ].map(function(series) {
            series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
            return series;
        });
    var chart;
    nv.addGraph(function() {
        chart = nv.models.linePlusBarChart()
            .margin({top: 50, right: 80, bottom: 30, left: 80})
            .legendLeftAxisHint('')
            .legendRightAxisHint('')
            .color(d3.scale.category10().range())
            .focusEnable(false)
            .interpolate('basis');
        // chart.xAxis.tickFormat(function(d) {
        //     return d
        //     // return d3.time.format('%x')(new Date(d))
        // }).showMaxMin(false);
        // chart.y2Axis.tickFormat(function(d) { return '$' + d3.format(',f')(d) });
        chart.bars.forceY([0]).padData(false);
        // chart.x2Axis.tickFormat(function(d) {
        //     return d
        //     // return d3.time.format('%x')(new Date(d))
        // }).showMaxMin(false);
        d3.select('#chart1 svg')
            .datum(testdata)
            .transition().duration(500).call(chart);

        nv.utils.windowResize(function(){
            chart.update();
        });
        // chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
        return chart;
    });
}
