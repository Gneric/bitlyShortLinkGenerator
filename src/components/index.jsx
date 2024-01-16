'use client'

import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { useContext, useState } from 'react';
import { ModalContext } from '@/context/modalContext';
import CustomModal from '@/components/modal'
import copy from 'copy-to-clipboard';

export default function MainPage() {
  const [isButtonPressed, setButtonPressed] = useState(true);
  const {bitlyKeyInput, setbitlyKeyInput} = useContext(ModalContext);
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('Waiting ...')

  console.log('testingContext: ', bitlyKeyInput )

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonPress = async () => {
    try {
      console.log(JSON.stringify({ inputValue }))
      const response = await fetch(`/api/bitly`, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({ inputValue, bitlyKey: bitlyKeyInput })
      })
      const data = await response.json()
      if (data.message=="FORBIDDEN") throw new Error('Failed to fetch data with the current bitly key')
      setOutputValue(data.link)
      setInputValue('')
    } catch (error) {
      console.error('Error:', error.message)
    }
  };

  const handleCopyToClipboard = async () => {
    copy(outputValue);
  };

  return (
    <div className="flex flex-col w-screen h-screen">
        <nav className="bg-slate-900 h-20 flex flex-row" >
            <div className="grid place-items-center flex-1 my-5 text-center" >
              <p>Simple Link Shortener</p>
            </div>
            <div className="grid place-items-center px-5" >
              <CustomModal></CustomModal>
            </div>
        </nav>
        <main className="bg-slate-800 flex-1 grid place-items-center">
          <div className="flex flex-col w-4/6 ">      
            <div className="flex flex-row items-center justify-around">
              <Input 
                id="longUrlTextBox" 
                className="min-w-48 w-4/5 mr-5"
                value={inputValue}
                onChange={handleInputChange}
              />
              <Button color="primary" onPress={handleButtonPress}>Shorten</Button>
            </div>
            <div className="my-5 w-1/2 mx-auto" >
                <Card 
                  isDisabled={isButtonPressed} 
                  isPressable={!isButtonPressed} 
                  id="shortUrlTextCard" 
                  allowTextSelectionOnPress 
                  className="w-full" 
                  onPress={handleCopyToClipboard}
                >
                  <CardBody className="select-none">
                    <p className="text-center" >
                      { outputValue }
                    </p>
                  </CardBody>
                </Card>
            </div>
          </div>
        </main>
    </div>
  )
}