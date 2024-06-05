'use client';
import { socket } from '@/socket';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, CardBody, Progress, Avatar, uRating } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { IconCheck, IconX } from '@tabler/icons-react';
import { AiOutlineOrderedList, AiOutlineEye } from 'react-icons/ai';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';

// const prompts = [
//   {
//     type: 'url',
//     value: 'https://huggingface.co/docs',
//   },
//   {
//     type: 'command',
//     value: 'Start the quicktour of PEFT',
//   },
//   {
//     type: 'command',
//     value: 'Do another tour',
//   },
// ];
// const prompts = [
//   {
//     type: 'url',
//     value: 'https://uber.com',
//   },
//   {
//     type: 'command',
//     value: 'login to your account, if not already',
//   },
//   {
//     type: 'command',
//     value: 'order a ride to 415 Mission St, San Francisco',
//   },
// ];
const prompts = [
  {
    type: 'url',
    value: 'https://news.ycombinator.com/',
  },
  {
    type: 'command',
    value: 'Read the headlines of the first 5 articles',
  },
  {
    type: 'command',
    value: 'navigate to the most interesting article and stop',
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
  const searchParams = useSearchParams();
  const [isDone, setIsDone] = useState(false);

  const urlTitle = searchParams.get('title');

  const handleStartAction = () => {
    socket.emit('ai_event', {
      prompts,
    });
  };

  console.log(completedCount);

  useEffect(() => {
    socket.on('output', function (data) {
      console.log('completed step');
      setCompletedCount((prev) => prev + 1);
      if (data.completed) {
        setIsDone(true);
      }
    });
    socket.on('receive_image', function (data) {
      // console.log('image received', data);
      // setCompletedCount(completedCount + 1);

      if (data) {
        setImage('data:image/png;base64,' + data.image_data);
      }
    });
  }, []);

  console.log(image);

  return (
    <>
      <div className="min-h-full">
        <header className="bg-gradient-to-r from-blue-500 to-purple-500 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Action Genie
              </h1>
            </div>
            <Link href={'/home'} size="sm" color="white" auto>
              Search Actions
            </Link>
          </div>
        </header>

        <main>
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
              <CardBody>
                <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <AiOutlineOrderedList className="text-blue-500" />
                  <span>Workflow Steps:</span>
                </h2>
                <div className="flex flex-col space-between">
                  <Button className="m-3" onClick={handleStartAction}>
                    Start Action
                  </Button>
                  <WorkflowStep
                    title={prompts[0].value}
                    isLoading={false}
                    isCompleted={completedCount > 0}
                  />
                  <WorkflowStep
                    title={prompts[1].value}
                    isLoading={completedCount == 1}
                    isCompleted={completedCount > 1}
                  />
                  <WorkflowStep
                    title={prompts[2].value}
                    isLoading={completedCount == 2}
                    isCompleted={completedCount > 2}
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
              <CardBody>
                <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <AiOutlineEye className="text-blue-500" />
                  <span>Live Preview</span>
                </h2>
                <div className="rounded-lg shadow-md overflow-hidden">
                  {!image ? <WorkflowPreview /> : <img src={image} />}
                </div>
              </CardBody>

              <CardBody>
                {/* <Progress className="my-4" size="sm" value={75} /> */}
              </CardBody>
            </Card>
          </div>
        </main>

        {isDone && <h2 className="text-lime-700 text-center">DONE!</h2>}
      </div>
    </>
  );
}

const WorkflowStep = ({ title, isLoading, isCompleted }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-4">
      {/* <Skeleton className="h-4 w-4 rounded-full" show={false}>
        {false && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center h-4 w-4 bg-green-500 text-white rounded-full">
            <IconCheck size={16} />
          </motion.div>
        )}
      </Skeleton> */}
      <p className={`text-sm ${false ? 'text-green-500' : 'text-gray-500'}`}>
        {title}
        {/* <text className="text-gray-400">{isLoading && ' (RUNNING)'}</text>
        <text className="text-green-400">{isCompleted && ' (COMPLETED)'}</text> */}
        <text className="text-gray-400">{false && ' (RUNNING)'}</text>
        <text className="text-green-400">{false && ' (COMPLETED)'}</text>
      </p>
    </motion.div>
  );
};

const WorkflowPreview = () => {
  return (
    <Card className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
      <Skeleton className="h-4 w-full mb-2" show={true} />
      <Skeleton className="h-4 w-2/3" show={true} />
      <Skeleton className="h-4 w-1/2 mt-2" show={true} />
    </Card>
  );
};

const StarRating = ({ value }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < value ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
    </div>
  );
};

const ActionWorkflow = () => {
  return (
    <div className="flex space-x-8">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold mb-4">Workflow Steps</h2>
        <Card className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
          <WorkflowStep
            title="Navigate to https://huggingface.co/docs"
            isLoading={false}
            isCompleted={true}
          />
          <WorkflowStep
            title="Command: Start the quicktour of PEFT"
            isLoading={false}
            isCompleted={true}
          />
          <WorkflowStep
            title="Command: Do another tour"
            isLoading={true}
            isCompleted={false}
          />
        </Card>
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
        <div className="rounded-lg shadow-md overflow-hidden">
          <WorkflowPreview />
        </div>
      </div>
    </div>
  );
};
