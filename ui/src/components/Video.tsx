import { useEffect, useRef } from "react";
function Video(props: any)
{
  const token = props.token;
  const onRoomReady =  {props}
  const user = props.user;

  console.log(`Inside Video.tsx user: ${user} token: ${props.token}`)

  let container = useRef(null);

  // @ts-ignore 
  window.setupRoomSession = (roomsession: any) => {
    console.log(`Inside Video.tsx setupRoomSession`)

    //@ts-ignore
    onRoomReady(roomsession);
  };

  // @ts-ignore
  window.handleEvent = (event: string, params: any) => {
    console.log(`handleEvent: ${event} params:`, params);
  }

  useEffect(() => {
    if (container.current === null) {console.log('returning empty'); return;}
    console.log(`container.current: ${container.current}`);
    let c = container.current;
    let script = document.createElement("script");
    script.innerHTML = `
  !function(e,r){e.swvr=e.swvr||function(r={}){
  Object.assign(e.swvr.p=e.swvr.p||{},r)}
  ;let t=r.currentScript,n=r.createElement("script")
  ;n.type="module",n.src="https://cdn.signalwire.com/video/rooms/index.js",
  n.onload=function(){let n=r.createElement("ready-room")
  ;n.params=e.swvr.p,t.parentNode.appendChild(n)},t.parentNode.insertBefore(n,t)
  ;let i=r.createElement("link")
  ;i.type="text/css",i.rel="stylesheet",i.href="https://cdn.signalwire.com/video/rooms/signalwire.css",
  t.parentNode.insertBefore(i,t),
  e.SignalWire=e.SignalWire||{},e.SignalWire.Prebuilt={VideoRoom:e.swvr}
  }(window,document);

  SignalWire.Prebuilt.VideoRoom({
    token: '${token}',
    userName: '${user}',
    setupRoomSession: (roomSession) => {
      // if (window.setupRoomSession !== undefined) window.setupRoomSession(roomsession); 
      roomSession.on('layout.changed', (params) => window.handleEvent('Layout Changed', params))
      roomSession.on('member.updated', (params) => window.handleEvent('Member Updated', params))
      roomSession.on('member.joined', (params) => window.handleEvent('Member Joined', params))
      roomSession.on('member.left', (params) => window.handleEvent('Member Leave', params))
      roomSession.on('member.talking', (params) => window.handleEvent('Talking', params))
      roomSession.on('room.joined', (params) => window.handleEvent('Room Joined', params))
      roomSession.on('room.updated', (params) => window.handleEvent('Room Updated', params))
  }
     
  });
    `;


    //@ts-ignore
    c.appendChild(script);
    return () => {
      //@ts-ignore
      c.removeChild(script);
    };
  }, []);
  return <div ref={container}></div>;
}
export default Video;
