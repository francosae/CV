"use client";
import { cn } from '../../lib/utils';
import Link from 'next/link';
import { socket } from '@/socket';
import { useEffect, useState } from 'react';

export default function ActionPage ({ className, title, description, header, icon, onOpen }) {
    const [stepCount, setStepCount] = useState(0);
    const [image, setImage] = useState(null);

    useEffect(() => {
      socket.on('output', function(msg, cb) {
        if (!msg.failed) {
          setStepCount(stepCount+1);
        }
        if (cb)
            cb();
      });

      socket.on('receive_image', function(data) {
        console.log("image received", data)
        setImage('data:image/png;base64,' + data.image_data);
      });
    }, [])

    return (
      <div>

        <h2>Live Preview</h2>
        <img style={{display: "block"}} src={image} />
      </div>
    );
};
