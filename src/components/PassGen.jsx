import React, { useState, useCallback, useEffect,useRef } from 'react'

const PassGen = () => {

    const [length, setLength] = useState(8)
    const [allowChr, setAllowChar] = useState(false)
    const [allowNumber, setallowNumber] = useState(false)
    const [password, setPassword] = useState("")

    const passwordGenerator =  useCallback(() => {
        let pass = ''
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        if(allowNumber) str += '0123456789'
        if(allowChr) str += '~!@#$%^&*()_-+=[]{}'

        for (let i = 1; i <= length; i++) {
            let char  = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)
        }

        setPassword(pass)
    },[length, allowChr, allowNumber, setPassword])

    useEffect( () => {
        passwordGenerator();
    }, [length, allowChr, allowNumber, passwordGenerator])

    //useRef hook
    const passwordRef = useRef(null)
    const copyPastPasswordToclipboard = useCallback(() => {
        passwordRef.current?.select()
        window.navigator.clipboard.writeText(password)
    },[password])
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='bg-gray-800 p-4 rounded-lg w-full max-w-2xl'>
                <div className='text-center mb-4'>
                    <h1 className='text-orange-500 bg-gray-900 px-4 py-3 rounded-xl inline-block text-center select-none'>Password Generator</h1>
                </div>
                <div className='flex flex-col gap-3 '>
                    <div className='flex rounded-lg overflow-hidden'>
                        <input type="text"
                            value={password}
                            readOnly
                            className='outline-none text-lg font-semibold px-2 py-3 w-full bg-gray-900 cursor-default select-none text-orange-700'
                            placeholder='Password Generator'
                            ref={passwordRef}
                        />
                        <button 
                        onClick={copyPastPasswordToclipboard}
                        className='bg-orange-700 px-5 py-3 text-white font-bold capitalize text-sm shrink-0 select-none'>copy Password</button>
                    </div>
                    {/* input fields */}
                    <div className='flex justify-around items-center gap-2'>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <input 
                            type="range"
                             className='cursor-e-resize' 
                             min={8} 
                             max={20}
                             value={length}
                             onChange={(e) => {setLength(e.target.value)}}
                            />
                            <label className='text-orange-600 capitalize text-md bg-gray-900 px-4 py-1 rounded-lg select-none'>Length : {length}</label>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-2'>
                           <input 
                            type="checkbox"
                            defaultChecked={allowChr}
                            id="allwoChar" 
                            onChange={() => {setAllowChar((prev) => !prev)}}
                            className='cursor-pointer'
                            />
                            <label htmlFor='allwoChar' className='text-orange-600 capitalize text-md bg-gray-900 px-4 py-1 rounded-lg cursor-pointer select-none hover:bg-orange-600 hover:text-white transition-all'>allow characters</label>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <input type="checkbox"
                             id="allowNum" 
                             defaultChecked={allowNumber}
                             onChange={() => {setallowNumber( (prev) => !prev)}}
                             />
                            <label htmlFor='allowNum' className='text-orange-600 capitalize text-md bg-gray-900 px-4 py-1 rounded-lg cursor-pointer select-none hover:bg-orange-600 hover:text-white transition-all' >allow numbers </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PassGen