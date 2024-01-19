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
      const response = await fetch(`/api/bitly`, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({ inputValue, bitlyKey: bitlyKeyInput })
      })
      const data = await response.json()
      if (data.message=="FORBIDDEN") {
        throw new Error('Failed to fetch data with the current bitly key')
      } else {
        setOutputValue(data.link)
        setInputValue('')
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  };

  const handleCopyToClipboard = async () => {
    copy(outputValue);
  };

  return (
    <div className="flex flex-col w-screen h-screen">
        <nav className="bg-[#020024] h-20 flex flex-row" >
            <div className="grid place-items-center flex-1 text-center" >
              <p className="text-3xl font-extrabold font-mono">
                Simple Bitly Link Shortener
              </p>
            </div>
        </nav>
        <main className="bg-[#010104] flex-1 grid place-items-center">
          <div className="absolute top-24 right-3 opacity-35" >
              <CustomModal></CustomModal>
          </div>
          <div className="flex flex-col w-4/6 ">      
            <div className="flex flex-row flex-wrap items-center justify-center">
              <Input 
                id="longUrlTextBox" 
                className="w-3/5 mr-5 min-w-72 mt-5"
                value={inputValue}
                onChange={handleInputChange}
              />
              <Button 
                color="primary" 
                onPress={handleButtonPress}
                className="min-w-10 mt-5"
              >Shorten</Button>
            </div>
            <div className="my-5 w-1/3 mx-auto min-w-52" >
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