// @mui
import { SxProps, Theme } from "@mui/material/styles";
import { ReactNode } from "react";
import { Accept, DropzoneOptions } from "react-dropzone";
import { ColorSchema } from "theme/palette";

// ----------------------------------------------------------------------

export interface CustomFile extends File {
  path?: string;
  preview?: string;
}

export interface UploadProps extends DropzoneOptions {
  error?: boolean;
  file: CustomFile | string | null;
  helperText?: ReactNode;
  sx?: SxProps<Theme>;
  accept?: Accept;
  color?: ColorSchema;
  labels?: {
    new: string;
    update: string;
  };
}

export type UploadMultiFileProps = DropzoneOptions & {
  error?: boolean;
  files: (File | string)[];
  showPreview: boolean;
  onRemove: (file: File | string) => void;
  onRemoveAll: VoidFunction;
  sx?: SxProps<Theme>;
  helperText?: ReactNode;
  accept?: any;
};
