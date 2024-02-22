import {generateComponents } from '@uploadthing/react'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { generateUploadDropzone, generateUploadButton } from '@uploadthing/react'
import { generateReactHelpers } from '@uploadthing/react/hooks'


import { OurFileRouter } from '@/app/api/uploadthing/core'
 
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropZone = generateUploadDropzone<OurFileRouter>();
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter> ()
