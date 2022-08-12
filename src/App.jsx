import React, { useState, useRef, useEffect } from 'react'
import { challenges, random, allowedKeys } from './utils/Helper'
import ItemList from './components/ItemList'
import './App.css'

let interval = null
const newChallenge = random(challenges)

const App = () => {
	const inputRef = useRef(null)
  const outputRef = useRef(null)
	const [ duration, setDuration ] = useState(0)
	const [ started, setStarted ] = useState(false)
	const [ ended, setEnded ] = useState(false)
	const [ index, setIndex ] = useState(0)
	const [ correctIndex, setCorrectIndex ] = useState(0)
	const [ errorIndex, setErrorIndex ] = useState(0)
  const [ challenge, setChallenge ] = useState({})
  const [ input, setInput ] = useState('')
  const [ text, setText ] = useState('')
	const [ cpm, setCpm ] = useState(0)
	const [ wpm, setWpm ] = useState(0)
	const [ accuracy, setAccuracy ] = useState(0)
	const [ isError, setIsError ] = useState(false)
  const [ lastScore, setLastScore] = useState('0')
  
  const [ targetWords, setTargetWords ] = useState(newChallenge.text.split(' '));
  const [ currentTarget, setCurrentTarget ] = useState(targetWords[0]);
  const [ userInput, setUserInput ] = useState("");
  const [ cwc, setCwc ] = useState(0)
  const [ totalPoints, setTotalPoints ] = useState(targetWords.length)
  const [ completedWords, setCompletedWords] = useState([]);
  const [ time, setTime] = useState(duration)

  useEffect(() => {
    console.log(userInput);
    setChallenge(newChallenge)
    if (!text) {
      setText(newChallenge.text)
      setInput(newChallenge.text)
    }
    // words = text.split(' ')
    console.log(targetWords);
    console.log(currentTarget);
    console.log(completedWords)
	}, [text])

	const handleEnd = () => {
		setEnded(true)
		setStarted(false)
		clearInterval(interval)
	}

	const setTimer = () => {
		const now = Date.now()
		const seconds = now + duration * 1000
		interval = setInterval(() => {
			const secondLeft = Math.round((seconds - Date.now()) / 1000)
			setDuration(secondLeft)
			if (secondLeft === 0) {
				handleEnd()
			}
		}, 1000)
	}

  const handleStart = () => {
    if (duration <= 0) {
      return
    }
		setStarted(true)
    setEnded(false)
    if (!input) {
      setText(challenge.text)
    }

    // if (!targetWords) {
    //   setTargetWords(challenge.text)
    // }
    setTotalPoints(targetWords.length)
		inputRef.current.focus()
		setTimer()
	}

	const handleKeyDown = e => {
		e.preventDefault()
    const { key } = e
    setUserInput((userInput.toString().replace('Shift', '') || userInput.toString().replace('CapsLock', '')) + key.toString().replace('Shift', ''))
    console.log(key);
    const challengeText = text

    if (key === challengeText.charAt(index)) {
      if (key === " " || key === "Enter") {
        //save user input word along with whether it is correct or not
        let correct = currentTarget === userInput.trim();
        if (correct) {
          setCwc(cwc + 1)
        }
        setCompletedWords([
          ...completedWords,
          { word: userInput.trim(), correct },
        ]);
  
        //update current target word and target words list
        let newTargetWord = targetWords[1];
        setTargetWords([...targetWords.slice(1)]);
        setCurrentTarget(newTargetWord)
  
        //clear user input
        setUserInput("");
  
        //prevent space or key from going into user input
        // e.preventDefault();
      }
    }

		if (key === challengeText.charAt(index)) {
			setIndex(index + 1)
			const currentChar = challengeText.substring(index + 1, index + challengeText.length)
			setInput(currentChar)
			setCorrectIndex(correctIndex + 1)
			setIsError(false)
			outputRef.current.innerHTML += key
		} else {
			if (allowedKeys.includes(key)) {
				setErrorIndex(errorIndex + 1)
				setIsError(true)
				outputRef.current.innerHTML += `<span class="text-danger">${key}</span>`
			}
		}

		const timeRemains = ((time - duration) / time).toFixed(2)
		const _accuracy = Math.floor((index - errorIndex) / index * 100)
		const _wpm = Math.round(correctIndex / 5 / timeRemains)

		if (index > 5) {
			setAccuracy(_accuracy)
			setCpm(correctIndex)
			setWpm(_wpm)
		}

		if (index + 1 === challengeText.length || errorIndex > 50) {
			handleEnd()
		}
	}

	useEffect(() => {
    if (ended) {
      localStorage.setItem('cwc', `${cwc}/${totalPoints}`)
    }
  }, [ended, cwc])
  
	useEffect(() => {
		const storedScore = localStorage.getItem('cwc')
		if (storedScore) setLastScore(storedScore)
  }, [])
  
  const ch_tim = (e) => {
    e.preventDefault()
    setDuration(60*e.target.value)
    setTime(60*e.target.value)
  }

  const cha_txt = (e) => {
    e.preventDefault()
    let input_value = e.target.value
    setInput(input_value)
    setText(input_value)
    setTargetWords(input_value.split(' '))
  }

	return (
		<div className="App">
			<div className="container-fluid pt-4">
				<div className="row">
					{/* Left */}
					<div className="col-sm-6 col-md-2 order-md-0 px-5">
						<ul className="list-unstyled text-center small">
							<ItemList
								name="WPM"
								data={wpm}
								style={
									wpm > 0 && wpm < 20 ? (
										{ color: 'white', backgroundColor: '#eb4841' }
									) : wpm >= 20 && wpm < 40 ? (
										{ color: 'white', backgroundColor: '#f48847' }
									) : wpm >= 40 && wpm < 60 ? (
										{ color: 'white', backgroundColor: '#ffc84a' }
									) : wpm >= 60 && wpm < 80 ? (
										{ color: 'white', backgroundColor: '#a6c34c' }
									) : wpm >= 80 ? (
										{ color: 'white', backgroundColor: '#4ec04e' }
									) : (
										{}
									)
								}
							/>
							<ItemList name="CPM" data={cpm} />
							<ItemList name="Points" data={cwc} />
							<ItemList name="Total Points" data={totalPoints} />
							<ItemList name="Last Score" data={lastScore} size="medium" />
						</ul>
          </div>
          <div className="col-sm-6 col-md-2 order-md-2 px-5">
						<div className="list-unstyled text-center small">
							<ItemList name="Seconds" data={duration} />
							<ItemList name="Errors" data={errorIndex} />
              <ItemList name="Acuracy" data={accuracy} symble="%" />

              <div>
                <label>Choose Duration in Minutes:
                  <input className='col-md-4' list="time" name="challenge_time" onChange={ch_tim} />
                </label>
                <datalist id="time">
                  <option value="1"/>
                  <option value="2"/>
                  <option value="5"/>
                </datalist>
              </div>
              
              <div className="control my-5">
									{ended ? (
										<button
											className="btn btn-outline-danger btn-circle"
											onClick={() => window.location.reload()}
										>
											Reload
										</button>
									) : started ? (
										<button className="btn btn-circle btn-outline-success" disabled>
											Hurry
										</button>
									) : (
										<button className="btn btn-circle btn-outline-success" onClick={handleStart}>
											GO!
										</button>
									)}
									<span className="btn-circle-animation" />
								</div>
						</div>
					</div>
					{/* Body */}
					<div className="col-sm-12 col-md-8 order-md-1">
						<div className="container border px-5 rounded">
							<div className="text-center mt-4 header">
								<h1>How Fast Can You Type?</h1>
								<p className="lead">
									Start the Typing speed challenge and find out how fast you can type for real!
								</p>

                {started ? (<div className="alert alert-primary" role="alert">{text}</div>) : <textarea className="col-md-12 rounded lead" name="story" rows="5" cols="60" onChange={cha_txt} defaultValue="Paste your challenge text here..."></textarea>}
							</div>

							{ended ? (
								<div className="bg-dark text-light p-4 mt-5 lead rounded">
									<span>"{text}"</span>
								</div>
							) : started ? (
								<div
									className={`text-light mono quotes${started ? ' active' : ''}${isError ? ' is-error' : ''}`}
									tabIndex="0"
									onKeyDown={handleKeyDown}
									ref={inputRef}
								>
									{input}
								</div>
							) : (
								<div className="mono quotes text-muted" tabIndex="-1" ref={inputRef}>
									{input}
								</div>
							)}

							<div className="p-4 mt-4 bg-dark text-light rounded lead" ref={outputRef} />

							<h6 className="mt-5">Hints!</h6>
							<ul>
								<li>
									Word Per Minute (WPM) is measured by calculating how many words you can type in 1
									minute.
								</li>
								<li>Character Per Minute (CPM) calculates how many characters are typed per minute.</li>
							</ul>
							<hr className="my-4" />
							<div className="mb-5">
                <h6 className="py-2">Average Typing Speeds</h6>
                <div className="">
                  <div className="d-flex text-white meter-gauge rounded">
                    <span className="col" style={{ background: '#eb4841' }}>
                      0 - 20 Slow
                    </span>
                    <span className="col" style={{ background: '#f48847' }}>
                      20 - 40 Average
                    </span>
                    <span className="col" style={{ background: '#ffc84a' }}>
                      40 - 60 Fast
                    </span>
                    <span className="col" style={{ background: '#a6c34c' }}>
                      60 - 80 Professional
                    </span>
                    <span className="col" style={{ background: '#4ec04e' }}>
                      80 - 100+ Master
                    </span>
                  </div>
                </div>
							</div>
						</div>
					</div>
				</div>

				<footer className="small text-muted pt-5 pb-2 footer">
					<div className="footer-info text-center">
						<div className="copyright">
							© 2022. Typing Test Assignment by &nbsp;
							<a href="https://github.com/mcjovial" title="Emmanuel Elias">
								McJovial.
							</a>
						</div>
					</div>
				</footer>
			</div>
		</div>
	)
}

export default App
