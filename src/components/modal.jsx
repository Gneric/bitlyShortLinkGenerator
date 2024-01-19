import React from "react";
import { Input } from "@nextui-org/react";
import { useContext } from 'react';
import { ModalContext } from '@/context/modalContext';
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";

export default function App() {
    const {bitlyKeyInput, setbitlyKeyInput} = useContext(ModalContext);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const handleInputChange = (e) => {
        setbitlyKeyInput(e.target.value);
    };

    return (
        <>
        <Button onPress={onOpen} >
            <img src="/settingsButton.svg" 
                className="w-full h-full p-2"
            />
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-slate-800" >
            <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">Insert your Bitly Key</ModalHeader>
                    <ModalBody className="pb-8">
                        <p className="pb-5" >
                            Get your own Bitly Key <a href="http://google.com" target="_blank" className="underline font-bold">here</a>
                            , for free you can use it 12 times in a month
                        </p>
                        <Input 
                            id="bitlyKeyInput" 
                            className="min-w-48 mr-5 "
                            value={bitlyKeyInput}
                            onChange={handleInputChange}
                        />
                    </ModalBody>
                </>
            )}
            </ModalContent>
        </Modal>
        </>
    );
}
