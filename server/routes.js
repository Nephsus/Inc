var fs = require('fs');

var ACM_folder= "/Users/itecban/Documents/ITECBAN_ARGENTINA/Inc/server";

var data = {
    getStadisticsResponse: JSON.parse(fs.readFileSync(ACM_folder+'/getStadisticsResponse.json', 'utf8')),
    getDevices: JSON.parse(fs.readFileSync(ACM_folder+'/getDevices.json', 'utf8')),
    getDevices2: JSON.parse(fs.readFileSync(ACM_folder+'/getDevices2.json', 'utf8')),
    getDevices3: JSON.parse(fs.readFileSync(ACM_folder+'/getDevices3.json', 'utf8')),
    getEmployeeResponse: JSON.parse(fs.readFileSync(ACM_folder+'/getEmployeeResponse.json', 'utf8')),
    getStadisticsResponseFilter: JSON.parse(fs.readFileSync(ACM_folder+'/getStadisticsResponseFilter.json', 'utf8')),
    getSendAlarmsResponse: JSON.parse(fs.readFileSync(ACM_folder+'/getSendAlarmsResponse.json', 'utf8')),
    deleteUserDevice: JSON.parse(fs.readFileSync(ACM_folder+'/deleteUserDevice.json', 'utf8')),
    insertUserDevice: JSON.parse(fs.readFileSync(ACM_folder+'/insertDevice.json', 'utf8')),
    getAlevHist: JSON.parse(fs.readFileSync(ACM_folder+'/getAlevHist.json', 'utf8'))
   
};

module.exports = function (app) {

    app.get('/services/statistics/getStadisticsResponse', function (req, res) {
        console.log('get getStadisticsResponse');
        res.send(data.getStadisticsResponse);
    });

    app.get('/services/registereddevices/getDevices/:userCode/:paginationKey*?', function (req, res) {
        console.log('get getDevices' + req.params.paginationKey);
        if( req.params.paginationKey === undefined)
            res.send(data.getDevices);
        else
            if( req.params.paginationKey == 2)
                res.send(data.getDevices2);
             else
                 res.send(data.getDevices3);
    });

    app.get('/services/enviorementdash/getEmployeeResponse', function (req, res) {
        console.log('get getDevices');
        res.send(data.getEmployeeResponse);
    });

     app.get('/services/statistics/getStadisticsResponseFilter', function (req, res) {
        console.log('get getDevices');
        res.send(data.getStadisticsResponseFilter);
    });

    app.get('/services/statistics/getSendAlarmsResponse', function (req, res) {
        console.log('get getDevices');
        res.send(data.getSendAlarmsResponse);
    });

     app.get('/services/deleteUserDevice/getDevices/:codeUser/:deviceId', function (req, res) {
        console.log('get getDevices');
        res.send(data.deleteUserDevice);
    });

    app.post('/services/registereddevices/insertDevice', function (req, res) {
        console.log('get getDevices');
        res.send(data.insertUserDevice);
    });

    app.get('/services/alertPushHistory/getAlevHist/:userCode/:paginationKey*?', function (req, res) {
        console.log('getAlevHist');
        res.send(data.getAlevHist);
    });
    

   
};