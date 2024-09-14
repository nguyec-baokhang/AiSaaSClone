import { useCallback, useState } from "react";
import {toast} from "react-hot-toast";

type copiedValue = string | null;
type copyFn = (text:string) => Promise<boolean> //return true

export function useCopyToClipboard(): [copiedValue,copyFn]{
    const [copiedText, setCopiedText] = useState<copiedValue>(null);

    const copy: copyFn = useCallback(async text => {
        if(!navigator?.clipboard){
            toast.error("Clipboard is not supported");
            console.log('Clipboard is not supported');
            return false;
        }
         //Saving the text on to the clipboard and then the variable
        try{
            await navigator.clipboard.writeText(text);
            setCopiedText(text); 
            return true;
        }catch(err){
            toast.error('Copyfailed');
            console.log(err);
            setCopiedText(null);
            return false;
        }
    },[]);

   return  [copiedText, copy];
}