'use client';

import { useState } from 'react';
import SpinWheel from './components/SpinWheel';
import ResultModal from './components/ResultModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReward, setCurrentReward] = useState('');

  const handleSpinComplete = (reward: string) => {
    setCurrentReward(reward);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <SpinWheel onSpinComplete={handleSpinComplete} />
        <ResultModal 
          isOpen={isModalOpen}
          reward={currentReward}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
