import WebsocketHeartbeatJs from './websocketHeartbeatJs'
export let recvData = {};

export function connection(codes)
{
	let websocketHeartbeatJS = new WebsocketHeartbeatJs({ url: 'wss://api.upbit.com/websocket/v1' });

	// websocketHeartbeatJS.onopen = function () {
		// console.log("websocket opened...");
		// let message= `[{"ticket":"test"},{"type":"trade","codes":${codes},"isOnlySnapshot":true}]`;

		// websocketHeartbeatJS.send(message);
		// websocketHeartbeatJS.send = function(message,callback)
	// }
	websocketHeartbeatJS.onopen = () => websocketHeartbeatJS.send(`[{"ticket":"test"},{"type":"trade","codes":${codes},"isOnlySnapshot":true}]`);

	websocketHeartbeatJS.onmessage = async function (message) {
		try{
			let text = await message.data.text();
			let jsonText = JSON.parse(text);
			if(jsonText['type'] !== undefined)
			{
				recvData[jsonText['code']] = jsonText;
				console.log('recvData',recvData)
			}
		}catch(e){
			console.log(e)
		}
	}

	websocketHeartbeatJS.onclose = function () {
		console.log("websocket closed on onclose event...");
	}
	
}

export function getTradePrice(code)
{
	console.log('recvData code',recvData[code]);
	if(recvData[code] !== undefined)
	{
		return recvData[code]['trade_price'];
	}	
	return undefined;
}

