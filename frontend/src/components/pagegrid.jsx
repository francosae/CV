'use client';
import { cn } from '../lib/utils';
import React from 'react';
import { Grid } from '@/components/grid';
import { GridItem } from '@/components/gridItem';
import {
    IconBoxAlignRightFilled,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
    IconPhotoPlus,
    IconLanguage,
    IconTextWrap,
    IconCar,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    RadioGroup,
    Radio,
} from '@nextui-org/react';

export function PageGrid() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    console.log(isOpen);

    return (
        <>
            <Grid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
                {items.map((item, i) => (
                    <GridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        className={cn('[&>p:text-lg]', item.className)}
                        icon={item.icon}
                        onOpen={onOpen}
                    />
                ))}
            </Grid>
            <Modal
                isOpen={isOpen}
                placement={'bottom'}
                onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Modal Title
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit
                                    amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit
                                    amet hendrerit risus, sed porttitor quam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const SkeletonOne = () => {
    const variants = {
        initial: {
            x: 0,
        },
        animate: {
            x: 10,
            rotate: 5,
            transition: {
                duration: 0.2,
            },
        },
    };
    const variantsSecond = {
        initial: {
            x: 0,
        },
        animate: {
            x: -10,
            rotate: -5,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2">
            <motion.div
                variants={variants}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black">
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
                <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-black">
                <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
            </motion.div>
            <motion.div
                variants={variants}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black">
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
                <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
            </motion.div>
        </motion.div>
    );
};
const SkeletonTwo = () => {
    const variants = {
        initial: {
            width: 0,
        },
        animate: {
            width: '100%',
            transition: {
                duration: 0.2,
            },
        },
        hover: {
            width: ['0%', '100%'],
            transition: {
                duration: 2,
            },
        },
    };
    const arr = new Array(6).fill(0);
    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2">
            {arr.map((_, i) => (
                <motion.div
                    key={'skelenton-two' + i}
                    variants={variants}
                    style={{
                        maxWidth: Math.random() * (100 - 40) + 40 + '%',
                    }}
                    className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-neutral-100 dark:bg-black w-full h-4"></motion.div>
            ))}
        </motion.div>
    );
};
const SkeletonThree = () => {
    const variants = {
        initial: {
            backgroundPosition: '0 50%',
        },
        animate: {
            backgroundPosition: ['0, 50%', '100% 50%', '0 50%'],
        },
    };
    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={variants}
            transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
            }}
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
            style={{
                background:
                    'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
                backgroundSize: '400% 400%',
            }}>
            <motion.div className="h-full w-full rounded-lg"></motion.div>
        </motion.div>
    );
};
const SkeletonFour = () => {
    const first = {
        initial: {
            x: 20,
            rotate: -5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    };
    const second = {
        initial: {
            x: -20,
            rotate: 5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    };
    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2">
            <motion.div
                variants={first}
                className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
                <img
                    src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
                    alt="avatar"
                    height="100"
                    width="100"
                    className="rounded-full h-10 w-10"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    Just code in Vanilla Javascript
                </p>
                <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Delusional
                </p>
            </motion.div>
            <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
                <img
                    src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
                    alt="avatar"
                    height="100"
                    width="100"
                    className="rounded-full h-10 w-10"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    Tailwind CSS is cool, you know
                </p>
                <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Sensible
                </p>
            </motion.div>
            <motion.div
                variants={second}
                className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
                <img
                    src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
                    alt="avatar"
                    height="100"
                    width="100"
                    className="rounded-full h-10 w-10"
                />
                <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                    I love angular, RSC, and Redux.
                </p>
                <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
                    Helpless
                </p>
            </motion.div>
        </motion.div>
    );
};
const SkeletonFive = () => {
    const variants = {
        initial: {
            x: 0,
        },
        animate: {
            x: 10,
            rotate: 5,
            transition: {
                duration: 0.2,
            },
        },
    };
    const variantsSecond = {
        initial: {
            x: 0,
        },
        animate: {
            x: -10,
            rotate: -5,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.div
            initial="initial"
            whileHover="animate"
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2">
            <motion.div
                variants={variants}
                className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black">
                <img
                    src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
                    alt="avatar"
                    height="100"
                    width="100"
                    className="rounded-full h-10 w-10"
                />
                <p className="text-xs text-neutral-500">
                    There are a lot of cool framerworks out there like React,
                    Angular, Vue, Svelte that can make your life ....
                </p>
            </motion.div>
            <motion.div
                variants={variantsSecond}
                className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black">
                <p className="text-xs text-neutral-500">Use PHP.</p>
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
            </motion.div>
        </motion.div>
    );
};

const SkeletonSix = () => {
    const cardVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={cardVariants}
            className="flex flex-col space-y-4 rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-4 bg-white dark:bg-black">
            <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                <div className="h-4 w-1/2 rounded-full bg-gray-100 dark:bg-neutral-900" />
            </div>
            <div className="space-y-2">
                <div className="h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900" />
                <div className="h-4 w-4/5 rounded-full bg-gray-100 dark:bg-neutral-900" />
            </div>
        </motion.div>
    );
};

const SkeletonSeven = () => {
    const listVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = {
        initial: { x: -20, opacity: 0 },
        animate: { x: 0, opacity: 1 },
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={listVariants}
            className="flex flex-col space-y-2 rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-4 bg-white dark:bg-black">
            <motion.div
                variants={itemVariants}
                className="flex justify-between">
                <div className="h-4 w-1/3 rounded-full bg-gradient-to-r from-yellow-500 to-red-500" />
                <div className="h-4 w-12 rounded-full bg-gray-100 dark:bg-neutral-900" />
            </motion.div>
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    variants={itemVariants}
                    className="h-4 w-full rounded-full bg-gray-100 dark:bg-neutral-900"
                />
            ))}
        </motion.div>
    );
};

