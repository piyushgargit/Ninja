import http from 'http';
import {Selector} from 'testcafe'

fixture('testcafe demo')
    .page('http://192.168.1.6:3001')

    
const fetch = (url) => import('node-fetch').then((\{default: fetch\}) => fetch(url));
const homePage = Selector('#root > div > div > div.list-options-box > div > div > a')
const totalDevices = Selector('#root > div > div > div.list-devices-main > div > div:nth-child(n) > div.device-info');
const allDeviceName = totalDevices.find('span.device-name')
const editButton = Selector('#root > div > div > div.list-devices-main > div > div:nth-child(n) > div.device-options > a')


test('delete-last-device', async t => {
    await t
    .expect(homePage.innerText).eql('ADD DEVICE') 
    const deviceName = await allDeviceName.nth(-1).innerText
    console.log('Device name to be deleted is ' + deviceName)
    const a = await editButton.nth(-1).getAttribute('href')
    console.log(a)
    const uniqueCode = a.substring(14,23)
    console.log(uniqueCode)
    fetch('http://192.168.1.6:3000/devices/' + uniqueCode, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: null
    }).then(() => {
        console.log('removed');
    }).catch(err => {
        console.error(err)
    });
    await t.eval(() => location.reload(true));
    console.log('VERIFYING IF DEVICE IS DELETED')         
    for (let i = 0; i < await totalDevices.count; i++)
    {
        await t.expect(Selector(allDeviceName.nth(i)).innerText.visible).eql(false)
    }
    
});