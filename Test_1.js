import http from 'http';
import { json } from 'stream/consumers';
import {Selector} from 'testcafe'

fixture('testcafe demo')
    .page('http://192.168.1.6:3001')

const homePage = Selector('#root > div > div > div.list-options-box > div > div > a')
const allDevices = Selector('#root > div > div > div.list-devices-main > div > div:nth-child(n)')
const totalDevices = Selector('#root > div > div > div.list-devices-main > div > div:nth-child(n) > div.device-info');
const allDeviceName = totalDevices.find('span.device-name')
const allDeviceCapacity = totalDevices.find('span.device-capacity')
const allDeviceType = totalDevices.find('span.device-type')
const editButton = Selector('#root > div > div > div.list-devices-main > div > div:nth-child(n) > div.device-options > a')
const deleteButton = Selector('#root > div > div > div.list-devices-main > div > div:nth-child(n) > div.device-options > button')

const getResponseData = (url) => new Promise((resolve, reject) => {
    http.get(url, res => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => resolve({ statusCode, contentType, rawData }));
    }).on('error', e => reject(e));
});

test('retrieve-the-list-of-devices', async t => {
    const response = await getResponseData('http://192.168.1.6:3000/devices');
    
    await t
        .expect(homePage.innerText).eql('ADD DEVICE') 
        .expect(response.statusCode).eql(200);
        //console.log(response.contentType);
        //const r = response.rawData;
        //const json_data = JSON.stringify(response.rawData)\
        console.log(response.rawData)  
        console.log('VERIFYING IF ALL DEVICE NAMES ARE SAME IN API AND UI')         
        for (let i = 0; i < await totalDevices.count; i++){
            const deviceName = await allDeviceName.nth(i).innerText
            if (response.rawData.search(deviceName))
            {
                console.log('Device found ' + deviceName)
            }
            else\{
                console.log("Device not found " + deviceName)
            }
        }
        console.log('VERIFYING IF ALL DEVICES CAPACITY ARE SAME IN API AND UI')         
        for (let i = 0; i < await totalDevices.count; i++){
            const deviceCapacity = await allDeviceCapacity.nth(i).innerText
            if (response.rawData.search(deviceCapacity))
            {
                console.log('Device Capacity found ' + deviceCapacity)
            }
            else{
                console.log("Device Capacity not found " + deviceCapacity)
            }
        }
        console.log('VERIFYING IF ALL DEVICES TYPE ARE SAME IN API AND UI')         
        for (let i = 0; i < await totalDevices.count; i++){
            const deviceType = await allDeviceType.nth(i).innerText
            if (response.rawData.search(deviceType))
            {
                console.log('Device Type found ' + deviceType)
            }
            else{
                console.log("Device Type not found " + deviceType)
            }
        }
        for (let i = 0; i < await allDevices.count; i++)
        {
            const deviceName = await allDeviceName.nth(i).innerText
            await t.expect(Selector(editButton.nth(i)).visible).eql(true)
            console.log('Edit button is available with device ' + deviceName)
            await t.expect(Selector(deleteButton.nth(i)).visible).eql(true)
            console.log('Delete button is available with device ' + deviceName)
        }
        // var obj = \{\
        //     table: []\
        //  \};\
        //  obj.table.push(response.rawData);\
        //  var json = JSON.stringify(obj)\
        // fs.writeFile('myjsonfile.json', json, (err) => \{\
        //     if (err) throw err;\
        // \});\

        // const new_json = JSON.parse(response.rawData)\
        // console.log('==============')\
        // for(let value of Object.values(new_json))\{\
        //     console.log(value);\
        //   \}\
    });