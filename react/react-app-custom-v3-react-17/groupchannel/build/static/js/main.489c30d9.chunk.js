(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{103:function(e,n,t){},132:function(e,n,t){},136:function(e,n,t){"use strict";t.r(n);var a=t(0),l=t.n(a),c=t(21),o=t.n(c),r=(t(103),t(46)),i=t(26),u=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"provided by eazel"),l.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 114.3 60.7"},l.a.createElement("path",{d:"M113.05,59.18l-2-.41c-42.82-8.89-65-8.89-107.82,0l-2,.41v-51l1.32-.27C45.42-1,68.89-1,111.74,7.92l1.31.27Z",stroke:"#000",fill:"#fff"})))},s=function(){return l.a.createElement("div",null,l.a.createElement(u,null))},m=t(41),d=(t(131),t(132),"ABD4B8EB-4479-4478-9C51-D41B009C6780"),E="junhee",h="junhee",p=t(28),b=t(64),f=t(58),g=t(65),_=t(20);var v=Object(_.b)(function(e){e&&console.log("\ud83d\udd25 props changed: ",e);var n=e.stores,t=n.sdkStore,c=n.userStore,o=e.config,r=o.isOnline,i=o.userId,u=o.appId,s=o.accessToken,m=o.theme,d=o.userListQuery,E=o.logger,h=o.pubSub;Object(a.useCallback)(function(){console.log("SDK store list log",t.initialized,t.sdk,t.loading,t.error),console.log("User store list log",c.initialized,c.user,c.loading),console.log("Config list log",r,i,u,s,m,d,E,h)},[t.initialized,t.sdk,t.loading,t.error,c.initialized,c.user,c.loading,r,i,u,s,m,d,E,h])();var _=Object(a.useState)(!1),v=Object(p.a)(_,2),C=v[0],y=v[1],O=Object(a.useState)(""),j=Object(p.a)(O,2),k=j[0],w=j[1];return l.a.createElement("div",{className:"customized-app"},l.a.createElement("div",{className:"sendbird-app__wrap"},l.a.createElement("div",{className:"sendbird-app__channellist-wrap"},l.a.createElement(f.a,{onChannelSelect:function(e){e&&e.url&&w(e.url)}})),l.a.createElement("div",{className:"sendbird-app__conversation-wrap"},l.a.createElement(b.a,{channelUrl:k,onChatHeaderActionClick:function(){y(!0)}}))),C&&l.a.createElement("div",{className:"sendbird-app__settingspanel-wrap",style:{position:"absolute",top:"52px",right:0}},l.a.createElement(g.a,{channelUrl:k,onCloseClick:function(){y(!1)}})))});function C(){return d?l.a.createElement(m.a,{appId:d,userId:E,nickname:h},l.a.createElement(v,null)):l.a.createElement("p",null,"Set APP_ID in const.js")}var y,O,j,k=t(61),w=function(e){var n=e.info;return l.a.createElement(l.a.Fragment,null,l.a.createElement("p",null,"url : ",n.url),l.a.createElement("p",null,"channel type : ",n.channelType),l.a.createElement("p",null,"members:"," ",n.members.map(function(e,n){return l.a.createElement("span",{key:n,style:{marginRight:"1%",border:"1px solid black",padding:"0.5%"}},e.nickname)})))},S=function(){var e=Object(a.useState)(!1),n=Object(p.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(),r=Object(p.a)(o,2),i=r[0],u=r[1];return l.a.createElement("div",null,l.a.createElement("h1",null,"Create Channel"),l.a.createElement(m.a,{appId:d,userId:E,nickname:h},l.a.createElement("div",{className:"create_channel_wrap"},l.a.createElement("button",{type:"button",onClick:function(){return c(!0)}},"create_channel"),t&&l.a.createElement(k.a,{onCreateChannel:function(e){console.log("res: ",e),e.url&&u({url:e.url,members:e.members,channelType:e.channelType})},onCancel:function(){return c(!1)}}),i?l.a.createElement(w,{info:i}):null)))},x=function(){return l.a.createElement("div",null,l.a.createElement("h1",null,"ChannelList"),l.a.createElement(m.a,{appId:d,userId:E,nickname:h},l.a.createElement("div",{className:"channel_list_wrap"},l.a.createElement(f.a,null))))},I=t(91),R=t(69),N=function(){return l.a.createElement("div",null,l.a.createElement("h1",null,"ChannelList"),l.a.createElement(m.a,{appId:d,userId:E,nickname:h},l.a.createElement("div",{className:"channel_list_wrap"},l.a.createElement(I.a,null,l.a.createElement(R.a,null)))))},B=t(97),T=t(62),U=t(63),D=U.a.div(y||(y=Object(T.a)(["\n  width: 100%;\n  display: flex;\n  justify-content: end;\n\n  button {\n    margin-left: 1%;\n    background-color: #fff;\n    border-radius: 10px;\n  }\n"]))),V=function(e){var n=e.setOnSearch,t=e.setOnEdit;return l.a.createElement(D,null,l.a.createElement("button",{type:"button",onClick:function(){return n(!0)}},"search"),l.a.createElement("button",{type:"button",onClick:function(){return t(!0)}},"Edit"))},A=function(){var e=Object(a.useState)(""),n=Object(p.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(!1),r=Object(p.a)(o,2),i=r[0],u=r[1],s=Object(a.useState)(!1),_=Object(p.a)(s,2),v=_[0],C=_[1];return l.a.createElement("div",null,l.a.createElement("h1",null,"Custom Group Channel"),l.a.createElement("div",{style:{display:"flex",height:"88vh"}},l.a.createElement(m.a,{appId:d,userId:E,nickname:h},l.a.createElement("div",{className:"channel_list_wrap",style:{flex:1}},l.a.createElement(f.a,{onChannelSelect:function(e){e&&c(e.url)},allowProfileEdit:!0,onProfileEditSuccess:function(e){return console.log("res: ",e)}})),l.a.createElement("div",{className:"channel_wrap",style:{flex:3}},l.a.createElement(b.a,{renderChannelHeader:function(){return l.a.createElement(V,{setOnSearch:u,setOnEdit:C})},channelUrl:t||"",showSearchIcon:!0,onSearchClick:function(){return u(!0)}})),i&&l.a.createElement("div",{className:"search_wrap"},l.a.createElement(B.a,{channelUrl:t||"",onResultClick:function(e){return console.log("res: ",e)},onCloseClick:function(){return u(!1)}})),v&&l.a.createElement("div",{className:"edit_wrap"},l.a.createElement(g.a,{channelUrl:t||"",onCloseClick:function(){return C(!1)}})))))},L=function(){var e=Object(a.useState)(!1),n=Object(p.a)(e,2),t=n[0],c=n[1];return l.a.createElement("div",null,l.a.createElement("h1",null,"CustomSettingChannel"),l.a.createElement(m.a,{appId:d,userId:E,nickname:h},l.a.createElement("div",{className:"setting_channel_wrap"},l.a.createElement("button",{type:"button",onClick:function(){return c(!0)}},"setting_channel"),t&&l.a.createElement("div",null,l.a.createElement(g.a,{channelUrl:"sendbird_group_channel_71230636_1df4a19deba53fd770774205b7b9db1673edb8ad",onCloseClick:function(){return c(!1)}})))))},z=t(67),F=function(){var e=Object(a.useState)(!1),n=Object(p.a)(e,2),t=n[0],c=n[1];return l.a.createElement("div",null,l.a.createElement("h1",null,"CustomEditProfile"),l.a.createElement(m.a,{appId:d,userId:E,nickname:h},l.a.createElement("div",{className:"setting_channel_wrap"},l.a.createElement("button",{type:"button",onClick:function(){return c(!0)}},"edits_profile"),t&&l.a.createElement("div",null,l.a.createElement(z.a,{channelUrl:"sendbird_group_channel_71230636_1df4a19deba53fd770774205b7b9db1673edb8ad",onCloseClick:function(){return c(!1)}})))))},M=t(95),P=t(96),W=function(){var e=Object(a.useState)(!1),n=Object(p.a)(e,2),t=n[0],c=n[1];return l.a.createElement("div",null,l.a.createElement("h1",null,"CustomOpenChannel"),l.a.createElement("div",{style:{display:"flex"}},l.a.createElement(m.a,{appId:d,userId:E,nickname:h},l.a.createElement("div",{className:"open_channel_wrap",style:{width:"80%"}},l.a.createElement(M.a,{channelUrl:"sendbird_open_channel_5421_28b188dfdb108b82d19df42785fa7f9d3179de71",renderHeader:function(){return l.a.createElement("div",null,l.a.createElement("button",{type:"button",onClick:function(){return c(!0)}},"Edit channel"))}})),t&&l.a.createElement("div",{className:"open_channel_edit_wrap"},l.a.createElement(P.a,{channelUrl:"sendbird_open_channel_5421_28b188dfdb108b82d19df42785fa7f9d3179de71",onCloseClick:function(){return c(!1)}})))))},H=t(39),q=t.n(H),G=function(){var e=Object(a.useState)(!1),n=Object(p.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(!1),r=Object(p.a)(o,2),i=r[0],u=r[1],s=Object(a.useState)(),m=Object(p.a)(s,2),b=m[0],f=m[1],g=Object(a.useState)("aacced-as10dc-03dce1b"),_=Object(p.a)(g,2),v=_[0],C=_[1],y={userId:E,accessToken:h},O={roomType:q.a.RoomType.LARGE_ROOM_FOR_AUDIO_ONLY},j=Object(a.useCallback)(function(){y&&O&&!t&&(q.a.init(d),c(!0),q.a.authenticate(y,function(e,n){n?console.log("error authenticating"):console.log("success authenticating")}).then(function(){q.a.connectWebSocket().then(function(){console.log("Succeeded to connect")}).catch(function(e){console.log("Failed to connect",e)})}).then(function(){q.a.createRoom(O).then(function(e){console.log("room created",e),f({moderator:e.createdBy,roomId:e.roomId,roomType:e.roomType,state:e.state,_ctx:e._ctx}),u(!0)}).catch(function(e){console.log("Failed to create room",e)}).finally(function(){console.log("Room processing complete")})}))},[y,O,t]),k=Object(a.useCallback)(function(){i?q.a.fetchRoomById(b.roomId).then(function(e){e.exit(),u(!1),c(!1),console.log("disconnect done \ud83d\udd25")}).catch(function(e){return console.log("Failed to disconnect",e)}):console.log("check the roomState")},[i,b]);return Object(a.useEffect)(function(){i&&(console.log("room",b),q.a.fetchRoomById(b.roomId).then(function(e){console.log("fetch room success",e),e.enter({audioEnabled:!0}).then(function(){console.log("User has successfully enter room")}).catch(function(e){console.log("Failed to enter room",e)})}).catch(function(e){console.log("fetch room error",e)}))},[i,b]),l.a.createElement("div",null,l.a.createElement("h1",null,"Custom Call"),l.a.createElement("div",{style:{margin:"0 auto",width:"100%",textAlign:"center",marginTop:"5%"}},l.a.createElement("div",null,l.a.createElement("div",null,l.a.createElement("span",{style:{marginRight:"1%"}},"connect channel :"),l.a.createElement("input",{style:{width:"25%",padding:"0.5%"},type:"text",value:v,placeholder:"connect channel that you know",onChange:function(e){return C(e.target.value)}})),l.a.createElement("div",{style:{marginTop:"1%"}},l.a.createElement("button",{type:"button",onClick:j,style:{marginRight:"1%"}},"connect call"),l.a.createElement("button",{type:"button",onClick:k},"disconnect call"))),l.a.createElement("div",{style:{marginTop:"1%"}},l.a.createElement("span",{role:"img","aria-label":i?"connect":"disconnect",style:{fontSize:"3rem"}},i?"\ud83c\udfa7":"\u274c"))))},J=function(e){var n=e.caller,t=e.setCaller,c=e.setLoginDone,o=e.SendBirdCall,r=e.isChat,i=Object(a.useCallback)(function(){o.init(d),o.authenticate({userId:n},function(e,n){n?console.log("error authenticating",n):console.log("success authenticating",e)}).then(function(){o.connectWebSocket().then(function(){console.log("connectWebSocket success"),c(!0)}).catch(function(e){return console.log("connectWebSocket error",e)})})},[n,o,c,r]),u=Object(a.useCallback)(function(e){o?(e.preventDefault(),i()):console.log("doesnt exist")},[o,i]);return l.a.createElement(K,{onSubmit:u},l.a.createElement("div",null,l.a.createElement("span",null,"name:"),l.a.createElement("input",{type:"text",value:n,placeholder:"write yout name",onChange:function(e){return t(e.target.value)}})),l.a.createElement("div",null,l.a.createElement("button",{type:"submit"},"login")))},K=U.a.form(O||(O=Object(T.a)(["\n  padding: 1%;\n  border: 1px solid black;\n  width: 60%;\n  max-width: 300px;\n  margin: 0 auto;\n\n  div {\n    text-align: center;\n  }\n\n  span {\n    margin-right: 5%;\n  }\n\n  button {\n    margin-top: 5%;\n    text-align: center;\n  }\n"]))),Q=function(){var e=Object(a.useState)(""),n=Object(p.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),r=Object(p.a)(o,2),i=r[0],u=r[1],s=Object(a.useState)(""),m=Object(p.a)(s,2),d=m[0],E=m[1],h=Object(a.useState)(!1),b=Object(p.a)(h,2),f=b[0],g=b[1],_=Object(a.useState)(!1),v=Object(p.a)(_,2),C=v[0],y=v[1],O=Object(a.useCallback)(function(){if(i){var e={userId:i,isVideoCall:!0,callOption:{localMediaView:document.getElementById("local_video_element_id"),remoteMediaView:document.getElementById("remote_video_element_id"),audioEnabled:!0,videoEnabled:!0}};q.a.dial(e,function(e,n){n?console.log("error occured in call",n):(console.log("success call process",e),y(!0),e.onEstablished=function(e){console.log("caller onEstablished",e)},e.onConnected=function(e){console.log("caller onConnected",e)},e.onEnded=function(e){console.log("caller onEnded",e)},e.onRemoteAudioSettingsChanged=function(e){console.log("caller onRemoteAudioSettingsChanged",e)},e.onRemoteVideoSettingsChanged=function(e){console.log("caller onRemoteVideoSettingsChanged",e)})})}},[i]),j=Object(a.useCallback)(function(){if(i){var e={userId:i,isVideoCall:!0,callOption:{localMediaView:document.getElementById("local_video_element_id"),remoteMediaView:document.getElementById("remote_video_element_id"),audioEnabled:!0,videoEnabled:!0}};q.a.dial(e,function(e,n){n?console.log("error occured in call",n):(e.end(),g(!1),y(!1),u(""))})}},[i]),k=Object(a.useCallback)(function(e){e.onEstablished=function(e){console.log("callee onEstablished",e)},e.onConnected=function(e){console.log("callee onConnected",e),E(e._caller.nickname)},e.onEnded=function(e){console.log("callee onEnded",e)},e.onRemoteAudioSettingsChanged=function(e){console.log("callee onRemoteAudioSettingsChanged",e)},e.onRemoteVideoSettingsChanged=function(e){console.log("callee onRemoteVideoSettingsChanged",e)};var n={callOption:{localMediaView:document.getElementById("local_video_element_id"),remoteMediaView:document.getElementById("remote_video_element_id"),audioEnabled:!0,videoEnabled:!0}};e.accept(n)},[]);return Object(a.useEffect)(function(){if(f)return q.a.addListener(i,{onRinging:function(e){console.log("@ onRinging call: ",e),k(e)}}),function(){q.a.removeListener(i,{onRinging:function(e){k(e)}})}},[f,i,k]),l.a.createElement("div",null,l.a.createElement("h1",null,"Custom direct call"),f?l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{style:{border:"1px solid black",padding:"1%",margin:"0 auto",textAlign:"center",width:"60%",maxWidth:"300px"}},l.a.createElement("div",null,l.a.createElement("input",{style:{width:"80%"},type:"text",value:i,placeholder:"\uc804\ud654\ud560 \uc0c1\ub300\ubc29 id\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694",onChange:function(e){return u(e.target.value)}})),l.a.createElement("div",{style:{marginTop:"5%"}},C?l.a.createElement("button",{type:"button",onClick:function(){return j()}},"disconnect call"):l.a.createElement("button",{type:"button",onClick:function(){return O()}},"call"))),l.a.createElement("div",{style:{display:"flex",justifyContent:"space-evenly",marginTop:"5%"}},l.a.createElement("div",{style:{width:"45%",height:"auto",display:"flex",flexDirection:"column"}},l.a.createElement("span",null,"\ubcf8\uc778: ",t),l.a.createElement("video",{id:"local_video_element_id",autoPlay:!0,style:{width:"100%"}})),l.a.createElement("div",{style:{width:"45%",height:"auto",display:"flex",flexDirection:"column"}},l.a.createElement("span",null,"\uc0c1\ub300\ubc29: ",i||d),l.a.createElement("video",{id:"remote_video_element_id",autoPlay:!0,style:{width:"100%"}})))):l.a.createElement(J,{caller:t,setCaller:c,setLoginDone:g,SendBirdCall:q.a}))},Y=U.a.ul(j||(j=Object(T.a)(["\n  padding-left: 0;\n  width: 100%;\n  display: flex;\n  list-style: none;\n  flex-wrap: wrap;\n  margin-top: 0;\n  margin-bottom: 0;\n\n  li {\n    margin-right: 1%;\n    margin-bottom: 1%;\n  }\n\n  a {\n    text-decoration: none;\n    color: #000;\n\n    :hover {\n      font-weight: bold;\n    }\n  }\n\n  @media screen and (max-width: 480px) {\n    height: 11vh;\n    overflow-y: scroll;\n\n    li {\n      width: 100%;\n      border-bottom: 1px solid #000;\n    }\n    a {\n      padding-left: 2%;\n      font-size: 1.4em;\n    }\n  }\n"]))),Z=function(){return l.a.createElement(Y,null,l.a.createElement("li",null,l.a.createElement(r.b,{to:"/"},"Home")),l.a.createElement("li",null,l.a.createElement(r.b,{to:"/quick_start"},"quick start")),l.a.createElement("li",null,l.a.createElement(r.b,{to:"/create_channel"},"create channel")),l.a.createElement("li",null,l.a.createElement(r.b,{to:"/channel_list"},"channel list")),l.a.createElement("li",null,l.a.createElement(r.b,{to:"/channel_list_2"},"channel list2")),l.a.createElement("li",null,l.a.createElement(r.b,{to:"/group_channel"},"group channel")),l.a.createElement("li",null,l.a.createElement(r.b,{to:"/open_channel"},"open channel")),l.a.createElement("li",null,l.a.createElement(r.b,{to:"/setting_channel"},"setting channel")),l.a.createElement("li",null,l.a.createElement(r.b,{to:"/edit_profile"},"edit profile")),l.a.createElement("li",null,l.a.createElement(r.b,{to:"/group_call"},"group call")),l.a.createElement("li",null,l.a.createElement(r.b,{to:"/direct_call"},"direct call")),l.a.createElement("li",null,l.a.createElement(r.b,{to:"/custom_chat_call"},"custom chat call")))},X=function(){var e=Object(a.useState)(""),n=Object(p.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(!1),r=Object(p.a)(o,2),i=r[0],u=r[1],s=Object(a.useState)(!1),E=Object(p.a)(s,2),h=E[0],g=E[1],_=Object(a.useState)(""),v=Object(p.a)(_,2),C=v[0],y=v[1],O=Object(a.useCallback)(function(e){e&&y(e.url)},[]);return Object(a.useEffect)(function(){i&&q.a&&(q.a.onRinging=function(e){var n=q.a.getInstance();n.setCall(e),n.render(),n.setRinging(),g(!0)})},[i]),Object(a.useEffect)(function(){h&&console.log("callDone")},[h]),l.a.createElement("div",null,l.a.createElement("h1",null,"Custom chat with call"),i?l.a.createElement("div",{style:{display:"flex",height:"88vh",width:"100%"}},l.a.createElement(m.a,{appId:d,userId:t,nickname:t},l.a.createElement("div",{className:"channel_list_wrap",style:{flex:1}},l.a.createElement(f.a,{onChannelSelect:O})),l.a.createElement("div",{className:"channel_wrap",style:{flex:3}},l.a.createElement(b.a,{channelUrl:C||""})))):l.a.createElement(J,{caller:t,setCaller:c,setLoginDone:u,SendBirdCall:q.a,isChat:!0}))};var $=function(){return l.a.createElement(r.a,null,l.a.createElement(Z,null),l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/",element:l.a.createElement(s,null)})),l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/quick_start",element:l.a.createElement(C,null)})),l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/create_channel",element:l.a.createElement(S,null)})),l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/channel_list",element:l.a.createElement(x,null)})),l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/channel_list_2",element:l.a.createElement(N,null)})),l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/group_channel",element:l.a.createElement(A,null)})),l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/open_channel",element:l.a.createElement(W,null)})),l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/setting_channel",element:l.a.createElement(L,null)})),l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/edit_profile",element:l.a.createElement(F,null)})),l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/group_call",element:l.a.createElement(G,null)})),l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/direct_call",element:l.a.createElement(Q,null)})),l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/custom_chat_call",element:l.a.createElement(X,null)})))},ee=document.getElementById("root");o.a.render(l.a.createElement($,null),ee)},98:function(e,n,t){e.exports=t(136)}},[[98,1,2]]]);
//# sourceMappingURL=main.489c30d9.chunk.js.map