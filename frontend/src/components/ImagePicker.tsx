"use client";

import { useState, useRef, ChangeEvent } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { LuUser } from "react-icons/lu";
import { IoCloudUploadOutline } from "react-icons/io5";


type ImagePickerProps = {
    label: string;
    name: string;
    form: UseFormReturn<any>;
};

const ImagePicker = ({ label, name, form }: ImagePickerProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const [pickedImage, setPickedImage] = useState<string | null>(null);

    const handlePickClick = () => {
        ref.current?.click();
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>, fieldOnChange: (value: any) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result as string;
            setPickedImage(base64Image);
            fieldOnChange(base64Image);
        };
        reader.readAsDataURL(file);
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="col-span-2">
                    {/* <FormLabel className="justify-center">{label}</FormLabel> */}
                    <FormControl>
                        <div className="flex justify-center">
                            <Input
                                ref={ref}
                                type="file"
                                className="hidden"
                                onChange={(e) => handleImageChange(e, field.onChange)}
                            />

                            <Button type="button" onClick={handlePickClick} variant={pickedImage ? "outline" : "default"} className={`size-24 p-0 rounded-full relative flex items-center justify-center ${pickedImage && "hover:bg-transparent"}`}>
                                {pickedImage ? (
                                    <img

                                        src={pickedImage}
                                        alt="Preview"
                                        className="size-24 object-cover rounded-full"
                                    />
                                ) : (<LuUser className="text-4xl size-12" />)}

                                <span className="text-2xl absolute right-0 bottom-0  bg-primary-foreground size-8 flex items-center justify-center rounded-full" > <IoCloudUploadOutline className="size-4 text-primary" /></span>

                            </Button>
                        </div>
                    </FormControl>
                    <FormMessage className="text-center" />
                </FormItem>
            )}
        />
    );
};

export default ImagePicker;
