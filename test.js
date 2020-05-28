#!/usr/local/bin/node
const config = require('./config');
const getApiUrl = require('./lib/getApiUrl');
const puppeteer = require('puppeteer');
const params = {
	allowStartStopRecording: 'true',
	attendeePW: 'ap' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
	autoStartRecording: 'false',
	joinViaHtml5: 'TRUE',
	meetingID: 'test-random-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
	moderatorPW: 'mp' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
	name: 'test-meeting-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
	record: 'false',
	voiceBridge: '71157',
	welcome:'welcome',
	fullName: 'Test-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
	redirect: 'true'
};



function run () {
    return new Promise(async (resolve, reject) => {
        try {
		  const uri = new URL(config.baseUrl);
		  console.log ('hostname: ' + uri.hostname);
		  console.log ('');
		  const browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox']
		  });
		  const page = await browser.newPage();
		  await page.setViewport({
			  width: 1280,
			  height: 1024,
		  });
		  let generalError = 0;
		  let consoleError = 0;
		  let pageError = 0;
		  let requestError = 0;
		  page
		    .on('error', ({ message }) => { pageError++; } )
			.on('console', message => {
				const type = message.type().substr(0, 3).toUpperCase();
				if (type == 'ERR' || type == 'WAR') {
					consoleError++;
				}
			  }
			 )
			.on('pageerror', ({ message }) => { pageError++; } )
			.on('requestfailed', request => { requestError++; } )

		  
		  // info
		  try { await page.goto(getApiUrl('getMeetings'), {waitUntil: 'networkidle2'}) } catch (e) { await page.waitForNavigation(); generalError++ };
		  const apiCallStatusInfo = await page.evaluate(el => el?el.innerHTML:'NOTFOUND', await page.$('response returncode'));
		  console.log('call-info-status: ' + (apiCallStatusInfo === 'SUCCESS'?1:0));
		  const meetingsCount = await page.$$('response meetings meeting');
		  console.log('stats-meeting-count: ' + meetingsCount.length);
		  let participantCount = 0
		  const participantsElements = await page.$$('response meetings meeting participantCount');
		  for(let participant of participantsElements){
			participantCount += parseInt(await page.evaluate(el => el?el.innerHTML:0, participant));
		  }
		  console.log('stats-participant-count: ' + participantCount);
		  let listenerCount = 0
		  const listenerElements = await page.$$('response meetings meeting listenerCount');
		  for(let listener of listenerElements){
			listenerCount += parseInt(await page.evaluate(el => el?el.innerHTML:0, listener));
		  }
		  console.log('stats-listener-count: ' + listenerCount);
		  let voiceParticipantCount = 0
		  const voiceParticipantElements = await page.$$('response meetings meeting voiceParticipantCount');
		  for(let voiceParticipant of voiceParticipantElements){
			voiceParticipantCount += parseInt(await page.evaluate(el => el?el.innerHTML:0, voiceParticipant));
		  }
		  console.log('stats-voice-participant-count: ' + voiceParticipantCount);
		  let videoCount = 0
		  const videoElements = await page.$$('response meetings meeting videoCount');
		  for(let video of videoElements){
			videoCount += parseInt(await page.evaluate(el => el?el.innerHTML:0, video));
		  }
		  console.log('stats-video-count: ' + videoCount);
		  console.log('call-info-error-count: ' + (consoleError + pageError + requestError + generalError));
		  console.log ('');
		  
		  // create
		  generalError = 0;
		  consoleError = 0;
		  pageError = 0;
		  requestError = 0;
		  try { await page.goto(getApiUrl('create', {
			allowStartStopRecording: params.allowStartStopRecording,
			attendeePW: params.attendeePW,
			autoStartRecording: params.autoStartRecording,
			joinViaHtml5: params.joinViaHtml5,
			meetingID: params.meetingID,
			moderatorPW: params.moderatorPW,
			name: params.name,
			record: params.record,
			voiceBridge: params.voiceBridge,
			welcome: params.welcome
			}), {waitUntil: 'networkidle2'}) } catch (e) { await page.waitForNavigation(); generalError++ };
		  const apiCallStatusCreate = await page.evaluate(el => el?el.innerHTML:'NOTFOUND', await page.$('response returncode'));
		  console.log('call-create-status: ' + (apiCallStatusCreate === 'SUCCESS'?1:0));
		  console.log('call-create-error-count: ' + (consoleError + pageError + requestError + generalError));
		  console.log ('');
		  
		  // join
		  generalError = 0;
		  consoleError = 0;
		  pageError = 0;
		  requestError = 0;
		  try { await page.goto(getApiUrl('join', {
			fullName: params.fullName,
			joinViaHtml5: params.joinViaHtml5,
			meetingID: params.meetingID,
			password: params.moderatorPW,
			redirect:params.redirect
			}), {waitUntil: 'networkidle2'}) } catch (e) { await page.waitForNavigation(); generalError++ };
		  const buttons = await page.$$('div.ReactModal__Content button');
		  // click alleen luisteren button (0 = modal-close, 1 = microfoon, 2 = luisteren)
		  if (buttons && buttons.length > 2) await buttons[2].click();
		  await page.waitFor(2000);
		  // check of we de username op de juiste plek terug vinden met dezelfde waarde als die we verzonden
		  const username = (await page.evaluate(el => el?el.innerHTML:'', await page.$('div[class^="participantsList--"] span[class^="userNameMain--"] span'))).replace(/\&nbsp;/g,' ').trim();
		  console.log('test-success-username: ' + (username === params.fullName?1:0));
		  // check of we de titel van der presentatie op de juiste plek terug vinden met dezelfde waarde als die we verzonden
		  const presentationTitle = (await page.evaluate(el => el?el.innerHTML:'', await page.$('h1[class^="presentationTitle--"]'))).replace(/\&nbsp;/g,' ').trim();
		  console.log('test-success-meetingname: ' + (presentationTitle === params.name?1:0));
		  // check of de koptelefoon knop blauw is en zichtbaar.
		  const audioButtonActiveAndVisible = await page.evaluate(() => {
			const e = document.querySelector('div[class^="centerWithActions--"] button > span[class*="primary--"] > i[class*="icon-bbb-listen"]');
			if (!e)
				return false;
			const style = window.getComputedStyle(e);
			return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
		  });
		  console.log('test-success-audiobutton: ' + (audioButtonActiveAndVisible?1:0));
		  //await page.screenshot({path: 'screenshot.png'});
		  console.log('call-join-error-count: ' + (consoleError + pageError + requestError + generalError));
		  console.log ('');
		  
		  
		  // end
		  generalError = 0;
		  consoleError = 0;
		  pageError = 0;
		  requestError = 0;
		  try { await page.goto(getApiUrl('end', {
			joinViaHtml5: params.joinViaHtml5,
			meetingID: params.meetingID,
			password: params.moderatorPW,
			}), {waitUntil: 'networkidle2'}) } catch (e) { await page.waitForNavigation(); generalError++ };
		  const apiCallStatusEnd = await page.evaluate(el => el?el.innerHTML:'NOTFOUND', await page.$('response returncode'));
		  console.log('call-status-end: ' + (apiCallStatusEnd === 'SUCCESS'?1:0));
		  console.log('call-end-error-count: ' + (consoleError + pageError + requestError + generalError));
		  
		  await browser.close();
		  

		  
		  
        } catch (e) {
            return reject(e);
        }
    })
}

run().then(console.log).catch(console.error);
