'use client';

import { useState, useEffect } from 'react';
import RegistrationForm from './components/RegistrationForm';
import SpinWheel from './components/SpinWheel';
import ResultModal from './components/ResultModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReward, setCurrentReward] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    // Check if user has already spun
    if (typeof window !== 'undefined') {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        const hasUserSpun = localStorage.getItem(`hasSpun_${user.phone}`);
        if (hasUserSpun === 'true') {
          setHasSpun(true);
        }
      }
    }
  }, []);

  const handleRegistration = (data: { name: string; phone: string; email: string }) => {
    setUserData(data);
    setIsRegistered(true);
  };

  const handleSpinComplete = (reward: string) => {
    setCurrentReward(reward);
    setIsModalOpen(true);
    
    // Mark as spun
    if (typeof window !== 'undefined') {
      localStorage.setItem(`hasSpun_${userData.phone}`, 'true');
      
      // Save spin result
      const spinResult = {
        ...userData,
        reward,
        timestamp: new Date().toISOString(),
      };
      
      // Save to spin history
      const history = localStorage.getItem('spinHistory');
      const historyList = history ? JSON.parse(history) : [];
      historyList.push(spinResult);
      localStorage.setItem('spinHistory', JSON.stringify(historyList));
    }
    
    setHasSpun(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {!isRegistered ? (
          <RegistrationForm onSubmit={handleRegistration} hasSpun={hasSpun} />
        ) : (
          <>
            {!hasSpun && (
              <div className="mb-6 text-center">
                <div className="inline-block bg-white rounded-2xl shadow-lg px-6 py-4">
                  <p className="text-gray-700 font-semibold">
                    Xin chào, <span className="text-black">{userData.name}</span>! 👋
                  </p>
                  <p className="text-gray-500 text-sm">
                    {userData.phone} • {userData.email}
                  </p>
                </div>
              </div>
            )}
            
            {hasSpun ? (
              <div className="max-w-md mx-auto text-center p-8 bg-white rounded-3xl shadow-xl">
                <div className="mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🎉</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Bạn đã quay rồi!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Cảm ơn bạn đã tham gia chương trình.
                  </p>
                  {currentReward && (
                    <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl p-6 mb-4">
                      <p className="text-white text-sm mb-2">Phần thưởng của bạn</p>
                      <p className="text-white text-4xl font-bold">{currentReward}</p>
                    </div>
                  )}
                  <p className="text-gray-500 text-sm">
                    Mỗi số điện thoại chỉ được quay 1 lần duy nhất.
                  </p>
                </div>
              </div>
            ) : (
              <SpinWheel onSpinComplete={handleSpinComplete} />
            )}
            
            <ResultModal 
              isOpen={isModalOpen}
              reward={currentReward}
              onClose={handleCloseModal}
            />
          </>
        )}
      </div>
    </div>
  );
}
