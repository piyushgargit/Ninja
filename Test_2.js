import {Selector} from 'testcafe'

fixture('testcafe demo')
    .page('http://192.168.1.6:3001')

    const homePage = Selector('#root > div > div > div.list-options-box > div > div > a')
    const totalDevices = Selector('#root > div > div > div.list-devices-main > div > div:nth-child(n) > div.device-info');
    const addDeviceButton = Selector('#root > div > div > div.list-options-box > div > div > a');
    const allDeviceName = totalDevices.find('span.device-name')
    const allDeviceCapacity = totalDevices.find('span.device-capacity')
    const allDeviceType = totalDevices.find('span.device-type')
    const inputSystemName = 'System_' + Math.floor((Math.random() * 100) + 1)
    const capacity = Math.floor((Math.random() * 1000) + 1).toString()
    const systemName = Selector('#system_name')
    const type = Selector('#type')
    const typeOption = type.find('option')
    const hddCapacity = Selector('#hdd_capacity')
    const saveButton = Selector('#root > div > div > div > a > button')
    
test('Add-Device', async t =>{

    await t
        .expect(homePage.innerText).eql('ADD DEVICE') 
        console.log('Page has been loaded')   
        await t.click(addDeviceButton)
                .expect(Selector('#root > div > div > div > h3').innerText).eql('NEW DEVICE')
                console.log('Add Device page has been opened')
        await t.typeText(systemName, inputSystemName)
                .click(type)
                .click(typeOption.withText('MAC'))
                .typeText(hddCapacity, capacity)
                .click(saveButton)
                .expect(homePage.innerText).eql('ADD DEVICE') 
                console.log(inputSystemName, capacity)
        for (let i = 0; i < await totalDevices.count; i++){
            const deviceName = await allDeviceName.nth(i).innerText
            const deviceCapacity = await allDeviceCapacity.nth(i).innerText
            const deviceType = await allDeviceType.nth(i).innerText
            if (deviceName === inputSystemName)
            {
                console.log('Device found')
                console.log("Added Device " + deviceName + " Found at " + i + ' position with capacity as ' + deviceCapacity + ' and device type as ' + deviceType)
                break;
            }
            else if (deviceName != inputSystemName)
            {
                console.log()
            }
        }
 });