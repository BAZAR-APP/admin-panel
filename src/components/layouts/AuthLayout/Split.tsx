import { cloneElement } from 'react'
import type { ReactNode } from 'react'
import type { CommonProps } from '@/@types/common'

interface SplitProps extends CommonProps {
    content?: ReactNode
}

const Split = ({ children, content, ...rest }: SplitProps) => {
    return (
        <div className="flex min-w-0 w-full flex-1">
            <div className="h-full flex flex-auto flex-col justify-between">
                <main className="h-full">
                    <div className="page-container relative h-full flex flex-auto flex-col pb-0 sm:pb-0 md:pb-0">
                        <div className="grid lg:grid-cols-2 h-full p-6 bg-white dark:bg-gray-800">
                            <div className="flex flex-col justify-center items-center ">
                                <div className="w-full xl:max-w-[450px] md:px-8 px-3 max-w-[380px]">
                                    {/* <div className="w-full px-8"> */}
                                    <div className="md:mb-8 mb-0">
                                        {content}
                                    </div>
                                    {children
                                        ? cloneElement(
                                              children as React.ReactElement,
                                              {
                                                  ...rest,
                                              },
                                          )
                                        : null}
                                </div>
                            </div>
                            <div
                                className="py-6 px-15 flex-col justify-center items-center hidden lg:flex rounded-3xl"
                                style={{
                                    backgroundImage: `url('/img/others/AuthBanner.svg')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    zIndex: '1000',
                                }}
                            >
                                <div className="flex flex-col items-start min-[1440px]:gap-12 gap-9">
                                    <img
                                        className="object-cover w-full max-w-[322px] h-[120px]"
                                        src="/img/logo/Logo-light.png"
                                    />
                                    <div>
                                        <h1 className="xl:text-[42px] text-3xl xl:leading-[56px] leading-9 font-normal text-[#FDFDFE]">
                                            Your Escape by the Sea
                                        </h1>

                                        <p className="mt-2 font-light text-[16px] leading-[19px] text-[#FDFDFE]">
                                            Discover our handpicked sea
                                            villas—perfect for serene getaways
                                            and unforgettable moments.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Split
