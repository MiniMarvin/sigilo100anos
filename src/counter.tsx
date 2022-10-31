import React, { useEffect, useState } from 'react';

const toGmtn3 = (date: Date): Date => {
	const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
	const brltm = utc - 3 * (60000)
	return new Date(utc)
}

const getTimeObject = (reference: Date, goal: Date) => {
	const GMT_time = toGmtn3(goal)
	const now = toGmtn3(reference)
	const diff_seconds = (GMT_time.getTime() - now.getTime()) / 1000
	const object = {
		days: Math.floor(diff_seconds / 60 / 60 / 24),
		hours: Math.floor((diff_seconds / 60 / 60) % 24),
		minutes: Math.floor((diff_seconds / 60) % 60),
		seconds: Math.floor(diff_seconds % 60)
	}
	return object
}

const Counter: React.FunctionComponent<{
	date: Date
}> = ({ date }) => {
	const [tm, setTm] = useState<Date>(new Date())
	const [myInterval, setMyInterval] = useState<number | null>(null)

	useEffect(() => {
		if (!myInterval) {
			const interval = setInterval(() => {
				setTm(new Date())
			}, 1000)
			setMyInterval(interval)
		}

		return () => {
			if (myInterval) clearInterval(myInterval)
		}
	}, [])

	const currentTime = getTimeObject(tm, date)
	const d1 = Math.floor(currentTime.days / 10)
	const d2 = currentTime.days % 10
	const h1 = Math.floor(currentTime.hours / 10)
	const h2 = currentTime.hours % 10
	const m1 = Math.floor(currentTime.minutes / 10)
	const m2 = currentTime.minutes % 10
	const s1 = Math.floor(currentTime.seconds / 10)
	const s2 = currentTime.seconds % 10

	return (<div className="counter">
		<div className={"days"}>
			<div key={`d1-${d1}`} className="timeDisplay">{d1}</div>
			<div key={`d2-${d2}`} className="timeDisplay">{d2}</div>
			<div className={"text"}>dias</div>
		</div>
		<div className={"hours"}>
			<div key={`h1-${h1}`} className="timeDisplay">{h1}</div>
			<div key={`h2-${h2}`} className="timeDisplay">{h2}</div>
			<div className={"text"}>:</div>
			<div key={`m1-${m1}`} className="timeDisplay">{m1}</div>
			<div key={`m2-${m2}`} className="timeDisplay">{m2}</div>
			<div className={"text"}>:</div>
			<div key={`s1-${s1}`} className="timeDisplay">{s1}</div>
			<div key={`s2-${s2}`} className="timeDisplay">{s2}</div>
		</div>

	</div>)

}

export default Counter