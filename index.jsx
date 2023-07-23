function App() {
    const [breakTime, setBreakTime]= React.useState(5*60)
    const [sessionTime, setSessionTime]= React.useState(25*60)
    const [totalTime, setTotalTime]= React.useState(sessionTime)
    
    const [isPlaying, setIsPlaying]= React.useState(false)
    const [isSession, setIsSession]= React.useState(true)


    function onBreakInc() {
        if (isPlaying) return
        setBreakTime(prevTime=> timing(prevTime)+1>59? 0*60: prevTime+60)
    }
    function onBreakDec() {
        if (isPlaying) return
        setBreakTime(prevTime=> timing(prevTime)-1<=0? 59*60: prevTime-60)
    }

    function onSessionInc() {
        if (isPlaying) return
        setSessionTime(prevTime=> timing(prevTime)+1>60? 0*60: prevTime+60)
        setTotalTime(prevTime=> timing(prevTime)+1>60? 0*60: prevTime+60)
    }
    function onSessionDec() {
        if (isPlaying) return
        setSessionTime(prevTime=> timing(prevTime)-1<=0? 59*60: prevTime-60)
        setTotalTime(prevTime=> timing(prevTime)-1<=0? 59*60: prevTime-60)
    }


    function timing(num) {
        return Math.floor(num/60) 
    }

    React.useEffect(()=>{
        let idInterval
        if (isPlaying) {
            idInterval = setInterval(()=> {
                if (sessionTime===0&&breakTime===0) return
                if (sessionTime===0) return

                setTotalTime(prev=> {
                    if (prev-1===0) {
                        setIsSession(p=>!p)
                        return isSession ? setTotalTime(breakTime) : setTotalTime(sessionTime)
                    } else {
                        return prev-1
                    }
                })
            }, 1000)
        }
        return () => {
            clearInterval(idInterval)
        }
        
    }, [isPlaying])


	return (
		<div className="container">
            <div className="wrapper-clock">
                <div className="time-setters">
                    <div className="break">
                        <div className="time-length" id="break-label">Break length</div>
                        <div className="time-setters">
                            <div className="time-up" id="break-increment" onClick={()=>onBreakInc()}><img className="time-icon" src="/assets/up-arrow.svg" alt="up" /></div>
                            <p id="break-length">{timing(breakTime)}</p>
                            <div className="time-down" id="break-decrement" onClick={()=>onBreakDec()}><img className="transform-180deg time-icon" src="/assets/up-arrow.svg" alt="down" /></div>
                        </div>
                    </div>
                    <div className="work">
                        <div className="time-length" id="session-label">Session length</div>
                        <div className="time-setters">
                            <div className="time-up" id="session-increment" onClick={()=>onSessionInc()}><img className="time-icon" src="/assets/up-arrow.svg" alt="up" /></div>
                            <p id="session-length">{timing(sessionTime)}</p>
                            <div className="time-down" id="session-decrement" onClick={()=>onSessionDec()}><img className="transform-180deg time-icon" src="/assets/up-arrow.svg" alt="down" /></div>
                        </div>
                    </div>
                </div>
                <div className="clock">
                    <p id="timer-label">Session</p>
                    <span id="time-left">{timing(totalTime)<10?'0'+timing(totalTime):timing(totalTime)}:{totalTime%60<10?'0'+totalTime%60:totalTime%60}</span>
                </div>
                <div className="buttons">
                    <button className="play" id="start_stop" onClick={()=>setIsPlaying(p=>!p)} ><img src="/assets/play.png" alt="play" /></button>
                    <button className="reset" id="reset" onClick={()=> {
                        setBreakTime(5*60)
                        setSessionTime(25*60)
                        setTotalTime(25*60)
                        setIsPlaying(false)
                    }}><img src="/assets/reset.png" alt="stop" /></button>
                </div>
            </div>
		</div>
	);
}



ReactDOM.render(<App />, document.getElementById('root'));
