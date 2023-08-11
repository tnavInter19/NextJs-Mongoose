// fileUtils.ts

export const convertFileToBase64 = (file: File): Promise<string> => {
 return new Promise((resolve, reject) => {
   const reader = new FileReader();
   reader.onload = () => {
     if (reader.result) {
       resolve(reader.result.toString());
     } else {
       reject('Unable to read file');
     }
   };
   reader.onerror = () => {
     reject('Error reading file');
   };
   reader.readAsDataURL(file);
 });
};

export const downloadFile = (base64Content: string, filename: string) => {
 const link = document.createElement('a');
 link.href = URL.createObjectURL(dataURLtoBlob(base64Content));
 link.download = filename;
 link.click();
};

const dataURLtoBlob = (dataurl:string) => {
 const arr = dataurl.split(',');
 const matchResult = arr[0].match(/:(.*?);/);

 if (matchResult && matchResult[1]) {
   const mime = matchResult[1];
   const bstr = atob(arr[1]);
   let n = bstr.length;
   const u8arr = new Uint8Array(n);
   while (n--) {
     u8arr[n] = bstr.charCodeAt(n);
   }
   return new Blob([u8arr], { type: mime });
 } else {
   throw new Error('Invalid data URL');
 }
};