const SkeletonEight = () => {
    const barVariants = {
        initial: { width: '10%' },
        animate: {
            width: '100%',
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
            },
        },
    };

    return (
        <div className="flex flex-col space-y-4 rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-4 bg-white dark:bg-black">
            <div className="flex justify-between">
                <div className="h-4 w-1/2 rounded-full bg-gray-100 dark:bg-neutral-900" />
                <div className="h-4 w-8 rounded-full bg-gray-100 dark:bg-neutral-900" />
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-neutral-900 overflow-hidden">
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={barVariants}
                    className="h-full rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                />
            </div>
        </div>
    );
};

const SkeletonUber = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const carVariants = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={containerVariants}
      className="flex flex-col space-y-4 rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-4 bg-white dark:bg-black overflow-hidden"
    >
      <div className="flex justify-between items-center">
        <div className="h-3 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        <div className="h-3 w-6 rounded-full bg-gray-100 dark:bg-neutral-900" />
      </div>
      <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-neutral-900" />
      <div className="flex justify-between items-center">
        <div className="h-2 w-1/3 rounded-full bg-gray-100 dark:bg-neutral-900" />
        <div className="h-2 w-1/3 rounded-full bg-gray-100 dark:bg-neutral-900" />
      </div>
      <div className="relative h-5 w-full rounded-2xl bg-gray-100 dark:bg-neutral-900 overflow-hidden">
        <motion.div
          variants={carVariants}
          className="absolute top-1/2 -translate-y-1/2 left-0 h-6 w-12 rounded-full bg-black dark:bg-white"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="h-1 w-20 rounded-full bg-gray-100 dark:bg-neutral-900" />
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="h-1 w-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 cursor-pointer"
        />
      </div>
    </motion.div>
  );
};

const items = [
      {
        title: "Order an uber",
        description: (
          <span className="text-sm">
            Experience real convenience with ordering an Uber ride.
          </span>
        ),
        header: <SkeletonUber />,
        className: "md:col-span-1",
        icon: <IconCar className="h-4 w-4 text-neutral-500" />,
      },
    //   {
    //     title: "Automated Proofreading",
    //     description: (
    //       <span className="text-sm">
    //         Let AI handle the proofreading of your documents.
    //       </span>
    //     ),
    //     header: <SkeletonTwo />,
    //     className: "md:col-span-1",
    //     icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    //   },
    //   {
    //     title: "Contextual Suggestions",
    //     description: (
    //       <span className="text-sm">
    //         Get AI-powered suggestions based on your writing context.
    //       </span>
    //     ),
    //     header: <SkeletonThree />,
    //     className: "md:col-span-1",
    //     icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    //   },
    //   {
    //     title: "Sentiment Analysis",
    //     description: (
    //       <span className="text-sm">
    //         Understand the sentiment of your text with AI analysis.
    //       </span>
    //     ),
    //     header: <SkeletonFour />,
    //     className: "md:col-span-3",
    //     icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    //   },

    {
        title: 'Text Summarization',
        description: (
            <span className="text-sm">
                Summarize your lengthy documents with AI technology.
            </span>
        ),
        header: <SkeletonFive />,
        className: 'md:col-span-1',
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: 'Image Generation',
        description: (
            <span className="text-sm">
                Generate images from textual descriptions using AI.
            </span>
        ),
        header: <SkeletonSix />,
        className: 'md:col-span-1',
        icon: <IconPhotoPlus className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: 'Language Translation',
        description: (
            <span className="text-sm">
                Translate text between languages with AI-powered accuracy.
            </span>
        ),
        header: <SkeletonSeven />,
        className: 'md:col-span-1',
        icon: <IconLanguage className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: 'Text Completion',
        description: (
            <span className="text-sm">
                Autocomplete your writing intelligently based on context.
            </span>
        ),
        header: <SkeletonEight />,
        className: 'md:col-span-1',
        icon: <IconTextWrap className="h-4 w-4 text-neutral-500" />,
    },
];
