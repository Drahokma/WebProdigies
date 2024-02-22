import { FileIcon, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { UploadDropZone } from '@/lib/uploadthing';
import { UploadButton } from '@uploadthing/react';
import { error } from 'console';

interface FileUploadProps {
    apiEndpoint: 'agencyLogo' | 'avatar' | 'subaccountLogo',
    onChange: (url?: string) => void,
    value?: string
}

const FileUpload: React.FC<FileUploadProps> = ({apiEndpoint, onChange, value}) => {

    const type = value?.split('.').pop()

    if (value){
        return (
            <div className='flex flex-col justify-center items-center'>
                {type !=="pdf" ? (
                    <div className='relative w-40 h-40'>
                        <Image
                            src={value}
                            alt="uploaded image"
                            className='object-contain '
                            fill
                        />
                    </div>
                ) : (
                    <div className='relative flex items-center p-2 mt-2 rounded-md  bg-background/10'>
                        <FileIcon>
                            <a 
                                href={value} 
                                target='_blank' 
                                rel='noopener_noreferrer'
                                className='ml-2 text-sm text-indigo-500 dark:text-indigo400 hover:underline'
                            >
                                View PDF
                            </a>
                        </FileIcon>
                    </div>
                )}
                <Button
                variant='ghost'
                type='button'
                >
                    <X className='h-4 w-4'/>
                    Remove logo
                </Button>
            </div>
        )
    }
    return (
        <div className='w-full bg-muted/30'>
            <UploadDropZone
                endpoint ={apiEndpoint}
                onClientUploadComplete={(res)=>{
                    onChange(res?.[0].url)
                }}
                onUploadError={(error:Error)=>{
                    console.log(error)
                }}
            />
        </div>
    );
};

export default FileUpload;