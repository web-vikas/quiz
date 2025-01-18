import React from 'react';
import { Card, Typography } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;

export const Certificate = ({ name, quizName, score, date,schoolName }) => {
  return (
    <div className="w-full">
    <Card className="w-full max-w-[900px] aspect-[1.414/1] relative overflow-hidden bg-white">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-red-600/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tl from-orange-600/10 to-transparent rounded-full translate-x-1/2 translate-y-1/2" />
      
      {/* Border Frame */}
      <div className="absolute inset-4 border-2 border-red-800/20 rounded-lg" />
      
      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-between p-8 text-center">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-6">
          {/* Logo */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-700 p-[3px]">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <div className="text-xs font-semibold text-red-600 leading-tight">
                मिशन<br/>शिक्षण<br/>संवाद
              </div>
            </div>
          </div>
          
          {/* Title */}
          <div className="flex-1 px-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent py-2 leading-normal">
              राष्ट्रीय युवा दिवस
            </h1>
          </div>
          
          {/* Decorative Logo */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-600 to-red-600 p-[3px]">
            <div className="w-full h-full rounded-full bg-white" />
          </div>
        </div>

        {/* Certificate Title */}
        <div className="mb-12">
          <div className="inline-block relative">
            <div className="text-3xl font-bold text-green-800 border-2 border-green-800 rounded-lg px-12 py-2">
              CERTIFICATE
            </div>
            <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-green-800/30 rounded-lg" />
          </div>
        </div>

        {/* Certificate Content */}
        <div className="w-full max-w-2xl space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xl text-red-600 font-semibold">नाम -</span>
              <span className="flex-1 text-xl border-b-2 border-red-600/20 pb-1">{name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl text-red-600 font-semibold">विद्यालय -</span>
              <span className="flex-1 text-xl border-b-2 border-red-600/20 pb-1">{schoolName}</span>
            </div>
          </div>

          {/* Certificate Text */}
          <p className="text-gray-700 leading-relaxed px-8">
            आज का दिन आपके लिए एक महत्वपूर्ण दिन है, क्योंकि आपने <span className="text-red-600 font-semibold">{quizName}</span> प्रतियोगिता में अपनी प्रतिभा का प्रदर्शन किया है। आपकी प्रतिभा और क्षमता को पहचानने और विकसित करने के लिए हमें गर्व है। हमें विश्वास है कि आप सभी अपने लक्ष्यों को प्राप्त करेंगे और देश के लिए कुछ अद्भुत करेंगे। मिशन शिक्षण संवाद आपके उज्ज्वल भविष्य की कामना करता है।
          </p>
        </div>

        {/* Footer */}
        <div className="w-full flex items-end justify-between mt-8">
          <div className="flex flex-col items-start">
            <span className="text-gray-600 font-medium">दिनांक</span>
            <span className="text-gray-800">{moment().format('L')}</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="h-[2px] w-32 bg-gradient-to-r from-red-600 to-orange-600 mb-2" />
            <div className="text-xl font-semibold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              मिशन शिक्षण संवाद
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
  );
};
