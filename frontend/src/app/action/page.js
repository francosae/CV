'use client';
import { socket } from '@/socket';
import { Card, CardBody } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const prompts = [
  {
    type: 'url',
    value: 'https://huggingface.co/docs',
  },
  {
    type: 'command',
    value: 'Start the quicktour of PEFT',
  },
  {
    type: 'command',
    value: 'Do another tour',
  },
];

export default function ActionPage({
  className,
  title,
  description,
  header,
  icon,
  onOpen,
}) {
  const [completedCount, setCompletedCount] = useState(0);
  const [image, setImage] = useState(null);

  useEffect(() => {
    socket.emit('ai_event', {
      prompts,
    });

    socket.on('receive_image', function (data) {
      console.log('image received', data);
      setCompletedCount(completedCount + 1);

      if (data) {
        setImage('data:image/png;base64,' + data.image_data);
      }
    });
  }, []);

  return (
    <div className="flex flex-1 justify-center">
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>

      <div className="flex flex-1 flex-row justify-center">
        <Card shadow>
          <CardBody>
            {prompts.map((prompt, i) => (
              <div className="flex flex-row items-center justify-between">
                <div
                  key={i}
                  className="flex flex-1 flex-row items-center mt-4 bg-slate-100 p-6">
                  {/* circle with index in the middle */}
                  <div className="flex items-center justify-center w-12 h-12 bg-slate-200 rounded-full mr-4">
                    <div className="text-lg font-bold text-white">{i + 1}</div>
                  </div>
                  {prompt.type === 'url' ? (
                    <div className="flex flex-col items-center">
                      <div className="text-lg">Navigate to {prompt.value}</div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="text-lg">Command: {prompt.value}</div>
                    </div>
                  )}

                  {/* green completed check icon */}
                  <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full ml-4">
                    <div className="text-lg font-bold text-white">✓</div>
                  </div>
                </div>
              </div>
            ))}
          </CardBody>
        </Card>

        <div className="flex flex-col items-center justify-center h-200 w-200">
          <text h2>Live Preview</text>
          {image && (
            <img src={image} alt="Live Preview" width={400} height={400} />
          )}
        </div>
      </div>
    </div>
  );
}
