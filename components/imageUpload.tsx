"use client"
import config from '@/lib/config';
import React, { useRef, useState } from 'react'
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
    try {
        const response = await fetch(`${config.env.apiEndpoint}/api/imagekit`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        // Log the original error for debugging before rethrowing a new error.
        console.error("Authentication error:", error);
        throw new Error("Authentication request failed");
    }
};

interface Props {
    type: "image" | "video";
    accept: string;
    placeholder: string;
    folder: string;
    variant: "dark" | "light";
    onFileChange: (filePath: string) => void;
    value?: string;
}
const ImageUpload = ({
    type,
    accept,
    placeholder,
    folder,
    variant,
    onFileChange,
    value,
    }: Props) => {
    
    const ikUploadRef = useRef(null);
    const [file, setFile] = useState<{ filePath: string | null }>({
        filePath: value ?? null,
    });
    const [progress, setProgress] = useState(0);

    const styles = {
        button:
        variant === "dark"
            ? "bg-dark-300"
            : "bg-light-600 border-gray-100 border",
        placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
        text: variant === "dark" ? "text-light-100" : "text-dark-400",
    };
    const onError = (error: unknown) => {
    console.log(error);

        toast({
        title: `${type} upload failed`,
        description: `Your ${type} could not be uploaded. Please try again.`,
        variant: "destructive",
        });
    };

    const onSuccess = (res: any) => {
        setFile(res);
        onFileChange(res.filePath);

        toast({
        title: `${type} uploaded successfully`,
        description: `${res.filePath} uploaded successfully!`,
        });
    };

    const onValidate = (file: File) => {
        if (type === "image") {
        if (file.size > 20 * 1024 * 1024) {
            toast({
            title: "File size too large",
            description: "Please upload a file that is less than 20MB in size",
            variant: "destructive",
            });

            return false;
        }
        } else if (type === "video") {
        if (file.size > 50 * 1024 * 1024) {
            toast({
            title: "File size too large",
            description: "Please upload a file that is less than 50MB in size",
            variant: "destructive",
            });
            return false;
        }
        }

        return true;
    };
    return (
        <ImageKitProvider
            publicKey = {publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >
            <IKUpload
                ref={ikUploadRef}
                onError={onError}
                onSuccess={onSuccess}
                useUniqueFileName={true}
                validateFile={onValidate}
                onUploadStart={() => setProgress(0)}
                onUploadProgress={({ loaded, total }) => {
                    const percent = Math.round((loaded / total) * 100);
                    setProgress(percent);
                }}
                folder={folder}
                accept={accept}
                className="hidden"
            />
            <button
                className={cn("upload-btn", styles.button)}
                onClick={(e) => {
                e.preventDefault();

                if (ikUploadRef.current) {
                    // @ts-expect-error: IKUpload ref type does not include click(), but it is available at runtime
                    ikUploadRef.current?.click();
                }
                }}
            >
                <Image
                    src="/icons/upload.svg"
                    alt="upload-icon"
                    width={20}
                    height={20}
                    className="object-contain"
                />

                <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>

                {file && (
                <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
                )}
            </button>
            { progress > 0 && progress !== 100  && (
                <div className="w-full rounded-full bg-green-200">
                    <div className="progress" style={{ width: `${progress}%` }}>
                        {progress}%
                    </div>
                </div>
            )}

            {file &&
                (type === "image" ? (
                <IKImage
                    alt={file.filePath ?? "uploaded image"}
                    path={file.filePath ?? undefined}
                    width={800}
                    height={300}
                />
                ) : type === "video" ? (
                <IKVideo
                    path={file.filePath ?? undefined}
                    controls={true}
                    className="h-96 w-full rounded-xl"
                />
                ) : null)
            }
        </ImageKitProvider>
    )
}

export default ImageUpload