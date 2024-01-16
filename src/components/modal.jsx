import React from "react";
import { Input } from "@nextui-org/react";
import { useContext } from 'react';
import { ModalContext } from '@/context/modalContext';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function App() {
    const {bitlyKeyInput, setbitlyKeyInput} = useContext(ModalContext);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const handleInputChange = (e) => {
        setbitlyKeyInput(e.target.value);
    };

    return (
        <>
        <Button onPress={onOpen}>Settings</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="bg-slate-800" >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Insert your Bitly Key</ModalHeader>
                <ModalBody className="pb-8">
                    <Input 
                        id="bitlyKeyInput" 
                        className="min-w-48 w-4/5 mr-5"
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
