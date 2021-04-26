/**
 * `WebsocketHeartbeatJs` constructor.
 *
 * @param {Object} opts
 * {
 *  url                  websocket链接地址; websocket 링크 주소
 *  pingTimeout 未收到消息多少秒之后发送ping请求，默认15000毫秒; 메세지가 수신되지 않은 후 몇 초가 지나면 핑요청이 전송되며 기본값은 15초입니다.
    pongTimeout  发送ping之后，未收到消息超时时间，默认10000毫秒; 핑 전송 후 메세지가 수신되지 않는 시간 초과 기간, 기본값은 10초 입니다.
    reconnectTimeout
    pingMsg
 * }
 * @api public\
 */

	let window;

	export default function WebsocketHeartbeatJs({
		url,
		pingTimeout = 15000,
		pongTimeout = 10000,
		reconnectTimeout = 2000,
		pingMsg = 'heartbeat',
		repeatLimit = null
	}){
		this.opts ={
			url: url,
			pingTimeout: pingTimeout,
			pongTimeout: pongTimeout,
			reconnectTimeout: reconnectTimeout,
			pingMsg: pingMsg,
			repeatLimit: repeatLimit
		};
		this.ws = null;//websocket实例; websocket 인스턴스
		this.repeat = 0;
	
		//override hook function
		this.onclose = () => {};
		this.onerror = () => {};
		this.onopen = () => {};
		this.onmessage = () => {};
		this.onreconnect = () => {};
	
		this.createWebSocket();
	}
	WebsocketHeartbeatJs.prototype.createWebSocket = function(){
		try {
			console.log('this.opts.url',this.opts.url);
			this.ws = new WebSocket(this.opts.url);
			this.initEventHandle();
		} catch (e) {
			this.reconnect();
			throw e;
		}
	};
	
	WebsocketHeartbeatJs.prototype.initEventHandle = function(){
		this.ws.onclose = () => {
			this.onclose();
			this.reconnect();
		};
		this.ws.onerror = () => {
			this.onerror();
			this.reconnect();
		};
		this.ws.onopen = () => {
			this.repeat = 0;
			this.onopen();
			//心跳检测重置; 하트 비트 감지 재설정
			this.heartCheck();
		};
		this.ws.onmessage = (event) => {
			// console.log('event',event);
			this.onmessage(event);
			//如果获取到消息，心跳检测重置; 메세지가 수신되면 하트비트 감지가 재설정 됩니다.
			//拿到任何消息都说明当前连接是正常的; 현재 연결이 정상이라는 메세지를 받습니다.
			this.heartCheck();
		};
	};
	
	WebsocketHeartbeatJs.prototype.reconnect = function(){
		if(this.opts.repeatLimit>0 && this.opts.repeatLimit <= this.repeat) return;//limit repeat the number
		if(this.lockReconnect || this.forbidReconnect) return;
		this.lockReconnect = true;
		this.repeat++;//必须在lockReconnect之后，避免进行无效计数; lockReconnect 후 유효하지 않은 계산을 지나갑니다.
		this.onreconnect();
		//没连接上会一直重连，设置延迟避免请求过多; 연결되지 않은 경우 계속 다시 연결을 용구하고, 너무 많은 요청을 피하기 위해 지연을 설정합니다.
		setTimeout(() => {
			this.createWebSocket();
			this.lockReconnect = false;
		}, this.opts.reconnectTimeout);
	};
	WebsocketHeartbeatJs.prototype.send = function(msg){
		this.ws.send(msg);
	};
	//心跳检测
	WebsocketHeartbeatJs.prototype.heartCheck = function(){
		this.heartReset();
		this.heartStart();
	};
	WebsocketHeartbeatJs.prototype.heartStart = function(){
		if(this.forbidReconnect) return;//不再重连就不再执行心跳; 다시 연결하거나 하트 비트를 수행하지 마시오.
		this.pingTimeoutId = setTimeout(() => {
			//这里发送一个心跳，后端收到后，返回一个心跳消息，;여기에 하트비트가 전송되며 하트비트 메시지가 반환됩니다.
			//onmessage拿到返回的心跳就说明连接正常; onmessage는 연결이  정상임을 나타내는 하트비트를 반환합니다.
			this.send(this.opts.pingMsg);
			//如果超过一定时间还没重置，说明后端主动断开了; 일정 시간이 지나도 재설정되지 않으면, 백엔드의 연결이 실제로 끊어집니다.
			this.pongTimeoutId = setTimeout(() => {
				//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
				//;onclose가 reconnect를 실행하면 ws.close()를 실행하고, reconnect를 직접 실행하면 onclose 및 reconnect를 두 번 트리거합니다.
				this.ws.close();
			}, this.opts.pongTimeout);
		}, this.opts.pingTimeout);
	};
	WebsocketHeartbeatJs.prototype.heartReset = function(){
		clearTimeout(this.pingTimeoutId);
		clearTimeout(this.pongTimeoutId);
	};
	WebsocketHeartbeatJs.prototype.close = function(){
		//如果手动关闭连接，不再重连; 연결을 수동으로 닫은 경우 다시 연결하지 마시오.
		this.forbidReconnect = true;
		this.heartReset();
		this.ws.close();
	};
	if(window) window.WebsocketHeartbeatJs = WebsocketHeartbeatJs;
	//export default WebsocketHeartbeatJs;
	