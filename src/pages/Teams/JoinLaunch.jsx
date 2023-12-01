import React, { useEffect, useRef, useCallback, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const APP_ID = "341516a4f8314ee2a22be250c4276197";
const TOKEN = "007eJxTYOjqqhM9aBn3NXjn0UD9OI/iOV3WUTvLvr+a1LT56akU9nkKDMYmhqaGZokmaRbGhiapqUaJRkZJqUamBskmRuZmhpbmO3MyUxsCGRnqPy9gYWSAQBBfkCG4JDE5278stSgtJ788tDi1iIEBAE7lJYk=";
const CHANNEL = "StackOverflowUser";

let client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

let localTracks = [];
let remoteUsers = {};



const VideoStream = () => {
    const videoRef = useRef(null);
    const [isChatStarted, setIsChatStarted] = useState(false);

    const joinAndDisplayLocalStream = useCallback(async () => {
        
        if (client.connectionState !== 'DISCONNECTED') {
            console.log('Client is already in connecting/connected state');
            return;
        }

        client.on('user-published', handleUserJoined);
        client.on('user-left', handleUserLeft);

        let UID = await client.join(APP_ID, CHANNEL, TOKEN, null); // eslint-disable-line no-unused-vars
        localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

        localTracks[1].play(videoRef.current);
        await client.publish([localTracks[0], localTracks[1]]);
        console.log("joined")
    }, []);

    useEffect(() => {
        if (isChatStarted) {
            joinAndDisplayLocalStream();
        }
    }, [isChatStarted, joinAndDisplayLocalStream]);

    const handleUserJoined = useCallback(async (user, mediaType) => {
        remoteUsers[user.uid] = user;
        await client.subscribe(user, mediaType);

        if (mediaType === 'video') {
            if (videoRef.current) {
                user.videoTrack.play(videoRef.current);
            } else {
                // Wait for the videoRef to be available
                const interval = setInterval(() => {
                    if (videoRef.current) {
                        clearInterval(interval);
                        user.videoTrack.play(videoRef.current);
                    }
                }, 100);
            }
        }

        if (mediaType === 'audio') {
            user.audioTrack.play();
        }
    }, []);

    const handleUserLeft = useCallback(async (user) => {
        delete remoteUsers[user.uid];
    }, []);

    const startChat = () => {
        setIsChatStarted(true);
    };

    const endChat = async () => {
        setIsChatStarted(false);
        for(let i = 0; localTracks.length > i; i++){
            localTracks[i].stop();
            localTracks[i].close();
        }
        await client.leave();
    };

    const toggleMic = async (e) => {
        if (localTracks[0].muted){
            await localTracks[0].setMuted(false);
            e.target.innerText = 'Mic on';
            e.target.style.backgroundColor = 'black';

        }else{
            await localTracks[0].setMuted(true);
            e.target.innerText = 'Mic off';
            e.target.style.backgroundColor = '#EE4B2B';

        }
    };

    const toggleCamera = async (e) => {
        if(localTracks[1].muted){
            await localTracks[1].setMuted(false);
            e.target.innerText = 'Camera on';
            e.target.style.backgroundColor = 'black';
        }else{
            await localTracks[1].setMuted(true);
            e.target.innerText = 'Camera off';
            e.target.style.backgroundColor = '#EE4B2B';
        }
    };

    return (
        <div>
        
            {!isChatStarted ? (  
                
                
                <button id="join-btn" onClick={startChat}>Launch VideoChat </button>
            ) : (
                <div className="videopanel">
                <div id="video-streams">
                <div className="videoLaunch-container">
                <div className="videoLaunch-player" ref={videoRef}></div>
            
                

                <div id="stream-controls">
                    <button className="stream-controls-btn" onClick={endChat}>Leave</button>
                    <button className="stream-controls-btn" onClick={toggleMic}>Mic on</button>
                    <button className="stream-controls-btn" onClick={toggleCamera}>Camera on</button>
                </div>
                </div>
                </div>
                </div>
            )}
        </div>
    );
};

export default VideoStream;
