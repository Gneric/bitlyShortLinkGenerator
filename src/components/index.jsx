'use client'

import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import copy from 'copy-to-clipboard';

export default function MainPage() {
  const [isButtonPressed, setButtonPressed] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('Waiting ...')

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonPress = async () => {
    try {
      setButtonPressed(false);
      console.log(JSON.stringify({ inputValue }))
      const response = await fetch(`/api/bitly`, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({ inputValue })
      })
      console.log(response)
      if (!response.ok) throw new Error('Failed to fetch data')
      const data = await response.json()
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
    <div className="w-screen h-screen grid place-items-center">
        <div className="flex flex-col w-2/6">
          <div className="my-5 text-center" >
            <p>Simple Link Shortener</p>
          </div>        
          <div className="flex flex-row items-center justify-around">
            <Input 
              id="longUrlTextBox" 
              className="w-4/5 mr-5"
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
    </div>
  )
}