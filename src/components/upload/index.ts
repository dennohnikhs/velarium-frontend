import { Accept } from "react-dropzone";

export * from "./type";
export { default as UploadAvatar } from "./UploadAvatar";
export { default as UploadMultiFile } from "./UploadMultiFile";
export { default as UploadSingleFile } from "./UploadSingleFile";

export const handleFileDrop = async (
  name: string,
  acceptedFiles: File[],
  setValue: Function
) => {
  const file = acceptedFiles[0];

  if (file) {
    setValue(
      name,
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
      {
        shouldTouch: true,
      }
    );
  }
};

export const validator = (accept: Accept | undefined) => (file: File) => {
  if (
    !accept ||
    !!Object.entries(accept).find(([name, types]) => {
      const [asterisk] = name.split("/*");
      if (asterisk && file.type.includes(asterisk)) return true;

      return [name, ...types].includes(file.type);
    })
  )
    return null;
  return {
    code: "error",
    message: "Select a valid file",
  };
};
